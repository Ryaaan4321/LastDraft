import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

console.log("get user route got called");
export async function GET() {
    try {
        const cookiestore = cookies();
        const token = (await cookiestore).get("token")?.value;

        if (!token) {
            return NextResponse.json({ msg: "Unauthorized: No token found" }, { status: 401 });
        }

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) as {
            id: string;
            email: string;
            role: string;
            fullname:string
        };
        return NextResponse.json({
            user: {
                id: decoded.id,
                email: decoded.email,
                fullname:decoded.fullname,
                role: decoded.role,
            },
        }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ msg: e.message || "Failed to get current user" }, { status: 401 });
    }
}
