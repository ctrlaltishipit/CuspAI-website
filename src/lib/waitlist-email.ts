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

Now the part worth reading.

How many newsletters are sitting unread in your inbox right now? How many
podcasts are queued that you are never going to reach? And when you actually
need to know what changed in your field this week, where do you go? X, then
LinkedIn, then two Discords, then a Substack somebody recommended, then
YouTube. You finish the round and still could not say what mattered.

CuspAI is one place that ends.

1. ONE SHORT READ A DAY
Three to five things that genuinely changed in the things you follow, work and
otherwise. Each one names which of your interests it came from and why it beat
what we dropped. Then it stops and tells you that you are current. There is no
backlog waiting behind it.

2. A VERDICT, NOT A LIST OF OPTIONS
Ask in one line. Which tool should I use. What should I cancel. What should I
learn next. You get one pick, one runner-up and one thing to stop paying for,
with the reasoning attached, prices in rupees, and the date each price was
checked.

3. FREE TRACK AND PAID TRACK, SIDE BY SIDE
Every answer shows what you can do for nothing and what is genuinely worth
paying for, in the order to try them. You see the whole shape of a setup before
you spend anything, and you can start with the free half.

YOU DO NOT NEED TO WORK IN TECH
This is the part most people are surprised by. A sales lead who wants to
research an account properly before a call. An operations manager sitting on a
year of guest feedback. A marketer whose founder just asked why the brand is not
making AI video yet. None of them write code. They describe the problem in a
sentence and get back the tools, in order, with the free ones marked.

WHAT WE REFUSE TO DO
We take affiliate commissions, and we publish every tool we declined to
recommend and why, including tools that pay us and that we still tell you to
skip. A recommendation you can trust needs a refusal you can read. We will never
connect to your inbox.

WHAT HAPPENS NEXT
One email, when CuspAI opens. That is the only one you get from us before then.
No newsletter, no drip sequence, no reminders.

If you have a question, or you want to tell us what you follow so we get your
first read right, reply to this message. It reaches a person.

CuspAI
https://www.cuspai.io`;
}

function htmlBody(name: string): string {
  const safeName = escapeHtml(firstName(name));
  const point = (n: string, title: string, copy: string) => `
      <tr>
        <td style="padding:0 0 22px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="34" valign="top" style="font:600 15px/1.5 Georgia,serif;color:#0d6360;">${n}</td>
              <td valign="top">
                <div style="font:600 15px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#12302e;">${title}</div>
                <div style="margin-top:4px;font:400 15px/1.65 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#4a5f5e;">${copy}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f7f7;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Everything you follow, in one place that ends.</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7f7;padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #e2eaea;border-radius:14px;">
            <tr>
              <td style="padding:32px 30px 0;">
                <div style="font:600 17px/1 Georgia,serif;color:#0d6360;letter-spacing:0.2px;">CuspAI</div>

                <h1 style="margin:26px 0 0;font:400 27px/1.25 Georgia,serif;color:#12302e;">
                  Hi ${safeName}, you are on the list.
                </h1>
                <p style="margin:14px 0 0;font:400 16px/1.65 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#4a5f5e;">
                  Nothing else is needed from you. Now the part worth reading.
                </p>

                <div style="margin:26px 0 0;padding:18px 20px;background:#f2f8f7;border-left:3px solid #0d6360;border-radius:0 8px 8px 0;">
                  <p style="margin:0;font:400 16px/1.7 Georgia,serif;color:#12302e;">
                    How many newsletters are sitting unread in your inbox right now?
                    How many podcasts are queued that you are never going to reach?
                  </p>
                  <p style="margin:12px 0 0;font:400 16px/1.7 Georgia,serif;color:#12302e;">
                    And when you actually need to know what changed in your field this
                    week, where do you go? X, then LinkedIn, then two Discords, then a
                    Substack somebody recommended, then YouTube. You finish the round
                    and still could not say what mattered.
                  </p>
                </div>

                <p style="margin:22px 0 26px;font:400 17px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#12302e;">
                  CuspAI is one place that ends.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  ${point("01", "One short read a day", "Three to five things that genuinely changed in what you follow, work and otherwise. Each names which interest it came from and why it beat what we dropped. Then it stops and tells you that you are current.")}
                  ${point("02", "A verdict, not a list of options", "Ask in one line. Which tool should I use, what should I cancel, what should I learn next. You get one pick, one runner-up and one thing to stop paying for, with prices in rupees and the date each was checked.")}
                  ${point("03", "Free track and paid track, side by side", "Every answer shows what you can do for nothing and what is genuinely worth paying for, in the order to try them. You can start with the free half and see the whole shape before you spend anything.")}
                </table>

                <div style="margin:6px 0 0;padding:20px;background:#fbfcfc;border:1px solid #e2eaea;border-radius:10px;">
                  <div style="font:600 15px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#12302e;">
                    You do not need to work in tech
                  </div>
                  <p style="margin:8px 0 0;font:400 15px/1.65 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#4a5f5e;">
                    A sales lead who wants to research an account properly before a
                    call. An operations manager sitting on a year of guest feedback. A
                    marketer whose founder just asked why the brand is not making AI
                    video yet. None of them write code. They describe the problem in a
                    sentence and get back the tools, in order, with the free ones
                    marked.
                  </p>
                </div>

                <div style="margin:18px 0 0;padding:20px;background:#fbfcfc;border:1px solid #e2eaea;border-radius:10px;">
                  <div style="font:600 15px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#12302e;">
                    What we refuse to do
                  </div>
                  <p style="margin:8px 0 0;font:400 15px/1.65 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#4a5f5e;">
                    We take affiliate commissions, and we publish every tool we declined
                    to recommend and why, including tools that pay us and that we still
                    tell you to skip. A recommendation you can trust needs a refusal you
                    can read. We will never connect to your inbox.
                  </p>
                </div>

                <p style="margin:26px 0 0;font:400 15px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#4a5f5e;">
                  <strong style="color:#12302e;">What happens next.</strong> One email,
                  when CuspAI opens. That is the only one you get from us before then.
                  No newsletter, no drip sequence, no reminders.
                </p>

                <p style="margin:16px 0 0;font:400 15px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#4a5f5e;">
                  If you have a question, or you want to tell us what you follow so we
                  get your first read right, reply to this message. It reaches a person.
                </p>

                <div style="margin:28px 0 0;">
                  <a href="https://www.cuspai.io/how-it-works" style="display:inline-block;padding:12px 22px;background:#0d6360;color:#ffffff;font:600 15px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;text-decoration:none;border-radius:999px;">
                    See what is inside the app
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px 30px;">
                <div style="border-top:1px solid #e9efef;padding-top:18px;font:400 13px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#829897;">
                  CuspAI · <a href="https://www.cuspai.io" style="color:#0d6360;text-decoration:none;">www.cuspai.io</a><br />
                  You are receiving this because you asked for early access at
                  www.cuspai.io.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
        subject: "You are on the list. Here is what you signed up for.",
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
