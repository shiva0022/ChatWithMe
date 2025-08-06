'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import ChatResponse from "./ChatResponse";
import SearchInput from "./SearchInput";
import ModelSelector from "./ModelSelector";

const Hero: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("groq");

  return (
    <div className="h-[calc(100vh-5rem)] w-[76vw] flex flex-col rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#a970ff]/10 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#a970ff]/5 via-transparent to-[#8a4fff]/5"></div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative">
        <ChatResponse />
      </div>

      <div className="px-4 pb-4 relative flex items-end gap-4">
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        <div className="flex-1">
          <SearchInput selectedModel={selectedModel} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
