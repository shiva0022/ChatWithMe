'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useChat } from "@/contexts/ChatContext";
import { ChatService } from "@/services/chatService";
import { ChatMessage } from "@/types/chat";

interface ResponseItemProps {
  message: ChatMessage;
}
const ResponseItem: React.FC<ResponseItemProps> = ({ message }) => {
  const isUser = message.sender === "user";
  const user = message.user;

  const getInitials = (name: string | null) => {
    if (!name) return isUser ? "U" : "AI";
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-white flex items-center justify-center font-semibold mr-2 shadow-lg">
          {getInitials(user.name)}
        </div>
      )}
      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg p-3 rounded-lg text-sm shadow-md ${
          isUser
            ? "bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-white rounded-br-none"
            : "bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white rounded-bl-none border border-[#a855f7]/30"
        }`}
      >
        <p className="mb-1 whitespace-pre-wrap break-words">{message.content}</p>
        <div className="text-[11px] text-gray-400 text-right">
          {ChatService.formatTimestamp(message.timestamp)}
        </div>
      </div>
      {isUser && (
        <div className="w-9 h-9 rounded-full ml-2 shadow-lg overflow-hidden border-2 border-[#a970ff]">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white flex items-center justify-center font-semibold">
              {getInitials(user.name)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Responses: React.FC = () => {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  return (
    <div className="h-full w-full overflow-y-auto px-4 py-2 scroll-smooth custom-scrollbar">
      {state.messages.map((message) => (
        <ResponseItem key={message.id} message={message} />
      ))}
      
      {state.isLoading && (
        <div className="flex justify-start mb-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-white flex items-center justify-center font-semibold mr-2 shadow-lg">
            AI
          </div>
          <div className="max-w-xs sm:max-w-md p-3 rounded-lg text-sm shadow-md bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white rounded-bl-none border border-[#a855f7]/30">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#a970ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#a970ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#a970ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-gray-400 text-xs">AI is typing...</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Responses;
