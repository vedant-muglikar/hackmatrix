"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, DollarSign, Clock, Users, Briefcase, Share2 } from "lucide-react"
import Link from "next/link"
import { mockProjects } from "@/lib/mock-data"

interface ProposalForm {
  bidAmount: string
  coverLetter: string
  deliveryTime: string
  portfolioLinks: string[]
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find((p) => p.id === params.id)
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposalData, setProposalData] = useState<ProposalForm>({
    bidAmount: project?.budget.toString() || "",
    coverLetter: "",
    deliveryTime: project?.duration || "",
    portfolioLinks: [],
  })
  const [portfolioInput, setPortfolioInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/freelancer/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-foreground">Back to Projects</span>
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

  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProposalData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addPortfolioLink = () => {
    if (portfolioInput.trim() && !proposalData.portfolioLinks.includes(portfolioInput.trim())) {
      setProposalData((prev) => ({
        ...prev,
        portfolioLinks: [...prev.portfolioLinks, portfolioInput.trim()],
      }))
      setPortfolioInput("")
    }
  }

  const removePortfolioLink = (link: string) => {
    setProposalData((prev) => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((l) => l !== link),
    }))
  }

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Proposal submitted successfully!")
      setShowProposalForm(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/freelancer/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <span className="text-foreground">Back to Projects</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
                  <p className="text-lg text-muted-foreground mt-1">{project.companyName}</p>
                </div>
                <Badge className="bg-green-50 text-green-700 border-green-200 capitalize">{project.status}</Badge>
              </div>

              <p className="text-foreground leading-relaxed mb-6">{project.description}</p>

              {/* Key Info */}
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
            </Card>

            {/* Skills Required */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Project Details */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Project Details</h2>
              <div className="space-y-4 text-foreground">
                <div>
                  <p className="font-semibold mb-1">Category</p>
                  <p className="text-sm capitalize text-muted-foreground">{project.category}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Deadline</p>
                  <p className="text-sm text-muted-foreground">{project.deadline}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Experience Level Required</p>
                  <p className="text-sm capitalize text-muted-foreground">{project.level}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            {!showProposalForm && (
              <Card className="p-6 border-2 border-primary">
                <h3 className="text-lg font-bold text-foreground mb-4">Ready to Apply?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Submit your proposal and let the company know why you're the perfect fit for this project.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setShowProposalForm(true)}>
                  Submit Proposal
                </Button>
              </Card>
            )}

            {/* Share Card */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Copy Link
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Share
                </Button>
              </div>
            </Card>

            {/* Company Info */}
            <Card className="p-6 bg-secondary/20">
              <h3 className="font-bold text-foreground mb-2">About {project.companyName}</h3>
              <p className="text-sm text-muted-foreground">View more projects and company details on their profile.</p>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                View Company Profile
              </Button>
            </Card>
          </div>
        </div>

        {/* Proposal Form */}
        {showProposalForm && (
          <Card className="mt-8 p-8 border-2 border-primary">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Submit Your Proposal</h2>
              <p className="text-muted-foreground mt-1">Tell the company why you're the best fit for this project</p>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-6">
              {/* Bid Amount */}
              <div>
                <Label htmlFor="bidAmount" className="text-foreground font-semibold">
                  Your Bid Amount ($)
                </Label>
                <Input
                  id="bidAmount"
                  name="bidAmount"
                  type="number"
                  placeholder={project.budget.toString()}
                  value={proposalData.bidAmount}
                  onChange={handleProposalChange}
                  className="mt-2"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Project Budget: ${project.budget.toLocaleString()}</p>
              </div>

              {/* Cover Letter */}
              <div>
                <Label htmlFor="coverLetter" className="text-foreground font-semibold">
                  Cover Letter
                </Label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  placeholder="Introduce yourself and explain why you're a great fit for this project. Highlight relevant experience, your approach, and what makes you stand out..."
                  value={proposalData.coverLetter}
                  onChange={handleProposalChange}
                  rows={6}
                  className="mt-2 w-full px-3 py-2 border border-border rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Delivery Time */}
              <div>
                <Label htmlFor="deliveryTime" className="text-foreground font-semibold">
                  Estimated Delivery Time
                </Label>
                <Input
                  id="deliveryTime"
                  name="deliveryTime"
                  placeholder="e.g., 4-6 weeks"
                  value={proposalData.deliveryTime}
                  onChange={handleProposalChange}
                  className="mt-2"
                  required
                />
              </div>

              {/* Portfolio Links */}
              <div>
                <Label className="text-foreground font-semibold">Portfolio Links (Optional)</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    placeholder="https://example.com/portfolio"
                    value={portfolioInput}
                    onChange={(e) => setPortfolioInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addPortfolioLink()
                      }
                    }}
                  />
                  <Button type="button" onClick={addPortfolioLink} variant="outline">
                    Add
                  </Button>
                </div>

                {proposalData.portfolioLinks.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {proposalData.portfolioLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline truncate"
                        >
                          {link}
                        </a>
                        <button
                          type="button"
                          onClick={() => removePortfolioLink(link)}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
                  {isSubmitting ? "Submitting..." : "Submit Proposal"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowProposalForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
