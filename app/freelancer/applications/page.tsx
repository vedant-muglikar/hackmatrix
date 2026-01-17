"use client"

import { Suspense } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, XCircle, Award, Search } from "lucide-react"
import Link from "next/link"
import { mockApplications, mockProjects } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"

function ApplicationsContent() {
  const [applications] = useState(mockApplications)
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      submitted: "bg-blue-50 text-blue-700 border-blue-200",
      shortlisted: "bg-green-50 text-green-700 border-green-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      awarded: "bg-purple-50 text-purple-700 border-purple-200",
    }
    return colors[status] || colors.submitted
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shortlisted":
        return <CheckCircle2 className="h-4 w-4" />
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "awarded":
        return <Award className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const filterApplications = (status: string | null) => {
    return applications.filter((app) => {
      const matchesStatus = !status || app.status === status
      const project = mockProjects.find((p) => p.id === app.projectId)
      const matchesSearch =
        searchQuery === "" ||
        (project?.title.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (project?.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      return matchesStatus && matchesSearch
    })
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
              <Link href="/freelancer/dashboard">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Button>
              </Link>
              <Link href="/freelancer/projects">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">My Applications</h2>
          <p className="mt-2 text-muted-foreground">Track the status of your project applications</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by project name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({applications.filter((a) => a.status === "submitted").length})
            </TabsTrigger>
            <TabsTrigger value="shortlisted">
              Shortlisted ({applications.filter((a) => a.status === "shortlisted").length})
            </TabsTrigger>
            <TabsTrigger value="awarded">
              Awarded ({applications.filter((a) => a.status === "awarded").length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({applications.filter((a) => a.status === "rejected").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterApplications(null).length > 0 ? (
              filterApplications(null).map((app) => {
                const project = mockProjects.find((p) => p.id === app.projectId)
                return (
                  <Card key={app.id} className="p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-foreground">{project?.title}</h4>
                          <Badge className={`${getStatusColor(app.status)} capitalize text-xs flex items-center gap-1`}>
                            {getStatusIcon(app.status)}
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{project?.companyName}</p>
                        <p className="text-sm text-foreground mb-3">{app.coverLetter}</p>
                        <div className="flex gap-4 text-sm flex-wrap">
                          <span className="text-foreground">
                            Your Bid: <span className="font-semibold">${app.bidAmount.toLocaleString()}</span>
                          </span>
                          <span className="text-muted-foreground">Applied: {app.submittedAt}</span>
                          {project && (
                            <span className="text-muted-foreground">Budget: ${project.budget.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Link href={`/freelancer/projects/${app.projectId}`}>
                          <Button variant="outline" size="sm">
                            View Project
                          </Button>
                        </Link>
                        {app.status === "shortlisted" && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Submit Proposal
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No applications found.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            {filterApplications("submitted").length > 0 ? (
              filterApplications("submitted").map((app) => {
                const project = mockProjects.find((p) => p.id === app.projectId)
                return (
                  <Card key={app.id} className="p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{project?.title}</h4>
                        <p className="text-sm text-muted-foreground">{project?.companyName}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>Submitted</Badge>
                    </div>
                  </Card>
                )
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No submitted applications.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="shortlisted" className="space-y-4">
            {filterApplications("shortlisted").length > 0 ? (
              filterApplications("shortlisted").map((app) => {
                const project = mockProjects.find((p) => p.id === app.projectId)
                return (
                  <Card key={app.id} className="p-6 hover:shadow-md transition-all border-l-4 border-l-green-600">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{project?.title}</h4>
                        <p className="text-sm text-muted-foreground">{project?.companyName}</p>
                        <p className="text-xs text-green-600 mt-2 font-semibold">You've been shortlisted!</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>Shortlisted</Badge>
                    </div>
                  </Card>
                )
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No shortlisted applications.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="awarded" className="space-y-4">
            {filterApplications("awarded").length > 0 ? (
              filterApplications("awarded").map((app) => {
                const project = mockProjects.find((p) => p.id === app.projectId)
                return (
                  <Card key={app.id} className="p-6 hover:shadow-md transition-all border-l-4 border-l-purple-600">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{project?.title}</h4>
                        <p className="text-sm text-muted-foreground">{project?.companyName}</p>
                        <p className="text-xs text-purple-600 mt-2 font-semibold">
                          Congratulations! You won this project!
                        </p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>Awarded</Badge>
                    </div>
                  </Card>
                )
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No awarded projects yet.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filterApplications("rejected").length > 0 ? (
              filterApplications("rejected").map((app) => {
                const project = mockProjects.find((p) => p.id === app.projectId)
                return (
                  <Card key={app.id} className="p-6 hover:shadow-md transition-all opacity-75">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{project?.title}</h4>
                        <p className="text-sm text-muted-foreground">{project?.companyName}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>Rejected</Badge>
                    </div>
                  </Card>
                )
              })
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No rejected applications.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={null}>
      <ApplicationsContent />
    </Suspense>
  )
}
