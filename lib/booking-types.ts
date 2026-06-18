import type { BookingKind, BookingStatus } from "@/lib/site-data"

export interface BookingRecord {
  id: string
  kind: BookingKind
  itemId: string
  title: string
  subtitle: string
  image: string
  price: number
  status: BookingStatus
  customerName: string
  customerEmail: string
  startDate: string
  endDate: string
  createdAt: string
  href: string
}

export type CreateBookingInput = Omit<BookingRecord, "id" | "createdAt" | "status"> & {
  status?: BookingStatus
}

export interface BookingMutationResponse {
  booking: BookingRecord
  bookings: BookingRecord[]
}
