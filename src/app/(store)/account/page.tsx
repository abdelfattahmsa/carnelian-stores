import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Package, Heart, Star } from 'lucide-react'

export default async function AccountPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const stats = [
    { icon: Package, label: 'Orders', value: '0', sub: 'All time' },
    { icon: Heart, label: 'Wishlist', value: '0', sub: 'Items saved' },
    { icon: Star, label: 'Points', value: '0', sub: 'Loyalty points' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl gradient-carnelian flex items-center justify-center text-white text-2xl font-bold font-display">
          {user.firstName?.[0] ?? user.emailAddresses[0]?.emailAddress[0].toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
            {user.firstName ? `${user.firstName} ${user.lastName ?? ''}`.trim() : 'My Account'}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {user.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="p-5 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] text-center">
            <Icon size={20} className="text-[var(--brand-amber)] mx-auto mb-2" />
            <p className="text-2xl font-bold font-display text-[var(--text-primary)]">{value}</p>
            <p className="text-xs font-medium text-[var(--text-primary)]">{label}</p>
            <p className="text-xs text-[var(--text-muted)]">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders placeholder */}
      <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] p-6">
        <h2 className="font-display font-semibold text-[var(--text-primary)] mb-4">Recent Orders</h2>
        <div className="text-center py-8 text-[var(--text-muted)]">
          <Package size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No orders yet. Start shopping!</p>
        </div>
      </div>
    </div>
  )
}
