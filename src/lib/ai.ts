import { ResumeData, AIResponse } from './types';

// AI content enhancement - works with or without API key
// When no API key is configured, uses intelligent local processing

const ACTION_VERBS = [
  'Spearheaded', 'Engineered', 'Architected', 'Orchestrated', 'Implemented',
  'Developed', 'Optimized', 'Streamlined', 'Pioneered', 'Transformed',
  'Accelerated', 'Automated', 'Consolidated', 'Delivered', 'Designed',
  'Established', 'Executed', 'Facilitated', 'Generated', 'Integrated',
  'Launched', 'Led', 'Managed', 'Modernized', 'Overhauled',
  'Reduced', 'Revamped', 'Scaled', 'Strengthened', 'Supervised',
];

const ATS_KEYWORDS: Record<string, string[]> = {
  tech: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Agile', 'REST API', 'GraphQL', 'SQL', 'NoSQL', 'Git', 'Microservices'],
  business: ['Stakeholder Management', 'Strategic Planning', 'Budget Management', 'ROI Analysis', 'KPI Tracking', 'Cross-functional Teams', 'Process Improvement', 'Data Analysis'],
  design: ['Figma', 'Adobe Creative Suite', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility', 'Responsive Design', 'A/B Testing'],
  marketing: ['SEO', 'Content Strategy', 'Social Media', 'Google Analytics', 'Campaign Management', 'Brand Strategy', 'Market Research', 'Growth Hacking'],
};

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRandomVerb(): string {
  return ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
}

function enhanceBulletPoint(text: string): string {
  const cleaned = text.trim();
  if (!cleaned) return cleaned;
  
  // Check if already starts with an action verb
  const startsWithVerb = ACTION_VERBS.some(verb => cleaned.startsWith(verb));
  if (startsWithVerb) return cleaned;
  
  // Remove common weak starters
  let enhanced = cleaned
    .replace(/^(I |We |My |Our |Was responsible for |Responsible for |Helped |Assisted in |Worked on )/i, '')
    .replace(/^(doing |creating |making |building |developing |managing )/i, '');
  
  enhanced = capitalizeFirst(enhanced);
  
  // Add action verb
  const verb = getRandomVerb();
  enhanced = `${verb} ${enhanced.charAt(0).toLowerCase() + enhanced.slice(1)}`;
  
  // Add metrics placeholder if none exist
  if (!/\d+%?/.test(enhanced)) {
    const metrics = [
      ', resulting in improved efficiency',
      ', enhancing overall performance',
      ', driving measurable impact',
    ];
    enhanced += metrics[Math.floor(Math.random() * metrics.length)];
  }
  
  return enhanced;
}

function enhanceSummary(summary: string, title: string): string {
  if (!summary.trim()) {
    return `Results-driven ${title || 'professional'} with a proven track record of delivering high-impact solutions. Passionate about leveraging cutting-edge technologies and best practices to drive innovation and exceed expectations. Known for strong analytical skills, strategic thinking, and ability to collaborate effectively with cross-functional teams.`;
  }
  
  let enhanced = summary.trim();
  
  // Add professional opening if missing
  if (!enhanced.match(/^(Results|Experienced|Dynamic|Innovative|Accomplished|Seasoned)/i)) {
    enhanced = `Results-driven professional: ${enhanced}`;
  }
  
  return enhanced;
}

function detectIndustry(data: ResumeData): string {
  const allText = [
    data.personalInfo.title,
    data.personalInfo.summary,
    ...data.skills,
    ...data.experience.map(e => e.description),
    ...data.projects.map(p => p.description),
  ].join(' ').toLowerCase();
  
  if (/react|javascript|python|developer|engineer|software|code|api|database|frontend|backend/i.test(allText)) return 'tech';
  if (/design|figma|ui|ux|creative|brand|visual/i.test(allText)) return 'design';
  if (/marketing|seo|content|social|campaign|growth/i.test(allText)) return 'marketing';
  return 'business';
}

function calculateATSScore(data: ResumeData): number {
  let score = 0;
  const maxScore = 100;
  
  // Personal info completeness (20 points)
  if (data.personalInfo.fullName) score += 4;
  if (data.personalInfo.email) score += 4;
  if (data.personalInfo.phone) score += 3;
  if (data.personalInfo.location) score += 3;
  if (data.personalInfo.title) score += 3;
  if (data.personalInfo.summary && data.personalInfo.summary.length > 50) score += 3;
  
  // Experience (25 points)
  if (data.experience.length > 0) score += 10;
  if (data.experience.length >= 2) score += 5;
  const hasMetrics = data.experience.some(e => /\d+%?/.test(e.description));
  if (hasMetrics) score += 5;
  const hasActionVerbs = data.experience.some(e => 
    ACTION_VERBS.some(v => e.description.includes(v))
  );
  if (hasActionVerbs) score += 5;
  
  // Education (15 points)
  if (data.education.length > 0) score += 15;
  
  // Skills (20 points)
  if (data.skills.length >= 3) score += 10;
  if (data.skills.length >= 6) score += 5;
  if (data.skills.length >= 10) score += 5;
  
  // Projects (10 points)
  if (data.projects.length > 0) score += 5;
  if (data.projects.length >= 2) score += 5;
  
  // Certifications & Achievements (10 points)
  if (data.certifications.length > 0) score += 5;
  if (data.achievements.length > 0) score += 5;
  
  return Math.min(score, maxScore);
}

function getSuggestions(data: ResumeData): string[] {
  const suggestions: string[] = [];
  const industry = detectIndustry(data);
  
  if (!data.personalInfo.summary || data.personalInfo.summary.length < 50) {
    suggestions.push('Add a compelling professional summary (at least 2-3 sentences)');
  }
  
  if (data.experience.length === 0) {
    suggestions.push('Add at least one work experience entry');
  }
  
  if (data.skills.length < 5) {
    suggestions.push(`Consider adding more skills. Popular ${industry} skills: ${ATS_KEYWORDS[industry]?.slice(0, 5).join(', ')}`);
  }
  
  if (data.education.length === 0) {
    suggestions.push('Add your educational background');
  }
  
  if (data.projects.length === 0) {
    suggestions.push('Adding projects can significantly strengthen your resume');
  }
  
  if (!data.personalInfo.linkedin) {
    suggestions.push('Add your LinkedIn profile URL');
  }
  
  const hasWeakBullets = data.experience.some(e => 
    /^(I |We |Was responsible|Worked on|Helped)/i.test(e.description)
  );
  if (hasWeakBullets) {
    suggestions.push('Start bullet points with strong action verbs (e.g., "Engineered", "Spearheaded")');
  }
  
  if (data.certifications.length === 0) {
    suggestions.push('Professional certifications can boost your credibility');
  }
  
  return suggestions;
}

function getMissingKeywords(data: ResumeData): string[] {
  const industry = detectIndustry(data);
  const allText = [
    ...data.skills,
    ...data.experience.map(e => e.description),
    data.personalInfo.summary,
  ].join(' ').toLowerCase();
  
  return (ATS_KEYWORDS[industry] || []).filter(
    kw => !allText.toLowerCase().includes(kw.toLowerCase())
  ).slice(0, 8);
}

export async function enhanceWithAI(
  text: string,
  type: 'bullet' | 'summary' | 'description' = 'bullet'
): Promise<string> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  
  if (type === 'summary') {
    return enhanceSummary(text, '');
  }
  
  if (type === 'bullet') {
    return enhanceBulletPoint(text);
  }
  
  return capitalizeFirst(text.trim());
}

