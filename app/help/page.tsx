"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Search, 
  ChevronRight, 
  Building2, 
  Plane, 
  Car, 
  CreditCard, 
  Shield, 
  HelpCircle,
  FileText,
  Globe,
  Users,
  Clock
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buildQueryString, slugify } from "@/lib/search-utils"
import { getPopularHelpArticleHref } from "@/lib/site-data"

const helpCategories = [
  {
    icon: Building2,
    title: "Accommodations",
    description: "Hotels, apartments, and vacation rentals",
    articles: 45,
    topics: [
      "How to book a property",
      "Cancellation policies",
      "Check-in and check-out",
      "Contacting your host",
      "Room types explained"
    ]
  },
  {
    icon: Plane,
    title: "Flights",
    description: "Flight bookings and airport services",
    articles: 32,
    topics: [
      "Booking flights",
      "Baggage allowance",
      "Flight changes",
      "Refunds and credits",
      "Airport transfers"
    ]
  },
  {
    icon: Car,
    title: "Car Rentals",
    description: "Vehicle rentals and driving",
    articles: 28,
    topics: [
      "Renting a car",
      "Insurance options",
      "Fuel policies",
      "Pick-up and drop-off",
      "Driver requirements"
    ]
  },
  {
    icon: CreditCard,
    title: "Payments & Pricing",
    description: "Payment methods and billing",
    articles: 38,
    topics: [
      "Payment methods",
      "Price breakdown",
      "Deposits and holds",
      "Refund process",
      "Currency conversion"
    ]
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Account security and data protection",
    articles: 22,
    topics: [
      "Account security",
      "Two-factor authentication",
      "Privacy settings",
      "Data protection",
      "Fraud prevention"
    ]
  },
  {
    icon: FileText,
    title: "Policies",
    description: "Terms, conditions, and guidelines",
    articles: 18,
    topics: [
      "Terms of service",
      "Privacy policy",
      "Cancellation policy",
      "Review guidelines",
      "Community standards"
    ]
  },
]

const popularArticles = [
  { title: "How do I cancel my booking?", category: "Accommodations", views: 12500 },
  { title: "When will I receive my refund?", category: "Payments", views: 9800 },
  { title: "How do I change my booking dates?", category: "Accommodations", views: 8700 },
  { title: "What payment methods are accepted?", category: "Payments", views: 7500 },
  { title: "How do I contact customer support?", category: "Support", views: 6900 },
  { title: "Can I book for someone else?", category: "Accommodations", views: 5400 },
]

const faqSections = [
  {
    title: "Booking & Reservations",
    faqs: [
      {
        question: "How do I make a booking?",
        answer: "Search for your destination, select your dates, choose a property, and complete the booking process by entering your details and payment information. You'll receive a confirmation email immediately after booking."
      },
      {
        question: "Can I book without a credit card?",
        answer: "Yes, many properties accept alternative payment methods including debit cards, PayPal, and bank transfers. The available options are shown during checkout."
      },
      {
        question: "How far in advance can I book?",
        answer: "Most properties can be booked up to 24 months in advance. Some may have different policies, which will be shown on their listing page."
      },
    ]
  },
  {
    title: "Cancellations & Refunds",
    faqs: [
      {
        question: "What is the cancellation policy?",
        answer: "Cancellation policies vary by property and rate type. Free cancellation is available on many bookings if cancelled before the deadline. Check your booking confirmation for specific terms."
      },
      {
        question: "How long does a refund take?",
        answer: "Refunds are typically processed within 5-10 business days. The exact timing depends on your payment method and financial institution."
      },
      {
        question: "Can I get a refund for a non-refundable booking?",
        answer: "Non-refundable bookings generally cannot be refunded. However, in exceptional circumstances (such as natural disasters), we may offer credit or alternative solutions."
      },
    ]
  },
  {
    title: "Account & Rewards",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Click 'Register' in the top navigation, enter your email address, create a password, and verify your email. You can also sign up using Google, Facebook, or Apple."
      },
      {
        question: "What is the Genius loyalty program?",
        answer: "Genius is our free loyalty program that rewards frequent travelers with discounts, free breakfast, room upgrades, and other perks at participating properties."
      },
      {
        question: "How do I earn reward points?",
        answer: "Earn points on every booking you make. Points can be redeemed for discounts on future bookings, gift cards, and exclusive experiences."
      },
    ]
  },
]

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Help Center
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find answers to common questions, browse help articles, or contact our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="pl-12 pr-4 h-14 text-lg rounded-full border-2 border-primary/20 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    router.push(`/search${buildQueryString({ service: "help", query: searchQuery })}`)
                  }
                }}
              />
            </div>
            <div className="mt-4">
              <Link
                href={`/search${buildQueryString({ service: "help", query: searchQuery })}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
              >
                Search Help Center
              </Link>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Browse by topic
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category) => {
                const Icon = category.icon
                return (
                  <div
                    key={category.title}
                    className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{category.title}</h3>
                        <p className="text-xs text-muted-foreground">{category.articles} articles</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <ul className="space-y-2">
                      {category.topics.map((topic, index) => (
                        <li key={index}>
                          <Link
                            href={`/help/${slugify(category.title)}/${slugify(topic)}`}
                            className="text-sm text-foreground hover:text-primary flex items-center gap-1 transition-colors"
                          >
                            <ChevronRight className="h-3 w-3" />
                            {topic}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Popular articles
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-3">
                {popularArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={getPopularHelpArticleHref(article.title)}
                    className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-foreground">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">{article.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {article.views.toLocaleString()} views
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
                  <Accordion type="single" collapsible>
                    {section.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${sectionIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {"Still can't find what you're looking for?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Support
                <ChevronRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
