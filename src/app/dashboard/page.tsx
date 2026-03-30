'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function DashboardPage() {
  const { savedResumes, loadResume, deleteResume, resetResume, isDarkMode, toggleDarkMode } = useResumeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved resumes from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('savedResumes');
      if (stored) {
        try {
          const resumes = JSON.parse(stored);
          useResumeStore.setState({ savedResumes: resumes });
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <div className="sticky top-0 z-40 glass border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="text-sm font-bold gradient-text">ResumeAI</span>
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-sm font-medium text-foreground">Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <Link href="/builder">
              <Button variant="gradient" size="sm">+ New Resume</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Welcome */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your resumes and portfolio websites.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Resumes', value: savedResumes.length, icon: '📄', color: 'from-indigo-500/10 to-indigo-500/5' },
              { label: 'Templates Used', value: new Set(savedResumes.map(r => r.template)).size, icon: '🎨', color: 'from-purple-500/10 to-purple-500/5' },
              { label: 'Plan', value: 'Free', icon: '⭐', color: 'from-amber-500/10 to-amber-500/5' },
              { label: 'Portfolios', value: savedResumes.filter(r => r.personalInfo.fullName).length, icon: '🌐', color: 'from-emerald-500/10 to-emerald-500/5' },
            ].map((stat) => (
              <Card key={stat.label} className={`bg-gradient-to-br ${stat.color}`}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>

          {/* Plan Banner */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <Badge className="bg-white/20 text-white border-white/30 mb-3">Free Plan</Badge>
                <h2 className="text-lg font-bold mb-1">Upgrade to Pro for Unlimited Power</h2>
                <p className="text-sm opacity-80 mb-4">Unlock all templates, unlimited resumes, portfolio export, and advanced AI.</p>
                <Button className="bg-white text-indigo-600 hover:bg-white/90" size="sm">
                  Upgrade to Pro — $12/mo
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Saved Resumes */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Your Resumes</h2>
              <Link href="/builder" onClick={() => resetResume()}>
                <Button variant="outline" size="sm">+ Create New</Button>
              </Link>
            </div>

            {savedResumes.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No resumes yet</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Create your first AI-powered resume in minutes.
                </p>
                <Link href="/builder">
                  <Button variant="gradient">Create Your First Resume</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedResumes.map((resume) => (
                  <motion.div
                    key={resume.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card hover className="h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {resume.personalInfo.fullName || 'Untitled Resume'}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {resume.personalInfo.title || 'No title'}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {resume.template}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {resume.skills.slice(0, 4).map(s => (
                          <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                        {resume.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">+{resume.skills.length - 4}</Badge>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground mb-4">
                        {resume.experience.length} experiences • {resume.education.length} education • {resume.projects.length} projects
                      </div>

                      {resume.updatedAt && (
                        <p className="text-xs text-muted-foreground mb-3">
                          Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <Link href="/builder" className="flex-1" onClick={() => loadResume(resume.id!)}>
                          <Button variant="default" size="sm" className="w-full">Edit</Button>
                        </Link>
                        <Link href={`/portfolio/${resume.personalInfo.fullName?.toLowerCase().replace(/\s+/g, '-') || 'preview'}`}>
                          <Button variant="outline" size="sm">🌐</Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteResume(resume.id!)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          🗑
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
