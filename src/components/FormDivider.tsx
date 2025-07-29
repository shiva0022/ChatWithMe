'use client';
import React from "react";

interface FormDividerProps {
  text: string;
}

const FormDivider: React.FC<FormDividerProps> = ({ text }) => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#a970ff]/10"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-[#0a0a0a] text-gray-400">{text}</span>
      </div>
    </div>
  );
};

export default FormDivider;
