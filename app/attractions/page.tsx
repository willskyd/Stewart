"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { 
  CalendarIcon, 
  MapPin, 
  Search,
  Star,
  Clock,
  Users
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingButton } from "@/components/booking-button"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useServiceCatalog } from "@/hooks/use-service-catalog"
import { attractionRegions, moreAttractionDestinations } from "@/lib/site-data"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { buildQueryString } from "@/lib/search-utils"

export default function AttractionsPage() {
  const router = useRouter()
  const { attractions } = useServiceCatalog()
  const [destination, setDestination] = React.useState("")
  const [checkIn, setCheckIn] = React.useState<Date>()
  const [checkOut, setCheckOut] = React.useState<Date>()
  const [activeRegion, setActiveRegion] = React.useState("europe")

  const handleSearch = () => {
    router.push(
      `/search${buildQueryString({
        service: "attractions",
        destination,
        query: destination,
        checkIn: checkIn?.toISOString().slice(0, 10),
        checkOut: checkOut?.toISOString().slice(0, 10),
      })}`
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Attractions</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore the best attractions and activities in your destination with Stewart.com. 
                From iconic landmarks to hidden gems.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-lg max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Destination */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-transparent border-0 outline-none text-sm w-full"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input text-left min-w-[200px]">
                      <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">
                        {checkIn && checkOut 
                          ? `${format(checkIn, "MMM d")} - ${format(checkOut, "MMM d")}`
                          : "Select dates"}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex flex-col sm:flex-row">
                      <div>
                        <div className="p-3 border-b">
                          <p className="text-sm font-medium">Start Date</p>
                        </div>
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </div>
                      <div className="border-l">
                        <div className="p-3 border-b">
                          <p className="text-sm font-medium">End Date</p>
                        </div>
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date < new Date() || (checkIn ? date <= checkIn : false)}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Search Button */}
                <Button 
                  size="lg" 
                  className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Attractions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8">Top Attractions Worldwide</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => (
                <div key={attraction.id} className="group">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                    <Link href={`/attractions/${attraction.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={attraction.image}
                          alt={attraction.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/attractions/${attraction.id}`} className="block">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {attraction.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {attraction.location}
                        </p>
                      </Link>
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{attraction.rating}</span>
                          <span className="text-muted-foreground">({attraction.reviews.toLocaleString()})</span>
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {attraction.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div>
                          <span className="text-xs text-muted-foreground">From</span>
                          <p className="text-lg font-bold text-foreground">
                            ₦{attraction.price.toLocaleString()}
                          </p>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore More Destinations */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-3">Explore More Destinations</h2>
            <p className="text-muted-foreground mb-8">Discover attractions across the globe</p>

            {/* Region Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {attractionRegions.slice(1).map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    activeRegion === region.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/50"
                  )}
                >
                  {region.label}
                </button>
              ))}
            </div>

            {/* Destination Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreAttractionDestinations[activeRegion as keyof typeof moreAttractionDestinations]?.map((dest) => (
                <Link 
                  key={dest.name}
                  href={`/search?service=attractions&destination=${dest.name.toLowerCase()}&type=attraction`}
                  className="group"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                      <p className="text-sm text-white/80">{dest.attractions} attractions</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Book With Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Top-Rated Experiences</h3>
                <p className="text-sm text-muted-foreground">Curated selection of the best attractions worldwide</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Skip the Line</h3>
                <p className="text-sm text-muted-foreground">Priority access to popular attractions</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Guides</h3>
                <p className="text-sm text-muted-foreground">Local experts who bring history to life</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
