import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Text, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  variable: "--font-crimson-text", // Keep this for CSS var access
  subsets: ["latin"],
});

import "@fontsource/crimson-text/400-italic.css";
import "@fontsource/crimson-text/600-italic.css";
import "@fontsource/crimson-text/700-italic.css";

export const metadata: Metadata = {
  title: "Brandle",
  description: "Guess the unique brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${roboto.className} `}>
      <body className="antialiased bg-theme-dark">{children}</body>
    </html>
  );
}
