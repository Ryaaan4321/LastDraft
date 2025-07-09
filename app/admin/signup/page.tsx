"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react'

export default function Page() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showpassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, fullName }),
                credentials: "include",
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || "Signup failed");
            }
            toast.success("Signup successful!");
            router.push("/admin");
        } catch (error: any) {
            toast.error(error.message || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-6 bg-white border rounded shadow">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome to    
                        <Link href='/'>
                        <span className="text-2xl font-bold text-[#FA6600] underline cursror-pointer">LastDraft</span>
                    </Link></h1>
                    <Label className="text-center flex justify-center ">Admin Side</Label>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder="you"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                type={showpassword ? "text" : "password"}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#FA6600", color: "white" }}
                >
                    {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                    {isLoading ? "Creating account..." : "Sign Up"}
                </Button>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/admin/signin" className="text-[#FA6600] font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}
