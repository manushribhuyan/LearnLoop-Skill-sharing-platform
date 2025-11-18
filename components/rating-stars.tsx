"use client"

import { useState } from "react"

interface RatingStarsProps {
  rating: number
  onRatingChange?: (rating: number) => void
  interactive?: boolean
  size?: "sm" | "md" | "lg"
}

export function RatingStars({ rating, onRatingChange, interactive = false, size = "md" }: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${sizeClasses[size]} transition ${
            interactive ? "cursor-pointer" : "cursor-default"
          } ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"}`}
          disabled={!interactive}
        >
          ★
        </button>
      ))}
    </div>
  )
}
