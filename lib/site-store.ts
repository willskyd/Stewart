import type {
  ActivityMutationResponse,
  CreateSiteActivityInput,
  SiteActivityRecord,
} from "@/lib/activity-types"
import type { BookingMutationResponse, BookingRecord, CreateBookingInput } from "@/lib/booking-types"
import type { BookingStatus } from "@/lib/site-data"
import { demoBookings, demoSupportTickets, getPropertyById } from "@/lib/site-data"

export type { BookingRecord } from "@/lib/booking-types"
export type { SiteActivityRecord } from "@/lib/activity-types"

export interface UserSession {
  email: string
  name: string
  firstName?: string
  lastName?: string
  isLoggedIn: boolean
}

export interface AdminSession {
  email: string
  isAdmin: true
  signedInAt: string
}

export interface SupportTicketRecord {
  id: string
  name: string
  email: string
  category: string
  bookingRef: string
  message: string
  status: "new" | "in-progress" | "resolved"
  createdAt: string
}

const STORAGE_EVENT = "stewart:store-change"
const FAVORITES_KEY = "stewart_favorites"
const USER_KEY = "stewart_user"
const ADMIN_KEY = "stewart_admin_session"
const BOOKINGS_KEY = "stewart_bookings"
const ACTIVITIES_KEY = "stewart_activities"
const TICKETS_KEY = "stewart_support_tickets"
const BOOKINGS_REFRESH_TTL_MS = 4000
const ACTIVITIES_REFRESH_TTL_MS = 4000

let bookingsRequest: Promise<BookingRecord[]> | null = null
let activitiesRequest: Promise<SiteActivityRecord[]> | null = null
let lastBookingsSyncAt = 0
let lastActivitiesSyncAt = 0

function canUseBrowser() {
  return typeof window !== "undefined"
}

