"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Sparkles, ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"

export default function AIBulletsPage() {
    const params = useParams()
    const router = useRouter()
    const [jobTitle, setJobTitle] = useState("")
    const [company, setCompany] = useState("")
    const [description, setDescription] = useState("")
    const [bulletPoints, setBulletPoints] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const resumeId = params.id as string
 
    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/getuser")
            if (!res.ok) {
                router.push("/auth/signin")
                return
            }
            const data = await res.json()
            setUser(data.user)
        }
        checkAuth()
    }, [])

    const generateBulletPoints = async () => {
        if (!jobTitle.trim()) {
            toast.error("Please enter a job title")
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/ai/bulletpoints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobTitle,
                    company,
                    description,
                    resumeId,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                if (response.status === 402) {
                    toast.error("Payment required for AI features")
                    router.push(`/payment?type=ai_bullets&resumeId=${resumeId}`)
                    return
                }
                throw new Error(result.error)
            }

            setBulletPoints(result.bulletPoints)
            toast.success("Bullet points generated successfully!")
        } catch (error) {
            toast.error("Failed to generate bullet points")
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (!bulletPoints.trim()) return
        navigator.clipboard.writeText(bulletPoints.replace(/<[^>]*>/g, ""))
        toast.success("Bullet points copied to clipboard!")
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href={`/resume/${resumeId}`}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Resume
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                AI Bullet Points Generator
                            </CardTitle>
                            <CardDescription>
                                Provide job details to generate professional bullet points for your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Job Title *</Label>
                                <Input
                                    id="jobTitle"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="e.g., Software Engineer"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g., Google"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Current Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your current responsibilities and achievements..."
                                    rows={4}
                                />
                            </div>

                            <Button onClick={generateBulletPoints} disabled={loading} className="w-full">
                                <Sparkles className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                                {loading ? "Generating..." : "Generate Bullet Points"}
                            </Button>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Bullet Points</CardTitle>
                            <CardDescription>AI-generated professional bullet points for your resume</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {bulletPoints ? (
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: bulletPoints }} />
                                    <div className="flex gap-2">
                                        <Button onClick={copyToClipboard} variant="outline">
                                            Copy to Clipboard
                                        </Button>
                                        <Link href={`/resume/${resumeId}`}>
                                            <Button className="cursor-pointer">Back to Resume</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Generated bullet points will appear here</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
