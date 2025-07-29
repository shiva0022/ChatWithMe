import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatWithMe - Your AI Assistant",
  description: "A modern AI chatbot interface built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
