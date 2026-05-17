// ─────────────────────────────────────────────
//  Carnelian Stores — Core Types
// ─────────────────────────────────────────────

export type SubBrand = 'carnelian' | 'nerds-assemble' | 'clutch-nation' | 'field-notes' | 'the-vault'

export interface Brand {
  id: SubBrand
  name: string
  tagline: string
  description: string
  color: string
  accentColor: string
  gradient: string
  href: string
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  size?: string
  color?: string
  color_hex?: string
  style?: string
  price: number
  compare_at_price?: number
  inventory_quantity: number
  image_url?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  long_description?: string
  brand: SubBrand
  category: string
  subcategory?: string
  tags: string[]
  images: string[]
  thumbnail: string
  price: number
  compare_at_price?: number
  is_featured: boolean
  is_new: boolean
  is_on_sale: boolean
  rating: number
  review_count: number
  variants: ProductVariant[]
  related_product_ids: string[]
  upsell_product_ids: string[]
  created_at: string
  updated_at: string
  metadata?: Record<string, string>
}

export interface CartItem {
  id: string
  product_id: string
  variant_id?: string
  product: Product
  variant?: ProductVariant
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  discount_code?: string
  total: number
}

export interface Address {
  full_name: string
  line1: string
  line2?: string
  city: string
  state: string
  country: string
  postal_code: string
  phone?: string
}

export interface Order {
  id: string
  order_number: string
  user_id: string
  status: OrderStatus
  items: OrderItem[]
  shipping_address: Address
  billing_address: Address
  subtotal: number
  discount: number
  shipping_cost: number
  tax: number
  total: number
  payment_intent_id?: string
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export type OrderStatus =
  | 'pending'
  | 'payment_received'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  product_name: string
  variant_label?: string
  image_url: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  user_name: string
  user_avatar?: string
  rating: number
  title: string
  body: string
  verified_purchase: boolean
  helpful_count: number
  created_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  product: Product
  added_at: string
}

export interface DiscountCode {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_order_value?: number
  max_uses?: number
  current_uses: number
  expires_at?: string
  valid: boolean
}

export interface Notification {
  id: string
  user_id: string
  type: 'order_update' | 'price_drop' | 'back_in_stock' | 'promo' | 'review_reply'
  title: string
  body: string
  read: boolean
  link?: string
  created_at: string
}

export interface FilterState {
  brands: SubBrand[]
  categories: string[]
  priceMin: number
  priceMax: number
  sizes: string[]
  colors: string[]
  rating: number
  inStock: boolean
  onSale: boolean
  sortBy: SortOption
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'best-selling'

export interface AdminStats {
  total_revenue: number
  total_orders: number
  total_customers: number
  total_products: number
  revenue_growth: number
  orders_growth: number
  customers_growth: number
  recent_orders: Order[]
  top_products: { product: Product; units_sold: number; revenue: number }[]
}
