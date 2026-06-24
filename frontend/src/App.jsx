import React, { useState } from 'react';
import ProjectAuditor from './ProjectAuditor';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '' });

  // 🔥 FIX 1: Turn history into a dynamic React State array
  const [history, setHistory] = useState([
    { id: 1, date: '2026-06-22', title: 'LUNA Intelligence Platform', role: 'Full Stack Engineer', score: 84 },
    { id: 2, date: '2026-06-18', title: 'E-Commerce Core API', role: 'Backend Developer', score: 62 },
    { id: 3, date: '2026-05-30', title: 'Developer Portfolio v2', role: 'UI Engineer', score: 91 },
  ]);

  // 🔥 FIX 2: Create an append function to push new audits to the top of the log list
  const handleNewAuditLogged = (newAudit) => {
    const formattedItem = {
      id: Date.now(), // Generate a unique identifier
      date: new Date().toISOString().split('T')[0], // Generate current 2026 stamp
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
      
      {/* HEADER NAVIGATION BAR */}
      <header className="border-b border-gray-800 bg-gray-900 px-8 py-4 shadow-xl sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="w-1/3 flex items-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
              <span className="text-amber-500 text-2xl font-extrabold select-none">◈</span>
            </div>
            <button onClick={() => setCurrentTab('home')} className={`pb-1 transition-all border-b-2 ${currentTab === 'home' ? 'text-amber-400 border-amber-400 font-semibold' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>Home</button>
            <button onClick={() => setCurrentTab('about')} className={`pb-1 transition-all border-b-2 ${currentTab === 'about' ? 'text-amber-400 border-amber-400 font-semibold' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>About</button>
            <button onClick={() => setCurrentTab('history')} className={`pb-1 transition-all border-b-2 ${currentTab === 'history' ? 'text-amber-400 border-amber-400 font-semibold' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>History</button>
          </nav>
          <div className="w-1/3 flex justify-center">
            <h1 className="text-lg md:text-xl font-bold tracking-[0.2em] text-white text-center uppercase select-none">AI Portfolio Audit</h1>
          </div>
          <div className="w-1/3 flex justify-end items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-3 py-1.5 rounded capitalize">👋 {userProfile?.name || 'Developer'}</span>
                <button onClick={() => { setIsLoggedIn(false); setUserProfile(null); }} className="text-xs text-gray-400 hover:text-red-400 transition-colors font-medium">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => setShowLoginModal(true)} className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 font-medium">Sign In</button>
                <button onClick={() => setShowRegisterModal(true)} className="text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-950 font-bold px-4 py-1.5 rounded-md shadow-md transition-all active:scale-95">Register</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* RENDER SURFACES */}
      <main className="flex-grow py-12 px-6">
        {/* 🔥 FIX 3: Pass down the updated tracking action loop into your ProjectAuditor component */}
        {currentTab === 'home' && <ProjectAuditor onAuditLogged={handleNewAuditLogged} />}

        {currentTab === 'about' && (
          <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl space-y-8 animate-in fade-in duration-200">
            
            {/* Header Section */}
            <div className="border-b border-gray-800 pb-5">
              <h2 className="text-3xl font-bold text-white tracking-tight">About AI Portfolio Audit</h2>
              <p className="text-sm text-gray-400 mt-1">
                Your smart optimization assistant for refactoring software engineering projects against modern technical recruiters and ATS algorithms.
              </p>
            </div>

            {/* How It Works Workflow Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-950 p-5 rounded-lg border border-gray-800/80 hover:border-gray-700 transition-colors">
                  <div className="text-amber-400 text-xs font-mono mb-2 font-bold">[01] FETCH OR PASTE</div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Drop a public GitHub repository link to automatically pull your tech stack and description, or manually input your case study from scratch.
                  </p>
                </div>
                <div className="bg-gray-950 p-5 rounded-lg border border-gray-800/80 hover:border-gray-700 transition-colors">
                  <div className="text-amber-400 text-xs font-mono mb-2 font-bold">[02] ATS GAP EVALUATION</div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Provide a target job description to let the audit engine look for critical missing technical frameworks, soft skills, or architectural concepts.
                  </p>
                </div>
                <div className="bg-gray-950 p-5 rounded-lg border border-gray-800/80 hover:border-gray-700 transition-colors">
                  <div className="text-amber-400 text-xs font-mono mb-2 font-bold">[03] METRIC INJECTION</div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Review your dynamic impact score, clear keyword gaps, and click to instantly append high-impact STAR-method sentences to your text.
                  </p>
                </div>
              </div>
            </div>

            {/* Core System Features */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Core Features</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start bg-gray-950/50 p-4 rounded-lg border border-gray-800/60">
                  <span className="text-amber-500 text-base mt-0.5">⚡</span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">Automated README Parsing</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Strips clean titles, languages, and markdown excerpts straight from GitHub pipelines to bypass slow copy-pasting.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-gray-950/50 p-4 rounded-lg border border-gray-800/60">
                  <span className="text-amber-500 text-base mt-0.5">📊</span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">Impact Scoring Metric</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Analyzes your project based on quantitative engineering achievements rather than soft, descriptive summaries.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-gray-950/50 p-4 rounded-lg border border-gray-800/60">
                  <span className="text-amber-500 text-base mt-0.5">🔍</span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">Keyword Extraction</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Automatically identifies hard technical skills required by recruiters that your project layout left out.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-gray-950/50 p-4 rounded-lg border border-gray-800/60">
                  <span className="text-amber-500 text-base mt-0.5">📝</span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">One-Click Description Sync</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Instantly stitch AI-optimized, action-oriented engineering suggestions back into your active workspace canvas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Engine Guard Notice */}
            <div className="bg-amber-950/10 border border-amber-900/30 rounded-lg p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider block">🛡️ Smart Offline Fallback Mode Active</span>
                <p className="text-[11px] text-gray-400">
                  Equipped with secondary string parsing heuristics. This system remains functional and interactive even when global rate limits or credit quotas restrict API endpoints.
                </p>
              </div>
            </div>

          </div>
        )}

        {currentTab === 'history' && (
          <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Audit Session Logs</h2>
              <span className="text-xs text-gray-400 font-mono bg-gray-950 px-2.5 py-1 rounded border border-gray-800">Total Runs: {history.length}</span>
            </div>
            <div className="space-y-3">
              {/* 🔥 FIX 4: Loop over the modern state 'history' instead of mockHistory placeholder references */}
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
            </div>
          </div>
        )}
      </main>

      {/* MODAL WINDOWS FOR AUTH STAY UNCHANGED BELOW THIS LINE */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-xl p-8 shadow-2xl space-y-6 relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">✕</button>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                <input type="email" required value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-md p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
                <input type="password" required value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-md p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold py-2.5 rounded-md text-sm transition-colors">Sign In</button>
            </form>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-xl p-8 shadow-2xl space-y-5 relative">
            <button onClick={() => setShowRegisterModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">✕</button>
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                <input type="text" required value={registerData.name} onChange={(e) => setRegisterData({...registerData, name: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-md p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                <input type="email" required value={registerData.email} onChange={(e) => setRegisterData({...registerData, email: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-md p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Phone Number</label>
                <input type="tel" required value={registerData.phone} onChange={(e) => setRegisterData({...registerData, phone: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-md p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Password</label>
                <input type="password" required value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-md p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold py-2.5 rounded-md text-sm transition-colors">Complete Registration</button>
            </form>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-800 bg-gray-900 px-8 py-5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Audit Architecture System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;