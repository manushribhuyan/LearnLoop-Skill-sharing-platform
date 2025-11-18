"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Booking {
  id: string
  teacherId: string
  teacherName: string
  date: string
  time: string
  message: string
  status: "confirmed" | "completed" | "cancelled"
}

export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
      const bookingsData = JSON.parse(localStorage.getItem("bookings") || "[]")
      setBookings(bookingsData)
    }
  }, [router])

  const upcomingSessions = bookings.filter((b) => b.status === "confirmed")
  const pastSessions = bookings.filter((b) => b.status === "completed")

  const handleReschedule = (bookingId: string) => {
    router.push(`/booking/1?reschedule=${bookingId}`)
  }

  const handleCancel = (bookingId: string) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)))
    localStorage.setItem(
      "bookings",
      JSON.stringify(bookings.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))),
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {/* Upcoming Sessions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{booking.teacherName}</CardTitle>
                        <CardDescription>
                          {new Date(booking.date).toLocaleDateString()} at {booking.time}
                        </CardDescription>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Confirmed
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {booking.message && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Your message:</p>
                        <p className="text-gray-900">{booking.message}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button className="bg-indigo-600 hover:bg-indigo-700">Join Session</Button>
                      <Button variant="outline" onClick={() => handleReschedule(booking.id)} className="bg-transparent">
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleCancel(booking.id)}
                        className="bg-transparent text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 text-center">No upcoming sessions. Book one now!</p>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">Browse Teachers</Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Sessions</h2>
          {pastSessions.length > 0 ? (
            <div className="space-y-4">
              {pastSessions.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{booking.teacherName}</CardTitle>
                        <CardDescription>
                          {new Date(booking.date).toLocaleDateString()} at {booking.time}
                        </CardDescription>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Leave Review</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 text-center">No past sessions yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
