"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { CalendarPicker } from "@/components/calendar-picker"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Teacher {
  id: string
  name: string
  title: string
  hourlyRate: number
  rating: number
  skills: string[]
}

const mockTeachers: Record<string, Teacher> = {
  "1": {
    id: "1",
    name: "Vaani Badra",
    title: "Full-Stack Developer",
    hourlyRate: 50,
    rating: 4.9,
    skills: ["JavaScript", "React", "Web Development"],
  },
  "2": {
    id: "2",
    name: "Sarah Chen",
    title: "Data Scientist",
    hourlyRate: 60,
    rating: 4.8,
    skills: ["Python", "Data Science", "Machine Learning"],
  },
}

export default function BookingPage() {
  const router = useRouter()
  const params = useParams()
  const teacherId = params.id as string

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  const teacher = mockTeachers[teacherId]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time")
      return
    }

    setIsLoading(true)

    // Simulate booking
    setTimeout(() => {
      const booking = {
        id: Date.now().toString(),
        teacherId,
        teacherName: teacher.name,
        date: selectedDate.toISOString(),
        time: selectedTime,
        message,
        status: "confirmed",
      }

      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      bookings.push(booking)
      localStorage.setItem("bookings", JSON.stringify(bookings))

      alert("Session booked successfully!")
      router.push("/dashboard")
    }, 500)
  }

  if (!user || !teacher) return null

  const sessionDate = selectedDate ? selectedDate.toLocaleDateString() : "Not selected"
  const totalCost = selectedTime ? teacher.hourlyRate : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Session</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teacher Info */}
            <Card>
              <CardHeader>
                <CardTitle>{teacher.name}</CardTitle>
                <CardDescription>{teacher.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {teacher.rating} ⭐ ({teacher.skills.length} skills)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hourly Rate</p>
                    <p className="text-lg font-semibold text-indigo-600">${teacher.hourlyRate}/hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
              <CalendarPicker onDateSelect={setSelectedDate} selectedDate={selectedDate} />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h2>
                <TimeSlotPicker onTimeSelect={setSelectedTime} selectedTime={selectedTime} />
              </div>
            )}

            {/* Message */}
            {selectedTime && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Message (Optional)</h2>
                <Textarea
                  placeholder="Tell the teacher what you'd like to focus on in this session..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Teacher</p>
                  <p className="font-semibold text-gray-900">{teacher.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">{sessionDate}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">{selectedTime || "Not selected"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">60 minutes</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">${teacher.hourlyRate} × 1 hour</span>
                    <span className="font-semibold">${totalCost}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">${totalCost}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBookSession}
                  disabled={!selectedDate || !selectedTime || isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isLoading ? "Booking..." : "Book Session"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You can reschedule or cancel up to 24 hours before the session.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
