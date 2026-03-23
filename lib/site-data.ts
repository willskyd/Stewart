import { slugify } from "@/lib/search-utils"

export type PropertyCategory = "hotel" | "apartment" | "villa" | "resort"
export type BookingKind = "stay" | "attraction" | "flight" | "car-rental" | "airport-taxi"
export type BookingStatus = "pending" | "approved" | "cancelled" | "completed"

export interface PropertyRecord {
  id: string
  title: string
  type: string
  category: PropertyCategory
  location: string
  city: string
  country: string
  distance: string
  rating: number
  reviews: number
  price: number
  image: string
  gallery: string[]
  summary: string
  description: string
  isFivestar?: boolean
  guests: number
  bedrooms: number
  baths: number
  amenities: string[]
  highlights: string[]
  policyNotes: string[]
}

export interface AttractionRecord {
  id: string
  name: string
  slug: string
  location: string
  city: string
  country: string
  image: string
  gallery: string[]
  rating: number
  reviews: number
  price: number
  duration: string
  summary: string
  description: string
  includes: string[]
  highlights: string[]
}

export interface FlightOffer {
  id: string
  from: string
  to: string
  airline: string
  duration: string
  stops: string
  departure: string
  arrival: string
  price: number
}

export interface CarRentalRecord {
  id: string
  name: string
  slug: string
  category: string
  image: string
  seats: number
  transmission: string
  fuel: string
  price: number
  location: string
  summary: string
  features: string[]
}

export interface TaxiOffer {
  id: string
  route: string
  pickup: string
  destination: string
  vehicle: string
  passengers: number
  price: number
  arrivalWindow: string
}

export interface HelpArticle {
  slug: string
  title: string
  summary: string
  body: string[]
}

export interface HelpCategory {
  slug: string
  title: string
  description: string
  articles: number
  heroSummary: string
  topics: HelpArticle[]
  faqs: Array<{ question: string; answer: string }>
}

export interface SupportCategoryPage {
  slug: string
  title: string
  description: string
  responseTime: string
  overview: string
  sections: string[]
  nextSteps: string[]
}

export interface CareerPosition {
  slug: string
  title: string
  department: string
  location: string
  type: string
  remote: boolean
  summary: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
}

export interface GenericContentPage {
  title: string
  eyebrow: string
  summary: string
  sections: Array<{ title: string; body: string }>
}

export interface DemoBooking {
  id: string
  kind: BookingKind
  itemId: string
  title: string
  subtitle: string
  image: string
  price: number
  status: BookingStatus
  customerName: string
  customerEmail: string
  startDate: string
  endDate: string
  createdAt: string
  href: string
}

export interface DemoSupportTicket {
  id: string
  name: string
  email: string
  category: string
  bookingRef: string
  message: string
  status: "new" | "in-progress" | "resolved"
  createdAt: string
}

