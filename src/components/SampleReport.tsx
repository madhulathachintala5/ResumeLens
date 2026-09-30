import React, { useState } from 'react';
import { CheckCircle2, XCircle, TrendingUp, Sparkles, Award, FileText } from 'lucide-react';
import successImg from '../assets/images/feature_career_success_1790762113846.jpg';

export const SampleReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  return (
    <section id="sample-report" className="py-20 bg-[#080c14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
              Interactive Benchmark
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sample Evaluation Output & ATS Scorecard
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Inspect how the n8n analysis engine assesses candidate resumes, identifies critical failure modes, and prescribes actionable bullet rewrites.
            </p>
          </div>

          {/* Interactive Tab Selector (buttons, allowed per design constitution) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('after')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'after'
                  ? 'bg-emerald-400 text-slate-900 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Optimized Result (Score: 94)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('before')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'before'
                  ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Unoptimized Draft (Score: 61)
            </button>
          </div>
        </div>

        {/* Audit Report Container */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Top Score Bar */}
          <div className="p-6 sm:p-8 bg-slate-950/70 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            
            {/* Overall Composite Score */}
            <div className="lg:col-span-2 flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-bold text-2xl border ${
                  activeTab === 'after'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
              >
                {activeTab === 'after' ? '94' : '61'}
                <span className="text-xs text-slate-400">/100</span>
              </div>
              <div>
                <div className="text-xs text-slate-400">Composite Readiness</div>
                <div className="text-base font-bold text-white">
                  {activeTab === 'after' ? 'Top Tier (Interview Ready)' : 'Needs Revision (Filtered by ATS)'}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Candidate: Alexander Vance · Lead Architect
                </div>
              </div>
            </div>

            {/* Metric 1 */}
            <div className="border-l border-slate-800/80 pl-4">
              <div className="text-xs text-slate-400">ATS Parseability</div>
              <div className="text-lg font-bold font-mono text-white tabular-nums">
                {activeTab === 'after' ? '98%' : '52%'}
              </div>
              <div className={`text-[11px] mt-0.5 ${activeTab === 'after' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activeTab === 'after' ? 'Standard Single Column' : 'Multi-column column bleed'}
              </div>
            </div>

            {/* Metric 2 */}
            <div className="border-l border-slate-800/80 pl-4">
              <div className="text-xs text-slate-400">Quantified Impact</div>
              <div className="text-lg font-bold font-mono text-white tabular-nums">
                {activeTab === 'after' ? '92%' : '44%'}
              </div>
              <div className={`text-[11px] mt-0.5 ${activeTab === 'after' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activeTab === 'after' ? 'XYZ Formula in 85% bullets' : 'Passive duties only'}
              </div>
            </div>

            {/* Metric 3 */}
            <div className="border-l border-slate-800/80 pl-4">
              <div className="text-xs text-slate-400">Keyword Density</div>
              <div className="text-lg font-bold font-mono text-white tabular-nums">
                {activeTab === 'after' ? '96%' : '67%'}
              </div>
              <div className={`text-[11px] mt-0.5 ${activeTab === 'after' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeTab === 'after' ? '18 Target Competencies' : 'Generic skills missing'}
              </div>
            </div>

          </div>

          {/* Deep-Dive Analysis Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Bullet Point Transformations */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {activeTab === 'after' ? 'Optimized Work History (High Impact)' : 'Original Draft (Unquantified)'}
              </h3>

              <div className="space-y-4">
                {activeTab === 'after' ? (
                  <>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-400">Architectural Leadership</span>
                        <span className="text-slate-400 font-mono">CloudScale Technologies</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        "Directed engineering team of 11 building high-throughput event processing platform processing 12,000 req/sec, reducing compute overhead by 34% ($1.8M annual savings)."
                      </p>
                      <div className="text-[11px] text-emerald-300/80 flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Contains team scope (11), load metric (12k req/s), and dollar outcome ($1.8M).</span>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-400">CI/CD & Velocity</span>
                        <span className="text-slate-400 font-mono">CloudScale Technologies</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        "Architected automated continuous deployment pipelines using Docker and Kubernetes, reducing production cycle time from 4 days to 18 minutes."
                      </p>
                      <div className="text-[11px] text-emerald-300/80 flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Clear baseline vs improvement comparison (4 days down to 18 minutes).</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-rose-400">Passive Task Description</span>
                        <span className="text-slate-400 font-mono">Original Line</span>
                      </div>
                      <p className="text-xs text-slate-400 line-through leading-relaxed">
                        "Responsible for managing developers and working on cloud architecture and helping reduce server costs."
                      </p>
                      <div className="text-[11px] text-rose-300/80 flex items-center gap-1.5 pt-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Flaws: 'Responsible for', zero quantifiable numbers, zero technologies specified.</span>
                      </div>
                    </div>

                    <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-rose-400">Vague Operational Duty</span>
                        <span className="text-slate-400 font-mono">Original Line</span>
                      </div>
                      <p className="text-xs text-slate-400 line-through leading-relaxed">
                        "Helped with deployments and improved build pipeline speed."
                      </p>
                      <div className="text-[11px] text-rose-300/80 flex items-center gap-1.5 pt-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Flaws: 'Helped with' weakens ownership; no metrics showing how much speed improved.</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Visual Case Snapshot */}
            <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-slate-900 border border-slate-800">
                  <img
                    src={successImg}
                    alt="Career progression and interview readiness"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Candidate Outcome Benchmark
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Candidates submitting resumes with scores &gt; 90 achieved a <strong className="text-white">3.4x interview callback rate</strong> compared to unoptimized submissions across tier-1 technology and finance companies.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Verification Source:</span>
                <span className="text-emerald-400 font-medium">n8n Execution Batch 2026</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
