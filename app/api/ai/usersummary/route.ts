import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import client from "@/app/db"

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const { experiences, projects, resumeId } = await request.json();
        const token = cookieStore.get("token")?.value;

        if (!token || !process.env.SECRET_KEY) {
            return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
        }

        let user: jwt.JwtPayload;
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!);
            if (typeof decoded === "string") {
                return NextResponse.json({ err: "Invalid token payload" }, { status: 401 });
            }
            user = decoded;
        } catch {
            return NextResponse.json({ err: "Invalid token" }, { status: 401 });
        }

        if (!user) {
            return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
        }

        const expText = experiences.map((exp: any) => `${exp.jobTitle} at ${exp.company}: ${exp.description}`).join("\n");
        const projText = projects.map((proj: any) => `${proj.projectName} using ${proj.techStack}: ${proj.summary}`).join("\n");

        const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: `Generate a short professional summary for a software developer's resume based on the following information:

Work Experiences:
${expText}

Projects:
${projText}

Requirements:
- 3 to 5 lines total
- Highlight key skills, technologies, and achievements
- Use professional language and a confident tone
- Focus on the candidate’s overall value as a developer`
        });

        await client.aiUsage.create({
            data: {
                userId: user.id,
                resumeId,
                usageType: "BULLET_POINTS",
                tokensUsed: text.length,
                cost: 10,
            },
        });

        return NextResponse.json({ success: true, summary: text });
    } catch (err: any) {
        console.error("AI summary error:", err);
        return NextResponse.json({ err: "Internal server error" }, { status: 500 });
    }
}
