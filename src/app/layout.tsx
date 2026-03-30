import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "ResumeAI — AI-Powered Resume & Portfolio Builder",
  description:
    "Build stunning, ATS-optimized resumes and portfolio websites in minutes with AI. Choose from premium templates, get smart suggestions, and land your dream job faster.",
  keywords: "resume builder, AI resume, portfolio generator, ATS optimized, career tools",
  openGraph: {
    title: "ResumeAI — Build Your Dream Resume in Minutes",
    description: "AI-powered resume and portfolio builder trusted by 50,000+ professionals.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
