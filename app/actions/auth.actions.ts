"use server"
import { cookies } from "next/headers"
import { jwtVerify } from 'jose'

export async function signup(data: { email: string; password: string; fullName: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.msg || "Signup failed");

  return json;
}

export async function login(email: string, password: string) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.msg || "Login failed");

  return json;
}


export interface JwtUserPayload {
  id: string
  email: string
  role?: string
  iat?: number
  exp?: number
}

export async function getCurrentUser(): Promise<JwtUserPayload | null> {
  try {
    // 1. Get cookies (synchronously)
    const cookiestore = cookies();
    const token = (await cookiestore).get("token")?.value;
  
    if (!token || !process.env.SECRET_KEY) {

      return null;
    }
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload !== "object" || !payload.id) {

      return null;
    }
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string,

      iat: payload.iat as number | undefined,
      exp: payload.exp as number | undefined
    };

  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

