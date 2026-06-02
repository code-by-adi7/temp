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
      <body
        className="overflow-x-hidden"
        style={{
          backgroundColor: "#080808",
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