export const properties: PropertyRecord[] = [
  {
    id: "1",
    title: "Luxury Marina Suite",
    type: "Apartment",
    category: "apartment",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "2.5 km from the city center",
    rating: 4.8,
    reviews: 245,
    price: 85000,
    image: "/images/apartment-1.jpg",
    gallery: ["/images/apartment-1.jpg", "/images/apartment-2.jpg", "/images/hotel-1.jpg"],
    summary: "Waterfront luxury with fast city access and premium concierge service.",
    description:
      "A polished marina apartment designed for business and leisure travelers who want privacy, modern comfort, and immediate access to Lagos nightlife and meeting hubs.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Ocean-view balcony", "Airport transfer", "High-speed Wi-Fi", "Breakfast included"],
    highlights: ["24/7 concierge", "Private check-in", "Business lounge access"],
    policyNotes: ["Free cancellation up to 48 hours before check-in", "Check-in from 2:00 PM", "No smoking"],
  },
  {
    id: "2",
    title: "Ocean View Resort & Spa",
    type: "Resort",
    category: "resort",
    location: "Lekki Peninsula, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "8.2 km from the beach club district",
    rating: 4.9,
    reviews: 512,
    price: 150000,
    image: "/images/resort-1.jpg",
    gallery: ["/images/resort-1.jpg", "/images/resort-2.jpg", "/images/villa-1.jpg"],
    summary: "A full-service coastal resort built for long weekends and family escapes.",
    description:
      "This resort combines spa treatments, curated dining, and panoramic ocean views with a calm, polished arrival experience from check-in to departure.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Spa access", "Infinity pool", "Private beach club", "Family suites"],
    highlights: ["Chef-led tasting menu", "Kids club", "Lagoon sunset deck"],
    policyNotes: ["Breakfast included", "Flexible rescheduling available", "Children welcome"],
  },
  {
    id: "3",
    title: "Modern Downtown Loft",
    type: "Apartment",
    category: "apartment",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "1.8 km from business district",
    rating: 4.7,
    reviews: 189,
    price: 65000,
    image: "/images/apartment-2.jpg",
    gallery: ["/images/apartment-2.jpg", "/images/apartment-3.jpg", "/images/lagos.jpg"],
    summary: "A design-forward loft for professionals who want comfort without losing pace.",
    description:
      "Compact, warm, and efficiently planned, this Ikoyi stay is ideal for short urban trips, remote work, and guests who value clean design and dependable service.",
    guests: 3,
    bedrooms: 1,
    baths: 1,
    amenities: ["Workspace", "Smart TV", "Self check-in", "Weekly cleaning"],
    highlights: ["Walkable dining district", "Quiet residential street", "Flexible late checkout"],
    policyNotes: ["No parties", "Security deposit required", "Check-out by 11:00 AM"],
  },
  {
    id: "4",
    title: "Beachfront Villa Paradise",
    type: "Villa",
    category: "villa",
    location: "Eko Atlantic, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "5.5 km from central Victoria Island",
    rating: 4.9,
    reviews: 324,
    price: 250000,
    image: "/images/villa-1.jpg",
    gallery: ["/images/villa-1.jpg", "/images/resort-1.jpg", "/images/resort-2.jpg"],
    summary: "Private luxury villa with event-ready outdoor spaces and premium hosting.",
    description:
      "Designed for celebratory travel, executive hosting, and extended group stays, this villa balances privacy with resort-like service and attentive operations.",
    guests: 8,
    bedrooms: 4,
    baths: 5,
    amenities: ["Private pool", "Chef on request", "Cinema room", "Security team"],
    highlights: ["Ocean-facing terrace", "Dedicated host", "Luxury transfer options"],
    policyNotes: ["Event approval required", "Quiet hours after 11:00 PM", "ID verification on arrival"],
  },
  {
    id: "5",
    title: "Grand Imperial Hotel",
    type: "Hotel",
    category: "hotel",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "3.1 km from the conference center",
    rating: 4.6,
    reviews: 876,
    price: 120000,
    image: "/images/hotel-1.jpg",
    gallery: ["/images/hotel-1.jpg", "/images/apartment-1.jpg", "/images/resort-1.jpg"],
    summary: "Reliable premium hotel with strong dining, conference, and concierge operations.",
    description:
      "A dependable flagship hotel suited for business guests, conferences, and short city stays where service consistency matters as much as comfort.",
    guests: 2,
    bedrooms: 1,
    baths: 1,
    amenities: ["Executive lounge", "Conference rooms", "Breakfast buffet", "Gym"],
    highlights: ["Professional meeting support", "24/7 room service", "Premium lounge floor"],
    policyNotes: ["Pay at property available", "Free cancellation on selected rates", "Pet-free hotel"],
  },
  {
    id: "6",
    title: "Cozy City Apartment",
    type: "Apartment",
    category: "apartment",
    location: "Yaba, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "4.2 km from tech hub",
    rating: 4.5,
    reviews: 156,
    price: 45000,
    image: "/images/apartment-3.jpg",
    gallery: ["/images/apartment-3.jpg", "/images/apartment-2.jpg", "/images/lagos.jpg"],
    summary: "Smart, compact, and affordable base for practical city travel.",
    description:
      "A straightforward apartment with reliable essentials, quick ride-hailing access, and a calm residential environment suited for solo travelers and couples.",
    guests: 2,
    bedrooms: 1,
    baths: 1,
    amenities: ["Fast Wi-Fi", "Kitchenette", "Laundry access", "Neighborhood security"],
    highlights: ["Value-focused", "Strong transit links", "Easy self-service arrival"],
    policyNotes: ["Advance payment required", "No smoking", "Short stays welcome"],
  },
  {
    id: "7",
    title: "Tropical Island Resort",
    type: "Resort",
    category: "resort",
    location: "Badagry Beach, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "45 km from downtown Lagos",
    rating: 4.8,
    reviews: 298,
    price: 180000,
    image: "/images/resort-2.jpg",
    gallery: ["/images/resort-2.jpg", "/images/resort-1.jpg", "/images/lagos.jpg"],
    summary: "An escape-driven resort for weekend retreats, wellness, and private celebrations.",
    description:
      "Set away from the city rush, this property offers larger rooms, layered hospitality, and a calm shoreline atmosphere suited to restorative getaways.",
    guests: 4,
    bedrooms: 1,
    baths: 1,
    amenities: ["Beach access", "Boat tours", "Spa packages", "Family dining"],
    highlights: ["Sunrise yoga", "Lagoon experiences", "Premium cabanas"],
    policyNotes: ["Weekend minimum stay may apply", "Prepaid rates available", "Children under 12 stay free on selected rooms"],
  },
  {
    id: "fs-1",
    title: "The Ritz-Carlton Lagos",
    type: "5 Star Hotel",
    category: "hotel",
    location: "Eko Atlantic, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "5.5 km from downtown luxury retail",
    rating: 4.9,
    reviews: 1245,
    price: 450000,
    image: "/images/hotel-1.jpg",
    gallery: ["/images/hotel-1.jpg", "/images/resort-1.jpg", "/images/apartment-1.jpg"],
    summary: "An elite waterfront address with discreet service and premium dining.",
    description:
      "One of the city’s most polished hospitality experiences, tailored to guests who expect premium arrival service, refined suites, and exceptional on-site dining.",
    isFivestar: true,
    guests: 2,
    bedrooms: 1,
    baths: 1,
    amenities: ["Club lounge", "Signature spa", "Valet service", "Private airport greeting"],
    highlights: ["Skyline-view suites", "Michelin-style dining concept", "Executive arrival corridor"],
    policyNotes: ["Advance reservation recommended", "Luxury transfer on request", "Dress code for selected venues"],
  },
  {
    id: "fs-2",
    title: "Four Seasons Resort & Spa",
    type: "5 Star Resort",
    category: "resort",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "2.8 km from the financial corridor",
    rating: 4.9,
    reviews: 892,
    price: 380000,
    image: "/images/resort-1.jpg",
    gallery: ["/images/resort-1.jpg", "/images/resort-2.jpg", "/images/hotel-1.jpg"],
    summary: "A polished urban resort delivering quiet luxury in the heart of the city.",
    description:
      "A resort-level experience with wellness, dining, and private meeting spaces carefully integrated for high-value leisure and executive travel.",
    isFivestar: true,
    guests: 3,
    bedrooms: 1,
    baths: 1,
    amenities: ["Butler service", "Wellness spa", "Garden lounge", "Chef-led brunch"],
    highlights: ["Private cabanas", "Premium family suites", "Business event hosting"],
    policyNotes: ["Complimentary breakfast on selected rates", "Flexible luxury policies", "Late checkout subject to availability"],
  },
  {
    id: "fs-3",
    title: "Presidential Villa Ikoyi",
    type: "5 Star Villa",
    category: "villa",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "3.2 km from diplomatic district",
    rating: 5,
    reviews: 156,
    price: 750000,
    image: "/images/villa-1.jpg",
    gallery: ["/images/villa-1.jpg", "/images/apartment-1.jpg", "/images/resort-2.jpg"],
    summary: "Ultra-premium private accommodation for executive travel and hosted stays.",
    description:
      "Large-format, fully serviced, and discreetly operated, this villa is built for guests who need security, privacy, and high-touch hospitality.",
    isFivestar: true,
    guests: 10,
    bedrooms: 5,
    baths: 6,
    amenities: ["Private chef", "Security detail", "Driver lounge", "Event-ready dining hall"],
    highlights: ["Diplomatic-grade privacy", "Boardroom suite", "Premium outdoor entertaining"],
    policyNotes: ["Security screening required", "No unapproved events", "Damage deposit applies"],
  },
  {
    id: "fs-4",
    title: "Eko Hotel & Suites",
    type: "5 Star Hotel",
    category: "hotel",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "2.1 km from the waterfront strip",
    rating: 4.8,
    reviews: 2341,
    price: 280000,
    image: "/images/apartment-1.jpg",
    gallery: ["/images/apartment-1.jpg", "/images/hotel-1.jpg", "/images/resort-1.jpg"],
    summary: "A trusted five-star option known for scale, event hosting, and premium rooms.",
    description:
      "A high-capacity luxury hotel that performs especially well for conferences, large groups, and travelers who want immediate access to premium city destinations.",
    isFivestar: true,
    guests: 2,
    bedrooms: 1,
    baths: 1,
    amenities: ["Multiple restaurants", "Conference venue", "Pool deck", "VIP arrival service"],
    highlights: ["Large event support", "Reliable premium standards", "Waterfront proximity"],
    policyNotes: ["Conference season rates vary", "Breakfast on selected plans", "ID required at check-in"],
  },
  {
    id: "fs-5",
    title: "Intercontinental Lagos",
    type: "5 Star Hotel",
    category: "hotel",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    country: "Nigeria",
    distance: "2.5 km from premium shopping",
    rating: 4.9,
    reviews: 1567,
    price: 320000,
    image: "/images/resort-2.jpg",
    gallery: ["/images/resort-2.jpg", "/images/hotel-1.jpg", "/images/apartment-2.jpg"],
    summary: "High-floor city luxury with dependable executive service and refined guest flow.",
    description:
      "A polished premium tower with strong business amenities, elevated dining, and a consistent experience for high-frequency travelers.",
    isFivestar: true,
    guests: 2,
    bedrooms: 1,
    baths: 1,
    amenities: ["Executive suites", "Rooftop lounge", "Airport concierge", "Spa treatments"],
    highlights: ["Skyline city views", "Fast check-in team", "Strong corporate travel fit"],
    policyNotes: ["Corporate billing available", "Check-in from 3:00 PM", "No smoking rooms only"],
  },
]

export const featuredPropertyIds = ["1", "2", "3", "4", "5", "6", "7"]
export const luxuryPropertyIds = ["fs-1", "fs-2", "fs-3", "fs-4", "fs-5"]

export const propertyTypes = [
  { type: "Hotels", count: "1,245", image: "/images/hotel-1.jpg", href: "/search?service=stays&type=hotel" },
  { type: "Apartments", count: "3,892", image: "/images/apartment-1.jpg", href: "/search?service=stays&type=apartment" },
  { type: "Villas", count: "756", image: "/images/villa-1.jpg", href: "/search?service=stays&type=villa" },
  { type: "Resorts", count: "412", image: "/images/resort-1.jpg", href: "/search?service=stays&type=resort" },
]

