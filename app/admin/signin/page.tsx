"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAdminSession } from "@/lib/site-store"

const ADMIN_EMAIL = "stewartadmin@gmail.com"
const ADMIN_PASSWORD = "Stewartadmin123"
const ADMIN_EMAIL_2 = "admin@stewart.com"
const ADMIN_PASSWORD_2 = "Admin123456"

const isValidAdmin = (email: string, password: string) => {
  return (
    (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) ||
    (email === ADMIN_EMAIL_2 && password === ADMIN_PASSWORD_2)
  )
}

export default function AdminSignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({ email: "", password: "" })
  const [error, setError] = React.useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidAdmin(formData.email, formData.password)) {
      setError("Invalid admin credentials.")
      return
    }

    setAdminSession({
      email: formData.email,
      isAdmin: true,
      signedInAt: new Date().toISOString(),
    })

    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin sign in</h1>
            <p className="mt-3 text-muted-foreground">
              Use your admin credentials to access the Stewart operations dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Admin email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    placeholder="admin@stewart.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                    placeholder="Admin123456"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full rounded-full" size="lg">
                Sign in to dashboard
              </Button>
            </form>

            <div className="mt-6 text-sm text-muted-foreground">
              Need the regular customer account flow instead?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Go to user sign in
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
