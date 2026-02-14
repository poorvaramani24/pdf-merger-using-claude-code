import { useCallback } from 'react';
import { Upload } from 'lucide-react';

export default function DropZone({ onFilesSelected, label }) {
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === 'application/pdf'
      );
      if (files.length > 0) onFilesSelected(files[0]);
    },
    [onFilesSelected]
  );

  const handleDragOver = (e) => e.preventDefault();

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      if (e.target.files[0]) onFilesSelected(e.target.files[0]);
    };
    input.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className="group relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50/50"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gray-100 group-hover:bg-indigo-100 p-3 rounded-full transition-colors">
          <Upload className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400 mt-1">
            Drop a PDF here or click to browse
          </p>
        </div>
      </div>
    </div>
  );
}
