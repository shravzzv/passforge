import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PassForge | The Sleek, Secure Password Generator',
  description:
    'PassForge is a sleek, secure, and lightning-fast password generator built for everyday use. Customize length, choose character sets, generate passphrases, and copy to clipboard in one click, privacy-first, and open source.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
