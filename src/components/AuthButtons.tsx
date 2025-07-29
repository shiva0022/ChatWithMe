'use client';
import React from "react";
import { useRouter } from "next/navigation";

const AuthButtons: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all duration-300 cursor-pointer"
        onClick={() => router.push("/login")}
      >
        Login
      </button>
      <button
        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#a970ff]/20 transition-all duration-300 cursor-pointer"
        onClick={() => router.push("/register")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;
