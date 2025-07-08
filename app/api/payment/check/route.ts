import { NextRequest, NextResponse } from "next/server"
import client from "@/app/db"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    const { resumeId, paymentType } = await request.json();
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token || !process.env.SECRET_KEY) {
        return NextResponse.json({ alreadyPaid: false })
    }
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY!) as { id: string }
        const existingpayment = await client.payment.findFirst({
            where: {
                userId: user.id,
                resumeId,
                paymentType: paymentType.toUpperCase,
                status: "COMPLETED"
            }
        })
        return NextResponse.json({ alreadyPaid: !!existingpayment })
    } catch (e: any) {
        return NextResponse.json({ alreadyPaid: false })

    }
}