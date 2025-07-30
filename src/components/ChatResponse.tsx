'use client';
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import Welcome from "./Welcome";
import Responses from "./Responses";

const ChatResponse: React.FC = () => {
  const { state } = useChat();

  return (
    <div className="h-full w-full">
      {state.messages.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <Welcome />
        </div>
      ) : (
        <Responses />
      )}
    </div>
  );
};

export default ChatResponse;