export const trendingDestinations = [
  { name: "Lagos", country: "Nigeria", image: "/images/lagos.jpg", properties: 2345, size: "large" },
  { name: "London", country: "United Kingdom", image: "/images/london.jpg", properties: 8721, size: "medium" },
  { name: "Paris", country: "France", image: "/images/paris.jpg", properties: 6543, size: "medium" },
  { name: "Dubai", country: "UAE", image: "/images/dubai.jpg", properties: 4521, size: "small" },
  { name: "Tokyo", country: "Japan", image: "/images/tokyo.jpg", properties: 5678, size: "small" },
  { name: "New York", country: "USA", image: "/images/newyork.jpg", properties: 9876, size: "large" },
]

export const exploreLocations = [
  { name: "Santorini", country: "Greece", properties: 892, image: "/images/villa-1.jpg" },
  { name: "Bali", country: "Indonesia", properties: 2341, image: "/images/resort-1.jpg" },
  { name: "Maldives", country: "Indian Ocean", properties: 456, image: "/images/resort-2.jpg" },
  { name: "Barcelona", country: "Spain", properties: 3456, image: "/images/apartment-2.jpg" },
  { name: "Rome", country: "Italy", properties: 4521, image: "/images/attraction-1.jpg" },
  { name: "Amsterdam", country: "Netherlands", properties: 2789, image: "/images/apartment-3.jpg" },
  { name: "Sydney", country: "Australia", properties: 1876, image: "/images/hotel-1.jpg" },
  { name: "Cape Town", country: "South Africa", properties: 1234, image: "/images/villa-1.jpg" },
]

export const tripPlannerVibes = [
  {
    id: "historical",
    label: "Historical Tours",
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
    destinations: [
      { name: "Bali Spa", image: "/images/resort-1.jpg" },
      { name: "Maldives", image: "/images/resort-2.jpg" },
      { name: "Thailand", image: "/images/villa-1.jpg" },
      { name: "Santorini", image: "/images/apartment-2.jpg" },
    ],
  },
]

export const attractions: AttractionRecord[] = [
  {
    id: "1",
    slug: "colosseum-tour",
    name: "Colosseum Tour",
    location: "Rome, Italy",
    city: "Rome",
    country: "Italy",
    image: "/images/attraction-1.jpg",
    gallery: ["/images/attraction-1.jpg", "/images/paris.jpg", "/images/london.jpg"],
    rating: 4.9,
    reviews: 12453,
    price: 45000,
    duration: "3 hours",
    summary: "Priority-entry historical experience led by specialist guides.",
    description:
      "A well-paced guided experience through one of Europe’s most recognizable landmarks, structured to balance storytelling, movement, and premium access.",
    includes: ["Priority entry", "Professional guide", "Audio support", "Small group format"],
    highlights: ["Arena-level access", "Roman history briefing", "Premium morning slots"],
  },
  {
    id: "2",
    slug: "eiffel-tower-experience",
    name: "Eiffel Tower Experience",
    location: "Paris, France",
    city: "Paris",
    country: "France",
    image: "/images/attraction-2.jpg",
    gallery: ["/images/attraction-2.jpg", "/images/paris.jpg", "/images/newyork.jpg"],
    rating: 4.8,
    reviews: 23567,
    price: 35000,
    duration: "2 hours",
    summary: "A polished Paris highlight with timed access and skyline views.",
    description:
      "Ideal for first-time visitors and premium city-break travelers who want a dependable itinerary, quick entry, and a professionally managed attraction flow.",
    includes: ["Timed admission", "Host assistance", "Observation access", "Flexible e-ticket"],
    highlights: ["City panorama", "Prime photo stops", "Fast-track coordination"],
  },
  {
    id: "3",
    slug: "machu-picchu-trek",
    name: "Machu Picchu Trek",
    location: "Cusco, Peru",
    city: "Cusco",
    country: "Peru",
    image: "/images/attraction-3.jpg",
    gallery: ["/images/attraction-3.jpg", "/images/resort-2.jpg", "/images/villa-1.jpg"],
    rating: 4.9,
    reviews: 8934,
    price: 150000,
    duration: "Full day",
    summary: "High-impact guided adventure designed for serious explorers.",
    description:
      "A premium full-day excursion for travelers who want a structured trek, strong logistics, and knowledgeable guidance across one of South America’s most iconic sites.",
    includes: ["Transfers", "Guide", "Entry pass", "Snack package"],
    highlights: ["Curated trekking route", "Photographer-friendly stops", "High-support logistics"],
  },
  {
    id: "4",
    slug: "great-wall-adventure",
    name: "Great Wall Adventure",
    location: "Beijing, China",
    city: "Beijing",
    country: "China",
    image: "/images/attraction-4.jpg",
    gallery: ["/images/attraction-4.jpg", "/images/tokyo.jpg", "/images/dubai.jpg"],
    rating: 4.7,
    reviews: 15678,
    price: 55000,
    duration: "6 hours",
    summary: "A scenic guided route with transport and premium timing.",
    description:
      "Built for travelers who want a full but manageable day trip with clear coordination, cultural insight, and strong route planning from Beijing.",
    includes: ["Hotel pickup", "Transport", "Guide", "Bottled water"],
    highlights: ["Less crowded sections", "Expert commentary", "Comfortable transfers"],
  },
  {
    id: "5",
    slug: "taj-mahal-sunrise-tour",
    name: "Taj Mahal Sunrise Tour",
    location: "Agra, India",
    city: "Agra",
    country: "India",
    image: "/images/attraction-5.jpg",
    gallery: ["/images/attraction-5.jpg", "/images/resort-1.jpg", "/images/apartment-2.jpg"],
    rating: 4.9,
    reviews: 19234,
    price: 28000,
    duration: "4 hours",
    summary: "A sunrise-first itinerary with strong timing and guide support.",
    description:
      "This experience focuses on smooth access, premium viewing windows, and guided storytelling that makes the early start worthwhile.",
    includes: ["Sunrise entry", "Professional guide", "Round-trip transport", "Bottled water"],
    highlights: ["Golden-hour photography", "Efficient timing", "Trusted guide team"],
  },
  {
    id: "6",
    slug: "sydney-opera-house-tour",
    name: "Sydney Opera House",
    location: "Sydney, Australia",
    city: "Sydney",
    country: "Australia",
    image: "/images/attraction-6.jpg",
    gallery: ["/images/attraction-6.jpg", "/images/hotel-1.jpg", "/images/resort-1.jpg"],
    rating: 4.8,
    reviews: 11234,
    price: 42000,
    duration: "2 hours",
    summary: "A premium architecture and culture experience in Sydney’s waterfront core.",
    description:
      "An expertly paced visit that blends iconic views, insider architecture notes, and a premium guest path through one of Australia’s defining landmarks.",
    includes: ["Entry access", "Hosted tour", "Headset audio", "Photo opportunities"],
    highlights: ["Harbour views", "Architecture storytelling", "Flexible daytime slots"],
  },
]

export const attractionRegions = [
  { id: "all", label: "All Destinations" },
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia" },
  { id: "africa", label: "Africa" },
  { id: "americas", label: "Americas" },
  { id: "oceania", label: "Oceania" },
]

