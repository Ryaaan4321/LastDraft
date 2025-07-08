import client from '@/app/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const totalEarnings = await client.payment.aggregate({
            where: {
                status: 'COMPLETED',
            },
            _sum: {
                amount: true,
            },
        });
        return NextResponse.json({success:true,msg:"fetched the total amount",totalEarnings},{status:200});
    } catch (e: any) {

    }
}