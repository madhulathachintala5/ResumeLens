import React from 'react';
import { X, ArrowRight, ExternalLink, Workflow, Database, Cpu, Mail, CheckCircle2 } from 'lucide-react';

interface WorkflowPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowPipelineModal: React.FC<WorkflowPipelineModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">n8n Cloud Workflow Blueprint</h3>
            <p className="text-xs text-slate-400">
              Workflow ID: 49b9a0ad-119b-46e1-a6ea-abea514a85ae
            </p>
          </div>
        </div>

        {/* Workflow Diagram Nodes */}
        <div className="space-y-4 mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Automated Node Pipeline
          </div>

          <div className="space-y-3">
            {/* Node 1 */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 font-mono text-xs shrink-0 mt-0.5">
                01
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">n8n Form Trigger Node</span>
                  <span className="text-[11px] font-mono text-orange-400">HTTP POST</span>
                </div>
                <p className="text-slate-300">
                  Accepts multipart payload: <code className="text-emerald-400 font-mono">field-0</code> (Name), <code className="text-emerald-400 font-mono">field-1</code> (Email), <code className="text-emerald-400 font-mono">field-2</code> (Resume Binary).
                </p>
              </div>
            </div>

            {/* Node 2 */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-xs shrink-0 mt-0.5">
                02
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">Document Extraction & Cleaning</span>
                  <span className="text-[11px] font-mono text-blue-400">Binary Node</span>
                </div>
                <p className="text-slate-300">
                  Extracts raw text strings from PDF/DOCX buffers, strips formatting noise, and extracts semantic sections (Summary, Skills, Work History, Education).
                </p>
              </div>
            </div>

            {/* Node 3 */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-xs shrink-0 mt-0.5">
                03
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">AI Evaluation & Rubric Engine</span>
                  <span className="text-[11px] font-mono text-purple-400">LLM Chain</span>
                </div>
                <p className="text-slate-300">
                  Scores document against ATS parseability, STAR formula impact, role keywords, and provides concrete recommendations for each role.
                </p>
              </div>
            </div>

            {/* Node 4 */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs shrink-0 mt-0.5">
                04
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">Delivery & Dispatch</span>
                  <span className="text-[11px] font-mono text-emerald-400">Email / Webhook</span>
                </div>
                <p className="text-slate-300">
                  Dispatches tailored evaluation summary directly to the candidate's inbox and acknowledges receipt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Endpoint Link */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="overflow-hidden">
            <span className="text-slate-400 block mb-0.5">Cloud Endpoint Target:</span>
            <span className="font-mono text-emerald-300 truncate block">
              https://madhulathachintala5.app.n8n.cloud/form/...
            </span>
          </div>
          <a
            href="https://madhulathachintala5.app.n8n.cloud/form/49b9a0ad-119b-46e1-a6ea-abea514a85ae"
            target="_blank"
            rel="noreferrer noopener"
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1.5 transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <span>Open in n8n Cloud</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            Close Pipeline View
          </button>
        </div>

      </div>
    </div>
  );
};
