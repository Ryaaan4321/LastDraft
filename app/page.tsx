"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Sparkles, Download, Eye, Users, Star, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/hooks/user.hooks"

export default function HomePage() {
  const { userData, userLoading } = useUser();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-[#FA6600]/10 text-[#FA6600] border-[#FA6600]/20">
            <Sparkles className="w-4 h-4 mr-1" />
            AI-Powered Resume Builder
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect Resume in <span className="text-[#FA6600]">Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build professional resumes with our intuitive editor, AI-powered suggestions, and beautiful templates. Stand
            out from the crowd and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={userData ? "/resume/new" : "/auth/signin"}>
              <Button size="lg" className="bg-[#FA6600] hover:bg-[#E55A00] text-white px-8 cursor-pointer">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href='/templates'>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 cursor-pointer text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Templates
              </Button></Link>

          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              50,000+ users
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              4.9/5 rating
            </div>
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              100,000+ downloads
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build a Winning Resume
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools makes resume building effortless and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FA6600]/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-[#FA6600]" />
                </div>
                <CardTitle className="text-gray-900">AI Bullet Points</CardTitle>
                <CardDescription>
                  Generate compelling bullet points with AI assistance to highlight your achievements effectively.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FA6600]/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-[#FA6600]" />
                </div>
                <CardTitle className="text-gray-900">Live Preview</CardTitle>
                <CardDescription>
                  See your resume come to life with real-time preview as you make changes to your content.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FA6600]/10 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-[#FA6600]" />
                </div>
                <CardTitle className="text-gray-900">PDF Export</CardTitle>
                <CardDescription>
                  Download your resume as a high-quality PDF ready for job applications and printing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FA6600]/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-[#FA6600]" />
                </div>
                <CardTitle className="text-gray-900">Professional Templates</CardTitle>
                <CardDescription>
                  Choose from a variety of professionally designed templates that suit your industry.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FA6600]/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-[#FA6600]" />
                </div>
                <CardTitle className="text-gray-900">Easy Editing</CardTitle>
                <CardDescription>
                  Intuitive interface with rich text editing tools makes updating your resume simple.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FA6600]/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#FA6600]" />
                </div>
                <CardTitle className="text-gray-900">Multiple Sections</CardTitle>
                <CardDescription>
                  Organize your information with dedicated sections for experience, education, skills, and projects.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Your Professional Resume?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who have successfully landed their dream jobs with our resume builder.
          </p>
          <Link href={userData ? "/resume/new" : "/auth/signin"}>
            <Button size="lg" className="bg-[#FA6600] hover:bg-[#E55A00] text-white px-8 cursor-pointer">
              Start Building for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
