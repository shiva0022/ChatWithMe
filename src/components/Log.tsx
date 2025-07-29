'use client';
import React from "react";

const Log: React.FC = () => {
  const handleClick = () => {
    alert("loadPreviousChat");
  };

  return (
    <div
      className="w-full cursor-pointer p-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-[#a970ff]/10 transition-all duration-200 border border-transparent hover:border-[#a970ff]/20"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <span className="truncate">Previous Chat History hjj jknsaj JN AknlanKANKNak</span>
      </div>
    </div>
  );
};

export default Log;
