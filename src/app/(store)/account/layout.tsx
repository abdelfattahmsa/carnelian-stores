import Link from 'next/link'
import { User, Package, Heart, Bell, MapPin, Settings, LogOut } from 'lucide-react'

const NAV = [
  { href: '/account', icon: User, label: 'Profile' },
  { href: '/account/orders', icon: Package, label: 'Orders' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account/notifications', icon: Bell, label: 'Notifications' },
  { href: '/account/addresses', icon: MapPin, label: 'Addresses' },
  { href: '/account/settings', icon: Settings, label: 'Settings' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <nav className="space-y-1">
            {NAV.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand-carnelian)] hover:bg-[var(--bg-raised)] transition-colors">
              <LogOut size={16} />
              Sign Out
            </button>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
