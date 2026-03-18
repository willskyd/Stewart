"use client"

import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    name: "Lagos",
    country: "Nigeria",
    image: "/images/lagos.jpg",
    properties: 2345,
    size: "large",
  },
  {
    name: "London",
    country: "United Kingdom",
    image: "/images/london.jpg",
    properties: 8721,
    size: "medium",
  },
  {
    name: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    properties: 6543,
    size: "medium",
  },
  {
    name: "Dubai",
    country: "UAE",
    image: "/images/dubai.jpg",
    properties: 4521,
    size: "small",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "/images/tokyo.jpg",
    properties: 5678,
    size: "small",
  },
  {
    name: "New York",
    country: "USA",
    image: "/images/newyork.jpg",
    properties: 9876,
    size: "large",
  },
]

export function TrendingDestinations() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Trending Destinations</h2>
          <p className="text-muted-foreground">Most popular travels from our community</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {destinations.map((destination, index) => {
            const isLarge = destination.size === "large"
            const isMedium = destination.size === "medium"
            
            return (
              <Link
                key={destination.name}
                href={`/search?destination=${destination.name.toLowerCase()}`}
                className={`group relative overflow-hidden rounded-2xl ${
                  isLarge ? "md:col-span-2 md:row-span-2" : 
                  isMedium ? "md:row-span-2" : ""
                }`}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-sm text-white/80">{destination.country}</p>
                  <p className="text-xs text-white/60 mt-1">{destination.properties.toLocaleString()} properties</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
