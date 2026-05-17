import Link from 'next/link'
import { ArrowRight, Zap, Shield, RotateCcw, Star } from 'lucide-react'
import { BRANDS } from '@/lib/brands'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E0C] via-[#1A1A17] to-[#0E0E0C]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(224,168,0,0.15), transparent)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--bg-border)] bg-[var(--bg-raised)] mb-8">
            <span className="w-2 h-2 rounded-full gradient-carnelian" />
            <span className="text-xs text-[var(--text-secondary)] font-medium">
              Five curated sub-brands. One philosophy.
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-semibold text-[var(--text-primary)] leading-tight mb-6">
            Wear what{' '}
            <span className="text-gradient gradient-carnelian">endures.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium merch for the intellectually curious, the gear-obsessed, and the culture-driven.
            Built to last. Priced to own.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/collections/carnelian">
              <Button size="xl" className="gradient-carnelian text-white font-semibold">
                Shop Now
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#sub-brands">
              <Button size="xl" variant="outline">
                Explore Sub-brands
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sub-brands ── */}
      <section id="sub-brands" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-3">
              Five worlds. One store.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Each sub-brand is a curated universe with its own identity, products, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANDS.filter((b) => b.id !== 'carnelian').map((brand) => (
              <Link
                key={brand.id}
                href={brand.href}
                className="group relative rounded-2xl overflow-hidden border border-[var(--bg-border)] bg-[var(--bg-raised)] hover:border-[var(--bg-overlay)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="h-2 w-full"
                  style={{ background: brand.gradient }}
                />
                <div className="p-6">
                  <div className="text-4xl mb-4">{brand.emoji}</div>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {brand.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                    style={{ color: brand.color }}
                  >
                    Shop {brand.name}
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}

            {/* Main brand card */}
            <Link
              href="/collections/carnelian"
              className="group relative rounded-2xl overflow-hidden border border-[var(--bg-border)] bg-[var(--bg-raised)] hover:border-[var(--bg-overlay)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:col-span-2 lg:col-span-1"
            >
              <div className="h-2 w-full gradient-carnelian" />
              <div className="p-6">
                <div className="text-4xl mb-4">🔴</div>
                <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
                  Carnelian Basics
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Anti-trend premium essentials. High-quality naturals and technical materials.
                  Timeless. Consistent. Built to outlast.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-amber)] transition-all group-hover:gap-3">
                  Shop Basics
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 px-4 border-y border-[var(--bg-border)] bg-[var(--bg-raised)]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { icon: <Zap size={22} className="text-[var(--brand-amber)]" />, label: 'Fast Shipping', sub: 'Worldwide delivery' },
            { icon: <Shield size={22} className="text-[var(--brand-amber)]" />, label: 'Secure Checkout', sub: 'Stripe-powered, 256-bit SSL' },
            { icon: <RotateCcw size={22} className="text-[var(--brand-amber)]" />, label: '30-Day Returns', sub: 'Hassle-free policy' },
            { icon: <Star size={22} className="text-[var(--brand-amber)]" />, label: 'Quality First', sub: 'Every item curated' },
          ].map((feat) => (
            <div key={feat.label} className="flex flex-col items-center text-center gap-2">
              {feat.icon}
              <span className="text-sm font-semibold text-[var(--text-primary)]">{feat.label}</span>
              <span className="text-xs text-[var(--text-muted)]">{feat.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand banner (Nerds Assemble) ── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden relative p-10 sm:p-16 flex flex-col sm:flex-row items-center justify-between gap-8"
            style={{ background: 'linear-gradient(135deg, #6C63FF22, #FF658422)', border: '1px solid #6C63FF33' }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6C63FF] mb-3">
                🎲 Nerds Assemble
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Gear up. Geek out.
              </h2>
              <p className="text-[var(--text-secondary)] max-w-md leading-relaxed">
                Premium anime apparel, board games, trading cards, and collectibles for the intellectually obsessed.
              </p>
            </div>
            <Link href="/collections/nerds-assemble" className="shrink-0">
              <Button
                size="lg"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6584)' }}
                className="text-white font-semibold"
              >
                Explore the Collection
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand banner (Clutch Nation) ── */}
      <section className="py-8 px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden relative p-10 sm:p-16 flex flex-col sm:flex-row items-center justify-between gap-8"
            style={{ background: 'linear-gradient(135deg, #FF4D0022, #FFB80022)', border: '1px solid #FF4D0033' }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FF4D00] mb-3">
                🏎️ Clutch Nation
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Drive the culture.
              </h2>
              <p className="text-[var(--text-secondary)] max-w-md leading-relaxed">
                Automotive culture merch, racing guides, diecast models, and gear for those who live at wide-open throttle.
              </p>
            </div>
            <Link href="/collections/clutch-nation" className="shrink-0">
              <Button
                size="lg"
                style={{ background: 'linear-gradient(135deg, #FF4D00, #FFB800)' }}
                className="text-white font-semibold"
              >
                Explore the Collection
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="py-16 px-4 bg-[var(--bg-raised)] border-t border-[var(--bg-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">Trusted by collectors worldwide</p>
          <div className="flex justify-center gap-1 mb-3">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={20} fill="#E0A800" stroke="#E0A800" />
            ))}
          </div>
          <p className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">4.9 / 5.0</p>
          <p className="text-sm text-[var(--text-secondary)]">Based on 2,400+ verified reviews</p>
        </div>
      </section>
    </div>
  )
}
