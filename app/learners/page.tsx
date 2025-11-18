"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Learner {
  id: string
  name: string
  wantsToLearn: string[]
  canTeach: string[]
  rating: number
  reviews: number
  bio: string
  location: string
  responseTime: string
  totalSessions: number
}

// Mock data
const mockLearners: Learner[] = [
  {
    id: "1",
    name: "Alex Thompson",
    wantsToLearn: ["React", "Node.js", "Web Development"],
    canTeach: ["Python", "Data Analysis"],
    rating: 4.7,
    reviews: 45,
    bio: "Aspiring full-stack developer looking to master modern web technologies.",
    location: "Toronto, Canada",
    responseTime: "< 2 hours",
    totalSessions: 32,
  },
  {
    id: "2",
    name: "Priya Patel",
    wantsToLearn: ["UI/UX Design", "Figma"],
    canTeach: ["Business Strategy", "Marketing"],
    rating: 4.8,
    reviews: 52,
    bio: "Career changer transitioning into design. Eager to learn from experienced designers.",
    location: "London, UK",
    responseTime: "< 1 hour",
    totalSessions: 28,
  },
  {
    id: "3",
    name: "James Wilson",
    wantsToLearn: ["Spanish", "French"],
    canTeach: ["English", "Writing"],
    rating: 4.6,
    reviews: 38,
    bio: "Language enthusiast looking to become fluent in European languages.",
    location: "Berlin, Germany",
    responseTime: "< 3 hours",
    totalSessions: 41,
  },
  {
    id: "4",
    name: "Yuki Tanaka",
    wantsToLearn: ["Photography", "Video Production"],
    canTeach: ["Japanese", "Graphic Design"],
    rating: 4.9,
    reviews: 67,
    bio: "Creative professional expanding skills in visual media.",
    location: "Tokyo, Japan",
    responseTime: "< 30 min",
    totalSessions: 55,
  },
  {
    id: "5",
    name: "Maria Santos",
    wantsToLearn: ["Machine Learning", "AI"],
    canTeach: ["Portuguese", "Chemistry"],
    rating: 4.5,
    reviews: 31,
    bio: "Science student interested in AI and machine learning applications.",
    location: "São Paulo, Brazil",
    responseTime: "< 4 hours",
    totalSessions: 19,
  },
  {
    id: "6",
    name: "Oliver Chen",
    wantsToLearn: ["DevOps", "Cloud Architecture"],
    canTeach: ["Java", "System Design"],
    rating: 4.7,
    reviews: 44,
    bio: "Backend developer looking to master cloud technologies.",
    location: "Singapore",
    responseTime: "< 2 hours",
    totalSessions: 36,
  },
]

export default function LearnersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("rating")

  // Extract unique skills
  const allSkills = useMemo(() => {
    const skills = new Set<string>()
    mockLearners.forEach((learner) => {
      learner.wantsToLearn.forEach((skill) => skills.add(skill))
      learner.canTeach.forEach((skill) => skills.add(skill))
    })
    return Array.from(skills).sort()
  }, [])

  // Filter and sort learners
  const filteredLearners = useMemo(() => {
    const filtered = mockLearners.filter((learner) => {
      const matchesSearch =
        learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        learner.wantsToLearn.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        learner.canTeach.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        learner.bio.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSkill =
        !selectedSkill || learner.wantsToLearn.includes(selectedSkill) || learner.canTeach.includes(selectedSkill)

      return matchesSearch && matchesSkill
    })

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "sessions") {
      filtered.sort((a, b) => b.totalSessions - a.totalSessions)
    } else if (sortBy === "recent") {
      filtered.sort((a, b) => b.totalSessions - a.totalSessions)
    }

    return filtered
  }, [searchQuery, selectedSkill, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Learners</h1>
          <p className="text-gray-600">Browse and connect with learners who want to learn what you teach</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                type="text"
                placeholder="Search by name, skill, or interest..."
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
                  <option value="sessions">Most Active</option>
                  <option value="recent">Recently Active</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Learners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLearners.map((learner) => (
            <Link key={learner.id} href={`/learner/${learner.id}`}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden cursor-pointer h-full">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-24"></div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{learner.name}</h3>
                    <p className="text-sm text-gray-600">{learner.location}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(learner.rating) ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{learner.rating}</span>
                    <span className="text-sm text-gray-600">({learner.reviews})</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{learner.bio}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Wants to Learn:</p>
                      <div className="flex flex-wrap gap-1">
                        {learner.wantsToLearn.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {learner.wantsToLearn.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{learner.wantsToLearn.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {learner.canTeach.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Can Teach:</p>
                        <div className="flex flex-wrap gap-1">
                          {learner.canTeach.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {learner.canTeach.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              +{learner.canTeach.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Sessions: {learner.totalSessions}</span>
                    <span className="text-gray-600">{learner.responseTime}</span>
                  </div>

                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">View Profile</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredLearners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No learners found matching your criteria.</p>
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
