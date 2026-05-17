'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { SubBrand } from '@/types'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 2500 },
  { label: '$25–$50', min: 2500, max: 5000 },
  { label: '$50–$100', min: 5000, max: 10000 },
  { label: '$100–$200', min: 10000, max: 20000 },
  { label: 'Over $200', min: 20000, max: 999999 },
]

interface CollectionFiltersProps {
  categories: string[]
  brand: SubBrand
  searchParams: Record<string, string | string[] | undefined>
}

export function CollectionFilters({ categories, searchParams }: CollectionFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string, multi = false) => {
      const next = new URLSearchParams(params.toString())
      if (multi) {
        const existing = next.getAll(key)
        if (existing.includes(value)) {
          next.delete(key)
          existing.filter((v) => v !== value).forEach((v) => next.append(key, v))
        } else {
          next.append(key, value)
        }
      } else {
        next.set(key, value)
      }
      router.push(`${pathname}?${next.toString()}`, { scroll: false })
    },
    [params, pathname, router]
  )

  const clearAll = () => router.push(pathname, { scroll: false })

  const activeFilters = Array.from(params.entries()).filter(([k]) => k !== 'sort')
  const hasFilters = activeFilters.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[var(--brand-amber)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--brand-carnelian)] flex items-center gap-1 transition-colors"
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-1.5">
          {activeFilters.map(([k, v]) => (
            <span
              key={`${k}-${v}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--brand-amber)]/10 text-[var(--brand-amber)] text-xs font-medium"
            >
              {v}
              <button
                onClick={() => updateParam(k, v as string, true)}
                className="hover:text-[var(--brand-carnelian)]"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Category */}
      <FilterSection title="Category">
        {categories.map((cat) => (
          <FilterCheckbox
            key={cat}
            label={cat}
            checked={params.getAll('category').includes(cat)}
            onChange={() => updateParam('category', cat, true)}
          />
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range">
        {PRICE_RANGES.map((range) => (
          <FilterCheckbox
            key={range.label}
            label={range.label}
            checked={params.get('priceMax') === String(range.max)}
            onChange={() => {
              const next = new URLSearchParams(params.toString())
              next.set('priceMin', String(range.min))
              next.set('priceMax', String(range.max))
              router.push(`${pathname}?${next.toString()}`, { scroll: false })
            }}
          />
        ))}
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => {
            const active = params.getAll('size').includes(size)
            return (
              <button
                key={size}
                onClick={() => updateParam('size', size, true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  active
                    ? 'border-[var(--brand-amber)] bg-[var(--brand-amber)]/10 text-[var(--brand-amber)]'
                    : 'border-[var(--bg-border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Min Rating">
        {[4, 3, 2].map((r) => (
          <FilterCheckbox
            key={r}
            label={`${r}+ stars`}
            checked={params.get('rating') === String(r)}
            onChange={() => {
              const next = new URLSearchParams(params.toString())
              if (next.get('rating') === String(r)) {
                next.delete('rating')
              } else {
                next.set('rating', String(r))
              }
              router.push(`${pathname}?${next.toString()}`, { scroll: false })
            }}
          />
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <FilterCheckbox
          label="In stock only"
          checked={params.get('inStock') === 'true'}
          onChange={() => {
            const next = new URLSearchParams(params.toString())
            if (next.get('inStock') === 'true') next.delete('inStock')
            else next.set('inStock', 'true')
            router.push(`${pathname}?${next.toString()}`, { scroll: false })
          }}
        />
        <FilterCheckbox
          label="On sale"
          checked={params.get('onSale') === 'true'}
          onChange={() => {
            const next = new URLSearchParams(params.toString())
            if (next.get('onSale') === 'true') next.delete('onSale')
            else next.set('onSale', 'true')
            router.push(`${pathname}?${next.toString()}`, { scroll: false })
          }}
        />
      </FilterSection>
    </div>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--bg-border)] pt-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
          checked ? 'border-[var(--brand-amber)] bg-[var(--brand-amber)]' : 'border-[var(--bg-border)] group-hover:border-[var(--text-muted)]'
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L3 5L7 1" stroke="#0E0E0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
        {label}
      </span>
    </label>
  )
}
