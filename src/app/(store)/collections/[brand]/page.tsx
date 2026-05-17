import { notFound } from 'next/navigation'
import { BRANDS, CATEGORIES } from '@/lib/brands'
import { BrandIcon } from '@/components/ui/brand-icons'
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
    <div>
      {/* ── Cinematic brand header ── */}
      <div className="relative overflow-hidden grain">
        {/* BG layers */}
        <div className="absolute inset-0 bg-[var(--bg-base)]" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 80%, ${brandData.color}18 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: brandData.gradient }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 mt-1"
              style={{ background: `${brandData.color}18`, border: `1px solid ${brandData.color}30` }}
            >
              <BrandIcon id={brandData.id} size={32} style={{ color: brandData.color }} />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: brandData.color }}
                >
                  Collection
                </p>
                <div className="h-px w-8" style={{ background: `${brandData.color}50` }} />
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em]">
                  {brandData.tagline}
                </p>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text-primary)] tracking-tight leading-none mb-4">
                {brandData.name === 'Carnelian Stores' ? 'Carnelian' : brandData.name}
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg leading-relaxed">
                {brandData.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <CollectionFilters
              categories={categories}
              brand={brand as SubBrand}
              searchParams={searchParams}
            />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <ProductGrid brand={brand as SubBrand} searchParams={searchParams} brandData={brandData} />
          </div>
        </div>
      </div>
    </div>
  )
}

async function ProductGrid({
  brand,
  searchParams,
  brandData,
}: {
  brand: SubBrand
  searchParams: Record<string, string | string[] | undefined>
  brandData: (typeof BRANDS)[number]
}) {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rated' },
  ]

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[var(--text-muted)]">
          <span className="text-[var(--text-primary)] font-semibold tabular-nums">0</span> products
        </p>
        <select className="h-9 pl-3 pr-8 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-amber)] appearance-none cursor-pointer transition-colors hover:border-[var(--bg-border-hover)]">
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] overflow-hidden">
            <div className="aspect-[3/4] skeleton" />
            <div className="p-3.5 space-y-2">
              <div className="h-2.5 w-14 skeleton rounded-full" />
              <div className="h-3.5 w-full skeleton rounded-lg" />
              <div className="h-3 w-3/4 skeleton rounded-lg" />
              <div className="h-3.5 w-16 skeleton rounded-lg mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
