"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin-nav"
import { getAdminSession, clearAdminSession } from "@/lib/site-store"
import { LogOut, Settings } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    const session = getAdminSession()
    if (!session) {
      router.push("/admin/signin")
      return
    }
    setIsReady(true)
  }, [router])

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminNav />

      <main>
        <section className="border-b border-border bg-linear-to-br from-primary/10 via-background to-secondary/30">
          <div className="container mx-auto px-4 py-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm text-primary shadow-sm">
                  <Settings className="h-4 w-4" />
                  Admin Settings
                </div>
                <h1 className="text-4xl font-bold text-foreground md:text-5xl">System Settings & Configuration</h1>
                <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                  Manage site-wide settings, admin credentials, and system configuration for Stewart.com platform.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  clearAdminSession()
                  router.push("/")
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8">
              {/* Settings sections */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Admin Account Settings</h2>
                <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Admin Email</p>
                      <p className="text-sm text-muted-foreground mt-1">stewartadmin@gmail.com</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Available Admin Accounts</h2>
                <p className="text-muted-foreground mb-6">The following admin accounts have full access to the system:</p>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-xl bg-secondary/10">
                    <p className="text-sm text-muted-foreground mb-2">Primary Admin Account</p>
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 font-mono text-sm text-foreground">
                      <p>Email: stewartadmin@gmail.com</p>
                      <p className="mt-1">Password: (Securely stored)</p>
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-xl bg-secondary/10">
                    <p className="text-sm text-muted-foreground mb-2">Secondary Admin Account</p>
                    <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 font-mono text-sm text-foreground">
                      <p>Email: admin@stewart.com</p>
                      <p className="mt-1">Password: (Securely stored)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-700 font-semibold mb-1">🔒 Security Note</p>
                  <p className="text-xs text-yellow-600">
                    Keep your admin credentials secure. Never share your password. Change it regularly and notify other admins if you suspect unauthorized access.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Access Permissions</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-secondary/10">
                    <div>
                      <p className="font-medium text-foreground">View All Bookings</p>
                      <p className="text-sm text-muted-foreground">Full access to booking management</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-secondary/10">
                    <div>
                      <p className="font-medium text-foreground">Manage Support Tickets</p>
                      <p className="text-sm text-muted-foreground">Review and resolve customer support</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-secondary/10">
                    <div>
                      <p className="font-medium text-foreground">Track User Activities</p>
                      <p className="text-sm text-muted-foreground">Monitor site-wide user activities and favorites</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-secondary/10">
                    <div>
                      <p className="font-medium text-foreground">Full Site Control</p>
                      <p className="text-sm text-muted-foreground">Complete administrative access</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Links</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button asChild variant="outline" className="h-12 rounded-full justify-start">
                    <a href="/admin">Go to Dashboard</a>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-full justify-start">
                    <a href="/">Return to Home</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
