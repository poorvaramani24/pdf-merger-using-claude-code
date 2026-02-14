import { Shield, Zap, Lock, Github } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'Your PDFs are processed entirely in the browser. No files are uploaded to any server — ever.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Merging happens instantly using WebAssembly-optimized PDF processing with pdf-lib.',
  },
  {
    icon: Lock,
    title: 'No Sign-Up Required',
    desc: 'Just open the app and start merging. No accounts, no tracking, no ads.',
  },
  {
    icon: Github,
    title: 'Open Technology',
    desc: 'Built with React, Tailwind CSS, and the open-source pdf-lib library.',
  },
];

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          About PDF Merger
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          A simple, privacy-focused tool to combine two PDF documents into one
          — right in your browser.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-indigo-100 p-2.5 rounded-xl w-fit mb-4">
              <Icon className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          How It Works
        </h2>
        <ol className="space-y-3 text-sm text-gray-600">
          {[
            'Select or drag-and-drop your first PDF file.',
            'Select or drag-and-drop your second PDF file.',
            'Click "Merge PDFs" to combine them.',
            'Download your merged document instantly.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="text-center text-xs text-gray-400 mt-10">
        Built with React, Tailwind CSS &amp; pdf-lib
      </p>
    </main>
  );
}
