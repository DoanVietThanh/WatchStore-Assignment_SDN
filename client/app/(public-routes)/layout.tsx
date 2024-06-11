import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SessionWrapper from "@/components/session-wrapper";
import { Toaster } from "@/components/ui/sonner";
import FooterPublic from "@/layouts/public-layout/footer-public";
import HeaderPublic from "@/layouts/public-layout/header-public";

// import FooterPublic from "@/layouts/public-layout/footer-public";
// import HeaderPublic from "@/layouts/public-layout/header-public";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionWrapper>
      {/* <AuthMiddleware> */}
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col justify-between min-h-screen">
            <HeaderPublic />
            {children}
            <FooterPublic />
          </div>
          <Toaster />
        </body>
      </html>
      {/* </AuthMiddleware> */}
    </SessionWrapper>
  );
}