"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AuthFormData {
  email: string
  password: string
  name?: string
  company?: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState<"company" | "freelancer" | null>(null)
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate auth - in production, this would call an API
    setTimeout(() => {
      setIsLoading(false)
      // Store auth data and redirect based on user type
      localStorage.setItem(
        "auth",
        JSON.stringify({
          userType,
          email: formData.email,
          name: formData.name || "User",
        }),
      )

      // Redirect to appropriate dashboard
      if (userType === "company") {
        window.location.href = "/company/dashboard"
      } else {
        window.location.href = "/freelancer/dashboard"
      }
    }, 1000)
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                T
              </div>
              <h1 className="text-xl font-bold text-foreground">TalentHub</h1>
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Get Started</h2>
            <p className="mt-2 text-muted-foreground">Choose your role to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="p-8 cursor-pointer hover:border-primary hover:shadow-lg transition-all border-2"
              onClick={() => setUserType("company")}
            >
              <div className="space-y-4">
                <div className="text-4xl">🏢</div>
                <h3 className="text-xl font-bold text-foreground">I'm a Company</h3>
                <p className="text-muted-foreground text-sm">
                  Post projects and find talented developers and designers
                </p>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:border-accent hover:shadow-lg transition-all border-2"
              onClick={() => setUserType("freelancer")}
            >
              <div className="space-y-4">
                <div className="text-4xl">👨‍💻</div>
                <h3 className="text-xl font-bold text-foreground">I'm a Freelancer</h3>
                <p className="text-muted-foreground text-sm">Browse projects and showcase your skills</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setUserType(null)} className="p-1 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                T
              </div>
              <h1 className="text-xl font-bold text-foreground">TalentHub</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">{isLogin ? "Sign In" : "Create Account"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {userType === "company" ? "Company Account" : "Freelancer Account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </div>

                {userType === "company" && (
                  <div>
                    <Label htmlFor="company" className="text-foreground">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company || ""}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
              {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
