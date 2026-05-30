import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Save, RotateCcw, Lock, LogOut, 
  Layout, Type, Briefcase, Star, Instagram, 
  MessageSquare, Settings, Database, History, 
  ArrowLeft, ArrowRight, Zap, Image as ImageIcon
} from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useSiteSettings } from '../hooks/useSiteSettings';

// Sub-components
import { HeroTab } from './admin/HeroTab';
import { LayoutTab } from './admin/LayoutTab';
import { ProjectsTab } from './admin/ProjectsTab';
import { TestimonialsTab } from './admin/TestimonialsTab';
import { ReelsTab } from './admin/ReelsTab';
import { FooterTab } from './admin/FooterTab';
import { ArsenalTab } from './admin/ArsenalTab';
import { MessagesTab } from './admin/MessagesTab';
import { PortfolioManagerTab } from './admin/PortfolioManagerTab';

export default function AdminPanel({ isOpen, setIsOpen, initialTab = 'hero' }: { isOpen: boolean, setIsOpen: (v: boolean) => void, initialTab?: string }) {
  const { settings, updateSettings, resetToDefault, history, undo, redo } = useSiteSettings();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [tempSettings, setTempSettings] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  useEffect(() => {
    if (isOpen && settings) {
      setTempSettings(JSON.parse(JSON.stringify(settings)));
    }
  }, [isOpen, settings]);

  useEffect(() => {
    if (user && activeTab === 'messages') {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return unsub;
    }
  }, [user, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleLocalUpdate = (path: string, value: any) => {
    const newSettings = { ...tempSettings };
    const keys = path.split('.');
    let current = newSettings;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setTempSettings(newSettings);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(tempSettings);
      setIsOpen(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'messages');
    }
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-[200] bg-brand-heading flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-brand-orange rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-brand-orange/20">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight italic">STUDIO ADMIN</h2>
            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Secure environment • Authorized access only</p>
          </div>

          <form onSubmit={handleLogin} className="glass p-10 rounded-[48px] border border-white/10 space-y-6">
            {authError && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-2xl text-center">{authError}</div>}
            <div className="space-y-4">
              <input type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange transition-all" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-orange transition-all" />
            </div>
            <button type="submit" className="w-full py-4 btn-gradient rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl">Initialize Portal</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Zap },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'projects', label: 'Showcase', icon: Briefcase },
    { id: 'portfolio_manager', label: 'Portfolio', icon: ImageIcon },
    { id: 'reels', label: 'Reels', icon: Instagram },
    { id: 'arsenal', label: 'Arsenal', icon: Database },
    { id: 'testimonials', label: 'Social Proof', icon: Star },
    { id: 'footer', label: 'Connect', icon: Type },
    { id: 'messages', label: 'Inbox', icon: MessageSquare },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-brand-bg flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-24 sm:w-80 bg-brand-heading flex flex-col border-r border-white/5 relative z-10">
        <div className="p-8 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-orange flex items-center justify-center shadow-lg shadow-brand-orange/20">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-black tracking-tight text-lg uppercase italic">Control Center</h1>
            <p className="text-white/20 text-[8px] font-bold tracking-[0.3em] uppercase">Vivek Kumar Studio</p>
          </div>
        </div>

        <nav className="flex-1 p-4 sm:p-6 space-y-2 overflow-y-auto no-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeTab === tab.id ? 'bg-white/10 text-white shadow-xl ring-1 ring-white/10' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${activeTab === tab.id ? 'text-brand-orange' : 'group-hover:text-brand-orange'} transition-colors`} />
                <span className="hidden sm:block font-bold uppercase tracking-widest text-[10px]">{tab.label}</span>
                {tab.id === 'messages' && messages.length > 0 && (
                   <span className="ml-auto w-5 h-5 bg-brand-orange text-white text-[8px] font-black rounded-full flex items-center justify-center animate-pulse">
                      {messages.length}
                   </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group">
            <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:block font-bold uppercase tracking-widest text-[10px]">Terminate Session</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">
        {/* Header Bar */}
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-6 sm:px-12 relative z-10 shadow-sm">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <button onClick={undo} disabled={history.currentIndex <= 0} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-heading disabled:opacity-30 transition-all border border-slate-100">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={redo} disabled={history.currentIndex >= history.stack.length - 1} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-heading disabled:opacity-30 transition-all border border-slate-100">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-3 px-6 py-2.5 bg-slate-50 rounded-full border border-slate-100">
              <History className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Version: {history.currentIndex + 1} / {history.stack.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button onClick={() => setShowResetConfirm(true)} className="flex items-center gap-3 px-6 py-3.5 text-red-400 font-black uppercase tracking-widest text-[10px] hover:bg-red-50 rounded-2xl transition-all">
              <RotateCcw className="w-4 h-4" /> <span className="hidden sm:inline">Factory Reset</span>
            </button>
            <div className="h-8 w-px bg-slate-100" />
            <button onClick={() => setIsOpen(false)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-heading border border-slate-100 transition-all">
              <X className="w-6 h-6" />
            </button>
            <button onClick={handleSave} disabled={isSaving} className="px-8 py-3.5 btn-gradient rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-orange/20 flex items-center gap-3 disabled:opacity-50">
              {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </header>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-12 custom-scrollbar">
          <div className="max-w-6xl mx-auto pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tempSettings && (
                  <>
                    {activeTab === 'hero' && <HeroTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'layout' && <LayoutTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'projects' && <ProjectsTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'portfolio_manager' && <PortfolioManagerTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'reels' && <ReelsTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'arsenal' && <ArsenalTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'testimonials' && <TestimonialsTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'footer' && <FooterTab tempSettings={tempSettings} handleLocalUpdate={handleLocalUpdate} />}
                    {activeTab === 'messages' && <MessagesTab messages={messages} deleteMessage={deleteMessage} />}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <AnimatePresence>
          {showResetConfirm && (
            <div className="fixed inset-0 z-[210] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm glass p-10 rounded-[40px] text-center space-y-6">
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <RotateCcw className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white">Reset Everything?</h3>
                <p className="text-white/60 text-sm">This will restore all default content and styles. This cannot be undone.</p>
                <div className="flex gap-4">
                  <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold">Cancel</button>
                  <button onClick={() => { resetToDefault(); setShowResetConfirm(false); }} className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-bold">Yes, Reset</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
