import axios from 'axios';

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class GroqService {
  static async generateResponse(
    userMessage: string,
    conversationHistory: GroqMessage[] = []
  ): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'your-groq-api-key-here') {
      throw new Error('Groq API key not configured.');
    }
    const systemMessage: GroqMessage = {
      role: 'system',
      content: `You are ChatWithMe, a helpful and friendly AI assistant. You provide clear, concise, and helpful responses to user questions. Be conversational, accurate, and supportive.`
    };
    const messages: GroqMessage[] = [
      systemMessage,
      ...conversationHistory.slice(-10),
      { role: 'user', content: userMessage }
    ];
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages,
          max_tokens: 1000,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );
      const content = response.data.choices[0]?.message?.content;
      if (!content) throw new Error('No response from Groq API');
      return content.trim();
    } catch (error: any) {
      console.error('Groq API Error:', error);
      throw new Error('Failed to generate AI response. Please try again.');
    }
  }
  static isConfigured(): boolean {
    return !!process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your-groq-api-key-here';
  }
}
