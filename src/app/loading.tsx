export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1f] to-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#a970ff]/20 border-t-[#a970ff] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#a970ff] text-lg font-medium">Loading ChatWithMe...</p>
      </div>
    </div>
  );
}
