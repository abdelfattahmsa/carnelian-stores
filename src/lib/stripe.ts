import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
  typescript: true,
})

export async function createPaymentIntent(
  amount: number,
  currency = 'usd',
  metadata?: Record<string, string>
) {
  return stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
    metadata,
  })
}

export async function createCheckoutSession({
  lineItems,
  successUrl,
  cancelUrl,
  customerId,
  metadata,
}: {
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
  successUrl: string
  cancelUrl: string
  customerId?: string
  metadata?: Record<string, string>
}) {
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer: customerId,
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'AE', 'EG', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO'],
    },
    allow_promotion_codes: true,
    metadata,
    phone_number_collection: { enabled: true },
  })
}
