'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
  className?: string
}

export function StarRating({
  rating,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const sizes = { sm: 12, md: 16, lg: 20 }
  const px = sizes[size]

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={interactive && onChange ? () => onChange(i + 1) : undefined}
          className={cn('transition-transform', interactive && 'hover:scale-110 cursor-pointer')}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <Star
            size={px}
            fill={i < Math.floor(rating) ? '#E0A800' : 'none'}
            stroke={i < rating ? '#E0A800' : 'var(--text-muted)'}
          />
        </button>
      ))}
    </div>
  )
}
