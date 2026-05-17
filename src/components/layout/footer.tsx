import Link from 'next/link'
import { BRANDS } from '@/lib/brands'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--bg-border)] bg-[var(--bg-raised)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-carnelian flex items-center justify-center">
                <span className="text-white font-bold text-sm font-display">C</span>
              </div>
              <span className="font-display font-semibold text-[var(--text-primary)]">
                Carnelian Stores
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
              Five curated sub-brands. One philosophy: make things worth keeping. Part of the Peridot Holdings ecosystem.
            </p>
            <div className="flex gap-3 mt-6">
              {['Twitter', 'Instagram', 'TikTok'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-border)] transition-colors text-xs font-medium"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Sub-brands */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Sub-brands
            </h3>
            <ul className="space-y-2.5">
              {BRANDS.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={brand.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                  >
                    <span>{brand.emoji}</span>
                    {brand.name === 'Carnelian Stores' ? 'All Collections' : brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Help
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Shipping & Returns', href: '/help/shipping' },
                { label: 'Size Guide', href: '/help/sizing' },
                { label: 'Track Order', href: '/account/orders' },
                { label: 'Contact Us', href: '/help/contact' },
                { label: 'FAQ', href: '/help/faq' },
              ].map((link) => (
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

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Stay in the loop
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              New drops, exclusive offers, and culture — weekly.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-10 rounded-lg border border-[var(--bg-border)] bg-[var(--bg-overlay)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]"
              />
              <button
                type="submit"
                className="h-10 rounded-lg gradient-carnelian text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[var(--bg-border)] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} Carnelian Stores. A Peridot Holdings company.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
