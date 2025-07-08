import client from '@/app/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const totalsByType = await client.payment.groupBy({
            by: ['paymentType'],
            where: {
                status: 'COMPLETED',
            },
            _sum: {
                amount: true,
            },
        });
        return NextResponse.json({success:true,msg:"fetched all the paid users",totalsByType},{status:200});
    } catch (e: any) {

    }
}