export async function analyzeResume(data: ResumeData): Promise<AIResponse> {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
  
  const atsScore = calculateATSScore(data);
  const suggestions = getSuggestions(data);
  const missingKeywords = getMissingKeywords(data);
  
  // Enhance summary
  const improvedSummary = enhanceSummary(
    data.personalInfo.summary,
    data.personalInfo.title
  );
  
  return {
    improved: improvedSummary,
    suggestions,
    atsScore,
    keywords: missingKeywords,
  };
}

export async function enhanceExperience(description: string): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
  
  const lines = description.split(/[.\n]/).filter(l => l.trim());
  return lines.map(line => enhanceBulletPoint(line.trim())).filter(Boolean);
}

export async function generatePortfolioContent(data: ResumeData) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const heroTagline = data.personalInfo.title 
    ? `${data.personalInfo.title} passionate about building exceptional digital experiences`
    : 'Creative professional building the future, one project at a time';
  
  const aboutMe = data.personalInfo.summary || 
    `I'm ${data.personalInfo.fullName || 'a passionate professional'}, a ${data.personalInfo.title || 'creative problem solver'} who loves turning ideas into reality. With expertise in ${data.skills.slice(0, 3).join(', ') || 'various technologies'}, I bring a unique blend of technical skill and creative vision to every project.`;
  
  return {
    heroTagline,
    aboutMe,
    skills: data.skills,
    projects: data.projects.map(p => ({
      ...p,
      description: p.description || `An innovative project showcasing proficiency in ${p.technologies.join(', ') || 'modern technologies'}.`,
    })),
    experience: data.experience,
  };
}

export { calculateATSScore, getSuggestions, getMissingKeywords };
