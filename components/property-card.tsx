"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import { BookingButton } from "@/components/booking-button"
import { FavoriteButton } from "@/components/favorite-button"
import { formatCurrency } from "@/lib/formatters"
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
  image,
  isFivestar = false,
}: PropertyCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/property/${id}`} className="block h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <FavoriteButton propertyId={id} />
        <div className="absolute top-3 left-3 z-10">
          <Link href={`/property/${id}`}>
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
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/property/${id}`} className="block">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{location}</p>
        </Link>

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

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/50 pt-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">{formatCurrency(price)}</span>
              <span className="text-sm text-muted-foreground">/ night</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Instant confirmation available</p>
          </div>
          <BookingButton
            kind="stay"
            itemId={id}
            title={title}
            subtitle={location}
            image={image}
            price={price}
            href={`/property/${id}`}
            size="sm"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
