import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export interface AuthUser {
    id: string
    email: string
    role: string
    iat: number
    exp: number
}

export async function getCurrentUserForApi(): Promise<AuthUser | null> {
  // Get cookies (works in both Server Actions and API routes)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !process.env.SECRET_KEY) return null;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}

export async function getCurrentUserForServer(): Promise<AuthUser | null> {
  try {
    // 1. Get the cookie store
    const cookieStore = cookies();
    
    // 2. Retrieve the token exactly as set in the signin route
    const token = cookieStore.get("token")?.value;
   
    // 3. Validate presence of token and secret key (matches signin route check)
    if (!token || !process.env.SECRET_KEY) {
      return null;
    }

    // 4. Verify the token using the same method as signin route
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as AuthUser;
    
    
    
    return decoded;
    
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
