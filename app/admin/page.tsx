"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Clock3, Heart, LayoutDashboard, LogOut, Mail, Shield, XCircle, AlertCircle, CheckCheck, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { clearAdminSession, getAdminSession, getBookings, getFavoritePropertyIds, getSupportTickets, subscribeToStore, updateBookingStatus, updateSupportTicketStatus } from "@/lib/site-store"
import type { BookingRecord } from "@/lib/site-store"
import { formatCurrency } from "@/lib/formatters"
import { AdminNav } from "@/components/admin-nav"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isReady, setIsReady] = React.useState(false)
  const [bookingCount, setBookingCount] = React.useState(0)
  const [favoritesCount, setFavoritesCount] = React.useState(0)
  const [bookings, setBookings] = React.useState(getBookings())
  const [tickets, setTickets] = React.useState(getSupportTickets())
  const [bookingTab, setBookingTab] = React.useState("pending")
  const [selectedBooking, setSelectedBooking] = React.useState<BookingRecord | null>(null)

  // Filter bookings based on selected tab - moved before early return to follow Rules of Hooks
  const filteredBookings = React.useMemo(() => {
    switch (bookingTab) {
      case "pending":
        return bookings.filter((booking) => booking.status === "pending")
      case "approved":
        return bookings.filter((booking) => booking.status === "approved")
      case "cancelled":
        return bookings.filter((booking) => booking.status === "cancelled")
      default:
        return bookings
    }
  }, [bookings, bookingTab])

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
  const approvedBookings = bookings.filter((booking) => booking.status === "approved").length
  const cancelledBookings = bookings.filter((booking) => booking.status === "cancelled").length
  const openTickets = tickets.filter((ticket) => ticket.status !== "resolved").length

  const handleApproveBooking = (bookingId: string, customerName: string) => {
    updateBookingStatus(bookingId, "approved")
    toast({
      title: "Booking Approved",
      description: `${customerName}'s booking has been approved successfully.`,
      duration: 3000,
    })
  }

  const handleCancelBooking = (bookingId: string, customerName: string) => {
    updateBookingStatus(bookingId, "cancelled")
    toast({
      title: "Booking Cancelled",
      description: `${customerName}'s booking has been cancelled.`,
      duration: 3000,
    })
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-200"
      case "approved":
        return "bg-green-500/20 text-green-700 border-green-200"
      case "cancelled":
        return "bg-red-500/20 text-red-700 border-red-200"
      case "completed":
        return "bg-blue-500/20 text-blue-700 border-blue-200"
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "approved":
        return <CheckCheck className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock3 className="h-4 w-4" />
    }
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
              <p className="mt-2 text-3xl font-bold text-yellow-600">{pendingBookings}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="mt-2 text-3xl font-bold text-green-600">{approvedBookings}</p>
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
                <h2 className="text-2xl font-semibold text-foreground">Booking Management</h2>
              </div>

              <Tabs value={bookingTab} onValueChange={setBookingTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="pending">
                    Pending {pendingBookings > 0 && `(${pendingBookings})`}
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Approved {approvedBookings > 0 && `(${approvedBookings})`}
                  </TabsTrigger>
                  <TabsTrigger value="cancelled">
                    Cancelled {cancelledBookings > 0 && `(${cancelledBookings})`}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={bookingTab} className="space-y-4 mt-6">
                  {filteredBookings.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                      <p className="text-muted-foreground">
                        {bookingTab === "pending" && "No pending bookings to review"}
                        {bookingTab === "approved" && "No approved bookings"}
                        {bookingTab === "cancelled" && "No cancelled bookings"}
                      </p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => (
                      <div 
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className="rounded-2xl border border-border overflow-hidden hover:shadow-xl transition cursor-pointer group"
                      >
                        {/* Full Background Image with Overlay */}
                        <div className="relative w-full h-64 lg:h-56 overflow-hidden bg-gray-300">
                          <Image
                            src={booking.image}
                            alt={booking.title}
                            fill
                            className="object-cover group-hover:scale-110 transition duration-300"
                            sizes="100vw"
                          />
                          
                          {/* Gradient Overlay - Dark from bottom */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                          
                          {/* Content Overlay - positioned at bottom */}
                          <div className="absolute inset-0 p-5 flex flex-col justify-end">
                            {/* Status Badge - Top Right */}
                            <div className="absolute top-4 right-4">
                              <Badge className={`${getStatusBadgeColor(booking.status)} flex items-center gap-1 text-xs`}>
                                {getStatusIcon(booking.status)}
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>

                            {/* Title and Details */}
                            <div className="text-white">
                              <h3 className="text-2xl font-bold mb-2">{booking.title}</h3>
                              <p className="text-white/90 text-sm mb-3">{booking.subtitle}</p>
                              
                              {/* Info Grid */}
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-white/70 text-xs uppercase tracking-wide">Customer</p>
                                  <p className="text-white font-medium text-sm">{booking.customerName}</p>
                                </div>
                                <div>
                                  <p className="text-white/70 text-xs uppercase tracking-wide">Amount</p>
                                  <p className="text-white font-bold text-lg">{formatCurrency(booking.price)}</p>
                                </div>
                              </div>

                              <div className="mb-4 text-white/80 text-sm">
                                📅 {booking.startDate} to {booking.endDate}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2">
                                {booking.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleApproveBooking(booking.id, booking.customerName)
                                      }}
                                    >
                                      <CheckCircle2 className="mr-1 h-3 w-3" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleCancelBooking(booking.id, booking.customerName)
                                      }}
                                    >
                                      <XCircle className="mr-1 h-3 w-3" />
                                      Decline
                                    </Button>
                                  </>
                                )}
                                {booking.status === "approved" && (
                                  <Button
                                    size="sm"
                                    className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs flex-1"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleCancelBooking(booking.id, booking.customerName)
                                    }}
                                  >
                                    <XCircle className="mr-1 h-3 w-3" />
                                    Cancel
                                  </Button>
                                )}
                                {booking.status === "cancelled" && (
                                  <Button
                                    size="sm"
                                    className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs flex-1"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleApproveBooking(booking.id, booking.customerName)
                                    }}
                                  >
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    Reactivate
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
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

      {/* Booking Details Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBooking.title}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-6">
                {/* Main Image */}
                <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={selectedBooking.image}
                    alt={selectedBooking.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>

                {/* Booking Information */}
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={`${getStatusBadgeColor(selectedBooking.status)} flex items-center gap-1`}>
                      {getStatusIcon(selectedBooking.status)}
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Subtitle */}
                  <div>
                    <p className="text-sm text-muted-foreground">Location/Details</p>
                    <p className="text-base font-medium text-foreground">{selectedBooking.subtitle}</p>
                  </div>

                  {/* Customer Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer Name</p>
                      <p className="text-base font-medium text-foreground">{selectedBooking.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Customer Email</p>
                      <p className="text-base font-medium text-foreground">{selectedBooking.customerEmail}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Check-in Date</p>
                      <p className="text-base font-medium text-foreground">{selectedBooking.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Check-out Date</p>
                      <p className="text-base font-medium text-foreground">{selectedBooking.endDate}</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Booking Price</p>
                      <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedBooking.price)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Booking Type</p>
                      <p className="text-base font-medium text-foreground capitalize">{selectedBooking.kind}</p>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Created</p>
                    <p className="text-sm text-foreground">{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                  </div>

                  {/* Item ID */}
                  <div className="text-xs text-muted-foreground bg-secondary/20 p-2 rounded">
                    Id: {selectedBooking.id}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  {selectedBooking.status === "pending" && (
                    <>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          handleApproveBooking(selectedBooking.id, selectedBooking.customerName)
                          setSelectedBooking(null)
                        }}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve Booking
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          handleCancelBooking(selectedBooking.id, selectedBooking.customerName)
                          setSelectedBooking(null)
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Decline Booking
                      </Button>
                    </>
                  )}
                  {selectedBooking.status === "approved" && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleCancelBooking(selectedBooking.id, selectedBooking.customerName)
                        setSelectedBooking(null)
                      }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel Booking
                    </Button>
                  )}
                  {selectedBooking.status === "cancelled" && (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleApproveBooking(selectedBooking.id, selectedBooking.customerName)
                        setSelectedBooking(null)
                      }}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Reactivate Booking
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
