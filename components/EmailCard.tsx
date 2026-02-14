
import React from 'react';
import { EmailSummary, Category } from '../types';

interface EmailCardProps {
  email: EmailSummary;
}

const EmailCard: React.FC<EmailCardProps> = ({ email }) => {
  const isImportant = email.category === Category.IMPORTANT || email.importance >= 8;

  const getCategoryStyles = (cat: Category) => {
    switch (cat) {
      case Category.IMPORTANT: return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case Category.NEWS: return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case Category.AI_TOOLS: return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      case Category.LINKS: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case Category.PROMPTS: return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className={`group relative flex flex-col h-full bg-slate-800/40 rounded-2xl border transition-all duration-300 hover:bg-slate-800/60 hover:-translate-y-1 ${
      isImportant ? 'border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'border-slate-700/50'
    }`}>
      {isImportant && (
        <div className="absolute -top-3 left-4 bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest shadow-lg">
          High Impact
        </div>
      )}

      <div className="p-5 flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{email.community} • {email.sender}</p>
            <h3 className="text-lg font-bold text-slate-100 leading-tight line-clamp-2 group-hover:text-white transition-colors">
              {email.rawSubject}
            </h3>
          </div>
          <span className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getCategoryStyles(email.category)}`}>
            {email.category.toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed font-normal">
          {email.summary}
        </p>

        {email.keyLinks.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Resources</p>
            <div className="flex flex-wrap gap-2">
              {email.keyLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/30 hover:bg-slate-700/60 border border-slate-600/30 rounded-lg text-xs text-blue-400 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {new URL(link).hostname.replace('www.', '')}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700/50 flex justify-between items-center bg-slate-900/20 rounded-b-2xl">
        <span className="text-[10px] text-slate-500 font-mono">{email.date}</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full ${i < email.importance / 2 ? 'bg-indigo-500' : 'bg-slate-700'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
