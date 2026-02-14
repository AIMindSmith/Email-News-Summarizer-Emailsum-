
import React from 'react';

interface HeaderProps {
  title: string;
  onIngestClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onIngestClick }) => {
  return (
    <header className="h-20 flex-shrink-0 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700">
          <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search summaries..." 
            className="bg-transparent border-none text-sm text-slate-200 focus:ring-0 w-48 placeholder:text-slate-500"
          />
        </div>

        <button 
          onClick={onIngestClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Ingest
        </button>
      </div>
    </header>
  );
};

export default Header;
