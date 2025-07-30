import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  /**
   * Generate AI response using OpenAI GPT
   */
  static async generateResponse(
    userMessage: string,
    conversationHistory: ChatMessage[] = []
  ): Promise<string> {
    try {
      // System prompt to define the AI's personality and behavior
      const systemMessage: ChatMessage = {
        role: 'system',
        content: `You are ChatWithMe, a helpful and friendly AI assistant. You provide clear, concise, and helpful responses to user questions. You are knowledgeable about a wide range of topics including technology, programming, general knowledge, and more. Always be polite, professional, and aim to be as helpful as possible.

Key characteristics:
- Be conversational and engaging
- Provide accurate information
- If you're unsure about something, say so
- Break down complex topics into understandable explanations
- Use examples when helpful
- Be encouraging and supportive`
      };

      // Prepare messages for the API
      const messages: ChatMessage[] = [
        systemMessage,
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        {
          role: 'user',
          content: userMessage
        }
      ];

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // You can change to 'gpt-4' if you have access
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response generated from OpenAI');
      }

      return response.trim();

    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      
      // Handle specific OpenAI errors
      if (error?.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      } else if (error?.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else if (error?.status === 500) {
        throw new Error('OpenAI service is temporarily unavailable. Please try again.');
      } else if (error?.code === 'insufficient_quota') {
        throw new Error('OpenAI API quota exceeded. Please check your billing.');
      }
      
      // Fallback error message
      throw new Error('Failed to generate AI response. Please try again.');
    }
  }

  /**
   * Check if OpenAI API key is configured
   */
  static isConfigured(): boolean {
    return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here';
  }

  /**
   * Generate a chat title from the first message
   */
  static async generateChatTitle(firstMessage: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Generate a short, descriptive title (max 6 words) for a chat that starts with the following message. Only return the title, nothing else.'
          },
          {
            role: 'user',
            content: firstMessage
          }
        ],
        max_tokens: 20,
        temperature: 0.5,
      });

      const title = completion.choices[0]?.message?.content?.trim();
      return title || firstMessage.substring(0, 50) + '...';

    } catch (error) {
      console.error('Failed to generate chat title:', error);
      // Fallback to truncated message
      return firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : '');
    }
  }
}
