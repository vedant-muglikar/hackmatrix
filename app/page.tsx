"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Briefcase, Code2, Palette, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null)

  if (userRole) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  T
                </div>
                <h1 className="text-xl font-bold text-foreground">TalentHub</h1>
              </div>
              <Button
                variant="ghost"
                onClick={() => setUserRole(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                Switch Role
              </Button>
            </div>
          </div>
        </nav>

        {/* Role-based redirect */}
        {userRole === "company" && (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Company Dashboard</h2>
                <p className="mt-2 text-muted-foreground">Post projects, manage applications, and find top talent</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Link href="/company/projects">
                  <Card className="cursor-pointer p-6 hover:border-primary hover:shadow-lg transition-all">
                    <Briefcase className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">My Projects</h3>
                    <p className="text-sm text-muted-foreground">View and manage your posted projects</p>
                  </Card>
                </Link>
                <Link href="/company/create-project">
                  <Card className="cursor-pointer p-6 hover:border-primary hover:shadow-lg transition-all">
                    <ArrowRight className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Post New Project</h3>
                    <p className="text-sm text-muted-foreground">Create and publish a new project opportunity</p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        )}

        {userRole === "freelancer" && (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Freelancer Dashboard</h2>
                <p className="mt-2 text-muted-foreground">Browse projects, apply, and submit proposals</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Link href="/freelancer/projects">
                  <Card className="cursor-pointer p-6 hover:border-primary hover:shadow-lg transition-all">
                    <Briefcase className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Browse Projects</h3>
                    <p className="text-sm text-muted-foreground">Discover available opportunities</p>
                  </Card>
                </Link>
                <Link href="/freelancer/applications">
                  <Card className="cursor-pointer p-6 hover:border-primary hover:shadow-lg transition-all">
                    <Users className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">My Applications</h3>
                    <p className="text-sm text-muted-foreground">Track your submissions and status</p>
                  </Card>
                </Link>
                <Link href="/freelancer/profile">
                  <Card className="cursor-pointer p-6 hover:border-primary hover:shadow-lg transition-all">
                    <Palette className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">My Profile</h3>
                    <p className="text-sm text-muted-foreground">Build and showcase your portfolio</p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              T
            </div>
            <h1 className="text-2xl font-bold text-foreground">TalentHub</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Connect with Top Talent</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A modern marketplace connecting companies with skilled developers and designers for project-based
            opportunities. Post projects, receive proposals, and build amazing things together.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Company Card */}
          <Card
            className="relative overflow-hidden p-8 transition-all hover:shadow-xl hover:border-primary cursor-pointer border-2"
            onClick={() => setUserRole("company")}
          >
            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <Briefcase className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">For Companies</h3>
              <p className="text-muted-foreground mb-6">
                Post your project requirements and connect with talented professionals
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Post unlimited projects
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Review proposals from top talent
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Fair and transparent selection process
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">Get Started as Company</Button>
            </div>
          </Card>

          {/* Freelancer Card */}
          <Card
            className="relative overflow-hidden p-8 transition-all hover:shadow-xl hover:border-accent cursor-pointer border-2"
            onClick={() => setUserRole("freelancer")}
          >
            <div className="absolute top-0 right-0 h-24 w-24 bg-accent/5 rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <Code2 className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">For Freelancers</h3>
              <p className="text-muted-foreground mb-6">
                Browse opportunities and showcase your skills to land amazing projects
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Browse vetted projects
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Submit competitive proposals
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Build your professional portfolio
                </li>
              </ul>
              <Button className="w-full bg-accent hover:bg-accent/90">Start Freelancing</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 TalentHub. Connecting talent with opportunity.
          </p>
        </div>
      </footer>
    </div>
  )
}
