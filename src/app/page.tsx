import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AC</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Anonymous Complaint Box
              </h1>
            </div>
            <Link href="/admin" className="cursor-pointer">
              <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                Admin Portal
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Report Safely,<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create Change
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            A secure platform for reporting corruption, injustice, or wrongdoing in Bangladesh. 
            Your identity remains completely protected while ensuring your voice is heard by the right authorities.
          </p>
          
          {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/submit" className="cursor-pointer">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg font-semibold w-full sm:w-auto cursor-pointer">
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>📝 Submit New Complaint</span>
                </span>
                <p className="text-xs text-blue-100 mt-1">Report corruption, poor service, or any government issue</p>
              </button>
            </Link>
            <Link href="/track" className="cursor-pointer">
              <button className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg font-semibold w-full sm:w-auto cursor-pointer">
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>🔍 Track Existing Case</span>
                </span>
                <p className="text-xs text-emerald-100 mt-1">Check status using your Case ID and PIN</p>
              </button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 inline-block shadow-lg border border-gray-200/50">
              <p className="text-sm text-gray-700 font-medium mb-2">💡 How it works:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-600">
                <span className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-2">1</span>
                  Submit complaint anonymously
                </span>
                <span className="flex items-center">
                  <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold mr-2">2</span>
                  Get Case ID & PIN
                </span>
                <span className="flex items-center">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mr-2">3</span>
                  Track progress anytime
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Anonymity</h3>
            <p className="text-gray-600 leading-relaxed">No personal information required. Your identity is fully protected with advanced encryption and secure data handling.</p>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
            <p className="text-gray-600 leading-relaxed">Monitor your complaint&apos;s progress with a unique Case ID and PIN. Get updates as authorities review and act on your report.</p>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Swift Action</h3>
            <p className="text-gray-600 leading-relaxed">Direct connection to judges, NGOs, and anti-corruption teams. Your reports reach the right people quickly for effective action.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">Making Bangladesh Corruption-Free</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-blue-100">Anonymous</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-100">Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">Secure</div>
              <div className="text-blue-100">Platform</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">Fast</div>
              <div className="text-blue-100">Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Anonymous Complaint Box. Building a transparent Bangladesh.</p>
        </div>
      </footer>
    </main>
  );
}