export const moreAttractionDestinations = {
  europe: [
    { name: "London", image: "/images/london.jpg", attractions: 234 },
    { name: "Paris", image: "/images/paris.jpg", attractions: 312 },
    { name: "Rome", image: "/images/attraction-1.jpg", attractions: 189 },
  ],
  asia: [
    { name: "Tokyo", image: "/images/tokyo.jpg", attractions: 456 },
    { name: "Dubai", image: "/images/dubai.jpg", attractions: 278 },
    { name: "Singapore", image: "/images/resort-1.jpg", attractions: 167 },
  ],
  africa: [
    { name: "Lagos", image: "/images/lagos.jpg", attractions: 89 },
    { name: "Cape Town", image: "/images/villa-1.jpg", attractions: 134 },
    { name: "Marrakech", image: "/images/hotel-1.jpg", attractions: 112 },
  ],
  americas: [
    { name: "New York", image: "/images/newyork.jpg", attractions: 567 },
    { name: "Machu Picchu", image: "/images/attraction-3.jpg", attractions: 45 },
    { name: "Rio de Janeiro", image: "/images/resort-2.jpg", attractions: 198 },
  ],
  oceania: [
    { name: "Sydney", image: "/images/attraction-6.jpg", attractions: 234 },
    { name: "Bali", image: "/images/resort-1.jpg", attractions: 187 },
    { name: "Auckland", image: "/images/villa-1.jpg", attractions: 98 },
  ],
}

export const flightOffers: FlightOffer[] = [
  { id: "flt-1", from: "Lagos", to: "London", airline: "British Airways", duration: "6h 35m", stops: "Direct", departure: "09:10", arrival: "15:45", price: 850000 },
  { id: "flt-2", from: "Lagos", to: "Dubai", airline: "Emirates", duration: "7h 15m", stops: "Direct", departure: "13:25", arrival: "23:40", price: 650000 },
  { id: "flt-3", from: "Lagos", to: "New York", airline: "Delta", duration: "14h 10m", stops: "1 stop", departure: "22:00", arrival: "08:10", price: 1200000 },
  { id: "flt-4", from: "Abuja", to: "London", airline: "Virgin Atlantic", duration: "7h 05m", stops: "Direct", departure: "08:20", arrival: "14:25", price: 820000 },
  { id: "flt-5", from: "Lagos", to: "Paris", airline: "Air France", duration: "6h 55m", stops: "Direct", departure: "21:45", arrival: "05:40", price: 780000 },
  { id: "flt-6", from: "Lagos", to: "Johannesburg", airline: "South African Airways", duration: "5h 50m", stops: "Direct", departure: "12:05", arrival: "18:55", price: 450000 },
]

export const carRentals: CarRentalRecord[] = [
  {
    id: "1",
    slug: "toyota-camry",
    name: "Toyota Camry",
    category: "Sedan",
    image: "/images/car-rental.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 25000,
    location: "Lagos Airport",
    summary: "Reliable city sedan with efficient running cost and comfortable rear seating.",
    features: ["Unlimited mileage", "Air conditioning", "Airport pickup", "24/7 roadside support"],
  },
  {
    id: "2",
    slug: "mercedes-benz-e-class",
    name: "Mercedes-Benz E-Class",
    category: "Luxury",
    image: "/images/car-rental.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 75000,
    location: "Victoria Island, Lagos",
    summary: "Executive-grade comfort for premium airport, hotel, and meeting transfers.",
    features: ["Premium interior", "Chauffeur option", "Priority support", "Flexible pickup"],
  },
  {
    id: "3",
    slug: "toyota-land-cruiser",
    name: "Toyota Land Cruiser",
    category: "SUV",
    image: "/images/car-rental.jpg",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    price: 85000,
    location: "Lekki, Lagos",
    summary: "High-capacity SUV built for groups, luggage, and rougher road conditions.",
    features: ["Large luggage space", "GPS navigation", "Family friendly", "Hotel delivery"],
  },
  {
    id: "4",
    slug: "honda-cr-v",
    name: "Honda CR-V",
    category: "SUV",
    image: "/images/car-rental.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    price: 45000,
    location: "Abuja Central",
    summary: "Balanced SUV option for practical city trips and intercity drives.",
    features: ["Fuel efficient", "Flexible return", "Bluetooth audio", "Roadside assistance"],
  },
]

export const taxiOffers: TaxiOffer[] = [
  { id: "tx-1", route: "Murtala Muhammed Airport to Victoria Island", pickup: "LOS Airport", destination: "Victoria Island", vehicle: "Executive Sedan", passengers: 3, price: 35000, arrivalWindow: "Meet and greet included" },
  { id: "tx-2", route: "Murtala Muhammed Airport to Lekki", pickup: "LOS Airport", destination: "Lekki Phase 1", vehicle: "SUV", passengers: 5, price: 48000, arrivalWindow: "Up to 60 minutes free wait time" },
  { id: "tx-3", route: "Heathrow Airport to Central London", pickup: "LHR Airport", destination: "Westminster", vehicle: "Executive Sedan", passengers: 3, price: 82000, arrivalWindow: "Flight tracking enabled" },
  { id: "tx-4", route: "Dubai International to Downtown Dubai", pickup: "DXB Airport", destination: "Downtown Dubai", vehicle: "Premium SUV", passengers: 5, price: 65000, arrivalWindow: "Premium arrival coordination" },
]

