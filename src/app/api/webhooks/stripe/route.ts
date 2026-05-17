export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { generateOrderNumber } from '@/lib/utils'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutCompleted(session, supabase)
      break
    }
    case 'payment_intent.payment_failed': {
      // Handle failed payment
      console.error('Payment failed:', event.data.object)
      break
    }
    default:
      console.log('Unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, supabase: any) {
  const { userId } = session.metadata ?? {}

  // Get line items
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

  // Find or create user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!profile) return

  // Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      order_number: generateOrderNumber(),
      user_id: profile.id,
      status: 'payment_received',
      shipping_address: session.collected_information?.shipping_details ?? {},
      billing_address: session.customer_details ?? {},
      subtotal: session.amount_subtotal ?? 0,
      discount: session.total_details?.amount_discount ?? 0,
      shipping_cost: session.total_details?.amount_shipping ?? 0,
      tax: session.total_details?.amount_tax ?? 0,
      total: session.amount_total ?? 0,
      payment_intent_id: session.payment_intent as string,
    })
    .select()
    .single()

  if (error || !order) {
    console.error('Failed to create order:', error)
    return
  }

  // Create order items from line items
  const orderItems = lineItems.data.map((item) => ({
    order_id: order.id,
    product_id: (item.price?.metadata as Record<string, string> | undefined)?.productId ?? '',
    variant_id: (item.price?.metadata as Record<string, string> | undefined)?.variantId || null,
    product_name: item.description ?? '',
    image_url: '',
    quantity: item.quantity ?? 1,
    unit_price: item.price?.unit_amount ?? 0,
    total_price: (item.price?.unit_amount ?? 0) * (item.quantity ?? 1),
  }))

  await supabase.from('order_items').insert(orderItems)

  // Create order confirmation notification
  await supabase.from('notifications').insert({
    user_id: profile.id,
    type: 'order_update',
    title: `Order #${order.order_number} confirmed`,
    body: 'Your payment was received and your order is being processed.',
    link: `/account/orders/${order.id}`,
  })
}
