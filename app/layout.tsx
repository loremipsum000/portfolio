import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lorem-portfolio.com'),
  title: 'Dardan Berisha - Portfolio',
  description: 'Design Engineer based in Croatia. Experienced in Blockchain and a plethora of other industries — bridging design and code through Design Systems, Frontend Engineering, and Brand Identity.',
  keywords: ['Design Engineer', 'Product Design', 'UX/UI', 'Design Systems', 'Frontend Engineering', 'Brand Identity', 'Blockchain', 'Next.js', 'React', 'Croatia'],
  authors: [{ name: 'Dardan Berisha' }],
  creator: 'Dardan Berisha',
  publisher: 'Dardan Berisha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lorem-portfolio.com',
    title: 'Dardan Berisha - Portfolio',
    description: 'Design Engineer based in Croatia. Experienced in Blockchain and a plethora of other industries — bridging design and code through Design Systems, Frontend Engineering, and Brand Identity.',
    siteName: 'Dardan Berisha Portfolio',
    images: [
      {
        url: '/media/linkpreview-lorem.jpg',
        width: 1200,
        height: 630,
        alt: 'Dardan Berisha Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dardan Berisha - Portfolio',
    description: 'Design Engineer based in Croatia. Bridging design and code across Blockchain and a plethora of other industries.',
    creator: '@Lorem_Ipsum95',
    images: ['/media/linkpreview-lorem.jpg'],
  },
  icons: {
    icon: '/media/favi-lorem.svg',
    shortcut: '/media/favi-lorem.svg',
    apple: '/media/favi-lorem.svg',
  },
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

