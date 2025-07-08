import Razorpay from "razorpay"
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from "next/headers"
import client from '@/app/db'
import jwt from 'jsonwebtoken'
import { PaymentType as DbPaymentType } from "@prisma/client"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Define client-side payment types
type ClientPaymentType = "download" | "ai_bullets";

// Conversion function
function toDbPaymentType(clientType: ClientPaymentType): DbPaymentType {
    switch (clientType) {
        case "download": return "DOWNLOAD";
        case "ai_bullets": return "AI_BULLETS";
        default: throw new Error(`Invalid payment type: ${clientType}`);
    }
}

export async function POST(request: NextRequest) {
    try {
        const { amount, currency, paymentType: clientPaymentType, resumeId } = await request.json()
        
        // Validate and convert payment type
        const paymentType = toDbPaymentType(clientPaymentType as ClientPaymentType);
        
        console.log("Received payment type:", clientPaymentType);
        console.log("Converted to DB payment type:", paymentType);

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

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,
        })

        const now = new Date().toISOString()
        await client.payment.create({
            data: {
                userId: user.id,
                resumeId,
                paymentType, // Use the converted type
                amount: amount * 100,
                currency: currency || "INR",
                razorpayOrderId: order.id,
                status: "PENDING",
                updatedAt: now,
                createdAt: now
            },
        });

        return NextResponse.json({
            success: true,
            data: order,
        })
    } catch (error) {
        console.error("Payment creation error:", error)
        return NextResponse.json({ 
            success: false, 
            error: "Internal server error",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 })
    }
}