import client from '@/app/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const aiusers = await client.payment.findMany({
            where: {
                paymentType: 'AI_BULLETS',
                status: 'COMPLETED'
            },
            select: {
                id: true,
                paymentType: true,
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                },
                resume: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
        })
        return NextResponse.json({ success: true, msg: 'Fetched all the usrs with the ai featue', aiusers }, { status: 200 })
    } catch (e: any) {
        return NextResponse.json(
            { success: false, msg: 'Something went wrong', e: e.message },
            { status: 500 }
        );
    }
}