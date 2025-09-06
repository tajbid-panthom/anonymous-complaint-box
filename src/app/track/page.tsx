"use client";
import { useState } from 'react';
import Link from 'next/link';
import EvidenceViewer from '@/components/EvidenceViewer';

export default function TrackCase() {
  const [form, setForm] = useState<{ case_id: string; pin: string }>({ case_id: '', pin: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    category: string;
    location: string;
    description: string;
    status: string;
    evidence_url?: string;
    created_at?: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Error tracking case');
      setResult(null);
    } else {
      setResult(data.complaint as {
        category: string;
        location: string;
        description: string;
        status: string;
        evidence_url?: string;
        created_at?: string;
      });
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status.toLowerCase()) {
      case 'received': return 25;
      case 'in review': return 50;
      case 'resolved': return 75;
      case 'closed': return 100;
      default: return 0;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-4 cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Case</h1>
          <p className="text-gray-600">Enter your Case ID and PIN to check status</p>
        </div>

        {/* Search Form */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Instructions Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">How to Track Your Complaint</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use the <strong>Case ID</strong> you received after submitting your complaint</li>
                    <li>• Enter the <strong>4-digit PIN</strong> you created during submission</li>
                    <li>• Both are required to protect your privacy and security</li>
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Case ID <span className="text-red-500">*</span>
                  </span>
                </label>
                <input 
                  name="case_id" 
                  type="text"
                  placeholder="🆔 Enter your case ID (e.g., AC2024001234, COMP-ABC123)"
                  required 
                  value={form.case_id} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-lg text-gray-900 placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1">This was provided when you submitted your complaint</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Security PIN <span className="text-red-500">*</span>
                  </span>
                </label>
                <input 
                  name="pin" 
                  type="password" 
                  placeholder="🔒 Enter your 4-digit PIN (the one you created during submission)"
                  required 
                  value={form.pin} 
                  onChange={handleChange}
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-lg text-gray-900 placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1">4-digit PIN you set when submitting the complaint</p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching for your case...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    🔍 Track My Complaint
                  </span>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-red-700 font-medium">{error}</p>
                    <p className="text-red-600 text-sm mt-1">
                      💡 Make sure you&apos;re using the correct Case ID and PIN from your complaint submission.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Case Status</h2>
                <div className={`inline-flex items-center px-4 py-2 rounded-full border font-semibold ${getStatusColor(result.status)}`}>
                  <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
                  {result.status}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{getStatusProgress(result.status)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getStatusProgress(result.status)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Received</span>
                  <span>In Review</span>
                  <span>Resolved</span>
                  <span>Closed</span>
                </div>
              </div>

              {/* Case Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <p className="text-gray-900 font-semibold">{result.category}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-gray-900 font-semibold">{result.location}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900 leading-relaxed">{result.description}</p>
                </div>

                {result.evidence_url && (
                  <EvidenceViewer evidenceUrl={result.evidence_url} />
                )}

                {result.created_at && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                    <p className="text-gray-900">{new Date(result.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mt-8">
                <button 
                  onClick={() => {
                    setResult(null);
                    setForm({ case_id: '', pin: '' });
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Track Another Case
                </button>
                <Link href="/submit" className="flex-1 cursor-pointer">
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                    Submit New Complaint
                  </button>
                </Link>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Status Timeline</h3>
              <div className="space-y-4">
                <div className={`flex items-center space-x-4 ${getStatusProgress(result.status) >= 25 ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full ${getStatusProgress(result.status) >= 25 ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className="font-semibold">Complaint Received</p>
                    <p className="text-sm text-gray-600">Your complaint has been submitted successfully</p>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-4 ${getStatusProgress(result.status) >= 50 ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full ${getStatusProgress(result.status) >= 50 ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className="font-semibold">Under Review</p>
                    <p className="text-sm text-gray-600">Authorized personnel are reviewing your case</p>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-4 ${getStatusProgress(result.status) >= 75 ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full ${getStatusProgress(result.status) >= 75 ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className="font-semibold">Action Taken</p>
                    <p className="text-sm text-gray-600">Appropriate measures are being implemented</p>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-4 ${getStatusProgress(result.status) >= 100 ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <div className={`w-4 h-4 rounded-full ${getStatusProgress(result.status) >= 100 ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className="font-semibold">Case Closed</p>
                    <p className="text-sm text-gray-600">Your complaint has been resolved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
