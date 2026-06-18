import { slugify } from "@/lib/search-utils"
import {
  attractions,
  carRentals,
  featuredPropertyIds,
  flightOffers,
  properties,
  taxiOffers,
  type AttractionRecord,
  type CarRentalRecord,
} from "@/lib/site-data"
import type {
  ManagedPropertyRecord,
  ManagedServiceKind,
  ManagedServiceRecord,
  ManagedTaxiOffer,
  SiteCatalog,
} from "@/lib/service-types"

export interface BookingCatalogOption {
  kind: "stay" | "attraction" | "flight" | "car-rental" | "airport-taxi"
  itemId: string
  title: string
  subtitle: string
  image: string
  price: number
  href: string
}

export function getDefaultServiceImage(kind: ManagedServiceKind) {
  switch (kind) {
    case "stay":
      return "/images/hotel-1.jpg"
    case "attraction":
      return "/images/attraction-1.jpg"
    case "car-rental":
      return "/images/car-rental.jpg"
    case "airport-taxi":
      return "/images/airport-taxi.jpg"
  }
}

export function cloneServiceCatalog(catalog: SiteCatalog): SiteCatalog {
  return {
    properties: catalog.properties.map((property) => ({
      ...property,
      gallery: [...property.gallery],
      amenities: [...property.amenities],
      highlights: [...property.highlights],
      policyNotes: [...property.policyNotes],
    })),
    attractions: catalog.attractions.map((attraction) => ({
      ...attraction,
      gallery: [...attraction.gallery],
      includes: [...attraction.includes],
      highlights: [...attraction.highlights],
    })),
    carRentals: catalog.carRentals.map((car) => ({
      ...car,
      features: [...car.features],
    })),
    taxiOffers: catalog.taxiOffers.map((offer) => ({ ...offer })),
  }
}

export function getSeedServiceCatalog(): SiteCatalog {
  return {
    properties: properties.map((property) => ({
      ...property,
      gallery: [...property.gallery],
      amenities: [...property.amenities],
      highlights: [...property.highlights],
      policyNotes: [...property.policyNotes],
      isFeatured: featuredPropertyIds.includes(property.id),
    })),
    attractions: attractions.map((attraction) => ({
      ...attraction,
      gallery: [...attraction.gallery],
      includes: [...attraction.includes],
      highlights: [...attraction.highlights],
    })),
    carRentals: carRentals.map((car) => ({
      ...car,
      features: [...car.features],
    })),
    taxiOffers: taxiOffers.map((offer) => ({
      ...offer,
      image: getDefaultServiceImage("airport-taxi"),
    })),
  }
}

export function normalizeServiceCatalog(input: unknown): SiteCatalog {
  const seed = getSeedServiceCatalog()

  if (!input || typeof input !== "object") {
    return seed
  }

  const candidate = input as Partial<SiteCatalog>

  return cloneServiceCatalog({
    properties: Array.isArray(candidate.properties)
      ? (candidate.properties as ManagedPropertyRecord[])
      : seed.properties,
    attractions: Array.isArray(candidate.attractions)
      ? (candidate.attractions as AttractionRecord[])
      : seed.attractions,
    carRentals: Array.isArray(candidate.carRentals)
      ? (candidate.carRentals as CarRentalRecord[])
      : seed.carRentals,
    taxiOffers: Array.isArray(candidate.taxiOffers)
      ? (candidate.taxiOffers as ManagedTaxiOffer[]).map((offer) => ({
          ...offer,
          image: offer.image || getDefaultServiceImage("airport-taxi"),
        }))
      : seed.taxiOffers,
  })
}

export function flattenServiceCatalog(catalog: SiteCatalog): ManagedServiceRecord[] {
  return [
    ...catalog.properties.map((property) => ({ kind: "stay" as const, ...property })),
    ...catalog.attractions.map((attraction) => ({ kind: "attraction" as const, ...attraction })),
    ...catalog.carRentals.map((car) => ({ kind: "car-rental" as const, ...car })),
    ...catalog.taxiOffers.map((offer) => ({ kind: "airport-taxi" as const, ...offer })),
  ]
}

