import type { Metadata } from "next";
import { Bebas_Neue, Manrope, Inter } from "next/font/google";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-nav",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HI, I AM KAEL GARCIA",
  description:
    "I build web applications that are fast, accessible, and visually engaging. Specializing in React, Next.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${manrope.variable} ${inter.variable}`}
    >
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <FloatingOrbs />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
