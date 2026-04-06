'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useResumeStore } from '@/lib/store';
import { generatePortfolioContent } from '@/lib/ai';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

interface PortfolioContent {
  heroTagline: string;
  aboutMe: string;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
}

export default function PortfolioPage() {
  const { resumeData } = useResumeStore();
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generate() {
      setLoading(true);
      const result = await generatePortfolioContent(resumeData);
      setContent(result as PortfolioContent);
      setLoading(false);
    }
    generate();
  }, [resumeData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Generating your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!content) return null;

  const { personalInfo } = resumeData;
  const name = personalInfo.fullName || 'Your Name';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <span className="font-semibold text-sm">{name}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <Link href="/builder">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              ← Back to Builder
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.div variants={fadeIn}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl shadow-indigo-500/30">
              {initials}
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              {personalInfo.title || 'Professional'}
            </Badge>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl font-bold mb-4 leading-tight">
            Hi, I&apos;m <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{name}</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            {content.heroTagline}
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-3">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`}>
                <Button variant="gradient" size="lg">Get in Touch</Button>
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:text-white hover:border-slate-500">
                  GitHub →
                </Button>
              </a>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-20 sm:py-28 border-t border-slate-800/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto px-4 sm:px-6"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">About Me</Badge>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-800">
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              {content.aboutMe}
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-400">
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">📍 {personalInfo.location}</span>
              )}
              {personalInfo.email && (
                <span className="flex items-center gap-1.5">✉️ {personalInfo.email}</span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">🔗 LinkedIn</span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills */}
      {content.skills.length > 0 && (
        <section id="skills" className="py-20 sm:py-28 border-t border-slate-800/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto px-4 sm:px-6"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Skills</Badge>
              <h2 className="text-3xl font-bold mb-8">Tech Stack & Skills</h2>
            </motion.div>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
              {content.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:border-indigo-500/50 hover:text-indigo-400 transition-colors cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Projects */}
      {content.projects.length > 0 && (
        <section id="projects" className="py-20 sm:py-28 border-t border-slate-800/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto px-4 sm:px-6"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Projects</Badge>
              <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.projects.map((project) => (
                <motion.div
                  key={project.name}
                  variants={fadeIn}
                  whileHover={{ y: -4 }}
                  className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                    <div className="flex gap-2">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Experience */}
      {content.experience.length > 0 && (
        <section id="experience" className="py-20 sm:py-28 border-t border-slate-800/50">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto px-4 sm:px-6"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Experience</Badge>
              <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
            </motion.div>
            <div className="space-y-6">
              {content.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="relative pl-8 border-l-2 border-slate-800"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-indigo-500 border-4 border-slate-950" />
                  <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-white">{exp.position}</h3>
                      <span className="text-xs text-slate-500">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-sm text-indigo-400 mb-2">{exp.company}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-28 border-t border-slate-800/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Contact</Badge>
            <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 max-w-md mx-auto">
            <div className="space-y-4">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                  <span className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm group-hover:bg-indigo-500/10 transition-colors">✉️</span>
                  <span className="text-sm">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm">📱</span>
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                  <span className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm group-hover:bg-indigo-500/10 transition-colors">🔗</span>
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors group">
                  <span className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm group-hover:bg-indigo-500/10 transition-colors">💻</span>
                  <span className="text-sm">GitHub</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-600">
            Built with ❤️ using{' '}
            <Link href="/" className="text-indigo-500 hover:text-indigo-400 transition-colors">
              Resumint AI
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
