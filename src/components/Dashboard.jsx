import React, { useState } from 'react';
import TextToSpeechView from './TextToSpeechView';
import PremiumView from './PremiumView';
import FileMakerView from './FileMakerView';
import { Volume2, Crown, FileText, LogOut, User } from 'lucide-react';

export default function Dashboard({ userEmail, onLogout }) {
  const [activeTab, setActiveTab] = useState('tts');
  const [isPremium, setIsPremium] = useState(localStorage.getItem('is_premium') === 'true');

  const handleTogglePremium = (status) => {
    setIsPremium(status);
    localStorage.setItem('is_premium', status);
  };

  return (
    <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[550px]">
      {/* Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold">
            <User size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400">Logged in as</div>
            <div className="text-sm font-medium text-white truncate max-w-[200px]">{userEmail}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isPremium && (
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full flex items-center gap-1">
              <Crown size={12} /> Premium Active
            </span>
          )}
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 rounded-xl transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* 3 Buttons Navigation */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-slate-950/50 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('tts')}
          className={`py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'tts' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          <Volume2 size={18} />
          <span>1. Text to Speech</span>
        </button>

        <button
          onClick={() => setActiveTab('premium')}
          className={`py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'premium' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          <Crown size={18} />
          <span>2. Premium Mode</span>
        </button>

        <button
          onClick={() => setActiveTab('filemaker')}
          className={`py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'filemaker' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          <FileText size={18} />
          <span>3. File Maker</span>
        </button>
      </div>

      {/* Views Area */}
      <div className="p-6 flex-1 flex flex-col">
        {activeTab === 'tts' && <TextToSpeechView isPremium={isPremium} />}
        {activeTab === 'premium' && <PremiumView isPremium={isPremium} onTogglePremium={handleTogglePremium} />}
        {activeTab === 'filemaker' && <FileMakerView isPremium={isPremium} />}
      </div>
    </div>
  );
          }
            
