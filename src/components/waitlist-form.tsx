import { useState, type FormEvent } from "react";
import { joinWaitlist } from "@/lib/waitlist";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "empty" | "invalid" | "error" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-full border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

/**
 * The single CTA on this site. All feedback is inline, beneath the fields.
 *
 * Submits to the `joinWaitlist` server function, which writes to Supabase —
 * the key never reaches the browser. `source` records which form was used so
 * we can tell which page actually converts.
 */
export function WaitlistForm({ id, source }: { id: string; source?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [pending, setPending] = useState(false);

  function handleBlur() {
    if (email.trim() && !EMAIL_RE.test(email.trim())) setStatus("invalid");
    else if (status === "invalid") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const address = email.trim();
    const person = name.trim();
    if (!person || !address) return setStatus("empty");
    if (!EMAIL_RE.test(address)) return setStatus("invalid");

    setPending(true);
    try {
      const result = await joinWaitlist({
        data: { email: address, name: person, role: role.trim(), source },
      });
      if (result.ok) {
        setAlreadyJoined(result.alreadyJoined);
        setStatus("success");
        // Only a genuinely new signup counts. Firing on a repeat submission
        // would inflate the conversion number in Analytics.
        if (!result.alreadyJoined) {
          trackEvent("sign_up", { method: "waitlist", source: source ?? "unknown" });
        }
      } else {
        setStatus(result.reason === "invalid" ? "invalid" : "error");
      }
    } catch {
      setStatus("error"); // typed values are preserved — never cleared
    } finally {
      setPending(false);
    }
  }

  if (status === "success") {
    return (
      <div>
        <p className="font-display text-2xl md:text-3xl">
          {alreadyJoined ? "You're already on the list." : "You're on the list."}
        </p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
          {alreadyJoined
            ? `${email.trim()} was already down. One email, when CuspAI opens.`
            : `We'll email ${email.trim()} once, when CuspAI opens.`}
        </p>
      </div>
    );
  }

  const message =
    status === "empty"
      ? "Enter your name and email address."
      : status === "invalid"
        ? "That doesn't look like an email address."
        : status === "error"
          ? "Something went wrong on our end. Your details are still here, so try again."
          : null;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor={`${id}-name`} className="sr-only">
              Your name
            </label>
            <input
              id={`${id}-name`}
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              aria-invalid={status === "empty" && !name.trim()}
              className={fieldClass}
            />
          </div>
          <div className="flex-1">
            <label htmlFor={id} className="sr-only">
              Email address
            </label>
            <input
              id={id}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              onBlur={handleBlur}
              aria-invalid={status === "invalid" || (status === "empty" && !email.trim())}
              aria-describedby={message ? `${id}-msg` : undefined}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor={`${id}-role`} className="sr-only">
              What you do (optional)
            </label>
            <input
              id={`${id}-role`}
              type="text"
              autoComplete="organization-title"
              placeholder="What you do (optional)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={fieldClass}
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="btn-accent shrink-0 rounded-full px-6 py-3 text-base font-medium disabled:opacity-60"
          >
            {pending ? "Joining…" : "Get early access"}
          </button>
        </div>
      </div>

      {message && (
        <p id={`${id}-msg`} className="mt-3 text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
