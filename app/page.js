import Link from 'next/link';

export default function Uploadlink() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="max-w-4xl w-full px-4 py-16 text-center space-y-8">
        {/* Hero Section */}
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Uploadlink
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Effortlessly upload your documents and unlock concise, and share instantly.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link href="/login">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium 
              hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 
              shadow-lg hover:shadow-indigo-500/25">
              Get Started
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
            <div className="text-indigo-400 mb-3">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Upload and process your documents in seconds.</p>
          </div>

          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
            <div className="text-indigo-400 mb-3">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-400">Your documents are securely encrypted and never shared.</p>
          </div>

          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
            <div className="text-indigo-400 mb-3">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Seamlessly</h3>
            <p className="text-gray-400">Simple straightforward app, Upload and Share.</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-6xl w-full px-4 py-16 space-y-12">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            What Our Users Are Saying
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
              <p className="text-gray-300">"Uploadlink has drastically improved my workflow. I can upload and share directly."</p>
              <div className="mt-4 text-yellow-400">★★★★★</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
              <p className="text-gray-300">"The processing speed is unmatched, and the security features make me feel confident in using it for sensitive documents."</p>
              <div className="mt-4 text-yellow-400">★★★★★</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
              <p className="text-gray-300">"A must-have tool for anyone working with large volumes of documents. Uploadlink is a game-changer!"</p>
              <div className="mt-4 text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold mb-6">Start Your Journey with Uploadlink</h2>
          <Link href="/login">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium 
              hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 
              shadow-lg hover:shadow-indigo-500/25">
              Get Started Now
            </button>
          </Link>
          <p className="mt-4 text-gray-400">No commitment • Instant results • 100% secure</p>
        </div>
      </div>
    </div>
  );
}
