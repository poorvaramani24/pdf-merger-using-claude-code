import { FileText, X } from 'lucide-react';

export default function FileCard({ file, pageCount, onRemove }) {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
      <div className="bg-indigo-100 p-2 rounded-lg shrink-0">
        <FileText className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-800 truncate">
          {file.name}
        </p>
        <p className="text-xs text-gray-400">
          {sizeMB} MB{pageCount != null && ` · ${pageCount} page${pageCount !== 1 ? 's' : ''}`}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
