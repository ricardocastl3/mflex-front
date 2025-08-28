"use client";

import "@/styles/tailwind.css";
import { GlobalStyles } from "@/styles/global";
import { Abel } from "next/font/google";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";

import AuthProvider from "@/providers/auth/AuthProvider";
import AppProvider from "@/providers/app/AppProvider";
import TranslateProvider from "@/providers/app/TranslateProvider";
import ModalProvider from "@/providers/app/ModalProvider";
import usePWA from "@/services/pwa/usePWA";
import CheckoutProvider from "@/providers/app/CheckoutProvider";
import TicketProvider from "@/providers/features/TicketProvider";
import SocketProvider from "@/providers/auth/SocketProvider";
import TransactionProvider from "@/providers/features/TransactionProvider";
import CategoryProvider from "@/providers/features/CategoryProvider";
import EventProvider from "@/providers/features/EventProvider";
import EventTicketProvider from "@/providers/features/EventTicketProvider";
import useAOS from "@/hooks/app/useAOS";
import FacebookPixel from "@/services/meta/FacebookPixel";
import FootballProvider from "@/providers/features/FootballProvider";
import FlexTVProvider from "@/providers/features/FlexTVProvider";
import MusicProvider from "@/providers/features/MusicProvider";
import ArtistProvider from "@/providers/features/ArtistProvider";
import ResourceProvider from "@/providers/features/ResourceProvider";
import FlexHouseProvider from "@/providers/features/FlexHouseProvider";
import CreatorProvider from "@/providers/features/CreatorProvider";

const anek = Abel({ weight: "400", subsets: ["latin"] });

GlobalStyles();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePWA();
  useAOS();
  FacebookPixel({ pixelId: "1182352936527746" });
  return (
    <html lang="en" translate="no">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Marcaflex",
                url: process.env.MFLEX_NEXT_PUBLIC_URL + "/pt",
                logo: process.env.MFLEX_NEXT_PUBLIC_URL + "/icons/logo.png",
                description:
                  "Marca Flex - Maior Plataforma de Entretenimento em África",
                foundingDate: "2025-07-15",
                founder: {
                  "@type": "Person",
                  name: "Ricardo Castle",
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    email: "suporte@marcaflex.com",
                    telephone: "+244941185831",
                    availableLanguage: ["pt", "en"],
                  },
                ],
                areaServed: "Worldwide",
                sameAs: ["https://www.instagram.com/marcafl3x"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Marca Flex",
                url: process.env.MFLEX_NEXT_PUBLIC_URL + "/pt",
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Marca Flex",
                operatingSystem: "Web",
                applicationCategory: "BusinessApplication",
                url: "https://marcaflex.com/pt",
                description:
                  "Plataforma online que automatiza tarefas e aumenta a produtividade de empreendedores de língua portuguesa.",
                offers: [
                  {
                    "@type": "Offer",
                    price: "950",
                    priceCurrency: "AOA",
                    url: "https://marcaflex.com/pt/pricing",
                    eligibleRegion: "Worldwide",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "950",
                      priceCurrency: "AOA",
                      billingDuration: "P1M",
                      unitCode: "MON",
                    },
                  },
                  {
                    "@type": "Offer",
                    price: "4900",
                    priceCurrency: "AOA",
                    url: "https://marcaflex.com/pt/pricing",
                    eligibleRegion: "Angola",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "4900",
                      priceCurrency: "AOA",
                      billingDuration: "P1M",
                      unitCode: "MON",
                    },
                  },
                ],
                screenshot: "https://marcaflex.com/assets/app-preview.png",
              },
            ]),
          }}
        />
      </head>

      <body
        className={`${anek.className} transition-all duration-500 bg-slate-200/80 dark:bg-ausoft-slate-950`}
      >
        <Suspense>
          <AuthProvider>
            <SocketProvider>
              <TranslateProvider>
                <ModalProvider>
                  <AppProvider>
                    <CheckoutProvider>
                      <TransactionProvider>
                        <TicketProvider>
                          <CategoryProvider>
                            <FlexTVProvider>
                              <EventProvider>
                                <MusicProvider>
                                  <ArtistProvider>
                                    <EventTicketProvider>
                                      <FootballProvider>
                                        <ResourceProvider>
                                          <FlexHouseProvider>
                                            <CreatorProvider>
                                              {children}
                                            </CreatorProvider>
                                          </FlexHouseProvider>
                                        </ResourceProvider>
                                      </FootballProvider>
                                    </EventTicketProvider>
                                  </ArtistProvider>
                                </MusicProvider>
                              </EventProvider>
                            </FlexTVProvider>
                          </CategoryProvider>
                        </TicketProvider>
                      </TransactionProvider>
                    </CheckoutProvider>
                    <ProgressBar
                      height="4px"
                      color="#d4b548"
                      options={{ showSpinner: false }}
                    />
                    {process.env.NODE_ENV == "production" && (
                      <GoogleAnalytics gaId="G-998HC7V4FQ" />
                    )}
                  </AppProvider>
                </ModalProvider>
              </TranslateProvider>
            </SocketProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
