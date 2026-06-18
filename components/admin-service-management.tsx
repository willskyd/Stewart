"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { PlusCircle, Trash2, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  flattenServiceCatalog,
  getDefaultServiceImage,
  getServiceHref,
  getServiceImage,
  getServicePrice,
  getServiceSubtitle,
  getServiceTitle,
} from "@/lib/service-catalog"
import { formatCurrency } from "@/lib/formatters"
import { addService, deleteService } from "@/lib/site-store"
import type { SiteCatalog } from "@/lib/site-store"
import type { ManagedServiceKind, ManagedServiceRecord } from "@/lib/service-types"

interface AdminServiceManagementProps {
  services: SiteCatalog
}

type ServiceFormState = {
  kind: ManagedServiceKind
  title: string
  type: string
  stayCategory: "hotel" | "apartment" | "villa" | "resort"
  categoryText: string
  location: string
  city: string
  country: string
  distance: string
  rating: string
  reviews: string
  price: string
  image: string
  gallery: string
  summary: string
  description: string
  guests: string
  bedrooms: string
  baths: string
  amenities: string
  highlights: string
  policyNotes: string
  duration: string
  includes: string
  seats: string
  transmission: string
  fuel: string
  features: string
  route: string
  pickup: string
  destination: string
  vehicle: string
  passengers: string
  arrivalWindow: string
  isFivestar: boolean
  isFeatured: boolean
}

const serviceKindLabels: Record<ManagedServiceKind, string> = {
  stay: "Stays",
  attraction: "Attractions",
  "car-rental": "Car rentals",
  "airport-taxi": "Airport taxis",
}

function createEmptyServiceForm(): ServiceFormState {
  return {
    kind: "stay",
    title: "",
    type: "Hotel",
    stayCategory: "hotel",
    categoryText: "Sedan",
    location: "",
    city: "",
    country: "",
    distance: "2 km from city center",
    rating: "4.8",
    reviews: "120",
    price: "",
    image: getDefaultServiceImage("stay"),
    gallery: "",
    summary: "",
    description: "",
    guests: "2",
    bedrooms: "1",
    baths: "1",
    amenities: "",
    highlights: "",
    policyNotes: "",
    duration: "2 hours",
    includes: "",
    seats: "5",
    transmission: "Automatic",
    fuel: "Petrol",
    features: "",
    route: "",
    pickup: "",
    destination: "",
    vehicle: "Executive Sedan",
    passengers: "3",
    arrivalWindow: "Meet and greet included",
    isFivestar: false,
    isFeatured: true,
  }
}

