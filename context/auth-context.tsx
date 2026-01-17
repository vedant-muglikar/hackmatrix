"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  email: string
  name: string
  userType: "company" | "freelancer"
  id: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, userType: "company" | "freelancer") => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load auth from localStorage on mount
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth)
        setUser({
          ...parsed,
          id: parsed.email.split("@")[0],
        })
      } catch (e) {
        console.error("Failed to parse saved auth:", e)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: "company" | "freelancer") => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      email,
      name: email.split("@")[0],
      userType,
      id: email.split("@")[0],
    }

    setUser(newUser)
    localStorage.setItem("auth", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
