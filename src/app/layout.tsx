import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Nav } from "@/components/Nav";
import { profile } from "@/lib/profile";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} · UX & Visual Designer`,
  description: profile.supporting,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <div className="noise" aria-hidden />
        <Nav />
        {children}
      </body>
    </html>
  );
}
