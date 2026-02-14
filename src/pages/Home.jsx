import { useState, useCallback, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Merge, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import DropZone from '../components/DropZone';
import FileCard from '../components/FileCard';
import PageSelector from '../components/PageSelector';
import MergeCompleteModal from '../components/MergeCompleteModal';

async function getPageCount(file) {
  const buf = await file.arrayBuffer();
  const pdf = await PDFDocument.load(buf);
  return pdf.getPageCount();
}

export default function Home() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [pageCount1, setPageCount1] = useState(null);
  const [pageCount2, setPageCount2] = useState(null);
  const [selectedPages1, setSelectedPages1] = useState([]);
  const [selectedPages2, setSelectedPages2] = useState([]);
  const [merging, setMerging] = useState(false);
  const [mergedUrl, setMergedUrl] = useState(null);
  const [error, setError] = useState(null);

  // Load page counts when files change
  useEffect(() => {
    if (!file1) { setPageCount1(null); setSelectedPages1([]); return; }
    getPageCount(file1).then((count) => {
      setPageCount1(count);
      setSelectedPages1(Array.from({ length: count }, (_, i) => i));
    }).catch(() => setError('Could not read first PDF.'));
  }, [file1]);

  useEffect(() => {
    if (!file2) { setPageCount2(null); setSelectedPages2([]); return; }
    getPageCount(file2).then((count) => {
      setPageCount2(count);
      setSelectedPages2(Array.from({ length: count }, (_, i) => i));
    }).catch(() => setError('Could not read second PDF.'));
  }, [file2]);

  const reset = () => {
    setFile1(null);
    setFile2(null);
    setMergedUrl(null);
    setError(null);
  };

  const removeFile1 = () => { setFile1(null); setError(null); };
  const removeFile2 = () => { setFile2(null); setError(null); };

  const mergePDFs = useCallback(async () => {
    if (!file1 || !file2) return;
    if (selectedPages1.length === 0 && selectedPages2.length === 0) {
      setError('Select at least one page from either PDF.');
      return;
    }

    setMerging(true);
    setError(null);
    setMergedUrl(null);

    try {
      const [buf1, buf2] = await Promise.all([
        file1.arrayBuffer(),
        file2.arrayBuffer(),
      ]);

      const merged = await PDFDocument.create();
      const [pdf1, pdf2] = await Promise.all([
        PDFDocument.load(buf1),
        PDFDocument.load(buf2),
      ]);

      if (selectedPages1.length > 0) {
        const pages1 = await merged.copyPages(pdf1, selectedPages1);
        pages1.forEach((p) => merged.addPage(p));
      }

      if (selectedPages2.length > 0) {
        const pages2 = await merged.copyPages(pdf2, selectedPages2);
        pages2.forEach((p) => merged.addPage(p));
      }

      const bytes = await merged.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setMergedUrl(URL.createObjectURL(blob));
    } catch {
      setError('Failed to merge PDFs. Make sure both files are valid PDFs.');
    } finally {
      setMerging(false);
    }
  }, [file1, file2, selectedPages1, selectedPages2]);

  const canMerge = file1 && file2 && !merging && (selectedPages1.length > 0 || selectedPages2.length > 0);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
          <Sparkles className="w-3 h-3" />
          100% client-side &mdash; your files never leave your browser
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Merge Two PDFs
        </h1>
        <p className="text-gray-500">
          Select two PDF files, pick specific pages, and combine them into one document.
        </p>
      </div>

      {/* Upload area */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
        <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              First PDF
            </p>
            {file1 ? (
              <>
                <FileCard file={file1} pageCount={pageCount1} onRemove={removeFile1} />
                {pageCount1 && (
                  <PageSelector
                    totalPages={pageCount1}
                    selectedPages={selectedPages1}
                    onChange={setSelectedPages1}
                  />
                )}
              </>
            ) : (
              <DropZone
                label="Select first PDF"
                onFilesSelected={setFile1}
              />
            )}
          </div>

          <div className="hidden sm:flex items-center justify-center pt-10">
            <div className="bg-gray-100 p-2 rounded-full">
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Second PDF
            </p>
            {file2 ? (
              <>
                <FileCard file={file2} pageCount={pageCount2} onRemove={removeFile2} />
                {pageCount2 && (
                  <PageSelector
                    totalPages={pageCount2}
                    selectedPages={selectedPages2}
                    onChange={setSelectedPages2}
                  />
                )}
              </>
            ) : (
              <DropZone
                label="Select second PDF"
                onFilesSelected={setFile2}
              />
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          onClick={mergePDFs}
          disabled={!canMerge}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 cursor-pointer"
        >
          {merging ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Merging...
            </>
          ) : (
            <>
              <Merge className="w-4 h-4" />
              Merge Selected Pages
            </>
          )}
        </button>
      </div>

      {mergedUrl && (
        <MergeCompleteModal mergedUrl={mergedUrl} onClose={reset} />
      )}

      {/* Footer info */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        {[
          { title: 'Private', desc: 'Files stay on your device' },
          { title: 'Fast', desc: 'Instant client-side merge' },
          { title: 'Free', desc: 'No limits, no sign-up' },
        ].map((item) => (
          <div key={item.title} className="py-3">
            <p className="font-semibold text-gray-800 text-sm">
              {item.title}
            </p>
            <p className="text-xs text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
