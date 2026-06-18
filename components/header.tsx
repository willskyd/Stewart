"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { 
  Building2, 
  Plane, 
  Car, 
  Ticket, 
  Bus, 
  Moon, 
  Sun, 
  CircleDollarSign, 
  Headphones, 
  UserPlus, 
  LogIn,
  Menu,
  X,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { getUserSession, getAdminSession, clearUserSession, clearAdminSession, subscribeToStore } from "@/lib/site-store"

const navItems = [
  { href: "/", label: "Stays", icon: Building2 },
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/car-rentals", label: "Car Rentals", icon: Car },
  { href: "/attractions", label: "Attractions", icon: Ticket },
  { href: "/airport-taxis", label: "Airport Taxis", icon: Bus },
]

const currencies = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
]

const countries = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)
  const [currency, setCurrency] = React.useState(currencies[0])
  const [country, setCountry] = React.useState(countries[0])
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [userSession, setUserSession] = React.useState<ReturnType<typeof getUserSession>>(null)
  const [adminSession, setAdminSession] = React.useState<ReturnType<typeof getAdminSession>>(null)

  React.useEffect(() => {
    // Ensure we read from localStorage immediately on mount
    const user = getUserSession()
    const admin = getAdminSession()
    
    setUserSession(user)
    setAdminSession(admin)
    setMounted(true)
    
    // Then subscribe to future changes
    const unsubscribe = subscribeToStore(() => {
      const updatedUser = getUserSession()
      const updatedAdmin = getAdminSession()
      setUserSession(updatedUser)
      setAdminSession(updatedAdmin)
    })
    
    return unsubscribe
  }, [])

  const getAbbreviatedName = (name: string | undefined, firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
    }
    if (name) {
      const parts = name.split(' ')
      if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
      }
      return name.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  const handleLogout = () => {
    if (adminSession) {
      clearAdminSession()
      setAdminSession(null)
    } else if (userSession) {
      clearUserSession()
      setUserSession(null)
    }
  }

  const isLoggedIn = adminSession || userSession
  const showInteractiveMenus = mounted

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="border-b border-border/40 bg-primary/5">
        <div className="container mx-auto flex h-10 items-center justify-end gap-2 px-4">
          {/* Currency Selector */}
          {showInteractiveMenus ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                  <CircleDollarSign className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{currency.code}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {currencies.map((c) => (
                  <DropdownMenuItem key={c.code} onClick={() => setCurrency(c)}>
                    {c.symbol} {c.code} - {c.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" disabled>
              <CircleDollarSign className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{currency.code}</span>
            </Button>
          )}

          {/* Country Selector */}
          {showInteractiveMenus ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                  <span className="text-sm leading-none">{country.flag}</span>
                  <span className="hidden sm:inline">{country.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {countries.map((c) => (
                  <DropdownMenuItem key={c.code} onClick={() => setCountry(c)}>
                    <span className="mr-2">{c.flag}</span> {c.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" disabled>
              <span className="text-sm leading-none">{country.flag}</span>
              <span className="hidden sm:inline">{country.name}</span>
            </Button>
          )}

          {/* Customer Service */}
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" asChild>
            <Link href="/support">
              <Headphones className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Support</span>
            </Link>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 px-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <>
                <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Auth Section */}
          {showInteractiveMenus && isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
                  <span className="text-base">👤</span>
                  <span className="font-medium">
                    {adminSession ? 'Admin' : getAbbreviatedName(userSession?.name, userSession?.firstName, userSession?.lastName)}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2 text-sm">
                  <p className="font-semibold text-foreground">
                    {adminSession ? 'Admin Account' : userSession?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {adminSession ? adminSession.email : userSession?.email}
                  </p>
                </div>
                {adminSession && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {userSession && !adminSession && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">My Bookings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">Favorites</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* Register */}
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" asChild>
                <Link href="/register">
                  <span className="hidden sm:inline">Register</span>
                  <UserPlus className="h-3.5 w-3.5" />
                </Link>
              </Button>

              {/* Sign In */}
              <Button variant="default" size="sm" className="h-8 gap-1 text-xs bg-primary hover:bg-primary/90" asChild>
                <Link href="/signin">
                  <span className="hidden sm:inline">Sign In</span>
                  <LogIn className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">Stewart<span className="text-primary">.com</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
