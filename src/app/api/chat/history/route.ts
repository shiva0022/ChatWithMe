import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { DatabaseService } from '@/services/databaseService';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const conversations = await DatabaseService.getUserConversations(userId);

    // Format conversations for the frontend
    const formattedConversations = conversations.map(conv => ({
      id: conv.id,
      title: conv.title,
      lastMessage: conv.messages[0]?.content || 'No messages',
      timestamp: conv.updatedAt.toISOString(),
      messageCount: conv.messages.length,
      userEmail: session.user.email
    }));

    return NextResponse.json({
      success: true,
      chats: formattedConversations,
      user: session.user
    });

  } catch (error) {
    console.error('Chat History API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
