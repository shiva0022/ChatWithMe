import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

// Mock chat history - in production, this would come from a database
const mockChatHistory = [
  {
    id: '1',
    title: 'Welcome to ChatWithMe',
    lastMessage: 'Hello! How can I assist you today?',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    messageCount: 2
  },
  {
    id: '2',
    title: 'JavaScript Questions',
    lastMessage: 'Sure! A closure is a function that remembers variables...',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    messageCount: 8
  },
  {
    id: '3',
    title: 'React Best Practices',
    lastMessage: 'Here are some React best practices you should follow...',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    messageCount: 12
  },
  {
    id: '4',
    title: 'API Integration Help',
    lastMessage: 'To integrate APIs in Next.js, you can use...',
    timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    messageCount: 6
  },
  {
    id: '5',
    title: 'Database Design Tips',
    lastMessage: 'When designing databases, consider normalization...',
    timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    messageCount: 15
  }
];

export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // In production, filter by user ID
    // For now, return mock data
    const chatHistory = mockChatHistory.map(chat => ({
      ...chat,
      userEmail: session.user.email
    }));

    return NextResponse.json({
      success: true,
      chats: chatHistory,
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
