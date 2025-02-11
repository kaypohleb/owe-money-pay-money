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
  title: "0$P$",
  description: "A simple receipt splitting app",
  authors: [{ name: "Caleb Foo" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full font-mono`}
      >
        {children}
        <footer className="w-full h-12 flex gap-6 flex-wrap items-center justify-end py-2 px-4">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://kaypohleb.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            made by Caleb Foo
          </a>
        </footer>
      </body>
    </html>
  );
}
