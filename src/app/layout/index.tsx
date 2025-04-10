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

const anek = Abel({ weight: "400", subsets: ["latin"] });

GlobalStyles();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePWA();
  return (
    <html lang="en">
      <body
        className={`${anek.className} transition-all duration-500 bg-slate-200/80 dark:bg-ausoft-slate-950`}
      >
        <Suspense>
          <SocketProvider>
            <TranslateProvider>
              <ModalProvider>
                <AppProvider>
                  <AuthProvider>
                    <CheckoutProvider>
                      <TransactionProvider>
                        <TicketProvider>
                          <CategoryProvider>
                            <EventProvider>
                              <EventTicketProvider>
                                {children}
                              </EventTicketProvider>
                            </EventProvider>
                          </CategoryProvider>
                        </TicketProvider>
                      </TransactionProvider>
                    </CheckoutProvider>
                    <ProgressBar
                      height="4px"
                      color="#d4b548"
                      options={{ showSpinner: false }}
                    />
                    <GoogleAnalytics gaId="G-ZM1Y9J4TKT" />
                  </AuthProvider>
                </AppProvider>
              </ModalProvider>
            </TranslateProvider>
          </SocketProvider>
        </Suspense>
      </body>
    </html>
  );
}
