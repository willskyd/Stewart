import { NextResponse } from "next/server"
import { z } from "zod"
import { createBooking, listBookings } from "@/lib/server/bookings-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const bookingKinds = ["stay", "attraction", "flight", "car-rental", "airport-taxi"] as const

const createBookingSchema = z.object({
  kind: z.enum(bookingKinds),
  itemId: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  image: z.string().min(1),
  price: z.number().finite().nonnegative(),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  href: z.string().min(1),
  status: z.enum(["pending", "approved", "cancelled", "completed"]).optional(),
})

function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers)
  headers.set("Cache-Control", "no-store")

  return NextResponse.json(body, {
    ...init,
    headers,
  })
}

export async function GET() {
  const bookings = await listBookings()
  return jsonResponse(bookings)
}

export async function POST(request: Request) {
  try {
    const payload = createBookingSchema.parse(await request.json())
    const result = await createBooking(payload)
    return jsonResponse(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse(
        {
          error: "Invalid booking payload.",
          issues: error.flatten(),
        },
        { status: 400 }
      )
    }

    return jsonResponse(
      {
        error: "Unable to create booking.",
      },
      { status: 500 }
    )
  }
}
