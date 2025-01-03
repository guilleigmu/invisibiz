import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvisiBiz",
  description:
    "Encuentra negocios sin página web en la red y encuentra oportunidades como desarrollador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <NextTopLoader color="hsl(var(--primary))" />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
