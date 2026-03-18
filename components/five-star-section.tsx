"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"

const fiveStarProperties = [
  {
    id: "fs-1",
    title: "The Ritz-Carlton Lagos",
    type: "5 Star Hotel",
    location: "Eko Atlantic, Lagos",
    distance: "5.5 km away",
    rating: 4.9,
    reviews: 1245,
    price: 450000,
    image: "/images/hotel-1.jpg",
    isFivestar: true,
  },
  {
    id: "fs-2",
    title: "Four Seasons Resort & Spa",
    type: "5 Star Resort",
    location: "Victoria Island, Lagos",
    distance: "2.8 km away",
    rating: 4.9,
    reviews: 892,
    price: 380000,
    image: "/images/resort-1.jpg",
    isFivestar: true,
  },
  {
    id: "fs-3",
    title: "Presidential Villa Ikoyi",
    type: "5 Star Villa",
    location: "Ikoyi, Lagos",
    distance: "3.2 km away",
    rating: 5.0,
    reviews: 156,
    price: 750000,
    image: "/images/villa-1.jpg",
    isFivestar: true,
  },
  {
    id: "fs-4",
    title: "Eko Hotel & Suites",
    type: "5 Star Hotel",
    location: "Victoria Island, Lagos",
    distance: "2.1 km away",
    rating: 4.8,
    reviews: 2341,
    price: 280000,
    image: "/images/apartment-1.jpg",
    isFivestar: true,
  },
  {
    id: "fs-5",
    title: "Intercontinental Lagos",
    type: "5 Star Hotel",
    location: "Victoria Island, Lagos",
    distance: "2.5 km away",
    rating: 4.9,
    reviews: 1567,
    price: 320000,
    image: "/images/resort-2.jpg",
    isFivestar: true,
  },
]

export function FiveStarSection() {
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
      const scrollAmount = 320
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
          <h2 className="text-3xl font-bold text-foreground mb-3">5-Star Luxury Stays</h2>
          <p className="text-muted-foreground">Experience world-class hospitality at our highest-rated properties</p>
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
            {fiveStarProperties.map((property) => (
              <div key={property.id} className="flex-none w-[280px]">
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
