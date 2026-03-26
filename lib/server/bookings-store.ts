import "server-only"

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { appendActivity } from "@/lib/server/activities-store"
import { demoBookings, type BookingStatus } from "@/lib/site-data"
import type { BookingMutationResponse, BookingRecord, CreateBookingInput } from "@/lib/booking-types"

interface BookingActivityActor {
  email: string
  name: string
  role: "guest" | "user" | "admin" | "system"
}

const DATA_DIRECTORY = path.join(process.cwd(), "data")
const BOOKINGS_FILE = path.join(DATA_DIRECTORY, "bookings.json")

let mutationQueue = Promise.resolve()

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}`
}

async function ensureBookingsFile() {
  await mkdir(DATA_DIRECTORY, { recursive: true })

  try {
    return await readFile(BOOKINGS_FILE, "utf8")
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException

    if (fileError.code !== "ENOENT") {
      throw error
    }

    const seededData = JSON.stringify(demoBookings, null, 2)
    await writeFile(BOOKINGS_FILE, seededData, "utf8")
    return seededData
  }
}

async function readBookingsFile() {
  const raw = await ensureBookingsFile()

  try {
    const parsed = JSON.parse(raw) as BookingRecord[]
    return Array.isArray(parsed) ? parsed : [...demoBookings]
  } catch {
    await writeBookingsFile([...demoBookings])
    return [...demoBookings]
  }
}

async function writeBookingsFile(bookings: BookingRecord[]) {
  await mkdir(DATA_DIRECTORY, { recursive: true })
  await writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf8")
  return bookings
}

function runSerialized<T>(operation: () => Promise<T>) {
  const nextOperation = mutationQueue.then(operation, operation)
  mutationQueue = nextOperation.then(
    () => undefined,
    () => undefined
  )

  return nextOperation
}

export async function listBookings() {
  return readBookingsFile()
}

export async function createBooking(input: CreateBookingInput): Promise<BookingMutationResponse> {
  return runSerialized(async () => {
    const bookings = await readBookingsFile()
    const existingBooking = bookings.find(
      (booking) =>
        booking.kind === input.kind &&
        booking.itemId === input.itemId &&
        booking.customerEmail === input.customerEmail &&
        booking.status !== "cancelled"
    )

    if (existingBooking) {
      return {
        booking: existingBooking,
        bookings,
      }
    }

    const nextBooking: BookingRecord = {
      ...input,
      id: createId("booking"),
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    const nextBookings = [nextBooking, ...bookings]
    await writeBookingsFile(nextBookings)
    await appendActivity({
      category: "booking",
      action: "booking-created",
      actorRole: input.customerEmail === "guest@stewart.com" ? "guest" : "user",
      actorName: input.customerName,
      actorEmail: input.customerEmail,
      subjectType: "booking",
      subjectId: nextBooking.id,
      title: "Booking placed",
      description: `${input.customerName} placed a ${input.kind} booking for ${input.title}.`,
      subjectTitle: input.title,
      subjectSubtitle: input.subtitle,
    }).catch((error) => {
      console.error("Failed to append booking creation activity.", error)
    })

    return {
      booking: nextBooking,
      bookings: nextBookings,
    }
  })
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  actor: BookingActivityActor = {
    email: "system@stewart.com",
    name: "Stewart system",
    role: "system",
  }
): Promise<BookingMutationResponse | null> {
  return runSerialized(async () => {
    const bookings = await readBookingsFile()
    const currentBooking = bookings.find((booking) => booking.id === bookingId)

    if (!currentBooking) {
      return null
    }

    const nextBooking: BookingRecord = {
      ...currentBooking,
      status,
    }

    const nextBookings = bookings.map((booking) =>
      booking.id === bookingId ? nextBooking : booking
    )

    await writeBookingsFile(nextBookings)
    await appendActivity({
      category: "booking",
      action: `booking-${status}`,
      actorRole: actor.role,
      actorName: actor.name,
      actorEmail: actor.email,
      subjectType: "booking",
      subjectId: nextBooking.id,
      title: `Booking ${status}`,
      description: `${actor.name} marked ${currentBooking.customerName}'s booking for ${currentBooking.title} as ${status}.`,
      subjectTitle: currentBooking.title,
      subjectSubtitle: currentBooking.subtitle,
    }).catch((error) => {
      console.error("Failed to append booking status activity.", error)
    })

    return {
      booking: nextBooking,
      bookings: nextBookings,
    }
  })
}
