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

/** "Asha Rao" becomes "Asha". Falls back to the whole string. */
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

You are on the CuspAI waitlist. There is nothing else you need to do.

Here is what you signed up for. CuspAI is a phone app that does three jobs.

1. A DAILY BRIEF THAT ENDS
A short list of what changed in the fields you follow, at work and outside it.
Each item says why it reached you. It takes about two minutes, and then the
app tells you that you are up to date.

2. A PLAN FOR WHAT YOU WANT TO BUILD
Type a goal, such as "build a website for my business" or "start a
newsletter". You get the steps in order, a free tool and a paid tool for each
step, real prices, and a playbook written for someone doing it for the first
time.

3. A SKILL MAP FOR YOUR NEXT ROLE
Tell it the job you have and the job you want. It lists the skills in between
and gives you steps for each one.

YOU DO NOT NEED TO WORK IN TECH
A sales lead who wants more leads. A hotel manager who wants news from their
own trade. A marketer who has been asked to start making AI video. Each of
them describes what they want in a sentence and gets a plan they can follow.

WHAT IT COSTS
Reading is free for good. You also get three build plans to try, with no card.
After that, plans start at $2 a month.

WHAT HAPPENS NEXT
One email, on the day CuspAI opens. That is the only one you will get from us
before then.

If you have a question, or want to tell us what you would like to follow,
reply to this message. It reaches a person.

CuspAI
https://www.cuspai.io`;
}

/*
 * Brand colours, written out because email clients ignore stylesheets and
 * variables. The same deep blue-teal as the site and the app: a dark header,
 * a white card, and one deep-teal button with white text.
 */
const INK = "#0b2027";
const BODY = "#4a636b";
const SUBTLE = "#5f7880";
const RULE = "#d5e2e2";
const HEADER = "#071316";
const BRAND = "#0d4a53";
const BRAND_LIGHT = "#7fd2de";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

function htmlBody(name: string): string {
  const safeName = escapeHtml(firstName(name));
  const point = (n: string, title: string, copy: string) => `
      <tr>
        <td style="padding:0 0 22px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="34" valign="top" style="font:700 15px/1.5 ${SANS};color:${BRAND};">${n}</td>
              <td valign="top">
                <div style="font:600 16px/1.45 ${SANS};color:${INK};">${title}</div>
                <div style="margin-top:4px;font:400 15px/1.65 ${SANS};color:${BODY};">${copy}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  const box = (title: string, copy: string) => `
                <div style="margin:18px 0 0;padding:20px;background:#f4f8f8;border:1px solid ${RULE};border-radius:14px;">
                  <div style="font:600 15px/1.5 ${SANS};color:${INK};">${title}</div>
                  <p style="margin:8px 0 0;font:400 15px/1.65 ${SANS};color:${BODY};">${copy}</p>
                </div>`;

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f8f8;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">A two-minute daily brief, and a plan for whatever you want to build.</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f8f8;padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background:#ffffff;border:1px solid ${RULE};border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:22px 30px;background:${HEADER};">
                <span style="font:700 22px/1 ${SANS};letter-spacing:-0.4px;color:#eaf4f4;">Cusp</span><span style="font:700 22px/1 ${SANS};letter-spacing:-0.4px;color:${BRAND_LIGHT};">AI</span>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 30px 0;">
                <h1 style="margin:0;font:600 27px/1.2 ${SANS};letter-spacing:-0.5px;color:${INK};">
                  Hi ${safeName}, you are on the list.
                </h1>
                <p style="margin:14px 0 0;font:400 16px/1.65 ${SANS};color:${BODY};">
                  There is nothing else you need to do. Here is what you signed up for.
                </p>

                <p style="margin:24px 0 24px;padding:0 0 0 16px;border-left:3px solid ${BRAND};font:500 17px/1.55 ${SANS};color:${INK};">
                  CuspAI is a phone app that keeps you current in two minutes a day, and
                  turns what you want to build into a plan you can follow.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  ${point("01", "A daily brief that ends", "A short list of what changed in the fields you follow, at work and outside it. Each item says why it reached you. Then the app tells you that you are up to date.")}
                  ${point("02", "A plan for what you want to build", "Type a goal, such as building a website or starting a newsletter. You get the steps in order, a free tool and a paid tool for each, real prices, and a playbook written for a first-timer.")}
                  ${point("03", "A skill map for your next role", "Tell it the job you have and the job you want. It lists the skills in between and gives you steps for each one.")}
                </table>
${box("You do not need to work in tech", "A sales lead who wants more leads. A hotel manager who wants news from their own trade. A marketer who has been asked to start making AI video. Each of them describes what they want in a sentence and gets a plan they can follow.")}
${box("What it costs", "Reading is free for good. You also get three build plans to try, with no card. After that, plans start at $2 a month.")}

                <p style="margin:26px 0 0;font:400 15px/1.7 ${SANS};color:${BODY};">
                  <strong style="color:${INK};">What happens next.</strong> One email, on the
                  day CuspAI opens. That is the only one you will get from us before then.
                </p>

                <p style="margin:16px 0 0;font:400 15px/1.7 ${SANS};color:${BODY};">
                  If you have a question, or want to tell us what you would like to follow,
                  reply to this message. It reaches a person.
                </p>

                <div style="margin:28px 0 0;">
                  <a href="https://www.cuspai.io/how-it-works" style="display:inline-block;padding:14px 24px;background:${BRAND};color:#ffffff;font:600 15px/1 ${SANS};text-decoration:none;border-radius:999px;">
                    See what is inside the app
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px 30px;">
                <div style="border-top:1px solid ${RULE};padding-top:18px;font:400 13px/1.6 ${SANS};color:${SUBTLE};">
                  CuspAI · <a href="https://www.cuspai.io" style="color:${BRAND};text-decoration:none;">www.cuspai.io</a><br />
                  You are receiving this because you joined the waitlist at www.cuspai.io.
                  To be removed, reply and say so.
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
        subject: "You are on the CuspAI list. Here is what is coming.",
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
