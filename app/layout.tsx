import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { site } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const defaultTitle = `${site.name} | Website design for New Zealand tradies`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Website design",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  verification:
    verification && /^[A-Za-z0-9_-]+$/.test(verification) ? { google: verification } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
