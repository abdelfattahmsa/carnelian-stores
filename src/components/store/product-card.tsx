'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { BrandIcon } from '@/components/ui/brand-icons'
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
    <div className={cn('group relative product-card rounded-2xl overflow-hidden bg-[var(--bg-raised)] border border-[var(--bg-border)] hover:border-[var(--bg-border-hover)]', className)}>

      {/* ── Image container ── */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-[var(--bg-overlay)]">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Dark overlay on hover for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_new && <Badge variant="new">New</Badge>}
          {product.is_on_sale && discount > 0 && (
            <Badge variant="sale">-{discount}%</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); onWishlist?.(product.id) }}
          className={cn(
            'absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[var(--bg-base)]/70 backdrop-blur-sm flex items-center justify-center transition-all duration-200',
            'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100',
            isWishlisted
              ? 'text-[var(--brand-carnelian)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--brand-carnelian)]'
          )}
          aria-label="Add to wishlist"
        >
          <Heart size={13} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add — slides up from bottom */}
        <button
          onClick={(e) => { e.preventDefault(); addItem(product) }}
          className="absolute bottom-0 left-0 right-0 z-10 py-3 bg-[var(--brand-amber)] text-[var(--brand-black)] text-xs font-bold flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
        >
          <ShoppingCart size={13} />
          Quick Add
        </button>
      </Link>

      {/* ── Info ── */}
      <div className="p-3.5">
        {/* Brand */}
        <div className="flex items-center gap-1.5 mb-2">
          <BrandIcon id={brand.id} size={11} style={{ color: brand.color }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: brand.color }}>
            {brand.name === 'Carnelian Stores' ? 'Carnelian' : brand.name}
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 hover:text-[var(--brand-amber)] transition-colors leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        {product.review_count > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-[11px] text-[var(--text-muted)] tabular-nums">({product.review_count})</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-[var(--text-primary)] tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-[11px] text-[var(--text-muted)] line-through tabular-nums">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
