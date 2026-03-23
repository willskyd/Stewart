import type { BookingKind, BookingStatus } from "@/lib/site-data"
import { demoBookings, demoSupportTickets } from "@/lib/site-data"

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
const TICKETS_KEY = "stewart_support_tickets"

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

export function getFavoritePropertyIds() {
  return readJson<string[]>(FAVORITES_KEY, [])
}

export function isFavoriteProperty(propertyId: string) {
  return getFavoritePropertyIds().includes(propertyId)
}

export function toggleFavoriteProperty(propertyId: string) {
  const favorites = getFavoritePropertyIds()
  const nextFavorites = favorites.includes(propertyId)
    ? favorites.filter((id) => id !== propertyId)
    : [...favorites, propertyId]

  writeJson(FAVORITES_KEY, nextFavorites)
  return nextFavorites.includes(propertyId)
}

export function getUserSession() {
  return readJson<UserSession | null>(USER_KEY, null)
}

export function setUserSession(session: UserSession) {
  writeJson(USER_KEY, session)
}

export function clearUserSession() {
  if (!canUseBrowser()) {
    return
  }

  window.localStorage.removeItem(USER_KEY)
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

export function getAdminSession() {
  return readJson<AdminSession | null>(ADMIN_KEY, null)
}

export function setAdminSession(session: AdminSession) {
  writeJson(ADMIN_KEY, session)
}

export function clearAdminSession() {
  if (!canUseBrowser()) {
    return
  }

  window.localStorage.removeItem(ADMIN_KEY)
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

export function getBookings() {
  return readJson<BookingRecord[]>(BOOKINGS_KEY, demoBookings)
}

export function addBooking(booking: Omit<BookingRecord, "id" | "createdAt" | "status">) {
  const currentBookings = getBookings()
  const existing = currentBookings.find(
    (item) =>
      item.kind === booking.kind &&
      item.itemId === booking.itemId &&
      item.customerEmail === booking.customerEmail &&
      item.status !== "cancelled"
  )

  if (existing) {
    return existing
  }

  const record: BookingRecord = {
    ...booking,
    id: createId("booking"),
    createdAt: new Date().toISOString(),
    status: "pending",
  }

  writeJson(BOOKINGS_KEY, [record, ...currentBookings])
  return record
}

export function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const nextBookings = getBookings().map((booking) =>
    booking.id === bookingId ? { ...booking, status } : booking
  )

  writeJson(BOOKINGS_KEY, nextBookings)
}

export function getSupportTickets() {
  return readJson<SupportTicketRecord[]>(TICKETS_KEY, demoSupportTickets)
}

export function addSupportTicket(ticket: Omit<SupportTicketRecord, "id" | "createdAt" | "status">) {
  const nextTicket: SupportTicketRecord = {
    ...ticket,
    id: createId("ticket"),
    createdAt: new Date().toISOString(),
    status: "new",
  }

  writeJson(TICKETS_KEY, [nextTicket, ...getSupportTickets()])
  return nextTicket
}

export function updateSupportTicketStatus(ticketId: string, status: SupportTicketRecord["status"]) {
  const nextTickets = getSupportTickets().map((ticket) =>
    ticket.id === ticketId ? { ...ticket, status } : ticket
  )

  writeJson(TICKETS_KEY, nextTickets)
}
