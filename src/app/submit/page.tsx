"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function SubmitComplaint() {
  const [form, setForm] = useState<{ category: string; location: string; description: string; evidence: File | null; pin: string }>({ 
    category: '', location: '', description: '', evidence: null, pin: '' 
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ case_id: string; pin: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: handle file upload and evidence_url
    const res = await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: form.category,
        location: form.location,
        description: form.description,
        evidence_url: '', // Placeholder for now
        pin: form.pin,
      }),
    });
    const data = await res.json();
    setResult(data as { case_id: string; pin: string });
    setLoading(false);
  };

  const categories = [
    'Corruption',
    'Bribery', 
    'Fraud',
    'Abuse of Power',
    'Misconduct',
    'Financial Irregularities',
    'Other'
  ];

  if (result) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Complaint Submitted Successfully</h1>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Case Details</h2>
              <p className="text-gray-600">Please save these details to track your complaint</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">Case ID</label>
                <div className="font-mono text-lg font-bold text-blue-600">{result.case_id}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
                <div className="font-mono text-lg font-bold text-blue-600">{result.pin}</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-yellow-800">Important</h3>
                  <p className="text-yellow-700 text-sm">Keep these details safe and confidential. You&apos;ll need them to track your case progress.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link href="/track" className="flex-1 cursor-pointer">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                  Track This Case
                </button>
              </Link>
              <Link href="/submit" className="flex-1 cursor-pointer">
                <button className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors cursor-pointer">
                  Submit Another
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Anonymous Complaint</h1>
          <p className="text-gray-600">Your identity will remain completely protected</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Complaint Category <span className="text-red-500">*</span>
                </span>
              </label>
              <select 
                name="category" 
                required 
                value={form.category} 
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
              >
                <option value="">📋 Choose the type of complaint you want to submit</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'Corruption' && '💰 '}
                    {cat === 'Public Service' && '🏛️ '}
                    {cat === 'Infrastructure' && '🚧 '}
                    {cat === 'Healthcare' && '🏥 '}
                    {cat === 'Education' && '📚 '}
                    {cat === 'Law Enforcement' && '👮 '}
                    {cat === 'Environmental' && '🌱 '}
                    {cat === 'Other' && '❓ '}
                    {cat}
                    {cat === 'Corruption' && ' (Bribery, Misuse of Public Funds)'}
                    {cat === 'Public Service' && ' (Poor Service, Delays, Negligence)'}
                    {cat === 'Infrastructure' && ' (Roads, Water, Electricity, Internet)'}
                    {cat === 'Healthcare' && ' (Hospital Services, Medicine Shortage)'}
                    {cat === 'Education' && ' (School/University Issues, Teacher Problems)'}
                    {cat === 'Law Enforcement' && ' (Police Misconduct, Security Issues)'}
                    {cat === 'Environmental' && ' (Pollution, Waste Management)'}
                    {cat === 'Other' && ' (Any other government-related issue)'}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Select the category that best matches your complaint</p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location <span className="text-red-500">*</span>
                </span>
              </label>
              <input 
                name="location" 
                type="text"
                placeholder="🏢 Enter specific location (e.g., Motijheel, Dhaka | Agrabad, Chittagong | Sylhet Sadar | Specific Office Name)"
                required 
                value={form.location} 
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-500 mt-1">Be as specific as possible: area, district, or specific office/location</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Description <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea 
                name="description" 
                rows={8}
                placeholder="📝 Describe your complaint in detail...

Examples to include:
• What happened? (The specific issue you faced)
• When did it happen? (Date and time if relevant)
• Who was involved? (Department, officer name if known)
• What impact did it have? (How it affected you or others)
• What resolution do you expect?

Be clear and specific to help us understand and resolve your complaint faster."
                required 
                value={form.description} 
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900 placeholder:text-gray-400"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Provide as much detail as possible for faster resolution</p>
                <span className="text-xs text-gray-400">{form.description.length}/1000</span>
              </div>
            </div>

            {/* Evidence */}
            {/* Evidence */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Evidence (Optional)
                </span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input 
                  name="evidence" 
                  type="file" 
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleChange}
                  className="hidden"
                  id="evidence-upload"
                />
                <label htmlFor="evidence-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 mb-1">📎 Upload Supporting Evidence</span>
                    <span className="text-xs text-gray-500 mb-2">Click to browse or drag and drop files here</span>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>✅ Photos, Videos, Documents</div>
                      <div>✅ Supported: JPG, PNG, MP4, PDF, DOC, DOCX</div>
                      <div>✅ Maximum file size: 10MB</div>
                    </div>
                  </div>
                </label>
                {form.evidence && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm text-green-700">📁 File selected: {form.evidence.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Evidence helps resolve complaints faster. Include photos, documents, or videos related to your complaint.
              </p>
            </div>

            {/* PIN */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Create a PIN <span className="text-red-500">*</span>
              </label>
              <input 
                name="pin" 
                type="password" 
                placeholder="4-6 digit PIN for tracking"
                required 
                value={form.pin} 
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
              />
              <p className="text-sm text-gray-500 mt-1">You&apos;ll need this PIN to track your complaint</p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Complaint'
              )}
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-800">Your Privacy is Protected</h3>
              <p className="text-blue-700 text-sm">All submissions are encrypted and anonymous. No personal information is collected or stored.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
