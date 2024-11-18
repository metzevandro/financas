import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "design-system-zeroz/dist/index.esm.css";
import "design-system-zeroz/src/scss/tokens/tokens.scss";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import LayoutPage from "@/app/(protected)/_components/layout";
import { UserProvider } from "@/data/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeuDim",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="pt-br" data-company="whitelabel">
        <body className={inter.className}>
          <LayoutPage>{children}</LayoutPage>
        </body>
      </html>
    </SessionProvider>
  );
}
