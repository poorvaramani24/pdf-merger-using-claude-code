import { Upload, MousePointerClick, FileCheck, Download, AlertCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your PDFs',
    desc: 'Click the upload area or drag-and-drop a PDF file into each of the two slots — "First PDF" and "Second PDF". Only valid PDF files are accepted.',
  },
  {
    icon: MousePointerClick,
    title: 'Select Pages',
    desc: 'Once a file is loaded, you\'ll see page checkboxes. Select or deselect individual pages to control exactly which pages go into the final document. Use "Select All" or "Deselect All" for quick toggling.',
  },
  {
    icon: FileCheck,
    title: 'Merge',
    desc: 'Click the "Merge Selected Pages" button. The selected pages from the first PDF will appear first, followed by the selected pages from the second PDF.',
  },
  {
    icon: Download,
    title: 'Download',
    desc: 'A modal will appear with a download button. Click "Download Merged PDF" to save the result. Click "Merge More Files" to start over with new documents.',
  },
];

const tips = [
  'You can remove an uploaded file by clicking the X on its card, then upload a different one.',
  'At least one page must be selected from either PDF to enable merging.',
  'The merge happens entirely in your browser — no files are sent to a server.',
  'The downloaded file will be named "merged.pdf" by default.',
];

export default function Instructions() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          How to Use
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Follow these simple steps to merge your PDF files.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4"
          >
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-indigo-600" />
                <h3 className="font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-900">Tips</h2>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1 shrink-0">&bull;</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
