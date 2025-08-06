# 🗄️ Database Integration Guide (PostgreSQL + Prisma)

This comprehensive guide explains how PostgreSQL database is integrated with Prisma ORM in the ChatWithMe project, from setup to advanced usage.

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Database Setup](#database-setup)
4. [Prisma Configuration](#prisma-configuration)
5. [Schema Design](#schema-design)
6. [Service Implementation](#service-implementation)
7. [Migration Management](#migration-management)
8. [Integration Flow](#integration-flow)
9. [Advanced Features](#advanced-features)
10. [Testing & Debugging](#testing--debugging)
11. [Production Deployment](#production-deployment)
12. [Troubleshooting](#troubleshooting)

---

## 1. Overview

The ChatWithMe project uses a robust database stack:
- **Database**: PostgreSQL 15+
- **ORM**: Prisma (v6.13.0)
- **Authentication**: NextAuth.js with Prisma Adapter
- **Features**: User management, conversation history, message storage, preferences

### Architecture Overview
```mermaid
graph TB
    A[Next.js API Routes] --> B[Database Service]
    B --> C[Prisma Client]
    C --> D[PostgreSQL Database]
    
    E[NextAuth.js] --> C
    F[Chat Components] --> A
    G[User Management] --> A
    
    subgraph "Database Tables"
        H[Users]
        I[Accounts]
        J[Sessions]
        K[Conversations]
        L[Messages]
        M[User Preferences]
    end
    
    D --> H
    D --> I
    D --> J
    D --> K
    D --> L
    D --> M
```

---

## 2. Prerequisites

### System Requirements
- Node.js 18+ installed
- PostgreSQL 15+ running locally or remotely
- npm or yarn package manager

### Required Dependencies
```json
{
  "dependencies": {
    "@prisma/client": "^6.13.0",
    "@next-auth/prisma-adapter": "^1.0.7",
    "prisma": "^6.13.0",
    "@types/pg": "^8.15.5",
    "pg": "^8.16.3"
  }
}
```

---

## 3. Database Setup

### Step 3.1: Install PostgreSQL

#### Option A: Local Installation (Windows)
1. Download PostgreSQL from [official website](https://www.postgresql.org/download/windows/)
2. Run installer and follow setup wizard
3. Remember the password for `postgres` user
4. Default port: `5432`

#### Option B: Docker Installation
```bash
# Run PostgreSQL in Docker container
docker run --name chatbot-postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=ChatWithMe \
  -p 5432:5432 \
  -d postgres:15
```

#### Option C: Cloud Database (Recommended for Production)
- **Supabase**: Free tier with PostgreSQL
- **Railway**: Simple PostgreSQL hosting
- **Vercel Postgres**: Integrated with Vercel deployments
- **AWS RDS**: Enterprise-grade PostgreSQL

### Step 3.2: Create Database
```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE "ChatWithMe";

-- Create user (optional, for security)
CREATE USER chatbot_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE "ChatWithMe" TO chatbot_user;
```

### Step 3.3: Environment Configuration
Create/update `.env` file:
```env
# Database URL for Prisma CLI
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/ChatWithMe"

# Alternative format for custom user
# DATABASE_URL="postgresql://chatbot_user:secure_password@localhost:5432/ChatWithMe"

# For cloud databases:
# DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

**Important**: The current `.env` shows:
```env
DATABASE_URL="postgresql://postgres:Shiva@0022@localhost:5432/ChatWithMe"
```
This suggests the password contains special characters. Ensure proper URL encoding if needed.

---

## 4. Prisma Configuration

### Step 4.1: Prisma Schema
Location: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// NextAuth.js required models
model User {
  id            String           @id @default(cuid())
  name          String?
  email         String           @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  
  // Relations
  accounts      Account[]
  conversations Conversation[]
  messages      Message[]
  sessions      Session[]
  preferences   UserPreferences?

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verificationtokens")
}

// Chat-specific models
model Conversation {
  id        String    @id @default(cuid())
  title     String?
  userId    String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  // Relations
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages  Message[]

  @@map("conversations")
}

model Message {
  id             String       @id @default(cuid())
  content        String
  role           String       // 'user' or 'assistant'
  model          String?      // 'groq', 'gemini', 'rag', etc.
  conversationId String
  userId         String
  createdAt      DateTime     @default(now())
  
  // Relations
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("messages")
}

model UserPreferences {
  id           String   @id @default(cuid())
  userId       String   @unique
  defaultModel String   @default("groq")
  theme        String   @default("dark")
  language     String   @default("en")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_preferences")
}
```

### Step 4.2: Prisma Client Setup
Location: `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // Enable query logging in development
  })

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Key Features:**
- **Global Instance**: Prevents multiple Prisma client instances
- **Query Logging**: Enabled for debugging in development
- **Hot Reload Safe**: Works with Next.js hot reloading

---

## 5. Schema Design

### Entity Relationships
```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o{ Conversation : creates
    User ||--o{ Message : sends
    User ||--|| UserPreferences : has
    
    Conversation ||--o{ Message : contains
    
    User {
        string id PK
        string email UK
        string name
        string image
        datetime createdAt
        datetime updatedAt
    }
    
    Conversation {
        string id PK
        string userId FK
        string title
        datetime createdAt
        datetime updatedAt
    }
    
    Message {
        string id PK
        string conversationId FK
        string userId FK
        string content
        string role
        string model
        datetime createdAt
    }
    
    UserPreferences {
        string id PK
        string userId FK
        string defaultModel
        string theme
        string language
    }
```

### Design Principles
1. **Cascade Deletes**: User deletion removes all related data
2. **Unique Constraints**: Email uniqueness, session tokens
3. **Indexing**: Automatic indexes on foreign keys and unique fields
4. **Timestamps**: Automatic tracking of creation and update times
5. **Flexibility**: JSON-like storage for future extensibility

---

## 6. Service Implementation

### Step 6.1: Database Service
Location: `src/services/databaseService.ts`

```typescript
import { prisma } from '@/lib/prisma';
import { ChatMessage } from '@/types/chat';

export class DatabaseService {
  // ===============================
  // CONVERSATION MANAGEMENT
  // ===============================
  
  // Create a new conversation
  static async createConversation(userId: string, title?: string) {
    return await prisma.conversation.create({
      data: {
        userId,
        title: title || `New Chat ${new Date().toLocaleDateString()}`,
      },
    });
  }

  // Get user conversations with latest message preview
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

  // Get full conversation with all messages
  static async getConversation(conversationId: string, userId: string) {
    return await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId, // Security: user can only access their own conversations
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }, // Chronological order
        },
      },
    });
  }

  // Update conversation title
  static async updateConversationTitle(conversationId: string, userId: string, title: string) {
    return await prisma.conversation.update({
      where: {
        id: conversationId,
        // Note: Prisma doesn't support compound where in update
        // Security handled at application level
      },
      data: {
        title,
        updatedAt: new Date(),
      },
    });
  }

  // Delete conversation and all messages
  static async deleteConversation(conversationId: string, userId: string) {
    // First verify ownership
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId }
    });
    
    if (!conversation) {
      throw new Error('Conversation not found or access denied');
    }

    return await prisma.conversation.delete({
      where: { id: conversationId },
    });
  }

  // ===============================
  // MESSAGE MANAGEMENT
  // ===============================
  
  // Add message to conversation
  static async addMessage(
    conversationId: string,
    userId: string,
    content: string,
    role: 'user' | 'assistant',
    model?: string
  ) {
    // Update conversation's updatedAt timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });

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
  static async getConversationHistory(
    conversationId: string, 
    userId: string, 
    limit: number = 10
  ) {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        userId,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Return in chronological order for AI context
    return messages.reverse().map(msg => ({
      role: msg.role,
      content: msg.content,
    }));
  }

  // Delete specific message
  static async deleteMessage(messageId: string, userId: string) {
    // First verify ownership
    const message = await prisma.message.findFirst({
      where: { id: messageId, userId }
    });
    
    if (!message) {
      throw new Error('Message not found or access denied');
    }

    return await prisma.message.delete({
      where: { id: messageId },
    });
  }

  // ===============================
  // USER PREFERENCES
  // ===============================
  
  // Get user preferences
  static async getUserPreferences(userId: string) {
    return await prisma.userPreferences.findUnique({
      where: { userId }
    });
  }

  // Update user preferences (create if doesn't exist)
  static async updateUserPreferences(
    userId: string,
    preferences: Partial<{
      defaultModel: string;
      theme: string;
      language: string;
    }>
  ) {
    return await prisma.userPreferences.upsert({
      where: { userId },
      update: {
        ...preferences,
        updatedAt: new Date(),
      },
      create: {
        userId,
        ...preferences,
      },
    });
  }

  // ===============================
  // ANALYTICS & UTILITIES
  // ===============================
  
  // Get user statistics
  static async getUserStats(userId: string) {
    const [conversationCount, messageCount, totalTokens] = await Promise.all([
      prisma.conversation.count({ where: { userId } }),
      prisma.message.count({ where: { userId } }),
      prisma.message.aggregate({
        where: { userId },
        _sum: { content: true }, // This would need a token count field in production
      }),
    ]);

    return {
      conversationCount,
      messageCount,
      joinedAt: await prisma.user.findUnique({
        where: { id: userId },
        select: { createdAt: true }
      })?.then(u => u?.createdAt),
    };
  }

  // Search conversations
  static async searchConversations(userId: string, query: string) {
    return await prisma.conversation.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          {
            messages: {
              some: {
                content: { contains: query, mode: 'insensitive' }
              }
            }
          }
        ]
      },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
  }
}
```

### Step 6.2: API Integration Example
Location: `src/app/api/chat/route.ts`

```typescript
import { DatabaseService } from '@/services/databaseService';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, model = 'groq', conversationId } = await request.json();

    // Create conversation if it doesn't exist
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const newConversation = await DatabaseService.createConversation(
        session.user.id,
        message.slice(0, 50) + '...' // Use first 50 chars as title
      );
      currentConversationId = newConversation.id;
    }

    // Save user message
    await DatabaseService.addMessage(
      currentConversationId,
      session.user.id,
      message,
      'user'
    );

    // Get conversation history for AI context
    const conversationHistory = await DatabaseService.getConversationHistory(
      currentConversationId,
      session.user.id,
      10
    );

    // Generate AI response
    const aiResult = await ModelRouterService.generateResponse(
      model as ModelType,
      message,
      conversationHistory
    );

    // Save AI message
    await DatabaseService.addMessage(
      currentConversationId,
      session.user.id,
      aiResult.response,
      'assistant',
      aiResult.model
    );

    return NextResponse.json({
      userMessage: {
        id: uuidv4(),
        content: message,
        role: 'user',
        timestamp: new Date().toISOString(),
        conversationId: currentConversationId
      },
      aiMessage: {
        id: uuidv4(),
        content: aiResult.response,
        role: 'assistant',
        model: aiResult.model,
        timestamp: new Date().toISOString(),
        conversationId: currentConversationId
      }
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
```

---

## 7. Migration Management

### Step 7.1: Initial Setup
```bash
# Navigate to project root
cd c:\projects\chatbot

# Generate Prisma client
npm run db:generate

# Push schema to database (for development)
npm run db:push
```

### Step 7.2: Development Workflow
```bash
# After schema changes, generate new client
npm run db:generate

# Push changes to development database
npm run db:push

# View data in browser
npm run db:studio
```

### Step 7.3: Production Migrations
```bash
# Create migration file
npm run db:migrate

# Apply migrations in production
npx prisma migrate deploy
```

### Step 7.4: Common Migration Commands
```bash
# Reset database (WARNING: Deletes all data)
npm run db:reset

# Seed database with initial data
npx prisma db seed

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

---

## 8. Integration Flow

### Chat Message Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant DatabaseService
    participant Prisma
    participant PostgreSQL
    
    User->>Frontend: Send message
    Frontend->>API: POST /api/chat
    API->>DatabaseService: createConversation() if new
    DatabaseService->>Prisma: conversation.create()
    Prisma->>PostgreSQL: INSERT INTO conversations
    
    API->>DatabaseService: addMessage(user message)
    DatabaseService->>Prisma: message.create()
    Prisma->>PostgreSQL: INSERT INTO messages
    
    API->>DatabaseService: getConversationHistory()
    DatabaseService->>Prisma: message.findMany()
    Prisma->>PostgreSQL: SELECT * FROM messages
    
    Note over API: Generate AI response
    
    API->>DatabaseService: addMessage(AI response)
    DatabaseService->>Prisma: message.create()
    Prisma->>PostgreSQL: INSERT INTO messages
    
    API->>Frontend: Return messages
    Frontend->>User: Display chat
```

### User Session Flow
```mermaid
sequenceDiagram
    participant User
    participant NextAuth
    participant PrismaAdapter
    participant PostgreSQL
    
    User->>NextAuth: Login with Google
    NextAuth->>PrismaAdapter: Create/Update user
    PrismaAdapter->>PostgreSQL: INSERT/UPDATE users, accounts, sessions
    NextAuth->>User: Authenticated session
```

---

## 9. Advanced Features

### Step 9.1: Database Indexing
```sql
-- Add indexes for better performance (handled automatically by Prisma)
CREATE INDEX idx_messages_conversation_created ON messages(conversation_id, created_at);
CREATE INDEX idx_conversations_user_updated ON conversations(user_id, updated_at);
CREATE INDEX idx_messages_user_created ON messages(user_id, created_at);
```

### Step 9.2: Full-Text Search
```prisma
// Add to schema for advanced search
model Message {
  // ... existing fields
  searchVector String? // For full-text search
  
  @@index([searchVector])
}
```

### Step 9.3: Soft Deletes
```prisma
model Conversation {
  // ... existing fields
  deletedAt DateTime?
  
  @@map("conversations")
}

model Message {
  // ... existing fields
  deletedAt DateTime?
  
  @@map("messages")
}
```

### Step 9.4: Message Reactions
```prisma
model MessageReaction {
  id        String   @id @default(cuid())
  messageId String
  userId    String
  type      String   // 'like', 'dislike', 'helpful', etc.
  createdAt DateTime @default(now())
  
  message Message @relation(fields: [messageId], references: [id], onDelete: Cascade)
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([messageId, userId, type])
  @@map("message_reactions")
}
```

---

## 10. Testing & Debugging

### Step 10.1: Prisma Studio
```bash
# Open database GUI
npm run db:studio
```
- View all tables and data
- Edit records directly
- Test queries visually

### Step 10.2: Query Debugging
```typescript
// Enable detailed logging
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});
```

### Step 10.3: Connection Testing
```typescript
// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    const userCount = await prisma.user.count();
    console.log(`👥 Total users: ${userCount}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
```

### Step 10.4: Sample Data Seeding
Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  // Create test conversation
  const conversation = await prisma.conversation.create({
    data: {
      title: 'Test Conversation',
      userId: user.id,
    },
  });

  // Create test messages
  await prisma.message.createMany({
    data: [
      {
        conversationId: conversation.id,
        userId: user.id,
        content: 'Hello, how are you?',
        role: 'user',
      },
      {
        conversationId: conversation.id,
        userId: user.id,
        content: 'I\'m doing great! How can I help you today?',
        role: 'assistant',
        model: 'groq',
      },
    ],
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

---

## 11. Production Deployment

### Step 11.1: Environment Variables
```env
# Production environment variables
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
SHADOW_DATABASE_URL="postgresql://user:password@host:port/shadow_db?sslmode=require"
```

### Step 11.2: Migration Strategy
```bash
# 1. Backup production database
pg_dump $DATABASE_URL > backup.sql

# 2. Apply migrations
npx prisma migrate deploy

# 3. Generate client
npx prisma generate
```

### Step 11.3: Connection Pooling
```typescript
// For serverless environments
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "?connection_limit=1",
    },
  },
});
```

### Step 11.4: Cloud Database Providers

#### Supabase
```env
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres?sslmode=require"
```

#### Railway
```env
DATABASE_URL="postgresql://postgres:[password]@[host]:5432/railway?sslmode=require"
```

#### Vercel Postgres
```env
POSTGRES_URL="postgres://[user]:[password]@[host]/[database]?sslmode=require"
DATABASE_URL="$POSTGRES_URL"
```

---

## 12. Troubleshooting

### Issue: "Connection refused" or "Connection timeout"
**Solutions:**
- Check if PostgreSQL is running
- Verify connection string format
- Check firewall settings
- Ensure database exists

### Issue: "Prisma Client not generated"
**Solutions:**
```bash
npx prisma generate
```

### Issue: "Migration failed"
**Solutions:**
- Check schema syntax
- Resolve data conflicts manually
- Use `npx prisma db push` for development
- Reset database if acceptable: `npx prisma migrate reset`

### Issue: "Too many connections"
**Solutions:**
- Implement connection pooling
- Use `prisma.$disconnect()` properly
- Configure database connection limits
- Use serverless-friendly connection strings

### Issue: "Permission denied"
**Solutions:**
- Check database user permissions
- Verify SSL requirements
- Update connection string with proper credentials

### Issue: "Schema drift detected"
**Solutions:**
```bash
# Reset development database
npx prisma db push --force-reset

# Or create new migration
npx prisma migrate dev --name fix-schema-drift
```

---

## 🔗 Useful Links

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [NextAuth.js Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [Prisma Studio](https://www.prisma.io/studio)

---

## ✅ Checklist

- [ ] PostgreSQL database created and running
- [ ] Environment variables configured
- [ ] Prisma schema defined
- [ ] Initial migration applied
- [ ] Prisma client generated
- [ ] Database service implemented
- [ ] API integration complete
- [ ] Authentication working with database
- [ ] Chat functionality storing messages
- [ ] Error handling implemented
- [ ] Backup strategy planned

---

**Need Help?** Check the troubleshooting section or run `npx prisma --help` for available commands.
