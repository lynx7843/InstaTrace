import { useState } from 'react';
import FileDropzone from './FileDropzone';
import HtmlPasteBox from './HtmlPasteBox';

export default function DataInputSection({ rawHtmlData, setRawHtmlData, onAnalyze }) {
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'paste'

  return (
    <div className="space-y-8 max-w-3xl mx-auto border border-white p-8">
      <div className="flex justify-between items-center border-b border-white pb-4">
        <h2 className="text-xl font-bold uppercase tracking-widest">Data Input</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setInputMode('upload')}
            className={`text-sm font-bold uppercase tracking-wider px-3 py-1 border ${inputMode === 'upload' ? 'bg-white text-black border-white' : 'border-white hover:bg-neutral-900'}`}
          >
            Upload Files
          </button>
          <button
            onClick={() => setInputMode('paste')}
            className={`text-sm font-bold uppercase tracking-wider px-3 py-1 border ${inputMode === 'paste' ? 'bg-white text-black border-white' : 'border-white hover:bg-neutral-900'}`}
          >
            Paste HTML
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {inputMode === 'upload' ? (
          <>
            <FileDropzone 
              label="Followers HTML (Required, Multiple allowed)" 
              multiple={true} 
              onFilesRead={(data) => setRawHtmlData(prev => ({ ...prev, followers: data }))} 
            />
            <FileDropzone 
              label="Following HTML (Required)" 
              multiple={false} 
              onFilesRead={(data) => setRawHtmlData(prev => ({ ...prev, following: data }))} 
            />
            <FileDropzone 
              label="Pending Requests HTML (Optional)" 
              multiple={false} 
              onFilesRead={(data) => setRawHtmlData(prev => ({ ...prev, pending: data }))} 
            />
          </>
        ) : (
          <>
            <HtmlPasteBox
              label="Followers HTML"
              value={rawHtmlData.followers.join('\n')}
              onChange={(val) => setRawHtmlData(prev => ({ ...prev, followers: [val] }))}
              placeholder="Paste the raw contents of followers_1.html here..."
            />
            <HtmlPasteBox
              label="Following HTML"
              value={rawHtmlData.following}
              onChange={(val) => setRawHtmlData(prev => ({ ...prev, following: val }))}
              placeholder="Paste the raw contents of following.html here..."
            />
            <HtmlPasteBox
              label="Pending Requests HTML"
              value={rawHtmlData.pending}
              onChange={(val) => setRawHtmlData(prev => ({ ...prev, pending: val }))}
              placeholder="(Optional) Paste the raw contents of pending_follow_requests.html here..."
            />
          </>
        )}
      </div>

      <button
        onClick={onAnalyze}
        className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors"
      >
        Analyze Relationships
      </button>
    </div>
  );
}