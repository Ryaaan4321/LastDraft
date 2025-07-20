"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Download, Sparkles, Cross, Ban, ArrowUpWideNarrow } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import TiptapEditor from "../ui/TipTapEditor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "../ui/label"
import { moveExperienceUp, moveExperienceDown } from "@/utils/movecomponents"
import { ArrowUp } from 'lucide-react';
import { ArrowDown } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import DatePicker from "react-datepicker"
import { Checkbox } from "@/components/ui/checkbox"


interface TemplateResumeBuilderProps {
    resume: {
        id: string
        content: any
        aiUsed: any
    }
    templateId: string
}

export default function TemplateResumeBuilder({ resume, templateId }: TemplateResumeBuilderProps) {
    const [title, setTitle] = useState("Untitled Resume")
    const [content, setContent] = useState(resume.content)
    const [saving, setSaving] = useState(false)
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("personal")
    const [TemplateComponent, setTemplateComponent] = useState<React.ComponentType<{ content: any }> | null>(null)
    const [manualSkill, setManualSkill] = useState("")
    const tabOrder = ["personal", "experience", "education", "skills", "projects", "summary"]


    useEffect(() => {
        async function loadTemplate() {
            let mod
            switch (templateId) {
                case "modern":
                    mod = await import('@/components/templates/SidebarLayoutTemplate')
                    break
                case "blue":
                    mod = await import('@/components/templates/BlueSidebarLayoutTemplate')
                    break
                case "minimalist":
                    mod = await import('@/components/templates/MinimalistLayoutTemplate')
                    break
                case "center":
                    mod = await import('@/components/templates/CenteredLayoutTemplate')
                    break
                case "twocolumn":
                    mod = await import('@/components/templates/SimpleTwoColumnTemplate')
                    break
                default:
                    return
            }
            setTemplateComponent(() => mod.default)
        }

        loadTemplate()
    }, [templateId])
    useEffect(() => {
        if (typeof content.skills === "string") {
            const normalized = content.skills
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            updateContent("skills", normalized)
        } else if (!Array.isArray(content.skills)) {
            updateContent("skills", [])
        }
    }, [])


    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/resume/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: resume.id,
                    title,
                    content,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success("Resume saved successfully")
        } catch (err) {
            toast.error("Failed to save resume")
        } finally {
            setSaving(false)
        }
    }

    const handleDownload = () => {
        console.log("resume ai used = ", resume.aiUsed);
        const isAIUsed = resume.aiUsed === true || resume.aiUsed === "true";
        if (!isAIUsed) {
            router.push(`/api/resume/download/${resume.id}`)
        } else {
            router.push(`/payment?type=download&resumeId=${resume.id}`)
        }
    }
    const handleAIBulletPoints = async (index: number) => {
        const exp = content.experience?.[index];
        const jobTitle = exp?.title || "";
        const company = exp?.company || "";
        if (!exp || !exp.title || !exp.company) {
            toast.error("Please fill in the job title and company before generating");
            return;
        }

        try {
            const res = await fetch("/api/ai/bulletpoints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: jobTitle,
                    company: company,
                    resumeId: resume.id,
                    descreption: ""
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.err || "Failed to generate bullet points");
            }
            const newExp = [...(content.experience || [])];
            newExp[index] = {
                ...newExp[index],
                description: data.bulletPoints,
            };
            updateContent("experience", newExp);
            await fetch('/api/resume/mark-ai', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ resumeId: resume.id })
            })
        } catch (err) {
            toast.error("Failed to generate description");
        }
    };
    const handleAiProject = async (index: number) => {
        const proj = content.projects?.[index];
        const projectName = proj?.title || "";
        if (!proj || !projectName) {
            toast.error("Please fill in the project Name before generating");
            return;
        }
        try {
            const res = await fetch("/api/ai/projectbullets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    resumeId: resume.id,
                    description: ""
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.err || "Failed to generate bullet points");
            }
            const newDescreption = [...(content.projects) || []]
            newDescreption[index] = {
                ...newDescreption[index],
                description: data.bulletPoints
            }
            console.log("new Descreption = ", newDescreption);
            updateContent("projects", newDescreption);
            await fetch('/api/resume/mark-ai', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ resumeId: resume.id })
            })
        } catch (e: any) {
            toast.error("Failed to generate description");
        }
    }
    const handleAiSummary = async () => {
        console.log("ai summary got called");
        try {
            const res = await fetch("/api/ai/usersummary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    experiences: content.experience,
                    projects: content.projects,
                    resumeId: resume.id
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.err || "Failed to generate summary");
            }
            const newSummary = data.summary;
            console.log("newsummary = ", newSummary);
            if (typeof newSummary !== "string") {
                throw new Error("Invalid summary format received from backend");
            }
            updateContent("summary", newSummary);
            await fetch('/api/resume/mark-ai', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ resumeId: resume.id })
            })
            toast.success("AI summary generated successfully");
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Failed to generate summary");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleSave()
        }, 30000)
        return () => clearInterval(interval)
    }, [content])
    const updateContent = (section: string, value: any) => {
        setContent((prev: any) => ({
            ...prev,
            [section]: value,
        }))
    }
    const handleMoveExperienceUp = (index: number) => {
        const updated = moveExperienceUp(content.experience || [], index);
        updateContent("experience", updated);
    };

    const handleMoveExperienceDown = (index: number) => {
        const updated = moveExperienceDown(content.experience || [], index);
        updateContent("experience", updated);
    };
    const handleMoveEducationUp = (index: number) => {
        const updated = moveExperienceUp(content.education || [], index);
        updateContent("education", updated);
    }
    const handleMoveEducationDown = (index: number) => {
        const updated = moveExperienceDown(content.education || [], index);
        updateContent("education", updated);
    }
    const handleMoveProjectUp = (index: number) => {
        const updated = moveExperienceUp(content.projects || [], index);
        updateContent("projects", updated)
    }
    const handleMoveProjectDown = (index: number) => {
        const updated = moveExperienceDown(content.projects || [], index);
        updateContent("projects", updated);
    }
    const updateExperienceDescription = (index: number, html: string) => {
        console.log("update ai descreption is called");
        const newExp = [...(content.experience || [])];
        newExp[index] = { ...newExp[index], description: html };
        console.log("nex exp from updateexpdescreptoon = ", newExp);
        // console.log("HTML = ", html);
        updateContent("experience", newExp);
    };
    const updateProjectDescription = (index: number, html: string) => {
        console.log("updateProjectDescription called");
        const newProjects = [...(content.projects || [])];
        newProjects[index] = {
            ...newProjects[index],
            description: html,
        };
        updateContent("projects", newProjects);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-xl font-semibold border-none shadow-none p-0 h-auto text-[#FA6600]"
                            placeholder="Resume Title"
                        />
                        <div className="flex gap-2">
                            {/* <Button className="bg-[#FA6600] hover:bg-[#E55A00] text-white" onClick={handleAIBulletPoints}>
                                <Sparkles className="w-4 h-4 mr-2" /> AI Bullet Points
                            </Button> */}
                            <Button className="bg-[#FA6600] hover:bg-[#E55A00] text-white" onClick={handleSave} disabled={saving}>
                                <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}
                            </Button>
                            <Button className="bg-[#FA6600] hover:bg-[#E55A00] text-white" onClick={handleDownload}>
                                <Download className="w-4 h-4 mr-2" /> Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6 ">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-6 ">
                                <TabsTrigger value="personal" className="text-[#FA6600]">Personal</TabsTrigger>
                                <TabsTrigger value="experience" className="text-[#FA6600]">Experience</TabsTrigger>
                                <TabsTrigger value="education" className="text-[#FA6600]">Education</TabsTrigger>
                                <TabsTrigger value="skills" className="text-[#FA6600]">Skills</TabsTrigger>
                                <TabsTrigger value="projects" className="text-[#FA6600]">Projects</TabsTrigger>
                                <TabsTrigger value="summary" className="text-[#FA6600]">Summary</TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-[#FA6600]">Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[#FA6600]">Please Enter your FullName</Label>
                                            <Input
                                                placeholder="yourname..."
                                                value={content.personalInfo?.fullName || ""}
                                                onChange={(e) =>
                                                    updateContent("personalInfo", {
                                                        ...content.personalInfo,
                                                        fullName: e.target.value,
                                                    })
                                                }
                                            /></div>
                                        <div className="space-y-2">
                                            <Label className="text-[#FA6600]">Please Enter your Email</Label>
                                            <Input
                                                placeholder="your@gmail.com"
                                                type="email"
                                                value={content.personalInfo?.email || ""}
                                                onChange={(e) =>
                                                    updateContent("personalInfo", {
                                                        ...content.personalInfo,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[#FA6600]">Please Enter your Phone Number</Label>
                                            <Input
                                                placeholder="Phone"
                                                value={content.personalInfo?.phone || ""}
                                                onChange={(e) =>
                                                    updateContent("personalInfo", {
                                                        ...content.personalInfo,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[#FA6600]">Please Enter your Location</Label>
                                            <Input
                                                placeholder="Location"
                                                value={content.personalInfo?.location || ""}
                                                onChange={(e) =>
                                                    updateContent("personalInfo", {
                                                        ...content.personalInfo,
                                                        location: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#FA6600]">Professional Summary</label>
                                            <TiptapEditor
                                                value={content.personalInfo?.summary || ""}
                                                onChange={(value) =>
                                                    updateContent("personalInfo", {
                                                        ...content.personalInfo,
                                                        summary: value,
                                                    })
                                                }
                                                placeholder="Write a brief professional summary..."
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="experience">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-[#FA6600]">Work Experience</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {(content.experience || []).map((exp: any, index: number) => (
                                                <div key={index} className="border p-4 rounded-lg space-y-3 relative">
                                                    <div className="space-y-2">
                                                        <Label className="text-[#FA6600]">Job Title</Label>
                                                        <Input
                                                            placeholder="Job Title"
                                                            value={exp.title || ""}
                                                            onChange={(e) => {
                                                                const newExp = [...(content.experience || [])]
                                                                newExp[index] = { ...exp, title: e.target.value }
                                                                updateContent("experience", newExp)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[#FA6600]">Company Name</Label>
                                                        <Input
                                                            placeholder="Company"
                                                            value={exp.company || ""}
                                                            onChange={(e) => {
                                                                const newExp = [...(content.experience || [])]
                                                                newExp[index] = { ...exp, company: e.target.value }
                                                                updateContent("experience", newExp)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">

                                                        {/* new date code starts from here */}
                                                        <div className="space-y-2">
                                                            <Label className="text-[#FA6600]">Start Date</Label>
                                                            <DatePicker
                                                                selected={
                                                                    exp.startDate && !isNaN(new Date(exp.startDate).getTime())
                                                                        ? new Date(exp.startDate)
                                                                        : null
                                                                }
                                                                onChange={(date: Date | null) => {
                                                                    const newExp = [...(content.experience || [])];
                                                                    newExp[index] = {
                                                                        ...exp,
                                                                        startDate: date ? date.toISOString() : ""
                                                                    };
                                                                    updateContent("experience", newExp);
                                                                }}
                                                                dateFormat="MMM yyyy"
                                                                showMonthYearPicker
                                                                placeholderText="Select start date"
                                                                className="w-full px-3 py-2 border rounded-md"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label className="text-[#FA6600]">End Date</Label>
                                                            <DatePicker
                                                                selected={exp.endDate && exp.endDate !== "Present" ? new Date(exp.endDate) : null}
                                                                onChange={(date: Date | null) => {
                                                                    const newExp = [...(content.experience || [])];
                                                                    newExp[index] = {
                                                                        ...exp,
                                                                        endDate: date ? date.toISOString() : ""
                                                                    };
                                                                    updateContent("experience", newExp);
                                                                }}

                                                                disabled={exp.isPresent}
                                                                dateFormat="MMM yyyy"
                                                                showMonthYearPicker
                                                                placeholderText={exp.isPresent ? "Present" : "Select end date"}
                                                                className="w-full px-3 py-2 border rounded-md"
                                                            />

                                                            <div className="flex items-center gap-2 mt-2">
                                                                <Checkbox
                                                                    checked={!!exp.isPresent}
                                                                    onCheckedChange={(checked) => {
                                                                        const newExp = [...(content.experience || [])];
                                                                        newExp[index] = {
                                                                            ...exp,
                                                                            isPresent: checked,
                                                                            endDate: checked ? "Present" : ""
                                                                        };
                                                                        updateContent("experience", newExp);
                                                                    }}
                                                                />
                                                                <span className="text-sm lowercase">Currently working here</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <TiptapEditor
                                                        value={exp.description || ""}
                                                        onChange={(html: string) => updateExperienceDescription(index, html)}
                                                        placeholder="Describe your responsibilities and achievements..."
                                                    />

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleAIBulletPoints(index)}
                                                        className="text-sm text-[#FA6600] border-[#FA6600] hover:bg-orange-100 mt-2"
                                                    >
                                                        <Sparkles className="w-4 h-4 mr-1" /> Generate with AI
                                                    </Button>
                                                    <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleMoveExperienceUp(index)}
                                                            disabled={index === 0}
                                                            className="bg-neutral-300 cursor-pointer"

                                                        >
                                                            <ArrowUp className="" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleMoveExperienceDown(index)}
                                                            disabled={index === (content.experience?.length || 0) - 1}
                                                            className="bg-neutral-300 cursor-pointer"
                                                        >
                                                            <ArrowDown className="" />
                                                        </Button>
                                                    </div>
                                                </div>

                                            ))}
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const newExp = [...(content.experience || []), {}]
                                                    updateContent("experience", newExp)
                                                }}
                                            >
                                                Add Experience
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            {/* education section starts from here */}
                            <TabsContent value="education">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-[#FA6600]">Education</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {(content.education || []).map((edu: any, index: number) => (
                                                <div key={index} className="border p-4 rounded-lg space-y-3">
                                                    <div className="space-y-2">
                                                        <Label className="text-[#FA6600]">Degree</Label>
                                                        <Input
                                                            placeholder="Degree"
                                                            value={edu.degree || ""}
                                                            onChange={(e) => {
                                                                const newEdu = [...(content.education || [])]
                                                                newEdu[index] = { ...edu, degree: e.target.value }
                                                                updateContent("education", newEdu)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-[#FA6600]">Institution</Label>
                                                        <Input
                                                            placeholder="Institution"
                                                            value={edu.institution || ""}
                                                            onChange={(e) => {
                                                                const newEdu = [...(content.education || [])]
                                                                newEdu[index] = { ...edu, institution: e.target.value }
                                                                updateContent("education", newEdu)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Input
                                                            placeholder="Start Year"
                                                            value={edu.startYear || ""}
                                                            onChange={(e) => {
                                                                const newEdu = [...(content.education || [])]
                                                                newEdu[index] = { ...edu, startYear: e.target.value }
                                                                updateContent("education", newEdu)
                                                            }}
                                                        />
                                                        <Input
                                                            placeholder="End Year"
                                                            value={edu.endYear || ""}
                                                            onChange={(e) => {
                                                                const newEdu = [...(content.education || [])]
                                                                newEdu[index] = { ...edu, endYear: e.target.value }
                                                                updateContent("education", newEdu)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleMoveEducationUp(index)}
                                                            disabled={index === 0}
                                                            className="bg-neutral-300 cursor-pointer"

                                                        >
                                                            <ArrowUp className="" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleMoveEducationDown(index)}
                                                            disabled={index === (content.experience?.length || 0) - 1}
                                                            className="bg-neutral-300 cursor-pointer"
                                                        >
                                                            <ArrowDown className="" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const newEdu = [...(content.education || []), {}]
                                                    updateContent("education", newEdu)
                                                }}
                                            >
                                                Add Education
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* skilll section starts from here */}

                            <TabsContent value="skills">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-[#FA6600]">Skills</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Predefined Skills */}
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "React",
                                                "Node.js",
                                                "MongoDB",
                                                "TypeScript",
                                                "Tailwind CSS",
                                                "Git",
                                                "Communication",
                                                "Problem Solving",
                                            ].map((skill) => (
                                                <Button
                                                    key={skill}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        const currentSkills = Array.isArray(content.skills) ? content.skills : []
                                                        if (!currentSkills.includes(skill)) {
                                                            updateContent("skills", [...currentSkills, skill])
                                                        }
                                                    }}
                                                >
                                                    {skill}
                                                </Button>
                                            ))}
                                        </div>

                                        {/* Manual Input */}
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add a custom skill..."
                                                value={manualSkill}
                                                onChange={(e) => setManualSkill(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && manualSkill.trim() !== "") {
                                                        const currentSkills = Array.isArray(content.skills) ? content.skills : []
                                                        if (!currentSkills.includes(manualSkill.trim())) {
                                                            updateContent("skills", [...currentSkills, manualSkill.trim()])
                                                        }
                                                        setManualSkill("")
                                                    }
                                                }}
                                            />
                                            <Button
                                                onClick={() => {
                                                    if (manualSkill.trim() !== "") {
                                                        const currentSkills = Array.isArray(content.skills) ? content.skills : []
                                                        if (!currentSkills.includes(manualSkill.trim())) {
                                                            updateContent("skills", [...currentSkills, manualSkill.trim()])
                                                        }
                                                        setManualSkill("")
                                                    }
                                                }}
                                                className="bg-black text-white"
                                            >
                                                Add
                                            </Button>
                                        </div>

                                        {/* Selected Skills */}
                                        <div className="flex flex-wrap gap-2">
                                            {(Array.isArray(content.skills) ? content.skills : []).map(
                                                (skill: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center border-black text-black px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                        <button
                                                            onClick={() => {
                                                                const filtered = (content.skills || []).filter((s: string) => s !== skill)
                                                                updateContent("skills", filtered)
                                                            }}
                                                            className="ml-2"
                                                        >
                                                            <Ban className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>


                            <TabsContent value="projects">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-[#FA6600]">Projects</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {(content.projects || []).map((pro: any, index: number) => {
                                                if (!pro) return null; // Skip null/undefined entries

                                                return (
                                                    <div key={index} className="border p-4 rounded-lg space-y-3">
                                                        {/* Project Title */}
                                                        <div className="space-y-2">
                                                            <Label className="text-[#FA6600]">Project Title</Label>
                                                            <Input
                                                                placeholder="Project"
                                                                value={pro.title || ""}
                                                                onChange={(e) => {
                                                                    const newProjects = [...(content.projects || [])];
                                                                    newProjects[index] = { ...pro, title: e.target.value };
                                                                    updateContent("projects", newProjects);
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Project Link */}
                                                        <div className="space-y-2">
                                                            <Label className="text-[#FA6600]">Link</Label>
                                                            <Input
                                                                placeholder="Link"
                                                                value={pro.link || ""}
                                                                onChange={(e) => {
                                                                    const newProjects = [...(content.projects || [])];
                                                                    newProjects[index] = { ...pro, link: e.target.value };
                                                                    updateContent("projects", newProjects);
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Start Date & End Date */}
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <Input
                                                                placeholder="Start Date"
                                                                value={pro.startDate || ""}
                                                                onChange={(e) => {
                                                                    const newProjects = [...(content.projects || [])];
                                                                    newProjects[index] = { ...pro, startDate: e.target.value };
                                                                    updateContent("projects", newProjects);
                                                                }}
                                                            />
                                                            <Input
                                                                placeholder="End Date"
                                                                value={pro.endDate || ""}
                                                                onChange={(e) => {
                                                                    const newProjects = [...(content.projects || [])];
                                                                    newProjects[index] = { ...pro, endDate: e.target.value };
                                                                    updateContent("projects", newProjects);
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Description */}
                                                        <div className="space-y-2">
                                                            <Label className="text-[#FA6600]">Project Description</Label>
                                                            <TiptapEditor
                                                                value={pro.description || ""}
                                                                onChange={(html: string) => updateProjectDescription(index, html)}
                                                                placeholder="Describe your responsibilities and achievements..."
                                                            />
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleAiProject(index)}
                                                            className="text-sm text-[#FA6600] border-[#FA6600] hover:bg-orange-100 mt-2"
                                                        >
                                                            <Sparkles className="w-4 h-4 mr-1" /> Generate with AI
                                                        </Button>

                                                        {/* Move Up / Down */}
                                                        <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleMoveProjectUp(index)}
                                                                disabled={index === 0}
                                                                className="bg-neutral-300 cursor-pointer"
                                                            >
                                                                <ArrowUp />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleMoveProjectDown(index)}
                                                                disabled={index === (content.projects?.length || 0) - 1}
                                                                className="bg-neutral-300 cursor-pointer"
                                                            >
                                                                <ArrowDown />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Add Project Button */}
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const newProjects = [...(content.projects || []), {}];
                                                    updateContent("projects", newProjects);
                                                }}
                                            >
                                                Add Project
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="summary">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-[#FA6600]">Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <TiptapEditor
                                            value={content.summary || ""}
                                            onChange={(html: string) => updateContent("summary", html)}
                                            placeholder="Let AI summarize your profile..."
                                        />
                                        <Button onClick={handleAiSummary} className="mt-2">
                                            <Sparkles className="mr-2" size={16} /> Generate with AI
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>


                        </Tabs>
                        <div className="flex justify-between pt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const currentIndex = tabOrder.indexOf(activeTab);
                                    if (currentIndex > 0) {
                                        setActiveTab(tabOrder[currentIndex - 1]);
                                    }
                                }}
                                disabled={tabOrder.indexOf(activeTab) === 0}
                            >
                                <ArrowLeft />
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    const currentIndex = tabOrder.indexOf(activeTab);
                                    if (currentIndex < tabOrder.length - 1) {
                                        setActiveTab(tabOrder[currentIndex + 1]);
                                    }
                                }}
                                disabled={tabOrder.indexOf(activeTab) === tabOrder.length - 1}
                            >
                                <ArrowRight />
                            </Button>
                        </div>

                    </div>

                    <div className="container w-full">
                        <div className="bg-white shadow-lg px-12 py-10 rounded-xl w-full max-w-full">
                            {TemplateComponent ? (
                                <TemplateComponent content={content} />
                            ) : (
                                <p className="text-center text-gray-500">Loading template...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
