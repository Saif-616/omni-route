import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Omni-Route | Logistics & Thermal Maps",
  description: "Optimizing last-mile delivery with hyper-local weather data.",
};

import { OmniProvider } from "@/lib/context/OmniContext";
import { OmniBotFAB } from "@/components/chat/OmniBotFAB";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans bg-background text-textPrimary h-screen flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none scanline z-50 opacity-20" />
        <OmniProvider>
          {children}
          {modal}
          <OmniBotFAB />
        </OmniProvider>
      </body>
    </html>
  );
}
