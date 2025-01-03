import type { Metadata } from "next";
import StoreProvider from "@/app/store/provider";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import ClientLayout from "@/app/components/ClientLayout";

export const metadata: Metadata = {
  title: "Todo Daily",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        />
      </head>
      <body className="font-roboto">
        <StoreProvider>
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
        </StoreProvider>
      </body>
    </html>
  );
}