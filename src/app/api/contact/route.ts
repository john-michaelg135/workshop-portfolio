import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Where contact messages should be delivered
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "johnmichaelg046@gmail.com";
// Verified sender. On Resend's free tier without a custom domain,
// use "onboarding@resend.dev" (can only deliver to your own account email).
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  // Honeypot field — should always be empty for real users
  company?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // Honeypot: silently accept bots without doing anything
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Message must be at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ── Delivery ──────────────────────────────────────────────────────────────
  // Prefer Web3Forms (free, sends to any inbox, no domain needed).
  // Falls back to Resend if only that is configured.
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (web3Key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `New portfolio message from ${name}`,
          from_name: "Portfolio Contact",
          name,
          email,
          message,
          replyto: email,
        }),
      });

      const rawText = await res.text();
      let data: { success?: boolean; message?: string } = {};
      try {
        data = JSON.parse(rawText);
      } catch {
        // leave data empty
      }

      if (!res.ok || !data.success) {
        console.error(
          "[contact] Web3Forms error:",
          "status=",
          res.status,
          "body=",
          rawText
        );
        return NextResponse.json(
          { ok: false, error: "Failed to send the message. Please try again." },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact] Web3Forms request failed:", err);
      return NextResponse.json(
        { ok: false, error: "Failed to send the message. Please try again." },
        { status: 500 }
      );
    }
  }

  if (!resendKey) {
    console.warn(
      "[contact] No email provider configured. Message logged but NOT emailed:",
      { name, email, message }
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email delivery is not configured on the server. Add WEB3FORMS_ACCESS_KEY (recommended) or RESEND_API_KEY.",
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send the message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send the message. Please try again." },
      { status: 500 }
    );
  }
}
