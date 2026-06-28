"use client";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Button from "@/components/ui/Button";
import SocialIcon from "@/components/ui/SocialIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SuccessModal from "@/components/ui/SuccessModal";
import { socialLinks, contactData } from "@/lib/data";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public Web3Forms access key (safe to expose — designed for client use).
// Web3Forms is behind Cloudflare and must be called from the browser, not the server.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [serverError, setServerError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_REGEX.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "Message must be at least 10 characters.";
    return next;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      let ok = false;

      if (WEB3FORMS_KEY) {
        // Submit directly to Web3Forms from the browser (passes Cloudflare).
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New portfolio message from ${form.name}`,
            from_name: "Portfolio Contact",
            name: form.name,
            email: form.email,
            message: form.message,
            replyto: form.email,
          }),
        });
        const data = await res.json().catch(() => ({}));
        ok = res.ok && Boolean(data.success);
      } else {
        // Fallback: server route (Resend).
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (data.errors) setErrors(data.errors as FormErrors);
        }
        ok = res.ok;
      }

      if (!ok) throw new Error("Request failed");

      setForm({ name: "", email: "", message: "" });
      setShowSuccess(true);
    } catch {
      setServerError(
        "Something went wrong. Please try again, or email me directly."
      );
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section
      id="contact"
      className="px-6 md:px-12 lg:px-[108px] py-20 border-t border-border"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-6">
        {/* Left column: heading + contact info + footer */}
        <ScrollReveal variant="left" className="flex-1 flex flex-col gap-8">
          <h2 className="font-display text-[48px] md:text-[60px] lg:text-[76px] leading-[1] gradient-text">
            LET'S CONNCET
          </h2>
          <p className="font-body text-lg leading-[1.5] text-text-secondary">
            Say hello at{" "}
            <a
              href={`mailto:${contactData.email}`}
              className="font-body font-bold text-base leading-[1.5] text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              {contactData.email}
            </a>
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.id}
                platform={link.platform}
                href={link.url}
                ariaLabel={link.ariaLabel}
              />
            ))}
          </div>

          {/* Footer / copyright */}
          <footer className="mt-auto pt-12">
            <p className="font-body font-medium text-base leading-[1.6] text-text-secondary">
              {contactData.copyright}
            </p>
          </footer>
        </ScrollReveal>

        {/* Right column: form */}
        <ScrollReveal variant="right" delay={120} className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {/* Honeypot field (hidden from users, catches bots) */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <FormInput
              id="name"
              label="Name"
              placeholder="Your name"
              required
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="your@email.com"
              required
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormTextarea
              id="message"
              label="Message"
              placeholder="Your message..."
              required
              value={form.message}
              onChange={handleChange}
              error={errors.message}
            />
            {serverError && (
              <p role="alert" className="font-body text-sm text-red-400">
                {serverError}
              </p>
            )}
            <div className="pt-2">
              <Button variant="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </ScrollReveal>
      </div>

      <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
