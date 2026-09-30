import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenWorkflowDetails: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onOpenWorkflowDetails }) => {
  return (
    <footer className="bg-[#05080e] border-t border-slate-900 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Summary */}
          <div className="md:col-span-2 space-y-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onScrollToTop();
              }}
              className="text-base font-bold text-white tracking-tight flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>ResumeLens</span>
            </a>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Automated career document analysis and applicant tracking system (ATS) optimization powered by dedicated n8n cloud workflows.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Workflow Form: 49b9a0ad-119b-46e1-a6ea-abea514a85ae
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Platform Navigation
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="#analyzer" className="hover:text-emerald-400 transition-colors">
                  Resume Analyzer
                </a>
              </li>
              <li>
                <a href="#criteria" className="hover:text-emerald-400 transition-colors">
                  Audit Criteria
                </a>
              </li>
              <li>
                <a href="#sample-report" className="hover:text-emerald-400 transition-colors">
                  Sample Report
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenWorkflowDetails}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  n8n Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* External Integrations */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Workflow Automation
            </div>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://madhulathachintala5.app.n8n.cloud/form/49b9a0ad-119b-46e1-a6ea-abea514a85ae"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>n8n Cloud Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">Multipart Payload: field-0, field-1, field-2</span>
              </li>
              <li>
                <span className="text-slate-500">Node Status: Active Production</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} ResumeLens. Automated Workflow Engine. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#home" onClick={onScrollToTop} className="hover:text-slate-400 transition-colors">
              Back to Top
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
