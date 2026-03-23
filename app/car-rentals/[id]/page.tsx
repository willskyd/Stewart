import Image from "next/image"
import Link from "next/link"
import { CarFront, Fuel, MapPin, Settings2, ShieldCheck, Users } from "lucide-react"
import { notFound } from "next/navigation"
import { BookingButton } from "@/components/booking-button"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { carRentals, getCarRentalById } from "@/lib/site-data"

export default async function CarRentalDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const car = getCarRentalById(id)

  if (!car) {
    notFound()
  }

  const relatedCars = carRentals.filter((item) => item.id !== car.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-secondary/50 via-background to-primary/10">
          <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[1.2fr_0.9fr]">
            <div>
              <div className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">{car.category}</div>
              <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">{car.name}</h1>
              <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {car.location}
              </div>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{car.summary}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-card p-4 shadow-sm">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-medium text-foreground">{car.seats} seats</p>
                </div>
                <div className="rounded-2xl bg-card p-4 shadow-sm">
                  <Settings2 className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-medium text-foreground">{car.transmission}</p>
                </div>
                <div className="rounded-2xl bg-card p-4 shadow-sm">
                  <Fuel className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-medium text-foreground">{car.fuel}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Daily rate</p>
              <p className="mt-1 text-3xl font-bold text-foreground">{formatCurrency(car.price)}</p>
              <p className="text-sm text-muted-foreground">before extras and deposit</p>
              <BookingButton
                kind="car-rental"
                itemId={car.id}
                title={car.name}
                subtitle={car.location}
                image={car.image}
                price={car.price}
                href={`/car-rentals/${car.id}`}
                size="lg"
                className="mt-6 w-full rounded-full"
              >
                Book this car
              </BookingButton>
              <div className="mt-6 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                Your booking is saved into the shared dashboard flow and can be approved or cancelled from admin.
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="relative min-h-[440px] overflow-hidden rounded-3xl">
              <Image src={car.image} alt={car.name} fill className="object-cover" priority />
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Included with this booking</h2>
              </div>
              <div className="mt-6 space-y-4">
                {car.features.map((feature) => (
                  <div key={feature} className="rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                    {feature}
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
                <h2 className="text-3xl font-bold text-foreground">Other available cars</h2>
                <p className="text-muted-foreground">Mapped vehicle pages with the same booking workflow.</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/car-rentals">Back to rentals</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedCars.map((related) => (
                <Link key={related.id} href={`/car-rentals/${related.id}`} className="rounded-3xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-lg">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={related.image} alt={related.name} fill className="object-cover" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CarFront className="h-4 w-4" />
                    {related.category}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{related.name}</h3>
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
