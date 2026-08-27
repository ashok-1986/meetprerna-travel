import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const gambetta = localFont({
  src: [
    {
      path: '../../public/fonts/Gambetta-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gambetta-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
  ],
  variable: '--font-gambetta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hand-Poked Tattoos & Slow Travel Stories | Prerna',
  description: 'Hand-poked tattoos and honest travel storytelling across India. Book a meaningful tattoo experience or create place-led content for your stay.',
  metadataBase: new URL('https://meetprerna-travel.vercel.app'),
  alternates: {
    canonical: '/',
  },
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
  twitter: {
    card: 'summary_large_image',
    title: 'Hand-Poked Tattoos & Slow Travel Stories | Prerna',
    description: 'Hand-poked tattoos and honest travel storytelling across India. Book a meaningful tattoo experience or create place-led content for your stay.',
    images: ['/images/tea_plantation_landscape.webp'],
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
    <html lang="en" className={`${poppins.variable} ${gambetta.variable}`}>
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