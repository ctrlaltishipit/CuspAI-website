import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  loadAdmin,
  adminLogin,
  adminLogout,
  type WaitlistRow,
  type AdminSnapshot,
} from "@/lib/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Waitlist · CuspAI admin" },
      // Belt and braces alongside the Disallow line in robots.txt.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async () => loadAdmin(),
  component: AdminPage,
});

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function AdminPage() {
  const state = Route.useLoaderData();

  if (!state || state.status === "unconfigured") return <Unconfigured />;
  if (state.status === "locked") return <LoginForm />;
  return <Dashboard snapshot={state.snapshot} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-6xl px-5 pt-28 pb-24 md:px-8 md:pt-36">{children}</main>;
}

function Unconfigured() {
  return (
    <Shell>
      <h1 className="font-display text-3xl tracking-tight md:text-4xl">Dashboard is sealed.</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
        No admin passphrase is set, so there is nothing to log in to. Add an
        <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          ADMIN_PASSWORD
        </code>
        environment variable in Vercel and redeploy.
      </p>
    </Shell>
  );
}

function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!password) return;
    setPending(true);
    setFailed(false);
    try {
      const result = await adminLogin({ data: { password } });
      if (result.ok) {
        setPassword("");
        await router.invalidate();
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <Shell>
      <div className="mx-auto max-w-sm">
        <h1 className="font-display text-3xl tracking-tight md:text-4xl">Waitlist</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This page shows people who signed up. It is not public.
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <label htmlFor="admin-password" className="sr-only">
            Admin passphrase
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            placeholder="Passphrase"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (failed) setFailed(false);
            }}
            className={fieldClass}
          />
          <button type="submit" disabled={pending} className="btn btn-primary mt-3 w-full">
            {pending ? "Checking…" : "Open dashboard"}
          </button>
          {failed && (
            <p role="status" className="mt-3 text-sm text-muted-foreground">
              That passphrase did not match.
            </p>
          )}
        </form>
      </div>
    </Shell>
  );
}

function toCsv(rows: WaitlistRow[]): string {
  const escape = (value: string | null) => `"${(value ?? "").replace(/"/g, '""')}"`;
  const header = ["name", "email", "role", "source", "signed_up_at"].join(",");
  const body = rows.map((r) =>
    [escape(r.name), escape(r.email), escape(r.role), escape(r.source), escape(r.created_at)].join(
      ",",
    ),
  );
  return [header, ...body].join("\n");
}

function formatWhen(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Dashboard({ snapshot }: { snapshot: AdminSnapshot }) {
  const router = useRouter();
  const { total, last7, last24h, bySource, rows } = snapshot;

  function downloadCsv() {
    const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cuspai-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight md:text-4xl">Waitlist</h1>
          <p className="mt-2 font-medium text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
            Everyone who asked for early access
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={downloadCsv}
            className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/30"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={async () => {
              await adminLogout();
              await router.invalidate();
            }}
            className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        {[
          ["Total", total],
          ["Last 24 hours", last24h],
          ["Last 7 days", last7],
          ["Sources", bySource.length],
        ].map(([label, value]) => (
          <div key={String(label)} className="bg-card px-4 py-5">
            <dt className="font-medium text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-2 font-display text-3xl text-accent md:text-4xl">{value}</dd>
          </div>
        ))}
      </dl>

      {bySource.length > 0 && (
        <section className="mt-10">
          <h2 className="font-medium text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            Which form they used
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {bySource.map(({ source, count }) => (
              <li
                key={source}
                className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 font-medium text-[11px] text-foreground"
              >
                {source} · {count}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-medium text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
          Signups
        </h2>
        {rows.length === 0 ? (
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Nobody has signed up yet. The first one will appear here.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-muted/60">
                <tr className="font-medium text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                  <th className="px-4 py-3 font-normal">Name</th>
                  <th className="px-4 py-3 font-normal">Email</th>
                  <th className="px-4 py-3 font-normal">What they do</th>
                  <th className="px-4 py-3 font-normal">Form</th>
                  <th className="px-4 py-3 font-normal">Signed up</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-border align-top">
                    <td className="px-4 py-3 text-foreground">{row.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${row.email}`}
                        className="text-foreground underline decoration-border underline-offset-4"
                      >
                        {row.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.role ?? "Not given"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.source ?? "unknown"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {formatWhen(row.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Shell>
  );
}
