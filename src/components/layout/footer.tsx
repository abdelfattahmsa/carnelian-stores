import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRANDS } from '@/lib/brands'
import { BrandIcon } from '@/components/ui/brand-icons'

const HELP_LINKS = [
  { label: 'Shipping & Returns', href: '/help/shipping' },
  { label: 'Size Guide', href: '/help/sizing' },
  { label: 'Track Order', href: '/account/orders' },
  { label: 'Contact Us', href: '/help/contact' },
  { label: 'FAQ', href: '/help/faq' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--bg-border)]">

      {/* ── Newsletter banner ── */}
      <div className="border-b border-[var(--bg-border)] bg-[var(--bg-raised)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-amber)] mb-2">
                Stay in the loop
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
                New drops. Exclusive offers.<br className="hidden sm:block" /> Weekly culture.
              </h3>
            </div>
            <form className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-64 h-11 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-overlay)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-amber)] transition-all"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl gradient-carnelian text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl gradient-carnelian flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm font-display">C</span>
              </div>
              <span className="font-display font-semibold text-[var(--text-primary)] tracking-tight">
                Carnelian Stores
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
              Five curated sub-brands. One philosophy: make things worth keeping.
              Part of the Peridot Holdings ecosystem.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {[
                { label: 'X', href: '#' },
                { label: 'IG', href: '#' },
                { label: 'TK', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-xl bg-[var(--bg-overlay)] border border-[var(--bg-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--bg-border-hover)] transition-all text-[10px] font-bold tracking-wider"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Sub-brands column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
              Sub-brands
            </h3>
            <ul className="space-y-3">
              {BRANDS.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={brand.href}
                    className="group flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <BrandIcon
                      id={brand.id}
                      size={13}
                      style={{ color: brand.color }}
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    {brand.name === 'Carnelian Stores' ? 'All Collections' : brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
              Help
            </h3>
            <ul className="space-y-3">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Peridot Holdings', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Press', href: '#' },
                { label: 'Affiliate Program', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[var(--bg-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[var(--text-muted)]">
            © {year} Carnelian Stores · A{' '}
            <span className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-default">
              Peridot Holdings
            </span>{' '}
            company
          </p>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
