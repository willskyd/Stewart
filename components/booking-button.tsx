"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BookingKind } from "@/lib/site-data"
import { addBooking, getBookings, getUserSession, subscribeToStore, syncBookings } from "@/lib/site-store"

type ButtonProps = React.ComponentProps<typeof Button>

interface BookingButtonProps extends Omit<ButtonProps, "onClick"> {
  kind: BookingKind
  itemId: string
  title: string
  subtitle: string
  image: string
  price: number
  href: string
  startDate?: string
  endDate?: string
  initialLabel?: string
}

export function BookingButton({
  kind,
  itemId,
  title,
  subtitle,
  image,
  price,
  href,
  startDate = new Date().toISOString().slice(0, 10),
  endDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10),
  initialLabel = "Book now",
  children,
  ...props
}: BookingButtonProps) {
  const router = useRouter()
  const [isBooked, setIsBooked] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    let isMounted = true

    const syncState = async () => {
      const nextBookings = await syncBookings()
      const user = getUserSession()
      const customerEmail = user?.email ?? "guest@stewart.com"
      const exists = nextBookings.some(
        (booking) =>
          booking.kind === kind &&
          booking.itemId === itemId &&
          booking.customerEmail === customerEmail &&
          booking.status !== "cancelled"
      )

      if (isMounted) {
        setIsBooked(exists)
      }
    }

    void syncState()

    const unsubscribe = subscribeToStore(() => {
      const user = getUserSession()
      const customerEmail = user?.email ?? "guest@stewart.com"
      const exists = getBookings().some(
        (booking) =>
          booking.kind === kind &&
          booking.itemId === itemId &&
          booking.customerEmail === customerEmail &&
          booking.status !== "cancelled"
      )

      if (isMounted) {
        setIsBooked(exists)
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [itemId, kind])

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isBooked) {
      router.push("/dashboard")
      return
    }

    if (isSubmitting) {
      return
    }

    const user = getUserSession()
    setIsSubmitting(true)

    try {
      await addBooking({
        kind,
        itemId,
        title,
        subtitle,
        image,
        price,
        href,
        startDate,
        endDate,
        customerName: user?.name ?? "Guest traveler",
        customerEmail: user?.email ?? "guest@stewart.com",
      })

      setIsBooked(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button onClick={handleClick} {...props} disabled={props.disabled || isSubmitting}>
      {isBooked ? (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          View booking
        </>
      ) : (
        children ?? (isSubmitting ? "Booking..." : initialLabel)
      )}
    </Button>
  )
}
