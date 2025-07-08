import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import client from '@/app/db'

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const { jobTitle, company, description, resumeId } = await request.json()
        const token = cookieStore.get("token")?.value
        if (!token || !process.env.SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        let user: jwt.JwtPayload;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!)
            if (typeof decoded === "string") {
                return NextResponse.json({ error: "Invalid token payload" }, { status: 401 })
            }
            user=decoded
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        console.log()
        const payment = await client?.payment.findFirst({
            where: {
                userId: user.id,
                resumeId,
                paymentType:"AI_BULLETS",
                status: "COMPLETED",
            },
        })

        if (!payment) {
            return NextResponse.json({ error: "Payment required for AI features" }, { status: 402 })
        }

        // Generate bullet points using AI
        const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: `Generate 3-5 professional bullet points for a resume based on the following job information:
      
      Job Title: ${jobTitle}
      Company: ${company}
      Current Description: ${description || "No description provided"}
      
      Requirements:
      - Use action verbs to start each bullet point
      - Include quantifiable achievements where possible
      - Keep each bullet point concise (1-2 lines)
      - Focus on accomplishments and impact
      - Use professional language suitable for a resume
      
      Format the response as HTML with <ul> and <li> tags.`,
        })
        await client.aiUsage.create({
            data: {
                userId: user.id,
                resumeId,
                usageType: "BULLET_POINTS",
                tokensUsed: text.length,
                cost: 10,
            },
        })
        return NextResponse.json({ success: true, bulletPoints: text })
    } catch (error) {
        console.error("AI bullet points error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
