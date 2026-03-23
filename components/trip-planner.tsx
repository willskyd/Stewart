"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Landmark, ShoppingBag, Music, Mountain, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { tripPlannerVibes } from "@/lib/site-data"

const vibeIcons = {
  historical: Landmark,
  shopping: ShoppingBag,
  music: Music,
  adventures: Mountain,
  wellness: Sparkles,
}

export function TripPlanner() {
  const [activeVibe, setActiveVibe] = React.useState(tripPlannerVibes[0])

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Quick and Easy Trip Planner</h2>
          <p className="text-muted-foreground">Pick a vibe and explore the top destinations</p>
        </div>

        {/* Vibe navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tripPlannerVibes.map((vibe) => {
            const Icon = vibeIcons[vibe.id as keyof typeof vibeIcons]
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
              href={`/search?service=stays&vibe=${activeVibe.id}&destination=${destination.name.toLowerCase()}`}
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
