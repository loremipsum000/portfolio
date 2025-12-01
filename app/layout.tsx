import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dardan Berisha - Portfolio',
  description: 'Senior Product Designer & Multimedia Engineer based in Croatia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

