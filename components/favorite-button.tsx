"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { isFavoriteProperty, subscribeToStore, toggleFavoriteProperty } from "@/lib/site-store"

interface FavoriteButtonProps {
  propertyId: string
  className?: string
}

export function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    const syncState = () => setIsFavorite(isFavoriteProperty(propertyId))
    syncState()

    return subscribeToStore(syncState)
  }, [propertyId])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsFavorite(toggleFavoriteProperty(propertyId))
  }

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={isFavorite}
      onClick={handleClick}
      className={cn(
        "absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
        isFavorite
          ? "bg-rose-500 text-white shadow-lg"
          : "bg-background/85 text-muted-foreground backdrop-blur-sm hover:bg-background hover:text-rose-500",
        className
      )}
    >
      <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
    </button>
  )
}
