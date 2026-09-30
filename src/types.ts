export interface CandidateSubmission {
  name: string;
  email: string;
  file: File | null;
  targetRole?: string;
  experienceLevel?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
  candidateName?: string;
  candidateEmail?: string;
  fileName?: string;
  fileSize?: number;
  timestamp?: string;
  n8nData?: any;
}

export interface WorkflowHealth {
  online: boolean;
  workflow: string;
  latencyMs?: number;
  status?: number;
  error?: string;
}

export interface ATSCheckItem {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  importance: 'critical' | 'recommended' | 'optional';
}

export interface SampleReportData {
  candidateName: string;
  targetTitle: string;
  overallScore: number;
  breakdown: {
    parseability: number;
    impactVerbs: number;
    keywordDensity: number;
    structuralClarity: number;
  };
  strengths: string[];
  improvements: string[];
}
