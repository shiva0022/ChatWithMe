import { prisma } from '@/lib/prisma';
import { ChatMessage } from '@/types/chat';

export class DatabaseService {
  // Create a new conversation
  static async createConversation(userId: string, title?: string) {
    return await prisma.conversation.create({
      data: {
        userId,
        title: title || `New Chat ${new Date().toLocaleDateString()}`,
      },
    });
  }

  // Get user conversations
  static async getUserConversations(userId: string) {
    return await prisma.conversation.findMany({
      where: { userId },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Get conversation with messages
  static async getConversation(conversationId: string, userId: string) {
    return await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  // Add message to conversation
  static async addMessage(
    conversationId: string,
    userId: string,
    content: string,
    role: 'user' | 'assistant',
    model?: string
  ) {
    return await prisma.message.create({
      data: {
        conversationId,
        userId,
        content,
        role,
        model,
      },
    });
  }

  // Get conversation history for AI context
  static async getConversationHistory(conversationId: string, userId: string, limit: number = 10) {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        userId,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return messages.reverse().map(msg => ({
      role: msg.role,
      content: msg.content,
    }));
  }

  // Update conversation title
  static async updateConversationTitle(conversationId: string, userId: string, title: string) {
    return await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        title,
        updatedAt: new Date(),
      },
    });
  }

  // Delete conversation
  static async deleteConversation(conversationId: string, userId: string) {
    return await prisma.conversation.delete({
      where: {
        id: conversationId,
      },
    });
  }

  // Get or create user preferences
  static async getUserPreferences(userId: string) {
    let preferences = await prisma.userPreferences.findUnique({
      where: { userId },
    });

    if (!preferences) {
      preferences = await prisma.userPreferences.create({
        data: {
          userId,
          defaultModel: 'groq',
          theme: 'dark',
          language: 'en',
        },
      });
    }

    return preferences;
  }

  // Update user preferences
  static async updateUserPreferences(
    userId: string,
    updates: {
      defaultModel?: string;
      theme?: string;
      language?: string;
    }
  ) {
    return await prisma.userPreferences.upsert({
      where: { userId },
      update: updates,
      create: {
        userId,
        defaultModel: updates.defaultModel || 'groq',
        theme: updates.theme || 'dark',
        language: updates.language || 'en',
      },
    });
  }

  // Clean up old conversations (optional utility)
  static async cleanupOldConversations(userId: string, keepCount: number = 50) {
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      skip: keepCount,
      select: { id: true },
    });

    if (conversations.length > 0) {
      await prisma.conversation.deleteMany({
        where: {
          id: { in: conversations.map(c => c.id) },
        },
      });
    }

    return conversations.length;
  }
}
