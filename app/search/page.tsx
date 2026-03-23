import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Briefcase, CalendarDays, CarFront, CircleHelp, MapPin, Plane, ShieldCheck, Sparkles, Ticket } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { BookingButton } from "@/components/booking-button"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import {
  attractions,
  carRentals,
  careerPositions,
  flightOffers,
  helpCategories,
  properties,
  supportCategoryPages,
  taxiOffers,
} from "@/lib/site-data"
import { matchesQuery, normalizeQueryValue, toTitleCaseFromSlug, normalizeText } from "@/lib/search-utils"

type SearchParams = Record<string, string | string[] | undefined>

function getServiceLabel(service: string) {
  switch (service) {
    case "stays":
      return "stays"
    case "attractions":
      return "attractions"
    case "flights":
      return "flights"
    case "car-rentals":
      return "car rentals"
    case "airport-taxis":
      return "airport taxi options"
    case "help":
      return "help articles"
    case "careers":
      return "career openings"
    default:
      return "results"
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const service = normalizeQueryValue(params.service) || "stays"
  const query = normalizeQueryValue(params.query)
  const destination = normalizeQueryValue(params.destination)
  const type = normalizeQueryValue(params.type)
  const vibe = normalizeQueryValue(params.vibe)
  const from = normalizeQueryValue(params.from)
  const to = normalizeQueryValue(params.to)
  const searchTerm = query || destination || [from, to].filter(Boolean).join(" to ") || type || vibe
  const staySearchTerm = [query, destination, vibe].filter(Boolean).join(" ")
  const supportSearchTerm = query || destination

  const stayResults = properties.filter((property) =>
    matchesQuery(
      [property.title, property.type, property.category, property.location, property.city, property.country, property.summary],
      staySearchTerm
    ) && (!type || property.category === type || property.type.toLowerCase().includes(type.toLowerCase()))
  )

  const attractionResults = attractions.filter((attraction) =>
    matchesQuery([attraction.name, attraction.location, attraction.city, attraction.country, attraction.summary], [query, destination].filter(Boolean).join(" "))
  )

  const flightResults = flightOffers.filter((flight) => {
    if (!from && !to && !query) return true // Show all if no filter
    const fromMatch = !from || normalizeText(flight.from).includes(normalizeText(from))
    const toMatch = !to || normalizeText(flight.to).includes(normalizeText(to))
    const queryMatch = !query || matchesQuery([flight.airline, flight.duration, flight.stops], query)
    return fromMatch && toMatch && queryMatch
  })

  const carResults = carRentals.filter((car) =>
    matchesQuery([car.name, car.category, car.location, car.summary], [query, destination].filter(Boolean).join(" "))
  )

  const taxiResults = taxiOffers.filter((offer) => {
    if (!from && !to && !query && !destination) return true
    const pickupMatch = !from && !destination || normalizeText(offer.pickup).includes(normalizeText(from || destination || ""))
    const destMatch = !to && !destination || normalizeText(offer.destination).includes(normalizeText(to || destination || ""))
    const queryMatch = !query || matchesQuery([offer.route, offer.vehicle], query)
    return pickupMatch && destMatch && queryMatch
  })

  const helpResults = helpCategories.flatMap((category) =>
    category.topics
      .filter((topic) => matchesQuery([category.title, topic.title, topic.summary, ...topic.body], supportSearchTerm))
      .map((topic) => ({
        ...topic,
        category: category.title,
        href: `/help/${category.slug}/${topic.slug}`,
      }))
  )

  const supportResults = supportCategoryPages.filter((category) =>
    matchesQuery([category.title, category.description, category.overview, ...category.sections], supportSearchTerm)
  )

  const careerResults = careerPositions.filter((position) =>
    matchesQuery([position.title, position.department, position.location, position.summary], query)
  )

  const relevantResultsCount =
    service === "stays"
      ? stayResults.length
      : service === "attractions"
        ? attractionResults.length
        : service === "flights"
          ? flightResults.length
          : service === "car-rentals"
            ? carResults.length
            : service === "airport-taxis"
              ? taxiResults.length
              : service === "help"
                ? helpResults.length + supportResults.length
                : service === "careers"
                  ? careerResults.length
                  : 0

  const hasRelevantResults = relevantResultsCount > 0

  const headline = searchTerm
    ? `Showing ${getServiceLabel(service)} for "${searchTerm}"`
    : `Browse available ${getServiceLabel(service)}`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/40">
          <div className="container mx-auto px-4 py-14">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Smart search results
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">{headline}</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {hasRelevantResults
                  ? "Every result below is mapped to a real page or action so the experience stays connected end to end."
                  : `No ${getServiceLabel(service)} are currently available for this search. Try another keyword, destination, or category.`}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {destination && <span className="rounded-full bg-card px-4 py-2">Destination: {destination}</span>}
                {type && <span className="rounded-full bg-card px-4 py-2">Type: {type}</span>}
                {from && <span className="rounded-full bg-card px-4 py-2">From: {from}</span>}
                {to && <span className="rounded-full bg-card px-4 py-2">To: {to}</span>}
                {vibe && <span className="rounded-full bg-card px-4 py-2">Vibe: {toTitleCaseFromSlug(vibe)}</span>}
              </div>
            </div>
          </div>
        </section>

        {!hasRelevantResults && service === "stays" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8">Explore our featured stays</h2>
              <p className="text-muted-foreground mb-8">No exact matches found, but here are some popular options to explore:</p>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {properties.slice(0, 6).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </section>
        )}

        {!hasRelevantResults && service === "attractions" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8">Popular attractions & experiences</h2>
              <p className="text-muted-foreground mb-8">No exact matches found, but here are some amazing experiences nearby:</p>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {attractions.slice(0, 6).map((attraction) => (
                  <div
                    key={attraction.id}
                    className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <Link href={`/attractions/${attraction.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={attraction.image} alt={attraction.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {attraction.location}
                      </div>
                      <Link href={`/attractions/${attraction.id}`} className="block">
                        <h3 className="mt-3 text-xl font-semibold text-foreground">{attraction.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{attraction.summary}</p>
                      </Link>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">From</p>
                          <p className="text-lg font-semibold text-foreground">{formatCurrency(attraction.price)}</p>
                        </div>
                        <BookingButton
                          kind="attraction"
                          itemId={attraction.id}
                          title={attraction.name}
                          subtitle={attraction.location}
                          image={attraction.image}
                          price={attraction.price}
                          href={`/attractions/${attraction.id}`}
                          size="sm"
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {!hasRelevantResults && service === "flights" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8">Popular flight routes</h2>
              <p className="text-muted-foreground mb-8">No exact matches found, but here are some popular routes you might enjoy:</p>
              <div className="space-y-4">
                {flightOffers.slice(0, 6).map((flight) => (
                  <div key={flight.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Plane className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{flight.from} to {flight.to}</h3>
                          <p className="text-sm text-muted-foreground">{flight.airline} · {flight.duration} · {flight.stops}</p>
                          <p className="mt-2 text-sm text-muted-foreground">Departure {flight.departure} · Arrival {flight.arrival}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-muted-foreground">Total fare</p>
                          <p className="text-xl font-semibold text-foreground">{formatCurrency(flight.price)}</p>
                        </div>
                        <BookingButton
                          kind="flight"
                          itemId={flight.id}
                          title={`${flight.from} to ${flight.to}`}
                          subtitle={`${flight.airline} · ${flight.duration}`}
                          image="/images/flight.jpg"
                          price={flight.price}
                          href={`/search?service=flights&from=${encodeURIComponent(flight.from)}&to=${encodeURIComponent(flight.to)}`}
                          size="sm"
                          className="rounded-full"
                        >
                          Reserve seat
                        </BookingButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {!hasRelevantResults && service === "car-rentals" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8">Available car rentals</h2>
              <p className="text-muted-foreground mb-8">No exact matches found, but here are some great options to explore:</p>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {carRentals.slice(0, 6).map((car) => (
                  <Link key={car.slug} href={`/car-rentals/${car.slug}`} className="group">
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-secondary/30">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{car.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{car.category}</p>
                      <p className="text-sm text-muted-foreground">⭐ {car.seats} seats · {car.transmission}</p>
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">From per day</p>
                          <p className="font-semibold text-foreground">{formatCurrency(car.price)}</p>
                        </div>
                        <Button size="sm" className="rounded-full">Book Now</Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {!hasRelevantResults && service === "airport-taxis" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8">Airport taxi options</h2>
              <p className="text-muted-foreground mb-8">No exact matches found, but here are some reliable options:</p>
              <div className="space-y-4">
                {taxiOffers.slice(0, 6).map((offer) => (
                  <div key={offer.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{offer.route}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{offer.vehicle} · {offer.passengers} passengers</p>
                        <p className="text-sm text-muted-foreground">Estimated arrival: {offer.arrivalWindow}</p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="text-xl font-semibold text-foreground">{formatCurrency(offer.price)}</p>
                        </div>
                        <BookingButton
                          kind="airport-taxi"
                          itemId={offer.id}
                          title={offer.route}
                          subtitle={offer.vehicle}
                          image="/images/taxi.jpg"
                          price={offer.price}
                          href={`#`}
                          size="sm"
                          className="rounded-full"
                        >
                          Book Now
                        </BookingButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {service === "stays" && stayResults.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Available stays</h2>
                  <p className="text-muted-foreground">{stayResults.length} properties matched your search.</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {stayResults.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </section>
        )}

        {service === "attractions" && attractionResults.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Available attractions</h2>
                <p className="text-muted-foreground">{attractionResults.length} experiences matched your search.</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {attractionResults.map((attraction) => (
                  <div
                    key={attraction.id}
                    className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <Link href={`/attractions/${attraction.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={attraction.image} alt={attraction.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {attraction.location}
                      </div>
                      <Link href={`/attractions/${attraction.id}`} className="block">
                        <h3 className="mt-3 text-xl font-semibold text-foreground">{attraction.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{attraction.summary}</p>
                      </Link>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">From</p>
                          <p className="text-lg font-semibold text-foreground">{formatCurrency(attraction.price)}</p>
                        </div>
                        <BookingButton
                          kind="attraction"
                          itemId={attraction.id}
                          title={attraction.name}
                          subtitle={attraction.location}
                          image={attraction.image}
                          price={attraction.price}
                          href={`/attractions/${attraction.id}`}
                          size="sm"
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {service === "flights" && flightResults.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Available flights</h2>
                <p className="text-muted-foreground">{flightResults.length} routes are currently mapped to your search.</p>
              </div>
              <div className="space-y-4">
                {flightResults.map((flight) => (
                  <div key={flight.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Plane className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{flight.from} to {flight.to}</h3>
                          <p className="text-sm text-muted-foreground">{flight.airline} · {flight.duration} · {flight.stops}</p>
                          <p className="mt-2 text-sm text-muted-foreground">Departure {flight.departure} · Arrival {flight.arrival}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-muted-foreground">Total fare</p>
                          <p className="text-xl font-semibold text-foreground">{formatCurrency(flight.price)}</p>
                        </div>
                        <BookingButton
                          kind="flight"
                          itemId={flight.id}
                          title={`${flight.from} to ${flight.to}`}
                          subtitle={`${flight.airline} · ${flight.duration}`}
                          image="/images/flight.jpg"
                          price={flight.price}
                          href={`/search?service=flights&from=${encodeURIComponent(flight.from)}&to=${encodeURIComponent(flight.to)}`}
                          size="sm"
                          className="rounded-full"
                        >
                          Reserve seat
                        </BookingButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {service === "car-rentals" && carResults.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Available cars</h2>
                <p className="text-muted-foreground">{carResults.length} vehicles matched your search.</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {carResults.map((car) => (
                  <div
                    key={car.id}
                    className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <Link href={`/car-rentals/${car.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={car.image} alt={car.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                      </div>
                    </Link>
                    <div className="p-5">
                      <div className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">{car.category}</div>
                      <Link href={`/car-rentals/${car.id}`} className="block">
                        <h3 className="mt-3 text-xl font-semibold text-foreground">{car.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{car.summary}</p>
                      </Link>
                      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                        <CarFront className="h-4 w-4" />
                        {car.seats} seats · {car.transmission}
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Per day</p>
                          <p className="text-lg font-semibold text-foreground">{formatCurrency(car.price)}</p>
                        </div>
                        <BookingButton
                          kind="car-rental"
                          itemId={car.id}
                          title={car.name}
                          subtitle={car.location}
                          image={car.image}
                          price={car.price}
                          href={`/car-rentals/${car.id}`}
                          size="sm"
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {service === "airport-taxis" && taxiResults.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Available airport transfers</h2>
                <p className="text-muted-foreground">{taxiResults.length} transfer routes are currently available.</p>
              </div>
              <div className="space-y-4">
                {taxiResults.map((offer) => (
                  <div key={offer.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{offer.route}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{offer.vehicle} · Up to {offer.passengers} passengers</p>
                        <p className="mt-1 text-sm text-muted-foreground">{offer.arrivalWindow}</p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-muted-foreground">Fixed price</p>
                          <p className="text-xl font-semibold text-foreground">{formatCurrency(offer.price)}</p>
                        </div>
                        <BookingButton
                          kind="airport-taxi"
                          itemId={offer.id}
                          title={offer.route}
                          subtitle={offer.vehicle}
                          image="/images/airport-taxi.jpg"
                          price={offer.price}
                          href="/airport-taxis"
                          size="sm"
                          className="rounded-full"
                        >
                          Book transfer
                        </BookingButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {service === "help" && (helpResults.length > 0 || supportResults.length > 0) && (
          <section className="py-16">
            <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <CircleHelp className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">Help articles</h2>
                    <p className="text-sm text-muted-foreground">{helpResults.length} matching support article(s).</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {helpResults.map((article) => (
                    <Link key={article.href} href={article.href} className="flex items-start justify-between gap-4 rounded-2xl border border-border p-4 transition hover:border-primary/40">
                      <div>
                        <p className="text-sm text-primary">{article.category}</p>
                        <h3 className="mt-1 font-semibold text-foreground">{article.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{article.summary}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <Ticket className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">Support categories</h2>
                    <p className="text-sm text-muted-foreground">{supportResults.length} matching support path(s).</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {supportResults.map((category) => (
                    <Link key={category.slug} href={`/support/category/${category.slug}`} className="block rounded-2xl border border-border p-4 transition hover:border-primary/40">
                      <h3 className="font-semibold text-foreground">{category.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {service === "careers" && careerResults.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Available positions</h2>
                <p className="text-muted-foreground">{careerResults.length} open role(s) matched your search.</p>
              </div>
              <div className="space-y-4">
                {careerResults.map((position) => (
                  <Link key={position.slug} href={`/careers/${position.slug}`} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Briefcase className="h-4 w-4" />
                        {position.department}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-foreground">{position.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{position.location} · {position.type}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {service !== "help" && (
          <section className="bg-secondary/30 py-12">
            <div className="container mx-auto px-4">
              <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">Need help refining this search?</h2>
                    <p className="mt-2 text-muted-foreground">
                      Search guidance, booking help, refund questions, and support routing are all available from the support center.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                      <Link href="/support/chat">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Start chat
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/support">Visit support</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
