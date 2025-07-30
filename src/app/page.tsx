import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1f] to-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#a970ff]/5 via-transparent to-[#8a4fff]/5"></div>
      <Navbar />
      <div className="flex px-4 pb-4 pt-2 gap-4 relative">
        <Sidebar />
        <Hero />
      </div>
    </div>
  );
}
