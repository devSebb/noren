"use client"

import { useState } from "react"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const [logoutLoading, setLogoutLoading] = useState(false)

  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      window.location.href = "/admin/login"
    } catch {
      toast.error("Logout failed")
      setLogoutLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
  const labelClass = "block text-sm font-medium mb-1.5"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Store configuration</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Store Info */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-bold">Store Information</h2>
          <p className="text-sm text-muted-foreground">
            Store details are configured via environment variables. Update your{" "}
            <code className="bg-secondary px-1 py-0.5 rounded text-xs">.env.local</code> file to
            change store name, support email, and other global settings.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: "Store Name", env: "NEXT_PUBLIC_STORE_NAME" },
              { label: "Support Email", env: "SUPPORT_EMAIL" },
              { label: "Domain", env: "NEXT_PUBLIC_APP_URL" },
              { label: "Stripe Mode", env: "STRIPE_SECRET_KEY" },
            ].map((item) => (
              <div key={item.env}>
                <p className="text-muted-foreground mb-1">{item.label}</p>
                <code className="text-xs bg-secondary px-2 py-1 rounded">{item.env}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-bold">Integrations</h2>
          <div className="space-y-3 text-sm">
            {[
              { name: "Stripe", key: "STRIPE_SECRET_KEY", status: !!process.env.STRIPE_SECRET_KEY },
              { name: "Printify", key: "PRINTIFY_API_TOKEN", status: !!process.env.PRINTIFY_API_TOKEN },
              { name: "Resend", key: "RESEND_API_KEY", status: !!process.env.RESEND_API_KEY },
              { name: "Supabase", key: "NEXT_PUBLIC_SUPABASE_URL", status: !!process.env.NEXT_PUBLIC_SUPABASE_URL },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between">
                <span className="font-medium">{integration.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  integration.status
                    ? "bg-[#4ade80]/10 text-[#4ade80]"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {integration.status ? "Configured" : "Not configured"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-bold">Quick Links</h2>
          <div className="space-y-2 text-sm">
            {[
              { label: "Stripe Dashboard", href: "https://dashboard.stripe.com" },
              { label: "Printify Dashboard", href: "https://printify.com/app/dashboard" },
              { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
              { label: "Resend Dashboard", href: "https://resend.com" },
              { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-border rounded-xl hover:bg-secondary transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-muted-foreground">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-bold">Session</h2>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50 rounded-xl text-sm font-medium transition-colors"
          >
            {logoutLoading ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>
    </div>
  )
}
