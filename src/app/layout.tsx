import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Poppins } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Hand-Poked Tattoos & Slow Travel Stories | Prerna',
  description: 'Hand-poked tattoos and honest travel storytelling across India. Book a meaningful tattoo experience or create place-led content for your stay.',
  metadataBase: new URL('https://meetprerna-travel.vercel.app'),
  openGraph: {
    title: 'Hand-Poked Tattoos & Slow Travel Stories | Prerna',
    description: 'Hand-poked tattoos and honest travel storytelling across India. Book a meaningful tattoo experience or create place-led content for your stay.',
    type: 'website',
    images: [
      {
        url: '/images/tea_plantation_landscape.webp',
        width: 1200,
        height: 630,
        alt: 'Prerna Travel and Tattoos in India',
      }
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fafafa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#FFFCF5] text-[#1A1A18] antialiased">
        <SmoothScroll />
        {children}
        <script async src="//www.instagram.com/embed.js" />
      </body>
    </html>
  )
}