"use client"

import { resumeTemplates } from "@/utils/data/templates";

interface TemplateResumeBuilderProps {
  resume: {
    id: string;
    content: any;
  };
  templateId: string;
}

export default function TemplateResumeBuilder({ resume, templateId }: TemplateResumeBuilderProps) {
  const template = resumeTemplates.find((t) => t.id === templateId)
  const TemplateComponent = template?.component;
  if (!TemplateComponent) return <div>Template not found</div>;

  return <TemplateComponent content={resume.content} />;
}
