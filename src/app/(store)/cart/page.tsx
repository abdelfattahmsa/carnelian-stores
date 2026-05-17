'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total, discountAmount } = useCartStore()
  const sub = subtotal()
  const tot = total()
  const shipping = sub >= 7500 ? 0 : 999

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="text-[var(--text-muted)] mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">Your cart is empty</h1>
        <p className="text-[var(--text-secondary)] mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/"><Button size="lg">Start Shopping</Button></Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">Cart</h1>
        <span className="text-[var(--text-muted)] text-sm">{items.length} items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-5 p-5 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)]">
              <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[var(--bg-overlay)] shrink-0">
                <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.slug}`} className="font-semibold text-[var(--text-primary)] hover:text-[var(--brand-amber)] transition-colors">
                  {item.product.name}
                </Link>
                {item.variant && (
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    {[item.variant.size, item.variant.color].filter(Boolean).join(' · ')}
                  </p>
                )}
                <p className="text-lg font-bold text-[var(--brand-amber)] mt-1">{formatPrice(item.price)}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 bg-[var(--bg-overlay)] rounded-xl p-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors">
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors">
                      <Plus size={13} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--brand-carnelian)] hover:bg-[var(--bg-overlay)] transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] p-6 space-y-5">
            <h2 className="font-display font-semibold text-[var(--text-primary)]">Order Summary</h2>

            {sub < 7500 && (
              <div className="p-3 rounded-xl bg-[var(--brand-amber)]/10 border border-[var(--brand-amber)]/20">
                <p className="text-xs text-[var(--brand-amber)] font-medium">
                  Add {formatPrice(7500 - sub)} more for free shipping!
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-[var(--bg-overlay)]">
                  <div className="h-full rounded-full gradient-carnelian transition-all" style={{ width: `${Math.min((sub / 7500) * 100, 100)}%` }} />
                </div>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span className="text-[var(--text-primary)]">{formatPrice(sub)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[var(--brand-amber)]">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-[var(--text-primary)]'}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Tax</span>
                <span className="text-[var(--text-muted)]">Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-[var(--bg-border)] pt-3">
                <span className="text-[var(--text-primary)]">Total</span>
                <span className="text-[var(--brand-amber)]">{formatPrice(tot + shipping)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full gradient-carnelian text-white font-semibold">
                Proceed to Checkout
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-4">
              {['Visa', 'MC', 'Apple Pay', 'Google Pay'].map((p) => (
                <span key={p} className="text-xs text-[var(--text-muted)] bg-[var(--bg-overlay)] px-2 py-1 rounded">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
