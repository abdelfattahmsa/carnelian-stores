import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Tag, Bell, Settings, BarChart3, ChevronRight, LogOut
} from 'lucide-react'

const ADMIN_NAV = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/discounts', icon: Tag, label: 'Discounts' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
]

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim())

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const email = user.emailAddresses[0]?.emailAddress ?? ''
  if (ADMIN_EMAILS.length > 0 && !ADMIN_EMAILS.includes(email)) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-[var(--bg-border)] bg-[var(--bg-raised)] flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-[var(--bg-border)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-carnelian flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Carnelian</p>
              <p className="text-xs text-[var(--text-muted)]">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors group"
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[var(--bg-border)]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full gradient-carnelian flex items-center justify-center text-white text-xs font-bold">
              {user.firstName?.[0] ?? email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[var(--text-primary)] truncate">
                {user.firstName ?? 'Admin'}
              </p>
              <p className="text-xs text-[var(--text-muted)] truncate">{email}</p>
            </div>
            <LogOut size={14} className="text-[var(--text-muted)] cursor-pointer hover:text-[var(--brand-carnelian)]" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-[var(--bg-base)]">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
