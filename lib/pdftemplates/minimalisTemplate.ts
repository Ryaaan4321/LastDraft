import { formatDate } from "../types"
export function generateMinimalistHTML(resume: any): string {
  const { content } = resume
  const sanitize = (str: string) => str || ""

 
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
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
      <div>
        <h1 style="font-size: 28px; font-weight: 300;">${sanitize(content.personalInfo?.fullName)}</h1>
        <p class="text-sm text-gray">${sanitize(content.personalInfo?.jobTitle)}</p>
      </div>
      <div style="width: 64px; height: 64px; border: 1px solid #ccc; border-radius: 50%;"></div>
    </div>

    <div style="display: flex;">
      <div style="width: 240px; padding-right: 2rem;">
        ${content.personalInfo?.phone || content.personalInfo?.email || content.personalInfo?.location ? `
          <h2 class="section-title">Contacts</h2>
          <div style="font-size: 12px; line-height: 1.6;">
            ${content.personalInfo?.phone ? `📞 ${content.personalInfo.phone}<br>` : ""}
            ${content.personalInfo?.email ? `✉ ${content.personalInfo.email}<br>` : ""}
            ${content.personalInfo?.location ? `📍 ${content.personalInfo.location}` : ""}
          </div>
        ` : ""}
          ${content.skills ? `
            <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase;  margin: 24px 0 16px;">Skills</h2>
            ${(typeof content.skills === "string" ? content.skills.split("\n") : content.skills).map((skill: string) => `
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 500; margin-bottom: 4px;">${skill.trim()}</div>
            `).join("")}
          ` : ""}

                ${(content.extras?.achievements || content.extras?.certifications || content.extras?.hobbies) ? `
  <h3 style="; border-bottom: 2px solid #F97316; padding-bottom: 4px; margin-top: 20px;">Extras</h3>

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

        ${content.links && Object.keys(content.links).length > 0 ? `
          <h2 class="section-title" style="margin-top: 2rem;">Links</h2>
          <ul style="font-size: 12px; padding-left: 1rem;">
            ${Object.entries(content.links).map(([label, url]) => `<li>${label}: ${url}</li>`).join("")}
          </ul>
        ` : ""}
      </div>

      <div style="flex: 1;">
        ${content.experience?.length ? `
          <h2 class="section-title">Work Experience</h2>
          ${content.experience.map((exp: any) => `
            <div style="margin-bottom: 1rem;">
              <strong>${exp.title}, ${exp.company}</strong>
              <div class="text-xs text-gray"><span style="font-size: 12px; color: #6B7280;">${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}</span>
</div>
              <div class="text-xs" style="margin-top: 0.25rem;">${exp.description}</div>
            </div>
          `).join("")}
        ` : ""}

        ${content.education?.length ? `
          <h2 class="section-title" style="margin-top: 2rem;">Education</h2>
          ${content.education.map((edu: any) => `
            <div style="margin-bottom: 1rem;">
              <strong>${edu.degree}</strong> at ${edu.institution}<br />
              <span class="text-xs text-gray">${edu.startYear} - ${edu.endYear}${edu.gpa ? ` | CGPA - ${edu.gpa}` : ""}</span>
            </div>
          `).join("")}
        ` : ""}

        ${content.projects?.length ? `
          <h2 class="section-title" style="margin-top: 2rem;">Projects</h2>
          ${content.projects.map((project: any) => `
            <div style="margin-bottom: 1rem;">
              <strong>${project.title}</strong>
              ${project.link ? `<div class="text-xs text-blue-600">${project.link}</div>` : ""}
              ${project.description ? `<div class="text-xs">${project.description}</div>` : ""}
            </div>
          `).join("")}
        ` : ""}

        ${content.extracurricular ? `
          <h2 class="section-title" style="margin-top: 2rem;">Extra-Curricular</h2>
          <div class="text-xs">
            ${content.extracurricular.split("\n").map((line: string) => `<div>${line}</div>`).join("")}
          </div>
        ` : ""}

        ${content.personalInfo?.summary ? `
          <h2 class="section-title" style="margin-top: 2rem;">Summary</h2>
          <div class="text-xs">${content.personalInfo.summary}</div>
        ` : ""}
      </div>
    </div>
  </body>
  </html>
  `
} 