'use client';
import React from "react";

const RememberMe: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <input
          id="remember"
          type="checkbox"
          className="h-4 w-4 rounded border-[#a970ff]/10 bg-[#0a0a0a] text-[#a970ff] focus:ring-[#a970ff] transition-all duration-200"
        />
        <label htmlFor="remember" className="text-sm text-gray-400">
          Remember me
        </label>
      </div>
      <a href="#" className="text-sm text-[#a970ff] hover:text-[#8a4fff] transition-colors">
        Forgot password?
      </a>
    </div>
  );
};

export default RememberMe;
