"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import type { BookingKind } from "@/lib/site-data"
import { addBooking, getBookings, getUserSession, subscribeToStore } from "@/lib/site-store"

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

  React.useEffect(() => {
    const syncState = () => {
      const user = getUserSession()
      const customerEmail = user?.email ?? "guest@stewart.com"
      const exists = getBookings().some(
        (booking) =>
          booking.kind === kind &&
          booking.itemId === itemId &&
          booking.customerEmail === customerEmail &&
          booking.status !== "cancelled"
      )

      setIsBooked(exists)
    }

    syncState()
    return subscribeToStore(syncState)
  }, [itemId, kind])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isBooked) {
      router.push("/dashboard")
      return
    }

    const user = getUserSession()

    addBooking({
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
  }

  return (
    <Button onClick={handleClick} {...props}>
      {isBooked ? (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          View booking
        </>
      ) : (
        children ?? initialLabel
      )}
    </Button>
  )
}
