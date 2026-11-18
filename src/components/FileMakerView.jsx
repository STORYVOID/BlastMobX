import React, { useState } from 'react';
import { FileText, Download, CheckCircle } from 'lucide-react';

export default function FileMakerView({ isPremium }) {
  const [fileName, setFileName] = useState('my-file');
  const [fileContent, setFileContent] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateFile = (e) => {
    e.preventDefault();
    if (!fileContent.trim()) return;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setSuccessMsg(`File "${fileName}.txt" download ho gayi!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-sm font-bold text-white flex items-center gap-2">
        <FileText className="text-emerald-400" size={16} /> File Maker
      </h2>

      <form onSubmit={handleCreateFile} className="space-y-3">
        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">File Name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Content</label>
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            placeholder="File ka text yahan likhein..."
            className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!fileContent.trim()}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50 text-white font-medium rounded-2xl flex items-center justify-center gap-2 text-xs shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Download size={16} />
          <span>Create & Download File</span>
        </button>
      </form>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle size={14} />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
}
