import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Package, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function OrdersPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  // In production: fetch from Supabase filtered by clerk_id
  const orders: any[] = []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Orders</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] p-12 text-center">
          <Package size={48} className="text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
          <p className="text-[var(--text-secondary)] font-medium">No orders yet</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">When you make a purchase, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] hover:border-[var(--brand-amber)]/30 transition-colors cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[var(--text-primary)]">#{order.order_number}</span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p className="text-sm text-[var(--text-muted)]">{formatDate(order.created_at)}</p>
              </div>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    payment_received: 'bg-blue-500/10 text-blue-400',
    processing: 'bg-blue-500/10 text-blue-400',
    shipped: 'bg-purple-500/10 text-purple-400',
    delivered: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400',
    refunded: 'bg-gray-500/10 text-gray-400',
  }
  const labels: Record<string, string> = {
    pending: 'Pending',
    payment_received: 'Payment Received',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] ?? 'bg-gray-500/10 text-gray-400'}`}>
      {labels[status] ?? status}
    </span>
  )
}
