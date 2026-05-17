import Link from 'next/link'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRANDS } from '@/lib/brands'

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Products</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Manage all store products</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus size={16} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 h-10 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)] flex-1 min-w-48">
          <Search size={15} className="text-[var(--text-muted)]" />
          <input placeholder="Search products…" className="bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none flex-1" />
        </div>
        <select className="h-10 px-3 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)] text-sm text-[var(--text-primary)] focus:outline-none">
          <option value="">All Brands</option>
          {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select className="h-10 px-3 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)] text-sm text-[var(--text-primary)] focus:outline-none">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--bg-border)]">
              {['Product', 'Brand', 'Category', 'Price', 'Stock', 'Status', ''].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="px-5 py-16 text-center text-[var(--text-muted)]">
                No products yet. <Link href="/admin/products/new" className="text-[var(--brand-amber)] hover:underline">Add your first product →</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
