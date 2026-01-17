"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Briefcase, Users, Clock, DollarSign, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { mockProjects, mockApplications } from "@/lib/mock-data"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find((p) => p.id === params.id)
  const applications = mockApplications.filter((a) => a.projectId === params.id)
  const [applicationStatuses, setApplicationStatuses] = useState<Record<string, string>>({})

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/company/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-foreground">Back to Dashboard</span>
            </Link>
          </div>
        </header>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Project not found.</p>
          </Card>
        </div>
      </div>
    )
  }

  const updateApplicationStatus = (appId: string, status: string) => {
    setApplicationStatuses((prev) => ({
      ...prev,
      [appId]: status,
    }))
  }

  const getApplicationStatus = (app: (typeof mockApplications)[0]) => {
    return applicationStatuses[app.id] || app.status
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/company/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <span className="text-foreground">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
                  <Badge className="bg-green-50 text-green-700 border-green-200 capitalize">{project.status}</Badge>
                </div>
              </div>

              <p className="text-foreground leading-relaxed mb-6">{project.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Budget
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1">${project.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Duration
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1">{project.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Applications
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1">{project.applicantCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    Level
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1 capitalize">{project.level}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-foreground mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Project Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Deadline</span>
                  <span className="font-semibold text-foreground">{project.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="font-semibold text-foreground capitalize">{project.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Applicants</span>
                  <span className="font-semibold text-foreground">{applications.length}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/5 border-2 border-accent">
              <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact support for assistance managing this project.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                Get Support
              </Button>
            </Card>
          </div>
        </div>

        {/* Applications */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Applications ({applications.length})</h2>

          {applications.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No applications received yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="p-6 border border-border rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{app.freelancerName}</h4>
                      <p className="text-sm text-muted-foreground">Applied on {app.submittedAt}</p>
                    </div>
                    <Badge className="capitalize">{getApplicationStatus(app)}</Badge>
                  </div>

                  <p className="text-foreground mb-4">{app.coverLetter}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Bid Amount</p>
                      <p className="font-bold text-foreground">${app.bidAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Proposal</p>
                      <p className="font-bold text-foreground">{app.proposalText.substring(0, 20)}...</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-bold text-foreground capitalize">{getApplicationStatus(app)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={getApplicationStatus(app) === "shortlisted" ? "default" : "outline"}
                      onClick={() => updateApplicationStatus(app.id, "shortlisted")}
                      className={getApplicationStatus(app) === "shortlisted" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Shortlist
                    </Button>
                    <Button
                      size="sm"
                      variant={getApplicationStatus(app) === "rejected" ? "default" : "outline"}
                      onClick={() => updateApplicationStatus(app.id, "rejected")}
                      className={getApplicationStatus(app) === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant={getApplicationStatus(app) === "awarded" ? "default" : "outline"}
                      onClick={() => updateApplicationStatus(app.id, "awarded")}
                      className={getApplicationStatus(app) === "awarded" ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      Award Project
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
