import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia',
    })
  }
  return _stripe
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop]
  },
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
  lineItems: Stripe.Checkout.SessionCreateParams['line_items']
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
