"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react'

export default function Page() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showpassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Signin failed");
            }

            toast.success("Signin successful!");
            router.push("/");
        } catch (error: any) {
            toast.error(error.message || "Signin failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 w-full max-w-md border rounded shadow "
            >
                <h3 className="text-xl font-semibold text-center">Welcome to the <span className="text-2xl font-bold text-[#FA6600] underline cursror-pointer">LastDraft</span></h3>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        required
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="you@gmail.com"
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

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: "#FA6600", color: "white" }}
                >
                    {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                    {isLoading ? "Signing in..." : "Signin"}
                </Button>

                <p className="text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link href="/auth/signup" className="text-[#FA6600] font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
