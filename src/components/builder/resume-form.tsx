'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '@/lib/store';
import { FORM_STEPS, FormStep } from '@/lib/types';
import { enhanceWithAI, enhanceExperience } from '@/lib/ai';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function ResumeForm() {
  const store = useResumeStore();
  const { resumeData, currentStep, setCurrentStep, setPersonalInfo, isAiProcessing, setIsAiProcessing } = store;
  const [skillInput, setSkillInput] = useState('');

  const currentStepIndex = FORM_STEPS.findIndex(s => s.key === currentStep);

  const goNext = () => {
    const nextIndex = Math.min(currentStepIndex + 1, FORM_STEPS.length - 1);
    setCurrentStep(FORM_STEPS[nextIndex].key);
  };

  const goPrev = () => {
    const prevIndex = Math.max(currentStepIndex - 1, 0);
    setCurrentStep(FORM_STEPS[prevIndex].key);
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      store.addSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  const handleAIEnhance = async (text: string, setter: (val: string) => void, type: 'bullet' | 'summary' = 'bullet') => {
    setIsAiProcessing(true);
    try {
      const enhanced = await enhanceWithAI(text, type);
      setter(enhanced);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleEnhanceExperience = async (id: string, description: string) => {
    setIsAiProcessing(true);
    try {
      const highlights = await enhanceExperience(description);
      store.updateExperience(id, { highlights });
    } finally {
      setIsAiProcessing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ fullName: e.target.value })}
              />
              <Input
                label="Professional Title"
                placeholder="Senior Software Engineer"
                value={resumeData.personalInfo.title}
                onChange={(e) => setPersonalInfo({ title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={resumeData.personalInfo.email}
                onChange={(e) => setPersonalInfo({ email: e.target.value })}
              />
              <Input
                label="Phone"
                placeholder="+1 (555) 000-0000"
                value={resumeData.personalInfo.phone}
                onChange={(e) => setPersonalInfo({ phone: e.target.value })}
              />
            </div>
            <Input
              label="Location"
              placeholder="San Francisco, CA"
              value={resumeData.personalInfo.location}
              onChange={(e) => setPersonalInfo({ location: e.target.value })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="LinkedIn URL"
                placeholder="linkedin.com/in/johndoe"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={(e) => setPersonalInfo({ linkedin: e.target.value })}
              />
              <Input
                label="GitHub URL"
                placeholder="github.com/johndoe"
                value={resumeData.personalInfo.github || ''}
                onChange={(e) => setPersonalInfo({ github: e.target.value })}
              />
              <Input
                label="Website"
                placeholder="johndoe.dev"
                value={resumeData.personalInfo.website || ''}
                onChange={(e) => setPersonalInfo({ website: e.target.value })}
              />
            </div>
            <div className="relative">
              <Textarea
                label="Professional Summary"
                placeholder="Write about yourself in plain English. Example: 'I'm a software engineer with 5 years of experience building web apps using React and Node.js...'"
                rows={4}
                value={resumeData.personalInfo.summary}
                onChange={(e) => setPersonalInfo({ summary: e.target.value })}
              />
              {resumeData.personalInfo.summary && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 text-xs text-primary"
                  loading={isAiProcessing}
                  onClick={() => handleAIEnhance(
                    resumeData.personalInfo.summary,
                    (val) => setPersonalInfo({ summary: val }),
                    'summary'
                  )}
                >
                  ✨ Improve with AI
                </Button>
              )}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <Card key={edu.id} className="relative">
                <button
                  onClick={() => store.removeEducation(edu.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Institution"
                      placeholder="MIT"
                      value={edu.institution}
                      onChange={(e) => store.updateEducation(edu.id, { institution: e.target.value })}
                    />
                    <Input
                      label="Degree"
                      placeholder="Bachelor of Science"
                      value={edu.degree}
                      onChange={(e) => store.updateEducation(edu.id, { degree: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Field of Study"
                      placeholder="Computer Science"
                      value={edu.field}
                      onChange={(e) => store.updateEducation(edu.id, { field: e.target.value })}
                    />
                    <Input
                      label="GPA"
                      placeholder="3.8/4.0"
                      value={edu.gpa || ''}
                      onChange={(e) => store.updateEducation(edu.id, { gpa: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Start Date"
                      placeholder="Sep 2018"
                      value={edu.startDate}
                      onChange={(e) => store.updateEducation(edu.id, { startDate: e.target.value })}
                    />
                    <Input
                      label="End Date"
                      placeholder="Jun 2022"
                      value={edu.endDate}
                      onChange={(e) => store.updateEducation(edu.id, { endDate: e.target.value })}
                    />
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" onClick={store.addEducation} className="w-full">
              + Add Education
            </Button>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <Input
              label="Add Skills (press Enter)"
              placeholder="e.g., React, TypeScript, AWS, Project Management..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
            />
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <Badge key={skill} removable onRemove={() => store.removeSkill(skill)}>
                  {skill}
                </Badge>
              ))}
            </div>
            {resumeData.skills.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <p>Type a skill and press Enter to add it</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'SQL', 'Git'].map(s => (
                    <button
                      key={s}
                      onClick={() => store.addSkill(s)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <Card key={exp.id} className="relative">
                <button
                  onClick={() => store.removeExperience(exp.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Company"
                      placeholder="Google"
                      value={exp.company}
                      onChange={(e) => store.updateExperience(exp.id, { company: e.target.value })}
                    />
                    <Input
                      label="Position"
                      placeholder="Senior Software Engineer"
                      value={exp.position}
                      onChange={(e) => store.updateExperience(exp.id, { position: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Start Date"
                      placeholder="Jan 2022"
                      value={exp.startDate}
                      onChange={(e) => store.updateExperience(exp.id, { startDate: e.target.value })}
                    />
                    <div>
                      <Input
                        label="End Date"
                        placeholder="Present"
                        value={exp.current ? 'Present' : exp.endDate}
                        disabled={exp.current}
                        onChange={(e) => store.updateExperience(exp.id, { endDate: e.target.value })}
                      />
                      <label className="flex items-center gap-2 mt-1.5">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => store.updateExperience(exp.id, { current: e.target.checked })}
                          className="rounded accent-primary"
                        />
                        <span className="text-xs text-muted-foreground">Current position</span>
                      </label>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      label="Description (plain English is fine!)"
                      placeholder="Built a food delivery app using React and Firebase that served 10k users. Led a team of 3 developers. Improved page load speed by 40%."
                      rows={3}
                      value={exp.description}
                      onChange={(e) => store.updateExperience(exp.id, { description: e.target.value })}
                    />
                    {exp.description && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 text-xs text-primary"
                        loading={isAiProcessing}
                        onClick={() => handleEnhanceExperience(exp.id, exp.description)}
                      >
                        ✨ Enhance with AI
                      </Button>
                    )}
                  </div>
                  {exp.highlights.length > 0 && (
                    <div className="bg-accent/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-foreground mb-2">AI-Enhanced Bullet Points:</p>
                      <ul className="space-y-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="text-green-500 mt-0.5">✓</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            <Button variant="outline" onClick={store.addExperience} className="w-full">
              + Add Experience
            </Button>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            {resumeData.projects.map((proj) => (
              <Card key={proj.id} className="relative">
                <button
                  onClick={() => store.removeProject(proj.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="space-y-3">
                  <Input
                    label="Project Name"
                    placeholder="AI Resume Builder"
                    value={proj.name}
                    onChange={(e) => store.updateProject(proj.id, { name: e.target.value })}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Built a full-stack app that generates resumes using AI..."
                    rows={2}
                    value={proj.description}
                    onChange={(e) => store.updateProject(proj.id, { description: e.target.value })}
                  />
                  <Input
                    label="Technologies (comma-separated)"
                    placeholder="React, TypeScript, OpenAI, PostgreSQL"
                    value={proj.technologies.join(', ')}
                    onChange={(e) => store.updateProject(proj.id, {
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Live Link"
                      placeholder="https://myapp.vercel.app"
                      value={proj.link || ''}
                      onChange={(e) => store.updateProject(proj.id, { link: e.target.value })}
                    />
                    <Input
                      label="GitHub"
                      placeholder="github.com/user/repo"
                      value={proj.github || ''}
                      onChange={(e) => store.updateProject(proj.id, { github: e.target.value })}
                    />
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" onClick={store.addProject} className="w-full">
              + Add Project
            </Button>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-4">
            {resumeData.certifications.map((cert) => (
              <Card key={cert.id} className="relative">
                <button
                  onClick={() => store.removeCertification(cert.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Certification Name"
                      placeholder="AWS Solutions Architect"
                      value={cert.name}
                      onChange={(e) => store.updateCertification(cert.id, { name: e.target.value })}
                    />
                    <Input
                      label="Issuing Organization"
                      placeholder="Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => store.updateCertification(cert.id, { issuer: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Date"
                      placeholder="Jan 2024"
                      value={cert.date}
                      onChange={(e) => store.updateCertification(cert.id, { date: e.target.value })}
                    />
                    <Input
                      label="Credential URL"
                      placeholder="https://credential.net/..."
                      value={cert.link || ''}
                      onChange={(e) => store.updateCertification(cert.id, { link: e.target.value })}
                    />
                  </div>
                </div>
              </Card>
            ))}
            <Button variant="outline" onClick={store.addCertification} className="w-full">
              + Add Certification
            </Button>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-4">
            {resumeData.achievements.map((ach) => (
              <Card key={ach.id} className="relative">
                <button
                  onClick={() => store.removeAchievement(ach.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="space-y-3">
                  <Input
                    label="Achievement Title"
                    placeholder="Hackathon Winner"
                    value={ach.title}
                    onChange={(e) => store.updateAchievement(ach.id, { title: e.target.value })}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Won first place at the TechCrunch Hackathon 2024..."
                    rows={2}
                    value={ach.description}
                    onChange={(e) => store.updateAchievement(ach.id, { description: e.target.value })}
                  />
                  <Input
                    label="Date"
                    placeholder="Mar 2024"
                    value={ach.date || ''}
                    onChange={(e) => store.updateAchievement(ach.id, { date: e.target.value })}
                  />
                </div>
              </Card>
            ))}
            <Button variant="outline" onClick={store.addAchievement} className="w-full">
              + Add Achievement
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Progress */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {FORM_STEPS.map((step, i) => (
          <button
            key={step.key}
            onClick={() => setCurrentStep(step.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              currentStep === step.key
                ? 'bg-primary text-primary-foreground shadow-md'
                : i < currentStepIndex
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            <span>{step.icon}</span>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {FORM_STEPS[currentStepIndex].icon} {FORM_STEPS[currentStepIndex].label}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {currentStep === 'personal' && 'Tell us about yourself. Write naturally — AI will polish it.'}
              {currentStep === 'education' && 'Add your educational background.'}
              {currentStep === 'skills' && 'List your technical and soft skills.'}
              {currentStep === 'experience' && 'Describe your work experience in plain English.'}
              {currentStep === 'projects' && 'Showcase your best projects.'}
              {currentStep === 'certifications' && 'Add professional certifications.'}
              {currentStep === 'achievements' && 'Highlight your key achievements.'}
            </p>
          </div>

          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentStepIndex === 0}
        >
          ← Previous
        </Button>
        <span className="text-xs text-muted-foreground">
          {currentStepIndex + 1} of {FORM_STEPS.length}
        </span>
        <Button
          variant="default"
          onClick={goNext}
          disabled={currentStepIndex === FORM_STEPS.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
