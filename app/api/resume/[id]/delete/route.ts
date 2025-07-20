import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const resumeId = params.id;
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value
    if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: string };
        const resume = await client.resume.findUnique({ where: { id: resumeId } });
        if (!resume || resume.userId !== decoded.id) {
            return NextResponse.json({ error: "not found or forbidden" }, { status: 403 });
        }
        await client.resume.delete({ where: { id: resumeId } });
        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error("error from the delte req = ",e.message);
        return NextResponse.json({ err: "internal server err" }, { status: 500 })
    }
}