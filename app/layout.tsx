import type { Metadata } from 'next'
import './globals.css'
import BootSequence from '@/components/core/BootSequence'
import { Bricolage_Grotesque } from 'next/font/google'
import { Quicksand } from 'next/font/google'
import { Shadows_Into_Light } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
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
  title: 'Ken Travis — Frontend & Mobile Engineer',
  description: 'Minimal, animated portfolio showcasing frontend and React Native expertise'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${bricolage.variable} ${shadows.variable}`}>
      <body>
        <BootSequence />
        <Navbar/>
          {children}
          <Footer />
      </body>
    </html>
  )
}
