"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, CalendarDays, Heart, LogOut, ShieldCheck, Sparkles, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useServiceCatalog } from "@/hooks/use-service-catalog"
import { formatCurrency } from "@/lib/formatters"
import { clearUserSession, getBookings, getFavoritePropertyIds, getUserSession, subscribeToStore, syncBookings } from "@/lib/site-store"

const BOOKINGS_POLL_INTERVAL_MS = 2000

export default function DashboardPage() {
  const router = useRouter()
  const { properties } = useServiceCatalog()
  const [user, setUser] = React.useState<{ name: string; email: string; firstName?: string } | null>(null)
  const [bookingRecords, setBookingRecords] = React.useState(getBookings())
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([])

  React.useEffect(() => {
    const session = getUserSession()

    if (!session) {
      router.push("/signin")
      return
    }

    let isMounted = true
    setUser(session)

    const syncState = async (force = false) => {
      const nextBookings = await syncBookings({ force })

      if (!isMounted) {
        return
      }

      setBookingRecords(nextBookings)
      setFavoriteIds(getFavoritePropertyIds())
    }

    void syncState(true)

    const unsubscribe = subscribeToStore(() => {
      void syncState()
    })

    const pollId = window.setInterval(() => {
      void syncState(true)
    }, BOOKINGS_POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      unsubscribe()
      window.clearInterval(pollId)
    }
  }, [router])

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
      </div>
    )
  }

  const myBookings = bookingRecords.filter((booking) => booking.customerEmail === user.email)
  const bookingsToShow = myBookings.length > 0 ? myBookings : bookingRecords.slice(0, 3)
  const savedProperties = properties.filter((property) => favoriteIds.includes(property.id))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="mx-auto mb-4 h-20 w-20">
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                      {user.firstName ? user.firstName[0] : user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-600">
                    <Award className="h-4 w-4" />
                    Genius Level 2
                  </div>
                  <div className="mt-6 text-left">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress to Level 3</span>
                      <span className="font-medium text-foreground">3/5 stays</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 p-4">
                <Button className="w-full rounded-full" asChild>
                  <Link href="/">Book a new trip</Link>
                </Button>
                <Button variant="outline" className="w-full rounded-full" asChild>
                  <Link href="/favorites">Open favorites</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => {
                    clearUserSession()
                    router.push("/")
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.firstName || user.name.split(" ")[0]}</h1>
              <p className="mt-2 text-muted-foreground">
                This dashboard now reflects the same favorites and booking activity used across the live search, detail, and admin flows.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <CalendarDays className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{bookingsToShow.length}</p>
                      <p className="text-sm text-muted-foreground">Tracked bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-rose-500/10 p-3">
                      <Heart className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{savedProperties.length}</p>
                      <p className="text-sm text-muted-foreground">Saved favorites</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-emerald-500/10 p-3">
                      <ShieldCheck className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {bookingsToShow.filter((booking) => booking.status === "approved").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Approved bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My bookings</CardTitle>
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href="/support">Need booking help</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingsToShow.map((booking) => (
                  <Link
                    key={booking.id}
                    href={booking.href}
                    className="flex flex-col gap-4 rounded-2xl border border-border p-4 transition hover:border-primary/40 sm:flex-row"
                  >
                    <div className="relative h-28 w-full overflow-hidden rounded-2xl sm:w-32">
                      <Image src={booking.image} alt={booking.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{booking.title}</h3>
                          <p className="text-sm text-muted-foreground">{booking.subtitle}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            booking.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : booking.status === "cancelled"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-primary/10 text-primary"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{booking.startDate}</span>
                        <span>{booking.endDate}</span>
                      </div>
                      <p className="mt-4 font-semibold text-foreground">{formatCurrency(booking.price)}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved properties</CardTitle>
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <Link href="/favorites">View all favorites</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {savedProperties.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {savedProperties.map((property) => (
                      <Link key={property.id} href={`/property/${property.id}`} className="rounded-2xl border border-border p-3 transition hover:border-primary/40">
                        <div className="relative mb-3 h-32 overflow-hidden rounded-xl">
                          <Image src={property.image} alt={property.title} fill className="object-cover" />
                        </div>
                        <h3 className="font-medium text-foreground">{property.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{property.location}</p>
                        <p className="mt-3 font-semibold text-foreground">{formatCurrency(property.price)}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-secondary/20 p-8 text-center">
                    <User2 className="mx-auto h-10 w-10 text-primary" />
                    <h3 className="mt-4 text-xl font-semibold text-foreground">No saved properties yet</h3>
                    <p className="mt-2 text-muted-foreground">
                      Tap the heart icon on any property card and it will appear here instantly.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-medium">Support stays connected</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Need changes to a booking? Open support or use admin approval flow to track what happens next.
                  </p>
                </div>
                <Button className="rounded-full" asChild>
                  <Link href="/support">Contact support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
