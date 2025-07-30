export interface ChatMessage {
  id: string;
  chatId: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  userEmail?: string;
}

export interface ChatResponse {
  success: boolean;
  chatId: string;
  messages: ChatMessage[];
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export interface ChatHistoryResponse {
  success: boolean;
  chats: ChatSession[];
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
