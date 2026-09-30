import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does the n8n Resume Analyzer workflow evaluate my document?',
    answer:
      'The workflow triggers via the n8n form webhook endpoint upon submission. It parses the uploaded binary document (PDF, DOCX, or TXT), converts it into structured semantic blocks, and audits it across ATS parseability standards, STAR impact metrics, and role-specific technical keywords before compiling the report.',
  },
  {
    question: 'What file formats and sizes are supported?',
    answer:
      'We support standard ATS formats including PDF (.pdf), Microsoft Word (.docx, .doc), and plain text (.txt) up to 15MB. Single-column PDF or DOCX documents with selectable text provide the highest parsing fidelity.',
  },
  {
    question: 'How are my candidate details and uploaded resume protected?',
    answer:
      'Your documents are transmitted securely to the designated n8n cloud automation instance over TLS encrypted connections. Your data is used exclusively to perform the evaluation and deliver results to your specified email address.',
  },
  {
    question: 'Can I test the workflow without having a resume file ready?',
    answer:
      'Yes! We provide an automated sample resume loader button ("Autofill Sample Engineer Resume") directly in the analyzer section so you can test end-to-end payload ingestion with one click.',
  },
  {
    question: 'What is the target ATS score for competitive technology roles?',
    answer:
      'Top-tier technology and corporate applicants generally target composite ATS readiness scores above 88/100, characterized by &gt;80% quantified bullet points and clean single-column structure without nested graphics.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#0a0f1d] border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Everything You Need to Know About the Workflow
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Answers regarding submission mechanics, parsing rules, and workflow automation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
