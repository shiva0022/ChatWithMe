'use client';
import React from "react";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import type { Session } from "next-auth";

interface AccountProps {
  session: Session;
}

const Account: React.FC<AccountProps> = ({ session }) => {
  const user = session.user;

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex items-center mr-4 gap-3">
      <div className="group relative">
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#a970ff] hover:border-[#8a4fff] transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(169,112,255,0.5)] hover:shadow-[0_2px_15px_rgba(169,112,255,0.7)]"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-white rounded-full hover:from-[#8a4fff] hover:to-[#a970ff] transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(169,112,255,0.5)] hover:shadow-[0_2px_15px_rgba(169,112,255,0.7)]">
            {getInitials(user?.name || "User")}
          </div>
        )}
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-white rounded-full hover:from-[#8a4fff] hover:to-[#a970ff] transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(169,112,255,0.5)] hover:shadow-[0_2px_15px_rgba(169,112,255,0.7)]"
        onClick={handleSignOut}
      >
        <FaSignOutAlt className="w-4 h-4" />
        <span className="text-sm font-medium">Sign Out</span>
      </button>
    </div>
  );
};

export default Account;
