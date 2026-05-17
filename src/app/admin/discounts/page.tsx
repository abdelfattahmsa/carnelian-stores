import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createAdminClient } from '@/lib/supabase/server'
import { formatDate, formatPrice } from '@/lib/utils'

export default async function AdminDiscountsPage() {
  const supabase = await createAdminClient()
  const { data: codes } = await supabase
    .from('discount_codes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Discount Codes</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Create and manage promo codes</p>
        </div>
        <Link href="/admin/discounts/new">
          <Button><Plus size={16} />New Code</Button>
        </Link>
      </div>

      <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--bg-border)]">
              {['Code', 'Type', 'Value', 'Uses', 'Min Order', 'Expires', 'Status'].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--bg-border)]">
            {!codes?.length ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center text-[var(--text-muted)]">
                  No discount codes yet. <Link href="/admin/discounts/new" className="text-[var(--brand-amber)] hover:underline">Create one →</Link>
                </td>
              </tr>
            ) : (
              codes.map((code: any) => (
                <tr key={code.id} className="hover:bg-[var(--bg-overlay)] transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-[var(--brand-amber)]">{code.code}</td>
                  <td className="px-5 py-4 text-[var(--text-secondary)] capitalize">{code.type}</td>
                  <td className="px-5 py-4 text-[var(--text-primary)]">
                    {code.type === 'percentage' ? `${code.value}%` : formatPrice(code.value)}
                  </td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">
                    {code.current_uses}{code.max_uses ? ` / ${code.max_uses}` : ''}
                  </td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">
                    {code.min_order_value ? formatPrice(code.min_order_value) : '—'}
                  </td>
                  <td className="px-5 py-4 text-[var(--text-muted)]">
                    {code.expires_at ? formatDate(code.expires_at) : 'Never'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${code.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {code.is_active ? 'Active' : 'Inactive'}
                    </span>
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
