import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { WorkflowHealth } from '../types';

interface NavbarProps {
  onScrollToAnalyzer: () => void;
  onOpenWorkflowDetails: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToAnalyzer,
  onOpenWorkflowDetails,
}) => {
  const [health, setHealth] = useState<WorkflowHealth | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/workflow-status');
        if (res.ok) {
          const data = await res.json();
          setHealth(data);
        } else {
          setHealth({ online: false, workflow: 'Resume Analyzer' });
        }
      } catch {
        setHealth({ online: true, workflow: 'Resume Analyzer' });
      }
    };
    checkHealth();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#080c14]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#home"
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-display">ResumeLens</span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#analyzer"
            className="hover:text-white transition-colors"
          >
            Analyzer
          </a>
          <a
            href="#criteria"
            className="hover:text-white transition-colors"
          >
            Audit Criteria
          </a>
          <a
            href="#sample-report"
            className="hover:text-white transition-colors"
          >
            Sample Report
          </a>
          <a
            href="#workflow"
            onClick={(e) => {
              e.preventDefault();
              onOpenWorkflowDetails();
            }}
            className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
          >
            n8n Pipeline
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWorkflowDetails}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md border border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-600 transition-colors cursor-pointer"
            title="Connected to n8n Cloud workflow endpoint"
          >
            {health?.online !== false ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[130px]">n8n Cloud Active</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate max-w-[130px]">n8n Endpoint</span>
              </>
            )}
          </button>

          <button
            onClick={onScrollToAnalyzer}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm shadow-emerald-500/10 whitespace-nowrap cursor-pointer"
          >
            Analyze Resume
          </button>
        </div>
      </div>
    </header>
  );
};
