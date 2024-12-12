import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      {/* ... existing hero and features sections ... */}
      <div className="max-w-4xl w-full px-4 py-16 text-center space-y-8">
        {/* Hero Section */}
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Uploadlink
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Upload and Share your files instantly with Security.
        </p>
        
        {/* CTA Button */}
        <div className="mt-8">
          <Link href="/login">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium 
              hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 
              shadow-lg hover:shadow-indigo-500/25">
              Start Uploading Now
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
            <h3 className="text-xl font-semibold mb-2">Fast Sharing</h3>
            <p className="text-gray-400">Share your files directly by simply uploading</p>
          </div>
          
          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
            <div className="text-indigo-400 mb-3">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-400">Your files and documents are always private and protected</p>
          </div>
          
          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
            <div className="text-indigo-400 mb-3">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Database</h3>
            <p className="text-gray-400">100% secure database with end-to-end encryption.</p>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="max-w-6xl w-full px-4 py-16 space-y-12">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Trusted by Professionals Worldwide
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Review Card 1 */}
          <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                JD
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-gray-400">Research Analyst</p>
              </div>
            </div>
            <p className="text-gray-300">"This tool has revolutionized how I upload my research papers and save me hours of work."</p>
            <div className="flex text-yellow-400 mt-4">
              ★★★★★
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                SK
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Sarah Kim</h4>
                <p className="text-sm text-gray-400">Legal Consultant</p>
              </div>
            </div>
            <p className="text-gray-300">"The accuracy and speed of the uploads are impressive. It's become an essential tool in my workflow."</p>
            <div className="flex text-yellow-400 mt-4">
              ★★★★★
            </div>
          </div>

          {/* Review Card 3 */}
          <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                MR
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Mike Ross</h4>
                <p className="text-sm text-gray-400">Business Analyst</p>
              </div>
            </div>
            <p className="text-gray-300">"Game-changer for document uploading. I can directly share my files with others. Simple and easy to use tool"</p>
            <div className="flex text-yellow-400 mt-4">
              ★★★★★
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
  {/* FAQ Item */}
  <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
    <h3 className="text-xl font-semibold mb-3">What types of files can I upload?</h3>
    <p className="text-gray-300">
      Uploadlink supports a wide variety of file types, including PDFs, images, and text documents. We are continuously expanding supported formats to meet user needs.
    </p>
  </div>

  <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
    <h3 className="text-xl font-semibold mb-3">How many files can I upload?</h3>
    <p className="text-gray-300">
      With Uploadlink, you can upload up to 7 files for free. For additional capacity, explore our affordable premium plans tailored for individuals and teams.
    </p>
  </div>

  <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
    <h3 className="text-xl font-semibold mb-3">Is my data secure?</h3>
    <p className="text-gray-300">
      Absolutely. Uploadlink uses state-of-the-art encryption and secure cloud storage to protect your files. Your data is processed privately, and only accessible by you.
    </p>
  </div>
</div>

        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Document Workflow?</h2>
          <Link href="/login">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium 
              hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 
              shadow-lg hover:shadow-indigo-500/25">
              Try It Free
            </button>
          </Link>
          <p className="mt-4 text-gray-400">No credit card required • 14-day free trial</p>
        </div>
      </div>
    </div>
  );
} 
