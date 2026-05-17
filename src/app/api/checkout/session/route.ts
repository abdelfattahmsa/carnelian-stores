import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    const { items, discountCode } = await req.json()

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          metadata: { productId: item.productId, variantId: item.variantId ?? '' },
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }))

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: user?.emailAddresses[0]?.emailAddress,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AE', 'EG', 'SA', 'QA', 'KW'],
      },
      allow_promotion_codes: true,
      phone_number_collection: { enabled: true },
      metadata: {
        userId: user?.id ?? 'guest',
        discountCode: discountCode ?? '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout session error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