export function getServiceTitle(service: ManagedServiceRecord) {
  switch (service.kind) {
    case "stay":
      return service.title
    case "attraction":
      return service.name
    case "car-rental":
      return service.name
    case "airport-taxi":
      return service.route
  }
}

export function getServiceSubtitle(service: ManagedServiceRecord) {
  switch (service.kind) {
    case "stay":
      return service.location
    case "attraction":
      return service.location
    case "car-rental":
      return service.location
    case "airport-taxi":
      return `${service.pickup} to ${service.destination}`
  }
}

export function getServiceImage(service: ManagedServiceRecord) {
  switch (service.kind) {
    case "stay":
    case "attraction":
    case "car-rental":
    case "airport-taxi":
      return service.image
  }
}

export function getServicePrice(service: ManagedServiceRecord) {
  return service.price
}

export function getServiceHref(service: ManagedServiceRecord) {
  switch (service.kind) {
    case "stay":
      return `/property/${service.id}`
    case "attraction":
      return `/attractions/${service.id}`
    case "car-rental":
      return `/car-rentals/${service.id}`
    case "airport-taxi":
      return "/airport-taxis"
  }
}

export function getPropertyFromCatalog(catalog: SiteCatalog, id: string) {
  return catalog.properties.find((property) => property.id === id)
}

export function getAttractionFromCatalog(catalog: SiteCatalog, id: string) {
  return catalog.attractions.find((attraction) => attraction.id === id)
}

export function getCarRentalFromCatalog(catalog: SiteCatalog, id: string) {
  return catalog.carRentals.find((car) => car.id === id)
}

export function getRelatedPropertiesFromCatalog(catalog: SiteCatalog, currentId: string) {
  return catalog.properties.filter((property) => property.id !== currentId).slice(0, 3)
}

export function getRelatedAttractionsFromCatalog(catalog: SiteCatalog, currentId: string) {
  return catalog.attractions.filter((attraction) => attraction.id !== currentId).slice(0, 3)
}

export function getRelatedCarRentalsFromCatalog(catalog: SiteCatalog, currentId: string) {
  return catalog.carRentals.filter((car) => car.id !== currentId).slice(0, 3)
}

export function buildBookingCatalogOptions(catalog: SiteCatalog): BookingCatalogOption[] {
  const stayOptions = catalog.properties.map((property) => ({
    kind: "stay" as const,
    itemId: property.id,
    title: property.title,
    subtitle: property.location,
    image: property.image,
    price: property.price,
    href: `/property/${property.id}`,
  }))

  const attractionOptions = catalog.attractions.map((attraction) => ({
    kind: "attraction" as const,
    itemId: attraction.id,
    title: attraction.name,
    subtitle: attraction.location,
    image: attraction.image,
    price: attraction.price,
    href: `/attractions/${attraction.id}`,
  }))

  const flightOptions = flightOffers.map((flight) => ({
    kind: "flight" as const,
    itemId: flight.id,
    title: `${flight.from} to ${flight.to}`,
    subtitle: `${flight.airline} · ${flight.duration}`,
    image: "/images/flight.jpg",
    price: flight.price,
    href: `/search?service=flights&from=${encodeURIComponent(flight.from)}&to=${encodeURIComponent(flight.to)}`,
  }))

  const carOptions = catalog.carRentals.map((car) => ({
    kind: "car-rental" as const,
    itemId: car.id,
    title: car.name,
    subtitle: car.location,
    image: car.image,
    price: car.price,
    href: `/car-rentals/${car.id}`,
  }))

  const taxiOptions = catalog.taxiOffers.map((offer) => ({
    kind: "airport-taxi" as const,
    itemId: offer.id,
    title: offer.route,
    subtitle: offer.vehicle,
    image: offer.image,
    price: offer.price,
    href: "/airport-taxis",
  }))

  return [...stayOptions, ...attractionOptions, ...flightOptions, ...carOptions, ...taxiOptions]
}

export function buildAttractionSlug(name: string) {
  return slugify(name)
}

export function buildCarRentalSlug(name: string) {
  return slugify(name)
}
