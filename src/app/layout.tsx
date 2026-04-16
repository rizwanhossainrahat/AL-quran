import type { Metadata } from "next";
import "./globals.css";
import { amiri, scheherazade } from "./fonts";
import { SettingsProvider } from "@/context/SettingsContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Al-Quran",
  description: "Read and search the Holy Quran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${scheherazade.variable}`}
    >
      <body className="min-h-screen bg-white text-slate-900">
        <SettingsProvider>
          <Header />
          <main>{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
