"use client"
import { resumeTemplates } from "@/utils/data/templates"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"
import Link from "next/link"

export default function TemplateResumeComponent() {
  const router = useRouter()

  const handleUseTemplate = async (templateId: string) => {
    const res = await fetch("/api/template/use", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId }),
    })

    const data = await res.json()
    if (data.success) {
      router.push(`/resume/${data.resumeId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <FileText className="h-6 w-6 text-[#FA6600]" />
            <span className="ml-2 text-xl font-semibold text-gray-900">LastDraft</span>
          </Link>
        </div>
      </header>

      {/* Templates Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Choose a <span className="text-[#FA6600]">Template</span> to Get Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Start with a prefilled resume template.</p>
                <Button
                  onClick={() => handleUseTemplate(template.id)}
                  className="bg-[#FA6600] hover:bg-[#e25900] text-white"
                >
                  Use this Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
