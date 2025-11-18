"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { FeedbackForm, type FeedbackData } from "@/components/feedback-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeedbackPage() {
  const router = useRouter()
  const params = useParams()
  const bookingId = params.bookingId as string

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleSubmitFeedback = async (feedback: FeedbackData) => {
    setIsLoading(true)

    // Simulate submission
    setTimeout(() => {
      const reviews = JSON.parse(localStorage.getItem("reviews") || "[]")
      reviews.push({
        id: Date.now().toString(),
        bookingId,
        ...feedback,
        submittedAt: new Date().toISOString(),
      })
      localStorage.setItem("reviews", JSON.stringify(reviews))

      alert("Thank you for your feedback!")
      router.push("/my-bookings")
    }, 500)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Session Feedback</CardTitle>
            <CardDescription>Help us improve by sharing your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <FeedbackForm teacherName="Vaani Badra" onSubmit={handleSubmitFeedback} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
