'use client';
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface GoogleButtonProps {
  text: string;
  disabled?: boolean;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ text, disabled = false }) => {
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-[#0a0a0a] border border-[#a970ff]/10 text-white font-medium rounded-lg transition-all duration-300 hover:bg-[#1a1a1a] hover:border-[#a970ff]/20 focus:outline-none focus:ring-2 focus:ring-[#a970ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Image 
        src="/assets/google-icon.svg" 
        alt="Google" 
        width={20}
        height={20}
        className="group-hover:scale-110 transition-transform duration-300" 
      />
      <span className="group-hover:translate-x-1 transition-transform duration-300">{text}</span>
    </button>
  );
};

export default GoogleButton;
