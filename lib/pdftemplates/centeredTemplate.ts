import { formatDate } from "../types";
export function generateCenteredHTML(resume: any): string {
  const { content } = resume;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>
    body { font-family: 'Inter', sans-serif; padding: 32px; color: #111827; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 28px; font-weight: bold; margin-bottom: 4px; text-align: center; }
    h2 { font-size: 13px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #F97316; padding-bottom: 4px; margin-top: 24px; color: #F97316; text-align: center; }
    p, div { font-size: 13px; }
  </style>
</head>
<body>
  <div style="text-align: center; margin-bottom: 24px;">
    <h1>${content.personalInfo?.fullName || ""}</h1>
    ${content.personalInfo?.jobTitle ? `<h2 style="color: #2563EB; font-size: 14px; font-weight: 600;">${content.personalInfo.jobTitle}</h2>` : ""}
    <p style="font-size: 12px; margin: 12px 0;">
      ${content.personalInfo?.location ? `📍 ${content.personalInfo.location}<br/>` : ""}
      ${content.personalInfo?.phone ? `📞 ${content.personalInfo.phone}<br/>` : ""}
      ${content.personalInfo?.email ? `✉ ${content.personalInfo.email}` : ""}
    </p>
    ${content.links && Object.keys(content.links).length > 0 ? `
      <h2>Links</h2>
      <ul style="font-size: 12px; margin-top: 6px; list-style: none; padding: 0; display: flex; justify-content: center; gap: 16px;">
        ${Object.entries(content.links).map(([label, url]: any) => `<li style="color: #2563EB; font-weight: 500;">🔗 ${label}</li>`).join("")}
      </ul>` : ""}
  </div>

  ${content.personalInfo?.summary ? `
    <h2>Summary</h2>
    <div style="margin-top: 6px; color: #374151; text-align: center;">${content.personalInfo.summary}</div>
  ` : ""}

  ${content.experience?.length ? `
    <h2>Work Experience</h2>
    ${content.experience.map((exp: any) => `
      <div style="margin-top: 12px; text-align: center;">
        <h3 style="font-size: 14px; color: #2563EB;">${exp.title} | ${exp.company} | ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}
</h3>
        <div style="margin-top: 6px; font-size: 13px; color: #374151;">${exp.description}</div>
      </div>`).join("")}
  ` : ""}

  ${content.education?.length ? `
    <h2>Education</h2>
    <div style="text-align: center;">
      ${content.education.map((edu: any) => `
        <div style="margin-bottom: 16px;">
          <h3 style="font-size: 14px; font-weight: bold;">${edu.degree}</h3>
          <p style="font-size: 13px; color: #4B5563;">${edu.institution} | ${edu.startYear} - ${edu.endYear}</p>
          ${edu.gpa ? `<p style="font-size: 13px; color: #4B5563;">CGPA - ${edu.gpa}</p>` : ""}
        </div>`).join("")}
    </div>
  ` : ""}

  ${content.projects?.length ? `
    <h2>Projects</h2>
    ${content.projects.map((proj: any) => `
      <div style="margin-top: 12px; text-align: center;">
        <div style="font-weight: bold; font-size: 13px; color: #1E40AF;">${proj.title}</div>
        ${proj.link ? `<div style="font-size: 12px; color: #2563EB;">${proj.link}</div>` : ""}
        <p style="font-size: 12px; color: #6B7280;">${proj.startDate} - ${proj.endDate}</p>
        <div style="font-size: 13px; color: #374151;">${proj.description}</div>
      </div>`).join("")}
  ` : ""}

  ${content.skills ? `
    <h2>Skills</h2>
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 8px;">
      ${(typeof content.skills === "string" ? content.skills.split(/,|\n/) : content.skills).map((skill: string) => `
        <div style="background-color: #E0F2FE; padding: 4px 8px; border-radius: 9999px; font-size: 12px; color: #0C4A6E;">${skill.trim()}</div>
      `).join("")}
    </div>
  ` : ""}

  ${content.extracurricular ? `
    <h2>Extra-Curricular</h2>
    <div style="text-align: center;">
      ${content.extracurricular.split("\n").filter(Boolean).map((activity: string) => {
    if (activity.includes("•")) {
      const [title, desc] = activity.split("•");
      return `<div style="margin-bottom: 12px;"><div style="font-weight: bold; color: #2563EB;">${title.trim()}</div><div style="margin-left: 16px; color: #374151;">• ${desc.trim()}</div></div>`;
    } else {
      return `<div style="font-weight: bold; color: #2563EB; margin-bottom: 8px;">${activity}</div>`;
    }
  }).join("")}
    </div>` : ""}

</body>
</html>
  `;
}
