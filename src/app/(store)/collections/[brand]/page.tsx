import type { PageProps } from 'next'
import { notFound } from 'next/navigation'
import { BRANDS, CATEGORIES } from '@/lib/brands'
import { ProductCard } from '@/components/store/product-card'
import { CollectionFilters } from '@/components/store/collection-filters'
import type { SubBrand } from '@/types'

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.id }))
}

export async function generateMetadata(props: PageProps<'/collections/[brand]'>) {
  const { brand } = await props.params
  const brandData = BRANDS.find((b) => b.id === brand)
  if (!brandData) return {}
  return {
    title: brandData.name,
    description: brandData.description,
  }
}

export default async function CollectionPage(props: PageProps<'/collections/[brand]'>) {
  const { brand } = await props.params
  const searchParams = await props.searchParams

  const brandData = BRANDS.find((b) => b.id === brand)
  if (!brandData) notFound()

  const categories = CATEGORIES[brand] ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{brandData.emoji}</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Collection
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              {brandData.name}
            </h1>
          </div>
        </div>
        <p className="text-[var(--text-secondary)] max-w-2xl">{brandData.description}</p>

        {/* Brand gradient bar */}
        <div
          className="h-1 w-24 rounded-full mt-4"
          style={{ background: brandData.gradient }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-60 shrink-0">
          <CollectionFilters
            categories={categories}
            brand={brand as SubBrand}
            searchParams={searchParams}
          />
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <ProductGrid brand={brand as SubBrand} searchParams={searchParams} />
        </div>
      </div>
    </div>
  )
}

async function ProductGrid({
  brand,
  searchParams,
}: {
  brand: SubBrand
  searchParams: Record<string, string | string[] | undefined>
}) {
  // In production this fetches from Supabase.
  // Returning placeholder grid for now.
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rated' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[var(--text-secondary)]">
          <span className="text-[var(--text-primary)] font-medium">0</span> products
        </p>
        <select className="h-9 px-3 rounded-lg border border-[var(--bg-border)] bg-[var(--bg-raised)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]">
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* Skeleton placeholders */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-[var(--bg-raised)] border border-[var(--bg-border)] overflow-hidden">
            <div className="aspect-[3/4] skeleton" />
            <div className="p-3 space-y-2">
              <div className="h-3 w-16 skeleton rounded" />
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-3 w-20 skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
