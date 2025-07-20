import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token || !process.env.SECRET_KEY) {
        return NextResponse.json({ alreadyPaid: false })
    }
    const user = jwt.verify(token, process.env.SECRET_KEY!) as { id: string }
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const resumes = await client.resume.findMany({
            where: { userId: user.id },
        
            orderBy: { updatedAt: "desc" }
        })
        return NextResponse.json(resumes);
    } catch (e: any) {
        return NextResponse.json({ error: "failed to fetch the resumes" }, { status: 500 });

    }
}