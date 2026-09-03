import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SectionLabel } from "@/components/site-chrome";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { Lock, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal — TechVRS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    const sb = getSupabase();
    if (sb) {
      sb.auth.getSession().then(({ data }) => {
        if (data.session) {
          navigate({ to: "/admin/demos" });
        }
      });
    }
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const sb = getSupabase();
    if (!sb) {
      // In development when Supabase credentials are not in .env
      setError("Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await sb.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.session) {
        navigate({ to: "/admin/demos" });
      }
    } catch (err: any) {
      setError(err.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-28 min-h-[75vh] flex flex-col justify-center">
      <div className="panel brackets p-8 md:p-10 relative shadow-2xl">
        <span className="b-tr" />
        <span className="b-bl" />

        <div className="mono text-[10px] uppercase tracking-widest text-signal mb-4 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5" />
          SECURE ADMINISTRATIVE ACCESS
        </div>

        <h1 className="font-display font-bold text-3xl text-foreground mb-2">
          TechVRS Admin
        </h1>
        <p className="text-xs text-muted-foreground mb-6">
          Sign in to manage demo websites, categories, and showcase assets.
        </p>

        {!isConfigured && (
          <div className="p-3.5 mb-6 rounded-lg bg-amber/10 border border-amber/30 text-amber text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              Supabase Setup Notice
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              Provide your <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env</code>. You can also run <code>supabase/schema.sql</code> in your Supabase SQL Editor.
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 mb-6 rounded-lg bg-critical/10 border border-critical/40 text-critical text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@techvrs.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-panel/60 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-signal transition-colors mono"
            />
          </div>

          <div>
            <label className="mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-panel/60 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-signal transition-colors mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-signal text-signal-foreground font-semibold mono text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_25px_var(--signal)] transition-shadow disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating…" : "Sign In to Admin →"}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-hairline/40 flex items-center justify-between text-[11px] mono text-muted-foreground">
          <span>Protected by Supabase Auth</span>
          <span className="text-signal">Row Level Security</span>
        </div>
      </div>
    </div>
  );
}
