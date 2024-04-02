import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR } from "@clerk/localizations";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "İş Hayatında Bilge Adımlar: Yapay Zeka Tabanlı İş Hakları ve Güvenliği Rehberi",
  manifest: '/manifest.json',
  icons: {apple: '/icon.png'},
  themeColor: '#fff'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={trTR
    }>
      <Providers>
        <html lang="tr">
          <body className={inter.className}>{children}</body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
