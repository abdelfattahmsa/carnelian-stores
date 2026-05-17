import { TrendingUp, ShoppingCart, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { BrandIcon } from '@/components/ui/brand-icons'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$0', change: '+0%', up: true, icon: TrendingUp, color: 'var(--brand-amber)' },
    { label: 'Total Orders', value: '0', change: '+0%', up: true, icon: ShoppingCart, color: '#6C63FF' },
    { label: 'Customers', value: '0', change: '+0%', up: true, icon: Users, color: '#2D6A4F' },
    { label: 'Products', value: '0', change: '0', up: true, icon: Package, color: '#FF4D00' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-[var(--text-secondary)] mt-1">Carnelian Stores — Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, change, up, icon: Icon, color }) => (
          <div key={label} className="p-5 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>
                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-[var(--text-primary)]">{value}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Brand breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)]">
          <h2 className="font-display font-semibold text-[var(--text-primary)] mb-5">Revenue by Brand</h2>
          <div className="space-y-4">
            {[
              { brand: 'Carnelian Basics', id: 'carnelian', color: '#E0A800', pct: 0, gradient: 'linear-gradient(90deg, #E0A800, #D93025)' },
              { brand: 'Nerds Assemble', id: 'nerds-assemble', color: '#6C63FF', pct: 0, gradient: 'linear-gradient(90deg, #6C63FF, #FF6584)' },
              { brand: 'Clutch Nation', id: 'clutch-nation', color: '#FF4D00', pct: 0, gradient: 'linear-gradient(90deg, #FF4D00, #FFB800)' },
              { brand: 'Field Notes', id: 'field-notes', color: '#2D6A4F', pct: 0, gradient: 'linear-gradient(90deg, #2D6A4F, #74C69D)' },
              { brand: 'The Vault', id: 'the-vault', color: '#8B6914', pct: 0, gradient: 'linear-gradient(90deg, #8B6914, #C9A84C)' },
            ].map(({ brand, id, color, pct, gradient }) => (
              <div key={brand}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <BrandIcon id={id} size={14} style={{ color }} />{brand}
                  </span>
                  <span className="text-[var(--text-muted)]">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--bg-overlay)]">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: gradient }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)]">
          <h2 className="font-display font-semibold text-[var(--text-primary)] mb-5">Recent Orders</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart size={40} className="text-[var(--text-muted)] mb-3 opacity-40" />
            <p className="text-sm text-[var(--text-secondary)]">No orders yet</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Add Product', href: '/admin/products/new', color: 'var(--brand-amber)' },
          { label: 'Create Discount', href: '/admin/discounts/new', color: '#6C63FF' },
          { label: 'View Orders', href: '/admin/orders', color: '#FF4D00' },
          { label: 'Manage Customers', href: '/admin/customers', color: '#2D6A4F' },
        ].map(({ label, href, color }) => (
          <a
            key={href}
            href={href}
            className="p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--bg-border)] hover:border-[var(--bg-overlay)] transition-colors text-sm font-medium text-center"
            style={{ color }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
