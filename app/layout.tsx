import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/layout/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://norenapparel.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NOREN 暖簾 | Japanese-Inspired Apparel',
    template: '%s | NOREN 暖簾',
  },
  description: 'Wear the Culture. Premium garment-dyed t-shirts featuring hand-illustrated Japanese art where mythology, food culture, and streetwear collide. Samurai cats, ramen dragons, and kawaii creatures await.',
  keywords: ['Japanese apparel', 'ramen t-shirts', 'anime clothing', 'streetwear', 'graphic tees', 'Japanese art'],
  authors: [{ name: 'NOREN' }],
  creator: 'NOREN',
  openGraph: {
    title: 'NOREN 暖簾 | Japanese-Inspired Apparel',
    description: 'Wear the Culture. Premium garment-dyed t-shirts featuring hand-illustrated Japanese art.',
    type: 'website',
    siteName: 'NOREN 暖簾',
    images: [{ url: '/og?title=NOREN+暖簾&subtitle=Japanese-Inspired+Apparel&emoji=🍜', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOREN 暖簾 | Japanese-Inspired Apparel',
    description: 'Wear the Culture. Premium Japanese-inspired graphic tees.',
    images: ['/og?title=NOREN+暖簾&subtitle=Japanese-Inspired+Apparel&emoji=🍜'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
