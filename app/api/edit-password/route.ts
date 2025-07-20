// app/api/account/edit-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import client from "@/app/db"
import { getCurrentUser } from "@/app/actions/auth.actions"

export async function POST(req: NextRequest) {
    try {
        const sessionUser = await getCurrentUser()
        if (!sessionUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const user = await client.profile.findUnique({ where: { id: sessionUser.id } });
        console.log("user = ",user);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const { currentPassword, newPassword } = await req.json()

        // 1. Validate inputs
        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        // 2. Check if current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
        }

        // 3. Hash new password and update
        const hashed = await bcrypt.hash(newPassword, 10)
        await client.profile.update({
            where: { id: user.id },
            data: { password: hashed }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("Change password error:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
