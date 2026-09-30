import React from 'react';
import { Check, Layers, BarChart3, Target, Type } from 'lucide-react';
import atsReviewImg from '../assets/images/feature_ats_review_1790762096276.jpg';

export const EvaluationCriteria: React.FC = () => {
  return (
    <section id="criteria" className="py-20 bg-[#0a0f1d] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Automated Audit Rubric
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Four Pillars of Executive Resume Analysis
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Every submission through the n8n pipeline undergoes systematic validation across critical recruitment filters, from automated parsing algorithms to hiring manager impression benchmarks.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: Large Feature Card (Col span 7) */}
          <div className="md:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400">01. Parsing Hygiene</span>
                <span className="text-xs text-slate-500 font-mono tabular-nums">Weight: 30%</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                ATS Machine Parseability & Hierarchy
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Over 75% of candidate resumes are filtered before human review due to unparseable tables, multi-column text wrap issues, or non-standard section headers. The workflow validates clean text extraction and standard semantic structures.
              </p>
              
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standardized section titles (Work History, Core Competencies, Education)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clean text encoding without trapped graphics or canvas layers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full contact telemetry extraction (Name, Email, City, Portfolio, Phone)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Standard: Greenhouse, Lever, Workday parsing models</span>
              <span className="text-emerald-400 font-medium font-mono tabular-nums">99.1% Ingestion Goal</span>
            </div>
          </div>

          {/* Bento Item 2: Visual Card (Col span 5) */}
          <div className="md:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group">
            <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950">
              <img
                src={atsReviewImg}
                alt="Document audit and hiring rubric review"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 block mb-1">02. Quantified Results</span>
                <h3 className="text-lg font-bold text-white mb-2">
                  Impact Metrics & STAR Action Verbs
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates bullet points against the Google XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]". Flags passive descriptions and assigns numerical weight to business impact.
                </p>
              </div>
              <div className="mt-4 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Metric Frequency:</span>
                <span className="text-white font-semibold">Min. 1 metric / 2 bullet points</span>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Col span 6 */}
          <div className="md:col-span-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-7 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400">03. Semantic Density</span>
              <span className="text-xs text-slate-500 font-mono tabular-nums">Weight: 25%</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Domain Keyword & Taxonomy Alignment
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              Measures relevant terminology density without triggering keyword-stuffing penalties. Matches domain tools, methodologies, and framework nomenclature against target role requirements.
            </p>
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Technical Toolset Depth:</span>
                <span className="text-emerald-300 font-mono">Matched & Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Acronym Standard Formats:</span>
                <span className="text-emerald-300 font-mono">AWS, CI/CD, SOC2, REST</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Repetition Index:</span>
                <span className="text-emerald-300 font-mono">&lt; 3.2% (Natural cadence)</span>
              </div>
            </div>
          </div>

          {/* Bento Item 4: Col span 6 */}
          <div className="md:col-span-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-7 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400">04. Typographic Hygiene</span>
              <span className="text-xs text-slate-500 font-mono tabular-nums">Weight: 20%</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Brevity, Layout & Skimmability Index
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              Recruiters average 6 to 8 seconds on initial CV inspection. The workflow audits bullet length, visual density, page pacing, and ensures your strongest wins appear in the primary scanning quadrant.
            </p>
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Optimal Bullet Length:</span>
                <span className="text-emerald-300 font-mono">1–2 lines (60–120 characters)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Chronological Pacing:</span>
                <span className="text-emerald-300 font-mono">Reverse Chronological</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Visual Clutter Flags:</span>
                <span className="text-emerald-300 font-mono">Zero unreadable graphics</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
