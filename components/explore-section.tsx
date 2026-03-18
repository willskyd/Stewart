"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const exploreLocations = [
  {
    name: "Santorini",
    country: "Greece",
    properties: 892,
    image: "/images/villa-1.jpg",
  },
  {
    name: "Bali",
    country: "Indonesia",
    properties: 2341,
    image: "/images/resort-1.jpg",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    properties: 456,
    image: "/images/resort-2.jpg",
  },
  {
    name: "Barcelona",
    country: "Spain",
    properties: 3456,
    image: "/images/apartment-2.jpg",
  },
  {
    name: "Rome",
    country: "Italy",
    properties: 4521,
    image: "/images/attraction-1.jpg",
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    properties: 2789,
    image: "/images/apartment-3.jpg",
  },
  {
    name: "Sydney",
    country: "Australia",
    properties: 1876,
    image: "/images/hotel-1.jpg",
  },
  {
    name: "Cape Town",
    country: "South Africa",
    properties: 1234,
    image: "/images/villa-1.jpg",
  },
]

export function ExploreSection() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      )
    }
  }

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 200
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      checkScroll()
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Explore</h2>
          <p className="text-muted-foreground">Discover amazing destinations around the world</p>
        </div>

        <div className="relative group">
          {canScrollLeft && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
          >
            {exploreLocations.map((location) => (
              <Link
                key={location.name}
                href={`/search?destination=${location.name.toLowerCase()}`}
                className="flex-none w-[160px] group/card"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl mb-2">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover/card:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover/card:text-primary transition-colors">
                  {location.name}
                </h3>
                <p className="text-xs text-muted-foreground">{location.country}</p>
                <p className="text-xs text-muted-foreground">{location.properties} properties</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
