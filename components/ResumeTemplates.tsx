"use client"

import { resumeTemplates } from "@/utils/data/templates"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { FileText, Sparkles, ArrowRight, Star, Zap } from "lucide-react"

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
      router.push(`/template-resume/${data.resumeId}`)
    }
  }

  const templateColors = [
    { gradient: "from-orange-500 to-pink-500", bg: "bg-orange-50 dark:bg-orange-900/20", icon: "bg-orange-100 dark:bg-orange-700", text: "text-orange-600 dark:text-orange-300" },
    { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-900/20", icon: "bg-blue-100 dark:bg-blue-700", text: "text-blue-600 dark:text-blue-300" },
    { gradient: "from-purple-500 to-indigo-500", bg: "bg-purple-50 dark:bg-purple-900/20", icon: "bg-purple-100 dark:bg-purple-700", text: "text-purple-600 dark:text-purple-300" },
    { gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: "bg-emerald-100 dark:bg-emerald-700", text: "text-emerald-600 dark:text-emerald-300" },
    { gradient: "from-rose-500 to-orange-500", bg: "bg-rose-50 dark:bg-rose-900/20", icon: "bg-rose-100 dark:bg-rose-700", text: "text-rose-600 dark:text-rose-300" },
    { gradient: "from-slate-600 to-gray-700", bg: "bg-slate-50 dark:bg-slate-900/30", icon: "bg-slate-100 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-300" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">Choose Your Perfect</h1>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Resume Template
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Select from our professionally designed templates to create a resume that stands out from the crowd
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  100K+
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeTemplates.map((template, index) => {
            const colors = templateColors[index % templateColors.length]
            return (
              <Card
                key={template.id}
                className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm dark:bg-gray-800"
              >
                <div className={`h-1 bg-gradient-to-r ${colors.gradient} group-hover:h-2 transition-all duration-300`} />

                <CardContent className="p-0">
                  <div className={`relative h-80 overflow-hidden ${colors.bg}`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-gray-900/60"></div>
                    <div className="h-full flex items-center justify-center relative">
                      <div className="text-center p-8">
                        <div className={`${colors.icon} p-4 rounded-2xl mb-4 inline-block`}>
                          <FileText className={`h-12 w-12 ${colors.text}`} />
                        </div>
                        <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">Template Preview</p>
                      </div>

                      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
                        <Star className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Zap className={`h-4 w-4 ${colors.text}`} />
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-95 transition-all duration-300 flex items-center justify-center`}
                    >
                      <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ArrowRight className="h-10 w-10 mx-auto mb-3" />
                        <p className="font-bold text-lg">Preview Template</p>
                        <p className="text-sm opacity-90">Click to see full preview</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-bold text-slate-800 dark:text-white group-hover:bg-gradient-to-r group-hover:${colors.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                        {template.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < 4 ? colors.text : "text-slate-200 dark:text-slate-700"} fill-current`} />
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                      Professional and modern design perfect for any industry. Stand out with style.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-medium rounded-full`}>
                        Professional
                      </span>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full">
                        ATS-Friendly
                      </span>
                    </div>

                    <Button
                      onClick={() => handleUseTemplate(template.id)}
                      className={`w-full bg-gradient-to-r ${colors.gradient} hover:shadow-lg text-white font-semibold py-3 cursor-pointer rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-xl`}
                    >
                      <span className="flex items-center justify-center">
                        Use This Template
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </CardContent>

                <div className={`absolute top-6 right-6 w-3 h-3 ${colors.bg} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100`} />
                <div className={`absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r ${colors.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200`} />
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-slate-200/50 dark:border-gray-700 shadow-lg">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mr-3">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-slate-700 dark:text-white font-medium">
              Can't decide? All templates are fully customizable and ATS-friendly
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
