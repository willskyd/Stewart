"use client"

import * as React from "react"
import Image from "next/image"
import { format } from "date-fns"
import { 
  CalendarIcon, 
  MapPin, 
  Search, 
  Users, 
  Minus, 
  Plus,
  ArrowRightLeft,
  Plane
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const cabinClasses = [
  { id: "economy", label: "Economy" },
  { id: "premium", label: "Premium Economy" },
  { id: "business", label: "Business" },
  { id: "first", label: "First" },
]

export default function FlightsPage() {
  const [from, setFrom] = React.useState("")
  const [to, setTo] = React.useState("")
  const [departure, setDeparture] = React.useState<Date>()
  const [returnDate, setReturnDate] = React.useState<Date>()
  const [adults, setAdults] = React.useState(1)
  const [children, setChildren] = React.useState(0)
  const [infants, setInfants] = React.useState(0)
  const [cabinClass, setCabinClass] = React.useState("economy")

  const swapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = () => {
    console.log({ from, to, departure, returnDate, adults, children, infants, cabinClass })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left - Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
                <Image
                  src="/images/flight.jpg"
                  alt="Airplane flying above clouds"
                  fill
                  priority
                  loading="eager"
                  className="object-cover"
                />
              </div>

              {/* Right - Search Form */}
              <div className="order-1 lg:order-2">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                  Find Your Perfect Flight
                </h1>
                <p className="text-muted-foreground mb-8">
                  Compare prices from hundreds of airlines and book with confidence
                </p>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                  {/* From - To */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">From</label>
                      <div className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <input
                          type="text"
                          placeholder="City or airport"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="bg-transparent border-0 outline-none text-sm w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full mt-5 shrink-0"
                      onClick={swapLocations}
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">To</label>
                      <div className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <input
                          type="text"
                          placeholder="City or airport"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="bg-transparent border-0 outline-none text-sm w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input text-left">
                          <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Departure</span>
                            <span className="text-sm">
                              {departure ? format(departure, "MMM d, yyyy") : "Select date"}
                            </span>
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={departure}
                          onSelect={setDeparture}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input text-left">
                          <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Return</span>
                            <span className="text-sm">
                              {returnDate ? format(returnDate, "MMM d, yyyy") : "Select date"}
                            </span>
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          disabled={(date) => date < new Date() || (departure ? date <= departure : false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Travelers */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input text-left mb-4">
                        <Users className="h-4 w-4 text-primary shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Travelers</span>
                          <span className="text-sm">
                            {adults + children + infants} traveler{adults + children + infants !== 1 ? 's' : ''}, {cabinClasses.find(c => c.id === cabinClass)?.label}
                          </span>
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Travelers</h4>
                        
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
                            <span className="w-8 text-center">{adults}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => setAdults(Math.min(9, adults + 1))}
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
                            <span className="w-8 text-center">{children}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => setChildren(Math.min(9, children + 1))}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Infants on lap</p>
                            <p className="text-xs text-muted-foreground">Under 2 years</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => setInfants(Math.max(0, infants - 1))}
                              disabled={infants <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{infants}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => setInfants(Math.min(adults, infants + 1))}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-3">Cabin Class</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {cabinClasses.map((cabin) => (
                              <button
                                key={cabin.id}
                                onClick={() => setCabinClass(cabin.id)}
                                className={cn(
                                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                  cabinClass === cabin.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                )}
                              >
                                {cabin.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Search Button */}
                  <Button 
                    size="lg" 
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90"
                    onClick={handleSearch}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search Flights
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8">Popular Flight Routes</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { from: "Lagos", to: "London", price: "₦850,000" },
                { from: "Lagos", to: "Dubai", price: "₦650,000" },
                { from: "Lagos", to: "New York", price: "₦1,200,000" },
                { from: "Abuja", to: "London", price: "₦820,000" },
                { from: "Lagos", to: "Paris", price: "₦780,000" },
                { from: "Lagos", to: "Johannesburg", price: "₦450,000" },
              ].map((route) => (
                <div 
                  key={`${route.from}-${route.to}`}
                  className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{route.from} - {route.to}</p>
                      <p className="text-sm text-muted-foreground">Round trip</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{route.price}</p>
                    <p className="text-xs text-muted-foreground">From</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Compare Prices</h3>
                <p className="text-sm text-muted-foreground">Search hundreds of airlines to find the best deal</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Plane className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Direct Booking</h3>
                <p className="text-sm text-muted-foreground">Book directly with airlines for the best experience</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Our team is here to help you every step of the way</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
