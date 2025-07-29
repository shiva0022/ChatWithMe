'use client';
import React from "react";
import Log from "./Log";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const Sidebar: React.FC = () => {
  const handleNewChat = () => {
    alert("new Chat");
  };

  return (
    <div className="group h-[calc(100vh-5rem)] w-[20vw] rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#a970ff]/10 shadow-2xl flex flex-col relative overflow-hidden sidebar">
      <div className="absolute inset-0 bg-gradient-to-br from-[#a970ff]/5 via-transparent to-[#8a4fff]/5"></div>
      
      <div className="flex items-center justify-between p-4 border-b border-[#a970ff]/10 relative">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-transparent bg-clip-text">New Chat</h1>
        <button
          className="cursor-pointer rounded-full bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-[#a970ff]/20"
          type="button"
          onClick={handleNewChat}
        >
          <PlusIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>
      </div>
      
      <div className="flex items-center gap-3 p-4 border-b border-[#a970ff]/10 relative">
        <BookOpenIcon className="w-6 h-6 text-[#a970ff]" strokeWidth={2.5} />
        <h1 className="text-lg font-medium bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-transparent bg-clip-text">History</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#1a1a1a] [&::-webkit-scrollbar-thumb]:bg-[#a970ff] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#8a4fff] [&::-webkit-scrollbar]:opacity-0 group-hover:[&::-webkit-scrollbar]:opacity-100 transition-opacity duration-200">
        <div className="flex flex-col gap-1.5 p-3">
          {Array.from({ length: 25 }).map((_, i) => (
            <Log key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
