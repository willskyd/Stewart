import Image from "next/image"
import Link from "next/link"
import { Bath, BedDouble, CalendarDays, MapPin, ShieldCheck, Sparkles, Star, Users } from "lucide-react"
import { notFound } from "next/navigation"
import { BookingButton } from "@/components/booking-button"
import { FavoriteButton } from "@/components/favorite-button"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { getPropertyById, getRelatedProperties } from "@/lib/site-data"

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = getPropertyById(id)

  if (!property) {
    notFound()
  }

  const relatedProperties = getRelatedProperties(property.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-secondary/20">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{property.type}</Badge>
                  {property.isFivestar && (
                    <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/10">5-star collection</Badge>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {property.rating.toFixed(1)} · {property.reviews.toLocaleString()} reviews
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-foreground md:text-5xl">{property.title}</h1>
                <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {property.location}
                </div>
                <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{property.description}</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">From</p>
                <p className="mt-1 text-3xl font-bold text-foreground">{formatCurrency(property.price)}</p>
                <p className="text-sm text-muted-foreground">per night</p>
                <div className="mt-5 flex items-center gap-3">
                  <BookingButton
                    kind="stay"
                    itemId={property.id}
                    title={property.title}
                    subtitle={property.location}
                    image={property.image}
                    price={property.price}
                    href={`/property/${property.id}`}
                    size="lg"
                    className="rounded-full"
                  />
                  <div className="relative h-11 w-11">
                    <FavoriteButton propertyId={property.id} className="right-0 top-0 h-11 w-11 rounded-full border border-border bg-background text-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative min-h-[420px] overflow-hidden rounded-3xl md:row-span-2">
                  <Image src={property.image} alt={property.title} fill className="object-cover" priority />
                </div>
                {property.gallery.slice(1, 3).map((image, index) => (
                  <div key={`${image}-${index}`} className="relative min-h-[200px] overflow-hidden rounded-3xl">
                    <Image src={image} alt={`${property.title} gallery ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground">Stay snapshot</h2>
                <div className="mt-6 grid gap-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-4">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{property.guests} guests</p>
                      <p className="text-sm text-muted-foreground">Comfortably accommodated</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-4">
                    <BedDouble className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{property.bedrooms} bedrooms</p>
                      <p className="text-sm text-muted-foreground">Well-planned sleeping areas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-4">
                    <Bath className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{property.baths} bathrooms</p>
                      <p className="text-sm text-muted-foreground">Private and guest-friendly layout</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-4">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Flexible policies</p>
                      <p className="text-sm text-muted-foreground">See booking notes before checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Why guests book this stay</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {property.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl bg-secondary/50 p-4 text-sm text-foreground">
                    {highlight}
                  </div>
                ))}
              </div>

              <h3 className="mt-8 text-xl font-semibold text-foreground">Amenities</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {property.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Booking notes</h2>
              </div>
              <div className="mt-6 space-y-4">
                {property.policyNotes.map((note) => (
                  <div key={note} className="rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">More stays you may like</h2>
                <p className="text-muted-foreground">Professionally matched options with similar quality and booking flow.</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/favorites">View favorites</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProperties.map((related) => (
                <Link key={related.id} href={`/property/${related.id}`} className="rounded-3xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-lg">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={related.image} alt={related.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{related.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{related.location}</p>
                  <p className="mt-4 font-semibold text-foreground">{formatCurrency(related.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
