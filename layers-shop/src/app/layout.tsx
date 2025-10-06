import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/providers/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Layers – Minimal everyday wear",
    template: "%s · Layers",
  },
  description: "Minimal staples with meticulous details. Designed for everyday versatility.",
  metadataBase: new URL("https://localhost"),
  openGraph: {
    title: "Layers – Minimal everyday wear",
    description: "Minimal staples with meticulous details. Designed for everyday versatility.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-4">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <script
          defer
          data-domain="layers.local"
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}
