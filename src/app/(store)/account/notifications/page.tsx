import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Bell, Package, Tag, RotateCcw, Star } from 'lucide-react'

export default async function NotificationsPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const notifications: any[] = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Notifications</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Stay on top of your orders and offers</p>
        </div>
        {notifications.length > 0 && (
          <button className="text-sm text-[var(--brand-amber)] hover:underline">Mark all read</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] p-12 text-center">
          <Bell size={48} className="text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
          <p className="text-[var(--text-secondary)] font-medium">No notifications yet</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Order updates, price drops, and offers will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div key={n.id} className={`flex gap-4 p-4 rounded-xl border transition-colors ${n.read ? 'bg-[var(--bg-raised)] border-[var(--bg-border)]' : 'bg-[var(--brand-amber)]/5 border-[var(--brand-amber)]/20'}`}>
              <NotifIcon type={n.type} />
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">{n.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{n.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification preferences */}
      <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] p-6">
        <h2 className="font-display font-semibold text-[var(--text-primary)] mb-4">Preferences</h2>
        <div className="space-y-4">
          {[
            { label: 'Order updates', sub: 'Shipping and delivery notifications', default: true },
            { label: 'Price drop alerts', sub: 'When wishlist items go on sale', default: true },
            { label: 'Back in stock', sub: 'When items you want are available', default: true },
            { label: 'Promotions', sub: 'Exclusive offers and new collections', default: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{pref.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{pref.sub}</p>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors ${pref.default ? 'bg-[var(--brand-amber)]' : 'bg-[var(--bg-overlay)]'}`}>
                <div className={`w-5 h-5 rounded-full bg-white m-0.5 transition-transform ${pref.default ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NotifIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    order_update: <Package size={16} className="text-blue-400" />,
    price_drop: <Tag size={16} className="text-[var(--brand-amber)]" />,
    back_in_stock: <RotateCcw size={16} className="text-green-400" />,
    review_reply: <Star size={16} className="text-purple-400" />,
  }
  return (
    <div className="w-9 h-9 rounded-xl bg-[var(--bg-overlay)] flex items-center justify-center shrink-0">
      {icons[type] ?? <Bell size={16} className="text-[var(--text-muted)]" />}
    </div>
  )
}
