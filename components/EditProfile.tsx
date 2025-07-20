"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Save } from "lucide-react"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EditProfile() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async () => {
        if (!currentPassword || !newPassword) {
            toast.error("Please fill in both fields")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/edit-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ currentPassword, newPassword }),
            })

            const data = await res.json()
            if (res.ok) {
                toast.success("Password updated successfully")
                router.push('/')
                setCurrentPassword("")
                setNewPassword("")
            } else {
                toast.error(data.error || "Failed to update password")
            }
        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    const handleDeleteAccount = async () => {
        const confirm = window.confirm("Are you sure you want to delete your account? This action is irreversible.")
        if (!confirm) return

        setLoading(true)
        try {
            const res = await fetch("/api/delete-account", {
                method: "DELETE",
                credentials: "include",
            })

            const data = await res.json()
            if (res.ok) {
                toast.success("Account deleted successfully")
                router.push("/")
            } else {
                toast.error(data.error || "Failed to delete account")
            }
        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <div className="flex ">
                        <h1 className="text-3xl font-bold text-gray-900">Edit Password</h1>
                    </div>
                    <div className="">
                        <Button
                            className="cursor-pointer"
                            variant={"destructive"}
                            onClick={handleDeleteAccount}
                        > {loading ? "Deleting..." : "Delete Account"}</Button>
                    </div>
                </div>

                <Card className="border-orange-200">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="website" className="text-gray-700">
                                Current Password
                            </Label>
                            <Input
                                id="website"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Current Password"
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="summary" className="text-gray-700">
                                New Password
                            </Label>
                            <Input
                                id="summary"
                                placeholder="New  Password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <Button
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent cursor-pointer"
                                onClick={() => {
                                    setCurrentPassword("")
                                    setNewPassword("")
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
