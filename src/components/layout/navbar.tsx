'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShoppingCart, Search, X, Bell, User, ArrowRight } from 'lucide-react'
import { useAuth, UserButton } from '@clerk/nextjs'
import { BrandIcon } from '@/components/ui/brand-icons'
import { useCartStore } from '@/store/cart'
import { BRANDS } from '@/lib/brands'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn } = useAuth()
  const { itemCount, openCart } = useCartStore()
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-[var(--bg-border)]'
            : 'bg-[var(--bg-base)]/80 border-b border-transparent backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 rounded-lg gradient-carnelian flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm font-display">C</span>
              </div>
              <span className="font-display font-semibold text-[var(--text-primary)] tracking-tight hidden sm:block">
                Carnelian
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {BRANDS.map((brand) => {
                const isActive = pathname.startsWith(brand.href)
                return (
                  <Link
                    key={brand.id}
                    href={brand.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-widest transition-all duration-200',
                      isActive
                        ? 'text-[var(--text-primary)] bg-[var(--bg-raised)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-raised)]/60'
                    )}
                  >
                    <span
                      className={cn('w-1.5 h-1.5 rounded-full shrink-0 transition-opacity', isActive ? 'opacity-100' : 'opacity-50')}
                      style={{ background: brand.color }}
                    />
                    {brand.name === 'Carnelian Stores' ? 'All' : brand.name.split(' ')[0]}
                  </Link>
                )
              })}
            </nav>

            {/* ── Actions ── */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="p-2.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-all"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              {isSignedIn ? (
                <>
                  <Link
                    href="/account/notifications"
                    className="p-2.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-all"
                  >
                    <Bell size={17} />
                  </Link>
                  <div className="ml-1">
                    <UserButton />
                  </div>
                </>
              ) : (
                <Link href="/sign-in" className="hidden sm:flex ml-1">
                  <Button variant="ghost" size="sm">
                    <User size={15} />
                    <span className="text-xs tracking-wide">Sign in</span>
                  </Button>
                </Link>
              )}

              <button
                onClick={() => openCart()}
                className="relative p-2.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-all ml-0.5"
                aria-label="Cart"
              >
                <ShoppingCart size={17} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 gradient-carnelian rounded-full text-white text-[9px] flex items-center justify-center font-bold tabular-nums leading-none">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                className="lg:hidden p-2.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-all ml-0.5"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <div className="space-y-[5px]">
                  <span className="block w-5 h-[1.5px] bg-current transition-all" />
                  <span className="block w-3 h-[1.5px] bg-current transition-all" />
                </div>
              </button>
            </div>
          </div>

          {/* ── Search dropdown ── */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form action="/search" className="flex gap-2">
                <input
                  autoFocus
                  name="q"
                  placeholder="Search products, brands, categories…"
                  className="flex-1 h-10 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-overlay)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-amber)] transition-all"
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                />
                <Button size="sm" type="submit" className="rounded-xl px-5">Search</Button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel slides in from right */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-[var(--bg-base)] border-l border-[var(--bg-border)] flex flex-col animate-reveal-scale shadow-2xl">
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--bg-border)] shrink-0">
              <span className="font-display font-semibold text-[var(--text-primary)] text-sm tracking-tight">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Brand nav */}
            <nav className="flex-1 overflow-y-auto p-5 space-y-2">
              {BRANDS.map((brand) => (
                <Link
                  key={brand.id}
                  href={brand.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--bg-border)] hover:border-[var(--bg-border-hover)] bg-[var(--bg-raised)] hover:bg-[var(--bg-overlay)] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${brand.color}18` }}
                    >
                      <BrandIcon id={brand.id} size={20} style={{ color: brand.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-sm">{brand.name}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{brand.tagline}</p>
                    </div>
                  </div>
                  <ArrowRight
                    size={15}
                    className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </Link>
              ))}
            </nav>

            {/* Panel footer */}
            <div className="p-5 border-t border-[var(--bg-border)] space-y-2 shrink-0">
              {!isSignedIn && (
                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="block">
                  <Button className="w-full gradient-carnelian text-white" size="default">
                    Sign in
                  </Button>
                </Link>
              )}
              <Link href="/search" onClick={() => setMobileOpen(false)} className="block">
                <Button className="w-full" variant="ghost" size="default">
                  <Search size={15} />
                  Search all products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
