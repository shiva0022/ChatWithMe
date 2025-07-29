import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1f] to-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="bg-gradient-to-r from-[#a970ff] via-[#8a4fff] to-[#6a3fff] text-transparent bg-clip-text">
          <h1 className="text-9xl font-bold">404</h1>
        </div>
        <h2 className="text-2xl text-white mt-4 mb-8">Page Not Found</h2>
        <Link 
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-[#a970ff] to-[#8a4fff] text-white rounded-lg hover:from-[#8a4fff] hover:to-[#a970ff] transition-all duration-300 transform hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
