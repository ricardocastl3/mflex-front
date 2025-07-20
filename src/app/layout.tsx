import { Metadata } from "next";

export { default } from "./layout/index";

export const metadata: Metadata = {
  keywords: [
    "entretenimento",
    "África",
    "podcasts",
    "eventos",
    "música",
    "artistas",
    "televisão",
    "futebol",
    "cultura africana",
    "streaming",
  ],
  authors: [{ name: "Marca Flex" }],
  creator: "Marca Flex",
  publisher: "Marca Flex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.MFLEX_NEXT_PUBLIC_URL),
  alternates: {
    canonical: "/",
    languages: {
      pt: "/pt",
      en: "/en",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Marca Flex - Maior Plataforma de Entretenimento em África",
    description:
      "Somos a maior plataforma de entretenimento em África, onde você pode explorar podcasts, eventos e novidades imperdíveis.",
    images: ["/icons/logo.png"],
    creator: "@marcaflex",
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
  category: "entertainment",
  classification: "entertainment",
  other: {
    "google-adsense-account": "ca-pub-2045747943237657",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Marca Flex",
    "application-name": "Marca Flex",
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      { url: "/icons/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icons/logo.png",
  },
  manifest: "/manifest.json",
};
