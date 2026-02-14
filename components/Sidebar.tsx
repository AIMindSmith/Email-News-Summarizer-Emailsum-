
import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  activeTab: 'dashboard' | 'architecture' | 'features';
  setActiveTab: (tab: 'dashboard' | 'architecture' | 'features') => void;
  currentFilter: Category | 'All';
  setFilter: (filter: Category | 'All') => void;
  onClearData: () => void;
  onChangeKey: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  currentFilter, 
  setFilter, 
  onClearData,
  onChangeKey 
}) => {
  const categories = ['All', ...Object.values(Category)];

  const navItems = [
    { id: 'dashboard', label: 'Summaries', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'architecture', label: 'Architecture', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  ];

  return (
    <div className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col p-4">
      <div className="flex items-center gap-3 px-3 py-6 mb-4">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-xl font-black text-white tracking-tight">EmailSum</h1>
      </div>

      <nav className="space-y-1 mb-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.id 
                ? 'bg-slate-800 text-white border border-slate-700' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="space-y-4 mb-8">
        <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Filters</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat as any);
                setActiveTab('dashboard');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentFilter === cat 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
          <button 
            onClick={onChangeKey}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Switch API Key
          </button>
          <button 
            onClick={onClearData}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] font-bold text-slate-500 hover:text-rose-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear History
          </button>
        </div>
        <div className="text-center py-2">
           <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Public Deployment Ready</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
