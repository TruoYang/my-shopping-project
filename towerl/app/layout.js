'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Tower Tower",
//   description: "Nâng cấp cuộc sống của bạn với những sản phẩm tốt nhất",
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
// };

export default function RootLayout({ children }) {
  const params = usePathname()
  const showHeader = (params == '/sign-in' || params == '/create-account') ? false : true 
  const [updateCart, setUpdateCart] = useState(false)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UpdateCartContext.Provider value = {{updateCart, setUpdateCart}}>
        {/* <Header/> */}
        {showHeader && <Header/>}
        {children}
        <Toaster/>
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
