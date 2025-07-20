import client from "@/app/db";
import { notFound } from "next/navigation";
import TemplateResumeBuilder from "@/components/templates/TemplateResumeBuilder";

export default async function TemplateResumePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const resume = await client.resume.findUnique({
    where: { id },//here are the changes
    select:{
      aiUsed:true,
      id:true,
      content:true,
      templateId:true
    }
  });

  if (!resume) return notFound();
 
  return (
    <TemplateResumeBuilder
      resume={{ id: resume.id, content: resume.content,aiUsed:resume.aiUsed }}
      templateId={resume.templateId}
    />
  );
}
