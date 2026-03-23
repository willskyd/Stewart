"use client"

import * as React from "react"
import Image from "next/image"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { 
  CalendarIcon, 
  MapPin, 
  Search,
  Clock,
  Users,
  ChevronDown,
  Smartphone,
  Calendar,
  UserCheck,
  Car,
  CheckCircle2
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { buildQueryString } from "@/lib/search-utils"

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return [`${hour}:00`, `${hour}:30`]
}).flat()

const passengerOptions = Array.from({ length: 16 }, (_, i) => i + 1)

const steps = [
  {
    icon: Smartphone,
    title: "Book Online",
    description: "Enter your pickup location, destination, and travel details",
  },
  {
    icon: Calendar,
    title: "Confirm Booking",
    description: "Review your booking details and confirm your reservation",
  },
  {
    icon: UserCheck,
    title: "Meet Your Driver",
    description: "Your driver will be waiting at the airport with a name sign",
  },
  {
    icon: Car,
    title: "Enjoy Your Ride",
    description: "Relax and enjoy a comfortable ride to your destination",
  },
  {
    icon: CheckCircle2,
    title: "Arrive Safely",
    description: "Arrive at your destination stress-free and on time",
  },
]

const faqs = [
  {
    question: "How do I know my driver will be there?",
    answer: "Your driver will track your flight and adjust pickup time based on actual arrival. They'll be waiting in the arrivals hall with a name sign. You'll receive driver details and contact information via email and SMS before your pickup."
  },
  {
    question: "What if my flight is delayed?",
    answer: "No worries! We monitor all flights in real-time and automatically adjust your pickup time. Your driver will wait up to 60 minutes after your flight lands at no extra cost for airport pickups."
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Yes, you can cancel or modify your booking up to 24 hours before pickup for a full refund. Changes within 24 hours may incur a fee depending on the modification type."
  },
  {
    question: "What types of vehicles are available?",
    answer: "We offer a range of vehicles from economy sedans to luxury SUVs and minivans. For larger groups, we have executive vans and minibuses available. All vehicles are clean, comfortable, and air-conditioned."
  },
  {
    question: "Are child seats available?",
    answer: "Yes, child seats and booster seats are available upon request. Please select the appropriate option during booking to ensure availability. There may be an additional charge for child seats."
  },
  {
    question: "How do I pay for my ride?",
    answer: "You can pay online during booking using credit/debit card or pay cash directly to the driver. All prices are fixed and agreed upon at booking - no hidden fees or surge pricing."
  },
]

