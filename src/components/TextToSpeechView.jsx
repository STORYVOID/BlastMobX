import React, { useState } from 'react';
import { Volume2, Play, AlertCircle } from 'lucide-react';

export default function TextToSpeechView({ isPremium }) {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const handleSpeak = () => {
    if (!text.trim()) return;
    if (!isPremium) {
      setShowAd(true);
      return;
    }
    executeSpeech();
  };

  const executeSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Volume2 className="text-indigo-400" size={16} /> Text to Speech
        </h2>
        {!isPremium && <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">Ad-supported</span>}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yahan text likhein jisko audio me convert karna hai..."
        className="w-full h-40 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs resize-none"
      />

      <button
        onClick={handleSpeak}
        disabled={!text.trim()}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 text-white font-medium rounded-2xl flex items-center justify-center gap-2 text-xs shadow-lg shadow-indigo-600/20 transition-all"
      >
        <Play size={16} />
        <span>Play Audio</span>
      </button>

      {showAd && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xs w-full text-center space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-base font-bold text-white">Sponsored Ad</h3>
            <p className="text-[11px] text-slate-400">Free user ke liye ad chal rahi hai. Premium lene par ads nahi aayengi.</p>
            <button
              onClick={() => { setShowAd(false); executeSpeech(); }}
              className="w-full py-3 bg-indigo-600 text-white text-xs font-medium rounded-xl"
            >
              Skip Ad & Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
