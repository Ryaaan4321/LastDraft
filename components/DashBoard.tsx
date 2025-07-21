"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    PlusCircle,
    MoreHorizontal,
    FileText,
    Calendar,
    Edit3,
    Trash2,
    Download,
    Eye,
    Sparkles,
    TrendingUp,
} from "lucide-react"
import { useResumes } from "@/hooks/user.hooks"
import Link from "next/link"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const { resumes, loading, error } = useResumes()
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this resume?")) return

        setDeletingId(id)
        try {
            const res = await fetch(`/api/resume/${id}/delete`, {
                method: "DELETE",
            })
            if (!res.ok) {
                const error = await res.json()
                toast.error(error.error || "Failed to delete resume")
            } else {
                toast.success("Resume deleted")
                router.refresh()
            }
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong")
        } finally {
            setDeletingId(null)
        }
    }

    const cardColors = [
        {
            gradient: "from-orange-500 to-pink-500",
            bg: "bg-orange-50",
            border: "border-orange-200",
            text: "text-orange-600",
            hover: "hover:border-orange-300",
        },
        {
            gradient: "from-blue-500 to-cyan-500",
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-600",
            hover: "hover:border-blue-300",
        },
        {
            gradient: "from-purple-500 to-indigo-500",
            bg: "bg-purple-50",
            border: "border-purple-200",
            text: "text-purple-600",
            hover: "hover:border-purple-300",
        },
        {
            gradient: "from-emerald-500 to-teal-500",
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-600",
            hover: "hover:border-emerald-300",
        },
        {
            gradient: "from-rose-500 to-orange-500",
            bg: "bg-rose-50",
            border: "border-rose-200",
            text: "text-rose-600",
            hover: "hover:border-rose-300",
        },
        {
            gradient: "from-slate-600 to-gray-700",
            bg: "bg-slate-50",
            border: "border-slate-200",
            text: "text-slate-600",
            hover: "hover:border-slate-300",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200/20 to-pink-200/20 dark:from-orange-400/10 dark:to-pink-400/10 rounded-full blur-3xl" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 dark:from-purple-400/10 dark:to-indigo-400/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg">
                                <FileText className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        Your Resume Dashboard
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                        Manage, edit, and create professional resumes that get you hired
                    </p>

                    {Array.isArray(resumes) && resumes.length > 0 && (
                        <div className="flex justify-center space-x-8 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    {resumes.length}
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-300">Total Resumes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    {resumes.filter((r) => new Date(r.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-300">Updated This Week</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    100%
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-300">ATS Compatible</div>
                            </div>
                        </div>
                    )}

                    <Link href="/templates">
                        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <PlusCircle className="w-6 h-6 mr-3" />
                            Create New Resume
                            <Sparkles className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>

                {Array.isArray(resumes) && resumes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resumes.map((resume, index) => {
                            const colors = cardColors[index % cardColors.length]
                            return (
                                <Card
                                    key={resume.id}
                                    className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm ${colors.hover}`}
                                >
                                    <div className={`h-1 bg-gradient-to-r ${colors.gradient} group-hover:h-2 transition-all duration-300`} />
                                    <CardHeader className="relative">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-3 ${colors.bg} rounded-xl`}>
                                                    <FileText className={`w-6 h-6 ${colors.text}`} />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-slate-900">
                                                        Resume #{resume.id.slice(-4)}
                                                    </CardTitle>
                                                    <p className="text-sm text-slate-500 dark:text-slate-300">Professional Resume</p>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <MoreHorizontal className="w-5 h-5 text-slate-400 dark:text-slate-300 cursor-pointer hover:text-slate-600 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <div className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-medium rounded-full`}>
                                                Active
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                                            <Calendar className="w-4 h-4" />
                                            <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                                        </div>

                                        <div className="flex gap-2 pt-4">
                                            <Link href={`/resume/${resume.id}`} className="flex-1">
                                                <Button
                                                    size="sm"
                                                    className={`w-full bg-gradient-to-r ${colors.gradient} hover:shadow-lg text-white font-medium cursor-pointer transition-all duration-300`}
                                                >
                                                    <Edit3 className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </Link>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer bg-transparent"
                                                disabled={deletingId === resume.id}
                                                onClick={() => handleDelete(resume.id)}
                                            >
                                                {deletingId === resume.id ? (
                                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="relative inline-block mb-8">
                            <div className="p-8 bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-800 dark:to-blue-900 rounded-3xl">
                                <FileText className="w-16 h-16 text-slate-400 dark:text-slate-300 mx-auto" />
                            </div>
                            <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full">
                                <PlusCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">No resumes yet</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
                            Start building your professional resume today. Choose from our collection of expertly designed templates.
                        </p>
                        <Link href="/templates">
                            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <PlusCircle className="w-6 h-6 mr-3" />
                                Create Your First Resume
                                <TrendingUp className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                )}

                {Array.isArray(resumes) && resumes.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg">
                            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mr-4">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-left">
                                <p className="text-emerald-800 dark:text-emerald-300 font-semibold">Pro Tip</p>
                                <p className="text-emerald-700 dark:text-emerald-200 text-sm">
                                    Keep your resumes updated and tailor them for each job application
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
