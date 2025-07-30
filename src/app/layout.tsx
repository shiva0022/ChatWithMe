import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";
import { ChatProvider } from "@/contexts/ChatContext";

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
        <NextAuthProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
