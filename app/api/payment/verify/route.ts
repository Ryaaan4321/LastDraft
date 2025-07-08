import { type NextRequest, NextResponse } from "next/server"
import client from '@/app/db'
import crypto from "crypto"
import { PaymentStatus } from "@prisma/client"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentType, resumeId } = await request.json()
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token || !process.env.SECRET_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        let user: jwt.JwtPayload;
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
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
        }

        // Update payment status
        await client.payment.updateMany({
            where: {
                razorpayOrderId: razorpay_order_id,
                userId: user.id,
            },
            data: {
                razorpayPaymentId: razorpay_payment_id,
                status: PaymentStatus.COMPLETED,
                updatedAt: new Date(),
            },
        });
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Payment verification error:", error)
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}
