"use client";
import { useState } from 'react';

interface EvidenceViewerProps {
  evidenceUrl: string;
  filename?: string;
}

export default function EvidenceViewer({ evidenceUrl, filename }: EvidenceViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return 'image';
    if (['mp4', 'avi', 'mov'].includes(extension || '')) return 'video';
    if (extension === 'pdf') return 'pdf';
    return 'document';
  };

  const fileType = getFileType(evidenceUrl);

  const renderPreview = () => {
    switch (fileType) {
      case 'image':
        return (
          <div className="space-y-3">
            <img 
              src={evidenceUrl} 
              alt="Evidence preview" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsModalOpen(true)}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              🔍 View Full Size
            </button>
          </div>
        );
      
      case 'video':
        return (
          <div className="space-y-3">
            <video 
              src={evidenceUrl}
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              controls
              preload="metadata"
            />
            <a
              href={evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              🎥 Open Video
            </a>
          </div>
        );
      
      case 'pdf':
        return (
          <div className="space-y-3">
            <div className="w-32 h-32 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <a
              href={evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              📄 View PDF
            </a>
          </div>
        );
      
      default:
        return (
          <div className="space-y-3">
            <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <a
              href={evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              📎 Download File
            </a>
          </div>
        );
    }
  };

  return (
    <>
      <div className="bg-gray-50 p-4 rounded-xl">
        <label className="block text-sm font-medium text-gray-700 mb-3">Evidence</label>
        {renderPreview()}
        {filename && (
          <p className="text-xs text-gray-500 mt-2">📁 {filename}</p>
        )}
      </div>

      {/* Full-size image modal */}
      {isModalOpen && fileType === 'image' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={evidenceUrl}
              alt="Evidence full size"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
