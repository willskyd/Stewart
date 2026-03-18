"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  User,
  Calendar,
  Heart,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Plane,
  Building2,
  Car,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Plus,
  Gift,
  Award,
  TrendingUp
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const upcomingBookings = [
  {
    id: 1,
    type: "hotel",
    name: "Grand Hyatt Lagos",
    location: "Victoria Island, Lagos",
    checkIn: "Mar 25, 2026",
    checkOut: "Mar 28, 2026",
    image: "/images/hotel-1.jpg",
    status: "confirmed",
    price: 450000
  },
  {
    id: 2,
    type: "flight",
    name: "Lagos to London",
    location: "LOS → LHR",
    checkIn: "Apr 10, 2026",
    checkOut: "8h 30m",
    image: "/images/flight.jpg",
    status: "confirmed",
    price: 850000
  },
]

const pastBookings = [
  {
    id: 3,
    type: "hotel",
    name: "Eko Hotel & Suites",
    location: "Victoria Island, Lagos",
    checkIn: "Feb 15, 2026",
    checkOut: "Feb 18, 2026",
    image: "/images/apartment-1.jpg",
    status: "completed",
    price: 320000,
    rating: 4.5
  },
  {
    id: 4,
    type: "car",
    name: "Toyota Camry",
    location: "Lagos Airport",
    checkIn: "Jan 20, 2026",
    checkOut: "Jan 25, 2026",
    image: "/images/car-rental.jpg",
    status: "completed",
    price: 75000,
    rating: 5
  },
]

const savedProperties = [
  {
    id: 1,
    name: "Luxury Beach Villa",
    location: "Santorini, Greece",
    image: "/images/villa-1.jpg",
    price: 125000,
    rating: 4.9
  },
  {
    id: 2,
    name: "Modern City Apartment",
    location: "Dubai, UAE",
    image: "/images/apartment-2.jpg",
    price: 85000,
    rating: 4.7
  },
  {
    id: 3,
    name: "Tropical Paradise Resort",
    location: "Maldives",
    image: "/images/resort-2.jpg",
    price: 200000,
    rating: 4.8
  },
]

const menuItems = [
  { icon: Calendar, label: "My Bookings", href: "/dashboard/bookings" },
  { icon: Heart, label: "Saved", href: "/dashboard/saved" },
  { icon: CreditCard, label: "Payment Methods", href: "/dashboard/payment" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Gift, label: "Rewards", href: "/dashboard/rewards" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = React.useState<{name: string; email: string; firstName?: string} | null>(null)
  const [activeTab, setActiveTab] = React.useState("upcoming")

  React.useEffect(() => {
    const storedUser = localStorage.getItem("stewart_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/signin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("stewart_user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Profile Card */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {user.firstName ? user.firstName[0] : user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-foreground mb-1">{user.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                  <div className="flex items-center justify-center gap-1 text-amber-500 mb-4">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">Genius Level 2</span>
                  </div>
                  <div className="text-left">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress to Level 3</span>
                      <span className="font-medium">3/5 stays</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Menu */}
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome back, {user.firstName || user.name.split(" ")[0]}!
              </h1>
              <p className="text-muted-foreground">
                Manage your bookings, explore new destinations, and track your rewards.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-sm text-muted-foreground">Total Trips</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <Gift className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">2,500</p>
                      <p className="text-sm text-muted-foreground">Reward Points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-rose-500/10">
                      <Heart className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{savedProperties.length}</p>
                      <p className="text-sm text-muted-foreground">Saved Places</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings Section */}
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Bookings</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">
                    <Plus className="h-4 w-4 mr-2" />
                    New Booking
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                    <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={booking.image}
                            alt={booking.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {booking.type === "hotel" && <Building2 className="h-4 w-4 text-primary" />}
                                {booking.type === "flight" && <Plane className="h-4 w-4 text-primary" />}
                                {booking.type === "car" && <Car className="h-4 w-4 text-primary" />}
                                <h3 className="font-semibold text-foreground">{booking.name}</h3>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {booking.location}
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.checkIn}
                            </div>
                            <span>-</span>
                            <span>{booking.checkOut}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">
                              {formatPrice(booking.price)}
                            </span>
                            <Button variant="outline" size="sm">
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="past" className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border"
                      >
                        <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={booking.image}
                            alt={booking.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {booking.type === "hotel" && <Building2 className="h-4 w-4 text-muted-foreground" />}
                                {booking.type === "flight" && <Plane className="h-4 w-4 text-muted-foreground" />}
                                {booking.type === "car" && <Car className="h-4 w-4 text-muted-foreground" />}
                                <h3 className="font-semibold text-foreground">{booking.name}</h3>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {booking.location}
                              </div>
                            </div>
                            <Badge variant="outline">{booking.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.checkIn}
                            </div>
                            <span>-</span>
                            <span>{booking.checkOut}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {booking.rating && (
                                <>
                                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                  <span className="font-medium">{booking.rating}</span>
                                  <span className="text-muted-foreground text-sm">Your rating</span>
                                </>
                              )}
                            </div>
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Saved Properties */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Properties</CardTitle>
                <Link href="/dashboard/saved" className="text-primary text-sm hover:underline">
                  View all
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  {savedProperties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/property/${property.id}`}
                      className="group rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="relative h-32">
                        <Image
                          src={property.image}
                          alt={property.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-rose-500">
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-foreground text-sm mb-1 truncate">
                          {property.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">{property.location}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{formatPrice(property.price)}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span className="text-xs font-medium">{property.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
