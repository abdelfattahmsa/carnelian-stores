import type { PageProps } from 'next'
import { Search } from 'lucide-react'
import { BRANDS } from '@/lib/brands'
import Link from 'next/link'

export default async function SearchPage(props: PageProps<'/search'>) {
  const searchParams = await props.searchParams
  const q = (searchParams.q as string | undefined) ?? ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Search size={24} className="text-[var(--brand-amber)]" />
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
            {q ? `Results for "${q}"` : 'Search'}
          </h1>
        </div>

        {/* Search bar */}
        <form className="flex gap-3 max-w-2xl">
          <input
            autoFocus
            name="q"
            defaultValue={q}
            placeholder="Search products, brands, categories…"
            className="flex-1 h-12 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]"
          />
          <button type="submit" className="h-12 px-6 rounded-xl gradient-carnelian text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Search
          </button>
        </form>
      </div>

      {q ? (
        <div className="text-center py-16">
          <p className="text-[var(--text-secondary)] mb-2">
            No results found for <strong className="text-[var(--text-primary)]">&quot;{q}&quot;</strong>
          </p>
          <p className="text-sm text-[var(--text-muted)]">Try a different search term or browse our collections below.</p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-6">Browse by sub-brand</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={brand.href}
                className="p-4 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] hover:border-[var(--bg-overlay)] text-center transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-2">{brand.emoji}</div>
                <p className="text-xs font-semibold text-[var(--text-secondary)]">{brand.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
