import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import { ModelRouterService, ModelType } from '@/services/modelRouterService';
import { DatabaseService } from '@/services/databaseService';
import { authOptions } from '@/lib/auth';

// Fallback AI response function for when Groq is not configured
async function generateFallbackResponse(message: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Mock responses based on message content
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

// Generate AI response using selected model
async function generateAIResponse(
  message: string, 
  model: ModelType = 'groq',
  conversationHistory: any[] = []
): Promise<{ response: string; model: ModelType }> {
  const chatHistory = conversationHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));
  
  return await ModelRouterService.generateResponse(model, message, chatHistory);
}

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const { message, conversationId, model = 'groq' } = await request.json();
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate model
    const validModels: ModelType[] = ['groq', 'gemini', 'rag'];
    const selectedModel: ModelType = validModels.includes(model as ModelType) ? model as ModelType : 'groq';

    // Find user in database
    const userEmail = session.user.email;
    const userId = session.user.id;

    // Create or get conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const newConversation = await DatabaseService.createConversation(
        userId,
        message.trim().substring(0, 50) + '...'
      );
      currentConversationId = newConversation.id;
    }

    // Load conversation history for context
    const conversationHistory = await DatabaseService.getConversationHistory(
      currentConversationId,
      userId,
      10
    );

    // Save user message to database
    const userMessage = await DatabaseService.addMessage(
      currentConversationId,
      userId,
      message.trim(),
      'user'
    );

    // Generate AI response with conversation history
    const { response: aiResponse, model: usedModel } = await generateAIResponse(
      message.trim(), 
      selectedModel, 
      conversationHistory
    );

    // Save AI message to database
    const aiMessage = await DatabaseService.addMessage(
      currentConversationId,
      userId,
      aiResponse,
      'assistant',
      usedModel
    );

    // Return response
    return NextResponse.json({
      success: true,
      conversationId: currentConversationId,
      messages: [
        {
          id: userMessage.id,
          conversationId: currentConversationId,
          sender: 'user',
          content: userMessage.content,
          timestamp: userMessage.createdAt.toISOString(),
          user: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image
          }
        },
        {
          id: aiMessage.id,
          conversationId: currentConversationId,
          sender: 'assistant',
          content: aiMessage.content,
          timestamp: aiMessage.createdAt.toISOString(),
          model: usedModel,
          user: {
            name: 'ChatWithMe AI',
            email: 'ai@chatwithme.com',
            image: null
          }
        }
      ],
      user: session.user,
      modelUsed: usedModel
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
