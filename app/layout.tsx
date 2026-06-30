import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://log0.in"),
  title: "log0",
  description:
    "An intelligent incident copilot that turns raw logs into actionable incidents.",
  openGraph: {
    title: "log0 - from 10,000 logs to one incident",
    description:
      "An intelligent incident copilot that turns raw logs into actionable incidents.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "log0" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "log0 - from 10,000 logs to one incident",
    description:
      "An intelligent incident copilot that turns raw logs into actionable incidents.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased selection:bg-emerald-500 selection:text-neutral-950`}
      >
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
