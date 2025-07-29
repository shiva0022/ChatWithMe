'use client';
import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface AccountProps {
  setIsLogged: (value: boolean) => void;
}

const Account: React.FC<AccountProps> = ({ setIsLogged }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mock user data - TODO: Replace with NextAuth session data
  const user = {
    firstName: "Jakka",
    lastName: "Shiva",
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSignOut = () => {
    // TODO: Replace with NextAuth signOut
    localStorage.removeItem("token");
    setIsLogged(false);
    alert("You have signed out successfully");
  };

  return (
    <div className="flex items-center mr-4 gap-3">
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-10 h-10 flex items-center justify-center bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(124,58,237,0.5)] hover:shadow-[0_2px_15px_rgba(124,58,237,0.7)]">
          {getInitials(user.firstName, user.lastName)}
        </div>
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed] text-white rounded-full hover:bg-[#6d28d9] transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(124,58,237,0.5)] hover:shadow-[0_2px_15px_rgba(124,58,237,0.7)]"
        onClick={handleSignOut}
      >
        <FaSignOutAlt className="w-4 h-4" />
        <span className="text-sm font-medium">Sign Out</span>
      </button>
    </div>
  );
};

export default Account;
