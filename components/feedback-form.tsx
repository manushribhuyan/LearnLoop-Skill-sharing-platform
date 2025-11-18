"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RatingStars } from "@/components/rating-stars"

interface FeedbackFormProps {
  teacherName: string
  onSubmit: (feedback: FeedbackData) => void
  isLoading?: boolean
}

export interface FeedbackData {
  rating: number
  tags: string[]
  review: string
}

const feedbackTags = ["Helpful", "Clear", "Patient", "Punctual", "Well Prepared", "Engaging", "Knowledgeable"]

export function FeedbackForm({ teacherName, onSubmit, isLoading }: FeedbackFormProps) {
  const [rating, setRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [review, setReview] = useState("")

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a rating")
      return
    }
    onSubmit({ rating, tags: selectedTags, review })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Overall Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Overall Rating</label>
        <div className="flex items-center gap-4">
          <RatingStars rating={rating} onRatingChange={setRating} interactive size="lg" />
          <span className="text-lg font-semibold text-gray-900">{rating} out of 5 stars</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Click on a star to rate your experience</p>
      </div>

      {/* Quick Feedback Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Quick Feedback Tags</label>
        <div className="flex flex-wrap gap-2">
          {feedbackTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedTags.includes(tag) ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Written Review */}
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-900 mb-2">
          Written Review
        </label>
        <Textarea
          id="review"
          placeholder="Share your detailed feedback about the session. What went well? What could be improved?"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={5}
        />
        <p className="text-xs text-gray-500 mt-2">Max 500 characters</p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1 bg-transparent">
          Save as Draft
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
          {isLoading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </form>
  )
}