export default function AirportTaxisPage() {
  const router = useRouter()
  const [tripType, setTripType] = React.useState<"one-way" | "round-trip">("one-way")
  const [pickupLocation, setPickupLocation] = React.useState("")
  const [dropoffLocation, setDropoffLocation] = React.useState("")
  const [pickupDate, setPickupDate] = React.useState<Date>()
  const [pickupTime, setPickupTime] = React.useState("10:00")
  const [returnDate, setReturnDate] = React.useState<Date>()
  const [returnTime, setReturnTime] = React.useState("10:00")
  const [passengers, setPassengers] = React.useState(1)

  const handleSearch = () => {
    if (!pickupLocation.trim() || !dropoffLocation.trim()) {
      alert("Please enter both pickup and dropoff locations")
      return
    }
    router.push(
      `/search${buildQueryString({
        service: "airport-taxis",
        destination: dropoffLocation,
        from: pickupLocation,
        to: dropoffLocation,
        pickupDate: pickupDate?.toISOString().slice(0, 10),
        returnDate: returnDate?.toISOString().slice(0, 10),
        passengers,
        tripType,
      })}`
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Airport Taxis</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Book your airport taxi with Stewart.com and enjoy a hassle-free travel experience.
              </p>
            </div>

            {/* Trip Type Toggle */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setTripType("one-way")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors",
                  tripType === "one-way"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/50"
                )}
              >
                <span className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                  tripType === "one-way" ? "border-primary-foreground" : "border-muted-foreground"
                )}>
                  {tripType === "one-way" && (
                    <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </span>
                One Way
              </button>
              <button
                onClick={() => setTripType("round-trip")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors",
                  tripType === "round-trip"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/50"
                )}
              >
                <span className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                  tripType === "round-trip" ? "border-primary-foreground" : "border-muted-foreground"
                )}>
                  {tripType === "round-trip" && (
                    <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </span>
                Round Trip
              </button>
            </div>

            {/* Search Form */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg max-w-5xl mx-auto">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                {/* Pick-up Location */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Pick-up Location</label>
                  <div className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <input
                      type="text"
                      placeholder="Airport, hotel, or address"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="bg-transparent border-0 outline-none text-sm w-full"
                    />
                  </div>
                </div>

                {/* Drop-off Location */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Drop-off Location</label>
                  <div className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <input
                      type="text"
                      placeholder="Airport, hotel, or address"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="bg-transparent border-0 outline-none text-sm w-full"
                    />
                  </div>
                </div>

                {/* Pick-up Date */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Pick-up Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 h-12 px-3 rounded-xl bg-background border border-input w-full text-left">
                          <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm truncate">
                            {pickupDate ? format(pickupDate, "MMM d") : "Date"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={pickupDate}
                          onSelect={setPickupDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Time</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 h-12 px-3 rounded-xl bg-background border border-input w-full text-left">
                          <Clock className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm">{pickupTime}</span>
                          <ChevronDown className="h-4 w-4 ml-auto" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32 p-0" align="start">
                        <div className="max-h-60 overflow-y-auto">
                          {timeOptions.map((time) => (
                            <button
                              key={time}
                              onClick={() => setPickupTime(time)}
                              className="w-full px-3 py-2 text-sm text-left hover:bg-secondary"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Return Date (only for round trip) */}
                {tripType === "round-trip" && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Return Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 h-12 px-3 rounded-xl bg-background border border-input w-full text-left">
                            <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm truncate">
                              {returnDate ? format(returnDate, "MMM d") : "Date"}
                            </span>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            disabled={(date) => date < new Date() || (pickupDate ? date < pickupDate : false)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Time</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 h-12 px-3 rounded-xl bg-background border border-input w-full text-left">
                            <Clock className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm">{returnTime}</span>
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-0" align="start">
                          <div className="max-h-60 overflow-y-auto">
                            {timeOptions.map((time) => (
                              <button
                                key={time}
                                onClick={() => setReturnTime(time)}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-secondary"
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                {/* Passengers */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Passengers</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-2 h-12 px-4 rounded-xl bg-background border border-input w-full text-left">
                        <Users className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{passengers} passenger{passengers !== 1 ? 's' : ''}</span>
                        <ChevronDown className="h-4 w-4 ml-auto" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-0" align="start">
                      <div className="max-h-60 overflow-y-auto">
                        {passengerOptions.map((num) => (
                          <button
                            key={num}
                            onClick={() => setPassengers(num)}
                            className={cn(
                              "w-full px-3 py-2 text-sm text-left hover:bg-secondary",
                              passengers === num && "bg-secondary"
                            )}
                          >
                            {num} passenger{num !== 1 ? 's' : ''}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Search Button */}
                <Button 
                  size="lg" 
                  className="h-12 rounded-xl bg-primary hover:bg-primary/90 mt-auto"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-3 text-center">How It Works</h2>
            <p className="text-muted-foreground text-center mb-12">Simple steps to book your airport transfer</p>

            <div className="max-w-5xl mx-auto">
              <div className="grid gap-6 md:grid-cols-5">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="relative text-center">
                      {/* Connector line */}
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                      )}
                      
                      <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/airport-taxi.jpg"
                  alt="Professional airport taxi service"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Airport Taxi Service?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Fixed Prices</h4>
                      <p className="text-sm text-muted-foreground">No hidden fees, no surge pricing. Pay what you see.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Flight Tracking</h4>
                      <p className="text-sm text-muted-foreground">We monitor your flight and adjust pickup time automatically.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Professional Drivers</h4>
                      <p className="text-sm text-muted-foreground">Licensed, insured, and background-checked drivers.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">24/7 Customer Support</h4>
                      <p className="text-sm text-muted-foreground">Our team is available around the clock to assist you.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
