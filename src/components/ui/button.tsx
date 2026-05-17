import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-amber)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--brand-amber)] text-[var(--brand-black)] hover:opacity-90 font-semibold',
        destructive:
          'bg-[var(--brand-carnelian)] text-white hover:opacity-90',
        outline:
          'border border-[var(--bg-border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-raised)]',
        ghost:
          'text-[var(--text-primary)] hover:bg-[var(--bg-raised)]',
        link:
          'text-[var(--brand-amber)] underline-offset-4 hover:underline p-0 h-auto',
        brand:
          'text-white font-semibold hover:opacity-90',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  gradient?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, gradient, style, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={gradient ? { background: gradient, ...style } : style}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
