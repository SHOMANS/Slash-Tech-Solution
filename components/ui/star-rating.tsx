"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useState } from "react"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}

export function StarRating({ value, onChange, readonly = false, size = "md" }: StarRatingProps) {
  const [hover, setHover] = useState(0)

  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hover || value)

        return (
          <motion.button
            key={star}
            type="button"
            onClick={() => !readonly && onChange(star)}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(0)}
            disabled={readonly}
            whileHover={!readonly ? { scale: 1.1 } : {}}
            whileTap={!readonly ? { scale: 0.95 } : {}}
            className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <Star
              className={`${sizes[size]} transition-colors ${isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-none text-gray-300 dark:text-gray-600'
                }`}
            />
          </motion.button>
        )
      })}
    </div>
  )
}
