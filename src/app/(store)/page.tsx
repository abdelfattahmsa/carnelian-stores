import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Zap, Shield, RotateCcw, Star } from 'lucide-react'
import { BRANDS } from '@/lib/brands'
import { Button } from '@/components/ui/button'
import { BrandIcon } from '@/components/ui/brand-icons'

/* ─── Marquee ticker items ─── */
const TICKER = [
  'Carnelian', 'Nerds Assemble', 'Clutch Nation', 'Field Notes', 'The Vault',
  'Five Brands', 'One Philosophy', 'Built to Last', 'Premium Quality',
]

/* ─── Trust features ─── */
const FEATURES = [
  { icon: <Zap size={18} />, label: 'Fast Shipping', sub: 'Worldwide delivery' },
  { icon: <Shield size={18} />, label: 'Secure Checkout', sub: 'Stripe 256-bit SSL' },
  { icon: <RotateCcw size={18} />, label: '30-Day Returns', sub: 'Hassle-free policy' },
  { icon: <Star size={18} />, label: 'Quality First', sub: 'Every item curated' },
]

export default function HomePage() {
  return (
    <div>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden grain">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[var(--bg-base)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 50% 20%, rgba(224,168,0,0.09) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(217,48,37,0.06) 0%, transparent 60%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--bg-border)] bg-[var(--bg-raised)]/80 backdrop-blur-sm mb-10 animate-reveal-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-amber)] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brand-amber)]" />
            </span>
            <span className="text-xs font-medium text-[var(--text-secondary)] tracking-wide">
              Five curated sub-brands · One philosophy
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-semibold text-[var(--text-primary)] leading-none tracking-tighter mb-6 animate-reveal-up opacity-0"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7.5rem)',
              animationDelay: '80ms',
              animationFillMode: 'forwards',
            }}
          >
            Wear what{' '}
            <span className="text-gradient gradient-carnelian">endures.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-base sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed animate-reveal-up opacity-0"
            style={{ animationDelay: '160ms', animationFillMode: 'forwards' }}
          >
            Premium merch for the intellectually curious, the gear-obsessed,
            and the culture-driven. Built to last. Priced to own.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 animate-reveal-up opacity-0"
            style={{ animationDelay: '240ms', animationFillMode: 'forwards' }}
          >
            <Link href="/collections/carnelian">
              <Button
                size="lg"
                className="gradient-carnelian text-white font-semibold rounded-xl px-8 shadow-lg hover:shadow-xl hover:opacity-95 transition-all"
              >
                Shop Now
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="#brands">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 border-[var(--bg-border-hover)] hover:border-[var(--text-muted)] transition-all"
              >
                Explore Brands
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--bg-border-hover)] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">scroll</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MARQUEE TICKER
      ════════════════════════════════════════════ */}
      <div className="py-5 border-y border-[var(--bg-border)] overflow-hidden bg-[var(--bg-raised)]/50">
        <div className="flex animate-marquee whitespace-nowrap select-none">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 mx-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--brand-amber)]/40 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BRAND GRID
      ════════════════════════════════════════════ */}
      <section id="brands" className="py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-amber)] mb-4">
              The Collection
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--text-primary)] tracking-tight leading-tight">
                Five worlds.<br className="sm:hidden" /> One store.
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xs text-sm leading-relaxed">
                Each sub-brand is a curated universe with its own identity, products, and community.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={brand.href}
                className="group relative rounded-2xl overflow-hidden border border-[var(--bg-border)] bg-[var(--bg-raised)] hover:border-[var(--bg-border-hover)] product-card"
                style={
                  brand.id === 'carnelian'
                    ? { gridColumn: 'span 1' }
                    : undefined
                }
              >
                {/* Top gradient bar */}
                <div className="h-[3px]" style={{ background: brand.gradient }} />

                {/* Card body */}
                <div className="p-7">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: `${brand.color}12` }}
                  >
                    <BrandIcon id={brand.id} size={28} style={{ color: brand.color }} />
                  </div>

                  {/* Tagline */}
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: brand.color }}>
                    {brand.tagline}
                  </p>

                  {/* Name */}
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-3 tracking-tight">
                    {brand.name === 'Carnelian Stores' ? 'Carnelian Basics' : brand.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-6">
                    {brand.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all group-hover:gap-3"
                    style={{ color: brand.color }}
                  >
                    Shop collection
                    <ArrowRight size={13} />
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${brand.color}10, transparent)`,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURE STRIP
      ════════════════════════════════════════════ */}
      <div className="border-y border-[var(--bg-border)] bg-[var(--bg-raised)]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex flex-col items-center text-center gap-2.5">
              <span className="text-[var(--brand-amber)]">{f.icon}</span>
              <span className="text-xs font-semibold text-[var(--text-primary)] tracking-wide">{f.label}</span>
              <span className="text-[11px] text-[var(--text-muted)]">{f.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          EDITORIAL BANNER — Nerds Assemble
      ════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-10 sm:p-16 lg:p-20"
            style={{
              background: 'linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(255,101,132,0.08) 100%)',
              border: '1px solid rgba(108,99,255,0.2)',
            }}
          >
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  'radial-gradient(ellipse 70% 70% at 85% 50%, rgba(108,99,255,0.18) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-5">
                  <BrandIcon id="nerds-assemble" size={16} style={{ color: '#6C63FF' }} />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#6C63FF' }}>
                    Nerds Assemble
                  </p>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--text-primary)] tracking-tight leading-tight mb-5">
                  Gear up.<br />Geek out.
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                  Premium anime apparel, board games, trading cards, and collectibles
                  for the intellectually obsessed.
                </p>
              </div>
              <Link href="/collections/nerds-assemble" className="shrink-0">
                <Button
                  size="lg"
                  className="rounded-xl font-semibold text-white gap-2.5 px-8 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6584)' }}
                >
                  Explore Collection
                  <ArrowUpRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EDITORIAL BANNER — Clutch Nation
      ════════════════════════════════════════════ */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-10 sm:p-16 lg:p-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,77,0,0.10) 0%, rgba(255,184,0,0.07) 100%)',
              border: '1px solid rgba(255,77,0,0.18)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  'radial-gradient(ellipse 60% 70% at 15% 50%, rgba(255,77,0,0.18) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row-reverse items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-5">
                  <BrandIcon id="clutch-nation" size={16} style={{ color: '#FF4D00' }} />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#FF4D00' }}>
                    Clutch Nation
                  </p>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--text-primary)] tracking-tight leading-tight mb-5">
                  Drive<br />the culture.
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                  Automotive culture merch, racing guides, diecast models, and gear
                  for those who live at wide-open throttle.
                </p>
              </div>
              <Link href="/collections/clutch-nation" className="shrink-0">
                <Button
                  size="lg"
                  className="rounded-xl font-semibold text-white gap-2.5 px-8 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #FF4D00, #FFB800)' }}
                >
                  Explore Collection
                  <ArrowUpRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TWO SMALL BANNERS — Field Notes + The Vault
      ════════════════════════════════════════════ */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              id: 'field-notes',
              headline: 'Built for the journey.',
              sub: 'Outdoor adventure gear and trail apparel for those who measure life in miles.',
              color: '#2D6A4F',
              accent: '#74C69D',
              bg: 'linear-gradient(135deg, rgba(45,106,79,0.14), rgba(116,198,157,0.08))',
              border: 'rgba(45,106,79,0.25)',
            },
            {
              id: 'the-vault',
              headline: 'Objects worth keeping.',
              sub: 'Premium collectibles, art prints, and handcrafted objects selected for permanence.',
              color: '#8B6914',
              accent: '#C9A84C',
              bg: 'linear-gradient(135deg, rgba(139,105,20,0.14), rgba(201,168,76,0.08))',
              border: 'rgba(139,105,20,0.25)',
            },
          ].map((b) => {
            const brand = BRANDS.find((br) => br.id === b.id)!
            return (
              <Link
                key={b.id}
                href={`/collections/${b.id}`}
                className="group relative rounded-2xl overflow-hidden p-8 border product-card"
                style={{ background: b.bg, borderColor: b.border }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <BrandIcon id={b.id} size={14} style={{ color: b.color }} />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: b.color }}>
                    {brand.name}
                  </p>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] tracking-tight mb-3">
                  {b.headline}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-2">
                  {b.sub}
                </p>
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all group-hover:gap-3"
                  style={{ color: b.color }}
                >
                  Shop now <ArrowRight size={12} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SOCIAL PROOF / RATING
      ════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 border-t border-[var(--bg-border)] bg-[var(--bg-raised)]/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">

            {/* Rating block */}
            <div className="shrink-0 flex flex-col items-center sm:items-start gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} fill="#E0A800" stroke="none" />
                ))}
              </div>
              <div>
                <p className="font-display text-5xl font-semibold text-[var(--text-primary)] tracking-tight tabular-nums">4.9</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Based on 2,400+ reviews</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px self-stretch bg-[var(--bg-border)]" />
            <div className="sm:hidden h-px w-full bg-[var(--bg-border)]" />

            {/* Pull quotes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              {[
                { quote: 'Seriously the best quality merch I\'ve bought. The Carnelian basics are an absolute staple.', author: 'Jordan K.', brand: 'Carnelian' },
                { quote: 'Nerds Assemble has THE best anime drops. Ships fast, quality is insane.', author: 'Priya R.', brand: 'Nerds Assemble' },
              ].map((q) => (
                <div key={q.author} className="p-5 rounded-2xl border border-[var(--bg-border)] bg-[var(--bg-raised)]">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 italic">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{q.author}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{q.brand} customer</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
