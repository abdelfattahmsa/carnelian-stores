import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default async function WishlistPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  // In production: fetch from Supabase
  const items: any[] = []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Wishlist</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Items you&apos;ve saved for later</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] p-12 text-center">
          <Heart size={48} className="text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
          <p className="text-[var(--text-secondary)] font-medium">Your wishlist is empty</p>
          <p className="text-sm text-[var(--text-muted)] mt-1 mb-6">
            Heart products you love and they&apos;ll appear here.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl gradient-carnelian text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Wishlist product cards rendered here */}
        </div>
      )}
    </div>
  )
}
