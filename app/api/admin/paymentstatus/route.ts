import client from '@/app/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const payments = await client.payment.findMany({
            where: {
                status: {
                    in: ['COMPLETED', 'FAILED', 'PENDING'],
                },

            },
            select: {
                id: true,
                userId: true,
                resumeId: true,
                paymentType: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(
            { success: true, msg: 'Fetched payments', payments },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { success: false, msg: 'Something went wrong', err: err.message },
            { status: 500 }
        );
    }
}
