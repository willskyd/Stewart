import { NextResponse } from "next/server"
import { z } from "zod"
import { updateBookingStatus } from "@/lib/server/bookings-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const updateBookingSchema = z.object({
  status: z.enum(["pending", "approved", "cancelled", "completed"]),
  actor: z
    .object({
      email: z.string().min(1),
      name: z.string().min(1),
      role: z.enum(["guest", "user", "admin", "system"]),
    })
    .optional(),
})

function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers)
  headers.set("Cache-Control", "no-store")

  return NextResponse.json(body, {
    ...init,
    headers,
  })
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await context.params
    const payload = updateBookingSchema.parse(await request.json())
    const result = await updateBookingStatus(bookingId, payload.status, payload.actor)

    if (!result) {
      return jsonResponse(
        {
          error: "Booking not found.",
        },
        { status: 404 }
      )
    }

    return jsonResponse(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse(
        {
          error: "Invalid booking update payload.",
          issues: error.flatten(),
        },
        { status: 400 }
      )
    }

    return jsonResponse(
      {
        error: "Unable to update booking.",
      },
      { status: 500 }
    )
  }
}
