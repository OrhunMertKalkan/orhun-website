export interface ResumeData {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    location: {
      city: string;
      country: string;
    };
    summary: string;
    profiles: Array<{
      network: string;
      username?: string;
      url: string;
    }>;
  };
  skills: Array<{
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    keywords?: string[];
  }>;
  languages: Array<{
    language: string;
    fluency: string;
  }>;
  work: Array<{
    name: string;
    position: string;
    startDate: string;
    endDate?: string;
    location?: string;
    summary: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    url?: string;
    keywords: string[];
    highlights: string[];
  }>;
  certificates: Array<{
    name: string;
    date: string;
    issuer?: string;
  }>;
}

export async function getResumeData(): Promise<ResumeData> {
  const resumeData = await import('../data/resume.json');
  return resumeData.default as ResumeData;
}
