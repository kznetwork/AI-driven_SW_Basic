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
  metadataBase: new URL("http://localhost:3000"),
  title: "LinkSnip — 링크는 짧게, 가능성은 길게",
  description: "복잡한 URL을 깔끔하고 기억하기 쉬운 링크로 바꾸세요.",
  openGraph: {
    title: "LinkSnip — 링크는 짧게, 가능성은 길게",
    description: "복잡한 URL을 깔끔하고 기억하기 쉬운 링크로 바꾸세요.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkSnip — 링크는 짧게, 가능성은 길게",
    description: "복잡한 URL을 깔끔하고 기억하기 쉬운 링크로 바꾸세요.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
