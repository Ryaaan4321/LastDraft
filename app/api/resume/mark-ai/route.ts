// api/resume/mark-ai-used.ts
import { NextRequest, NextResponse } from "next/server";
import client from "@/app/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    const cookieStore=cookies();
    const { resumeId } = await request.json();
    const token = (await cookieStore).get("token")?.value;

    if (!token || !process.env.SECRET_KEY) {
        return NextResponse.json({ success: false });
    }
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY!) as { id: string };
        await client.resume.update({
            where: {
                id: resumeId,
                userId: user.id,
            },
            data:{
                aiUsed:true
            }
        });
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false });
    }
}
