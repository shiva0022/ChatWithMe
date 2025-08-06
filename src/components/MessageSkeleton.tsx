'use client';
import React from 'react';
import Skeleton from './Skeleton';

interface MessageSkeletonProps {
  type?: 'user' | 'assistant';
  showAvatar?: boolean;
  showCodeBlock?: boolean;
  responseType?: 'short' | 'medium' | 'long' | 'code' | 'list';
  estimatedLines?: number; // For precise control
}

const MessageSkeleton: React.FC<MessageSkeletonProps> = ({ 
  type = 'assistant', 
  showAvatar = true,
  showCodeBlock = false,
  responseType = 'medium',
  estimatedLines
}) => {
  const isUser = type === 'user';
  
  // Dynamic content based on response type or estimated lines
  const getSkeletonContent = () => {
    // If estimatedLines is provided, use that for precise control
    if (estimatedLines) {
      return (
        <>
          {[...Array(Math.min(estimatedLines, 10))].map((_, index) => {
            const isLastLine = index === estimatedLines - 1;
            const width = isLastLine 
              ? `${Math.floor(Math.random() * 40) + 40}%` 
              : `${Math.floor(Math.random() * 20) + 80}%`;
            
            return (
              <Skeleton 
                key={index}
                variant="text" 
                height={index < 3 ? "1rem" : "0.875rem"} 
                width={width}
              />
            );
          })}
        </>
      );
    }
    
    switch (responseType) {
      case 'short':
        return (
          <>
            <Skeleton variant="text" height="1rem" width="85%" />
            <Skeleton variant="text" height="1rem" width="60%" />
          </>
        );
      
      case 'medium':
        return (
          <>
            <Skeleton variant="text" height="1rem" width="95%" />
            <Skeleton variant="text" height="1rem" width="88%" />
            <Skeleton variant="text" height="1rem" width="92%" />
            <Skeleton variant="text" height="0.875rem" width="75%" />
          </>
        );
      
      case 'long':
        return (
          <>
            <Skeleton variant="text" height="1rem" width="98%" />
            <Skeleton variant="text" height="1rem" width="94%" />
            <Skeleton variant="text" height="1rem" width="90%" />
            <Skeleton variant="text" height="1rem" width="96%" />
            <Skeleton variant="text" height="0.875rem" width="88%" />
            <Skeleton variant="text" height="0.875rem" width="78%" />
            <Skeleton variant="text" height="0.875rem" width="85%" />
          </>
        );
      
      case 'code':
        return (
          <>
            <Skeleton variant="text" height="1rem" width="90%" />
            <Skeleton variant="text" height="1rem" width="70%" />
            <div className="my-4">
              <div className="bg-gradient-to-r from-[#1a0f1f]/90 to-[#2d1b4b]/80 backdrop-blur-xl px-4 py-3 rounded-t-xl border border-[#a970ff]/40">
                <Skeleton variant="text" height="0.875rem" width="80px" />
              </div>
              <div className="bg-gradient-to-br from-[#0a0a0a]/95 to-[#1a0f1f]/90 backdrop-blur-xl p-5 rounded-b-xl border-l border-r border-b border-[#a970ff]/40">
                <Skeleton variant="text" height="0.875rem" width="100%" />
                <Skeleton variant="text" height="0.875rem" width="85%" />
                <Skeleton variant="text" height="0.875rem" width="90%" />
                <Skeleton variant="text" height="0.875rem" width="70%" />
                <Skeleton variant="text" height="0.875rem" width="95%" />
                <Skeleton variant="text" height="0.875rem" width="60%" />
              </div>
            </div>
            <Skeleton variant="text" height="0.875rem" width="80%" />
          </>
        );
      
      case 'list':
        return (
          <>
            <Skeleton variant="text" height="1rem" width="85%" />
            <div className="space-y-2 mt-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-[#a970ff]/60 rounded-full mt-2 flex-shrink-0"></div>
                  <Skeleton variant="text" height="0.875rem" width={`${Math.floor(Math.random() * 30) + 60}%`} />
                </div>
              ))}
            </div>
            <Skeleton variant="text" height="0.875rem" width="70%" />
          </>
        );
      
      default:
        return (
          <>
            <Skeleton variant="text" height="1rem" width="95%" />
            <Skeleton variant="text" height="1rem" width="88%" />
            <Skeleton variant="text" height="1rem" width="92%" />
            <Skeleton variant="text" height="0.875rem" width="75%" />
          </>
        );
    }
  };
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-8 animate-fade-in`}>
      {!isUser && showAvatar && (
        <div className="mr-4 flex-shrink-0">
          <Skeleton 
            variant="circular" 
            width={48} 
            height={48} 
            className="shadow-lg shadow-[#a970ff]/30"
          />
        </div>
      )}
      
      <div className={`max-w-3xl ${isUser ? 'ml-auto' : ''}`}>
        <div className={`p-5 rounded-3xl shadow-xl backdrop-blur-xl border-2 relative overflow-hidden ${
          isUser
            ? "bg-gradient-to-br from-[#a970ff]/20 to-[#8a4fff]/15 border-[#a970ff]/30 rounded-br-lg"
            : "bg-gradient-to-br from-[#1a0f1f]/40 to-[#2d1b4b]/30 border-[#a970ff]/20 rounded-bl-lg"
        }`}>
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
          
          <div className="space-y-3 relative z-10">
            {getSkeletonContent()}
            
            {/* Legacy code block support */}
            {!isUser && showCodeBlock && responseType !== 'code' && (
              <div className="my-4">
                <div className="bg-gradient-to-r from-[#1a0f1f]/90 to-[#2d1b4b]/80 backdrop-blur-xl px-4 py-3 rounded-t-xl border border-[#a970ff]/40">
                  <Skeleton variant="text" height="0.875rem" width="80px" />
                </div>
                <div className="bg-gradient-to-br from-[#0a0a0a]/95 to-[#1a0f1f]/90 backdrop-blur-xl p-5 rounded-b-xl border-l border-r border-b border-[#a970ff]/40">
                  <Skeleton variant="text" height="0.875rem" width="100%" />
                  <Skeleton variant="text" height="0.875rem" width="85%" />
                  <Skeleton variant="text" height="0.875rem" width="90%" />
                  <Skeleton variant="text" height="0.875rem" width="70%" />
                </div>
              </div>
            )}
            
            {/* Final content line for longer responses */}
            {responseType === 'long' && (
              <Skeleton variant="text" height="0.875rem" width="82%" />
            )}
          </div>
          
          {/* Timestamp skeleton */}
          <div className="mt-4 flex justify-end relative z-10">
            <Skeleton variant="text" width="80px" height="0.75rem" className="opacity-70" />
          </div>
        </div>
      </div>
      
      {isUser && showAvatar && (
        <div className="ml-4 flex-shrink-0">
          <Skeleton 
            variant="circular" 
            width={48} 
            height={48} 
            className="shadow-lg shadow-[#a970ff]/30 border-2 border-[#a970ff]/60"
          />
        </div>
      )}
    </div>
  );
};

export default MessageSkeleton;
