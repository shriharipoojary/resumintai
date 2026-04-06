'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

interface DbResume {
  id: string;
  title: string | null;
  template: string;
  createdAt: string;
  updatedAt: string;
  data: Record<string, unknown>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { resetResume, isDarkMode, toggleDarkMode } = useResumeStore();
  const [resumes, setResumes] = useState<DbResume[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = useCallback(async () => {
    try {
      const res = await fetch('/api/resumes');
      const json = await res.json();
      if (json.success) setResumes(json.resumes);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') fetchResumes();
  }, [status, fetchResumes]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/resumes?id=${id}`, { method: 'DELETE' });
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mx-auto mb-4 animate-pulse" />
          <p className="text-sm text-muted-foreground">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const uniqueTemplates = new Set(resumes.map((r) => r.template)).size;
  const isAdmin = session.user.role === 'ADMIN';

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
              <span className="text-sm font-bold gradient-text">Resumint AI</span>
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-sm font-medium text-foreground">Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer" aria-label="Toggle dark mode">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            {isAdmin && (
              <Link href="/admin">
                <Button variant="outline" size="sm">Admin Panel</Button>
              </Link>
            )}
            <Link href="/builder">
              <Button variant="gradient" size="sm">+ New Resume</Button>
            </Link>
            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-accent transition-colors cursor-pointer">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name ?? ''} className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {session.user.name?.[0] ?? '?'}
                  </div>
                )}
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 glass border border-border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                <div className="p-3 border-b border-border">
                  <p className="text-xs font-semibold text-foreground truncate">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-b-xl transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Welcome */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Welcome back, {session.user.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground mt-1">Manage your resumes and portfolio websites.</p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Resumes', value: resumes.length, icon: '📄', color: 'from-indigo-500/10 to-indigo-500/5' },
              { label: 'Templates Used', value: uniqueTemplates, icon: '🎨', color: 'from-purple-500/10 to-purple-500/5' },
              { label: 'Plan', value: 'Free', icon: '⭐', color: 'from-amber-500/10 to-amber-500/5' },
              { label: 'Role', value: isAdmin ? 'Admin' : 'User', icon: isAdmin ? '🛡️' : '👤', color: 'from-emerald-500/10 to-emerald-500/5' },
            ].map((stat) => (
              <Card key={stat.label} className={`bg-gradient-to-br ${stat.color}`}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>

          {/* Upgrade Banner */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <Badge className="bg-white/20 text-white border-white/30 mb-3">Free Plan</Badge>
                <h2 className="text-lg font-bold mb-1">Upgrade to Pro for Unlimited Power</h2>
                <p className="text-sm opacity-80 mb-4">Unlock all templates, unlimited resumes, portfolio export, and advanced AI.</p>
                <Button className="bg-white text-indigo-600 hover:bg-white/90" size="sm">Upgrade to Pro — $12/mo</Button>
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

            {resumes.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No resumes yet</h3>
                <p className="text-sm text-muted-foreground mb-6">Create your first AI-powered resume in minutes.</p>
                <Link href="/builder">
                  <Button variant="gradient">Create Your First Resume</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumes.map((resume) => {
                  const data = resume.data as { personalInfo?: { fullName?: string; title?: string }; skills?: string[]; experience?: unknown[]; education?: unknown[]; projects?: unknown[] };
                  return (
                    <motion.div key={resume.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                      <Card hover className="h-full">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground text-sm">
                              {data.personalInfo?.fullName || resume.title || 'Untitled Resume'}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{data.personalInfo?.title || 'No title'}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs capitalize">{resume.template}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {data.skills?.slice(0, 4).map((s: string) => (
                            <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                          ))}
                          {(data.skills?.length ?? 0) > 4 && (
                            <Badge variant="outline" className="text-xs">+{(data.skills?.length ?? 0) - 4}</Badge>
                          )}
                        </div>

                        <div className="text-xs text-muted-foreground mb-3">
                          {data.experience?.length ?? 0} exp • {data.education?.length ?? 0} edu • {data.projects?.length ?? 0} projects
                        </div>

                        <p className="text-xs text-muted-foreground mb-4">
                          Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>

                        <div className="flex gap-2">
                          <Link href="/builder" className="flex-1">
                            <Button variant="default" size="sm" className="w-full">Edit</Button>
                          </Link>
                          <Link href={`/portfolio/${data.personalInfo?.fullName?.toLowerCase().replace(/\s+/g, '-') || 'preview'}`}>
                            <Button variant="outline" size="sm">🌐</Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(resume.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          >
                            🗑
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
