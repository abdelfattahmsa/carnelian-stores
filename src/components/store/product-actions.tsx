'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react'
import { Product, ProductVariant } from '@/types'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCartStore()
  const [qty, setQty] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants[0]
  )

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedVariant)
    }
  }

  async function handleShare() {
    try {
      await navigator.share({ title: product.name, url: window.location.href })
    } catch {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }

  const inStock = selectedVariant
    ? selectedVariant.inventory_quantity > 0
    : product.variants.some((v) => v.inventory_quantity > 0)

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
          Quantity
        </p>
        <div className="inline-flex items-center gap-1 bg-[var(--bg-raised)] rounded-xl p-1 border border-[var(--bg-border)]">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-semibold text-[var(--text-primary)]">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Stock indicator */}
      {selectedVariant && (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs text-[var(--text-secondary)]">
            {inStock
              ? selectedVariant.inventory_quantity <= 5
                ? `Only ${selectedVariant.inventory_quantity} left`
                : 'In stock'
              : 'Out of stock'}
          </span>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex gap-3">
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={!inStock}
          className="flex-1 gradient-carnelian text-white font-semibold"
        >
          <ShoppingCart size={18} />
          {inStock ? 'Add to Cart' : 'Sold Out'}
        </Button>
        <button
          className="w-12 h-12 flex items-center justify-center rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)] text-[var(--text-secondary)] hover:text-[var(--brand-carnelian)] hover:border-[var(--brand-carnelian)] transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </button>
        <button
          onClick={handleShare}
          className="w-12 h-12 flex items-center justify-center rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)] text-[var(--text-secondary)] hover:text-[var(--brand-amber)] hover:border-[var(--brand-amber)] transition-colors"
          aria-label="Share"
        >
          <Share2 size={18} />
        </button>
      </div>

      {!inStock && (
        <Button variant="outline" size="lg" className="w-full">
          Notify me when back in stock
        </Button>
      )}
    </div>
  )
}
