import React from 'react';
import { ArrowDown, CheckCircle, Shield, Zap, FileText } from 'lucide-react';
import heroImg from '../assets/images/hero_resume_review_1790762081948.jpg';

interface HeroProps {
  onStartAnalysis: () => void;
  onExploreCriteria: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onExploreCriteria }) => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-subtle">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quiet metadata line without pills */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400/90 tracking-wide uppercase">
              <span>n8n Cloud Workflow Powered</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Enterprise ATS Benchmark</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Direct Form Integration</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Precision Resume Evaluation for Modern Hiring Pipelines.
            </h1>

            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
              Submit your curriculum vitae directly to our automated n8n cloud analysis engine.
              Uncover hidden parsing bottlenecks, optimize ATS keyword alignment, and benchmark your career achievements against competitive market rubrics.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartAnalysis}
                className="px-6 py-3.5 text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/15 flex items-center gap-2 cursor-pointer"
              >
                <span>Upload & Evaluate Resume</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreCriteria}
                className="px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 rounded-xl transition-colors cursor-pointer"
              >
                View Audit Criteria
              </button>
            </div>

            {/* Quantitative proof metrics */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">94.2%</div>
                <div className="text-xs text-slate-400 mt-1">ATS Parser Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">38+</div>
                <div className="text-xs text-slate-400 mt-1">Rubric Inspection Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">&lt; 3.5s</div>
                <div className="text-xs text-slate-400 mt-1">Workflow Pipeline Ingestion</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/60 group">
              
              {/* Image with fallback */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={heroImg}
                  alt="Executive resume review and ATS evaluation workspace"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Overlay card for real context */}
              <div className="p-5 border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-slate-200">Active Workflow Endpoint</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">UUID: 49b9a0ad...</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Node</span>
                    <span className="font-mono text-slate-200">n8n Form Trigger</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Expected Payload</span>
                    <span className="font-mono text-slate-200">Candidate Name, Email, File</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Delivery Status</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Ready for Submissions
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-slate-900/95 border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-xl items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Direct n8n Cloud Webhook</div>
                <div className="text-[11px] text-slate-400">Automatic schema binding</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
