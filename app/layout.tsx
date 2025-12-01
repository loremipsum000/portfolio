import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dardan Berisha - Portfolio',
  description: 'Senior Product Designer & Multimedia Engineer based in Croatia. Specializing in Blockchain, Design Systems, and Brand Identity.',
  keywords: ['Product Design', 'UX/UI', 'Blockchain', 'Design Systems', 'Brand Identity', 'Frontend Development', 'Next.js', 'React', 'Multimedia Engineer', 'Croatia'],
  authors: [{ name: 'Dardan Berisha' }],
  creator: 'Dardan Berisha',
  publisher: 'Dardan Berisha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lorem-portfolio.com',
    title: 'Dardan Berisha - Portfolio',
    description: 'Senior Product Designer & Multimedia Engineer based in Croatia. Specializing in Blockchain, Design Systems, and Brand Identity.',
    siteName: 'Dardan Berisha Portfolio',
    images: [
      {
        url: '/media/Color-synth-3000-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Dardan Berisha Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dardan Berisha - Portfolio',
    description: 'Senior Product Designer & Multimedia Engineer based in Croatia.',
    creator: '@Lorem_Ipsum95',
    images: ['/media/Color-synth-3000-cover.jpg'],
  },
  icons: {
    icon: '/Favi-lorem.svg',
    shortcut: '/Favi-lorem.svg',
    apple: '/Favi-lorem.svg',
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

