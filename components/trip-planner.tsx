"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Landmark, ShoppingBag, Music, Mountain, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const vibes = [
  {
    id: "historical",
    label: "Historical Tours",
    icon: Landmark,
    destinations: [
      { name: "Rome", image: "/images/attraction-1.jpg" },
      { name: "Athens", image: "/images/villa-1.jpg" },
      { name: "Cairo", image: "/images/hotel-1.jpg" },
      { name: "Jerusalem", image: "/images/apartment-2.jpg" },
    ],
  },
  {
    id: "shopping",
    label: "Shopping & Outlets",
    icon: ShoppingBag,
    destinations: [
      { name: "Dubai Mall", image: "/images/dubai.jpg" },
      { name: "Milan", image: "/images/apartment-1.jpg" },
      { name: "New York", image: "/images/newyork.jpg" },
      { name: "Paris", image: "/images/paris.jpg" },
    ],
  },
  {
    id: "music",
    label: "Live Music",
    icon: Music,
    destinations: [
      { name: "Nashville", image: "/images/hotel-1.jpg" },
      { name: "New Orleans", image: "/images/apartment-3.jpg" },
      { name: "London", image: "/images/london.jpg" },
      { name: "Tokyo", image: "/images/tokyo.jpg" },
    ],
  },
  {
    id: "adventures",
    label: "Adventures",
    icon: Mountain,
    destinations: [
      { name: "Queenstown", image: "/images/villa-1.jpg" },
      { name: "Interlaken", image: "/images/resort-1.jpg" },
      { name: "Costa Rica", image: "/images/resort-2.jpg" },
      { name: "Iceland", image: "/images/attraction-1.jpg" },
    ],
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: Sparkles,
    destinations: [
      { name: "Bali Spa", image: "/images/resort-1.jpg" },
      { name: "Maldives", image: "/images/resort-2.jpg" },
      { name: "Thailand", image: "/images/villa-1.jpg" },
      { name: "Santorini", image: "/images/apartment-2.jpg" },
    ],
  },
]

export function TripPlanner() {
  const [activeVibe, setActiveVibe] = React.useState(vibes[0])

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Quick and Easy Trip Planner</h2>
          <p className="text-muted-foreground">Pick a vibe and explore the top destinations</p>
        </div>

        {/* Vibe navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {vibes.map((vibe) => {
            const Icon = vibe.icon
            const isActive = activeVibe.id === vibe.id
            return (
              <button
                key={vibe.id}
                onClick={() => setActiveVibe(vibe)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {vibe.label}
              </button>
            )
          })}
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activeVibe.destinations.map((destination) => (
            <Link
              key={destination.name}
              href={`/search?vibe=${activeVibe.id}&destination=${destination.name.toLowerCase()}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-2">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {destination.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