export const helpCategories: HelpCategory[] = [
  {
    slug: "accommodations",
    title: "Accommodations",
    description: "Hotels, apartments, and vacation rentals",
    articles: 45,
    heroSummary: "Guidance for booking stays, contacting hosts, managing arrival details, and handling changes before or during a trip.",
    topics: [
      {
        slug: "how-to-book-a-property",
        title: "How to book a property",
        summary: "Learn the fastest and safest way to complete a stay booking on Stewart.",
        body: [
          "Search for a destination or property type, review photos and amenities, then confirm guest counts and travel dates before you pay.",
          "Read the cancellation window, check-in policy, and room notes carefully. This is where most avoidable booking mistakes happen.",
          "After booking, keep your confirmation reference handy so support and admin can identify the reservation quickly.",
        ],
      },
      {
        slug: "cancellation-policies",
        title: "Cancellation policies",
        summary: "Understand which rates are flexible, partially refundable, or fixed.",
        body: [
          "Each stay shows its cancellation policy before checkout and again inside the booking details page.",
          "Flexible plans usually allow cancellation up to a stated deadline, while promo rates may be non-refundable.",
          "If your travel plan changes, cancel or modify as early as possible to keep the highest refund eligibility.",
        ],
      },
      {
        slug: "check-in-and-check-out",
        title: "Check-in and check-out",
        summary: "What to expect before arrival and when leaving the property.",
        body: [
          "Most stays provide standard arrival and departure windows in the listing details.",
          "If you need early check-in or late checkout, request it immediately after booking so the property can confirm operational availability.",
          "Carry a valid ID and your booking reference for smoother arrival processing.",
        ],
      },
      {
        slug: "contacting-your-host",
        title: "Contacting your host",
        summary: "Best practices for messaging a property team or host professionally.",
        body: [
          "Use your booking reference in the first message so the host can locate your reservation quickly.",
          "Ask direct questions around access, amenities, parking, or airport transfer before arrival day.",
          "If response quality drops or the issue is urgent, use Stewart support so the record stays traceable.",
        ],
      },
      {
        slug: "room-types-explained",
        title: "Room types explained",
        summary: "A clear breakdown of what common room labels usually mean.",
        body: [
          "Standard rooms are the base product, while deluxe and premium labels usually indicate more space, views, or added inclusions.",
          "Suites generally include a defined lounge or work area, and villas or apartments offer more privacy and self-service living space.",
          "Always compare square footage, bed setup, bathroom layout, and included services before deciding.",
        ],
      },
    ],
    faqs: [
      { question: "Can I change the guest name after booking?", answer: "Yes, in most cases support can help update the guest name before arrival if the property policy allows it." },
      { question: "Do all stays include breakfast?", answer: "No. Breakfast availability is shown in the rate details before you pay." },
    ],
  },
  {
    slug: "flights",
    title: "Flights",
    description: "Flight bookings and airport services",
    articles: 32,
    heroSummary: "Support for route search, baggage questions, schedule changes, airport transfers, and refund timing.",
    topics: [
      {
        slug: "booking-flights",
        title: "Booking flights",
        summary: "How to compare routes and choose the best flight for your trip.",
        body: [
          "Search by departure city and destination, then review total travel time, stop count, and baggage rules before you pay.",
          "The cheapest option is not always the best option. Compare arrival time, airport location, and connection risk.",
          "Save your confirmation email and passenger spelling exactly as shown on the booking record.",
        ],
      },
      {
        slug: "baggage-allowance",
        title: "Baggage allowance",
        summary: "What to verify before you get to the airport.",
        body: [
          "Allowance depends on airline, cabin, and fare family. Confirm both checked baggage and cabin baggage rules.",
          "Special items, oversize baggage, and sports equipment often require separate approval.",
          "If baggage is important for your trip, choose a fare that makes the allowance explicit rather than assuming it is included.",
        ],
      },
      {
        slug: "flight-changes",
        title: "Flight changes",
        summary: "How modifications work and why timing matters.",
        body: [
          "Change fees and fare differences depend on the airline and ticket conditions.",
          "When possible, make the change before check-in opens. Your options are often better and faster at that stage.",
          "Support can help document schedule disruptions for refund or credit review.",
        ],
      },
      {
        slug: "refunds-and-credits",
        title: "Refunds and credits",
        summary: "What determines whether you receive a cash refund or travel credit.",
        body: [
          "Refundable fares usually return to the original payment method, while non-refundable fares may issue credit instead.",
          "Airline-led schedule changes can open refund rights even on restricted fares.",
          "Processing times depend on airline settlement and your card issuer.",
        ],
      },
      {
        slug: "airport-transfers",
        title: "Airport transfers",
        summary: "How to pair a flight with a reliable pickup.",
        body: [
          "Add an airport taxi when your arrival time is fixed and you want a smoother handoff after baggage claim.",
          "Always enter the correct flight number so the driver can track delays and terminal changes.",
          "Use the driver details and emergency contact only after checking your confirmation instructions.",
        ],
      },
    ],
    faqs: [
      { question: "Can I book a flight for someone else?", answer: "Yes, but the traveler name must match the passport or government ID exactly." },
      { question: "Why is my refund taking time?", answer: "Most delays happen between airline settlement and bank posting, not at the search stage." },
    ],
  },
  {
    slug: "car-rentals",
    title: "Car Rentals",
    description: "Vehicle rentals and driving",
    articles: 28,
    heroSummary: "Everything you need to know about age rules, insurance, fuel policy, pickup, and vehicle returns.",
    topics: [
      {
        slug: "renting-a-car",
        title: "Renting a car",
        summary: "What to check before you confirm a rental reservation.",
        body: [
          "Review pickup location, fuel type, mileage policy, and deposit terms before checkout.",
          "Bring your license, ID, and the payment method required by the rental provider.",
          "Inspect the vehicle at pickup and photograph existing marks before you drive away.",
        ],
      },
      {
        slug: "insurance-options",
        title: "Insurance options",
        summary: "Why insurance details matter more than the daily rate headline.",
        body: [
          "Base coverage often includes basic liability only, while premium protection reduces your financial exposure.",
          "Read the deductible, windshield coverage, tire coverage, and theft conditions closely.",
          "If you rely on card-based coverage, confirm the terms before arrival.",
        ],
      },
      {
        slug: "fuel-policies",
        title: "Fuel policies",
        summary: "How to avoid avoidable refueling fees.",
        body: [
          "Full-to-full is usually the most cost-effective policy for most travelers.",
          "If the provider expects a full tank on return, refuel nearby and keep the receipt.",
          "Prepaid fuel can be convenient, but it is not always the cheapest choice.",
        ],
      },
      {
        slug: "pick-up-and-drop-off",
        title: "Pick-up and drop-off",
        summary: "How to plan smoother collection and return windows.",
        body: [
          "Choose realistic pickup and return times that match your flight or meeting schedule.",
          "For one-way rentals, confirm the return location rules and fees before booking.",
          "Late return penalties can escalate quickly, so contact the provider if timing slips.",
        ],
      },
      {
        slug: "driver-requirements",
        title: "Driver requirements",
        summary: "Minimum age, document rules, and additional driver conditions.",
        body: [
          "Age limits vary by vehicle class and country. Premium vehicles often require older drivers.",
          "International renters may need an International Driving Permit depending on destination rules.",
          "Additional drivers should be registered formally to keep insurance valid.",
        ],
      },
    ],
    faqs: [
      { question: "Can I change my drop-off city?", answer: "Usually yes, but a one-way fee may apply depending on the operator and route." },
      { question: "Do I need a credit card?", answer: "Many providers still require one for the security hold even when the rental is prepaid." },
    ],
  },
  {
    slug: "payments-pricing",
    title: "Payments & Pricing",
    description: "Payment methods and billing",
    articles: 38,
    heroSummary: "Billing, deposits, refunds, price changes, and accepted payment methods across the Stewart platform.",
    topics: [
      {
        slug: "payment-methods",
        title: "Payment methods",
        summary: "Which payment routes are commonly accepted on Stewart.",
        body: [
          "Card payments are the fastest option, while some bookings also support pay-at-property or bank transfer settlement.",
          "Availability depends on the product type, supplier, and country involved.",
          "Always make sure your payment name matches your traveler profile where possible.",
        ],
      },
      {
        slug: "price-breakdown",
        title: "Price breakdown",
        summary: "How to read taxes, fees, and base rate clearly before checkout.",
        body: [
          "The total should show the base rate, taxes, service fees, and any extras selected during checkout.",
          "Local city taxes may only appear at the property depending on supplier rules.",
          "If something looks unclear, stop before payment and contact support with a screenshot.",
        ],
      },
      {
        slug: "deposits-and-holds",
        title: "Deposits and holds",
        summary: "Temporary holds versus actual charges.",
        body: [
          "Hotels and rental providers sometimes place a temporary hold to cover incidentals or security requirements.",
          "A hold is not always a final charge, but your bank may still reduce available balance until it is released.",
          "Release timing depends heavily on the payment provider and bank.",
        ],
      },
      {
        slug: "refund-process",
        title: "Refund process",
        summary: "What happens after a refund is approved.",
        body: [
          "Once approved, the refund usually moves through the supplier first and then to your payment method.",
          "Card refunds can take several business days depending on issuer processing.",
          "Keep the cancellation confirmation until the funds appear fully.",
        ],
      },
      {
        slug: "currency-conversion",
        title: "Currency conversion",
        summary: "How currencies appear on Stewart and what can change at settlement.",
        body: [
          "Displayed prices may be converted for convenience, but the final settlement currency can depend on supplier setup.",
          "Bank conversion rates can differ from platform display rates.",
          "If currency certainty matters, confirm the billed currency before you pay.",
        ],
      },
    ],
    faqs: [
      { question: "Why did my bank see a different total?", answer: "Exchange rate timing, card issuer fees, or supplier-side taxes can change the final posted amount." },
      { question: "Can I split payment?", answer: "That depends on the booking type and supplier policy." },
    ],
  },
  {
    slug: "security-privacy",
    title: "Security & Privacy",
    description: "Account security and data protection",
    articles: 22,
    heroSummary: "Best practices for protecting your account, spotting fraud, and handling privacy preferences responsibly.",
    topics: [
      {
        slug: "account-security",
        title: "Account security",
        summary: "The core steps that keep your Stewart account safe.",
        body: [
          "Use a unique password and avoid reusing credentials from other services.",
          "Update your password immediately if you suspect unauthorized activity.",
          "Review booking and payment notifications regularly so unusual changes are caught early.",
        ],
      },
      {
        slug: "two-factor-authentication",
        title: "Two-factor authentication",
        summary: "Why a second verification step is worth enabling.",
        body: [
          "Two-factor authentication makes stolen passwords much less useful on their own.",
          "If your sign-in experience supports it, activate it on the same device you check frequently.",
          "Keep recovery methods current so you do not lock yourself out later.",
        ],
      },
      {
        slug: "privacy-settings",
        title: "Privacy settings",
        summary: "How to manage account communication and data preferences.",
        body: [
          "Review your profile preferences to control marketing messages and booking communications.",
          "Operational emails related to active bookings may still be required for service delivery.",
          "Contact support if you need help understanding what is optional versus required.",
        ],
      },
      {
        slug: "data-protection",
        title: "Data protection",
        summary: "How platform data should be handled and what users can request.",
        body: [
          "Keep personal data requests specific so support can route them efficiently.",
          "Only share sensitive documents through approved secure channels.",
          "If you suspect a breach, report it immediately with as much concrete detail as possible.",
        ],
      },
      {
        slug: "fraud-prevention",
        title: "Fraud prevention",
        summary: "How to spot suspicious behavior before it causes damage.",
        body: [
          "Do not send payment outside approved Stewart or supplier channels unless explicitly verified.",
          "Be cautious with urgent requests that ask you to bypass the platform.",
          "When something feels off, pause and contact support before acting.",
        ],
      },
    ],
    faqs: [
      { question: "Should I share my booking reference publicly?", answer: "No. Booking references should be treated as private trip information." },
      { question: "How do I report suspicious activity?", answer: "Use support immediately and include screenshots, timestamps, and any suspicious contact details." },
    ],
  },
  {
    slug: "policies",
    title: "Policies",
    description: "Terms, conditions, and guidelines",
    articles: 18,
    heroSummary: "Reference material for cancellation rules, community behavior, booking standards, and platform expectations.",
    topics: [
      {
        slug: "terms-of-service",
        title: "Terms of service",
        summary: "What governs the use of the Stewart platform.",
        body: [
          "The terms define how bookings, account use, and service responsibilities are handled across the platform.",
          "Read them when your use case is complex, commercial, or recurring.",
          "If a booking has supplier-specific terms, those can apply alongside platform terms.",
        ],
      },
      {
        slug: "privacy-policy",
        title: "Privacy policy",
        summary: "How your information is handled and why it is collected.",
        body: [
          "The privacy policy explains what information is collected, why it is needed, and how it can be used operationally.",
          "It also outlines how to request support for data-related concerns.",
          "Read it together with security guidance if your concern involves access or fraud.",
        ],
      },
      {
        slug: "cancellation-policy",
        title: "Cancellation policy",
        summary: "A broader explanation of cancellation timing across product types.",
        body: [
          "Hotels, flights, cars, and attractions can all have different cancellation logic.",
          "The booking-level policy is always the one that matters most.",
          "If your booking crosses multiple suppliers, check each part rather than assuming they match.",
        ],
      },
      {
        slug: "review-guidelines",
        title: "Review guidelines",
        summary: "How to leave feedback that is useful, fair, and policy-compliant.",
        body: [
          "Focus on what happened, when it happened, and how it affected your experience.",
          "Avoid private personal information, threats, or unverifiable claims.",
          "Constructive, specific reviews help both future travelers and operators improve.",
        ],
      },
      {
        slug: "community-standards",
        title: "Community standards",
        summary: "Expected behavior for guests, hosts, partners, and support interactions.",
        body: [
          "Respectful conduct, accurate representation, and lawful behavior are baseline expectations.",
          "Abuse, discrimination, and fraud are grounds for account action or service restriction.",
          "When disputes arise, documented facts matter more than volume or urgency.",
        ],
      },
    ],
    faqs: [
      { question: "Which rules apply if property and platform policies differ?", answer: "The booking-specific supplier terms and the platform rules can both apply, depending on the issue." },
      { question: "Can support override published policy?", answer: "Support can review exceptions, but not every restriction can be bypassed." },
    ],
  },
]

