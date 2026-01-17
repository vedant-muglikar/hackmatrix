"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, LinkIcon } from "lucide-react"
import Link from "next/link"
import { mockFreelancerProfiles } from "@/lib/mock-profiles"

interface ProfileFormData {
  name: string
  title: string
  bio: string
  skills: string[]
  hourlyRate: string
  availability: "available" | "available-limited" | "unavailable"
  languages: string[]
}

export default function FreelancerProfilePage() {
  const mockProfile = mockFreelancerProfiles[0]
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    name: mockProfile.name,
    title: mockProfile.title,
    bio: mockProfile.bio,
    skills: mockProfile.skills,
    hourlyRate: mockProfile.hourlyRate.toString(),
    availability: mockProfile.availability,
    languages: mockProfile.languages,
  })
  const [skillInput, setSkillInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleSave = () => {
    // In production, this would save to a backend
    alert("Profile updated successfully!")
    setIsEditing(false)
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

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {!isEditing ? (
          <>
            {/* Profile View */}
            <Card className="p-8 mb-8">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{mockProfile.name}</h1>
                  <p className="text-lg text-accent mt-1">{mockProfile.title}</p>
                </div>
                <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                  Edit Profile
                </Button>
              </div>

              <p className="text-foreground leading-relaxed mb-6">{mockProfile.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-border mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="font-bold text-foreground">{mockProfile.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(mockProfile.rating) ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Projects Completed</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{mockProfile.completedProjects}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    ${mockProfile.totalEarnings.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{mockProfile.experience}+ years</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.languages.map((lang) => (
                    <Badge key={lang} className="bg-primary/10 text-primary border-primary/20">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {mockProfile.certifications.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-3">Certifications</h2>
                  <ul className="space-y-2">
                    {mockProfile.certifications.map((cert) => (
                      <li key={cert} className="flex items-center gap-2 text-foreground">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            {/* Portfolio */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProfile.portfolio.map((project, idx) => (
                  <Card key={idx} className="p-6 hover:shadow-lg transition-all">
                    <h3 className="font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
                    >
                      <LinkIcon className="h-4 w-4" />
                      View Project
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Profile Edit Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Edit Your Profile</h2>

              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-semibold">
                    Full Name
                  </Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="title" className="text-foreground font-semibold">
                    Professional Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Full-Stack Developer"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-foreground font-semibold">
                    About You
                  </Label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-2 w-full px-3 py-2 border border-border rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyRate" className="text-foreground font-semibold">
                      Hourly Rate ($)
                    </Label>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-foreground font-semibold">
                      Availability
                    </Label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="mt-2 w-full px-3 py-2 border border-border rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="available">Available Now</option>
                      <option value="available-limited">Available (Limited)</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground font-semibold">Skills</Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      Add
                    </Button>
                  </div>

                  {formData.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="cursor-pointer">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-xs opacity-70 hover:opacity-100"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
