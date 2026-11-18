import React, { useState } from 'react';
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
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {!userEmail ? (
        <EmailLogin onLogin={handleLogin} />
      ) : (
        <Dashboard userEmail={userEmail} onLogout={handleLogout} />
      )}
    </div>
  );
}
