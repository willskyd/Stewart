"use client"

import * as React from "react"
import Link from "next/link"
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  FileText, 
  CreditCard, 
  Plane, 
  Building2, 
  Car, 
  Shield, 
  ChevronRight,
  Search,
  Send,
  Loader2
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const supportCategories = [
  {
    icon: Building2,
    title: "Accommodation",
    description: "Questions about hotels, apartments, and stays",
    link: "/help/accommodation"
  },
  {
    icon: Plane,
    title: "Flights",
    description: "Flight bookings, changes, and cancellations",
    link: "/help/flights"
  },
  {
    icon: Car,
    title: "Car Rentals",
    description: "Vehicle reservations and rental policies",
    link: "/help/car-rentals"
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Billing, refunds, and payment methods",
    link: "/help/payments"
  },
  {
    icon: Shield,
    title: "Safety & Security",
    description: "Account security and travel safety",
    link: "/help/safety"
  },
  {
    icon: FileText,
    title: "Policies",
    description: "Cancellation, modification, and general policies",
    link: "/help/policies"
  },
]

const faqs = [
  {
    question: "How do I cancel or modify my booking?",
    answer: "You can cancel or modify your booking through your account dashboard. Go to 'My Bookings', select the reservation you want to change, and click 'Modify' or 'Cancel'. Please note that cancellation policies vary by property and booking type."
  },
  {
    question: "When will I receive my refund?",
    answer: "Refunds are typically processed within 5-10 business days after the cancellation is confirmed. The exact timing depends on your payment method and financial institution. Credit card refunds may take an additional 3-5 days to appear on your statement."
  },
  {
    question: "How do I contact the property directly?",
    answer: "After making a booking, you'll receive a confirmation email with the property's contact details. You can also find this information in your booking details on the app or website under 'My Bookings'."
  },
  {
    question: "What is the Genius loyalty program?",
    answer: "Stewart Genius is our free loyalty program that rewards you with exclusive discounts and perks. You automatically become a Genius Level 1 member after completing 2 stays within 2 years. Higher levels unlock even better benefits."
  },
  {
    question: "Can I book for someone else?",
    answer: "Yes, you can book for someone else. During the booking process, simply enter the guest's name in the 'Guest Name' field. Make sure to provide accurate contact details so the property can reach them if needed."
  },
  {
    question: "What should I do if I have a problem during my stay?",
    answer: "Contact the property directly first to resolve any issues. If you're unable to resolve the problem with the property, reach out to our 24/7 customer support team through the app, website, or by phone for immediate assistance."
  },
]

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    availability: "Available 24/7",
    action: "Start Chat",
    primary: true
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "+234 800 123 4567",
    availability: "24 hours, 7 days a week",
    action: "Call Now",
    primary: false
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@stewart.com",
    availability: "Response within 24 hours",
    action: "Send Email",
    primary: false
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formSubmitted, setFormSubmitted] = React.useState(false)
  const [contactForm, setContactForm] = React.useState({
    name: "",
    email: "",
    category: "",
    bookingRef: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              How can we help you?
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find answers to your questions, contact our support team, or browse our help center.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help topics..."
                className="pl-12 pr-4 h-14 text-lg rounded-full border-2 border-primary/20 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Browse by category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Link
                    key={category.title}
                    href={category.link}
                    className="group p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Get in touch
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <div
                    key={method.title}
                    className={`p-6 rounded-xl text-center ${
                      method.primary 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-card border border-border"
                    }`}
                  >
                    <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                      method.primary ? "bg-white/20" : "bg-primary/10"
                    }`}>
                      <Icon className={`h-6 w-6 ${method.primary ? "text-white" : "text-primary"}`} />
                    </div>
                    <h3 className={`font-semibold mb-1 ${method.primary ? "text-white" : "text-foreground"}`}>
                      {method.title}
                    </h3>
                    <p className={`text-sm mb-1 ${method.primary ? "text-white/90" : "text-foreground"}`}>
                      {method.description}
                    </p>
                    <div className={`flex items-center justify-center gap-1 text-xs mb-4 ${
                      method.primary ? "text-white/70" : "text-muted-foreground"
                    }`}>
                      <Clock className="h-3 w-3" />
                      {method.availability}
                    </div>
                    <Button 
                      variant={method.primary ? "secondary" : "default"} 
                      size="sm" 
                      className="w-full"
                    >
                      {method.action}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 justify-center mb-8">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 text-center">
                <Link href="/help" className="text-primary hover:underline inline-flex items-center gap-1">
                  View all FAQs
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                Send us a message
              </h2>
              <p className="text-muted-foreground mb-8 text-center">
                {"Can't find what you're looking for? Fill out the form below and we'll get back to you."}
              </p>

              {formSubmitted ? (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message sent!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)}>Send another message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={contactForm.category}
                        onValueChange={(value) => setContactForm({ ...contactForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Booking Issue</SelectItem>
                          <SelectItem value="payment">Payment & Refunds</SelectItem>
                          <SelectItem value="account">Account Help</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bookingRef">Booking reference (optional)</Label>
                      <Input
                        id="bookingRef"
                        placeholder="e.g., STW-123456"
                        value={contactForm.bookingRef}
                        onChange={(e) => setContactForm({ ...contactForm, bookingRef: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue or question in detail..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full mt-6" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
