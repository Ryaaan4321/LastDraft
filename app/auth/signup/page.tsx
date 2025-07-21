"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

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
            const response = await fetch("/api/signup", {
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
            router.push("/");
        } catch (error: any) {
            toast.error(error.message || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow"
            >
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome to{" "}
                        <Link href="/">
                            <span className="text-2xl font-bold text-[#FA6600] underline cursor-pointer">LastDraft</span>
                        </Link>
                    </h1>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="dark:text-gray-200">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder="John Doe"
                            onChange={(e) => setFullName(e.target.value)}
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            onChange={(e) => setemail(e.target.value)}
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                        <div className="relative">
                            <Input
                                type={showpassword ? "text" : "password"}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#FA6600] text-white hover:bg-[#e05500] dark:hover:bg-[#e05500]"
                >
                    {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                    {isLoading ? "Creating account..." : "Sign Up"}
                </Button>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-[#FA6600] font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}
