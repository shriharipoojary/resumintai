import { create } from 'zustand';
import { ResumeData, FormStep, TemplateType } from './types';

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    github: '',
    website: '',
  },
  education: [],
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  template: 'minimal',
};

interface ResumeStore {
  resumeData: ResumeData;
  currentStep: FormStep;
  savedResumes: ResumeData[];
  isPreviewOpen: boolean;
  isDarkMode: boolean;
  isAiProcessing: boolean;
  
  // Actions
  setResumeData: (data: Partial<ResumeData>) => void;
  setPersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  setCurrentStep: (step: FormStep) => void;
  setTemplate: (template: TemplateType) => void;
  togglePreview: () => void;
  toggleDarkMode: () => void;
  setIsAiProcessing: (processing: boolean) => void;
  
  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  
  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  
  // Skills
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setSkills: (skills: string[]) => void;
  
  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  
  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;
  
  // Achievements
  addAchievement: () => void;
  updateAchievement: (id: string, data: Partial<ResumeData['achievements'][0]>) => void;
  removeAchievement: (id: string) => void;
  
  // Saved resumes
  saveCurrentResume: () => void;
  loadResume: (id: string) => void;
  deleteResume: (id: string) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeData: { ...defaultResumeData },
  currentStep: 'personal',
  savedResumes: [],
  isPreviewOpen: false,
  isDarkMode: false,
  isAiProcessing: false,
  
  setResumeData: (data) => set((state) => ({
    resumeData: { ...state.resumeData, ...data }
  })),
  
  setPersonalInfo: (info) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      personalInfo: { ...state.resumeData.personalInfo, ...info }
    }
  })),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setTemplate: (template) => set((state) => ({
    resumeData: { ...state.resumeData, template }
  })),
  
  togglePreview: () => set((state) => ({ isPreviewOpen: !state.isPreviewOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setIsAiProcessing: (processing) => set({ isAiProcessing: processing }),
  
  // Education
  addEducation: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: [...state.resumeData.education, {
        id: generateId(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
      }]
    }
  })),
  
  updateEducation: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu
      )
    }
  })),
  
  removeEducation: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.filter((edu) => edu.id !== id)
    }
  })),
  
  // Experience
  addExperience: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: [...state.resumeData.experience, {
        id: generateId(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        highlights: [],
      }]
    }
  })),
  
  updateExperience: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp
      )
    }
  })),
  
  removeExperience: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.filter((exp) => exp.id !== id)
    }
  })),
  
  // Skills
  addSkill: (skill) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      skills: [...state.resumeData.skills, skill]
    }
  })),
  
  removeSkill: (skill) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      skills: state.resumeData.skills.filter((s) => s !== skill)
    }
  })),
  
  setSkills: (skills) => set((state) => ({
    resumeData: { ...state.resumeData, skills }
  })),
  
  // Projects
  addProject: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: [...state.resumeData.projects, {
        id: generateId(),
        name: '',
        description: '',
        technologies: [],
        link: '',
        github: '',
      }]
    }
  })),
  
  updateProject: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: state.resumeData.projects.map((proj) =>
        proj.id === id ? { ...proj, ...data } : proj
      )
    }
  })),
  
  removeProject: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: state.resumeData.projects.filter((proj) => proj.id !== id)
    }
  })),
  
  // Certifications
  addCertification: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      certifications: [...state.resumeData.certifications, {
        id: generateId(),
        name: '',
        issuer: '',
        date: '',
        link: '',
      }]
    }
  })),
  
  updateCertification: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      certifications: state.resumeData.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...data } : cert
      )
    }
  })),
  
  removeCertification: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      certifications: state.resumeData.certifications.filter((cert) => cert.id !== id)
    }
  })),
  
  // Achievements
  addAchievement: () => set((state) => ({
    resumeData: {
      ...state.resumeData,
      achievements: [...state.resumeData.achievements, {
        id: generateId(),
        title: '',
        description: '',
        date: '',
      }]
    }
  })),
  
  updateAchievement: (id, data) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      achievements: state.resumeData.achievements.map((ach) =>
        ach.id === id ? { ...ach, ...data } : ach
      )
    }
  })),
  
  removeAchievement: (id) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      achievements: state.resumeData.achievements.filter((ach) => ach.id !== id)
    }
  })),
  
  // Saved resumes
  saveCurrentResume: () => set((state) => {
    const resume = {
      ...state.resumeData,
      id: state.resumeData.id || generateId(),
      updatedAt: new Date().toISOString(),
      createdAt: state.resumeData.createdAt || new Date().toISOString(),
    };
    const existing = state.savedResumes.findIndex((r) => r.id === resume.id);
    const savedResumes = existing >= 0
      ? state.savedResumes.map((r, i) => i === existing ? resume : r)
      : [...state.savedResumes, resume];
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
    }
    
    return { savedResumes, resumeData: resume };
  }),
  
  loadResume: (id) => set((state) => {
    const resume = state.savedResumes.find((r) => r.id === id);
    if (resume) {
      return { resumeData: resume, currentStep: 'personal' };
    }
    return state;
  }),
  
  deleteResume: (id) => set((state) => {
    const savedResumes = state.savedResumes.filter((r) => r.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
    }
    return { savedResumes };
  }),
  
  resetResume: () => set({
    resumeData: { ...defaultResumeData },
    currentStep: 'personal',
  }),
}));
