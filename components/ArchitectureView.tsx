
import React from 'react';
import { ArchitectureComponent } from '../types';

interface ArchitectureViewProps {
  architecture: ArchitectureComponent[];
}

const ArchitectureView: React.FC<ArchitectureViewProps> = ({ architecture }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-white tracking-tight">System Blueprint</h2>
        <p className="text-slate-500 max-w-xl mx-auto">A multi-layered architecture designed for low-latency extraction and semantic distillation of high-volume email data.</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-slate-700 to-transparent z-0" />

        <div className="space-y-12">
          {architecture.map((item, i) => (
            <div key={i} className="relative z-10 flex gap-8 group">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-black text-xl text-indigo-400 group-hover:border-indigo-500/50 transition-colors shadow-xl">
                0{i + 1}
              </div>
              
              <div className="flex-1 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">{item.layer}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{item.name}</h3>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-slate-900/50 text-slate-300 text-[10px] font-mono border border-slate-700 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual Data Flow Diagram Description as per user request */}
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Data Lifecycle & Lifecycle Diagram Description
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-400">
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <p className="font-bold text-white mb-2">1. Ingestion Phase</p>
              Users provide raw content or trigger API sync. Metadata (timestamps, headers) is prioritized for initial indexing.
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <p className="font-bold text-white mb-2">2. Intelligence Contextualization</p>
              Gemini 3 processes the payload. It separates signal (news, tools) from noise (marketing, boilerplate) using a specialized response schema.
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <p className="font-bold text-white mb-2">3. Structural Mapping</p>
              The JSON output is typed and mapped to Category enums. URLs are validated and extracted for high-priority display.
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <p className="font-bold text-white mb-2">4. User Delivery</p>
              Reactive state updates trigger a re-render of the Dashboard. Filters provide instantaneous drilling into specific knowledge domains.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
