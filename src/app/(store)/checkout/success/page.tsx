import Link from 'next/link'
import { CheckCircle2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MailIcon, BoxIcon, TruckIcon } from '@/components/ui/brand-icons'

export default async function CheckoutSuccessPage(props: PageProps<'/checkout/success'>) {
  const searchParams = await props.searchParams
  const sessionId = searchParams.session_id as string | undefined

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full gradient-carnelian flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-white" />
      </div>

      <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">
        Order Confirmed!
      </h1>
      <p className="text-[var(--text-secondary)] mb-2">
        Thank you for your purchase. We&apos;ve received your order and will start processing it right away.
      </p>
      {sessionId && (
        <p className="text-xs text-[var(--text-muted)] mb-8 font-mono bg-[var(--bg-raised)] px-3 py-1.5 rounded-lg inline-block">
          Ref: {sessionId.slice(-12).toUpperCase()}
        </p>
      )}

      <div className="p-5 rounded-2xl bg-[var(--bg-raised)] border border-[var(--bg-border)] mb-8 text-left space-y-3">
        {[
          { icon: <MailIcon size={18} />, label: 'Confirmation email', sub: 'Sent to your inbox' },
          { icon: <BoxIcon size={18} />, label: 'Processing', sub: "We'll ship within 1-3 business days" },
          { icon: <TruckIcon size={18} />, label: 'Tracking', sub: "You'll receive a tracking link once shipped" },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-8 text-[var(--brand-amber)] flex items-center justify-center">{icon}</span>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
              <p className="text-xs text-[var(--text-muted)]">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/account/orders">
          <Button size="lg">
            <Package size={16} />
            View Orders
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
