'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { getBrand } from '@/lib/brands'
import { useCartStore } from '@/store/cart'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
  onWishlist?: (productId: string) => void
  isWishlisted?: boolean
}

export function ProductCard({ product, className, onWishlist, isWishlisted }: ProductCardProps) {
  const { addItem } = useCartStore()
  const brand = getBrand(product.brand)
  const discount = product.compare_at_price
    ? calculateDiscount(product.price, product.compare_at_price)
    : 0

  return (
    <div className={cn('group relative product-card rounded-xl overflow-hidden bg-[var(--bg-raised)] border border-[var(--bg-border)]', className)}>
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-[var(--bg-overlay)]">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && <Badge variant="new">New</Badge>}
          {product.is_on_sale && discount > 0 && (
            <Badge variant="sale">-{discount}%</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); onWishlist?.(product.id) }}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--bg-base)]/80 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100',
            isWishlisted ? 'text-[var(--brand-carnelian)]' : 'text-[var(--text-secondary)] hover:text-[var(--brand-carnelian)]'
          )}
          aria-label="Add to wishlist"
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add */}
        <button
          onClick={(e) => { e.preventDefault(); addItem(product) }}
          className="absolute bottom-3 left-3 right-3 h-9 rounded-lg bg-[var(--brand-amber)] text-[var(--brand-black)] text-xs font-bold flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
        >
          <ShoppingCart size={13} />
          Quick Add
        </button>
      </Link>

      {/* Info */}
      <div className="p-3">
        {/* Brand tag */}
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-xs" style={{ color: brand.color }}>{brand.emoji}</span>
          <span className="text-xs text-[var(--text-muted)] font-medium">{brand.name === 'Carnelian Stores' ? 'Carnelian' : brand.name}</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 hover:text-[var(--brand-amber)] transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {product.review_count > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-[var(--text-muted)]">({product.review_count})</span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-[var(--text-primary)] text-sm">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-[var(--text-muted)] line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
