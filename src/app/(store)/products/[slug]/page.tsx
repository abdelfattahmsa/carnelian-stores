import Image from 'next/image'
import Link from 'next/link'
import { BrandIcon } from '@/components/ui/brand-icons'
import { notFound } from 'next/navigation'
import { Shield, RotateCcw, Truck, ArrowLeft } from 'lucide-react'
import { ProductActions } from '@/components/store/product-actions'
import { StarRating } from '@/components/ui/star-rating'
import { Badge } from '@/components/ui/badge'
import { getBrand } from '@/lib/brands'
import { formatPrice, calculateDiscount } from '@/lib/utils'

/* Mock — replace with Supabase fetch */
async function getProduct(slug: string) {
  return {
    id: '1',
    name: 'Sample Product',
    slug,
    description: 'A great product.',
    long_description: 'Full detailed description here.',
    brand: 'carnelian' as const,
    category: 'T-Shirts',
    subcategory: null,
    tags: ['basics', 'cotton'],
    images: ['/placeholder.jpg'],
    thumbnail: '/placeholder.jpg',
    price: 4900,
    compare_at_price: 6900,
    is_featured: true,
    is_new: true,
    is_on_sale: true,
    rating: 4.7,
    review_count: 124,
    variants: [
      { id: 'v1', product_id: '1', sku: 'SKU-001-S', size: 'S', color: 'Black', color_hex: '#000', price: 4900, inventory_quantity: 10 },
      { id: 'v2', product_id: '1', sku: 'SKU-001-M', size: 'M', color: 'Black', color_hex: '#000', price: 4900, inventory_quantity: 5 },
      { id: 'v3', product_id: '1', sku: 'SKU-001-L', size: 'L', color: 'Black', color_hex: '#000', price: 4900, inventory_quantity: 0 },
    ],
    related_product_ids: [],
    upsell_product_ids: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export default async function ProductPage(props: PageProps<'/products/[slug]'>) {
  const { slug } = await props.params
  const product = await getProduct(slug)
  if (!product) notFound()

  const brand = getBrand(product.brand)
  const discount = product.compare_at_price
    ? calculateDiscount(product.price, product.compare_at_price)
    : 0

  const uniqueColors = [...new Set(product.variants.map((v) => v.color).filter(Boolean))]
  const uniqueSizes  = [...new Set(product.variants.map((v) => v.size).filter(Boolean))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

      {/* Back link */}
      <Link
        href={`/collections/${product.brand}`}
        className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mb-8 group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to {brand.name === 'Carnelian Stores' ? 'Carnelian' : brand.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 xl:gap-16">

        {/* ── Images ── */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-raised)] border border-[var(--bg-border)]">
            <Image
              src={product.images[0] ?? product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            {/* Gradient fade at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bg-raised)] border border-[var(--bg-border)] cursor-pointer hover:border-[var(--brand-amber)] transition-colors"
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Product info ── */}
        <div className="space-y-6">

          {/* Brand + badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: brand.color }}>
              <BrandIcon id={brand.id} size={13} />
              {brand.name}
            </span>
            <span className="text-[var(--bg-border-hover)]">·</span>
            <span className="text-xs text-[var(--text-muted)]">{product.category}</span>
            {product.is_new && <Badge variant="new">New</Badge>}
            {product.is_on_sale && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          {/* Name */}
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] tracking-tight leading-tight mb-3">
              {product.name}
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          {product.review_count > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-[var(--text-secondary)] tabular-nums">
                {product.rating} <span className="text-[var(--text-muted)]">({product.review_count} reviews)</span>
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-2 border-b border-[var(--bg-border)]">
            <span className="font-display text-3xl font-bold text-[var(--brand-amber)] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-base text-[var(--text-muted)] line-through tabular-nums">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-sm font-semibold text-[var(--brand-carnelian)]">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Color selector */}
          {uniqueColors.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                Color — <span className="text-[var(--text-secondary)] normal-case font-normal tracking-normal text-xs">Black</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.variants
                  .filter((v, i, arr) => arr.findIndex((x) => x.color === v.color) === i && v.color)
                  .map((v) => (
                    <button
                      key={v.id}
                      className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-[var(--bg-base)] ring-[var(--brand-amber)] cursor-pointer transition-all hover:scale-105"
                      style={{ background: v.color_hex ?? '#ccc' }}
                      title={v.color ?? ''}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {uniqueSizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Size
                </p>
                <button className="text-xs text-[var(--brand-amber)] hover:underline underline-offset-2">
                  Size guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.variants
                  .filter((v, i, arr) => arr.findIndex((x) => x.size === v.size) === i && v.size)
                  .map((v) => (
                    <button
                      key={v.id}
                      disabled={v.inventory_quantity === 0}
                      className={`h-10 min-w-[2.75rem] px-3 rounded-xl text-sm font-medium border transition-all ${
                        v.inventory_quantity === 0
                          ? 'border-[var(--bg-border)] text-[var(--text-muted)] opacity-35 cursor-not-allowed line-through'
                          : 'border-[var(--bg-border)] text-[var(--text-secondary)] hover:border-[var(--brand-amber)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)]'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Add to cart & wishlist */}
          <ProductActions product={product as any} />

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck size={16} />, label: 'Free over $75', sub: 'Worldwide shipping' },
              { icon: <RotateCcw size={16} />, label: '30-day returns', sub: 'Easy & free' },
              { icon: <Shield size={16} />, label: 'Secure payment', sub: 'Stripe 256-bit' },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center text-center gap-1.5 p-3.5 rounded-xl bg-[var(--bg-raised)] border border-[var(--bg-border)]"
              >
                <span className="text-[var(--brand-amber)]">{t.icon}</span>
                <span className="text-[11px] font-semibold text-[var(--text-primary)] leading-tight">{t.label}</span>
                <span className="text-[10px] text-[var(--text-muted)] leading-tight">{t.sub}</span>
              </div>
            ))}
          </div>

          {/* Long description */}
          {product.long_description && (
            <div className="border-t border-[var(--bg-border)] pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                About this product
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {product.long_description}
              </p>
            </div>
          )}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[var(--bg-overlay)] text-[11px] text-[var(--text-muted)] border border-[var(--bg-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
