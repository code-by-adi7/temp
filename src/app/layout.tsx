import type { Metadata } from "next";
import { Antonio, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-antonio",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanu Siril — Vlogger & Creator",
  description:
    "Official portfolio of Sanu Siril. YouTube vlogger bringing authentic stories to life through cinematic vlogging.",
  openGraph: {
    title: "Sanu Siril — Vlogger & Creator",
    description: "YouTube vlogger. Visual storyteller. Subscribe now.",
    url: "https://youtube.com/@sanusiril",
    siteName: "Sanu Siril",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${antonio.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#080808" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className="overflow-x-hidden"
        style={{
          backgroundColor: "#000000ff",
          color: "#a8a8a8",
          fontFamily: "var(--font-dm-sans), sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </body>
    </html>
  );
}
