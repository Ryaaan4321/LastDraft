import client from '@/app/db'
import { NextResponse } from 'next/server'

export async function  GET() {
    try{
        const paidusers=await client.profile.findMany({
            where:{
                payments:{
                    some:{
                        status:'COMPLETED',
                        paymentType:{
                            in:['DOWNLOAD', 'AI_BULLETS'],
                        }
                    },
                    
                }
            },
            include:{
                payments:true
            }
        })
        return NextResponse.json({success:true,msg:"fetched all the paid users",paidusers},{status:200});
    }catch(e:any){
        return NextResponse.json({success:false,msg:"sorry we are doing something wrong"},{status:404})
    }
}