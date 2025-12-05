import type { Metadata } from "next";
import { Playfair, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";

const primary = Playfair({
  variable: "--font-primary",
  subsets: ["latin"],
});

const secondary = Roboto({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventMate",
  description: "Simple and smart event management for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${secondary.variable} ${primary.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Toaster position="top-right" richColors />
        <LoginSuccessToast />
        <LogoutSuccessToast />
      </body>
    </html>
  );
}