export const supportCategoryPages: SupportCategoryPage[] = [
  {
    slug: "accommodation",
    title: "Accommodation Support",
    description: "Questions about hotels, apartments, and stays",
    responseTime: "Average response in under 20 minutes",
    overview: "Use this support area for reservation issues, room expectations, host communication, and check-in or check-out assistance.",
    sections: ["Booking changes", "Arrival support", "Host contact guidance", "Cancellation and refund review"],
    nextSteps: ["Keep your booking reference ready", "Gather screenshots if an issue is visual", "Share travel dates for faster support handling"],
  },
  {
    slug: "flights",
    title: "Flight Support",
    description: "Flight bookings, changes, and cancellations",
    responseTime: "Priority triage for same-day travel",
    overview: "This section is built for route changes, baggage disputes, airline schedule disruptions, and refund or credit follow-up.",
    sections: ["Schedule changes", "Baggage assistance", "Refund tracking", "Airport transfer coordination"],
    nextSteps: ["Provide your route and airline", "State whether travel is upcoming or already disrupted", "Include passenger names exactly as booked"],
  },
  {
    slug: "car-rentals",
    title: "Car Rental Support",
    description: "Vehicle reservations and rental policies",
    responseTime: "Fast response during active rental windows",
    overview: "Use this area for pickup issues, one-way rental questions, insurance concerns, and return timing support.",
    sections: ["Pickup assistance", "Coverage questions", "Vehicle condition concerns", "Drop-off changes"],
    nextSteps: ["Upload pickup photos if relevant", "Share provider name and reservation ID", "Explain whether the car has already been collected"],
  },
  {
    slug: "payments",
    title: "Payments Support",
    description: "Billing, refunds, and payment methods",
    responseTime: "Tracked by billing specialists",
    overview: "This page covers card problems, payment verification, refund progress, deposits, and billing disputes across all product types.",
    sections: ["Payment verification", "Refund requests", "Charge clarification", "Currency and settlement review"],
    nextSteps: ["Mask your card details before sending screenshots", "Include your transaction date", "Add the booking reference if you have one"],
  },
  {
    slug: "safety-security",
    title: "Safety & Security Support",
    description: "Account security and travel safety",
    responseTime: "Urgent review for active incidents",
    overview: "Use this section for suspicious account access, unsafe stays, emergency escalation, or behavior concerns involving a booking.",
    sections: ["Account protection", "Incident escalation", "Emergency travel help", "Fraud reporting"],
    nextSteps: ["Report immediately if there is active risk", "Change your password if access is involved", "Use call support for urgent safety issues"],
  },
  {
    slug: "policies",
    title: "Policy Support",
    description: "Cancellation, modification, and general policies",
    responseTime: "Case-by-case policy review",
    overview: "Use this area when you need help understanding policy language, exceptions, or what rule applies to a current booking.",
    sections: ["Cancellation interpretation", "Rule clarification", "Eligibility review", "Community standards guidance"],
    nextSteps: ["Quote the policy section you need help with", "Attach the booking confirmation", "State the exact action you want to take"],
  },
]

