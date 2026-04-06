'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminResume {
  id: string;
  title: string | null;
  template: string;
  isPublic: boolean;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
  data: Record<string, unknown>;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export default function AdminResumesPage() {
  const [resumes, setResumes] = useState<AdminResume[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<AdminResume | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set('search', search);
    const res = await fetch(`/api/admin/resumes?${params}`);
    const data = await res.json();
    setResumes(data.resumes ?? []);
    setTotal(data.total ?? 0);
    setPages(data.pages ?? 1);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    const t = setTimeout(fetchResumes, 300);
    return () => clearTimeout(t);
  }, [fetchResumes]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resume? This action cannot be undone.')) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/resumes?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setResumes((prev) => prev.filter((r) => r.id !== id));
      setTotal((t) => t - 1);
      if (preview?.id === id) setPreview(null);
    }
    setDeletingId(null);
  };

  const getResumeData = (resume: AdminResume) => {
    const d = resume.data as {
      personalInfo?: { fullName?: string; title?: string; email?: string; phone?: string; location?: string; summary?: string };
      skills?: string[];
      experience?: Array<{ company?: string; position?: string; startDate?: string; endDate?: string }>;
      education?: Array<{ institution?: string; degree?: string; field?: string }>;
      projects?: Array<{ name?: string; description?: string }>;
    };
    return d;
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resumes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{total} resumes created</p>
        </div>
        <div className="w-72">
          <Input
            placeholder="Search by title or user…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Resume</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Owner</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Template</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Created</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Updated</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground text-sm">Loading…</td>
                </tr>
              )}
              {!loading && resumes.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground text-sm">No resumes found.</td>
                </tr>
              )}
              {!loading && resumes.map((resume) => {
                const d = getResumeData(resume);
                return (
                  <tr key={resume.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {d.personalInfo?.fullName || resume.title || 'Untitled'}
                        </p>
                        <p className="text-xs text-muted-foreground">{d.personalInfo?.title || '—'}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {resume.user.image ? (
                          <img src={resume.user.image} alt="" className="w-6 h-6 rounded-full shrink-0" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                            {resume.user.name?.[0] ?? '?'}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-medium text-foreground">{resume.user.name ?? '—'}</p>
                          <p className="text-[10px] text-muted-foreground">{resume.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Badge variant="secondary" className="text-xs capitalize">{resume.template}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreview(resume)}
                          className="text-xs h-7"
                        >
                          Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          loading={deletingId === resume.id}
                          onClick={() => handleDelete(resume.id)}
                          className="text-xs h-7 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Page {page} of {pages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {preview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setPreview(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setPreview(null)}
            >
              <Card
                className="w-full max-w-2xl max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-semibold text-foreground">
                      {getResumeData(preview).personalInfo?.fullName || preview.title || 'Untitled Resume'}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs capitalize">{preview.template}</Badge>
                      <span className="text-xs text-muted-foreground">by {preview.user.name ?? preview.user.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreview(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {(() => {
                  const d = getResumeData(preview);
                  return (
                    <div className="space-y-5">
                      {/* Personal Info */}
                      {d.personalInfo && (
                        <section>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Personal Info</h3>
                          <div className="bg-muted/30 rounded-xl p-4 space-y-1">
                            {d.personalInfo.email && <p className="text-sm text-foreground">📧 {d.personalInfo.email}</p>}
                            {d.personalInfo.phone && <p className="text-sm text-foreground">📱 {d.personalInfo.phone}</p>}
                            {d.personalInfo.location && <p className="text-sm text-foreground">📍 {d.personalInfo.location}</p>}
                            {d.personalInfo.summary && <p className="text-xs text-muted-foreground mt-2">{d.personalInfo.summary}</p>}
                          </div>
                        </section>
                      )}

                      {/* Skills */}
                      {d.skills && d.skills.length > 0 && (
                        <section>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {d.skills.map((skill: string) => (
                              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Experience */}
                      {d.experience && d.experience.length > 0 && (
                        <section>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Experience ({d.experience.length})</h3>
                          <div className="space-y-2">
                            {d.experience.map((exp, i) => (
                              <div key={i} className="bg-muted/30 rounded-xl p-3">
                                <p className="text-sm font-medium text-foreground">{exp.position} @ {exp.company}</p>
                                <p className="text-xs text-muted-foreground">{exp.startDate} – {exp.endDate}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Education */}
                      {d.education && d.education.length > 0 && (
                        <section>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Education</h3>
                          <div className="space-y-2">
                            {d.education.map((edu, i) => (
                              <div key={i} className="bg-muted/30 rounded-xl p-3">
                                <p className="text-sm font-medium text-foreground">{edu.degree} in {edu.field}</p>
                                <p className="text-xs text-muted-foreground">{edu.institution}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Projects */}
                      {d.projects && d.projects.length > 0 && (
                        <section>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Projects ({d.projects.length})</h3>
                          <div className="space-y-2">
                            {d.projects.map((proj, i) => (
                              <div key={i} className="bg-muted/30 rounded-xl p-3">
                                <p className="text-sm font-medium text-foreground">{proj.name}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{proj.description}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Metadata */}
                      <div className="pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <span>Created: {new Date(preview.createdAt).toLocaleString()}</span>
                        <span>Updated: {new Date(preview.updatedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })()}
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
