"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Teacher {
  id: string
  name: string
  skills: string[]
  rating: number
  reviews: number
  hourlyRate: number
  bio: string
  experience: number
  location: string
  responseTime: string
  totalSessions: number
}

// Mock data - in production, this would come from a database
const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Vaani Badra",
    skills: ["JavaScript", "React", "Web Development"],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 50,
    bio: "Passionate software engineer with 8+ years of experience in full-stack development. Love teaching programming concepts and learning new technologies.",
    experience: 8,
    location: "New Delhi, India",
    responseTime: "< 2 hours",
    totalSessions: 156,
  },
  {
    id: "2",
    name: "Sarah Chen",
    skills: ["Python", "Data Science", "Machine Learning"],
    rating: 4.8,
    reviews: 98,
    hourlyRate: 60,
    bio: "Data scientist with expertise in ML and AI. Helping students understand complex concepts through practical examples.",
    experience: 6,
    location: "San Francisco, USA",
    responseTime: "< 1 hour",
    totalSessions: 142,
  },
  {
    id: "3",
    name: "Marcus Johnson",
    skills: ["UI/UX Design", "Figma", "Web Design"],
    rating: 4.7,
    reviews: 85,
    hourlyRate: 55,
    bio: "Creative designer passionate about creating beautiful and functional user experiences.",
    experience: 5,
    location: "New York, USA",
    responseTime: "< 3 hours",
    totalSessions: 120,
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    skills: ["Spanish", "English", "Language Teaching"],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 35,
    bio: "Native Spanish speaker with 10+ years of teaching experience. Specialized in conversational fluency.",
    experience: 10,
    location: "Madrid, Spain",
    responseTime: "< 30 min",
    totalSessions: 289,
  },
  {
    id: "5",
    name: "David Kim",
    skills: ["Node.js", "Backend Development", "DevOps"],
    rating: 4.6,
    reviews: 72,
    hourlyRate: 65,
    bio: "Backend specialist helping developers build scalable applications.",
    experience: 7,
    location: "Seoul, South Korea",
    responseTime: "< 2 hours",
    totalSessions: 98,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    skills: ["Photography", "Video Editing", "Content Creation"],
    rating: 4.8,
    reviews: 110,
    hourlyRate: 45,
    bio: "Professional photographer and content creator. Teaching visual storytelling and technical skills.",
    experience: 9,
    location: "Los Angeles, USA",
    responseTime: "< 4 hours",
    totalSessions: 167,
  },
]

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("rating")

  // Extract unique skills
  const allSkills = useMemo(() => {
    const skills = new Set<string>()
    mockTeachers.forEach((teacher) => {
      teacher.skills.forEach((skill) => skills.add(skill))
    })
    return Array.from(skills).sort()
  }, [])

  // Filter and sort teachers
  const filteredTeachers = useMemo(() => {
    const filtered = mockTeachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        teacher.bio.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSkill = !selectedSkill || teacher.skills.includes(selectedSkill)

      return matchesSearch && matchesSkill
    })

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.hourlyRate - b.hourlyRate)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.hourlyRate - a.hourlyRate)
    } else if (sortBy === "sessions") {
      filtered.sort((a, b) => b.totalSessions - a.totalSessions)
    }

    return filtered
  }, [searchQuery, selectedSkill, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Teachers</h1>
          <p className="text-gray-600">Browse and connect with expert teachers in your area of interest</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                type="text"
                placeholder="Search by name, skill, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Skill</label>
                <select
                  value={selectedSkill || ""}
                  onChange={(e) => setSelectedSkill(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Skills</option>
                  {allSkills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="sessions">Most Sessions</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Link key={teacher.id} href={`/teacher/${teacher.id}`}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden cursor-pointer h-full">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-24"></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">${teacher.hourlyRate}</div>
                      <p className="text-xs text-gray-500">/hour</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(teacher.rating) ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{teacher.rating}</span>
                    <span className="text-sm text-gray-600">({teacher.reviews})</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{teacher.bio}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{teacher.experience}+ years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-medium">{teacher.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-medium">{teacher.totalSessions}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacher.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {teacher.skills.length > 2 && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{teacher.skills.length - 2} more
                      </span>
                    )}
                  </div>

                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">View Profile</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No teachers found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedSkill(null)
              }}
              className="mt-4 bg-transparent"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