export const popularHelpArticles = [
  { title: "How do I cancel my booking?", category: "Accommodations", views: 12500 },
  { title: "When will I receive my refund?", category: "Payments", views: 9800 },
  { title: "How do I change my booking dates?", category: "Accommodations", views: 8700 },
  { title: "What payment methods are accepted?", category: "Payments", views: 7500 },
  { title: "How do I contact customer support?", category: "Support", views: 6900 },
  { title: "Can I book for someone else?", category: "Accommodations", views: 5400 },
]

export const careerPositions: CareerPosition[] = [
  {
    slug: "senior-software-engineer",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    remote: true,
    summary: "Lead high-impact product engineering work across search, booking flow, and operational tooling.",
    responsibilities: ["Own production-grade frontend and backend features", "Improve reliability and observability", "Mentor engineers and review architecture decisions"],
    requirements: ["Strong TypeScript and React experience", "Experience shipping product features end to end", "Clear communication and product judgment"],
    benefits: ["Remote-first flexibility", "Learning budget", "Travel credits"],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "London, UK",
    type: "Full-time",
    remote: true,
    summary: "Design conversion-focused travel experiences across booking, support, and account management.",
    responsibilities: ["Own user flows from concept to shipped UI", "Run design critiques", "Collaborate directly with product and engineering"],
    requirements: ["Strong portfolio of shipped product work", "Figma fluency", "Experience with research-informed design"],
    benefits: ["Flexible schedule", "Remote setup support", "Global team exposure"],
  },
  {
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Full-time",
    remote: false,
    summary: "Own customer recovery, escalation quality, and long-term account satisfaction for premium travelers.",
    responsibilities: ["Manage escalations", "Improve service playbooks", "Partner with support and product"],
    requirements: ["Experience in hospitality or travel operations", "High-empathy communication", "Strong documentation discipline"],
    benefits: ["Health coverage", "Travel incentives", "Performance bonuses"],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    department: "Data",
    location: "Lagos, Nigeria",
    type: "Full-time",
    remote: true,
    summary: "Build models and decision systems that improve marketplace quality and demand understanding.",
    responsibilities: ["Develop forecasting and ranking models", "Partner on experimentation", "Translate analysis into product action"],
    requirements: ["Strong Python or analytics background", "Applied modeling experience", "Clear analytical writing"],
    benefits: ["Remote-first team", "Research budget", "Conference support"],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Lagos, Nigeria",
    type: "Full-time",
    remote: true,
    summary: "Own brand campaigns and acquisition programs that move qualified travel demand.",
    responsibilities: ["Plan integrated campaigns", "Coordinate content and growth channels", "Report on performance"],
    requirements: ["Performance marketing experience", "Campaign operations discipline", "Strong messaging instincts"],
    benefits: ["Travel perks", "Flexible work", "Growth budget"],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    remote: true,
    summary: "Strengthen platform uptime, deployment speed, and security posture across the Stewart stack.",
    responsibilities: ["Improve CI/CD", "Manage cloud infrastructure", "Raise observability standards"],
    requirements: ["Infrastructure automation experience", "Cloud platform fluency", "Security awareness"],
    benefits: ["Remote role", "Tooling budget", "Travel credits"],
  },
]

export const genericContentPages: Record<string, GenericContentPage> = {
  press: {
    eyebrow: "Company",
    title: "Press Center",
    summary: "Company updates, brand resources, and media contact guidance for Stewart.",
    sections: [
      { title: "Media Enquiries", body: "For interviews, statements, and brand assets, use the support and communications channels listed on this page." },
      { title: "Latest Updates", body: "Stewart continues to expand booking, support, and marketplace operations with a strong focus on product reliability and traveler trust." },
    ],
  },
  investors: {
    eyebrow: "Company",
    title: "Investor Relations",
    summary: "High-level information for stakeholders following Stewart’s growth and operating direction.",
    sections: [
      { title: "Business Focus", body: "Stewart is focused on scalable travel commerce, service operations, and dependable digital booking experiences." },
      { title: "Contact", body: "Use the company contact channel for investor-related requests and formal introductions." },
    ],
  },
  sustainability: {
    eyebrow: "Company",
    title: "Sustainability",
    summary: "How Stewart approaches responsible travel, operational efficiency, and partner standards.",
    sections: [
      { title: "Responsible Growth", body: "We prioritize reliable operations, efficient travel planning, and partnerships that improve guest experience without wasteful service design." },
      { title: "Partner Standards", body: "We encourage operators to maintain quality, safety, and sustainable service practices across every booking touchpoint." },
    ],
  },
  safety: {
    eyebrow: "Support",
    title: "Safety Information",
    summary: "Platform and travel guidance for staying safe before, during, and after your trip.",
    sections: [
      { title: "Before Travel", body: "Verify booking details, use secure payment channels, and share itinerary details responsibly." },
      { title: "During Travel", body: "Use official contact channels and escalate immediately when personal safety is involved." },
    ],
  },
  cancellation: {
    eyebrow: "Support",
    title: "Cancellation Options",
    summary: "A practical overview of cancellation windows and what happens after approval.",
    sections: [
      { title: "Check the Booking Policy", body: "The booking-level policy controls what can be cancelled, changed, or refunded." },
      { title: "Timing Matters", body: "The earlier you act, the more likely flexible outcomes remain available." },
    ],
  },
  covid: {
    eyebrow: "Support",
    title: "Travel Health Updates",
    summary: "Operational guidance for health-related disruptions and changing travel requirements.",
    sections: [
      { title: "Policy Review", body: "When health rules affect travel, review both supplier conditions and destination entry requirements." },
      { title: "Support Escalation", body: "Use support when disruptions affect a live booking and documentation is required." },
    ],
  },
  report: {
    eyebrow: "Support",
    title: "Report a Concern",
    summary: "Escalate suspicious behavior, unsafe conditions, or service failures through Stewart channels.",
    sections: [
      { title: "What to Include", body: "Provide timestamps, booking references, screenshots, and a direct summary of what happened." },
      { title: "Urgent Cases", body: "Use phone support immediately if there is active risk to people or property." },
    ],
  },
  trust: {
    eyebrow: "Discover",
    title: "Trust & Safety",
    summary: "The standards, guidance, and escalation routes that keep the Stewart platform dependable.",
    sections: [
      { title: "Verification", body: "We encourage documented communication and booking traceability across the platform." },
      { title: "Incident Response", body: "Urgent reports are prioritized based on active customer impact and safety risk." },
    ],
  },
  credits: {
    eyebrow: "Discover",
    title: "Travel Credits",
    summary: "How Stewart travel credits work and where they can be applied.",
    sections: [
      { title: "Eligibility", body: "Credits may be issued after eligible schedule changes, promotional campaigns, or selected refund alternatives." },
      { title: "Using Credits", body: "Apply credits during checkout when the booking type and supplier allow it." },
    ],
  },
  "gift-cards": {
    eyebrow: "Discover",
    title: "Gift Cards",
    summary: "Give travel flexibility with Stewart gift balances for future trips.",
    sections: [
      { title: "How They Work", body: "Gift balances can be redeemed against eligible bookings on supported travel products." },
      { title: "Support", body: "If redemption fails, contact support with the card code and intended purchase type." },
    ],
  },
  loyalty: {
    eyebrow: "Discover",
    title: "Stewart Loyalty",
    summary: "Benefits, recognition, and progression for travelers who book regularly with Stewart.",
    sections: [
      { title: "Levels", body: "Members progress based on completed trips and booking consistency over time." },
      { title: "Benefits", body: "Perks can include discounts, room upgrades, support priority, and targeted offers." },
    ],
  },
  partners: {
    eyebrow: "Discover",
    title: "Partner with Us",
    summary: "For operators, hosts, and travel businesses that want to work with Stewart.",
    sections: [
      { title: "Who We Work With", body: "We support accommodation partners, transport providers, experience operators, and service vendors." },
      { title: "Next Step", body: "Use the contact channels on this site to begin a partnership conversation." },
    ],
  },
  "list-property": {
    eyebrow: "Hosting",
    title: "List Your Property",
    summary: "Bring your accommodation inventory to Stewart with a clean onboarding process.",
    sections: [
      { title: "What You Need", body: "Prepare accurate photos, room details, availability rules, and guest policies before onboarding." },
      { title: "Quality Standards", body: "Listings should be truthful, current, and operationally supported." },
    ],
  },
  "host-responsibly": {
    eyebrow: "Hosting",
    title: "Host Responsibly",
    summary: "Standards for safety, guest communication, and dependable hosting performance.",
    sections: [
      { title: "Guest Experience", body: "Clear arrival instructions and honest listing details are baseline expectations." },
      { title: "Compliance", body: "Hosts remain responsible for operating within local laws and property rules." },
    ],
  },
  "host-resources": {
    eyebrow: "Hosting",
    title: "Host Resources",
    summary: "Guidance and operational practices that help hosts run better listings.",
    sections: [
      { title: "Operations", body: "Use standard arrival flows, accurate inventory, and documented communication to reduce support friction." },
      { title: "Performance", body: "Review quality, speed, and clarity all affect long-term guest trust." },
    ],
  },
  community: {
    eyebrow: "Hosting",
    title: "Community Forum",
    summary: "A place for hosts and travelers to learn from shared operational questions and best practices.",
    sections: [
      { title: "Discussion Focus", body: "Topics center on booking quality, guest service, property readiness, and travel operations." },
      { title: "Conduct", body: "Constructive, respectful, and factual contributions are expected." },
    ],
  },
  cookies: {
    eyebrow: "Legal",
    title: "Cookie Policy",
    summary: "How cookies and similar technologies support Stewart functionality and measurement.",
    sections: [
      { title: "Operational Use", body: "Cookies can support sign-in, preferences, analytics, and smoother trip planning." },
      { title: "Choice", body: "Browser and platform settings may let you control some categories of cookie behavior." },
    ],
  },
  sitemap: {
    eyebrow: "Legal",
    title: "Sitemap",
    summary: "A structured overview of Stewart’s main travel, support, account, and company pages.",
    sections: [
      { title: "Core Areas", body: "Explore stays, flights, attractions, car rentals, airport taxis, support, account pages, and company information." },
      { title: "Support Routes", body: "Use Help Center, Support, Favorites, and Dashboard links to move between operational flows." },
    ],
  },
}

