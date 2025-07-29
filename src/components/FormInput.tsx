'use client';
import React from "react";

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  id, 
  type, 
  placeholder, 
  value, 
  onChange, 
  required = false 
}) => {
  return (
    <div className="group">
      <label 
        className="block text-[#a970ff] text-sm font-medium mb-1 group-hover:text-[#8a4fff] transition-colors" 
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="w-full px-4 py-2 rounded-lg bg-[#0a0a0a]/50 border border-[#a970ff]/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#a970ff] focus:ring-2 focus:ring-[#a970ff]/20 transition-all duration-200 group-hover:border-[#a970ff]/20"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;
