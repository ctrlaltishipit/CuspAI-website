import { useState, type FormEvent } from "react";

type Status = "idle" | "empty" | "invalid" | "error" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The single CTA on this site. All feedback is inline, beneath the field.
 * Nothing is persisted yet — wire the submit branch to a backend when one exists.
 */
export function WaitlistForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [pending, setPending] = useState(false);

  function handleBlur() {
    if (email.trim() && !EMAIL_RE.test(email.trim())) setStatus("invalid");
    else if (status === "invalid") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setStatus("empty");
    if (!EMAIL_RE.test(value)) return setStatus("invalid");

    setPending(true);
    try {
      // No backend yet: simulate the request. Replace with a real POST later.
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
    } catch {
      setStatus("error"); // typed value is preserved — never cleared
    } finally {
      setPending(false);
    }
  }

  if (status === "success") {
    return (
      <div>
        <p className="font-display text-2xl md:text-3xl">You're on the list.</p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
          We'll email {email.trim()} — one email, when CuspAI opens.
        </p>
      </div>
    );
  }

  const message =
    status === "empty"
      ? "Enter your email address."
      : status === "invalid"
        ? "That doesn't look like an email address."
        : status === "error"
          ? "Something went wrong on our end. Your address is still here — try again."
          : null;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
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
          aria-invalid={status === "invalid" || status === "empty"}
          aria-describedby={message ? `${id}-msg` : undefined}
          className="w-full flex-1 rounded-full border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-accent rounded-full px-6 py-3 text-base font-medium disabled:opacity-60"
        >
          {pending ? "Joining…" : "Get early access"}
        </button>
      </div>
      {message && (
        <p id={`${id}-msg`} className="mt-3 text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
