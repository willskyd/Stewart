"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, MapPin, Sparkles } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { getFavoritePropertyIds, subscribeToStore } from "@/lib/site-store"
import { useServiceCatalog } from "@/hooks/use-service-catalog"

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([])
  const { properties } = useServiceCatalog()

  React.useEffect(() => {
    const syncState = () => setFavoriteIds(getFavoritePropertyIds())
    syncState()
    return subscribeToStore(syncState)
  }, [])

  const favoriteProperties = properties.filter((property) => favoriteIds.includes(property.id))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-rose-500/10 via-background to-secondary/30">
          <div className="container mx-auto px-4 py-14">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm text-rose-500 shadow-sm">
                <Heart className="h-4 w-4 fill-current" />
                Saved collection
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">Your favorite stays</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Every property saved from the heart icon on your cards appears here automatically.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {favoriteProperties.length} saved property{favoriteProperties.length === 1 ? "" : "ies"}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {favoriteProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {favoriteProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card/70 p-10 text-center">
                <Sparkles className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-5 text-2xl font-semibold text-foreground">No favorites yet</h2>
                <p className="mt-3 text-muted-foreground">
                  Save properties from the homepage cards or search results and they will appear here immediately.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/">Explore stays</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
