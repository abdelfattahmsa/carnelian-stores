import { createAdminClient } from '@/lib/supabase/server'
import { formatDate, formatPrice } from '@/lib/utils'

export default async function AdminOrdersPage() {
  const supabase = await createAdminClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Orders</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">{orders?.length ?? 0} recent orders</p>
      </div>

      <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--bg-border)]">
              {['Order', 'Customer', 'Date', 'Total', 'Status', ''].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--bg-border)]">
            {!orders?.length ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center text-[var(--text-muted)]">No orders yet</td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-[var(--bg-overlay)] transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-[var(--brand-amber)]">#{order.order_number}</td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">{order.profiles?.full_name ?? 'Guest'}</td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">{formatDate(order.created_at)}</td>
                  <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-4">
                    <a href={`/admin/orders/${order.id}`} className="text-xs text-[var(--brand-amber)] hover:underline">View →</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending: { label: 'Pending', cls: 'bg-yellow-500/10 text-yellow-400' },
    payment_received: { label: 'Paid', cls: 'bg-blue-500/10 text-blue-400' },
    processing: { label: 'Processing', cls: 'bg-blue-500/10 text-blue-400' },
    shipped: { label: 'Shipped', cls: 'bg-purple-500/10 text-purple-400' },
    delivered: { label: 'Delivered', cls: 'bg-green-500/10 text-green-400' },
    cancelled: { label: 'Cancelled', cls: 'bg-red-500/10 text-red-400' },
    refunded: { label: 'Refunded', cls: 'bg-gray-500/10 text-gray-400' },
  }
  const { label, cls } = map[status] ?? { label: status, cls: 'bg-gray-500/10 text-gray-400' }
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>
}
