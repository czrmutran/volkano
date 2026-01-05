import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Montserrat } from "next/font/google"
import Footer from "../components/footer"
import SiteBackground from "../components/sitebackground"
import { CartProvider } from "../context/cart-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
})


export const metadata: Metadata = {
  metadataBase: new URL("https://volkanofitness.com.br"),
  title: {
    default: "Volkano Fitness | Equipamentos de Musculação Profissionais",
    template: "%s | Volkano Fitness",
  },
  description:
    "Fabricante líder em equipamentos de musculação de alta performance. Linhas profissionais, biomecânica avançada e durabilidade para academias em todo o Brasil.",
  keywords: [
    "equipamentos de academia",
    "aparelhos de musculação",
    "volkano fitness",
    "máquinas de musculação",
    "equipamentos profissionais",
    "fitness",
    "biomecânica",
    "academia",
  ],
  authors: [{ name: "Volkano Fitness" }],
  creator: "Volkano Fitness",
  publisher: "Volkano Fitness",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Volkano Fitness | Equipamentos de Musculação Profissionais",
    description:
      "Transforme sua academia com a Volkano Fitness. Equipamentos robustos, biomecânica perfeita e design moderno.",
    url: "https://volkanofitness.com.br",
    siteName: "Volkano Fitness",
    images: [
      {
        url: "/banner_principal_desktop.webp", // Imagem padrão para compartilhamento
        width: 1200,
        height: 630,
        alt: "Volkano Fitness Equipamentos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volkano Fitness",
    description: "Equipamentos de musculação de alta performance para sua academia.",
    images: ["/banner_principal_desktop.webp"],
  },
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
  verification: {
    google: "código-de-verificação-google-aqui", // Placeholder para o usuário adicionar depois
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          relative bg-black text-white
          flex flex-col
          ${inter.variable}
          ${montserrat.variable}
        `}
      >
        <CartProvider>
          <SiteBackground />

          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
