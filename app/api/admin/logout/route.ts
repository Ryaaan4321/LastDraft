import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function  POST() {
    const response=NextResponse.json({success:true,msg:"logout succesfully"});
    const cookieStore=cookies();
    response.cookies.set("token","",{
        httpOnly:true,
        path:'/admin/signin',
        maxAge:0
    })
    return response
}