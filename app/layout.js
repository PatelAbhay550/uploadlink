import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Uploadlink - Upload and Share Your Files For FREE",
  description: "Uploadlink let's you upload files and you get a permanent link for that file to share.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    
     <link rel="canonical" href="https://uploadlink.xyz/" />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
