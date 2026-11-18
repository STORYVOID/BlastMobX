import React, { useState } from 'react';
import { FileText, Download, CheckCircle } from 'lucide-react';

export default function FileMakerView({ isPremium }) {
  const [fileName, setFileName] = useState('my-document');
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

    setSuccessMsg(`File "${fileName}.txt" download ho gayi hai!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <FileText className="text-emerald-400" size={20} /> File Creator Module
      </h2>
      <form onSubmit={handleCreateFile} className="space-y-4">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="File name"
          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
        />
        <textarea
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          placeholder="File content..."
          className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm"
        />
        <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm flex items-center justify-center gap-2">
          <Download size={16} /> Create & Download File
        </button>
      </form>
      {successMsg && <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs flex items-center gap-2"><CheckCircle size={16} />{successMsg}</div>}
    </div>
  );
}
