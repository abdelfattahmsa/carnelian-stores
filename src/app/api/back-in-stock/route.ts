import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { productId, variantId, email } = await req.json()
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const { error } = await supabase.from('back_in_stock_alerts').upsert(
    {
      user_id: profile.id,
      product_id: productId,
      variant_id: variantId ?? null,
      email: email ?? user.emailAddresses[0]?.emailAddress,
    },
    { onConflict: 'user_id,product_id,variant_id' }
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
