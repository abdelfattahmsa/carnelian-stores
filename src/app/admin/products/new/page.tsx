'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BRANDS, CATEGORIES } from '@/lib/brands'
import { toast } from 'sonner'
import type { SubBrand } from '@/types'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<SubBrand>('carnelian')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [variants, setVariants] = useState([{ size: '', color: '', price: '', stock: '' }])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData(e.currentTarget)
      const data = {
        name: form.get('name'),
        slug: (form.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
        description: form.get('description'),
        long_description: form.get('long_description'),
        brand: selectedBrand,
        category: form.get('category'),
        base_price: Math.round(Number(form.get('price')) * 100),
        compare_at_price: form.get('compare_price') ? Math.round(Number(form.get('compare_price')) * 100) : null,
        is_featured: form.get('is_featured') === 'on',
        is_new: form.get('is_new') === 'on',
        tags,
        variants,
      }
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success('Product created successfully')
        router.push('/admin/products')
      } else {
        toast.error('Failed to create product')
      }
    } finally {
      setLoading(false)
    }
  }

  function addTag() {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] space-y-4">
          <h2 className="font-semibold text-[var(--text-primary)]">Basic Information</h2>
          <Input name="name" placeholder="Product name" required />
          <textarea
            name="description"
            placeholder="Short description"
            required
            rows={3}
            className="w-full rounded-xl border border-[var(--bg-border)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)] resize-none"
          />
          <textarea
            name="long_description"
            placeholder="Full description (optional)"
            rows={5}
            className="w-full rounded-xl border border-[var(--bg-border)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)] resize-none"
          />
        </div>

        {/* Brand & Category */}
        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] space-y-4">
          <h2 className="font-semibold text-[var(--text-primary)]">Brand & Category</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-2">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value as SubBrand)}
                className="w-full h-10 px-3 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-overlay)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]"
              >
                {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.emoji} {b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-2">Category</label>
              <select
                name="category"
                className="w-full h-10 px-3 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-overlay)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]"
              >
                {(CATEGORIES[selectedBrand] ?? []).map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] space-y-4">
          <h2 className="font-semibold text-[var(--text-primary)]">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-2">Price ($)</label>
              <Input name="price" type="number" step="0.01" min="0" placeholder="0.00" required />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-2">Compare at Price ($)</label>
              <Input name="compare_price" type="number" step="0.01" min="0" placeholder="0.00" />
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[var(--text-primary)]">Variants</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setVariants([...variants, { size: '', color: '', price: '', stock: '' }])}
            >
              <Plus size={13} /> Add Variant
            </Button>
          </div>
          {variants.map((v, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center p-3 rounded-xl bg-[var(--bg-overlay)] border border-[var(--bg-border)]">
              <Input placeholder="Size" value={v.size} onChange={(e) => { const nv = [...variants]; nv[i].size = e.target.value; setVariants(nv) }} />
              <Input placeholder="Color" value={v.color} onChange={(e) => { const nv = [...variants]; nv[i].color = e.target.value; setVariants(nv) }} />
              <Input placeholder="Price" type="number" value={v.price} onChange={(e) => { const nv = [...variants]; nv[i].price = e.target.value; setVariants(nv) }} />
              <div className="flex items-center gap-2">
                <Input placeholder="Stock" type="number" value={v.stock} onChange={(e) => { const nv = [...variants]; nv[i].stock = e.target.value; setVariants(nv) }} />
                {variants.length > 1 && (
                  <button type="button" onClick={() => setVariants(variants.filter((_, j) => j !== i))} className="text-[var(--text-muted)] hover:text-[var(--brand-carnelian)]">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] space-y-4">
          <h2 className="font-semibold text-[var(--text-primary)]">Tags</h2>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag…"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
            />
            <Button type="button" variant="outline" onClick={addTag}>Add</Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-overlay)] text-sm text-[var(--text-secondary)]">
                  {t}
                  <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="text-[var(--text-muted)] hover:text-[var(--brand-carnelian)]">
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Flags */}
        <div className="p-6 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] space-y-3">
          <h2 className="font-semibold text-[var(--text-primary)]">Flags</h2>
          {[
            { name: 'is_featured', label: 'Featured product (shown on homepage)' },
            { name: 'is_new', label: 'Mark as New (shows New badge)' },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name={name} className="w-4 h-4 rounded accent-[var(--brand-amber)]" />
              <span className="text-sm text-[var(--text-secondary)]">{label}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Creating…' : 'Create Product'}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
