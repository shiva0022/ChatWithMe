export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1f] to-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        {/* Beautiful animated loading component */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#a970ff] border-r-[#8a4fff] rounded-full animate-spin"></div>
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 border-4 border-transparent border-b-[#6a3fff] border-l-[#a970ff] rounded-full animate-spin animation-delay-150"></div>
          
          {/* Inner glowing dot */}
          <div className="absolute inset-6 bg-gradient-to-br from-[#a970ff] to-[#8a4fff] rounded-full animate-pulse shadow-lg shadow-[#a970ff]/50">
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
          </div>
          
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-[#a970ff]/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        
        {/* Loading text with animated dots */}
        <div className="flex items-center justify-center space-x-1">
          <p className="text-[#a970ff] text-lg font-medium">Loading ChatWithMe</p>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-[#a970ff] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-1.5 h-1.5 bg-[#8a4fff] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-1.5 h-1.5 bg-[#6a3fff] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
        
        {/* Subtitle */}
        <p className="text-gray-400 text-sm mt-2 opacity-70">Preparing your AI assistant...</p>
      </div>
    </div>
  );
}
