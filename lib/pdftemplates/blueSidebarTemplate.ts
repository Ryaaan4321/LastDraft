import { formatDate } from "../types";
export function generateBlueSidebarHTML(resume: any): string {
  const { content } = resume;

  return `
      <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: sans-serif;
          background: #fff;
          padding: 40px;
          font-size: 13px;
          color: #000;
        }
        h2 {
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #000;
          padding-bottom: 4px;
          margin-bottom: 8px;
          color: #000;
        }
      </style>
    </head>
    <body>
    <div style="display: flex; font-family: 'Inter', sans-serif; min-height: 1000px;">
      <!-- Sidebar -->
      <div style="width: 280px; background-color: #1D4ED8; color: white; padding: 24px;">
        <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #3B82F6; padding-bottom: 4px;">Education</h2>
        ${(content.education || []).map((edu: any) => `
          <div style="margin-bottom: 16px;">
            <strong style="font-size: 13px;">${edu.degree}</strong><br/>
            <span style="font-size: 11px;">${edu.institution} (${edu.startYear} - ${edu.endYear})</span><br/>
            ${edu.gpa ? `<span style="font-size: 11px;">CGPA: ${edu.gpa}</span>` : ""}
          </div>
        `).join("")}

        <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #3B82F6; padding-bottom: 4px; margin-top: 24px;">Skills</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px;">
          ${(typeof content.skills === "string"
            ? content.skills.split("\n")
            : content.skills || []).map((skill: string) => `
              <div style="background-color: #2563EB; padding: 2px 6px; border-radius: 4px; font-size: 11px;">${skill.trim()}</div>
          `).join("")}
        </div>
        ${(content.extras?.achievements || content.extras?.certifications || content.extras?.hobbies) ? `
  <h3 style="color: #F97316; border-bottom: 2px solid #F97316; padding-bottom: 4px; margin-top: 20px;">Extras</h3>

  ${content.extras?.achievements ? `
    <div style="margin-top: 10px;">
      <strong style="display: block; font-size: 13px;">Achievements</strong>
      <div style="font-size: 13px; margin-top: 4px;">${content.extras.achievements}</div>
    </div>
  ` : ""}

  ${content.extras?.certifications ? `
    <div style="margin-top: 10px;">
      <strong style="display: block; font-size: 13px;">Certifications</strong>
      <div style="font-size: 13px; margin-top: 4px;">${content.extras.certifications}</div>
    </div>
  ` : ""}

  ${content.extras?.hobbies ? `
    <div style="margin-top: 10px;">
      <strong style="display: block; font-size: 13px;">Hobbies</strong>
      <div style="font-size: 13px; margin-top: 4px;">${content.extras.hobbies}</div>
    </div>
  ` : ""}
` : ""}

        ${content.projects?.length ? `
  <h2 style="font-size: 13px; font-weight: bold; text-transform: uppercase; color: #FB923C; border-bottom: 1px solid #FCD34D; margin-top: 24px; padding-bottom: 4px;">Projects</h2>
  ${content.projects.map((project: any) => `
    <div style="margin-top: 16px;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <div style="font-weight: bold; font-size: 13px;">${project.title || "Untitled Project"}</div>
          ${project.link ? `<div style="font-size: 12px; color: #2563EB;">${project.link}</div>` : ""}
        </div>
        <div style="font-size: 11px; color: #6B7280;">${project.startDate || ""} - ${project.endDate || ""}</div>
      </div>
      <div style="font-size: 12px; color: #374151; margin-top: 4px;">${project.description || ""}</div>
    </div>
  `).join("")}
` : ""}

        ${content.links && Object.keys(content.links).length > 0 ? `
          <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #3B82F6; padding-bottom: 4px; margin-top: 24px;">Links</h2>
          <ul style="font-size: 11px; margin-top: 6px;">
            ${Object.entries(content.links).map(([label, url]: any) => `
              <li>${label}: ${url}</li>
            `).join("")}
          </ul>
        ` : ""}
      </div>

      <!-- Main Content -->
      <div style="flex: 1; background-color: white; padding: 32px; color: #111827;">
        <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 4px;">${content.personalInfo.fullName}</h1>
        ${content.personalInfo.jobTitle ? `<h2 style="color: #2563EB; font-size: 14px; font-weight: 600;">${content.personalInfo.jobTitle}</h2>` : ""}
        <p style="font-size: 12px; margin: 12px 0;">
          ${content.personalInfo.location ? `📍 ${content.personalInfo.location}<br/>` : ""}
          ${content.personalInfo.phone ? `📞 ${content.personalInfo.phone}<br/>` : ""}
          ${content.personalInfo.email ? `✉ ${content.personalInfo.email}` : ""}
        </p>

        ${content.personalInfo.summary ? `
          <h3 style="color: #F97316; border-bottom: 2px solid #F97316; padding-bottom: 4px; margin-top: 20px;">Summary</h3>
          <div style="font-size: 13px; margin-top: 6px;">${content.personalInfo.summary}</div>
        ` : ""}

        ${content.experience?.length > 0 ? `
          <h3 style="color: #F97316; border-bottom: 2px solid #F97316; padding-bottom: 4px; margin-top: 20px;">Work Experience</h3>
          ${content.experience.map((exp: any) => `
            <div style="margin-top: 12px;">
              <strong>${exp.company}</strong> — <span>${exp.title}</span><br/>
              <span style="font-size: 12px; color: #6B7280;">${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}</span>
              <div style="margin-top: 6px; font-size: 13px;">${exp.description}</div>
            </div>
          `).join("")}
        ` : ""}

        ${content.extracurricular ? `
          <h3 style="color: #F97316; border-bottom: 2px solid #F97316; padding-bottom: 4px; margin-top: 20px;">Extra-Curricular</h3>
          <div style="font-size: 13px; margin-top: 6px;">${content.extracurricular.replace(/\n/g, "<br/>")}</div>
        ` : ""}
      </div>
    </div>
    </body>
    </html>
  `;
}
