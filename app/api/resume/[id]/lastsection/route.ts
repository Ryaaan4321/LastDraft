import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db'
export async function PATCH(request: NextRequest,{ params }: { params: { id: string } }) {
    try{
        const {section}=await request.json();
        const resumeId=params.id;
        const updated=await client.resume.update({
            where:{id:resumeId},
            data:{lastEditedSection:section}
        })
        
        return NextResponse.json({success:true});
    }catch(e:any){
        return NextResponse.json({success:false})
    }
}