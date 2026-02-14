
import React, { useState, useEffect } from 'react';
import { processEmailContent } from './services/geminiService';
import { Category, EmailSummary, Feature, ArchitectureComponent } from './types';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import IngestModal from './components/IngestModal';
import ArchitectureView from './components/ArchitectureView';

const STORAGE_KEY = 'emailsum_data_v1';

const App: React.FC = () => {
  const [emails, setEmails] = useState<EmailSummary[]>([]);
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'architecture' | 'features'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  // Check for API Key on mount
  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    };
    checkKey();
  }, []);

  // Hydrate data
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setEmails(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (emails.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
    }
  }, [emails]);

  const handleOpenKeySelector = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    setHasKey(true); // Proceed to app after triggering
  };

  const handleIngest = async (text: string) => {
    setIsLoading(true);
    try {
      const summary = await processEmailContent(text);
      setEmails(prev => [summary, ...prev]);
      setIsIngestOpen(false);
    } catch (error: any) {
      console.error("API Error:", error);
      if (error.message?.includes("entity was not found")) {
        alert("API Key invalid or project not found. Please re-select your key.");
        setHasKey(false);
      } else {
        alert("Failed to summarize email. Check your connection or API key.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm("Clear all saved history?")) {
      setEmails([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  if (hasKey === false) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white tracking-tight">EmailSum</h1>
            <p className="text-slate-400 leading-relaxed">
              Your personal newsletter intelligence engine. To get started, connect your Google Gemini API key securely.
            </p>
          </div>
          <button 
            onClick={handleOpenKeySelector}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3"
          >
            Connect API Key
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            No data is stored on our servers. All processing happens in your browser.
          </p>
        </div>
      </div>
    );
  }

  // Show loading while checking key status
  if (hasKey === null) return <div className="h-screen bg-slate-950" />;

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden text-slate-200">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentFilter={filter}
        setFilter={setFilter}
        onClearData={handleClearData}
        onChangeKey={handleOpenKeySelector}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          title={activeTab === 'dashboard' ? 'Inbox Intelligence' : activeTab === 'architecture' ? 'System Blueprint' : 'Product Roadmap'} 
          onIngestClick={() => setIsIngestOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <Dashboard emails={emails} filter={filter} />}
          {activeTab === 'architecture' && <ArchitectureView architecture={[]} />}
          {activeTab === 'features' && <div className="text-center p-20 text-slate-500">Coming Soon</div>}
        </div>
      </main>

      <IngestModal 
        isOpen={isIngestOpen} 
        onClose={() => setIsIngestOpen(false)} 
        onIngest={handleIngest}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
