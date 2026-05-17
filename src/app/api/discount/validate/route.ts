import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json()

    const supabase = await createClient()

    const { data: discount, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !discount) {
      return NextResponse.json({ valid: false, message: 'Invalid promo code' })
    }

    // Check expiry
    if (discount.expires_at && new Date(discount.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, message: 'This code has expired' })
    }

    // Check max uses
    if (discount.max_uses && discount.current_uses >= discount.max_uses) {
      return NextResponse.json({ valid: false, message: 'This code has reached its usage limit' })
    }

    // Check min order value
    if (discount.min_order_value && subtotal < discount.min_order_value) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order of $${(discount.min_order_value / 100).toFixed(2)} required`,
      })
    }

    const amount =
      discount.type === 'percentage'
        ? Math.round((subtotal * discount.value) / 100)
        : discount.value

    return NextResponse.json({
      valid: true,
      code: discount.code,
      amount,
      type: discount.type,
      value: discount.value,
    })
  } catch (err: any) {
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 })
  }
}
