import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--brand-amber)] text-[var(--brand-black)]',
        new: 'bg-[#6C63FF] text-white',
        sale: 'bg-[var(--brand-carnelian)] text-white',
        outline: 'border border-[var(--bg-border)] text-[var(--text-secondary)]',
        muted: 'bg-[var(--bg-raised)] text-[var(--text-secondary)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
