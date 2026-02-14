import { Check } from 'lucide-react';

export default function PageSelector({ totalPages, selectedPages, onChange }) {
  const allSelected = selectedPages.length === totalPages;

  const togglePage = (page) => {
    if (selectedPages.includes(page)) {
      onChange(selectedPages.filter((p) => p !== page));
    } else {
      onChange([...selectedPages, page].sort((a, b) => a - b));
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(Array.from({ length: totalPages }, (_, i) => i));
    }
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">
          {selectedPages.length} of {totalPages} page{totalPages !== 1 ? 's' : ''} selected
        </p>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => {
          const isSelected = selectedPages.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => togglePage(i)}
              className={`relative w-9 h-9 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-center ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {i + 1}
              {isSelected && (
                <Check className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 text-white rounded-full p-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
