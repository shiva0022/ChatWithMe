import axios from 'axios';
import { ChatResponse, ChatHistoryResponse } from '@/types/chat';
import { ModelType } from './modelRouterService';

const API_BASE_URL = '/api';

export class ChatService {
  /**
   * Send a message to the chat API
   */
  static async sendMessage(message: string, chatId?: string, model: ModelType = 'groq'): Promise<ChatResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message,
        chatId,
        model
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to send message');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Get chat history for the current user
   */
  static async getChatHistory(): Promise<ChatHistoryResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/history`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to load chat history');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Generate a chat title from the first message
   */
  static generateChatTitle(firstMessage: string): string {
    const maxLength = 50;
    if (firstMessage.length <= maxLength) {
      return firstMessage;
    }
    return firstMessage.substring(0, maxLength).trim() + '...';
  }

  /**
   * Format timestamp for display
   */
  static formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }
}
