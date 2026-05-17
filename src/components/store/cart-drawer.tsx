'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, Trash2, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export function CartDrawer() {
  const {
    items, isOpen, closeCart, removeItem, updateQuantity,
    subtotal, total, discountCode, discountAmount, applyDiscount, removeDiscount
  } = useCartStore()
  const [promoInput, setPromoInput] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)

  const sub = subtotal()
  const tot = total()

  async function handlePromoCode() {
    if (!promoInput.trim()) return
    setPromoLoading(true)
    try {
      const res = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoInput, subtotal: sub }),
      })
      const data = await res.json()
      if (data.valid) {
        applyDiscount(data.code, data.amount)
        toast.success(`Code applied! You saved ${formatPrice(data.amount)}`)
      } else {
        toast.error(data.message ?? 'Invalid promo code')
      }
    } catch {
      toast.error('Could not validate code')
    } finally {
      setPromoLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[var(--bg-base)] border-l border-[var(--bg-border)] flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--bg-border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--brand-amber)]" />
            <h2 className="font-display font-semibold text-[var(--text-primary)]">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="text-xs bg-[var(--bg-raised)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-[var(--text-muted)]" />
              <p className="text-[var(--text-secondary)]">Your cart is empty</p>
              <Button onClick={closeCart} variant="outline" size="sm">
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--bg-border)]">
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[var(--bg-overlay)] shrink-0">
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={closeCart}
                    className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--brand-amber)] transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  {item.variant && (
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {[item.variant.size, item.variant.color].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <p className="text-sm font-semibold text-[var(--brand-amber)] mt-1">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-[var(--bg-overlay)] rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm text-[var(--text-primary)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--brand-carnelian)] hover:bg-[var(--bg-overlay)] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--bg-border)] p-5 space-y-4">
            {/* Promo code */}
            {discountCode ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-raised)] border border-[var(--brand-amber)]/30">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[var(--brand-amber)]" />
                  <span className="text-sm font-medium text-[var(--brand-amber)]">{discountCode}</span>
                  <span className="text-xs text-[var(--text-secondary)]">applied</span>
                </div>
                <button onClick={removeDiscount} className="text-xs text-[var(--text-muted)] hover:text-[var(--brand-carnelian)]">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 h-9 rounded-lg border border-[var(--bg-border)] bg-[var(--bg-raised)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]"
                  onKeyDown={(e) => e.key === 'Enter' && handlePromoCode()}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePromoCode}
                  disabled={promoLoading}
                >
                  Apply
                </Button>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span>{formatPrice(sub)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[var(--brand-amber)]">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-muted)] text-xs">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t border-[var(--bg-border)] pt-2">
                <span className="text-[var(--text-primary)]">Total</span>
                <span className="text-[var(--brand-amber)]">{formatPrice(tot)}</span>
              </div>
            </div>

            <Link href="/checkout" onClick={closeCart} className="block">
              <Button size="lg" className="w-full gradient-carnelian text-white">
                Checkout
              </Button>
            </Link>
            <Link href="/cart" onClick={closeCart} className="block">
              <Button variant="ghost" size="sm" className="w-full">
                View full cart
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
