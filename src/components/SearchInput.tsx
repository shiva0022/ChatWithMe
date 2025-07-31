'use client';
import React, { useState, useRef } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useChat } from "@/contexts/ChatContext";
import { ChatService } from "@/services/chatService";
import ModelSelector from "./ModelSelector";
import { ModelType } from "@/services/modelRouterService";

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("groq");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const { state, dispatch } = useChat();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    setInputValue(event.target.value);
    
    if (textarea) {
      // Adjust the height of the textarea based on content
      textarea.style.height = "auto";

      // Limit height to 2 rows
      const maxHeight = textarea.scrollHeight > 0 ? textarea.scrollHeight : 0;
      const rowHeight = 24; // adjust based on actual line-height
      const maxRows = 2;
      const maxAllowedHeight = rowHeight * maxRows;

      textarea.style.height = Math.min(maxHeight, maxAllowedHeight) + "px";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      alert("Please sign in to send messages");
      return;
    }

    if (!inputValue.trim() || isSubmitting) {
      return;
    }

    const message = inputValue.trim();
    setInputValue("");
    setIsSubmitting(true);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Send message to API with selected model
      const response = await ChatService.sendMessage(message, state.currentChatId, selectedModel as ModelType);
      
      // Update chat state
      dispatch({ type: 'SET_CURRENT_CHAT', payload: response.chatId });
      dispatch({ type: 'ADD_MESSAGES', payload: response.messages });

    } catch (error) {
      console.error('Failed to send message:', error);
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to send message' });
      // Restore the input value if there was an error
      setInputValue(message);
    } finally {
      setIsSubmitting(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative">
      {state.error && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {state.error}
        </div>
      )}
      
      {/* Floating Model Selector */}
      <div className="mb-4 flex justify-start">
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </div>
      
      <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
        <div className="w-full bg-[#0a0a0a]/50 border border-[#a970ff]/10 rounded-2xl p-3 pl-5 transition-all duration-300 hover:border-[#a970ff]/20 focus-within:border-[#a970ff] focus-within:ring-2 focus-within:ring-[#a970ff]/20">
          <textarea
            className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none font-mono text-sm"
            placeholder={session ? "Ask anything..." : "Please sign in to send messages..."}
            rows={1}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            ref={textareaRef}
            disabled={!session || isSubmitting}
          />
        </div>
        <button 
          type="submit"
          disabled={!session || !inputValue.trim() || isSubmitting}
          className="p-2 rounded-full bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#a970ff]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <RocketLaunchIcon
              className="w-6 h-6 text-white cursor-pointer"
              strokeWidth={2.5}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