function splitMultiValue(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseNumberField(value: string, label: string, integer = false) {
  const parsed = Number(value)

  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid number.`)
  }

  if (integer && !Number.isInteger(parsed)) {
    throw new Error(`${label} must be a whole number.`)
  }

  return parsed
}

function getServiceBadgeColor(kind: ManagedServiceKind) {
  switch (kind) {
    case "stay":
      return "bg-primary/10 text-primary border-primary/20"
    case "attraction":
      return "bg-amber-500/10 text-amber-700 border-amber-200"
    case "car-rental":
      return "bg-sky-500/10 text-sky-700 border-sky-200"
    case "airport-taxi":
      return "bg-emerald-500/10 text-emerald-700 border-emerald-200"
  }
}

export function AdminServiceManagement({ services }: AdminServiceManagementProps) {
  const { toast } = useToast()
  const [serviceTab, setServiceTab] = React.useState<ManagedServiceKind>("stay")
  const [form, setForm] = React.useState<ServiceFormState>(createEmptyServiceForm)
  const [serviceActionKey, setServiceActionKey] = React.useState<string | null>(null)
  const [isSaving, setIsSaving] = React.useState(false)

  const serviceRecords = React.useMemo(() => flattenServiceCatalog(services), [services])
  const filteredServices = React.useMemo(
    () => serviceRecords.filter((service) => service.kind === serviceTab),
    [serviceRecords, serviceTab]
  )

  const handleDeleteService = async (service: ManagedServiceRecord) => {
    const shouldDelete = window.confirm(`Delete the service card for ${getServiceTitle(service)}?`)

    if (!shouldDelete) {
      return
    }

    const actionKey = `${service.kind}:${service.id}`
    setServiceActionKey(actionKey)

    try {
      await deleteService(service.kind, service.id)
      toast({
        title: "Service card deleted",
        description: `${getServiceTitle(service)} was removed from the managed services list.`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Unable to delete service card",
        description: error instanceof Error ? error.message : "Please try again.",
        duration: 4000,
      })
    } finally {
      setServiceActionKey(null)
    }
  }

  const handleCreateService = async () => {
    setIsSaving(true)

    try {
      if (form.kind === "stay") {
        const image = form.image.trim() || getDefaultServiceImage("stay")
        const gallery = splitMultiValue(form.gallery)

        await addService({
          kind: "stay",
          data: {
            title: form.title.trim(),
            type: form.type.trim(),
            category: form.stayCategory,
            location: form.location.trim(),
            city: form.city.trim(),
            country: form.country.trim(),
            distance: form.distance.trim(),
            rating: parseNumberField(form.rating, "Rating"),
            reviews: parseNumberField(form.reviews, "Reviews", true),
            price: parseNumberField(form.price, "Price"),
            image,
            gallery: gallery.length > 0 ? [image, ...gallery.filter((item) => item !== image)] : [image],
            summary: form.summary.trim(),
            description: form.description.trim(),
            isFivestar: form.isFivestar,
            isFeatured: form.isFeatured,
            guests: parseNumberField(form.guests, "Guests", true),
            bedrooms: parseNumberField(form.bedrooms, "Bedrooms", true),
            baths: parseNumberField(form.baths, "Bathrooms", true),
            amenities: splitMultiValue(form.amenities),
            highlights: splitMultiValue(form.highlights),
            policyNotes: splitMultiValue(form.policyNotes),
          },
        })
      } else if (form.kind === "attraction") {
        const image = form.image.trim() || getDefaultServiceImage("attraction")
        const gallery = splitMultiValue(form.gallery)

        await addService({
          kind: "attraction",
          data: {
            name: form.title.trim(),
            location: form.location.trim(),
            city: form.city.trim(),
            country: form.country.trim(),
            image,
            gallery: gallery.length > 0 ? [image, ...gallery.filter((item) => item !== image)] : [image],
            rating: parseNumberField(form.rating, "Rating"),
            reviews: parseNumberField(form.reviews, "Reviews", true),
            price: parseNumberField(form.price, "Price"),
            duration: form.duration.trim(),
            summary: form.summary.trim(),
            description: form.description.trim(),
            includes: splitMultiValue(form.includes),
            highlights: splitMultiValue(form.highlights),
          },
        })
      } else if (form.kind === "car-rental") {
        await addService({
          kind: "car-rental",
          data: {
            name: form.title.trim(),
            category: form.categoryText.trim(),
            image: form.image.trim() || getDefaultServiceImage("car-rental"),
            seats: parseNumberField(form.seats, "Seats", true),
            transmission: form.transmission.trim(),
            fuel: form.fuel.trim(),
            price: parseNumberField(form.price, "Price"),
            location: form.location.trim(),
            summary: form.summary.trim(),
            features: splitMultiValue(form.features),
          },
        })
      } else {
        await addService({
          kind: "airport-taxi",
          data: {
            route: form.route.trim(),
            pickup: form.pickup.trim(),
            destination: form.destination.trim(),
            vehicle: form.vehicle.trim(),
            passengers: parseNumberField(form.passengers, "Passengers", true),
            price: parseNumberField(form.price, "Price"),
            arrivalWindow: form.arrivalWindow.trim(),
            image: form.image.trim() || getDefaultServiceImage("airport-taxi"),
          },
        })
      }

      toast({
        title: "Service card added",
        description: "The new service is now available across the booking flows.",
        duration: 3000,
      })
      setForm(createEmptyServiceForm())
    } catch (error) {
      toast({
        title: "Unable to add service card",
        description: error instanceof Error ? error.message : "Please review the form and try again.",
        duration: 4000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Wrench className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Service card management</h2>
            <p className="text-sm text-muted-foreground">
              Add or remove the cards users can book across stays, attractions, cars, and airport transfers.
            </p>
          </div>
        </div>

        <Tabs
          value={serviceTab}
          onValueChange={(value) => setServiceTab(value as ManagedServiceKind)}
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 md:grid-cols-4">
            <TabsTrigger value="stay">Stays ({services.properties.length})</TabsTrigger>
            <TabsTrigger value="attraction">Attractions ({services.attractions.length})</TabsTrigger>
            <TabsTrigger value="car-rental">Cars ({services.carRentals.length})</TabsTrigger>
            <TabsTrigger value="airport-taxi">Taxis ({services.taxiOffers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={serviceTab} className="mt-6 space-y-4">
            {filteredServices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                No service cards in this category yet.
              </div>
            ) : (
              filteredServices.map((service) => {
                const actionKey = `${service.kind}:${service.id}`

                return (
                  <div key={actionKey} className="rounded-2xl border border-border p-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-secondary/30 md:w-40">
                        <Image src={getServiceImage(service)} alt={getServiceTitle(service)} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold text-foreground">
                                {getServiceTitle(service)}
                              </h3>
                              <Badge className={getServiceBadgeColor(service.kind)}>
                                {serviceKindLabels[service.kind]}
                              </Badge>
                              {service.kind === "stay" && service.isFeatured && (
                                <Badge className="bg-primary/10 text-primary border-primary/20">Featured</Badge>
                              )}
                              {service.kind === "stay" && service.isFivestar && (
                                <Badge className="bg-amber-500/10 text-amber-700 border-amber-200">5-star</Badge>
                              )}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{getServiceSubtitle(service)}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            disabled={serviceActionKey === actionKey}
                            onClick={() => void handleDeleteService(service)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                          <span>{formatCurrency(getServicePrice(service))}</span>
                          {service.kind === "stay" && <span>{service.type}</span>}
                          {service.kind === "attraction" && <span>{service.duration}</span>}
                          {service.kind === "car-rental" && <span>{service.seats} seats</span>}
                          {service.kind === "airport-taxi" && <span>{service.vehicle}</span>}
                        </div>

                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="rounded-full" asChild>
                            <Link href={getServiceHref(service)}>Open page</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <PlusCircle className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Add service card</h2>
            <p className="text-sm text-muted-foreground">
              Create a new service entry for the public catalog.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Service type</Label>
            <Select
              value={form.kind}
              onValueChange={(value) =>
                setForm((current) => ({
                  ...current,
                  kind: value as ManagedServiceKind,
                  image: current.image || getDefaultServiceImage(value as ManagedServiceKind),
                }))
              }
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stay">Stay</SelectItem>
                <SelectItem value="attraction">Attraction</SelectItem>
                <SelectItem value="car-rental">Car rental</SelectItem>
                <SelectItem value="airport-taxi">Airport taxi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="service-title">Title</Label>
            <Input id="service-title" className="mt-2" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          </div>

          {(form.kind === "stay" || form.kind === "attraction" || form.kind === "car-rental") && (
            <div>
              <Label htmlFor="service-location">Location</Label>
              <Input id="service-location" className="mt-2" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
            </div>
          )}

          {form.kind === "stay" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="stay-type">Display type</Label>
                  <Input id="stay-type" className="mt-2" value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.stayCategory} onValueChange={(value) => setForm((current) => ({ ...current, stayCategory: value as ServiceFormState["stayCategory"] }))}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">hotel</SelectItem>
                      <SelectItem value="apartment">apartment</SelectItem>
                      <SelectItem value="villa">villa</SelectItem>
                      <SelectItem value="resort">resort</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input className="mt-2" placeholder="City" value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
                <Input className="mt-2" placeholder="Country" value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} />
                <Input className="mt-2" placeholder="Distance note" value={form.distance} onChange={(event) => setForm((current) => ({ ...current, distance: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Price" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
                <Input className="mt-2" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={(event) => setForm((current) => ({ ...current, rating: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Reviews" value={form.reviews} onChange={(event) => setForm((current) => ({ ...current, reviews: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Guests" value={form.guests} onChange={(event) => setForm((current) => ({ ...current, guests: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={(event) => setForm((current) => ({ ...current, bedrooms: event.target.value }))} />
              </div>
              <Input className="mt-2" type="number" placeholder="Bathrooms" value={form.baths} onChange={(event) => setForm((current) => ({ ...current, baths: event.target.value }))} />
            </>
          )}

          {form.kind === "attraction" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Input className="mt-2" placeholder="City" value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
                <Input className="mt-2" placeholder="Country" value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} />
                <Input className="mt-2" placeholder="Duration" value={form.duration} onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Price" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
              </div>
            </>
          )}

          {form.kind === "car-rental" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Input className="mt-2" placeholder="Category" value={form.categoryText} onChange={(event) => setForm((current) => ({ ...current, categoryText: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Price" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Seats" value={form.seats} onChange={(event) => setForm((current) => ({ ...current, seats: event.target.value }))} />
                <Input className="mt-2" placeholder="Transmission" value={form.transmission} onChange={(event) => setForm((current) => ({ ...current, transmission: event.target.value }))} />
                <Input className="mt-2" placeholder="Fuel" value={form.fuel} onChange={(event) => setForm((current) => ({ ...current, fuel: event.target.value }))} />
              </div>
            </>
          )}

          {form.kind === "airport-taxi" && (
            <>
              <Input className="mt-2" placeholder="Route title" value={form.route} onChange={(event) => setForm((current) => ({ ...current, route: event.target.value }))} />
              <div className="grid gap-4 md:grid-cols-2">
                <Input className="mt-2" placeholder="Pickup" value={form.pickup} onChange={(event) => setForm((current) => ({ ...current, pickup: event.target.value }))} />
                <Input className="mt-2" placeholder="Destination" value={form.destination} onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))} />
                <Input className="mt-2" placeholder="Vehicle" value={form.vehicle} onChange={(event) => setForm((current) => ({ ...current, vehicle: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Passengers" value={form.passengers} onChange={(event) => setForm((current) => ({ ...current, passengers: event.target.value }))} />
                <Input className="mt-2" type="number" placeholder="Price" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
              </div>
            </>
          )}

          <Input className="mt-2" placeholder="Cover image path" value={form.image} onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))} />
          <Textarea placeholder="Summary" value={form.summary} onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))} />

          {(form.kind === "stay" || form.kind === "attraction") && (
            <>
              <Textarea placeholder="Description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
              <Textarea placeholder="Extra gallery image paths" value={form.gallery} onChange={(event) => setForm((current) => ({ ...current, gallery: event.target.value }))} />
              <Textarea placeholder={form.kind === "stay" ? "Highlights" : "Highlights"} value={form.highlights} onChange={(event) => setForm((current) => ({ ...current, highlights: event.target.value }))} />
            </>
          )}

          {form.kind === "stay" && (
            <>
              <Textarea placeholder="Amenities" value={form.amenities} onChange={(event) => setForm((current) => ({ ...current, amenities: event.target.value }))} />
              <Textarea placeholder="Policy notes" value={form.policyNotes} onChange={(event) => setForm((current) => ({ ...current, policyNotes: event.target.value }))} />
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-border p-4">
                  <Checkbox checked={form.isFeatured} onCheckedChange={(checked) => setForm((current) => ({ ...current, isFeatured: checked === true }))} />
                  <span className="text-sm text-foreground">Show on featured slider</span>
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-border p-4">
                  <Checkbox checked={form.isFivestar} onCheckedChange={(checked) => setForm((current) => ({ ...current, isFivestar: checked === true }))} />
                  <span className="text-sm text-foreground">Include in 5-star section</span>
                </label>
              </div>
            </>
          )}

          {form.kind === "attraction" && (
            <Textarea placeholder="Included items" value={form.includes} onChange={(event) => setForm((current) => ({ ...current, includes: event.target.value }))} />
          )}

          {form.kind === "car-rental" && (
            <Textarea placeholder="Features" value={form.features} onChange={(event) => setForm((current) => ({ ...current, features: event.target.value }))} />
          )}

          {form.kind === "airport-taxi" && (
            <Input className="mt-2" placeholder="Arrival window note" value={form.arrivalWindow} onChange={(event) => setForm((current) => ({ ...current, arrivalWindow: event.target.value }))} />
          )}

          <Button className="w-full rounded-full" disabled={isSaving} onClick={() => void handleCreateService()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Add service card"}
          </Button>
        </div>
      </div>
    </div>
  )
}
