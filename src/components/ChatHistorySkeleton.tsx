'use client';
import React from 'react';
import Skeleton from './Skeleton';

interface ChatHistorySkeletonProps {
  count?: number;
}

const ChatHistorySkeleton: React.FC<ChatHistorySkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="space-y-2 p-3">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="p-3 rounded-lg bg-[#0a0a0a]/20 border border-[#a970ff]/5 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="space-y-2">
            {/* Chat title skeleton */}
            <Skeleton 
              variant="text" 
              height="1rem" 
              width={`${60 + Math.random() * 30}%`}
            />
            
            {/* Last message preview skeleton */}
            <Skeleton 
              variant="text" 
              height="0.875rem" 
              width={`${40 + Math.random() * 40}%`}
              className="opacity-70"
            />
            
            {/* Bottom row with timestamp and message count */}
            <div className="flex justify-between items-center mt-3">
              <Skeleton variant="text" height="0.75rem" width="60px" />
              <Skeleton variant="text" height="0.75rem" width="35px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistorySkeleton;
