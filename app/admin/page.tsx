"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle2, Clock3, Heart, LayoutDashboard, LogOut, Mail, Shield, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { clearAdminSession, getAdminSession, getBookings, getFavoritePropertyIds, getSupportTickets, subscribeToStore, updateBookingStatus, updateSupportTicketStatus } from "@/lib/site-store"
import { formatCurrency } from "@/lib/formatters"
import { AdminNav } from "@/components/admin-nav"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isReady, setIsReady] = React.useState(false)
  const [bookingCount, setBookingCount] = React.useState(0)
  const [favoritesCount, setFavoritesCount] = React.useState(0)
  const [bookings, setBookings] = React.useState(getBookings())
  const [tickets, setTickets] = React.useState(getSupportTickets())

  React.useEffect(() => {
    const session = getAdminSession()

    if (!session) {
      router.push("/admin/signin")
      return
    }

    const syncState = () => {
      const nextBookings = getBookings()
      const nextTickets = getSupportTickets()
      setBookings(nextBookings)
      setTickets(nextTickets)
      setBookingCount(nextBookings.length)
      setFavoritesCount(getFavoritePropertyIds().length)
    }

    syncState()
    setIsReady(true)
    return subscribeToStore(syncState)
  }, [router])

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
      </div>
    )
  }

  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length
  const openTickets = tickets.filter((ticket) => ticket.status !== "resolved").length

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
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Control Panel
                </div>
                <h1 className="text-4xl font-bold text-foreground md:text-5xl">Complete Site Operations Control</h1>
                <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                  Full administrative access to manage all bookings, user activity, support tickets, and site-wide operations. Monitor everything happening on Stewart.com in real-time.
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

        <section className="py-10">
          <div className="container mx-auto grid gap-4 px-4 md:grid-cols-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Total bookings</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{bookingCount}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Pending approvals</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{pendingBookings}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Open tickets</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{openTickets}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Saved favorites</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{favoritesCount}</p>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Booking approvals</h2>
              </div>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-2xl border border-border p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{booking.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{booking.subtitle}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {booking.customerName} · {booking.customerEmail}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {booking.startDate} to {booking.endDate}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-muted-foreground">Amount</p>
                          <p className="font-semibold text-foreground">{formatCurrency(booking.price)}</p>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">{booking.status}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="rounded-full"
                            onClick={() => updateBookingStatus(booking.id, "approved")}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Support messages</h2>
              </div>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-2xl border border-border p-4">
                    <p className="font-medium text-foreground">{ticket.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{ticket.email}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{ticket.message}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" />
                        {ticket.status}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() =>
                          updateSupportTicketStatus(
                            ticket.id,
                            ticket.status === "resolved" ? "in-progress" : "resolved"
                          )
                        }
                      >
                        {ticket.status === "resolved" ? "Re-open" : "Resolve"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                Favorite activity is also tracked for a quick signal of what inventory is attracting attention.
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
                <Heart className="h-4 w-4 text-rose-500" />
                {favoritesCount} total favorites saved across the site
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full rounded-full" asChild>
                  <Link href="/favorites">Open favorites page</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
