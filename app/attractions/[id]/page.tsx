import Image from "next/image"
import Link from "next/link"
import { Clock3, MapPin, ShieldCheck, Sparkles, Star, Ticket } from "lucide-react"
import { notFound } from "next/navigation"
import { BookingButton } from "@/components/booking-button"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { getAttractionFromCatalog, getRelatedAttractionsFromCatalog } from "@/lib/service-catalog"
import { listServices } from "@/lib/server/services-store"

export default async function AttractionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const catalog = await listServices()
  const attraction = getAttractionFromCatalog(catalog, id)

  if (!attraction) {
    notFound()
  }

  const relatedAttractions = getRelatedAttractionsFromCatalog(catalog, attraction.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/30">
          <div className="container mx-auto px-4 py-12">
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm text-primary">
                  <Ticket className="h-4 w-4" />
                  Curated experience
                </div>
                <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">{attraction.name}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {attraction.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {attraction.duration}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {attraction.rating.toFixed(1)} · {attraction.reviews.toLocaleString()} reviews
                  </span>
                </div>
                <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{attraction.description}</p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="mt-1 text-3xl font-bold text-foreground">{formatCurrency(attraction.price)}</p>
                <p className="text-sm text-muted-foreground">per guest</p>
                <div className="mt-6">
                  <BookingButton
                    kind="attraction"
                    itemId={attraction.id}
                    title={attraction.name}
                    subtitle={attraction.location}
                    image={attraction.image}
                    price={attraction.price}
                    href={`/attractions/${attraction.id}`}
                    size="lg"
                    className="w-full rounded-full"
                  />
                </div>
                <div className="mt-6 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                  Professional booking support, clear pricing, and mapped follow-up into dashboard and admin review.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl">
              <Image src={attraction.image} alt={attraction.name} fill className="object-cover" priority />
            </div>
            <div className="grid gap-4">
              {attraction.gallery.slice(1).map((image, index) => (
                <div key={`${image}-${index}`} className="relative min-h-[200px] overflow-hidden rounded-3xl">
                  <Image src={image} alt={`${attraction.name} gallery ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Experience highlights</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {attraction.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl bg-secondary/50 p-4 text-sm text-foreground">
                    {highlight}
                  </div>
                ))}
              </div>

              <h3 className="mt-8 text-xl font-semibold text-foreground">What is included</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {attraction.includes.map((item) => (
                  <span key={item} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Good to know</h2>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                  Mobile vouchers are accepted for most departure slots.
                </div>
                <div className="rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                  Arrive at least 15 minutes before the selected start time.
                </div>
                <div className="rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                  Use the dashboard after booking to review status, updates, and admin approvals.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">More experiences</h2>
                <p className="text-muted-foreground">Additional professionally mapped tours and attraction pages.</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/attractions">Back to attractions</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedAttractions.map((related) => (
                <Link key={related.id} href={`/attractions/${related.id}`} className="rounded-3xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-lg">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={related.image} alt={related.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{related.name}</h3>
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
