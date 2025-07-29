'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1f] to-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gradient-to-r from-[#ff4444] to-[#ff6666] text-transparent bg-clip-text">
          <h1 className="text-6xl font-bold">Error</h1>
        </div>
        <h2 className="text-xl text-white mt-4 mb-8">Something went wrong!</h2>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-white rounded-lg hover:from-[#8a4fff] hover:to-[#a970ff] transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 border border-[#a970ff] text-[#a970ff] rounded-lg hover:bg-[#a970ff] hover:text-white transition-all duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
