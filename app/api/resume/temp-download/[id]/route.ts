import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import client from "@/app/db";
import { PaymentType, PaymentStatus } from "@prisma/client";
import { templateGenerators } from "@/lib/pdftemplates";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const resumeId = params.id;
        if (!resumeId) {
            return NextResponse.json({ error: "Resume ID is required" }, { status: 400 });
        }

        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;
        if (!token || !process.env.SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let user: jwt.JwtPayload;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (typeof decoded === "string") {
                return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
            }
            user = decoded;
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const aiUsageCount = await client.aiUsage.count({
            where: { userId: user.id, resumeId }
        });

        if (aiUsageCount > 0) {
            const payment = await client.payment.findFirst({
                where: {
                    userId: user.id,
                    resumeId,
                    paymentType: "DOWNLOAD",
                    status: "COMPLETED"
                }
            });
            if (!payment) {
                return NextResponse.json({ error: "Payment required due to AI usage" }, { status: 402 });
            }
        } else {
            const alreadyLoggedFree = await client.payment.findFirst({
                where: {
                    userId: user.id,
                    resumeId,
                    paymentType: "DOWNLOAD",
                    status: "COMPLETED",
                    amount: 0,
                },
            });
            if (!alreadyLoggedFree) {
                await client.payment.create({
                    data: {
                        userId: user.id,
                        resumeId,
                        paymentType: "DOWNLOAD",
                        amount: 0,
                        status: "COMPLETED",
                    },
                });
            }
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
                        status: PaymentStatus.COMPLETED,
                    },
                },
            },
        });

        if (!resume) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        const templateId = resume.templateId ?? "blue";
        const generator = templateGenerators[templateId];
        if (!generator) {
            return NextResponse.json({ error: `Template "${templateId}" not supported.` }, { status: 400 });
        }

        const htmlContent = generator(resume);

        const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${resume.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.5;
              background: white;
              width: 210mm;
              height: 297mm;
              margin: 0 auto;
              padding: 20mm;
            }
            .print-sidebar { background-color: #0e374e !important; color: white !important; }
            .print-orange { color: #FA6600 !important; }
            .print-orange-bg { background-color: #FA6600 !important; }
            .print-gray-light { color: #95a5a6 !important; }
            .print-gray-dark { color: #2c3e50 !important; }
            .resume-container {
              display: flex;
              min-height: 257mm;
            }
            .sidebar {
              width: 35%;
              padding: 15mm;
              background: #0e374e;
              color: white;
            }
            .main-content {
              width: 65%;
              padding: 15mm;
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${htmlContent}
          </div>
        </body>
      </html>
    `;
        const apiKey = process.env.PDFSHIFT_API_KEY;

        if (!apiKey) {
            console.error("PDFShift API key is missing");
            return NextResponse.json({ error: "PDFShift API key is not configured" }, { status: 500 });
        }
        const pdfResponse = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
            method: "POST",
            headers: {
                'X-API-Key': apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source: fullHTML,
                landscape: false,
                use_print: true,
                margin: "0",
            }),
        });


        if (!pdfResponse.ok) {
            const errorText = await pdfResponse.text();
            console.error("PDFShift Error:", errorText);
            return NextResponse.json({ error: "Failed to generate PDF with PDFShift" }, { status: 500 });
        }

        const pdfBuffer = await pdfResponse.arrayBuffer();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${resume.title.replace(/[^a-z0-9]/gi, '_')}.pdf"`,
            },
        });
    } catch (error) {
        console.error("PDF generation error:", error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
