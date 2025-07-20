import { redirect } from "next/navigation"
import { ResumeBuilder } from "@/components/ResumeBuilder"
import client from "@/app/db" // Prisma client
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { getCurrentUser } from "@/app/actions/auth.actions"

interface ResumePageProps {
    params: { id: string }
}
export default async function ResumePage({ params }: ResumePageProps) {
    const user = await getCurrentUser();
    if (!user) {
        return ("/auth/signin");
    }
    const resume = await client.resume.findFirst({
        where: {
            id: params.id,
            userId: user.id,
        },
    })

    if (!resume) {
        redirect("/")
    }

    return <ResumeBuilder resume={{
        id: resume.id,
        title: resume.title,
        content: resume.content,
        userid: resume.userId,
        lastEditedSection: resume.lastEditedSection || ""
    }} />
}
