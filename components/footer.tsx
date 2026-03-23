"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  LayoutDashboard
} from "lucide-react"
import { getAdminSession, subscribeToStore } from "@/lib/site-store"

const footerLinks = {
  company: [
    { label: "About Stewart", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press Center", href: "/press" },
    { label: "Investor Relations", href: "/investors" },
    { label: "Sustainability", href: "/sustainability" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety Information", href: "/safety" },
    { label: "Cancellation Options", href: "/cancellation" },
    { label: "COVID-19 Response", href: "/covid" },
    { label: "Report a Concern", href: "/report" },
  ],
  discover: [
    { label: "Trust & Safety", href: "/trust" },
    { label: "Travel Credits", href: "/credits" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Stewart Loyalty", href: "/loyalty" },
    { label: "Partner with Us", href: "/partners" },
  ],
  hosting: [
    { label: "List Your Property", href: "/list-property" },
    { label: "Host Responsibly", href: "/host-responsibly" },
    { label: "Host Resources", href: "/host-resources" },
    { label: "Community Forum", href: "/community" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

export function Footer() {
  const [mounted, setMounted] = React.useState(false)
  const [adminSession, setAdminSession] = React.useState<ReturnType<typeof getAdminSession>>(null)

  React.useEffect(() => {
    // Get initial state from localStorage
    const session = getAdminSession()
    setAdminSession(session)
    setMounted(true)
    
    // Subscribe to changes
    const unsubscribe = subscribeToStore(() => {
      const session = getAdminSession()
      setAdminSession(session)
    })
    
    return unsubscribe
  }, [])

  const showAdminDashboard = Boolean(adminSession)

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">Stewart<span className="text-primary">.com</span></span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your ultimate destination for booking the perfect stay, flight, or adventure anywhere in the world.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Discover</h3>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Travel Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+2348001234567" className="hover:text-primary transition-colors">
                  +234 800 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:support@stewart.com" className="hover:text-primary transition-colors">
                  support@stewart.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Stewart.com. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/favorites" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <Heart className="h-4 w-4" />
                Favorites
              </Link>
              {mounted && showAdminDashboard && (
                <Link href="/admin" className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              )}
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
