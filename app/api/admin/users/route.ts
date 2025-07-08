import client from '@/app/db'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export interface AdminPayLoad {
    id: string
}

export async function GET() {
    try {
        const users = await client.profile.findMany();
        return NextResponse.json({ success: true, data: users });
    }catch(e:any){
        return NextResponse.json({success:false,msg:e.message});
    }
}
