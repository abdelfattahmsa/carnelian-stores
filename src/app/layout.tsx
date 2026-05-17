import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  title: {
    default: 'Carnelian Stores',
    template: '%s | Carnelian Stores',
  },
  description:
    'Premium merch and lifestyle goods across five curated sub-brands. Wear what endures.',
  keywords: ['carnelian', 'premium merch', 'nerds assemble', 'clutch nation', 'field notes', 'the vault'],
  openGraph: {
    type: 'website',
    siteName: 'Carnelian Stores',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://carnelian.store'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
        data-scroll-behavior="smooth"
      >
        <body className="min-h-full flex flex-col antialiased">
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-raised)',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-primary)',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
