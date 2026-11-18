import React, { useState, useEffect } from 'react';
import EmailLogin from './components/EmailLogin';
import Dashboard from './components/Dashboard';

export default function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('user_email') || null);

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem('user_email', email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('user_email');
    localStorage.removeItem('is_premium');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center sm:py-6">
      {/* Mobile Phone Frame Container */}
      <div className="w-full sm:max-w-[420px] h-screen sm:h-[840px] bg-slate-900 sm:border-[8px] sm:border-slate-800 sm:rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Phone Notch / Status Bar */}
        <div className="bg-slate-950 px-6 py-2.5 flex justify-between items-center text-[11px] text-slate-400 select-none z-20">
          <span>9:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 font-medium">
            <span>5G</span>
            <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-3 bg-emerald-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {!userEmail ? (
            <EmailLogin onLogin={handleLogin} />
          ) : (
            <Dashboard userEmail={userEmail} onLogout={handleLogout} />
          )}
        </div>

        {/* Home Bar Indicator (iPhone/Android Style) */}
        <div className="bg-slate-950 py-2 flex justify-center items-center z-20">
          <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
      }
