import type { Metadata } from 'next'
import './globals.css'
import BootSequence from '@/components/core/BootSequence'
import { Bricolage_Grotesque } from 'next/font/google'
import { Playwrite_NZ } from 'next/font/google'
import { Quicksand } from 'next/font/google'
import { Shadows_Into_Light } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
})

const playwrite = Playwrite_NZ({
  weight: ["100","200","300","400"],
  variable: "--font-playwrite",

})

const shadows = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-shadows',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Ken Travis — Frontend & Mobile Engineer',
    template: '%s | Ken Travis',
  },
  description:
    'Frontend & mobile engineer specializing in React, Next.js, and React Native. Crafting minimal, animated, high-performance user experiences.',
  metadataBase: new URL('https://ken-travis-portfolio.vercel.app'), // replace with your domain
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/hero-img.JPG',
  },
  openGraph: {
    title: 'Ken Travis — Frontend & Mobile Engineer',
    description:
      'Frontend & mobile engineer specializing in React, Next.js, and React Native.',
    url: 'https://ken-travis-portfolio.vercel.app',
    siteName: 'Ken Travis',
    images: [
      {
        url: '/images/hero-img.JPG',
        width: 1200,
        height: 630,
        alt: 'Ken Travis Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ken Travis — Frontend & Mobile Engineer',
    description:
      'Frontend & mobile engineer building elegant, high-performance experiences.',
    images: ['/images/hero-img.JPG'],
  },
}


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${playwrite.variable} ${bricolage.variable} ${shadows.variable}`}>
      <body>
        <BootSequence />
        <Navbar/>
        <div className='min-h-screen'>
          {children}
        </div>
          <Footer />
      </body>
    </html>
  )
}
