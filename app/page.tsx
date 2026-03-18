import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSearch } from "@/components/hero-search"
import { WhyStewart } from "@/components/why-stewart"
import { PropertySlider } from "@/components/property-slider"
import { PropertyTypes } from "@/components/property-types"
import { FiveStarSection } from "@/components/five-star-section"
import { TrendingDestinations } from "@/components/trending-destinations"
import { ExploreSection } from "@/components/explore-section"
import { TripPlanner } from "@/components/trip-planner"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Beautiful tropical resort"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
                Welcome to Stewart.com
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-2">
                Your Ultimate Destination for All Things Travel
              </p>
              <p className="text-white/70">
                Discover amazing stays, flights, and experiences around the world
              </p>
            </div>

            <HeroSearch />
          </div>
        </section>

        {/* Why Stewart */}
        <WhyStewart />

        {/* Property Slider */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Popular Stays</h2>
              <p className="text-muted-foreground">Handpicked properties loved by our travelers</p>
            </div>
            <PropertySlider />
          </div>
        </section>

        {/* Property Types */}
        <PropertyTypes />

        {/* Five Star Section */}
        <FiveStarSection />

        {/* Trending Destinations */}
        <TrendingDestinations />

        {/* Explore Section */}
        <ExploreSection />

        {/* Trip Planner */}
        <TripPlanner />
      </main>

      <Footer />
    </div>
  )
}
