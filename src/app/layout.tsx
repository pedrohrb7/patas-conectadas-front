import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

export const metadata: Metadata = {
  title: "Patas Conectadas",
  description: "Sistema de gestão para ONGs de proteção animal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen bg-gray-50 text-black">
          {children}
        </main>
      </body>
    </html>
  );
}
