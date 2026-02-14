
import React, { useMemo } from 'react';
import { EmailSummary, Category } from '../types';
import EmailCard from './EmailCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  emails: EmailSummary[];
  filter: Category | 'All';
}

const Dashboard: React.FC<DashboardProps> = ({ emails, filter }) => {
  const filteredEmails = useMemo(() => {
    return filter === 'All' ? emails : emails.filter(e => e.category === filter);
  }, [emails, filter]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    emails.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [emails]);

  const categoryColors: Record<string, string> = {
    [Category.IMPORTANT]: '#f43f5e', // rose-500
    [Category.NEWS]: '#3b82f6',      // blue-500
    [Category.AI_TOOLS]: '#8b5cf6',   // violet-500
    [Category.LINKS]: '#10b981',     // emerald-500
    [Category.PROMPTS]: '#f59e0b',   // amber-500
    [Category.OTHER]: '#64748b'      // slate-500
  };

  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
        <div className="p-6 bg-slate-800 rounded-full animate-pulse">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-xl font-medium">No emails ingested yet</p>
        <p className="max-w-xs text-center">Click "New Ingest" to start summarizing your newsletters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Summary Section */}
      {filter === 'All' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 h-64">
            <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Content Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[entry.name] || '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider">Processing Insight</h3>
              <p className="text-white mt-2 font-light leading-relaxed">
                You've saved roughly <span className="font-bold">{(emails.length * 4.5).toFixed(0)} minutes</span> of reading time today. 
              </p>
            </div>
            <div className="flex items-center space-x-2 text-white/90 font-bold text-3xl">
              <span>{emails.length}</span>
              <span className="text-sm font-normal text-white/60">Summaries</span>
            </div>
          </div>
        </div>
      )}

      {/* Main List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          {filter === 'All' ? 'Latest Intelligence' : filter}
          <span className="text-sm font-normal text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
            {filteredEmails.length}
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEmails.map((email) => (
            <EmailCard key={email.id} email={email} />
          ))}
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No items found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
