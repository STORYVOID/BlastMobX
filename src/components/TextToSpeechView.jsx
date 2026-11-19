import React, { useState, useEffect } from 'react';
import { Volume2, Play, AlertCircle, ChevronDown, UserCheck, X } from 'lucide-react';
import { VOICE_PRESETS } from './VoicePresets';

export default function TextToSpeechView({ isPremium }) {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [genderTab, setGenderTab] = useState('male');
  const [selectedPreset, setSelectedPreset] = useState(VOICE_PRESETS[0]);
  const [availableVoices, setAvailableVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        setAvailableVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const pickMatchingBrowserVoice = (gender) => {
    if (!availableVoices.length) return null;
    const byGender = availableVoices.filter((v) => {
      const n = v.name.toLowerCase();
      if (gender === 'female') {
        return n.includes('female') || n.includes('zira') || n.includes('siri') || n.includes('google uk english female');
      }
      return n.includes('male') || n.includes('david') || n.includes('george') || n.includes('google uk english male');
    });
    return byGender[0] || availableVoices[0];
  };

  const executeSpeech = () => {
    if (!('speechSynthesis' in window) || !text.trim()) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const matchedVoice = pickMatchingBrowserVoice(selectedPreset.gender);
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.pitch = selectedPreset.pitch;
    utterance.rate = selectedPreset.rate;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    if (!text.trim()) return;
    if (!isPremium) {
      setShowAd(true);
      return;
    }
    executeSpeech();
  };

  const filteredPresets = VOICE_PRESETS.filter((item) => item.gender === genderTab);

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

      <button
        onClick={() => setShowVoiceModal(true)}
        className="w-full py-3 px-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-between text-xs text-slate-300 transition-all shadow-md"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>
          <span className="font-medium text-white shrink-0">Voice:</span>
          <span className="text-indigo-400 truncate">{selectedPreset.name}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 shrink-0">
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">Change</span>
          <ChevronDown size={14} />
        </div>
      </button>

      <button
        onClick={handleSpeak}
        disabled={!text.trim()}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-xs shadow-lg shadow-indigo-600/20 transition-all"
      >
        <Play size={16} />
        <span>{isPlaying ? 'Playing Audio...' : 'Play Audio'}</span>
      </button>

      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Select Voice Character</h3>
              <button
                onClick={() => setShowVoiceModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/50"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950/50 border-b border-slate-800">
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
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[300px]">
              {filteredPresets.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setShowVoiceModal(false);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{preset.name}</div>
                      <div className="text-[10px] text-slate-400">{preset.tag}</div>
                    </div>
                    {isSelected && <UserCheck size={16} className="text-indigo-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