export const demoBookings: DemoBooking[] = [
  {
    id: "booking-demo-1",
    kind: "stay",
    itemId: "5",
    title: "Grand Imperial Hotel",
    subtitle: "Victoria Island, Lagos",
    image: "/images/hotel-1.jpg",
    price: 120000,
    status: "pending",
    customerName: "Demo Traveler",
    customerEmail: "guest@stewart.com",
    startDate: "2026-03-28",
    endDate: "2026-03-31",
    createdAt: "2026-03-20T09:00:00.000Z",
    href: "/property/5",
  },
  {
    id: "booking-demo-2",
    kind: "flight",
    itemId: "flt-2",
    title: "Lagos to Dubai",
    subtitle: "Emirates direct flight",
    image: "/images/flight.jpg",
    price: 650000,
    status: "approved",
    customerName: "Travel Ops",
    customerEmail: "traveler@stewart.com",
    startDate: "2026-04-10",
    endDate: "2026-04-10",
    createdAt: "2026-03-19T14:10:00.000Z",
    href: "/search?service=flights&from=Lagos&to=Dubai",
  },
  {
    id: "booking-demo-3",
    kind: "car-rental",
    itemId: "3",
    title: "Toyota Land Cruiser",
    subtitle: "Lekki, Lagos",
    image: "/images/car-rental.jpg",
    price: 85000,
    status: "cancelled",
    customerName: "Operations Guest",
    customerEmail: "ops@stewart.com",
    startDate: "2026-03-23",
    endDate: "2026-03-25",
    createdAt: "2026-03-18T11:45:00.000Z",
    href: "/car-rentals/3",
  },
]

export const demoSupportTickets: DemoSupportTicket[] = [
  {
    id: "ticket-demo-1",
    name: "Aisha Bello",
    email: "aisha@example.com",
    category: "booking",
    bookingRef: "STW-230011",
    message: "I need to move my check-in forward by one day if the property can allow it.",
    status: "new",
    createdAt: "2026-03-20T10:15:00.000Z",
  },
  {
    id: "ticket-demo-2",
    name: "Jordan Peters",
    email: "jordan@example.com",
    category: "payment",
    bookingRef: "STW-981120",
    message: "My refund was approved, but it has not reflected on my card statement yet.",
    status: "in-progress",
    createdAt: "2026-03-19T16:40:00.000Z",
  },
]

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id)
}

export function getAttractionById(id: string) {
  return attractions.find((attraction) => attraction.id === id)
}

export function getCarRentalById(id: string) {
  return carRentals.find((car) => car.id === id)
}

export function getCareerBySlug(slug: string) {
  return careerPositions.find((position) => position.slug === slug)
}

export function getHelpCategoryBySlug(slug: string) {
  return helpCategories.find((category) => category.slug === slugify(slug))
}

export function getSupportCategoryBySlug(slug: string) {
  return supportCategoryPages.find((category) => category.slug === slugify(slug))
}

export function getHelpArticleBySlug(slug: string) {
  return helpCategories.flatMap((category) => category.topics).find((topic) => topic.slug === slugify(slug))
}

export function getHelpTopic(categorySlug: string, topicSlug: string) {
  const category = getHelpCategoryBySlug(categorySlug)

  if (!category) {
    return null
  }

  return category.topics.find((topic) => topic.slug === slugify(topicSlug)) ?? null
}

export function getGenericContentPage(slug: string) {
  return genericContentPages[slug]
}

export function getPopularHelpArticleHref(title: string) {
  const directMatch = helpCategories
    .flatMap((category) => category.topics)
    .find((topic) => topic.title.toLowerCase() === title.toLowerCase())

  return directMatch ? `/help/article/${directMatch.slug}` : `/search?service=help&query=${encodeURIComponent(title)}`
}

export function getRelatedProperties(currentId: string) {
  return properties.filter((property) => property.id !== currentId).slice(0, 3)
}

export function getRelatedAttractions(currentId: string) {
  return attractions.filter((attraction) => attraction.id !== currentId).slice(0, 3)
}

export function buildBookingReference(prefix: string, id: string) {
  return `${prefix}-${slugify(id).toUpperCase()}`
}

export function getHelpCategoryTopicHref(categorySlug: string, topicTitle: string) {
  return `/help/${categorySlug}/${slugify(topicTitle)}`
}
