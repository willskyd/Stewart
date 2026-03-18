"use client"

import { Shield, Clock, Award, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments and personal data are protected with industry-leading security measures.",
    stat: "256-bit SSL",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you with any queries.",
    stat: "< 2 min response",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Find a lower price elsewhere? We'll match it and give you an additional 10% off.",
    stat: "Price Match",
  },
  {
    icon: Users,
    title: "Trusted by Millions",
    description: "Join over 50 million travelers who trust Stewart.com for their booking needs.",
    stat: "50M+ Users",
  },
]

export function WhyStewart() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Why Choose Stewart.com?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our world-class booking platform. We&apos;re committed to making your travel dreams a reality.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {feature.stat}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
