import React, { useState } from 'react';
import EmailLogin from './components/EmailLogin';
import Dashboard from './components/Dashboard';

export default function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('voxaflow_email') || null);

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem('voxaflow_email', email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('voxaflow_email');
    localStorage.removeItem('voxaflow_premium');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Mobile App Container Frame */}
      <div className="w-full sm:max-w-md h-screen sm:h-[820px] bg-slate-900 sm:border sm:border-slate-800 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        {!userEmail ? (
          <EmailLogin onLogin={handleLogin} />
        ) : (
          <Dashboard userEmail={userEmail} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
