import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const cookiestore = await cookies();
        const body = await req.json();
        const isuser = await client.profile.findUnique({
            where: {
                email: body.email
            }
        })
        if (!isuser) {
            return NextResponse.json({ msg: "user is not found with this email" }, { status: 401 });
        }
        const isvaliduser = await bcrypt.compare(body.password, isuser.password);
        if (!isvaliduser) {
            return NextResponse.json({ msg: "your passowrd is wrong" }, { status: 401 });
        }
        if (!process.env.SECRET_KEY) throw new Error("secret key is not defined");
        const { password, ...userwithoutpassword } = isuser;
        const token = jwt.sign(
            { id: isuser.id, email: isuser.email, role: "user", },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        cookiestore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 120 * 120,
            path: "/",
        });
        return NextResponse.json({ userwithoutpassword, token }, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ msg: e.message || "error in the admin signin func" }, { status: 500 });
    }
}