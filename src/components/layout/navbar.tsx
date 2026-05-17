'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ShoppingCart, Search, Menu, X, Bell, User } from 'lucide-react'
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
  const { isSignedIn } = useAuth()
  const { itemCount, openCart } = useCartStore()
  const count = itemCount()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--bg-border)] bg-[var(--bg-base)]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg gradient-carnelian flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">C</span>
            </div>
            <span className="font-display font-semibold text-[var(--text-primary)] hidden sm:block">
              Carnelian
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={brand.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                  pathname.includes(brand.id)
                    ? 'text-[var(--text-primary)] bg-[var(--bg-raised)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)]'
                )}
              >
                <BrandIcon id={brand.id} size={14} style={{ color: brand.color }} />
                {brand.name === 'Carnelian Stores' ? 'All' : brand.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {isSignedIn ? (
              <>
                <Link
                  href="/account/notifications"
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors relative"
                >
                  <Bell size={20} />
                </Link>
                <UserButton />
              </>
            ) : (
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  <User size={16} />
                  <span className="hidden sm:inline">Sign in</span>
                </Button>
              </Link>
            )}

            <button
              onClick={() => openCart()}
              className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 gradient-carnelian rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            <button
              className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <form action="/search" className="flex gap-2">
              <input
                autoFocus
                name="q"
                placeholder="Search products, brands, categories…"
                className="flex-1 h-10 rounded-lg border border-[var(--bg-border)] bg-[var(--bg-raised)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]"
              />
              <Button size="sm" type="submit">Search</Button>
            </form>
          </div>
        )}

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--bg-border)] pt-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {BRANDS.map((brand) => (
                <Link
                  key={brand.id}
                  href={brand.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors flex items-center gap-2"
                >
                  <BrandIcon id={brand.id} size={14} style={{ color: brand.color }} />
                  {brand.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
