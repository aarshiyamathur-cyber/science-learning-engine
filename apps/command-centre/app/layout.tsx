import type { Metadata } from "next";
import { Nav } from "./components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Command Centre",
  description: "Internal dashboard for tracking the Aarshiya Science Learning System project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full">
        <Nav />
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
