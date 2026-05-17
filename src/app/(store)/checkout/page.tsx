'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, subtotal, total, discountCode, discountAmount, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const sub = subtotal()
  const tot = total()
  const shipping = sub >= 7500 ? 0 : 999

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product_id,
            variantId: i.variant_id,
            quantity: i.quantity,
            price: i.price,
            name: i.product.name,
          })),
          discountCode,
        }),
      })
      const { url } = await res.json()
      if (url) {
        window.location.href = url
      } else {
        toast.error('Failed to create checkout session')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-8">
        <Lock size={16} className="text-[var(--brand-amber)]" />
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Secure Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <form onSubmit={handleCheckout} className="lg:col-span-3 space-y-8">
          {/* Contact */}
          <section className="space-y-4">
            <h2 className="font-display font-semibold text-[var(--text-primary)]">Contact</h2>
            <Input type="email" placeholder="Email address" required />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-[var(--text-secondary)]">Email me with order updates and offers</span>
            </label>
          </section>

          {/* Shipping */}
          <section className="space-y-4">
            <h2 className="font-display font-semibold text-[var(--text-primary)]">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="First name" required />
              <Input placeholder="Last name" required />
            </div>
            <Input placeholder="Address line 1" required />
            <Input placeholder="Apartment, suite, etc. (optional)" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="City" required />
              <Input placeholder="Postal code" required />
            </div>
            <Input placeholder="Country" required defaultValue="United Arab Emirates" />
            <Input type="tel" placeholder="Phone number" />
          </section>

          {/* Payment */}
          <section className="space-y-4">
            <h2 className="font-display font-semibold text-[var(--text-primary)]">Payment</h2>
            <div className="p-4 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-raised)]">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard size={16} className="text-[var(--brand-amber)]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  You&apos;ll be redirected to Stripe&apos;s secure payment page
                </span>
              </div>
              <div className="flex gap-2">
                {['Visa', 'Mastercard', 'Apple Pay', 'Google Pay', 'AMEX'].map((p) => (
                  <span key={p} className="text-xs text-[var(--text-muted)] bg-[var(--bg-overlay)] px-2 py-1 rounded border border-[var(--bg-border)]">{p}</span>
                ))}
              </div>
            </div>
          </section>

          <Button
            type="submit"
            size="xl"
            disabled={loading}
            className="w-full gradient-carnelian text-white font-bold"
          >
            <Lock size={16} />
            {loading ? 'Processing…' : `Pay ${formatPrice(tot + shipping)}`}
          </Button>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] p-6">
            <h2 className="font-display font-semibold text-[var(--text-primary)] mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-[var(--bg-overlay)] shrink-0">
                    <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 gradient-carnelian rounded-full text-white text-xs flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2">{item.product.name}</p>
                    {item.variant && (
                      <p className="text-xs text-[var(--text-muted)]">{[item.variant.size, item.variant.color].filter(Boolean).join(' · ')}</p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)] shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t border-[var(--bg-border)] pt-4">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span>{formatPrice(sub)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[var(--brand-amber)]">
                  <span>Discount ({discountCode})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-400' : ''}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-[var(--bg-border)] pt-2">
                <span className="text-[var(--text-primary)]">Total</span>
                <span className="text-[var(--brand-amber)]">{formatPrice(tot + shipping)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
