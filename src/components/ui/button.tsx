import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] disabled:pointer-events-none disabled:opacity-40 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--brand-amber)] text-[var(--brand-black)] hover:opacity-90 font-semibold rounded-lg shadow-sm hover:shadow-md',
        destructive:
          'bg-[var(--brand-carnelian)] text-white hover:opacity-90 rounded-lg',
        outline:
          'border border-[var(--bg-border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-raised)] hover:border-[var(--bg-border-hover)] rounded-lg',
        ghost:
          'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] rounded-lg',
        link:
          'text-[var(--brand-amber)] underline-offset-4 hover:underline p-0 h-auto',
        glass:
          'glass border border-[var(--bg-border)] text-[var(--text-primary)] hover:border-[var(--bg-border-hover)] rounded-xl',
        pill:
          'bg-[var(--bg-raised)] border border-[var(--bg-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--bg-border-hover)] rounded-full',
        brand:
          'text-white font-semibold hover:opacity-90 rounded-xl shadow-md hover:shadow-lg',
      },
      size: {
        default: 'h-10 px-5 py-2 text-sm',
        sm: 'h-8 px-3.5 text-xs',
        lg: 'h-11 px-7 text-sm',
        xl: 'h-13 px-9 text-base',
        icon: 'h-9 w-9',
        'icon-sm': 'h-7 w-7',
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
