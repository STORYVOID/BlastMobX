import React, { useState } from 'react';
import TextToSpeechView from './TextToSpeechView';
import PremiumView from './PremiumView';
import FileMakerView from './FileMakerView';
import { Volume2, Crown, FileText, LogOut, Mic } from 'lucide-react';

export default function Dashboard({ userEmail, onLogout }) {
  const [activeTab, setActiveTab] = useState('tts');
  const [isPremium, setIsPremium] = useState(localStorage.getItem('voxaflow_premium') === 'true');

  const handleTogglePremium = (status) => {
    setIsPremium(status);
    localStorage.setItem('voxaflow_premium', status);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Header */}
      <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-sm">
            <Mic size={18} />
          </div>
          <div className="overflow-hidden">
            <div className="text-[10px] text-indigo-400 font-bold tracking-wider">VOXAFLOW</div>
            <div className="text-xs font-semibold text-white truncate max-w-[150px]">{userEmail}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPremium && (
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-lg flex items-center gap-1">
              <Crown size={10} /> PRO
            </span>
          )}
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 rounded-xl transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        {activeTab === 'tts' && <TextToSpeechView isPremium={isPremium} />}
        {activeTab === 'premium' && <PremiumView isPremium={isPremium} onTogglePremium={handleTogglePremium} />}
        {activeTab === 'filemaker' && <FileMakerView isPremium={isPremium} />}
      </div>

      {/* 3 Buttons Bottom Navigation */}
      <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-1.5 grid grid-cols-3 gap-1 shadow-2xl z-20">
        <button
          onClick={() => setActiveTab('tts')}
          className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'tts'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Volume2 size={16} />
          <span className="text-[10px]">1. Text-Speech</span>
        </button>

        <button
          onClick={() => setActiveTab('premium')}
          className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'premium'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Crown size={16} />
          <span className="text-[10px]">2. Premium</span>
        </button>

        <button
          onClick={() => setActiveTab('filemaker')}
          className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
            activeTab === 'filemaker'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText size={16} />
          <span className="text-[10px]">3. File Maker</span>
        </button>
      </div>
    </div>
  );
}
