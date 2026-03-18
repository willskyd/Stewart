"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"

const properties = [
  {
    id: "1",
    title: "Luxury Marina Suite",
    type: "Apartment",
    location: "Victoria Island, Lagos",
    distance: "2.5 km away",
    rating: 4.8,
    reviews: 245,
    price: 85000,
    image: "/images/apartment-1.jpg",
  },
  {
    id: "2",
    title: "Ocean View Resort & Spa",
    type: "Resort",
    location: "Lekki Peninsula, Lagos",
    distance: "8.2 km away",
    rating: 4.9,
    reviews: 512,
    price: 150000,
    image: "/images/resort-1.jpg",
  },
  {
    id: "3",
    title: "Modern Downtown Loft",
    type: "Apartment",
    location: "Ikoyi, Lagos",
    distance: "1.8 km away",
    rating: 4.7,
    reviews: 189,
    price: 65000,
    image: "/images/apartment-2.jpg",
  },
  {
    id: "4",
    title: "Beachfront Villa Paradise",
    type: "Villa",
    location: "Eko Atlantic, Lagos",
    distance: "5.5 km away",
    rating: 4.9,
    reviews: 324,
    price: 250000,
    image: "/images/villa-1.jpg",
  },
  {
    id: "5",
    title: "Grand Imperial Hotel",
    type: "Hotel",
    location: "Victoria Island, Lagos",
    distance: "3.1 km away",
    rating: 4.6,
    reviews: 876,
    price: 120000,
    image: "/images/hotel-1.jpg",
  },
  {
    id: "6",
    title: "Cozy City Apartment",
    type: "Apartment",
    location: "Yaba, Lagos",
    distance: "4.2 km away",
    rating: 4.5,
    reviews: 156,
    price: 45000,
    image: "/images/apartment-3.jpg",
  },
  {
    id: "7",
    title: "Tropical Island Resort",
    type: "Resort",
    location: "Badagry Beach, Lagos",
    distance: "45 km away",
    rating: 4.8,
    reviews: 298,
    price: 180000,
    image: "/images/resort-2.jpg",
  },
]

export function PropertySlider() {
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
    <div className="relative group">
      {/* Scroll buttons */}
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

      {/* Cards container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
      >
        {properties.map((property) => (
          <div key={property.id} className="flex-none w-[280px]">
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </div>
  )
}
