"use client";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import SuccessModal from "@/components/ui/SuccessModal";
import { socialLinks, contactData } from "@/lib/data";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [serverError, setServerError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function validate(v: FormState): FormErrors {
    const e: FormErrors = {};
    if (v.name.trim().length < 2) e.name = "ERR: identifier required.";
    if (!EMAIL_REGEX.test(v.email.trim())) e.email = "ERR: invalid comm address.";
    if (v.message.trim().length < 10) e.message = "ERR: ≥10 chars required.";
    return e;
  }

  function handleChange(ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
    setErrors((prev) => ({ ...prev, [ev.target.name]: undefined }));
    setServerError("");
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setStatus("submitting"); setServerError("");
    try {
      let ok = false;
      if (WEB3FORMS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Message from ${form.name}`, from_name: "Portfolio", name: form.name, email: form.email, message: form.message, replyto: form.email }) });
        const data = await res.json().catch(() => ({})); ok = res.ok && Boolean(data.success);
      } else {
        const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        if (!res.ok) { const data = await res.json().catch(() => ({})); if (data.errors) setErrors(data.errors as FormErrors); }
        ok = res.ok;
      }
      if (!ok) throw new Error("fail");
      setForm({ name: "", email: "", message: "" }); setShowSuccess(true);
    } catch { setServerError("SIGNAL LOST — retry or email directly."); }
    finally { setStatus("idle"); }
  }

  return (
    <section id="contact" className="scene contact-scene scene--red">
      <header className="scene-heading">
        <span>NODE / 06</span><h2>ESTABLISH LINK</h2><p>Open a secure channel — all transmissions are encrypted end-to-end.</p>
      </header>
      <div className="contact-grid">
        <div className="contact-info">
          <p className="scene-kicker"><span /> CHANNEL OPEN</p>
          <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
          <nav className="contact-socials">{socialLinks.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer" aria-label={link.ariaLabel}><SocialSvg platform={link.platform} /><span>{link.platform}</span></a>)}</nav>
          <footer>{contactData.copyright}</footer>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <FormInput id="name" label="IDENTIFIER" placeholder="Name" required value={form.name} onChange={handleChange} error={errors.name} />
          <FormInput id="email" label="COMM ADDR" type="email" placeholder="you@domain" required value={form.email} onChange={handleChange} error={errors.email} />
          <FormTextarea id="message" label="PAYLOAD" placeholder="Your message…" required value={form.message} onChange={handleChange} error={errors.message} />
          {serverError && <p role="alert" className="form-error">{serverError}</p>}
          <button type="submit" disabled={status === "submitting"} className="btn-action">{status === "submitting" ? "TRANSMITTING…" : "SEND TRANSMISSION →"}</button>
        </form>
      </div>
      <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}

function SocialSvg({ platform }: { platform: string }) {
  switch (platform) {
    case "github": return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
    case "linkedin": return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
    case "instagram": return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
    default: return <span>●</span>;
  }
}
