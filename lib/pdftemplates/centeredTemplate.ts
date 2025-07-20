import { formatDate } from "../types";
export function generateCenteredHTML(resume: any): string {
  const { content } = resume;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${content.personalInfo?.fullName || "Your Name"}</title>
    <style>
      body {
        font-family: sans-serif;
        background: white;
        padding: 2rem;
        color: #111827;
        font-size: 13px;
      }
      h1, h2 {
        text-align: center;
        text-transform: uppercase;
      }
      h1 {
        font-size: 24px;
        font-weight: bold;
      }
      h2 {
        font-size: 14px;
        font-weight: bold;
        margin-top: 2rem;
        border-bottom: 1px solid #000;
        padding-bottom: 4px;
      }
      .section {
        margin-bottom: 2rem;
      }
      .tag {
        display: inline-block;
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        padding: 4px 10px;
        margin: 4px;
        font-size: 11px;
        border-radius: 9999px;
      }
    </style>
  </head>
  <body>

    <h1>${content.personalInfo?.fullName || "Your Name"}</h1>
    <p style="text-align:center; color: #4B5563;">${content.personalInfo?.jobTitle || ""}</p>
    <p style="text-align:center; color: #6B7280;">
      ${content.personalInfo?.phone ? `📞 ${content.personalInfo.phone}<br/>` : ""}
      ${content.personalInfo?.email ? `📧 ${content.personalInfo.email}<br/>` : ""}
      ${content.personalInfo?.location ? `📍 ${content.personalInfo.location}` : ""}
    </p>

    ${content.links && Object.keys(content.links).length
      ? `<div style="text-align:center; margin: 1rem 0;">` +
      Object.entries(content.links)
        .map(([label, url]) => `<span style="margin: 0 10px;">🔗 ${label}</span>`)
        .join("") +
      `</div>`
      : ""
    }

    ${content.summary ? `
      <div class="section">
        <h2>Summary</h2>
        <div>${content.summary}</div>
      </div>
    ` : ""}

    ${content.experience?.length ? `
      <div class="section">
        <h2>Work Experience</h2>
        ${content.experience.map((exp: any) => `
          <div style="margin-bottom: 1rem;">
            <div><strong>${formatDate(exp.startDate)} - ${exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}</strong></div>
            <div>${exp.description}</div>
          </div>
        `).join("")}
      </div>
    ` : ""}

    ${content.education?.length ? `
      <div class="section">
        <h2>Education</h2>
        ${content.education.map((edu: any) => `
          <div style="margin-bottom: 1rem;">
            <strong>${edu.degree}</strong><br/>
            ${edu.institution} | ${edu.startYear} - ${edu.endYear}<br/>
            ${edu.gpa ? `CGPA: ${edu.gpa}` : ""}
          </div>
        `).join("")}
      </div>
    ` : ""}

    ${content.skills ? `
      <div class="section">
        <h2>Skills</h2>
        <div>
          ${(typeof content.skills === "string"
        ? content.skills.split("\n")
        : content.skills).map((skill: string) =>
          `<span class="tag">${skill.trim()}</span>`
        ).join("")}
        </div>
      </div>
    ` : ""}

    ${content.projects?.length ? `
      <div class="section">
        <h2>Projects</h2>
        ${content.projects.map((proj: any) => `
          <div style="margin-bottom: 1rem;">
            <strong>${proj.title}</strong> (${proj.startDate || ""} - ${proj.endDate || ""})<br/>
            ${proj.link ? `<a href="${proj.link}" style="color:#2563EB;">${proj.link}</a><br/>` : ""}
            <div>${proj.description}</div>
          </div>
        `).join("")}
      </div>
    ` : ""}

    ${content.extras &&
      (content.extras.hobbies || content.extras.achievements || content.extras.certifications)
      ? `
        <div class="section">
          <h2>Extras</h2>
          ${content.extras.achievements ? `
            <div><strong>Achievements</strong><br/>${content.extras.achievements}</div>
          ` : ""}
          ${content.extras.certifications ? `
            <div><strong>Certifications</strong><br/>${content.extras.certifications}</div>
          ` : ""}
          ${content.extras.hobbies ? `
            <div><strong>Hobbies</strong><br/>${content.extras.hobbies}</div>
          ` : ""}
        </div>
      ` : ""
    }

    ${content.extracurricular ? `
      <div class="section">
        <h2>Extra-Curricular Activities</h2>
        <div>${content.extracurricular.replace(/\n/g, "<br/>")}</div>
      </div>
    ` : ""}

  </body>
  </html>
  `;
}