'use client';
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { ChatService } from "@/services/chatService";
import { ChatSession } from "@/types/chat";

interface LogProps {
  chat: ChatSession;
}

const Log: React.FC<LogProps> = ({ chat }) => {
  const { state, dispatch } = useChat();

  const handleClick = () => {
    // For now, just clear current chat as we don't have individual chat loading
    // In a full implementation, you'd load specific chat messages
    dispatch({ type: 'CLEAR_CURRENT_CHAT' });
    dispatch({ type: 'SET_CURRENT_CHAT', payload: chat.id });
    
    // This would typically load the actual messages for this chat
    console.log(`Loading chat: ${chat.id}`);
  };

  const isActive = state.currentChatId === chat.id;

  return (
    <div
      className={`w-full cursor-pointer p-3 rounded-xl text-sm transition-all duration-200 border ${
        isActive 
          ? "bg-[#a970ff]/20 border-[#a970ff]/40 text-white" 
          : "text-gray-300 hover:text-white hover:bg-[#a970ff]/10 border-transparent hover:border-[#a970ff]/20"
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-1">
        <span className="truncate font-medium">{chat.title}</span>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span className="truncate flex-1 mr-2">{chat.lastMessage}</span>
          <span className="whitespace-nowrap">{ChatService.formatTimestamp(chat.timestamp)}</span>
        </div>
        <div className="text-xs text-gray-500">
          {chat.messageCount} message{chat.messageCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default Log;
