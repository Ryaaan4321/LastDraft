"use client"

import { FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useUser } from "@/hooks/user.hooks"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Header() {
    const { userData, userLoading } = useUser()
    const router = useRouter()

    const signOut = async () => {
        try {
            const res = await fetch("/api/signout", {
                method: "POST",
                credentials: "include",
            })

            const data = await res.json()
            if (res.ok) {
                toast.success(data.message || "Signed out")
                router.push("/auth/signin")
            } else {
                toast.error(data.error || "Failed to sign out")
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href='/'>
                        <div className="flex items-center">
                            <FileText className="h-8 w-8 text-[#FA6600]" />
                            <span className="ml-2 text-xl font-semibold text-gray-900">LastDraft</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                            DashBoard
                        </Link>
                        <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Templates
                        </Link>
                        <Link href="/edit-profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Profile
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link href={userData ? "/resume/new" : "/auth/signin"}>
                            <Button className="bg-[#FA6600] hover:bg-[#E55A00] text-white cursor-pointer">
                                Get Started
                            </Button>
                        </Link>

                        {userData ? (
                            <Button
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                                onClick={signOut}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link href="/auth/signin">
                                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
