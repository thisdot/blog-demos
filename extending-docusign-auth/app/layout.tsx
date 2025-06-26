import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskVibe",
  description:
    "TaskVibe is a task management tool that helps you stay organized and productive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
