import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { SubmissionResponse } from '../types';

export const ResumeAnalyzerForm: React.FC = () => {
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStage, setSubmissionStage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<SubmissionResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate form fields
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidateEmail);
  const isFormValid = candidateName.trim().length >= 2 && isEmailValid && selectedFile !== null;

  // Handle file drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMsg(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    // Check file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('File exceeds 15MB limit. Please upload a smaller document.');
      return;
    }

    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const fileNameLower = file.name.toLowerCase();
    const hasValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));

    if (!hasValidExt) {
      setErrorMsg('Please upload a PDF (.pdf), Word Document (.docx), or Text file (.txt).');
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Quick sample resume loader for immediate testing
  const loadSampleResume = () => {
    const sampleContent = `
========================================
ALEXANDER VANCE
Senior Full-Stack & Cloud Systems Architect
Email: alexander.vance.tech@example.com | Phone: (555) 019-2834
GitHub: github.com/alexvance | LinkedIn: linkedin.com/in/alexandervance
San Francisco, CA

SUMMARY
Strategic Senior Full-Stack Engineer with 8+ years architecting scalable cloud platforms, distributed microservices, and high-conversion frontend systems. Spearheaded architecture supporting 4.5M+ active users, cutting latency by 42% and generating $1.8M annual infrastructure savings.

CORE TECHNICAL SKILLS
- Languages: TypeScript, JavaScript, Python, Go, SQL
- Frontend: React 19, Next.js, Vue, Tailwind CSS, WebSockets
- Backend: Node.js, Express, FastAPI, PostgreSQL, Redis, GraphQL
- Cloud & DevOps: AWS (ECS, Lambda, S3, CloudFront), Docker, Kubernetes, CI/CD pipelines, n8n Automation
- Practices: System Architecture, Test-Driven Development, SOC2 Security, Agile Scrum

PROFESSIONAL EXPERIENCE

Lead Systems Architect | CloudScale Technologies
Jan 2022 - Present | San Francisco, CA
- Directed engineering team of 11 building high-throughput event processing platform processing 12,000 requests/second.
- Migrated legacy monolithic architecture to distributed microservices, improving uptime to 99.98% and trimming compute costs by 34%.
- Integrated automated continuous delivery pipelines, reducing deployment cycle time from 4 days to 18 minutes.
- Mentored 6 junior and mid-level software engineers, driving code review standards and engineering velocity.

Senior Software Engineer | Apex Digital Solutions
Aug 2018 - Dec 2021 | Austin, TX
- Developed customer-facing React SPA analytics dashboard utilized by 65,000+ enterprise clients.
- Optimized client-side bundle size by 54% and decreased Largest Contentful Paint (LCP) from 3.2s to 0.8s.
- Authored 120+ unit and integration tests achieving 89% code coverage.

EDUCATION
B.S. in Computer Science | University of California, Berkeley
Graduated with Honors (Magna Cum Laude)
========================================
    `.trim();

    const blob = new Blob([sampleContent], { type: 'text/plain' });
    const file = new File([blob], 'Alexander_Vance_Senior_Architect_Resume.txt', { type: 'text/plain' });
    setSelectedFile(file);
    setCandidateName('Alexander Vance');
    setCandidateEmail('alexander.vance.tech@example.com');
    setTargetRole('Lead Systems Architect');
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedFile) {
      setErrorMsg('Please complete all required fields and upload your resume.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSubmissionStage('Validating document format and payload...');

    try {
      const formData = new FormData();
      formData.append('name', candidateName.trim());
      formData.append('email', candidateEmail.trim());
      formData.append('resume', selectedFile);
      formData.append('field-0', candidateName.trim());
      formData.append('field-1', candidateEmail.trim());

      setSubmissionStage('Connecting to n8n Cloud Webhook...');

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData,
      });

      setSubmissionStage('Processing workflow response...');
      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessResult({
          success: true,
          candidateName: candidateName.trim(),
          candidateEmail: candidateEmail.trim(),
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          message: 'Resume received by n8n workflow successfully.',
          n8nData: result.n8nData,
        });
      } else {
        // Fallback: If local proxy had an issue, attempt direct submission to n8n
        try {
          const directFormData = new FormData();
          directFormData.append('field-0', candidateName.trim());
          directFormData.append('field-1', candidateEmail.trim());
          directFormData.append('field-2', selectedFile);

          const directResp = await fetch('https://madhulathachintala5.app.n8n.cloud/form/49b9a0ad-119b-46e1-a6ea-abea514a85ae', {
            method: 'POST',
            body: directFormData,
          });

          if (directResp.ok) {
            setSuccessResult({
              success: true,
              candidateName: candidateName.trim(),
              candidateEmail: candidateEmail.trim(),
              fileName: selectedFile.name,
              fileSize: selectedFile.size,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              message: 'Submitted directly to n8n cloud form.',
            });
            return;
          }
        } catch {
          // keep original error
        }

        setErrorMsg(result.error || 'Failed to submit resume to the n8n workflow. Please try again.');
      }
    } catch (err) {
      // In case server proxy failed or network issue, try direct submission fallback
      try {
        const directFormData = new FormData();
        directFormData.append('field-0', candidateName.trim());
        directFormData.append('field-1', candidateEmail.trim());
        directFormData.append('field-2', selectedFile);

        const directResp = await fetch('https://madhulathachintala5.app.n8n.cloud/form/49b9a0ad-119b-46e1-a6ea-abea514a85ae', {
          method: 'POST',
          body: directFormData,
        });

        if (directResp.ok) {
          setSuccessResult({
            success: true,
            candidateName: candidateName.trim(),
            candidateEmail: candidateEmail.trim(),
            fileName: selectedFile.name,
            fileSize: selectedFile.size,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            message: 'Direct workflow trigger succeeded.',
          });
          return;
        }
      } catch {
        // Fallback also failed
      }

      setErrorMsg(err instanceof Error ? err.message : 'Network error communicating with the workflow.');
    } finally {
      setIsSubmitting(false);
      setSubmissionStage('');
    }
  };

  const resetForm = () => {
    setSuccessResult(null);
    setSelectedFile(null);
    setCandidateName('');
    setCandidateEmail('');
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <section id="analyzer" className="py-16 md:py-24 bg-[#080c14] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            <span>Workflow Ingestion Portal</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>n8n Cloud Trigger</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Submit Your Resume for Comprehensive Analysis
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Provide your candidate details and upload your document. Our n8n workflow executes automated parsing, ATS keyword alignment, and metric density evaluation.
          </p>
        </div>

        {/* Primary Interactive Workbench */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 backdrop-blur-sm">
          
          {/* SUCCESS SCREEN */}
          {successResult ? (
            <div className="py-6 space-y-8 animate-fadeIn">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Resume Dispatched to Workflow!
                </h3>
                <p className="text-sm text-slate-300">
                  Your resume has been transmitted to the n8n cloud automation pipeline (<span className="font-mono text-emerald-400 text-xs">form/49b9a0ad...</span>).
                </p>
              </div>

              {/* Receipt metadata card */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto space-y-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Submission Manifest
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Candidate Name:</span>
                    <span className="font-semibold text-white text-sm">{successResult.candidateName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Candidate Email:</span>
                    <span className="font-semibold text-white text-sm">{successResult.candidateEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Uploaded File:</span>
                    <span className="font-mono text-emerald-300">{successResult.fileName}</span>
                    <span className="text-slate-500 ml-2">({formatFileSize(successResult.fileSize || 0)})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Dispatched At:</span>
                    <span className="font-mono text-slate-300 tabular-nums">{successResult.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* What happens next roadmap */}
              <div className="max-w-2xl mx-auto bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Workflow Execution Stages:
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white">Document Ingestion:</strong> n8n extracts raw text layers, cleans formatting artifacts, and standardizes document headers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white">ATS Scoring Rubric:</strong> Compares experience bullet points against industry-grade action verb density, measurable numbers, and job role keywords.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white">Direct Feedback Dispatch:</strong> The workflow compiles the evaluation notes and routes the detailed recommendations to your inbox at <span className="text-emerald-300 font-mono">{successResult.candidateEmail}</span>.
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Analyze Another Resume</span>
                </button>
                <a
                  href="https://madhulathachintala5.app.n8n.cloud/form/49b9a0ad-119b-46e1-a6ea-abea514a85ae"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>View Original n8n Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Demo Sample Helper Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Want to test the n8n pipeline immediately?</span>
                </div>
                <button
                  type="button"
                  onClick={loadSampleResume}
                  className="px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Autofill Sample Engineer Resume
                </button>
              </div>

              {/* Step 1: Upload Resume */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <span>1. Upload Resume Document</span>
                    <span className="text-emerald-400 text-xs font-normal">(Required)</span>
                  </label>
                  <span className="text-xs text-slate-400">PDF, DOCX, TXT (Max 15MB)</span>
                </div>

                {!selectedFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-emerald-400 bg-emerald-500/5 scale-[1.01]'
                        : 'border-slate-700/80 hover:border-slate-600 bg-slate-950/40 hover:bg-slate-950/70'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="resume-file"
                      name="field-2"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-emerald-400 mb-4">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-slate-200">
                      Drag and drop your resume here, or <span className="text-emerald-400 underline underline-offset-2">browse files</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Compatible with standard Applicant Tracking Systems (ATS) formats.
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-semibold text-white truncate">
                          {selectedFile.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {formatFileSize(selectedFile.size)} · Ready for n8n ingestion
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Step 2: Candidate Details */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-200 block">
                  2. Candidate Profile Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input (field-0) */}
                  <div className="space-y-1.5">
                    <label htmlFor="field-0" className="text-xs font-medium text-slate-300 flex items-center justify-between">
                      <span>Full Name <span className="text-emerald-400">*</span></span>
                      <span className="text-[11px] text-slate-400 font-mono">field-0</span>
                    </label>
                    <input
                      id="field-0"
                      name="field-0"
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Email Input (field-1) */}
                  <div className="space-y-1.5">
                    <label htmlFor="field-1" className="text-xs font-medium text-slate-300 flex items-center justify-between">
                      <span>Email Address <span className="text-emerald-400">*</span></span>
                      <span className="text-[11px] text-slate-400 font-mono">field-1</span>
                    </label>
                    <input
                      id="field-1"
                      name="field-1"
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="e.g. sarah.connor@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Optional Target Role */}
                <div className="space-y-1.5">
                  <label htmlFor="target-role" className="text-xs font-medium text-slate-300 flex items-center justify-between">
                    <span>Target Job Title / Domain (Benchmark alignment)</span>
                    <span className="text-[11px] text-slate-400">Contextual rubric</span>
                  </label>
                  <input
                    id="target-role"
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Backend Engineer, Product Lead, Data Scientist"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  />
                </div>
              </div>

              {/* Pre-Flight Checklist */}
              <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-2.5 text-xs">
                <div className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                  Pre-Submission Hygiene Checks:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2">
                    {selectedFile ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className={selectedFile ? 'text-slate-200' : 'text-slate-400'}>
                      Resume Document Attached
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {candidateName.trim().length >= 2 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className={candidateName.trim().length >= 2 ? 'text-slate-200' : 'text-slate-400'}>
                      Valid Candidate Name
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEmailValid ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className={isEmailValid ? 'text-slate-200' : 'text-slate-400'}>
                      Verified Email Format
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="flex-1">{errorMsg}</span>
                </div>
              )}

              {/* Submission Controls */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Secure automated pipeline. Documents are not publicly indexed.</span>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isFormValid && !isSubmitting
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-900 shadow-emerald-500/15'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                      <span>{submissionStage || 'Submitting to Workflow...'}</span>
                    </>
                  ) : (
                    <>
                      <span>Execute Workflow Analysis</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
