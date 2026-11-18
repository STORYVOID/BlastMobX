import React, { useState } from 'react';
import { Volume2, Play, AlertCircle } from 'lucide-react';

export default function TextToSpeechView({ isPremium }) {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const handleSpeak = () => {
    if (!text.trim()) return;
    if (!isPremium) {
      setShowAd(true); // Free users watch ad first
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
    <div className="flex flex-col h-full space-y-4">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <Volume2 className="text-indigo-400" size={20} /> Text to Speech Converter
      </h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yahan text type karein..."
        className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm"
      />
      <button
        onClick={handleSpeak}
        disabled={!text.trim()}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl flex items-center gap-2 text-sm"
      >
        <Play size={16} /> Play Audio
      </button>

      {showAd && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <AlertCircle size={24} className="mx-auto text-amber-400" />
            <h3 className="text-lg font-bold text-white">Sponsored Ad</h3>
            <p className="text-xs text-slate-400">Free user ke liye ad chal rahi hai. Premium le kar ads hataein!</p>
            <button
              onClick={() => { setShowAd(false); executeSpeech(); }}
              className="w-full py-2.5 bg-indigo-600 text-white text-sm rounded-xl"
            >
              Skip Ad & Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
