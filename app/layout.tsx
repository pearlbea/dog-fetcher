import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dog fetcher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gradient-to-r from-pink-900 to-purple-900 py-4 px-8">
          <h1 className="text-2xl mx-auto max-w-6xl text-amber-300 font-bold">Dog Fetcher</h1>
        </header>
        <main className="container mx-auto max-w-6xl px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
