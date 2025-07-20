import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import client from '@/app/db'

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const { projectName, resumeId } = await request.json()
        const token = cookieStore.get("token")?.value
        if (!token || !process.env.SECRET_KEY) {
            return NextResponse.json({ err: "Unauthorized" }, { status: 401 })
        }

        let user: jwt.JwtPayload;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!)
            if (typeof decoded === "string") {
                return NextResponse.json({ err: "Invalid token payload" }, { status: 401 })
            }
            user = decoded
        } catch {
            return NextResponse.json({ err: "Invalid token" }, { status: 401 })
        }

        if (!user) {
            return NextResponse.json({ err: "Unauthorized" }, { status: 401 })
        }

        const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: `Generate 3-5 professional bullet points to describe a software project for a resume.

Project Name: ${projectName}

Requirements:
- Begin each bullet point with an action verb
- Highlight key technical challenges, problem-solving, and outcomes
- Include metrics or features implemented where possible
- Keep each point 1-2 lines
- Maintain professional tone suitable for a resume
- `,
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
        console.log("projectbullet points = ",text)
        return NextResponse.json({ success: true, bulletPoints: text })
    } catch (err: any) {
        console.error("AI project bullets err:", err)
        return NextResponse.json({ err: "Internal server error" }, { status: 500 })
    }
}
