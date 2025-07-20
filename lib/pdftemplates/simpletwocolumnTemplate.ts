import { formatDate } from "../types";
export function generateSimpleTwoColumnHTML(resume: any): string {
  const escape = (str: string = "") =>
    str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
      <div style="max-width: 800px; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-size: 22px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">
            ${escape(content.personalInfo?.fullName || "Your Name")}
          </h1>
          <hr style="border: 0; height: 1px; background: black;" />
        </div>

        <div style="display: flex; gap: 40px;">
          <!-- Left Column -->
          <div style="width: 30%;">
            ${content.personalInfo?.location || content.personalInfo?.email || content.personalInfo?.phone ? `
              <h2>Contacts</h2>
              <div style="font-size:11px;color:#333;line-height:1.4;">
                ${content.personalInfo?.location ? `<div>📍 ${escape(content.personalInfo.location)}</div>` : ""}
                ${content.personalInfo?.email ? `<div>✉ ${escape(content.personalInfo.email)}</div>` : ""}
                ${content.personalInfo?.phone ? `<div>📞 ${escape(content.personalInfo.phone)}</div>` : ""}
              </div>
            ` : ""}

            ${content.education?.length ? `
              <h2>Education</h2>
              ${content.education.map((edu: any) => `
                <div style="font-size:11px;line-height:1.4;margin-bottom:8px;">
                  <strong style="text-transform:uppercase;">${escape(edu.degree)}</strong><br/>
                  ${escape(edu.institution)}<br/>
                  ${edu.startYear} - ${edu.endYear}<br/>
                  ${edu.gpa ? `CGPA - ${edu.gpa}` : ""}
                </div>
              `).join("")}
            ` : ""}

${content.skills?.length ? `
  <h2>Skills</h2>
  <div style="font-size:11px;color:#333;">
    ${(
        Array.isArray(content.skills)
          ? content.skills
          : (typeof content.skills === "string" ? content.skills.split("\n") : [])
      ).map((s: string) => `
      <div>${escape(s.trim())}</div>
    `).join("")}
  </div>
` : ""}
        ${(content.extras?.achievements || content.extras?.certifications || content.extras?.hobbies) ? `
  <h3 style="border-bottom: 2px solid; padding-bottom: 4px; margin-top: 20px;">Extras</h3>

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


            ${content.links && Object.keys(content.links).length ? `
              <h2>Links</h2>
              <div style="font-size:11px;color:#333;">
                ${Object.entries(content.links).map(([label]) => `
                  <div>${escape(label)}</div>
                `).join("")}
              </div>
            ` : ""}
          </div>

          <!-- Right Column -->
          <div style="width: 70%;">
            ${content.experience?.length ? `
              <h2>Work Experience</h2>
              ${content.experience.map((exp: any) => `
                <div style="font-size:11px;line-height:1.4;margin-bottom:12px;">
                  <div style="display:flex;justify-content:space-between;">
                    <div>
                      <strong style="text-transform:uppercase;">${escape(exp.title)}</strong><br/>
                      ${escape(exp.company)}
                    </div>
                    <div style="text-align:right;color:#666;">${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}
</div>
                  </div>
                  <div>${escape(exp.description)}</div>
                </div>
              `).join("")}
            ` : ""}
            ${content.projects?.length
      ? `
      <h2 style="font-size:14px;margin-bottom:8px;font-weight:bold;">Projects</h2>
      ${content.projects
        .map(
          (project: any) => `
          <div style="font-size:11px;line-height:1.4;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;">
              <div>
                <strong style="text-transform:uppercase;">${escape(project.title)}</strong><br/>
                ${project.link
              ? `<a href="${project.link}" style="font-size:10px;color:#2563eb;text-decoration:underline;" target="_blank">${project.link}</a>`
              : ""
            }
              </div>
              <div style="text-align:right;color:#666;">${project.startDate} - ${project.endDate}</div>
            </div>
            <div>${project.description || ""}</div>
          </div>
        `
        )
        .join("")}
    `
      : ""
    }


     ${content.summary ? `
  <h2>Summary</h2>
  <div style="font-size:11px;line-height:1.5;color:#333;">
    ${content.summary}
  </div>
` : ""}


            ${content.extracurricular ? `
              <h2>Extra-Curricular Activities</h2>
              <div style="font-size:11px;line-height:1.5;color:#333;">
                ${content.extracurricular
        .split("\n")
        .filter((line: string) => line.trim())
        .map((line: string) => {
          if (line.includes("•")) {
            const [title, desc] = line.split("•");
            return `<div style="margin-bottom:4px;"><strong>${escape(title.trim())}</strong><br/>• ${escape(desc.trim())}</div>`;
          }
          return `<div style="font-weight:bold;margin-bottom:4px;">${escape(line.trim())}</div>`;
        }).join("")}
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
