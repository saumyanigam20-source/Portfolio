import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { SiteFrame } from "@/components/SiteFrame";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
