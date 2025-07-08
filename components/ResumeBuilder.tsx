"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Download, Sparkles } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import TiptapEditor from "./ui/TipTapEditor"
import { Label } from "./ui/label"

interface Resume {
  id: string
  title: string
  content: any
  userid: string
}

interface ResumeBuilderProps {
  resume: Resume
}

export function ResumeBuilder({ resume }: ResumeBuilderProps) {
  const [title, setTitle] = useState(resume.title)
  const [content, setContent] = useState(resume.content)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const router = useRouter()

  const handleSave = async () => {
    setSaving(true);

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
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success("Resume saved successfully");
    } catch (err) {
      toast.error("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };


  const handleDownload = () => {
    router.push(`/payment?type=download&resumeId=${resume.id}`)
  }

  const handleAIBulletPoints = () => {
    router.push(`/payment?type=ai_bullets&resumeId=${resume.id}`)
  }

  const updateContent = (section: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: value,
    }))
  }

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSave()
    }, 30000)

    return () => clearInterval(interval)
  }, [title, content])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold border-none shadow-none p-0 h-auto text-[#FA6600]"
                placeholder="Resume Title"
              />
            </div>
            <div className="flex gap-2 ">
              <Button className="bg-[#FA6600] hover:bg-[#E55A00] text-white cursor-pointer" onClick={handleAIBulletPoints}>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Bullet Points
              </Button>
              <Button className="bg-[#FA6600] hover:bg-[#E55A00] text-white cursor-pointer" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button className="bg-[#FA6600] hover:bg-[#E55A00] text-white cursor-pointer" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6 ">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 ">
                <TabsTrigger value="personal" className="text-[#FA6600]">Personal</TabsTrigger>
                <TabsTrigger value="experience" className="text-[#FA6600]">Experience</TabsTrigger>
                <TabsTrigger value="education" className="text-[#FA6600]">Education</TabsTrigger>
                <TabsTrigger value="skills" className="text-[#FA6600]">Skills</TabsTrigger>
                <TabsTrigger value="projects" className="text-[#FA6600]">Projects</TabsTrigger>
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
                        <div key={index} className="border p-4 rounded-lg space-y-3">
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
                            <Input
                              placeholder="Start Date"
                              value={exp.startDate || ""}
                              onChange={(e) => {
                                const newExp = [...(content.experience || [])]
                                newExp[index] = { ...exp, startDate: e.target.value }
                                updateContent("experience", newExp)
                              }}
                            />
                            <Input
                              placeholder="End Date"
                              value={exp.endDate || ""}
                              onChange={(e) => {
                                const newExp = [...(content.experience || [])]
                                newExp[index] = { ...exp, endDate: e.target.value }
                                updateContent("experience", newExp)
                              }}
                            />
                          </div>
                          <TiptapEditor
                            value={exp.description || ""}
                            onChange={(value: any) => {
                              const newExp = [...(content.experience || [])]
                              newExp[index] = { ...exp, description: value }
                              updateContent("experience", newExp)
                            }}
                            placeholder="Describe your responsibilities and achievements..."
                          />
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

              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#FA6600]">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TiptapEditor
                      value={content.skills || ""}
                      onChange={(value) => updateContent("skills", value)}
                      placeholder="List your technical and soft skills..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#FA6600]">Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TiptapEditor
                      value={content.projects || ""}
                      onChange={(value) => updateContent("projects", value)}
                      placeholder="Describe your notable projects..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#FA6600]">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-8 shadow-lg min-h-[600px] text-sm">
                  {/* Resume Preview */}
                  <div className="space-y-6">
                    {content.personalInfo?.fullName && (
                      <div className="text-center border-b pb-4">
                        <h1 className="text-2xl font-bold text-[#FA6600]">{content.personalInfo.fullName}</h1>
                        <div className="flex justify-center gap-4 mt-2 text-gray-600">
                          {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
                          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
                          {content.personalInfo.location && <span>{content.personalInfo.location}</span>}
                        </div>
                      </div>
                    )}

                    {content.personalInfo?.summary && (
                      <div>
                        <h2 className="text-lg font-semibold mb-2 text-[#FA6600] ">Professional Summary</h2>
                        <div dangerouslySetInnerHTML={{ __html: content.personalInfo.summary }} />
                      </div>
                    )}

                    {content.experience && content.experience.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold mb-2 text-[#FA6600]">Experience</h2>
                        <div className="space-y-4">
                          {content.experience.map((exp: any, index: number) => (
                            <div key={index}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{exp.title}</h3>
                                  <p className="text-gray-600">{exp.company}</p>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              {exp.description && (
                                <div className="mt-2" dangerouslySetInnerHTML={{ __html: exp.description }} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {content.education && content.education.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold mb-2 text-[#FA6600]">Education</h2>
                        <div className="space-y-2">
                          {content.education.map((edu: any, index: number) => (
                            <div key={index} className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                              </div>
                              <span className="text-sm text-gray-500">
                                {edu.startYear} - {edu.endYear}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {content.skills && (
                      <div>
                        <h2 className="text-lg font-semibold mb-2 text-[#FA6600]">Skills</h2>
                        <div dangerouslySetInnerHTML={{ __html: content.skills }} />
                      </div>
                    )}

                    {content.projects && (
                      <div>
                        <h2 className="text-lg font-semibold mb-2 text-[#FA6600]">Projects</h2>
                        <div dangerouslySetInnerHTML={{ __html: content.projects }} />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
