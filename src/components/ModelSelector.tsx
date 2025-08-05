'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { GiGoat } from 'react-icons/gi';

export interface ModelOption {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export const MODEL_OPTIONS: ModelOption[] = [
  { 
    value: "groq", 
    label: "Groq (Llama)", 
    description: "Fast and efficient language model",
    icon: <Image src="/assets/grok.svg" alt="Groq" width={16} height={16} />
  },
  { 
    value: "gemini", 
    label: "Google Gemini", 
    description: "Google's advanced AI model",
    icon: <SparklesIcon className="w-4 h-4 text-gray-300" />
  },
  { 
    value: "rag", 
    label: "RAG Model", 
    description: "Retrieval-Augmented Generation",
    icon: <GiGoat className="w-4 h-4 text-gray-300" />
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentModel = MODEL_OPTIONS.find(model => model.value === selectedModel);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModelSelect = (modelValue: string) => {
    onModelChange(modelValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Floating Circular Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a970ff]/20 to-[#8a4fff]/15 backdrop-blur-xl border-2 border-[#a970ff]/40 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-[#a970ff]/60 group relative overflow-hidden"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Model icon */}
        <div className="relative z-10">{currentModel?.icon || <SparklesIcon className="w-5 h-5 text-gray-300" />}</div>
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute bottom-14 left-0 w-64 bg-gradient-to-br from-[#1a0f1f]/95 to-[#2d1b4b]/90 backdrop-blur-xl rounded-xl z-[9999] overflow-hidden border border-[#a970ff]/20 transition-all duration-300 ease-out transform-gpu ${
        isOpen 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
      }`}>
          <div>
            {MODEL_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleModelSelect(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-[#a970ff]/20 transition-all duration-200 flex items-center gap-3 ${
                  selectedModel === option.value 
                    ? 'bg-[#a970ff]/30 text-[#a970ff]' 
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center">{option.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{option.description}</div>
                </div>
                {selectedModel === option.value && (
                  <div className="w-2 h-2 bg-[#a970ff] rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
};

export default ModelSelector;
