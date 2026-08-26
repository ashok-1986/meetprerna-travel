import type { Metadata, Viewport } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-marund',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Prerna — Travel & Tattoo',
  description: 'Immersive travel experiences and hand-poked tattoos by Prerna',
  openGraph: {
    title: 'Prerna — Travel & Tattoo',
    description: 'Immersive travel experiences and hand-poked tattoos by Prerna',
    type: 'website',
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
    <html lang="en" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-paper text-near-black antialiased">
        {children}
        <script async src="//www.instagram.com/embed.js" />
      </body>
    </html>
  )
}