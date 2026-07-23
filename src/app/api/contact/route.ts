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

/** Escape user input before embedding in HTML to prevent injection. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Themed HTML email matching the portfolio's dark/purple aesthetic. */
function buildEmailHtml(name: string, email: string, message: string): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#1A1A1A;border:1px solid #484848;border-radius:16px;overflow:hidden;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <!-- Gradient header -->
          <tr>
            <td style="background:linear-gradient(135deg,#C3B1FF 0%,#8B5CF6 50%,#EC4899 100%);padding:28px 32px;">
              <p style="margin:0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#0A0A0A;font-weight:700;opacity:0.7;">Portfolio Contact</p>
              <h1 style="margin:6px 0 0;font-size:28px;line-height:1.1;color:#0A0A0A;font-weight:800;">New Message Received</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#C7C7C7;">You've got a new message from your portfolio contact form.</p>

              <p style="margin:0 0 6px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#C3B1FF;font-weight:700;">From</p>
              <p style="margin:0 0 20px;font-size:18px;color:#FFFFFF;font-weight:600;">${safeName}</p>

              <p style="margin:0 0 6px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#C3B1FF;font-weight:700;">Email</p>
              <p style="margin:0 0 24px;font-size:16px;">
                <a href="mailto:${safeEmail}" style="color:#C3B1FF;text-decoration:none;border-bottom:1px solid #484848;">${safeEmail}</a>
              </p>

              <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#C3B1FF;font-weight:700;">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#222222;border-radius:12px;">
                <tr>
                  <td style="padding:20px;font-size:16px;line-height:1.6;color:#E6E6E6;">${safeMessage}</td>
                </tr>
              </table>

              <!-- Reply button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td style="border-radius:100px;background-color:#C3B1FF;">
                    <a href="mailto:${safeEmail}" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:#0A0A0A;text-decoration:none;">Reply to ${safeName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #484848;">
              <p style="margin:0;font-size:12px;color:#7A7A7A;">Sent from your portfolio contact form.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
      html: buildEmailHtml(name, email, message),
      text: `New message from ${name} (${email}):\n\n${message}`,
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
