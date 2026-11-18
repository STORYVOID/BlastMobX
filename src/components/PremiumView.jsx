import React from 'react';
import { Crown, Check, Zap } from 'lucide-react';

export default function PremiumView({ isPremium, onTogglePremium }) {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-sm font-bold text-white flex items-center gap-2">
        <Crown className="text-amber-400" size={16} /> Premium Upgrade
      </h2>

      <div className="space-y-3">
        {/* Free Plan Card */}
        <div className={`p-4 rounded-2xl border ${!isPremium ? 'border-indigo-500 bg-slate-900' : 'border-slate-800 bg-slate-900/40'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-white">Free Plan</span>
            <span className="text-[10px] text-slate-400">Current</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Ads enabled before actions.</p>
          <button
            onClick={() => onTogglePremium(false)}
            className="w-full py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium"
          >
            {!isPremium ? 'Active Plan' : 'Switch to Free'}
          </button>
        </div>

        {/* Premium Plan Card */}
        <div className={`p-4 rounded-2xl border ${isPremium ? 'border-amber-500 bg-slate-900 shadow-lg shadow-amber-500/10' : 'border-slate-800 bg-slate-900/40'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1"><Crown size={12} /> PRO VIP</span>
            {isPremium && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">Active</span>}
          </div>
          <p className="text-[11px] text-slate-300 mb-3">100% Ad-Free, Direct file maker access.</p>
          <button
            onClick={() => onTogglePremium(true)}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <Zap size={14} />
            <span>{isPremium ? 'Premium Activated' : 'Upgrade to Pro'}</span>
          </button>
        </div>
      </div>
    </div>
  );
      }
