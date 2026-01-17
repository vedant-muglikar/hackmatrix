"use client"

import { Suspense } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Star, DollarSign } from "lucide-react"
import Link from "next/link"
import { mockApplications, mockProjects } from "@/lib/mock-data"
import { mockFreelancerProfiles } from "@/lib/mock-profiles"
import { Input } from "@/components/ui/input"

function ApplicationsContent() {
  const [applications] = useState(mockApplications)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const getFreelancerProfile = (freelancerId: string) => {
    return mockFreelancerProfiles.find((p) => p.id === freelancerId)
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = searchQuery === "" || app.freelancerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !filterStatus || app.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      submitted: "bg-blue-50 text-blue-700 border-blue-200",
      shortlisted: "bg-green-50 text-green-700 border-green-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      awarded: "bg-purple-50 text-purple-700 border-purple-200",
    }
    return colors[status] || colors.submitted
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                T
              </div>
              <h1 className="text-xl font-bold text-foreground">TalentHub</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/company/dashboard">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Button>
              </Link>
              <Link href="/company/projects">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">All Applications</h2>
          <p className="mt-2 text-muted-foreground">Review and manage all project applications</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by freelancer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(null)}
              className={filterStatus === null ? "bg-primary hover:bg-primary/90" : ""}
            >
              All ({applications.length})
            </Button>
            {["submitted", "shortlisted", "awarded", "rejected"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? "bg-primary hover:bg-primary/90" : ""}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} (
                {applications.filter((a) => a.status === status).length})
              </Button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => {
            const project = mockProjects.find((p) => p.id === app.projectId)
            const profile = getFreelancerProfile(app.freelancerId)

            return (
              <Card key={app.id} className="p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{app.freelancerName}</h3>
                    {profile && <p className="text-sm text-muted-foreground">{profile.title}</p>}
                    <p className="text-sm text-muted-foreground mt-1">{project?.title}</p>
                  </div>
                  <Badge className={`${getStatusColor(app.status)} capitalize`}>{app.status}</Badge>
                </div>

                <p className="text-foreground mb-4">{app.coverLetter}</p>

                {/* Freelancer Stats */}
                {profile && (
                  <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="font-semibold text-foreground">{profile.rating}</span>
                        <Star className="h-3 w-3 fill-accent text-accent" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Projects Done</p>
                      <p className="font-semibold text-foreground mt-1">{profile.completedProjects}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hourly Rate</p>
                      <p className="font-semibold text-foreground mt-1">${profile.hourlyRate}/hr</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-semibold text-foreground mt-1">{profile.experience}+ years</p>
                    </div>
                  </div>
                )}

                {/* Application Details */}
                <div className="mb-4 grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-t border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Bid
                    </p>
                    <p className="font-semibold text-foreground">${app.bidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Applied</p>
                    <p className="font-semibold text-foreground">{app.submittedAt}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Proposal</p>
                    <p className="font-semibold text-foreground truncate">{app.proposalText.substring(0, 20)}...</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {profile && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Profile
                    </Button>
                  )}
                  <Link href={`/company/projects/${app.projectId}`}>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Project
                    </Button>
                  </Link>
                  {app.status === "submitted" && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1">
                        Shortlist
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {filteredApplications.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No applications found.</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function CompanyApplicationsPage() {
  return (
    <Suspense fallback={null}>
      <ApplicationsContent />
    </Suspense>
  )
}
