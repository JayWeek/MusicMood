import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google"; 

export const metadata: Metadata = {
  title: "MusicMood Ai",
  description: "Generate a playlist just for your mood",
};

// 2. Configure the font variable cleanly
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--marope",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", manrope.variable)}>
      <body className={`flex min-h-full flex-col ${manrope.className}`}>
        {children}
      </body>
    </html>
  );
}
