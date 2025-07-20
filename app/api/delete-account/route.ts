import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/app/actions/auth.actions"
import client from "@/app/db"
import { cookies } from "next/headers"

export async function DELETE(req: NextRequest) {
    try {
        const sessionUser = await getCurrentUser()
        if (!sessionUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        await client.profile.delete({
            where: { id: sessionUser.id },
        })
        const cookieStore = cookies()
        ;(await cookieStore).set({
            name: "token",
            value: "",
            path: "/",
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })

        return NextResponse.json({ success: true, message: "Account deleted" })
    } catch (err) {
        console.error("Delete account error:", err)
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 })
    }
}
