"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { RatingStars } from "@/components/rating-stars"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Review {
  id: string
  authorName: string
  rating: number
  tags: string[]
  review: string
  date: string
}

interface Teacher {
  id: string
  name: string
  title: string
  bio: string
  location: string
  experience: number
  skills: string[]
  hourlyRate: number
  rating: number
  totalReviews: number
  responseTime: string
  totalSessions: number
  reviews: Review[]
}

const mockTeachers: Record<string, Teacher> = {
  "1": {
    id: "1",
    name: "Vaani Badra",
    title: "Full-Stack Developer",
    bio: "Passionate software engineer with 8+ years of experience in full-stack development. Love teaching programming concepts and learning new technologies.",
    location: "New Delhi, India",
    experience: 8,
    skills: ["JavaScript", "React", "Node.js", "Web Development", "Python"],
    hourlyRate: 50,
    rating: 4.9,
    totalReviews: 127,
    responseTime: "< 2 hours",
    totalSessions: 156,
    reviews: [
      {
        id: "1",
        authorName: "Mahesh Rai Babu",
        rating: 5,
        tags: ["Helpful", "Clear", "Patient"],
        review:
          "Sarah is an exceptional teacher! Her explanations are clear and she has a great way of breaking down complex concepts. Highly recommended for JavaScript courses.",
        date: "2 days ago",
      },
      {
        id: "2",
        authorName: "Sharma Ji Neel",
        rating: 5,
        tags: ["Well Prepared", "Punctual", "Knowledgeable"],
        review:
          "Amazing React instructor! Sarah helped me understand hooks and state management in a way that finally clicked. Patient and encouraging throughout the session.",
        date: "1 week ago",
      },
      {
        id: "3",
        authorName: "Priya Sharma",
        rating: 4,
        tags: ["Helpful", "Clear"],
        review:
          "Great session on web development basics. Sarah provided excellent examples and was very responsive to my questions.",
        date: "2 weeks ago",
      },
    ],
  },
}

export default function TeacherProfilePage() {
  const router = useRouter()
  const params = useParams()
  const teacherId = params.id as string

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

  if (!user || !teacher) return null

  const positivePercentage = Math.round((teacher.rating / 5) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mx-auto mb-4"></div>
                  <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
                  <p className="text-gray-600">{teacher.title}</p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">📍</span>
                    <span className="text-gray-900">{teacher.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">⏱️</span>
                    <span className="text-gray-900">{teacher.experience}+ years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">💬</span>
                    <span className="text-gray-900">Response: {teacher.responseTime}</span>
                  </div>
                </div>

                <Link href={`/booking/${teacher.id}`}>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 mb-2">Book Session</Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{teacher.totalSessions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{teacher.responseTime}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {teacher.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews & Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rating Summary */}
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-5xl font-bold text-gray-900">{teacher.rating}</div>
                    <RatingStars rating={Math.round(teacher.rating)} size="md" />
                    <p className="text-sm text-gray-600 mt-2">{teacher.totalReviews} reviews</p>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-8">{stars}★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${stars === 5 ? 85 : stars === 4 ? 10 : 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8 text-right">
                            {Math.round(((stars === 5 ? 85 : stars === 4 ? 10 : 5) / 100) * teacher.totalReviews)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  {teacher.reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{review.authorName}</p>
                          <RatingStars rating={review.rating} size="sm" />
                        </div>
                        <p className="text-sm text-gray-600">{review.date}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {review.tags.map((tag) => (
                          <span key={tag} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700">{review.review}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
