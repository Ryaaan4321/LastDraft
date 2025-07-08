// app/api/test/route.ts

import { NextResponse } from "next/server"
import { getCurrentUserForApi } from "@/utils/auth/getCurrenUser"

export async function GET() {
  const user =await getCurrentUserForApi()
  return NextResponse.json({ user })
}
