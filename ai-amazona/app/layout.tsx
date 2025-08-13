import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { HydrationSafe } from '@/components/ui/hydration-safe'
import { AntiExtensionScript } from '@/components/ui/anti-extension-script'
import { SuppressHydrationWarning } from '@/components/ui/suppress-hydration-warning'
import './globals.css'
import { auth } from '@/auth'
import { SessionProvider } from '@/components/providers/session-provider'
import { CartProvider } from '@/components/providers/cart-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI Amazona',
  description: 'Your one-stop shop for amazing products',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang='en'>
      <head>
        <meta name="no-email-collection" content="true" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <AntiExtensionScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SuppressHydrationWarning />
        <HydrationSafe fallback={<div className="min-h-screen bg-background" />}>
          <SessionProvider session={session}>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </SessionProvider>
        </HydrationSafe>
      </body>
    </html>
  )
}
