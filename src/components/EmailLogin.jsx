import React, { useState } from 'react';
import { Mail, ArrowRight, Mic } from 'lucide-react';

export default function EmailLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Kripya valid email daalein.');
      return;
    }
    onLogin(email);
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-8 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="text-center mb-8">
        {/* VoxaFlow Logo Icon */}
        <div className="w-20 h-20 bg-indigo-600/10 border-2 border-indigo-500/40 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-500/10 text-indigo-400">
          <Mic size={36} />
        </div>
        <h1 className="text-2xl font-black text-white tracking-wider">VOXAFLOW</h1>
        <p className="text-xs text-indigo-400 font-medium mt-1">Smart Text-to-Speech & File Suite</p>
        <p className="text-xs text-slate-400 mt-3">Shuru karne ke liye apna email darj karein</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="apna.email@gmail.com"
            className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm shadow-inner"
          />
          {error && <p className="text-xs text-rose-400 mt-1.5 pl-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all text-sm shadow-lg shadow-indigo-600/30"
        >
          <span>Get Started</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
