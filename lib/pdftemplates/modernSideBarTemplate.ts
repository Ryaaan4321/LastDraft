export function generateSidebarHTML(resume: any): string {
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
    <div style="background-color: white; width: 100%; max-width: 900px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden; font-family: 'Inter', sans-serif;">
      <div style="display: flex; min-height: 800px;">
        
        <!-- Sidebar -->
        <div style="width: 33.33%; background-color: #374151; color: white; padding: 24px;">
          
          ${content.education?.length ? `
            <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #FB923C; margin-bottom: 16px;">Education</h2>
            ${content.education.map((edu: any) => `
              <div style="margin-bottom: 16px;">
                <div style="font-weight: bold; font-size: 13px; text-transform: uppercase;">${edu.degree}</div>
                <div style="font-size: 11px; color: #D1D5DB;">${edu.institution}</div>
                <div style="font-size: 11px; color: #D1D5DB;">${edu.startYear} - ${edu.endYear}</div>
                ${edu.gpa ? `<div style="font-size: 11px; color: #D1D5DB;">CGPA - ${edu.gpa}</div>` : ""}
              </div>
            `).join("")}
          ` : ""}

          ${content.skills ? `
            <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #FB923C; margin: 24px 0 16px;">Skills</h2>
            ${(typeof content.skills === "string" ? content.skills.split("\n") : content.skills).map((skill: string) => `
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 500; margin-bottom: 4px;">${skill.trim()}</div>
            `).join("")}
          ` : ""}
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

          ${content.extracurricular ? `
            <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #FB923C; margin: 24px 0 8px;">Extra-Curricular</h2>
            <div style="font-size: 11px; color: #D1D5DB;">${content.extracurricular.replace(/\n/g, "<br/>")}</div>
          ` : ""}
        </div>

        <!-- Main Section -->
        <div style="width: 66.66%; background-color: white; padding: 32px; color: #111827;">
          
          <div style="border-bottom: 1px solid #E5E7EB; padding-bottom: 16px;">
            <h1 style="font-size: 28px; font-weight: bold; text-transform: uppercase;">${content.personalInfo?.fullName || "Your Name"}</h1>
            ${content.personalInfo?.jobTitle ? `<h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; color: #FB923C; margin-top: 4px;">${content.personalInfo.jobTitle}</h2>` : ""}

            <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; font-size: 12px; color: #4B5563;">
              ${content.personalInfo?.phone ? `<div>📞 ${content.personalInfo.phone}</div>` : ""}
              ${content.personalInfo?.email ? `<div>✉ ${content.personalInfo.email}</div>` : ""}
              ${content.personalInfo?.location ? `<div>📍 ${content.personalInfo.location}</div>` : ""}
            </div>
          </div>

          ${content.experience?.length ? `
            <h2 style="font-size: 13px; font-weight: bold; text-transform: uppercase; color: #FB923C; border-bottom: 1px solid #FCD34D; margin-top: 24px; padding-bottom: 4px;">Work Experience</h2>
            ${content.experience.map((exp: any) => `
              <div style="margin-top: 16px;">
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    <div style="font-weight: bold; font-size: 13px;">${exp.title}</div>
                    <div style="font-size: 12px; color: #FB923C; font-weight: 500;">${exp.company}</div>
                  </div>
                  <div style="font-size: 11px; color: #6B7280;">${exp.startDate} - ${exp.endDate}</div>
                </div>
                <div style="font-size: 12px; color: #374151; margin-top: 4px;">${exp.description}</div>
              </div>
            `).join("")}
          ` : ""}

          ${content.personalInfo?.summary ? `
            <h2 style="font-size: 13px; font-weight: bold; text-transform: uppercase; color: #FB923C; border-bottom: 1px solid #FCD34D; margin-top: 24px; padding-bottom: 4px;">Summary</h2>
            <div style="font-size: 13px; margin-top: 6px;">${content.personalInfo.summary}</div>
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


          ${content.links && Object.keys(content.links).length ? `
            <h2 style="font-size: 13px; font-weight: bold; text-transform: uppercase; color: #FB923C; border-bottom: 1px solid #FCD34D; margin-top: 24px; padding-bottom: 4px;">Links</h2>
            ${Object.entries(content.links).map(([label, url]: any) => `
              <div style="font-size: 12px; color: #2563EB;"><strong>${label}:</strong> ${url}</div>
            `).join("")}
          ` : ""}

        </div>
      </div>
    </div>
        </body>
    </html>
  `;
}
