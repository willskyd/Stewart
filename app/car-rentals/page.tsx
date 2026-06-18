"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { 
  CalendarIcon, 
  MapPin, 
  Search, 
  Clock,
  Car,
  ChevronDown,
  Users,
  Fuel,
  Settings2
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { useServiceCatalog } from "@/hooks/use-service-catalog"
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
import { BookingButton } from "@/components/booking-button"
import { buildQueryString } from "@/lib/search-utils"

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return [`${hour}:00`, `${hour}:30`]
}).flat()

const rentalDurations = [
  { value: "1", label: "1 day" },
  { value: "2", label: "2 days" },
  { value: "3", label: "3 days" },
  { value: "5", label: "5 days" },
  { value: "7", label: "1 week" },
  { value: "14", label: "2 weeks" },
  { value: "30", label: "1 month" },
]

const faqs = [
  {
    question: "What documents do I need to rent a car?",
    answer: "You'll need a valid driver's license, a credit card in your name, and a valid ID or passport. International renters may also need an International Driving Permit (IDP) depending on their country of origin."
  },
  {
    question: "Is insurance included in the rental price?",
    answer: "Basic insurance is included in all our rentals. However, we recommend upgrading to our comprehensive coverage for complete peace of mind. This covers damage, theft, and third-party liability."
  },
  {
    question: "Can I return the car to a different location?",
    answer: "Yes, one-way rentals are available for most vehicles. Additional fees may apply depending on the pick-up and drop-off locations. Check the 'Drop car off at different location' option when booking."
  },
  {
    question: "What is your fuel policy?",
    answer: "We operate a 'full-to-full' fuel policy. You'll receive the car with a full tank and should return it with a full tank. If you return it with less fuel, a refueling charge will apply."
  },
  {
    question: "Is there an age limit for renting a car?",
    answer: "The minimum age to rent a car is 21 years old. Drivers under 25 may be subject to a young driver surcharge. Some luxury and high-performance vehicles have a minimum age requirement of 25."
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Yes, you can cancel or modify your booking up to 48 hours before the pick-up time for a full refund. Cancellations within 48 hours may incur a fee. Modifications are subject to availability."
  },
]

export default function CarRentalsPage() {
  const router = useRouter()
  const { carRentals: cars } = useServiceCatalog()
  const [pickupLocation, setPickupLocation] = React.useState("")
  const [dropoffLocation, setDropoffLocation] = React.useState("")
  const [pickupDate, setPickupDate] = React.useState<Date>()
  const [dropoffDate, setDropoffDate] = React.useState<Date>()
  const [pickupTime, setPickupTime] = React.useState("10:00")
  const [dropoffTime, setDropoffTime] = React.useState("10:00")
  const [differentLocation, setDifferentLocation] = React.useState(false)
  const [driverAge, setDriverAge] = React.useState(true)

  const handleSearch = () => {
    if (!pickupLocation.trim()) {
      alert("Please enter a pickup location")
      return
    }
    router.push(
      `/search${buildQueryString({
        service: "car-rentals",
        destination: pickupLocation,
        pickupDate: pickupDate?.toISOString().slice(0, 10),
        dropoffDate: dropoffDate?.toISOString().slice(0, 10),
      })}`
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Car Rentals</h1>
              <p className="text-muted-foreground text-lg">Great cars at great prices from the biggest rental companies</p>
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
                      placeholder="City, airport, or address"
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
                      placeholder={differentLocation ? "City, airport, or address" : "Same as pick-up"}
                      value={differentLocation ? dropoffLocation : pickupLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      disabled={!differentLocation}
                      className="bg-transparent border-0 outline-none text-sm w-full disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Pick-up Date & Time */}
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
                        <Calendar
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

                {/* Drop-off Date & Time */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Drop-off Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 h-12 px-3 rounded-xl bg-background border border-input w-full text-left">
                          <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm truncate">
                            {dropoffDate ? format(dropoffDate, "MMM d") : "Date"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dropoffDate}
                          onSelect={setDropoffDate}
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
                          <span className="text-sm">{dropoffTime}</span>
                          <ChevronDown className="h-4 w-4 ml-auto" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32 p-0" align="start">
                        <div className="max-h-60 overflow-y-auto">
                          {timeOptions.map((time) => (
                            <button
                              key={time}
                              onClick={() => setDropoffTime(time)}
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

                {/* Search Button */}
                <Button 
                  size="lg" 
                  className="h-12 rounded-xl bg-primary hover:bg-primary/90 md:col-span-2 lg:col-span-1 mt-auto"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox 
                    checked={differentLocation}
                    onCheckedChange={(checked) => setDifferentLocation(checked as boolean)}
                  />
                  Drop car off at different location
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox 
                    checked={driverAge}
                    onCheckedChange={(checked) => setDriverAge(checked as boolean)}
                  />
                  Driver aged 30 - 65?
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Available Cars */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8">Available Cars</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cars.map((car) => (
                <div key={car.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <Link href={`/car-rentals/${car.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium">
                          {car.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/car-rentals/${car.id}`} className="block">
                      <h3 className="font-semibold text-foreground mb-2">{car.name}</h3>
                    </Link>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {car.seats}
                      </span>
                      <span className="flex items-center gap-1">
                        <Settings2 className="h-4 w-4" />
                        {car.transmission}
                      </span>
                      <span className="flex items-center gap-1">
                        <Fuel className="h-4 w-4" />
                        {car.fuel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div>
                        <span className="text-lg font-bold text-foreground">₦{car.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground"> /day</span>
                      </div>
                      <BookingButton
                        kind="car-rental"
                        itemId={car.id}
                        title={car.name}
                        subtitle={car.category}
                        image={car.image}
                        price={car.price}
                        href={`/car-rentals/${car.id}`}
                        size="sm"
                        className="rounded-full"
                      >
                        Book now
                      </BookingButton>
                    </div>
                  </div>
                </div>
              ))}
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
