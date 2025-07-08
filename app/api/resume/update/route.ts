

import { NextResponse } from "next/server";
import client from "@/app/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, title, content } = body;

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token || !process.env.SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        let user: jwt.JwtPayload
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
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }
        const updated = await client.resume.update({
            where: { id, userId: user.id },
            data: {
                title,
                content,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, resume: updated });
    } catch (err) {
        console.error("Resume update error", err);
        return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
    }
}
