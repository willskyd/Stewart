"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  id: string
  title: string
  type: string
  location: string
  distance: string
  rating: number
  reviews: number
  price: number
  currency?: string
  image: string
  isFivestar?: boolean
}

export function PropertyCard({
  id,
  title,
  type,
  location,
  distance,
  rating,
  reviews,
  price,
  currency = "₦",
  image,
  isFivestar = false,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/property/${id}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className={cn(
              "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
              isFavorite 
                ? "bg-red-500 text-white" 
                : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:bg-background hover:text-red-500"
            )}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </button>
          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
              isFivestar 
                ? "bg-amber-500/90 text-white" 
                : "bg-background/80 text-foreground"
            )}>
              {isFivestar ? (
                <>
                  <Star className="h-3 w-3 fill-current" />
                  5 Star
                </>
              ) : (
                type
              )}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{location}</p>
          
          {/* Rating and distance */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="font-semibold text-primary">{rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">({reviews} reviews)</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{distance}</span>
          </div>

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-border/50">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">{currency}{price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">/ night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
