"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem("finance_token")
    if (token) {


      // Replace with real token validation
      const validateToken = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData.user)
            console.log("Validate on reload done")
            console.log("Hero")
          } else {
            localStorage.removeItem("finance_token")
            setUser(null)
          }
        } catch (error) {
          console.error("Token validation error:", error)
          localStorage.removeItem("finance_token")
          setUser(null)
        }
      }

      validateToken()
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic
    const publicPaths = ["/login", "/signup"]
    const isPublicPath = publicPaths.includes(pathname)

    if (!isLoading) {
      if (!user && !isPublicPath) {
        router.push("/login")
      } else if (user && isPublicPath) {
        router.push("/dashboard")
      }
    }
  }, [user, pathname, router, isLoading])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Replace with real API
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("finance_token", data.accessToken)
        setUser(data.user)
        return true
      } else {
        const error = await response.json()
        console.error("Login error:", error.message)
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("finance_token")
    setUser(null)
    router.push("/login")

    // Optional - call logout endpoint
    const token = localStorage.getItem("finance_token")
    if (token) {
      fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => {
        console.error("Logout API error:", error)
      })
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
