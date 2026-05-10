import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import your Header component
import Header from "@/components/Header"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mr Eazye | Premium Mobility in Bermuda",
  description: "Bermuda's #1 E-Bike, Scooter & Repair Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. Add the 'dark' class to html to force our premium dark mode
    <html lang="en" className="dark"> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        {/* 3. Mount the Header so it appears on every page */}
        <Header />
        
        {/* This <main> tag will hold your page content (like the hero section) */}
        <main>{children}</main>
      </body>
    </html>
  );
}