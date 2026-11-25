import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { joinWaitlist } from "@/lib/waitlist";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "empty" | "invalid" | "error" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

/**
 * The one call to action on this site. Labels sit above their fields, and all
 * feedback is inline, under the form.
 *
 * Submits to the `joinWaitlist` server function, which writes to Supabase, so
 * the key never reaches the browser. `source` records which form was used, so
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
        // Only a new signup counts. Firing on a repeat submission would
        // inflate the conversion number in Analytics.
        if (!result.alreadyJoined) {
          trackEvent("sign_up", { method: "waitlist", source: source ?? "unknown" });
        }
      } else {
        setStatus(result.reason === "invalid" ? "invalid" : "error");
      }
    } catch {
      setStatus("error"); // typed values are kept, never cleared
    } finally {
      setPending(false);
    }
  }

  if (status === "success") {
    return (
      <div className="fade-up flex items-start gap-4" role="status">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-action text-action-foreground">
          <Check size={20} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-2xl tracking-tight md:text-[1.75rem]">
            {alreadyJoined ? "You're already on the list." : "You're on the list."}
          </p>
          <p className="mt-2 text-muted-foreground">
            {alreadyJoined
              ? `${email.trim()} was already signed up. We'll email you once, when CuspAI opens.`
              : `We'll email ${email.trim()} once, when CuspAI opens.`}
          </p>
        </div>
      </div>
    );
  }

  const message =
    status === "empty"
      ? "Add your name and email address to join."
      : status === "invalid"
        ? "That doesn't look like an email address. Check it and try again."
        : status === "error"
          ? "That didn't go through, and the problem is on our side. Your details are still here, so try again."
          : null;

  const clearOnType = () => {
    if (status !== "idle") setStatus("idle");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Your name
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            placeholder="First and last name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearOnType();
            }}
            aria-invalid={status === "empty" && !name.trim()}
            aria-describedby={message ? `${id}-msg` : undefined}
            className="field"
          />
        </div>
        <div>
          <label htmlFor={id} className={labelClass}>
            Email address
          </label>
          <input
            id={id}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearOnType();
            }}
            onBlur={handleBlur}
            aria-invalid={status === "invalid" || (status === "empty" && !email.trim())}
            aria-describedby={message ? `${id}-msg` : undefined}
            className="field"
          />
        </div>
        <div>
          <label htmlFor={`${id}-role`} className={labelClass}>
            What you do <span className="font-normal text-subtle">(optional)</span>
          </label>
          <input
            id={`${id}-role`}
            type="text"
            autoComplete="organization-title"
            placeholder="Sales lead, teacher, founder"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="field"
          />
        </div>
        <div className="flex items-end">
          <button type="submit" disabled={pending} className="btn btn-primary group w-full">
            {pending ? "Joining" : "Join the waitlist"}
            <ArrowRight size={18} aria-hidden="true" className="arrow" />
          </button>
        </div>
      </div>

      <p
        id={`${id}-msg`}
        role="status"
        className={message ? "mt-3 text-sm text-foreground" : "sr-only"}
      >
        {message ?? ""}
      </p>
    </form>
  );
}
