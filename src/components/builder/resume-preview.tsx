'use client';

import React from 'react';
import { ResumeData, TemplateType } from '@/lib/types';
import {
  MinimalTemplate,
  CorporateTemplate,
  CreativeTemplate,
  TechTemplate,
  ExecutiveTemplate,
} from '@/components/templates/resume-templates';

interface ResumePreviewProps {
  data: ResumeData;
  template?: TemplateType;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const selectedTemplate = template || data.template;

  const templateMap: Record<TemplateType, React.ComponentType<{ data: ResumeData }>> = {
    minimal: MinimalTemplate,
    corporate: CorporateTemplate,
    creative: CreativeTemplate,
    tech: TechTemplate,
    executive: ExecutiveTemplate,
  };

  const TemplateComponent = templateMap[selectedTemplate] || MinimalTemplate;

  return (
    <div className="w-full">
      <div className="transform origin-top scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100" id="resume-preview-content">
        <TemplateComponent data={data} />
      </div>
    </div>
  );
}
