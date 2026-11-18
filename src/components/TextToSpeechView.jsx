import React, { useState, useEffect } from 'react';
import { Volume2, Play, AlertCircle, ChevronDown, UserCheck, X } from 'lucide-react';

export default function TextToSpeechView({ isPremium }) {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAd, setShowAd] = useState(false);
  
  // Voice Selection States
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [genderTab, setGenderTab] = useState('female'); // 'male' or 'female'
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Load browser speech synthesis voices
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        // Default select first available voice if none selected
        if (voices.length > 0 && !selectedVoice) {
          setSelectedVoice(voices[0]);
        }
      }
    };

    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Filter voices based on name/lang keywords or browser defaults
  const filterVoicesByGender = (gender) => {
    return availableVoices.filter(v => {
      const name = v.name.toLowerCase();
      if (gender === 'female') {
        return name.includes('female') || name.includes('zira') || name.includes('google uk english female') || name.includes('siri') || name.includes('natural') || (!name.includes('male') && !name.includes('david') && !name.includes('george'));
      } else {
        return name.includes('male') || name.includes('david') || name.includes('george') || name.includes('google uk english male');
      }
    });
  };

  const currentGenderVoices = filterVoicesByGender(genderTab);

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
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
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
        {!isPremium && (
          <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-medium">
            Ad-Supported
          </span>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Yahan text type karein jise aawaz me convert karna hai..."
        className="w-full h-36 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs resize-none"
      />

      {/* --- NEW VOICE SELECTOR BUTTON --- */}
      <button
        onClick={() => setShowVoiceModal(true)}
        className="w-full py-3 px-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-between text-xs text-slate-300 transition-all shadow-md"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="font-medium text-white">Voice:</span>
          <span className="text-indigo-400 truncate max-w-[180px]">
            {selectedVoice ? selectedVoice.name : 'Default Voice'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">Change</span>
          <ChevronDown size={14} />
        </div>
      </button>

      {/* Play Button */}
      <button
        onClick={handleSpeak}
        disabled={!text.trim()}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-xs shadow-lg shadow-indigo-600/20 transition-all"
      >
        <Play size={16} />
        <span>Play Audio</span>
      </button>

      {/* --- VOICE SELECTION POPUP MODAL --- */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-slideUp">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Select Voice Style</h3>
              <button 
                onClick={() => setShowVoiceModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/50"
              >
                <X size={16} />
              </button>
            </div>

            {/* Male / Female Tabs */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950/50 border-b border-slate-800">
              <button
                onClick={() => setGenderTab('female')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  genderTab === 'female' 
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                👩 Female Voices
              </button>
              <button
                onClick={() => setGenderTab('male')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  genderTab === 'male' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                👨 Male Voices
              </button>
            </div>

            {/* Voice List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[300px]">
              {currentGenderVoices.length > 0 ? (
                currentGenderVoices.map((voice, idx) => {
                  const isSelected = selectedVoice?.name === voice.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedVoice(voice);
                        setShowVoiceModal(false);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                          : 'bg-slate-950 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{voice.name}</div>
                        <div className="text-[10px] text-slate-400">{voice.lang}</div>
                      </div>
                      {isSelected && <UserCheck size={16} className="text-indigo-400" />}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-xs text-slate-500">
                  Is category me voices uplabdh nahi hain. Dusra tab try karein.
                </div>
              )}
            </div>

            {/* Footer close */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
              <button
                onClick={() => setShowVoiceModal(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- SPONSORED AD MODAL FOR FREE USERS --- */}
      {showAd && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xs w-full text-center space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-base font-bold text-white">VoxaFlow Sponsored Ad</h3>
            <p className="text-[11px] text-slate-400">Free version me audio chalne se pehle ad aati hai. Premium lene par ye hat jayegi!</p>
            <button
              onClick={() => { setShowAd(false); executeSpeech(); }}
              className="w-full py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl"
            >
              Skip Ad & Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  
