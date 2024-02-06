import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { hooks } from "./css-hooks";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSS Hooks Example",
  description: "An example showing how to utilize CSS Hooks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: hooks }} />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
