import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'orders@carnelian.store'

export async function sendOrderConfirmation({
  to,
  orderNumber,
  items,
  total,
}: {
  to: string
  orderNumber: string
  items: { name: string; quantity: number; price: number }[]
  total: number
}) {
  const itemsList = items
    .map((i) => `• ${i.name} × ${i.quantity} — $${(i.price / 100).toFixed(2)}`)
    .join('\n')

  return resend.emails.send({
    from: `Carnelian Stores <${FROM}>`,
    to,
    subject: `Order Confirmed — #${orderNumber}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0E0E0C;color:#FAFAF8;padding:40px;border-radius:12px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="width:48px;height:48px;background:linear-gradient(135deg,#E0A800,#D93025);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px">
            <span style="color:white;font-weight:bold;font-size:20px">C</span>
          </div>
          <h1 style="font-size:24px;font-weight:700;margin:0;color:#E0A800">Order Confirmed!</h1>
          <p style="color:#AAAAA0;margin-top:8px">Order #${orderNumber}</p>
        </div>

        <p style="color:#FAFAF8">Hi there! Your order has been confirmed and is being prepared.</p>

        <div style="background:#1A1A17;border-radius:8px;padding:20px;margin:24px 0">
          <h3 style="color:#E0A800;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:0.1em">Your Items</h3>
          <pre style="color:#AAAAA0;font-family:inherit;font-size:14px;margin:0;white-space:pre-wrap">${itemsList}</pre>
          <div style="border-top:1px solid rgba(255,255,255,0.08);margin-top:16px;padding-top:16px;display:flex;justify-content:space-between">
            <span style="color:#FAFAF8;font-weight:600">Total</span>
            <span style="color:#E0A800;font-weight:700;font-size:18px">$${(total / 100).toFixed(2)}</span>
          </div>
        </div>

        <p style="color:#AAAAA0;font-size:14px">You'll receive a shipping confirmation with tracking details once your order is on its way.</p>

        <div style="text-align:center;margin-top:32px">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders" style="background:linear-gradient(135deg,#E0A800,#D93025);color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">
            Track Your Order
          </a>
        </div>

        <p style="color:#666662;font-size:12px;text-align:center;margin-top:32px">
          Carnelian Stores · A Peridot Holdings Company<br/>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#E0A800">carnelian.store</a>
        </p>
      </div>
    `,
  })
}

export async function sendShippingUpdate({
  to,
  orderNumber,
  trackingNumber,
  carrier,
}: {
  to: string
  orderNumber: string
  trackingNumber: string
  carrier?: string
}) {
  return resend.emails.send({
    from: `Carnelian Stores <${FROM}>`,
    to,
    subject: `Your order #${orderNumber} has shipped! 🚚`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0E0E0C;color:#FAFAF8;padding:40px;border-radius:12px">
        <h1 style="font-size:24px;font-weight:700;color:#E0A800">Your order is on its way!</h1>
        <p style="color:#AAAAA0">Order #${orderNumber} has been shipped.</p>
        <div style="background:#1A1A17;border-radius:8px;padding:20px;margin:24px 0">
          <p style="margin:0;color:#FAFAF8">Tracking Number: <strong style="color:#E0A800">${trackingNumber}</strong></p>
          ${carrier ? `<p style="margin:8px 0 0;color:#AAAAA0">Carrier: ${carrier}</p>` : ''}
        </div>
        <p style="color:#AAAAA0;font-size:14px">Your order will be delivered within 3–7 business days depending on your location.</p>
      </div>
    `,
  })
}

export async function sendAbandonedCartReminder({
  to,
  firstName,
  items,
}: {
  to: string
  firstName?: string
  items: { name: string; price: number; image?: string }[]
}) {
  return resend.emails.send({
    from: `Carnelian Stores <${FROM}>`,
    to,
    subject: `${firstName ? `${firstName}, you left something behind` : 'You left something in your cart'} 🛒`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0E0E0C;color:#FAFAF8;padding:40px;border-radius:12px">
        <h1 style="font-size:24px;font-weight:700;color:#FAFAF8">Your cart is waiting</h1>
        <p style="color:#AAAAA0">You left ${items.length} item${items.length > 1 ? 's' : ''} behind. They won't wait forever.</p>
        <div style="text-align:center;margin:32px 0">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/cart" style="background:linear-gradient(135deg,#E0A800,#D93025);color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-size:16px">
            Complete Your Order
          </a>
        </div>
        <p style="color:#666662;font-size:12px;text-align:center">
          <a href="#" style="color:#666662">Unsubscribe</a> · Carnelian Stores
        </p>
      </div>
    `,
  })
}
