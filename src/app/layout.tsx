import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code2Consult — 8-Hour Open-Source Hackathon",
  description:
    "An 8-hour open-source hackathon where you improve existing software, solve real-world problems, and ship meaningful contributions through production-quality Pull Requests.",
  keywords: [
    "hackathon",
    "open source",
    "coding",
    "engineering",
    "pull request",
    "180 Degrees CONSULTing",
    "VIT Chennai",
  ],
  openGraph: {
    title: "Code2Consult — 8-Hour Open-Source Hackathon",
    description:
      "Real Problems. Real Code. Real Impact. Improve existing software in 8 hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
