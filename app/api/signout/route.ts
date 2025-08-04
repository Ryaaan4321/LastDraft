import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
    const cookieStore = cookies()
    ;(await cookieStore).set({
        name: "token",
        value: "",
        path: "/",
        maxAge: 0, 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
    return NextResponse.json({ success: true, message: "Signed out successfully" })
}
