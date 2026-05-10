import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat=Montserrat({
  variable:"--font-montserrat",
  subsets:['latin'],
})
export const metadata: Metadata = {
  title: "Petals For Mother",
  description: "An app to showcase my love for my mother...",
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
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}>
      <head>
        <link rel="icon" type="image/png" href="/web/icon.png" />
        <script src="https://js.puter.com/v2/" async></script>
        </head>
      <body className="bg-main text-body overflow-x-hidden">
        {children}
        <Navbar />
      </body>
    </html>
  );
}
