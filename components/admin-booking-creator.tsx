"use client"

import * as React from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { buildBookingCatalogOptions } from "@/lib/service-catalog"
import { formatCurrency } from "@/lib/formatters"
import { addBooking } from "@/lib/site-store"
import type { SiteCatalog } from "@/lib/site-store"
import type { BookingRecord } from "@/lib/booking-types"
import type { BookingStatus } from "@/lib/site-data"

interface AdminBookingCreatorProps {
  services: SiteCatalog
}

type BookingFormState = {
  kind: BookingRecord["kind"]
  itemKey: string
  customerName: string
  customerEmail: string
  startDate: string
  endDate: string
  status: BookingStatus
}

const bookingKindLabels: Record<BookingRecord["kind"], string> = {
  stay: "Stay",
  attraction: "Attraction",
  flight: "Flight",
  "car-rental": "Car rental",
  "airport-taxi": "Airport taxi",
}

function createEmptyBookingForm(): BookingFormState {
  return {
    kind: "stay",
    itemKey: "",
    customerName: "",
    customerEmail: "",
    startDate: "",
    endDate: "",
    status: "pending",
  }
}

export function AdminBookingCreator({ services }: AdminBookingCreatorProps) {
  const { toast } = useToast()
  const [form, setForm] = React.useState<BookingFormState>(createEmptyBookingForm)
  const [isSaving, setIsSaving] = React.useState(false)

  const bookingOptions = React.useMemo(() => buildBookingCatalogOptions(services), [services])
  const filteredOptions = React.useMemo(
    () => bookingOptions.filter((option) => option.kind === form.kind),
    [bookingOptions, form.kind]
  )
  const selectedOption = React.useMemo(
    () => bookingOptions.find((option) => `${option.kind}:${option.itemId}` === form.itemKey) ?? null,
    [bookingOptions, form.itemKey]
  )

  React.useEffect(() => {
    if (filteredOptions.length === 0) {
      if (form.itemKey) {
        setForm((current) => ({ ...current, itemKey: "" }))
      }
      return
    }

    const hasSelection = filteredOptions.some(
      (option) => `${option.kind}:${option.itemId}` === form.itemKey
    )

    if (!hasSelection) {
      setForm((current) => ({
        ...current,
        itemKey: `${filteredOptions[0].kind}:${filteredOptions[0].itemId}`,
      }))
    }
  }, [filteredOptions, form.itemKey])

  const handleCreateBooking = async () => {
    if (!selectedOption) {
      toast({
        title: "Choose a service first",
        description: "Select the card or route you want this booking to use.",
        duration: 3000,
      })
      return
    }

    setIsSaving(true)

    try {
      await addBooking({
        kind: selectedOption.kind,
        itemId: selectedOption.itemId,
        title: selectedOption.title,
        subtitle: selectedOption.subtitle,
        image: selectedOption.image,
        price: selectedOption.price,
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim(),
        startDate: form.startDate,
        endDate: form.endDate || form.startDate,
        href: selectedOption.href,
        status: form.status,
      })

      toast({
        title: "Booking added",
        description: "The manual booking is now part of the shared admin queue.",
        duration: 3000,
      })
      setForm((current) => ({
        ...createEmptyBookingForm(),
        kind: current.kind,
      }))
    } catch (error) {
      toast({
        title: "Unable to add booking",
        description: error instanceof Error ? error.message : "Please review the form and try again.",
        duration: 4000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <PlusCircle className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Add booking</h2>
          <p className="text-sm text-muted-foreground">
            Create a manual booking against an existing service card or flight route.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Booking type</Label>
          <Select
            value={form.kind}
            onValueChange={(value) =>
              setForm((current) => ({
                ...current,
                kind: value as BookingRecord["kind"],
                itemKey: "",
              }))
            }
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Select booking type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(bookingKindLabels).map(([kind, label]) => (
                <SelectItem key={kind} value={kind}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Linked service or route</Label>
          <Select
            value={form.itemKey}
            onValueChange={(value) => setForm((current) => ({ ...current, itemKey: value }))}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Choose a card or route" />
            </SelectTrigger>
            <SelectContent>
              {filteredOptions.map((option) => (
                <SelectItem key={`${option.kind}:${option.itemId}`} value={`${option.kind}:${option.itemId}`}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedOption && (
          <div className="rounded-2xl border border-border bg-secondary/20 p-4">
            <p className="font-medium text-foreground">{selectedOption.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{selectedOption.subtitle}</p>
            <p className="mt-3 text-sm font-medium text-foreground">
              {formatCurrency(selectedOption.price)}
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="manual-booking-name">Customer name</Label>
            <Input
              id="manual-booking-name"
              className="mt-2"
              value={form.customerName}
              onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="manual-booking-email">Customer email</Label>
            <Input
              id="manual-booking-email"
              type="email"
              className="mt-2"
              value={form.customerEmail}
              onChange={(event) => setForm((current) => ({ ...current, customerEmail: event.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="manual-booking-start">Start date</Label>
            <Input
              id="manual-booking-start"
              type="date"
              className="mt-2"
              value={form.startDate}
              onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="manual-booking-end">End date</Label>
            <Input
              id="manual-booking-end"
              type="date"
              className="mt-2"
              value={form.endDate}
              onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label>Initial status</Label>
          <Select
            value={form.status}
            onValueChange={(value) =>
              setForm((current) => ({
                ...current,
                status: value as BookingStatus,
              }))
            }
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full rounded-full" disabled={isSaving} onClick={() => void handleCreateBooking()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Add booking"}
        </Button>
      </div>
    </div>
  )
}
