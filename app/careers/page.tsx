"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  Users, 
  Heart, 
  Zap, 
  Globe,
  ChevronRight,
  Search
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const benefits = [
  {
    icon: Globe,
    title: "Travel Perks",
    description: "Generous travel credits and employee discounts on all bookings"
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and mental wellness programs"
  },
  {
    icon: Zap,
    title: "Growth",
    description: "Learning budget, mentorship programs, and career development"
  },
  {
    icon: Users,
    title: "Flexibility",
    description: "Remote-first culture with flexible working hours"
  },
]

const openPositions = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    remote: true
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "London, UK",
    type: "Full-time",
    remote: true
  },
  {
    title: "Customer Success Manager",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Full-time",
    remote: false
  },
  {
    title: "Data Scientist",
    department: "Data",
    location: "Lagos, Nigeria",
    type: "Full-time",
    remote: true
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Lagos, Nigeria",
    type: "Full-time",
    remote: true
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    remote: true
  },
]

const departments = ["All", "Engineering", "Design", "Operations", "Data", "Marketing"]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/resort-2.jpg"
              alt="Careers at Stewart"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">{"We're hiring!"}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Build the future of travel with us
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join our team of passionate individuals working to make travel accessible and enjoyable 
                for millions of people around the world.
              </p>
              <Button size="lg" asChild>
                <a href="#positions">
                  View open positions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why join Stewart?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {"We offer competitive benefits and a supportive environment where you can do your best work"}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.title} className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find your next opportunity and help shape the future of travel
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search positions..." className="pl-10" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <Button
                    key={dept}
                    variant={dept === "All" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {dept}
                  </Button>
                ))}
              </div>
            </div>

            {/* Job Listings */}
            <div className="max-w-4xl mx-auto space-y-4">
              {openPositions.map((position, index) => (
                <Link
                  key={index}
                  href={`/careers/${position.title.toLowerCase().replace(/ /g, "-")}`}
                  className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{position.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {position.remote && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Remote OK
                        </Badge>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              {"Don't see a perfect fit?"}
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              {"We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities."}
            </p>
            <Button size="lg" variant="secondary">
              Send your resume
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
