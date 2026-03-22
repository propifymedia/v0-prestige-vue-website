import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { LanguageProvider } from '@/components/providers/language-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prestige Vue | Fenêtres & Portes à Montréal',
  description: 'Installation professionnelle de fenêtres et portes à Montréal. Devis gratuit. Plus de 15 ans d\'expérience.',
  generator: 'v0.app',
  openGraph: {
    title: 'Prestige Vue | Fenêtres & Portes à Montréal',
    description: 'Installation professionnelle de fenêtres et portes à Montréal. Devis gratuit.',
    locale: 'fr_CA',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Prestige Vue',
              description: 'Installation de fenêtres et portes à Montréal',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '6255 Rue Marivaux',
                addressLocality: 'Saint-Leonard',
                postalCode: 'H1P3H6',
                addressCountry: 'CA',
              },
              telephone: '+1-514-512-1060',
              email: 'info@prestigevue.ca',
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
          <Toaster position="top-center" />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
