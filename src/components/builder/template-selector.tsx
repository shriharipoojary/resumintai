'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/lib/store';
import { TEMPLATES, TemplateType } from '@/lib/types';

export function TemplateSelector() {
  const { resumeData, setTemplate } = useResumeStore();

  const templateColors: Record<TemplateType, string> = {
    minimal: 'from-slate-500 to-slate-700',
    corporate: 'from-blue-500 to-blue-700',
    creative: 'from-pink-500 to-purple-600',
    tech: 'from-emerald-500 to-teal-600',
    executive: 'from-amber-500 to-orange-600',
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Choose Template</h3>
      <div className="grid grid-cols-5 gap-2">
        {TEMPLATES.map((template) => (
          <motion.button
            key={template.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTemplate(template.key)}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
              resumeData.template === template.key
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <div className={`aspect-[3/4] bg-gradient-to-br ${templateColors[template.key]} p-2`}>
              <div className="space-y-1">
                <div className="h-1 bg-white/40 rounded w-3/4" />
                <div className="h-0.5 bg-white/25 rounded w-1/2" />
                <div className="h-px bg-white/20 my-1" />
                <div className="h-0.5 bg-white/15 rounded w-full" />
                <div className="h-0.5 bg-white/15 rounded w-5/6" />
                <div className="h-0.5 bg-white/15 rounded w-2/3" />
              </div>
            </div>
            <div className="text-center py-1">
              <span className="text-[10px] font-medium text-foreground">{template.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
