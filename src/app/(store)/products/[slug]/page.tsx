import Image from 'next/image'
import { BrandIcon } from '@/components/ui/brand-icons'
import { notFound } from 'next/navigation'
import { Shield, RotateCcw, Truck, Heart } from 'lucide-react'
import { ProductActions } from '@/components/store/product-actions'
import { StarRating } from '@/components/ui/star-rating'
import { Badge } from '@/components/ui/badge'
import { getBrand } from '@/lib/brands'
import { formatPrice, calculateDiscount } from '@/lib/utils'

// Mock product for demonstration — replace with Supabase fetch
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
  const uniqueSizes = [...new Set(product.variants.map((v) => v.size).filter(Boolean))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ── Images ── */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-raised)]">
            <Image
              src={product.images[0] ?? product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bg-raised)] cursor-pointer ring-1 ring-[var(--bg-border)] hover:ring-[var(--brand-amber)] transition-all">
                <Image src={img} alt={`${product.name} view ${i + 2}`} fill className="object-cover" sizes="120px" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="space-y-6">
          {/* Brand + badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: brand.color }}>
              <BrandIcon id={brand.id} size={14} />
              {brand.name}
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-sm text-[var(--text-muted)]">{product.category}</span>
            {product.is_new && <Badge variant="new">New</Badge>}
            {product.is_on_sale && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed">{product.description}</p>
          </div>

          {/* Rating */}
          {product.review_count > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-[var(--text-secondary)]">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-[var(--brand-amber)]">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-lg text-[var(--text-muted)] line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          {/* Color selector */}
          {uniqueColors.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                Color
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.variants
                  .filter((v, i, arr) => arr.findIndex((x) => x.color === v.color) === i && v.color)
                  .map((v) => (
                    <div
                      key={v.id}
                      className="w-7 h-7 rounded-full ring-2 ring-[var(--bg-border)] hover:ring-[var(--brand-amber)] cursor-pointer transition-all"
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
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Size
                </p>
                <button className="text-xs text-[var(--brand-amber)] hover:underline">
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
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        v.inventory_quantity === 0
                          ? 'border-[var(--bg-border)] text-[var(--text-muted)] opacity-40 cursor-not-allowed line-through'
                          : 'border-[var(--bg-border)] text-[var(--text-secondary)] hover:border-[var(--brand-amber)] hover:text-[var(--text-primary)]'
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
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: <Truck size={16} />, label: 'Free over $75', sub: 'Worldwide shipping' },
              { icon: <RotateCcw size={16} />, label: '30-day returns', sub: 'Easy & free' },
              { icon: <Shield size={16} />, label: 'Secure payment', sub: 'Stripe 256-bit' },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-[var(--bg-raised)] border border-[var(--bg-border)]">
                <span className="text-[var(--brand-amber)]">{t.icon}</span>
                <span className="text-xs font-medium text-[var(--text-primary)]">{t.label}</span>
                <span className="text-xs text-[var(--text-muted)]">{t.sub}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {product.long_description && (
            <div className="border-t border-[var(--bg-border)] pt-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">About this product</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {product.long_description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
