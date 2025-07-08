import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import client from '@/app/db'
import { PaymentType, PaymentStatus } from "@prisma/client"

console.log("download route got called ")
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    let user: jwt.JwtPayload;
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value
    const resumeId = params.id
    console.log("Extracted resumeId:", resumeId)
    // console.log("payment from the route download id = ", payment);
    if (!resumeId) {
      return NextResponse.json({ error: "Resume ID is required" }, { status: 400 })
    }
    if (!token || !process.env.SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!)
      if (typeof decoded === "string") {
        return NextResponse.json({ error: "Invalid token payload" }, { status: 401 })
      }
      user = decoded
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // Check if user has paid for download
    const payment = await client.payment.findFirst({
      where: {
        userId: user.id,
        resumeId: resumeId,
        paymentType: "DOWNLOAD",
        status: "COMPLETED"
      }
    });


    if (!payment) {
      return NextResponse.json({ error: "Payment required" }, { status: 402 })
    }

    const resume = await client.resume.findFirst({
      where: {
        id: resumeId,
        userId: user.id,
      },
      include: {
        payments: {
          where: {
            paymentType: {
              in: [PaymentType.AI_BULLETS, PaymentType.DOWNLOAD],
            },
            status: PaymentStatus.COMPLETED
          }
        }
      }
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Create HTML content for PDF
    const htmlContent = generateResumeHTML(resume)

    await page.setContent(htmlContent)
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    })

    await browser.close()

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resume.title}.pdf"`,
      },
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateResumeHTML(resume: any) {
  const { content } = resume

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${resume.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          font-size: 2.5em;
          color: #2c3e50;
        }
        .contact-info {
          margin-top: 10px;
          font-size: 1.1em;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          color: #2c3e50;
          border-bottom: 1px solid #bdc3c7;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .experience-item, .education-item {
          margin-bottom: 20px;
        }
        .experience-header, .education-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 5px;
        }
        .job-title, .degree {
          font-weight: bold;
          font-size: 1.1em;
        }
        .company, .institution {
          color: #7f8c8d;
          font-style: italic;
        }
        .date {
          color: #95a5a6;
          font-size: 0.9em;
        }
        .description {
          margin-top: 10px;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin-bottom: 5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${content.personalInfo?.fullName || "Resume"}</h1>
        <div class="contact-info">
          ${content.personalInfo?.email ? `${content.personalInfo.email}` : ""}
          ${content.personalInfo?.phone ? ` • ${content.personalInfo.phone}` : ""}
          ${content.personalInfo?.location ? ` • ${content.personalInfo.location}` : ""}
        </div>
      </div>

      ${content.personalInfo?.summary
      ? `
        <div class="section">
          <h2>Professional Summary</h2>
          <div>${content.personalInfo.summary}</div>
        </div>
      `
      : ""
    }

      ${content.experience && content.experience.length > 0
      ? `
        <div class="section">
          <h2>Experience</h2>
          ${content.experience
        .map(
          (exp: any) => `
            <div class="experience-item">
              <div class="experience-header">
                <div>
                  <div class="job-title">${exp.title || ""}</div>
                  <div class="company">${exp.company || ""}</div>
                </div>
                <div class="date">${exp.startDate || ""} - ${exp.endDate || ""}</div>
              </div>
              ${exp.description ? `<div class="description">${exp.description}</div>` : ""}
            </div>
          `,
        )
        .join("")}
        </div>
      `
      : ""
    }

      ${content.education && content.education.length > 0
      ? `
        <div class="section">
          <h2>Education</h2>
          ${content.education
        .map(
          (edu: any) => `
            <div class="education-item">
              <div class="education-header">
                <div>
                  <div class="degree">${edu.degree || ""}</div>
                  <div class="institution">${edu.institution || ""}</div>
                </div>
                <div class="date">${edu.startYear || ""} - ${edu.endYear || ""}</div>
              </div>
            </div>
          `,
        )
        .join("")}
        </div>
      `
      : ""
    }

      ${content.skills
      ? `
        <div class="section">
          <h2>Skills</h2>
          <div>${content.skills}</div>
        </div>
      `
      : ""
    }

      ${content.projects
      ? `
        <div class="section">
          <h2>Projects</h2>
          <div>${content.projects}</div>
        </div>
      `
      : ""
    }
    </body>
    </html>
  `
}
