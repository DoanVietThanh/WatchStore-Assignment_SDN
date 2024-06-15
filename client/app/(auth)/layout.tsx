import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SessionWrapper from "@/components/session-wrapper";
import { Toaster } from "@/components/ui/sonner";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Luxury Watches",
  description: "Generated by ThanhDoan",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <style>{`body { font-family: ${inter.className}; }`}</style>
      </head>
      <body>
        <SessionWrapper>{children}</SessionWrapper>
        <Toaster position="top-right" richColors theme="light" />
      </body>
    </html>
  );
}
