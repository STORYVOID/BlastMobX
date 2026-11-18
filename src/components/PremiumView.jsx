import React from 'react';
import { Crown, CheckCircle2, Zap } from 'lucide-react';

export default function PremiumView({ isPremium, onTogglePremium }) {
  return (
    <div className="flex flex-col h-full space-y-6">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <Crown className="text-amber-400" size={20} /> Premium Membership
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-5 rounded-2xl border ${!isPremium ? 'border-indigo-500 bg-slate-950/80' : 'border-slate-800 bg-slate-950/40'}`}>
          <div className="text-2xl font-bold text-white mb-4">Free</div>
          <p className="text-xs text-slate-400 mb-6">Ads enabled before actions.</p>
          <button onClick={() => onTogglePremium(false)} className="w-full py-2.5 bg-slate-800 text-white rounded-xl text-xs">
            {!isPremium ? 'Current Plan' : 'Switch to Free'}
          </button>
        </div>
        <div className={`p-5 rounded-2xl border ${isPremium ? 'border-amber-500 bg-slate-950/80' : 'border-slate-800 bg-slate-950/40'}`}>
          <div className="text-2xl font-bold text-white mb-4">Premium</div>
          <p className="text-xs text-slate-400 mb-6">100% Ad-Free & Direct access.</p>
          <button onClick={() => onTogglePremium(true)} className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1">
            <Zap size={14} /> {isPremium ? 'Activated' : 'Upgrade to Premium'}
          </button>
        </div>
      </div>
    </div>
  );
}
