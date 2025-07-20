import { FileText, Sparkles, Download, Eye, Users, Star, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <FileText className="h-6 w-6 text-[#FA6600]" />
                        <span className="ml-2 text-lg font-semibold text-gray-900">LastDraft</span>
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-600">
                        <Link href="#" className="hover:text-gray-900 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-gray-900 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-gray-900 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    © 2024 LastDraft. All rights reserved.
                </div>
            </div>
        </footer>
    )
}