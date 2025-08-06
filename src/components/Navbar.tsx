'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import AuthButtons from "./AuthButtons";
import Account from "./Account";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <header className="h-16 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-transparent"></div>
      <nav className="relative h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 relative">
            <Image 
              className="object-contain" 
              src="/assets/logo.png" 
              alt="logo"
              fill
              sizes="40px"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-transparent bg-clip-text">
              ChatWithMe
            </span>
            <span className="text-xs text-gray-400">Your AI Assistant</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="w-8 h-8 border-2 border-[#a970ff]/20 border-t-[#a970ff] rounded-full animate-spin"></div>
          ) : session ? (
            <Account session={session} />
          ) : (
            <AuthButtons />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
