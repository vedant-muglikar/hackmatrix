export interface Project {
  id: string
  title: string
  description: string
  companyName: string
  companyId: string
  category: "web" | "mobile" | "design" | "other"
  budget: number
  duration: string
  skills: string[]
  applicantCount: number
  status: "open" | "in-progress" | "completed"
  createdAt: string
  deadline: string
  level: "beginner" | "intermediate" | "advanced"
}

export const mockProjects: Project[] = [
  {
    id: "proj-001",
    title: "E-commerce Platform Redesign",
    description:
      "We need to redesign our e-commerce platform with modern UI/UX principles. The project includes responsive design for mobile and desktop, dark mode support, and improved checkout flow.",
    companyName: "TechFlow Inc",
    companyId: "comp-001",
    category: "web",
    budget: 5000,
    duration: "4-6 weeks",
    skills: ["React", "UI Design", "Figma", "CSS"],
    applicantCount: 12,
    status: "open",
    createdAt: "2025-01-10",
    deadline: "2025-02-28",
    level: "advanced",
  },
  {
    id: "proj-002",
    title: "Mobile App Development - iOS & Android",
    description:
      "Build a cross-platform mobile app for fitness tracking. Must support real-time sync, offline functionality, and integration with wearable devices.",
    companyName: "FitLife Co",
    companyId: "comp-002",
    category: "mobile",
    budget: 8000,
    duration: "8-10 weeks",
    skills: ["React Native", "Node.js", "Firebase", "TypeScript"],
    applicantCount: 8,
    status: "open",
    createdAt: "2025-01-08",
    deadline: "2025-03-15",
    level: "advanced",
  },
  {
    id: "proj-003",
    title: "Brand Identity & Logo Design",
    description:
      "Create a complete brand identity including logo, color palette, and design system guidelines for a new startup in the SaaS space.",
    companyName: "CloudStart Labs",
    companyId: "comp-003",
    category: "design",
    budget: 2500,
    duration: "2-3 weeks",
    skills: ["Graphic Design", "Branding", "Adobe Creative Suite", "Figma"],
    applicantCount: 15,
    status: "open",
    createdAt: "2025-01-12",
    deadline: "2025-02-12",
    level: "intermediate",
  },
  {
    id: "proj-004",
    title: "REST API Development",
    description:
      "Develop a robust REST API for a content management system. Should support authentication, pagination, rate limiting, and comprehensive error handling.",
    companyName: "DataHub Systems",
    companyId: "comp-004",
    category: "web",
    budget: 3500,
    duration: "3-4 weeks",
    skills: ["Node.js", "Express", "MongoDB", "REST API Design"],
    applicantCount: 10,
    status: "open",
    createdAt: "2025-01-11",
    deadline: "2025-02-20",
    level: "intermediate",
  },
  {
    id: "proj-005",
    title: "Web Design - Landing Page",
    description:
      "Design and develop a modern, high-converting landing page for a new SaaS product. Include animations, smooth scrolling, and mobile optimization.",
    companyName: "MarketPro",
    companyId: "comp-005",
    category: "web",
    budget: 2000,
    duration: "2 weeks",
    skills: ["Web Design", "HTML/CSS", "JavaScript", "Conversion Optimization"],
    applicantCount: 18,
    status: "open",
    createdAt: "2025-01-09",
    deadline: "2025-01-30",
    level: "intermediate",
  },
  {
    id: "proj-006",
    title: "UI/UX Design - Dashboard",
    description:
      "Design an analytics dashboard with real-time data visualization, interactive charts, and user-friendly navigation. Deliverables include wireframes, prototypes, and design system.",
    companyName: "Analytics Pro",
    companyId: "comp-006",
    category: "design",
    budget: 3000,
    duration: "3-4 weeks",
    skills: ["UI Design", "UX Research", "Figma", "Data Visualization"],
    applicantCount: 9,
    status: "open",
    createdAt: "2025-01-13",
    deadline: "2025-02-25",
    level: "advanced",
  },
]

export interface Application {
  id: string
  projectId: string
  freelancerId: string
  freelancerName: string
  freelancerImage?: string
  proposalText: string
  bidAmount: number
  coverLetter: string
  submittedAt: string
  status: "submitted" | "shortlisted" | "rejected" | "awarded"
  portfolioLinks?: string[]
}

export const mockApplications: Application[] = [
  {
    id: "app-001",
    projectId: "proj-001",
    freelancerId: "free-001",
    freelancerName: "Sarah Chen",
    proposalText:
      "I have 5+ years of experience in modern web design and React development. I've successfully completed similar e-commerce redesigns and understand the importance of UX.",
    bidAmount: 4800,
    coverLetter: "I'm excited about this project and confident in delivering excellent results.",
    submittedAt: "2025-01-14",
    status: "shortlisted",
    portfolioLinks: ["https://example.com/portfolio/project1", "https://example.com/portfolio/project2"],
  },
  {
    id: "app-002",
    projectId: "proj-001",
    freelancerId: "free-002",
    freelancerName: "Marcus Johnson",
    proposalText: "Full-stack developer with 3 years of React experience. Can deliver within timeline.",
    bidAmount: 5200,
    coverLetter: "Looking forward to collaborating on this project.",
    submittedAt: "2025-01-13",
    status: "submitted",
  },
]
