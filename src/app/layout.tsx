import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "GDG Connect",
  description:
    "A hub for GDG community organizers to post speaker/volunteer calls, and for members to apply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scrollbar-hide">
      <head></head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
