"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Search, Users, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { buildQueryString } from "@/lib/search-utils"

export function HeroSearch() {
  const router = useRouter()
  const [destination, setDestination] = React.useState("")
  const [checkIn, setCheckIn] = React.useState<Date>()
  const [checkOut, setCheckOut] = React.useState<Date>()
  const [adults, setAdults] = React.useState(2)
  const [children, setChildren] = React.useState(0)
  const [rooms, setRooms] = React.useState(1)

  const handleSearch = () => {
    if (!destination.trim()) {
      alert("Please enter a destination")
      return
    }
    router.push(
      `/search${buildQueryString({
        service: "stays",
        destination,
        checkIn: checkIn?.toISOString().slice(0, 10),
        checkOut: checkOut?.toISOString().slice(0, 10),
        adults,
        children,
        rooms,
      })}`
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 border border-border/50">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          {/* Destination */}
          <div className="relative">
            <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-background border border-input hover:border-primary/50 transition-colors">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs text-muted-foreground">Where are you going?</span>
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent border-0 outline-none text-sm font-medium placeholder:text-muted-foreground/70 w-full"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 h-14 px-4 rounded-xl bg-background border border-input hover:border-primary/50 transition-colors text-left">
                <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col min-w-[180px]">
                  <span className="text-xs text-muted-foreground">Check-in - Check-out</span>
                  <span className="text-sm font-medium">
                    {checkIn && checkOut 
                      ? `${format(checkIn, "MMM d")} - ${format(checkOut, "MMM d")}`
                      : "Select dates"}
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col sm:flex-row">
                <div>
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium">Check-in</p>
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
                    <p className="text-sm font-medium">Check-out</p>
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

          {/* Guests */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 h-14 px-4 rounded-xl bg-background border border-input hover:border-primary/50 transition-colors text-left">
                <Users className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col min-w-[120px]">
                  <span className="text-xs text-muted-foreground">Guests</span>
                  <span className="text-sm font-medium">
                    {adults} adult{adults !== 1 ? 's' : ''}, {children} child{children !== 1 ? 'ren' : ''}
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="start">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Adults</p>
                    <p className="text-xs text-muted-foreground">18+ years</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                      disabled={adults >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Children</p>
                    <p className="text-xs text-muted-foreground">0-17 years</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setChildren(Math.min(10, children + 1))}
                      disabled={children >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      disabled={rooms <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{rooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setRooms(Math.min(10, rooms + 1))}
                      disabled={rooms >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <Button 
            size="lg" 
            className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
