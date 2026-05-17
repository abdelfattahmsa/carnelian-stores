import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const brand = searchParams.get('brand')
    const category = searchParams.get('category')
    const q = searchParams.get('q')
    const sort = searchParams.get('sort') ?? 'featured'
    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 24)
    const offset = (page - 1) * limit

    const supabase = await createClient()

    let query = supabase
      .from('products')
      .select('*, product_variants(*)', { count: 'exact' })
      .eq('is_active', true)

    if (brand && brand !== 'carnelian') query = query.eq('brand', brand)
    if (category) query = query.eq('category', category)
    if (searchParams.get('inStock') === 'true') {
      // subquery through variants — handled client-side for now
    }
    if (searchParams.get('onSale') === 'true') query = query.eq('is_on_sale', true)
    if (searchParams.get('featured') === 'true') query = query.eq('is_featured', true)

    if (q) {
      query = query.textSearch('name', q, { config: 'english' })
    }

    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')
    if (priceMin) query = query.gte('base_price', priceMin)
    if (priceMax) query = query.lte('base_price', priceMax)

    const ratingMin = searchParams.get('rating')
    if (ratingMin) query = query.gte('rating', ratingMin)

    switch (sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'price-asc':
        query = query.order('base_price', { ascending: true })
        break
      case 'price-desc':
        query = query.order('base_price', { ascending: false })
        break
      case 'rating':
        query = query.order('rating', { ascending: false })
        break
      default:
        query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })
    }

    query = query.range(offset, offset + limit - 1)

    const { data: products, count, error } = await query

    if (error) throw error

    return NextResponse.json({ products, total: count, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
