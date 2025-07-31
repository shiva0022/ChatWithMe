'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useChat } from "@/contexts/ChatContext";
import { ChatService } from "@/services/chatService";
import { ChatMessage } from "@/types/chat";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

interface ResponseItemProps {
  message: ChatMessage;
}

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'text' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#1a0f1f]/90 to-[#2d1b4b]/80 backdrop-blur-xl px-4 py-3 rounded-t-xl border border-[#a970ff]/40 shadow-lg shadow-[#a970ff]/10">
        <span className="text-sm text-[#a970ff] font-mono font-semibold tracking-wide">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#a970ff]/20 transition-all duration-200 rounded-lg opacity-0 group-hover:opacity-100 transform hover:scale-105"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-gradient-to-br from-[#0a0a0a]/95 to-[#1a0f1f]/90 backdrop-blur-xl text-gray-200 p-5 rounded-b-xl border-l border-r border-b border-[#a970ff]/40 overflow-x-auto shadow-lg shadow-[#a970ff]/5">
        <code className="font-mono text-sm leading-relaxed">{code}</code>
      </pre>
    </div>
  );
};

const formatMessageContent = (content: string) => {
  // Split content by code blocks (```...```)
  const parts = content.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      // Extract language and code
      const lines = part.slice(3, -3).split('\n');
      const language = lines[0].trim() || 'text';
      const code = lines.slice(1).join('\n');
      return <CodeBlock key={index} code={code} language={language} />;
    } else {
      // Regular text with inline code and formatting
      const formattedText = part
        .split(/(`[^`]+`)/g)
        .map((segment, segIndex) => {
          if (segment.startsWith('`') && segment.endsWith('`')) {
            return (
              <code key={segIndex} className="bg-gradient-to-r from-[#a970ff]/25 to-[#8a4fff]/20 text-[#a970ff] px-2.5 py-1.5 rounded-lg text-sm font-mono border border-[#a970ff]/40 shadow-sm backdrop-blur-sm">
                {segment.slice(1, -1)}
              </code>
            );
          } else {
            // Handle bold (**text**) and headers (### text)
            return segment
              .split(/(\*\*[^*]+\*\*|#{1,6}\s[^\n]+)/g)
              .map((subsegment, subIndex) => {
                if (subsegment.startsWith('**') && subsegment.endsWith('**')) {
                  return <strong key={subIndex} className="font-bold text-[#a970ff] bg-[#a970ff]/10 px-1 rounded">{subsegment.slice(2, -2)}</strong>;
                } else if (subsegment.match(/^#{1,6}\s/)) {
                  const level = subsegment.match(/^#{1,6}/)?.[0].length || 1;
                  const text = subsegment.replace(/^#{1,6}\s/, '');
                  const HeadingTag = `h${Math.min(level + 2, 6)}` as keyof JSX.IntrinsicElements;
                  return (
                    <HeadingTag key={subIndex} className={`font-bold mt-6 mb-3 text-[#a970ff] border-l-4 border-[#a970ff]/50 pl-4 ${
                      level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : level === 3 ? 'text-lg' : 'text-base'
                    }`}>
                      {text}
                    </HeadingTag>
                  );
                }
                return subsegment;
              });
          }
        });
      
      return <div key={index} className="whitespace-pre-wrap break-words">{formattedText}</div>;
    }
  });
};

const ResponseItem: React.FC<ResponseItemProps> = ({ message }) => {
  const isUser = message.sender === "user";
  const user = message.user;

  const getInitials = (name: string | null) => {
    if (!name) return isUser ? "U" : "AI";
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-8 animate-fade-in group`}>
      {!isUser && (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-white flex items-center justify-center font-bold mr-4 shadow-lg shadow-[#a970ff]/30 flex-shrink-0 animate-bounce-in relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <span className="relative z-10">{getInitials(user.name)}</span>
        </div>
      )}
      <div
        className={`max-w-3xl p-5 rounded-3xl shadow-xl transition-all duration-300 backdrop-blur-xl border-2 relative overflow-hidden ${
          isUser
            ? "bg-gradient-to-br from-[#a970ff]/95 to-[#8a4fff]/90 text-white rounded-br-lg border-[#a970ff]/50 shadow-[#a970ff]/25"
            : "bg-gradient-to-br from-[#1a0f1f]/70 to-[#2d1b4b]/60 text-gray-100 rounded-bl-lg border-[#a970ff]/30 shadow-[#a970ff]/15 hover:bg-gradient-to-br hover:from-[#1a0f1f]/80 hover:to-[#2d1b4b]/70"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
        <div className="text-sm leading-relaxed relative z-10">
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            formatMessageContent(message.content)
          )}
        </div>
        <div className="text-xs text-gray-300 text-right mt-4 opacity-70 relative z-10">
          {ChatService.formatTimestamp(message.timestamp)}
        </div>
      </div>
      {isUser && (
        <div className="w-12 h-12 rounded-2xl ml-4 shadow-lg shadow-[#a970ff]/30 overflow-hidden border-2 border-[#a970ff]/60 flex-shrink-0 animate-bounce-in relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={48}
              height={48}
              className="w-full h-full object-cover relative z-10"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#9333ea] to-[#a855f7] text-white flex items-center justify-center font-bold relative z-10">
              {getInitials(user.name)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Responses: React.FC = () => {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-scroll to bottom when new messages arrive and mark them as visible immediately
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Mark new messages as visible immediately to prevent animation on new messages
    if (state.messages.length > 0) {
      const newMessageIds = state.messages.map(msg => msg.id);
      setVisibleMessages(prev => {
        const newSet = new Set(prev);
        newMessageIds.forEach(id => newSet.add(id));
        return newSet;
      });
    }
  }, [state.messages]);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const messageId = entry.target.getAttribute('data-message-id');
            if (messageId) {
              setVisibleMessages(prev => new Set([...prev, messageId]));
            }
          } else {
            // Remove from visible when not intersecting enough
            const messageId = entry.target.getAttribute('data-message-id');
            if (messageId) {
              setVisibleMessages(prev => {
                const newSet = new Set(prev);
                newSet.delete(messageId);
                return newSet;
              });
            }
          }
        });
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '10px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe message elements
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setMessageRef = (messageId: string) => (el: HTMLDivElement | null) => {
    if (el) {
      messageRefs.current.set(messageId, el);
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    } else {
      const existingEl = messageRefs.current.get(messageId);
      if (existingEl && observerRef.current) {
        observerRef.current.unobserve(existingEl);
      }
      messageRefs.current.delete(messageId);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto px-6 py-6 scroll-smooth custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        {state.messages.map((message, index) => (
          <div 
            key={message.id} 
            ref={setMessageRef(message.id)}
            data-message-id={message.id}
            className={`transform transition-all duration-600 ease-out ${
              visibleMessages.has(message.id) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-3 opacity-0'
            }`}
            style={{ 
              transitionDelay: '0s'
            }}
          >
            <ResponseItem message={message} />
          </div>
        ))}
        
        {state.isLoading && (
          <div className="flex justify-start mb-8 animate-fade-in transform translate-y-0 opacity-100 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-white flex items-center justify-center font-bold mr-4 shadow-lg shadow-[#a970ff]/30 flex-shrink-0 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <span className="relative z-10 animate-bounce">AI</span>
            </div>
            <div className="max-w-3xl p-5 rounded-3xl shadow-xl bg-gradient-to-br from-[#1a0f1f]/70 to-[#2d1b4b]/60 text-gray-100 rounded-bl-lg border-2 border-[#a970ff]/30 backdrop-blur-xl relative overflow-hidden animate-shimmer">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 bg-[#a970ff] rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-[#a970ff] rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-[#a970ff] rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-gray-300 text-sm font-medium">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Responses;
