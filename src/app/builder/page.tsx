'use client';

import React, { Suspense, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ResumeForm } from '@/components/builder/resume-form';
import { ResumePreview } from '@/components/builder/resume-preview';
import { TemplateSelector } from '@/components/builder/template-selector';
import { ATSScorePanel } from '@/components/builder/ats-score';
import { TemplateType, TEMPLATES } from '@/lib/types';

function BuilderContent() {
  const { resumeData, isDarkMode, toggleDarkMode, saveCurrentResume, setTemplate } = useResumeStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam) {
      const valid = TEMPLATES.find((t) => t.key === templateParam);
      if (valid) setTemplate(valid.key as TemplateType);
    }
  }, [searchParams, setTemplate]);
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      // Dynamic import for client-only libraries
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const element = document.getElementById('resume-preview-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  }, [resumeData.personalInfo.fullName]);

  const handleSave = async () => {
    saveCurrentResume();
    // Persist to database (best-effort — does not block UI)
    fetch('/api/resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume: resumeData }),
    }).catch(() => {/* silent — localStorage is the fallback */});

    const el = document.getElementById('save-notification');
    if (el) {
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
      setTimeout(() => {
        el.classList.remove('opacity-100');
        el.classList.add('opacity-0');
      }, 2000);
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <div className="sticky top-0 z-40 glass border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <span className="text-sm font-bold gradient-text hidden sm:inline">Resumint AI</span>
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-sm font-medium text-foreground">Resume Builder</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save notification */}
            <span id="save-notification" className="text-xs text-green-500 font-medium opacity-0 transition-opacity duration-300">
              ✓ Saved
            </span>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <Button variant="ghost" size="sm" onClick={handleSave}>
              💾 Save
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? '✏️ Edit' : '👁 Preview'}
              </Button>

              <Button
                variant="gradient"
                size="sm"
                onClick={handleExportPDF}
                loading={isExporting}
              >
                📄 Download PDF
              </Button>
            </div>

            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-56px)]">
          {/* Left Panel - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${showPreview ? 'hidden lg:block' : ''} lg:w-1/2 border-r border-border overflow-y-auto`}
            style={{ maxHeight: 'calc(100vh - 56px)' }}
          >
            <div className="p-4 sm:p-6 space-y-6">
              <ResumeForm />
              
              {/* Template Selector */}
              <div className="border-t border-border pt-6">
                <TemplateSelector />
              </div>

              {/* ATS Score */}
              <div className="border-t border-border pt-6">
                <ATSScorePanel />
              </div>

              {/* Portfolio Link */}
              <div className="border-t border-border pt-6">
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/20">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    🌐 Portfolio Website
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    Auto-generate a stunning portfolio from your resume data.
                  </p>
                  <Link href={`/portfolio/${resumeData.personalInfo.fullName?.toLowerCase().replace(/\s+/g, '-') || 'preview'}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Generate Portfolio →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${!showPreview ? 'hidden lg:block' : ''} lg:w-1/2 bg-muted/30 overflow-y-auto`}
            style={{ maxHeight: 'calc(100vh - 56px)' }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowPreview(false)}
                  >
                    ← Back to Edit
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={handleExportPDF}
                    loading={isExporting}
                    className="lg:hidden"
                  >
                    📄 PDF
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile action bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-border p-3 flex gap-2 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="flex-1"
        >
          {showPreview ? '✏️ Edit' : '👁 Preview'}
        </Button>
        <Button
          variant="gradient"
          size="sm"
          onClick={handleExportPDF}
          loading={isExporting}
          className="flex-1"
        >
          📄 Download PDF
        </Button>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
