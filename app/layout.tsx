import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiabetesAI - AI-Powered Diabetes Risk Assessment",
  description:
    "Advanced AI-powered diabetes risk assessment and prediction tool with personalized health insights",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" }, // Standard favicon
      { url: "/icon.svg", type: "image/svg+xml" }, // SVG favicon
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png" }, // Apple touch icon
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "android-chrome-192x192.png",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512.png",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest", // Link to your PWA manifest file
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
