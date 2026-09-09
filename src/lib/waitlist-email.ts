/**
 * The confirmation email a new signup receives immediately.
 *
 * Server-only. Sent through Resend's HTTP API rather than an SDK, so there is
 * no extra dependency and nothing to keep in step.
 *
 * Three rules govern this file:
 *
 *  1. It never throws. A signup that is safely stored is a success even if the
 *     email fails, so every failure is logged and swallowed. The row is the
 *     record; the email is a courtesy.
 *  2. It is skipped entirely when RESEND_API_KEY is unset, which is the case in
 *     dev and in preview builds. That keeps test signups from sending mail.
 *  3. It is awaited by the caller, with a timeout. Serverless functions stop
 *     executing once a response is returned, so a fire-and-forget request would
 *     be cancelled before it left the machine.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 6000;

/** "Priya Sharma" becomes "Priya". Falls back to the whole string. */
function firstName(name: string): string {
  const first = name.trim().split(/\s+/)[0];
  return first && first.length > 0 ? first : name.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textBody(name: string): string {
  return `Hi ${firstName(name)},

You are on the CuspAI early access list. Nothing else is needed from you.

Here is what happens next. When CuspAI opens, you get one email. That is the only one you will get from us before then, and there is no newsletter attached to it.

What you are waiting for: a daily read that ends, and a verdict that commits. What changed, what to use, and what to learn next, with prices in rupees and the date each one was checked.

If you have a question, reply to this message. It reaches a person.

CuspAI
https://www.cuspai.io`;
}

function htmlBody(name: string): string {
  const safeName = escapeHtml(firstName(name));
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f7f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#14312f;line-height:1.6;">
    <div style="max-width:520px;margin:0 auto;">
      <p style="margin:0 0 20px;font-size:16px;">Hi ${safeName},</p>
      <p style="margin:0 0 20px;font-size:16px;">
        You are on the CuspAI early access list. Nothing else is needed from you.
      </p>
      <p style="margin:0 0 20px;font-size:16px;">
        Here is what happens next. When CuspAI opens, you get one email. That is the
        only one you will get from us before then, and there is no newsletter
        attached to it.
      </p>
      <p style="margin:0 0 20px;font-size:16px;">
        What you are waiting for: a daily read that ends, and a verdict that commits.
        What changed, what to use, and what to learn next, with prices in rupees and
        the date each one was checked.
      </p>
      <p style="margin:0 0 20px;font-size:16px;">
        If you have a question, reply to this message. It reaches a person.
      </p>
      <p style="margin:0;font-size:16px;">
        CuspAI<br />
        <a href="https://www.cuspai.io" style="color:#0f6b6b;">www.cuspai.io</a>
      </p>
    </div>
  </body>
</html>`;
}

export async function sendWaitlistConfirmation(input: {
  name: string;
  email: string;
}): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return;

  const from = process.env["WAITLIST_FROM_EMAIL"] ?? "CuspAI <hello@cuspai.io>";
  const replyTo = process.env["WAITLIST_REPLY_TO"] ?? "hello@cuspai.io";

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.email],
        reply_to: replyTo,
        subject: "You are on the CuspAI list",
        text: textBody(input.name),
        html: htmlBody(input.name),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      // Read the body for the reason: Resend explains an unverified sending
      // domain or a bad key here, and that detail is the whole diagnosis.
      const detail = await response.text().catch(() => "<unreadable>");
      console.error("waitlist confirmation email rejected", response.status, detail);
    }
  } catch (error) {
    console.error("waitlist confirmation email failed to send", error);
  }
}
