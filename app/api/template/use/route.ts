// /app/api/templates/use/route.ts
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import client from "@/app/db"
import { resumeTemplates } from "@/utils/data/templates"

console.log("this route function got called")
export async function POST(req: NextRequest) {
  try {
    const { templateId } = await req.json()
    const cookieStore = cookies()
    const token = (await cookieStore).get("token")?.value

    if (!token || !process.env.SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const template = resumeTemplates.find(t => t.id === templateId)
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }
    console.log("decoded id = ",decoded.id)
    const newResume = await client.resume.create({
      data: {
        userId: decoded.id,
        title: `${template.title} Resume`,
        content: template.content,
        templateId: template.id,
      },
    })

    return NextResponse.json({ success: true, resumeId: newResume.id })
  } catch (error) {
    console.error("Error using template:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
