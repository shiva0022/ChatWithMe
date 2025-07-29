'use client';
import React from "react";

interface ResponseData {
  id: number;
  sender: string;
  initials: string;
  time: string;
  message: string;
}

const dummyResponses: ResponseData[] = [
  {
    id: 1,
    sender: "AI Assistant",
    initials: "AI",
    time: "Just now",
    message: "Hello! How can I assist you today?",
  },
  {
    id: 2,
    sender: "You",
    initials: "Y",
    time: "A moment ago",
    message: "Can you jkhkjhsfjhsfkafkdjhfkjahsfkjhdkfjhakjhsdmnvxkjc sifkjbvsnc osdjfbsamnbv jksnafuvj ksamv ZKxjvbnzsjkgfxbmvnskJZds,mxA:LKMZ<NCd ishJZ sfxicoKJSBN Fzvishkjvb xskJBVNoifkjhnasIOKLVHn soIJKVNexplain the concept of closures in JavaScript?",
  },
  {
    id: 3,
    sender: "AI Assistant",
    initials: "AI",
    time: "Now",
    message: "Sure! A closure is a function that remembers variables from its lexical scope even when the function is executed outside that scope.",
  },
];

interface ResponseItemProps {
  sender: string;
  initials: string;
  time: string;
  message: string;
}

const ResponseItem: React.FC<ResponseItemProps> = ({ sender, initials, time, message }) => {
  const isUser = sender === "You";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-white flex items-center justify-center font-semibold mr-2 shadow-lg">
          {initials}
        </div>
      )}
      <div
        className={`max-w-xs sm:max-w-md p-3 rounded-lg text-sm shadow-md ${
          isUser
            ? "bg-purple-600 text-white rounded-br-none"
            : "bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white rounded-bl-none border border-[#a855f7]/30"
        }`}
      >
        <p className="mb-1">{message}</p>
        <div className="text-[11px] text-gray-400 text-right">{time}</div>
      </div>
      {isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white flex items-center justify-center font-semibold ml-2 shadow-lg">
          {initials}
        </div>
      )}
    </div>
  );
};

const Responses: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto px-4 py-2 scroll-smooth">
      {dummyResponses.map((response) => (
        <ResponseItem key={response.id} {...response} />
      ))}
    </div>
  );
};

export default Responses;
