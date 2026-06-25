import React, { useState, useEffect } from 'react';
import ProjectAuditor from './ProjectAuditor';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '' });

  // 🔥 FEATURE 1: LocalStorage Persistence
  // It checks the browser memory first. If empty, it loads the default array.
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('auditHistory');
    if (savedHistory) {
      return JSON.parse(savedHistory);
    }
    return [
      { id: 1, date: '2026-06-22', title: 'LUNA Intelligence Platform', role: 'Full Stack Engineer', score: 84 },
      { id: 2, date: '2026-06-18', title: 'E-Commerce Core API', role: 'Backend Developer', score: 62 },
    ];
  });

  // Whenever 'history' updates, automatically sync it to browser storage
  useEffect(() => {
    localStorage.setItem('auditHistory', JSON.stringify(history));
  }, [history]);

  const handleNewAuditLogged = (newAudit) => {
    const formattedItem = {
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0], 
      title: newAudit.title,
      role: newAudit.role,
      score: newAudit.score
    };
    setHistory((prevHistory) => [formattedItem, ...prevHistory]);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUserProfile({ name: loginData.email.split('@')[0], email: loginData.email });
    setShowLoginModal(false);
    setLoginData({ email: '', password: '' });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUserProfile({ name: registerData.name, email: registerData.email });
    setShowRegisterModal(false);
    setRegisterData({ name: '', email: '', phone: '', password: '' });
  };

  return (
    <div className="bg-gray-950 min-h-screen font-sans flex flex-col text-gray-100 selection:bg-amber-500 selection:text-gray-950">
      
      <nav className="w-full bg-slate-950 border-b border-slate-800 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xl">◆</span>
            <h1 className="text-base md:text-lg font-black tracking-widest text-white uppercase whitespace-nowrap m-0">
              AI Portfolio Audit
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm font-medium text-slate-400">
            <button onClick={() => setCurrentTab('home')} className={`hover:text-white transition-colors bg-transparent border-none ${currentTab === 'home' ? 'text-amber-400 font-bold' : ''}`}>Home</button>
            <button onClick={() => setCurrentTab('about')} className={`hover:text-white transition-colors bg-transparent border-none ${currentTab === 'about' ? 'text-amber-400 font-bold' : ''}`}>About</button>
            <button onClick={() => setCurrentTab('history')} className={`hover:text-white transition-colors bg-transparent border-none ${currentTab === 'history' ? 'text-amber-400 font-bold' : ''}`}>History</button>
            <button onClick={() => setShowLoginModal(true)} className="hover:text-white transition-colors bg-transparent border-none ml-4">Sign In</button>
            <button onClick={() => setShowRegisterModal(true)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-md font-bold transition-colors shadow-md">Register</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow py-12 px-6">
        {currentTab === 'home' && <ProjectAuditor onAuditLogged={handleNewAuditLogged} />}
        
        {/* About Tab Content Removed for Brevity (Keep your existing About code here!) */}
        {currentTab === 'about' && (
           <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl text-center">
             <h2 className="text-3xl font-bold text-white tracking-tight">About AI Portfolio Audit</h2>
             <p className="text-gray-400 mt-4">Your smart optimization assistant.</p>
           </div>
        )}

        {currentTab === 'history' && (
          <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Audit Session Logs</h2>
              <span className="text-xs text-gray-400 font-mono bg-gray-950 px-2.5 py-1 rounded border border-gray-800">Total Runs: {history.length}</span>
            </div>
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-950 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-gray-500">{item.date}</span>
                    <h3 className="text-md font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Impact Score</div>
                    <span className={`text-xl font-bold ${item.score > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{item.score}/100</span>
                  </div>
                </div>
              ))}
              {history.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No audit history found. Run an evaluation to save your first log!</p>}
            </div>
          </div>
        )}
      </main>

      {/* Modals Footer Keep Your Existing Modals Here */}
      <footer className="border-t border-gray-800 bg-gray-900 px-8 py-5 mt-auto text-center">
        <p className="text-xs text-gray-500">© 2026 Audit Architecture System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;