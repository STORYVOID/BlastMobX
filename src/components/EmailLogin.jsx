import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function EmailLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Kripya valid email daalein.');
      return;
    }
    setError('');
    onLogin(email);
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail size={24} />
        </div>
        <h1 className="text-2xl font-bold text-white">App Me Swagat Hai</h1>
        <p className="text-sm text-slate-400 mt-1">Shuru karne ke liye apna email darj karein</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="apna.email@example.com"
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <span>Aage Badhein</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
