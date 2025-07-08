import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const cookiestore = await cookies();
        const body = await req.json();
        const isadmin = await client.admin.findUnique({
            where: {
                email: body.email
            }
        })
        if (!isadmin) {
            return NextResponse.json({ msg: "user is not found with this email" }, { status: 401 });
        }
        const isvaliduser = await bcrypt.compare(body.password, isadmin.password);
        if (!isvaliduser) {
            return NextResponse.json({ msg: "your passowrd is wrong" }, { status: 401 });
        }
        if (!process.env.SECRET_KEY) throw new Error("secret key is not defined");
        const { password, ...adminwithoutpassword } = isadmin;
        const token = jwt.sign(
            { id: isadmin.id, email: isadmin.email, role: "admin", },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        cookiestore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/",
        });
        return NextResponse.json({ adminwithoutpassword, token }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ msg: e.message || "err in the admin signin func" }, { status: 500 });
    }
}