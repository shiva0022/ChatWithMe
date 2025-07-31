import { ChatMessage } from '@/types/chat';

export class RagService {
  private static readonly API_URL = process.env.RAG_API_URL || 'http://localhost:8000/api/rag';
  
  static isConfigured(): boolean {
    return !!process.env.RAG_API_KEY && !!process.env.RAG_API_URL;
  }

  static async generateResponse(
    message: string, 
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('RAG service not configured');
    }

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RAG_API_KEY}`,
        },
        body: JSON.stringify({
          query: message,
          history: conversationHistory,
          options: {
            temperature: 0.7,
            max_tokens: 1024,
            top_k: 5, // Number of documents to retrieve
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`RAG API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (!data.response) {
        throw new Error('Invalid response format from RAG API');
      }

      return data.response;
    } catch (error) {
      console.error('RAG API Error:', error);
      throw new Error(`Failed to generate RAG response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Additional method for RAG-specific functionality
  static async searchDocuments(query: string, limit: number = 5): Promise<any[]> {
    if (!this.isConfigured()) {
      throw new Error('RAG service not configured');
    }

    try {
      const response = await fetch(`${this.API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RAG_API_KEY}`,
        },
        body: JSON.stringify({
          query,
          limit,
        }),
      });

      if (!response.ok) {
        throw new Error(`RAG search error: ${response.status}`);
      }

      const data = await response.json();
      return data.documents || [];
    } catch (error) {
      console.error('RAG Search Error:', error);
      throw new Error(`Failed to search documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
