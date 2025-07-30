'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatMessage, ChatSession } from '@/types/chat';

interface ChatState {
  currentChatId: string | null;
  messages: ChatMessage[];
  chatHistory: ChatSession[];
  isLoading: boolean;
  error: string | null;
}

type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_CHAT'; payload: string | null }
  | { type: 'ADD_MESSAGES'; payload: ChatMessage[] }
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'SET_CHAT_HISTORY'; payload: ChatSession[] }
  | { type: 'CLEAR_CURRENT_CHAT' };

const initialState: ChatState = {
  currentChatId: null,
  messages: [],
  chatHistory: [],
  isLoading: false,
  error: null,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChatId: action.payload };
    case 'ADD_MESSAGES':
      return { ...state, messages: [...state.messages, ...action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_CHAT_HISTORY':
      return { ...state, chatHistory: action.payload };
    case 'CLEAR_CURRENT_CHAT':
      return { ...state, currentChatId: null, messages: [] };
    default:
      return state;
  }
};

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
