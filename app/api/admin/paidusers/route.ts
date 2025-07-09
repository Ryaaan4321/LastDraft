import client from '@/app/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const users = await client.profile.findMany({
            where: {
                payments: {
                    some: {
                        status: 'COMPLETED',
                        paymentType: {
                            in: ['DOWNLOAD', 'AI_BULLETS'],
                        },
                    },
                },
            },
            select: {
                id: true,
                email: true,
                payments: {
                    where: {
                        status: 'COMPLETED',
                        paymentType: {
                            in: ['DOWNLOAD', 'AI_BULLETS'],
                        },
                    },
                    select: {
                        paymentType: true,
                    },
                },
            },
        })
        const transformed = users.map((user) => {
            const uniqueTypes = Array.from(
                new Set(user.payments.map((p) => p.paymentType))
            )
            return {
                id: user.id,
                email: user.email,
                paymentTypes: uniqueTypes,
            }
        })

        return NextResponse.json(
            {
                success: true,
                msg: 'Fetched all paid users with unique payment types',
                paidusers: transformed,
            },
            { status: 200 }
        )
    } catch (e: any) {
        return NextResponse.json(
            {
                success: false,
                msg: 'Something went wrong',
                error: e.message,
            },
            { status: 500 }
        )
    }
}
