"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  Globe, 
  Users, 
  Building2, 
  Award, 
  Heart, 
  Shield, 
  Clock, 
  TrendingUp,
  ChevronRight
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: Building2, value: "2M+", label: "Properties worldwide" },
  { icon: Globe, value: "190+", label: "Countries & regions" },
  { icon: Users, value: "500M+", label: "Guest reviews" },
  { icon: Award, value: "28M+", label: "Listings" },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "We put our customers at the center of everything we do, ensuring memorable travel experiences."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your security is our priority. We implement robust measures to protect your bookings and data."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "From local gems to iconic destinations, we connect travelers with accommodations worldwide."
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We continuously improve our platform to make booking travel easier, faster, and more enjoyable."
  },
]

const milestones = [
  { year: "2015", title: "Stewart.com founded", description: "Started with a vision to revolutionize travel booking." },
  { year: "2017", title: "1 million bookings", description: "Reached our first major milestone in just two years." },
  { year: "2019", title: "Global expansion", description: "Expanded to 150+ countries with local support teams." },
  { year: "2021", title: "Mobile app launch", description: "Launched award-winning iOS and Android applications." },
  { year: "2023", title: "AI integration", description: "Introduced AI-powered recommendations and support." },
  { year: "2026", title: "Industry leader", description: "Now serving 50+ million travelers annually." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Travel"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Making travel accessible for everyone
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                At Stewart.com, we believe that travel should be simple, affordable, and enjoyable for everyone. 
                {"We're on a mission to connect people with incredible places around the world."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/">
                    Start exploring
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/careers">Join our team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Stewart.com was founded in 2015 with a simple idea: make it easier for everyone 
                    to experience the world. What started as a small team with big dreams has grown 
                    into one of the {"world's"} leading travel platforms.
                  </p>
                  <p>
                    Today, we connect millions of travelers with accommodations ranging from 
                    cozy apartments to luxury resorts. Our platform spans over 190 countries, 
                    offering more than 28 million listings.
                  </p>
                  <p>
                    {"We're"} not just a booking platform {"—"} {"we're"} a community of travelers, hosts, 
                    and adventurers united by a love of exploration. Every booking on Stewart.com 
                    is an opportunity for someone to create lifelong memories.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/resort-1.jpg"
                  alt="Our team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at Stewart.com
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Key milestones in our mission to transform travel
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
                
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center gap-8 mb-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                      <div className="bg-card border border-border rounded-xl p-6">
                        <div className="text-primary font-bold text-lg mb-1">{milestone.year}</div>
                        <h3 className="font-semibold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                        <Clock className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 md:hidden">
                      <div className="bg-card border border-border rounded-xl p-6 ml-4">
                        <div className="text-primary font-bold text-lg mb-1">{milestone.year}</div>
                        <h3 className="font-semibold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to explore the world?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Join millions of travelers who trust Stewart.com for their accommodation needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/">Start your search</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/register">Create free account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
