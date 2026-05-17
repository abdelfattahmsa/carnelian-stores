import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', user.id)
    .single()

  if (!profile) return NextResponse.json({ items: [] })

  const { data: items } = await supabase
    .from('wishlists')
    .select('*, products(*)')
    .eq('user_id', profile.id)
    .order('added_at', { ascending: false })

  return NextResponse.json({ items: items ?? [] })
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { productId } = await req.json()
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const { error } = await supabase
    .from('wishlists')
    .upsert({ user_id: profile.id, product_id: productId }, { onConflict: 'user_id,product_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { productId } = await req.json()
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', profile.id)
    .eq('product_id', productId)

  return NextResponse.json({ success: true })
}
