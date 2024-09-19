"use client";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import DeviceProvider from "@/context";
import NextAuthSessionProvider from "@/providers/session";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Mega Vendas - Test</title>
        </head>
        <body className={inter.className}>
          <DeviceProvider>
            <Toaster />
            {children}
          </DeviceProvider>
        </body>
      </html>
    </NextAuthSessionProvider>
  );
}
