/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeAnalyzerForm } from './components/ResumeAnalyzerForm';
import { EvaluationCriteria } from './components/EvaluationCriteria';
import { SampleReport } from './components/SampleReport';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WorkflowPipelineModal } from './components/WorkflowPipelineModal';

export default function App() {
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

  const scrollToAnalyzer = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCriteria = () => {
    const el = document.getElementById('criteria');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Navigation */}
      <Navbar
        onScrollToAnalyzer={scrollToAnalyzer}
        onOpenWorkflowDetails={() => setIsWorkflowModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartAnalysis={scrollToAnalyzer}
          onExploreCriteria={scrollToCriteria}
        />

        {/* Core Interactive Resume Analyzer (n8n Integration) */}
        <ResumeAnalyzerForm />

        {/* 4 Pillars Audit Criteria */}
        <EvaluationCriteria />

        {/* Interactive Sample Report Benchmark */}
        <SampleReport />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={scrollToTop}
        onOpenWorkflowDetails={() => setIsWorkflowModalOpen(true)}
      />

      {/* Workflow Pipeline Architecture Modal */}
      <WorkflowPipelineModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
      />
    </div>
  );
}
