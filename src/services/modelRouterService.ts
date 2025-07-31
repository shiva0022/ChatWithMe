import { GroqService } from './groqService';
import { GeminiService } from './geminiService';
import { RagService } from './ragService';

export type ModelType = 'groq' | 'gemini' | 'rag';

export interface ModelInfo {
  name: string;
  description: string;
  isConfigured: boolean;
  icon: string;
}

export class ModelRouterService {
  private static async generateFallbackResponse(message: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = {
      "hello": "Hello! How can I assist you today?",
      "how are you": "I'm doing great! Thanks for asking. How can I help you?",
      "what is your name": "I'm ChatWithMe, your AI assistant! What would you like to know?",
      "help": "I'm here to help! You can ask me questions about anything, and I'll do my best to provide helpful answers.",
      "bye": "Goodbye! Have a wonderful day! Feel free to come back anytime you need assistance.",
      "default": `I understand you're saying "${message}". That's an interesting point! I'm here to help with any questions or tasks you might have. What would you like to explore together?`
    };
    
    const lowerMessage = message.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  }

  static async generateResponse(
    model: ModelType,
    message: string,
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<{ response: string; model: ModelType }> {
    try {
      let response: string;

      switch (model) {
        case 'groq':
          if (GroqService.isConfigured()) {
            response = await GroqService.generateResponse(message, conversationHistory);
          } else {
            console.log('Groq not configured, using fallback');
            response = await this.generateFallbackResponse(message);
          }
          break;

        case 'gemini':
          if (GeminiService.isConfigured()) {
            response = await GeminiService.generateResponse(message, conversationHistory);
          } else {
            console.log('Gemini not configured, using fallback');
            response = await this.generateFallbackResponse(message);
          }
          break;

        case 'rag':
          if (RagService.isConfigured()) {
            response = await RagService.generateResponse(message, conversationHistory);
          } else {
            console.log('RAG not configured, using fallback');
            response = await this.generateFallbackResponse(message);
          }
          break;

        default:
          console.log('Unknown model, using fallback');
          response = await this.generateFallbackResponse(message);
          break;
      }

      return { response, model };
    } catch (error) {
      console.error(`${model} failed, using fallback:`, error);
      const fallbackResponse = await this.generateFallbackResponse(message);
      return { response: fallbackResponse, model };
    }
  }

  static getModelInfo(): Record<ModelType, ModelInfo> {
    return {
      groq: {
        name: 'Groq (Llama)',
        description: 'Fast and efficient language model',
        isConfigured: GroqService.isConfigured(),
        icon: '🚀'
      },
      gemini: {
        name: 'Google Gemini',
        description: 'Google\'s advanced AI model',
        isConfigured: GeminiService.isConfigured(),
        icon: '💎'
      },
      rag: {
        name: 'RAG Model',
        description: 'Retrieval-Augmented Generation',
        isConfigured: RagService.isConfigured(),
        icon: '📚'
      }
    };
  }

  static getAvailableModels(): ModelType[] {
    const modelInfo = this.getModelInfo();
    return Object.keys(modelInfo).filter(model => 
      modelInfo[model as ModelType].isConfigured
    ) as ModelType[];
  }

  static getDefaultModel(): ModelType {
    const availableModels = this.getAvailableModels();
    
    // Prefer groq if available, otherwise use the first available model
    if (availableModels.includes('groq')) {
      return 'groq';
    }
    
    return availableModels[0] || 'groq'; // fallback to groq even if not configured
  }
}
