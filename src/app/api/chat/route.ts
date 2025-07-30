import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from '@/services/openaiService';

// Fallback AI response function for when OpenAI is not configured
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

// Generate AI response using OpenAI or fallback
async function generateAIResponse(message: string, conversationHistory: any[] = []): Promise<string> {
  if (OpenAIService.isConfigured()) {
    try {
      // Convert conversation history to OpenAI format
      const chatHistory = conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      return await OpenAIService.generateResponse(message, chatHistory);
    } catch (error) {
      console.error('OpenAI failed, using fallback:', error);
      return await generateFallbackResponse(message);
    }
  } else {
    console.log('OpenAI not configured, using fallback responses');
    return await generateFallbackResponse(message);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const { message, chatId } = await request.json();
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate unique IDs
    const userMessageId = uuidv4();
    const aiMessageId = uuidv4();
    const currentChatId = chatId || uuidv4();
    const timestamp = new Date().toISOString();

    // Create user message
    const userMessage = {
      id: userMessageId,
      chatId: currentChatId,
      sender: 'user',
      content: message.trim(),
      timestamp,
      user: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      }
    };

    // Generate AI response (pass empty history for now - in production you'd load chat history)
    const conversationHistory: any[] = []; // TODO: Load actual conversation history from database
    const aiResponse = await generateAIResponse(message.trim(), conversationHistory);

    // Create AI message
    const aiMessage = {
      id: aiMessageId,
      chatId: currentChatId,
      sender: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
      user: {
        name: 'ChatWithMe AI',
        email: 'ai@chatwithme.com',
        image: null
      }
    };

    // Return both messages
    return NextResponse.json({
      success: true,
      chatId: currentChatId,
      messages: [userMessage, aiMessage],
      user: session.user
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
