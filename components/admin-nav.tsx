"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Mail, 
  Heart, 
  Settings,
  BarChart3,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin", icon: CheckCircle2 },
  { label: "Support", href: "/admin", icon: Mail },
  { label: "User Activities", href: "/admin", icon: BarChart3 },
  { label: "Favorites Tracking", href: "/admin", icon: Heart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3">
          {adminNavItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href)
            
            return (
              <Link
                key={`${item.label}-${index}`}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
