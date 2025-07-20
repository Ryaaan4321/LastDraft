// components/ResumeRenderer.tsx
type ResumeRendererProps = {
    templateId: string;
    content: any;
};

import { resumeTemplates } from "@/utils/data/templates";

export default function ResumeRenderer({ templateId, content }: ResumeRendererProps) {
    const template = resumeTemplates.find(t => t.id === templateId);

    if (!template) return <p className="text-red-500">Template not found</p>;

    const TemplateComponent = template.component;
    return <TemplateComponent content={content} />;
}
