export interface FreelancerProfile {
  id: string
  name: string
  title: string
  bio: string
  skills: string[]
  hourlyRate: number
  completedProjects: number
  rating: number
  totalEarnings: number
  experience: number
  availability: "available" | "available-limited" | "unavailable"
  portfolio: {
    title: string
    description: string
    link: string
    image?: string
  }[]
  certifications: string[]
  languages: string[]
}

export const mockFreelancerProfiles: FreelancerProfile[] = [
  {
    id: "free-001",
    name: "Sarah Chen",
    title: "Full-Stack Developer & UI Designer",
    bio: "Passionate about creating beautiful and functional web applications. 5+ years of experience in React, Node.js, and modern design patterns.",
    skills: ["React", "TypeScript", "Node.js", "UI Design", "Figma", "CSS", "PostgreSQL"],
    hourlyRate: 75,
    completedProjects: 28,
    rating: 4.9,
    totalEarnings: 45000,
    experience: 5,
    availability: "available",
    portfolio: [
      {
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform with React and Node.js",
        link: "https://example.com/portfolio/project1",
      },
      {
        title: "SaaS Dashboard",
        description: "Designed and developed an analytics dashboard with real-time data",
        link: "https://example.com/portfolio/project2",
      },
      {
        title: "Mobile App Redesign",
        description: "Complete UI/UX redesign for a popular fitness tracking app",
        link: "https://example.com/portfolio/project3",
      },
    ],
    certifications: ["AWS Certified Developer Associate", "Google UX Design Certificate"],
    languages: ["English", "Mandarin Chinese"],
  },
  {
    id: "free-002",
    name: "Marcus Johnson",
    title: "React Specialist & Frontend Architect",
    bio: "Expert in building scalable React applications with clean architecture. Focused on performance optimization and best practices.",
    skills: ["React", "Next.js", "TypeScript", "Jest", "Redux", "Performance Optimization"],
    hourlyRate: 85,
    completedProjects: 35,
    rating: 4.8,
    totalEarnings: 62000,
    experience: 7,
    availability: "available",
    portfolio: [
      {
        title: "High-Performance Dashboard",
        description: "Built a real-time dashboard handling millions of data points",
        link: "https://example.com/portfolio/project4",
      },
      {
        title: "Enterprise Web App",
        description: "Architected a scalable enterprise application for Fortune 500 company",
        link: "https://example.com/portfolio/project5",
      },
    ],
    certifications: ["Scrum Master", "AWS Solutions Architect"],
    languages: ["English"],
  },
  {
    id: "free-003",
    name: "Amelia Rodriguez",
    title: "Product Designer & Brand Strategist",
    bio: "Creating beautiful and intuitive user experiences. Specializing in brand identity, UI/UX design, and design systems.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Branding", "Design Systems", "Webflow"],
    hourlyRate: 70,
    completedProjects: 22,
    rating: 4.9,
    totalEarnings: 38000,
    experience: 4,
    availability: "available-limited",
    portfolio: [
      {
        title: "Complete Brand Identity",
        description: "Full brand identity including logo, color system, and brand guidelines",
        link: "https://example.com/portfolio/project6",
      },
      {
        title: "SaaS Product Design",
        description: "End-to-end product design for a B2B SaaS platform",
        link: "https://example.com/portfolio/project7",
      },
    ],
    certifications: ["Google UX Design Certificate", "Adobe Certified Associate"],
    languages: ["English", "Spanish", "French"],
  },
]
