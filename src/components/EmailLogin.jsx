import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function EmailLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Kripya sahi email daalein');
      return;
    }
    onLogin(email);
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
          <Sparkles size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">STORYVOID</h1>
        <p className="text-xs text-slate-400 mt-1">App shuru karne ke liye apna email dalein</p>
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
            placeholder="name@example.com"
            className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm shadow-inner"
          />
          {error && <p className="text-xs text-rose-400 mt-1.5 pl-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all text-sm shadow-xl shadow-indigo-600/30"
        >
          <span>Get Started</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
        }
