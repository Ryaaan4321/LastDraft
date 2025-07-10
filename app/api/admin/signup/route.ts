import { NextRequest, NextResponse } from "next/server";
import client from '@/app/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const cookiestore = await cookies();
        const hashedpassword = await bcrypt.hashSync(body.password, 10);
        const response = await client.admin.create({
            data: {
                id: uuidv4(),
                email: body.email,
                password: hashedpassword,
                fullName: body.fullName
            }
        })
        if (!process.env.SECRET_KEY) throw new Error("secret key is not defined");
        const token = jwt.sign({ id: response.id, email: response.email,role:"admin" }, process.env.SECRET_KEY, { expiresIn: "1h" });
        cookiestore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/",
        });
        return NextResponse.json({ response, token }, { status: 201 })
    } catch (e: any) {
        return NextResponse.json({ msg: e.message || "error in the admin signup func" }, { status: 500 });
    }
}