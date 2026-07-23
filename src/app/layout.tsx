import type { Metadata } from "next";
import { Rajdhani, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAEL_GARCIA // DEVELOPER",
  description:
    "Fullstack Developer — building fast, accessible, and visually engaging web applications. React, Next.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-void text-text-primary font-body antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {/* Atmospheric layers */}
        <div className="bg-grid" aria-hidden="true" />
        <div className="scan-line" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
