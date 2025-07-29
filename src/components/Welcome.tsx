'use client';
import React from "react";
import Image from "next/image";

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a970ff]/20 via-[#8a4fff]/20 to-[#6a3fff]/20 rounded-full blur-2xl"></div>
        <div className="w-48 h-48 relative z-10 drop-shadow-[0_0_15px_#a970ff] hover:scale-105 transition-transform duration-300">
          <Image
            className="object-contain"
            src="/assets/logo.png"
            alt="logo-img"
            fill
            sizes="192px"
          />
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-transparent bg-clip-text">
          ChatWithMe
        </h1>
        <div className="space-y-2">
          <p className="text-lg text-gray-300">Greetings, I am your personal chat Assistant</p>
          <p className="text-xl text-[#a970ff] font-medium">How Can I help?</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
