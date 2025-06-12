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
      <body
        className={`${anek.className} transition-all duration-500 bg-slate-200/80 dark:bg-ausoft-slate-950`}
      >
        <Suspense>
          <SocketProvider>
            <TranslateProvider>
              <ModalProvider>
                <AuthProvider>
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
                                        {children}
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
                </AuthProvider>
              </ModalProvider>
            </TranslateProvider>
          </SocketProvider>
        </Suspense>
      </body>
    </html>
  );
}