function readJson<T>(key: string, fallback: T) {
  if (!canUseBrowser()) {
    return fallback
  }

  const value = window.localStorage.getItem(key)

  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseBrowser()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

function setBookingsCache(bookings: BookingRecord[]) {
  lastBookingsSyncAt = Date.now()
  writeJson(BOOKINGS_KEY, bookings)
}

function setActivitiesCache(activities: SiteActivityRecord[]) {
  lastActivitiesSyncAt = Date.now()
  writeJson(ACTIVITIES_KEY, activities)
}

async function requestJson<T>(input: string, init?: RequestInit) {
  if (!canUseBrowser()) {
    throw new Error("Network requests are only available in the browser.")
  }

  const headers = new Headers(init?.headers)

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  const response = await fetch(input, {
    ...init,
    headers,
    cache: "no-store",
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}.`

    try {
      const errorPayload = (await response.json()) as { error?: string }

      if (errorPayload.error) {
        message = errorPayload.error
      }
    } catch {
      // Ignore JSON parsing errors for non-JSON responses.
    }

    throw new Error(message)
  }

  return (await response.json()) as T
}

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}`
}

export function subscribeToStore(callback: () => void) {
  if (!canUseBrowser()) {
    return () => undefined
  }

  const handler = () => callback()
  window.addEventListener(STORAGE_EVENT, handler)
  window.addEventListener("storage", handler)

  return () => {
    window.removeEventListener(STORAGE_EVENT, handler)
    window.removeEventListener("storage", handler)
  }
}

function getCurrentActivityActor() {
  const admin = getAdminSession()

  if (admin) {
    return {
      role: "admin" as const,
      name: admin.email,
      email: admin.email,
    }
  }

  const user = getUserSession()

  if (user) {
    return {
      role: "user" as const,
      name: user.name,
      email: user.email,
    }
  }

  return {
    role: "guest" as const,
    name: "Guest traveler",
    email: "guest@stewart.com",
  }
}

export function getFavoritePropertyIds() {
  return readJson<string[]>(FAVORITES_KEY, [])
}

export function isFavoriteProperty(propertyId: string) {
  return getFavoritePropertyIds().includes(propertyId)
}

export async function toggleFavoriteProperty(propertyId: string) {
  const favorites = getFavoritePropertyIds()
  const nextFavorites = favorites.includes(propertyId)
    ? favorites.filter((id) => id !== propertyId)
    : [...favorites, propertyId]
  const isFavorite = nextFavorites.includes(propertyId)
  const property = getPropertyById(propertyId)
  const actor = getCurrentActivityActor()

  writeJson(FAVORITES_KEY, nextFavorites)

  try {
    await logActivity({
      category: "favorite",
      action: isFavorite ? "favorite-added" : "favorite-removed",
      actorRole: actor.role,
      actorName: actor.name,
      actorEmail: actor.email,
      subjectType: "property",
      subjectId: propertyId,
      title: isFavorite ? "Favorite saved" : "Favorite removed",
      description: property
        ? `${actor.name} ${isFavorite ? "saved" : "removed"} ${property.title} ${isFavorite ? "to" : "from"} favorites.`
        : `${actor.name} ${isFavorite ? "saved" : "removed"} a property ${isFavorite ? "to" : "from"} favorites.`,
      subjectTitle: property?.title,
      subjectSubtitle: property?.location,
    })
  } catch (error) {
    console.error("Failed to record favorite activity.", error)
  }

  return isFavorite
}

export function getUserSession() {
  return readJson<UserSession | null>(USER_KEY, null)
}

export function setUserSession(
  session: UserSession,
  options?: {
    action?: "user-registered" | "user-signed-in"
    title?: string
    description?: string
  }
) {
  writeJson(USER_KEY, session)
  void logActivity({
    category: "account",
    action: options?.action ?? "user-signed-in",
    actorRole: "user",
    actorName: session.name,
    actorEmail: session.email,
    subjectType: "session",
    subjectId: session.email,
    title: options?.title ?? "User signed in",
    description: options?.description ?? `${session.name} signed in to the customer dashboard.`,
    subjectTitle: session.name,
    subjectSubtitle: session.email,
  }).catch((error) => {
    console.error("Failed to record user session activity.", error)
  })
}

export function clearUserSession() {
  if (!canUseBrowser()) {
    return
  }

  const currentSession = getUserSession()
  window.localStorage.removeItem(USER_KEY)
  window.dispatchEvent(new Event(STORAGE_EVENT))

  if (!currentSession) {
    return
  }

  void logActivity({
    category: "account",
    action: "user-signed-out",
    actorRole: "user",
    actorName: currentSession.name,
    actorEmail: currentSession.email,
    subjectType: "session",
    subjectId: currentSession.email,
    title: "User signed out",
    description: `${currentSession.name} signed out of the customer account.`,
    subjectTitle: currentSession.name,
    subjectSubtitle: currentSession.email,
  }).catch((error) => {
    console.error("Failed to record user sign-out activity.", error)
  })
}

export function getAdminSession() {
  return readJson<AdminSession | null>(ADMIN_KEY, null)
}

export function setAdminSession(session: AdminSession) {
  writeJson(ADMIN_KEY, session)
  void logActivity({
    category: "admin",
    action: "admin-signed-in",
    actorRole: "admin",
    actorName: session.email,
    actorEmail: session.email,
    subjectType: "session",
    subjectId: session.email,
    title: "Admin signed in",
    description: `${session.email} signed into the admin dashboard.`,
    subjectTitle: session.email,
  }).catch((error) => {
    console.error("Failed to record admin sign-in activity.", error)
  })
}

export function clearAdminSession() {
  if (!canUseBrowser()) {
    return
  }

  const currentSession = getAdminSession()
  window.localStorage.removeItem(ADMIN_KEY)
  window.dispatchEvent(new Event(STORAGE_EVENT))

  if (!currentSession) {
    return
  }

  void logActivity({
    category: "admin",
    action: "admin-signed-out",
    actorRole: "admin",
    actorName: currentSession.email,
    actorEmail: currentSession.email,
    subjectType: "session",
    subjectId: currentSession.email,
    title: "Admin signed out",
    description: `${currentSession.email} signed out of the admin dashboard.`,
    subjectTitle: currentSession.email,
  }).catch((error) => {
    console.error("Failed to record admin sign-out activity.", error)
  })
}

export function getBookings() {
  return readJson<BookingRecord[]>(BOOKINGS_KEY, demoBookings)
}

export function getActivities() {
  return readJson<SiteActivityRecord[]>(ACTIVITIES_KEY, [])
}

export async function syncBookings(options?: { force?: boolean }) {
  if (!canUseBrowser()) {
    return getBookings()
  }

  const cachedBookings = getBookings()
  const shouldReuseCache =
    !options?.force &&
    lastBookingsSyncAt > 0 &&
    Date.now() - lastBookingsSyncAt < BOOKINGS_REFRESH_TTL_MS

  if (shouldReuseCache) {
    return cachedBookings
  }

  if (!options?.force && bookingsRequest) {
    return bookingsRequest
  }

  bookingsRequest = requestJson<BookingRecord[]>("/api/bookings")
    .then((bookings) => {
      setBookingsCache(bookings)
      return bookings
    })
    .catch((error) => {
      console.error("Failed to sync bookings.", error)
      return cachedBookings
    })
    .finally(() => {
      bookingsRequest = null
    })

  return bookingsRequest
}

export async function syncActivities(options?: { force?: boolean }) {
  if (!canUseBrowser()) {
    return getActivities()
  }

  const cachedActivities = getActivities()
  const shouldReuseCache =
    !options?.force &&
    lastActivitiesSyncAt > 0 &&
    Date.now() - lastActivitiesSyncAt < ACTIVITIES_REFRESH_TTL_MS

  if (shouldReuseCache) {
    return cachedActivities
  }

  if (!options?.force && activitiesRequest) {
    return activitiesRequest
  }

  activitiesRequest = requestJson<SiteActivityRecord[]>("/api/activities")
    .then((activities) => {
      setActivitiesCache(activities)
      return activities
    })
    .catch((error) => {
      console.error("Failed to sync activities.", error)
      return cachedActivities
    })
    .finally(() => {
      activitiesRequest = null
    })

  return activitiesRequest
}

export async function addBooking(booking: CreateBookingInput) {
  const result = await requestJson<BookingMutationResponse>("/api/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
  })

  setBookingsCache(result.bookings)
  return result.booking
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const actor = getCurrentActivityActor()
  const result = await requestJson<BookingMutationResponse>(`/api/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({ status, actor }),
  })

  setBookingsCache(result.bookings)
  return result.booking
}

export async function logActivity(activity: CreateSiteActivityInput) {
  const result = await requestJson<ActivityMutationResponse>("/api/activities", {
    method: "POST",
    body: JSON.stringify(activity),
  })

  setActivitiesCache(result.activities)
  return result.activity
}

export function getSupportTickets() {
  return readJson<SupportTicketRecord[]>(TICKETS_KEY, demoSupportTickets)
}

export function addSupportTicket(ticket: Omit<SupportTicketRecord, "id" | "createdAt" | "status">) {
  const actor = getCurrentActivityActor()
  const nextTicket: SupportTicketRecord = {
    ...ticket,
    id: createId("ticket"),
    createdAt: new Date().toISOString(),
    status: "new",
  }

  writeJson(TICKETS_KEY, [nextTicket, ...getSupportTickets()])
  void logActivity({
    category: "support",
    action: "support-ticket-created",
    actorRole: actor.role === "admin" ? "admin" : actor.role,
    actorName: nextTicket.name,
    actorEmail: nextTicket.email,
    subjectType: "support-ticket",
    subjectId: nextTicket.id,
    title: "Support message sent",
    description: `${nextTicket.name} submitted a ${nextTicket.category} support request.`,
    subjectTitle: nextTicket.category,
    subjectSubtitle: nextTicket.bookingRef,
  }).catch((error) => {
    console.error("Failed to record support ticket activity.", error)
  })
  return nextTicket
}

export function updateSupportTicketStatus(ticketId: string, status: SupportTicketRecord["status"]) {
  const currentTicket = getSupportTickets().find((ticket) => ticket.id === ticketId)
  const nextTickets = getSupportTickets().map((ticket) =>
    ticket.id === ticketId ? { ...ticket, status } : ticket
  )

  writeJson(TICKETS_KEY, nextTickets)

  if (!currentTicket) {
    return
  }

  const actor = getCurrentActivityActor()
  void logActivity({
    category: "support",
    action: `support-ticket-${status}`,
    actorRole: actor.role,
    actorName: actor.name,
    actorEmail: actor.email,
    subjectType: "support-ticket",
    subjectId: currentTicket.id,
    title: "Support ticket updated",
    description: `${actor.name} changed ${currentTicket.name}'s support ticket to ${status}.`,
    subjectTitle: currentTicket.category,
    subjectSubtitle: currentTicket.bookingRef,
  }).catch((error) => {
    console.error("Failed to record support ticket status activity.", error)
  })
}
