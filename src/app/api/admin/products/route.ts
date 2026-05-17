import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

async function requireAdmin() {
  const user = await currentUser()
  if (!user) return null
  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim())
  const email = user.emailAddresses[0]?.emailAddress ?? ''
  if (adminEmails.length > 0 && !adminEmails.includes(email)) return null
  return user
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const supabase = await createAdminClient()

    const slug = slugify(body.name)

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name: body.name,
        slug,
        description: body.description,
        long_description: body.long_description,
        brand: body.brand,
        category: body.category,
        tags: body.tags ?? [],
        images: body.images ?? [],
        thumbnail: body.thumbnail ?? '/placeholder.jpg',
        base_price: body.base_price,
        compare_at_price: body.compare_at_price,
        is_featured: body.is_featured ?? false,
        is_new: body.is_new ?? false,
        is_on_sale: body.compare_at_price != null,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error

    // Create variants
    if (body.variants?.length > 0) {
      const variants = body.variants
        .filter((v: any) => v.size || v.color)
        .map((v: any, i: number) => ({
          product_id: product.id,
          sku: `${slug.toUpperCase()}-${i + 1}`,
          size: v.size || null,
          color: v.color || null,
          price: v.price ? Math.round(Number(v.price) * 100) : body.base_price,
          inventory_quantity: Number(v.stock) || 0,
        }))

      if (variants.length > 0) {
        await supabase.from('product_variants').insert(variants)
      }
    }

    return NextResponse.json({ product }, { status: 201 })
  } catch (err: any) {
    console.error('Create product error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createAdminClient()
  const { data, count, error } = await supabase
    .from('products')
    .select('*, product_variants(*)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ products: data, total: count })
}
