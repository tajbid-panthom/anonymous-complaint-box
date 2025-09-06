"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Complaint {
  id: number;
  case_id: string;
  category: string;
  location: string;
  description: string;
  status: string;
  created_at: string;
  evidence_url?: string;
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [analytics, setAnalytics] = useState<{ byCategory: Record<string, number>; byStatus: Record<string, number> } | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchComplaints(), fetchAnalytics()]);
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch('/api/admin/complaints');
      const data = await res.json();
      setComplaints(data.complaints || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const res = await fetch('/api/admin/analytics');
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleStatusUpdate = async (case_id: string, status: string) => {
    try {
      // For demo, admin_id is 1
      await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id, status, admin_id: 1 }),
      });
      
      // Update the complaints list
      setComplaints((prev) => prev.map(c => c.case_id === case_id ? { ...c, status } : c));
      
      // Refresh analytics to update the status cards
      await fetchAnalytics();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleExport = () => {
    window.open('/api/admin/export', '_blank');
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Complaint Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium cursor-pointer"
              >
                Export CSV
              </button>
              <Link href="/" className="cursor-pointer">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                  Exit Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Cards */}
        {analytics && (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-opacity duration-300 ${analyticsLoading ? 'opacity-70' : 'opacity-100'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative">
              {analyticsLoading && (
                <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                  <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative">
              {analyticsLoading && (
                <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold text-yellow-600">{analytics?.byStatus['In Review'] || 0}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative">
              {analyticsLoading && (
                <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{analytics?.byStatus['Resolved'] || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative">
              {analyticsLoading && (
                <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-gray-600">{analytics?.byStatus['Closed'] || 0}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Charts */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Complaints by Category</h3>
              <div className="space-y-3">
                {Object.entries(analytics.byCategory).map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-gray-700">{cat}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(count / Math.max(...Object.values(analytics.byCategory))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status Distribution</h3>
              <div className="space-y-3">
                {Object.entries(analytics.byStatus).map(([stat, count]) => (
                  <div key={stat} className="flex items-center justify-between">
                    <span className="text-gray-700">{stat}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${(count / Math.max(...Object.values(analytics.byStatus))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">All Complaints</h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading complaints...</span>
              </div>
            </div>
          ) : complaints.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No complaints submitted yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complaints.map((c) => (
                    <tr key={c.case_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm font-medium text-gray-900">{c.case_id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{c.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{c.location}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={c.status}
                          onChange={e => handleStatusUpdate(c.case_id, e.target.value)}
                          className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(c.status)} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
                        >
                          <option value="Received">Received</option>
                          <option value="In Review">In Review</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setSelected(c)}
                          className="text-indigo-600 hover:text-indigo-900 font-medium cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Complaint Details</h3>
                <button 
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case ID</label>
                  <p className="font-mono text-lg font-bold text-blue-600">{selected.case_id}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selected.status)}`}>
                    {selected.status}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <p className="text-gray-900 font-semibold">{selected.category}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900 font-semibold">{selected.location}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900 leading-relaxed">{selected.description}</p>
              </div>

              {selected.evidence_url && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Evidence</label>
                  <a 
                    href={selected.evidence_url} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Evidence File
                  </a>
                </div>
              )}

              {selected.created_at && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submitted On</label>
                  <p className="text-gray-900">{new Date(selected.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
