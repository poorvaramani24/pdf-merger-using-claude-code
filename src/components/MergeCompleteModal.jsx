import { useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function MergeCompleteModal({ mergedUrl, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-full mb-4">
            <Download className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Merge Complete
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Your merged PDF is ready to download.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={mergedUrl}
              download="merged.pdf"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Merged PDF
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Merge More Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
