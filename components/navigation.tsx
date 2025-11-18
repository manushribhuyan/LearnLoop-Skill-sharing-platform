"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">LearnHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Home
            </Link>
            <Link href="/teachers" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Teachers
            </Link>
            <Link href="/learners" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Learners
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Feedback
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="bg-transparent">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} className="bg-indigo-600 hover:bg-indigo-700">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
              Home
            </Link>
            <Link href="/teachers" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
              Teachers
            </Link>
            <Link href="/learners" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">
              Learners
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
