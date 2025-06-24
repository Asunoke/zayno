import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ZAYNO - La banque née pour l Afrique.| Ton argent, ton pouvoir.",
    template: "%s | BCB - Bamako Capital Bridge",
  },
  description:
    "ZAYNO est une néo-banque africaine digitale, pensée pour la nouvelle génération.",
  keywords: [
    "fintech Mali",
    "banque digitale",
    "transfert d'argent",
    "prêt en ligne",
    "BCB",
    "ZAYNO",
    "mobile money",
    "services financiers Mali",
    "IBAN Mali",
    "carte bancaire Mali",
  ],
  authors: [{ name: "Tenoble softwares" }],
  creator: "TS - Tenoble Softwares",
  publisher: "TGH",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bcb.ml",
    siteName: "BCB - Bamako Capital Bridge",
    title: "BCB - Votre Pont vers l'Avenir Financier",
    description:
      "Services financiers digitaux modernes et sécurisés au Mali. Transferts instantanés, prêts intelligents, et bien plus.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BCB - Bamako Capital Bridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BCB - Bamako Capital Bridge",
    description: "Votre partenaire fintech de confiance au Mali",
    images: ["/og-image.jpg"],
    creator: "@BCB_Mali",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://bcb.ml",
    languages: {
      "fr-FR": "https://bcb.ml",
      "en-US": "https://bcb.ml/en",
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#003366" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "BCB - Bamako Capital Bridge",
              description: "Services financiers digitaux modernes et sécurisés au Mali",
              url: "https://bcb.ml",
              logo: "https://bcb.ml/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Avenue Modibo Keita",
                addressLocality: "Bamako",
                addressCountry: "ML",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+223-20-22-24-26",
                contactType: "customer service",
                availableLanguage: ["French", "Bambara"],
              },
              sameAs: [
                "https://facebook.com/BCBMali",
                "https://twitter.com/BCB_Mali",
                "https://linkedin.com/company/bcb-mali",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
