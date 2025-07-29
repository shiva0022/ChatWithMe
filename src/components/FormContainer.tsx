'use client';
import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
  title: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1f] to-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#a970ff]/5 via-transparent to-[#a970ff]/5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
      
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-[#a970ff]/10 relative z-10 transform hover:scale-[1.01] transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a970ff]/5 via-transparent to-[#8a4fff]/5 rounded-2xl"></div>
        
        <h2 className="text-3xl font-bold mb-4 text-center text-white relative">
          <span className="bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-transparent bg-clip-text">{title}</span>
        </h2>
        
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
