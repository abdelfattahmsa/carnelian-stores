import type { SVGProps, FC } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number, rest: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...rest,
})

/* ─── Brand icons ─── */

export function CarnelianIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      {/* Faceted gemstone — carnelian is a semi-precious stone */}
      <path d="M12 2L22 9L12 22L2 9Z" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <path d="M7 9L12 2L17 9" />
    </svg>
  )
}

export function NerdsIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      {/* Dice face showing 4 */}
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ClutchIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      {/* Steering wheel — 3 spokes at 12, 5, 7 o'clock */}
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="12" y1="9.5" x2="12" y2="3" />
      <line x1="14.1" y1="14.2" x2="19.8" y2="18.5" />
      <line x1="9.9" y1="14.2" x2="4.2" y2="18.5" />
    </svg>
  )
}

export function FieldIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      {/* Two mountain peaks */}
      <path d="M2 21L8.5 9.5L13 16L16.5 11L22 21H2Z" />
    </svg>
  )
}

export function VaultIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      {/* Safe door with combination dial */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <line x1="12" y1="6.5" x2="12" y2="4" />
      <line x1="17.5" y1="12" x2="21" y2="12" />
      <line x1="12" y1="17.5" x2="12" y2="20" />
      <line x1="6.5" y1="12" x2="3" y2="12" />
    </svg>
  )
}

/* ─── Brand icon dispatcher ─── */

const BRAND_ICONS: Record<string, FC<IconProps>> = {
  carnelian: CarnelianIcon,
  'nerds-assemble': NerdsIcon,
  'clutch-nation': ClutchIcon,
  'field-notes': FieldIcon,
  'the-vault': VaultIcon,
}

export function BrandIcon({ id, size = 24, ...rest }: IconProps & { id: string }) {
  const Icon = BRAND_ICONS[id] ?? CarnelianIcon
  return <Icon size={size} {...rest} />
}

/* ─── Utility icons for checkout / email ─── */

export function MailIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 4l10 9 10-9" />
    </svg>
  )
}

export function BoxIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

export function TruckIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

export function CartIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size, p)}>
      <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
      <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
