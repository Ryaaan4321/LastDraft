import { type NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import client from '@/app/db'
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token || !process.env.SECRET_KEY) {
            return NextResponse.json({ err: "Unauthorized" }, { status: 401 })
        }
        let user: jwt.JwtPayload;
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

        const { title } = await request.json()
        const resume = await client.resume.create({
            data: {
                userId: user.id,
                title: title || "Untitled Resume",
                content: {
                    personalInfo: {},
                    experience: [],
                    education: [],
                    skills: [],
                    projects: [],
                },
            },
        })

        return NextResponse.json({ success: true, resume })
    } catch (error) {
        console.error("Resume creation error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
