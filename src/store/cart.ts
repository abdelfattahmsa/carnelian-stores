'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, Product, ProductVariant } from '@/types'
import { toast } from 'sonner'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  discountCode: string | undefined
  discountAmount: number

  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  applyDiscount: (code: string, amount: number) => void
  removeDiscount: () => void

  subtotal: () => number
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      discountCode: undefined,
      discountAmount: 0,

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.product_id === product.id &&
              (variant ? i.variant_id === variant.id : !i.variant_id)
          )

          if (existingIndex >= 0) {
            const items = [...state.items]
            items[existingIndex] = {
              ...items[existingIndex],
              quantity: items[existingIndex].quantity + quantity,
            }
            toast.success('Cart updated')
            return { items }
          }

          const newItem: CartItem = {
            id: `${product.id}-${variant?.id ?? 'base'}-${Date.now()}`,
            product_id: product.id,
            variant_id: variant?.id,
            product,
            variant,
            quantity,
            price: variant?.price ?? product.price,
          }
          toast.success(`${product.name} added to cart`)
          return { items: [...state.items, newItem], isOpen: true }
        })
      },

      removeItem: (itemId) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== itemId) }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [], discountCode: undefined, discountAmount: 0 }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      applyDiscount: (code, amount) => set({ discountCode: code, discountAmount: amount }),
      removeDiscount: () => set({ discountCode: undefined, discountAmount: 0 }),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      total: () => Math.max(0, get().subtotal() - get().discountAmount),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'carnelian-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        discountCode: state.discountCode,
        discountAmount: state.discountAmount,
      }),
    }
  )
)
