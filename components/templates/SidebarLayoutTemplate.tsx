"use client"
import { formatDate } from "@/lib/types"
export default function SidebarLayoutTemplate({ content }: { content: any }) {
    return (
        <div className="bg-white w-full max-w-4xl mx-auto shadow-lg overflow-hidden">
            <div className="flex min-h-[800px]">
                <div className="w-1/3 bg-gray-700 text-white p-6 space-y-6 sidebar">
                    {content.education && content.education.length > 0 && (
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-400">Education</h2>
                            <div className="space-y-4">
                                {content.education.map((edu: any, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <h3 className="font-bold text-sm uppercase">{edu.degree}</h3>
                                        <p className="text-xs text-gray-300">{edu.institution}</p>
                                        <p className="text-xs text-gray-300">
                                            {edu.startYear} - {edu.endYear}
                                        </p>
                                        {edu.gpa && <p className="text-xs text-gray-300">CGPA - {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills Section */}
                    {Array.isArray(content.skills) && content.skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Skills</h2>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                {content.skills.map((skill: string, index: number) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}


                    {/* Additional sections can be added here */}
                    {content.extracurricular && (
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-400">Extra-Curricular</h2>
                            <div className="text-xs text-gray-300">{content.extracurricular}</div>
                        </div>
                    )}
                </div>

                {/* Right Content - White */}
                <div className="w-2/3 bg-white p-8 space-y-6">
                    {/* Header */}
                    <div className="border-b border-gray-200 pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
                            {content.personalInfo?.fullName || "Your Name"}
                        </h1>
                        {content.personalInfo?.jobTitle && (
                            <h2 className="text-sm text-orange-500 uppercase tracking-wider font-semibold mt-1">
                                {content.personalInfo.jobTitle}
                            </h2>
                        )}

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-600">
                            {content.personalInfo?.phone && (
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center text-white text-[8px]">
                                        📞
                                    </span>
                                    {content.personalInfo.phone}
                                </div>
                            )}
                            {content.personalInfo?.email && (
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center text-white text-[8px]">
                                        ✉
                                    </span>
                                    {content.personalInfo.email}
                                </div>
                            )}
                            {content.personalInfo?.location && (
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center text-white text-[8px]">
                                        📍
                                    </span>
                                    {content.personalInfo.location}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Work Experience */}
                    {content.experience && content.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-500 border-b border-orange-200 pb-1">
                                Work Experience
                            </h2>
                            <div className="space-y-5">
                                {content.experience.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-bold text-sm text-gray-900">{exp.title}</h3>
                                                <p className="text-xs text-orange-500 font-medium">{exp.company}</p>
                                            </div>
                                            <div className="text-xs text-gray-500 text-right">
                                                <p>
                                                    {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="text-xs text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: exp.description }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Summary */}
                    {(content.summary) && (
                        <section>
                            <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-4 border-b border-black pb-1">
                                SUMMARY
                            </h2>
                            <div
                                className="text-xs text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: content.summary || content.personalInfo.summary
                                }}
                            />
                        </section>
                    )}
                    {/* Projects Section */}
                    {Array.isArray(content.projects) && content.projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-500 border-b border-orange-200 pb-1">
                                Projects
                            </h2>
                            <div className="space-y-5">
                                {content.projects
                                    .filter((project: any) => project && typeof project === "object")
                                    .map((project: any, i: number) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    {project.title || "Untitled Project"}
                                                </h3>
                                                {(project.startDate || project.endDate) && (
                                                    <p className="text-xs text-gray-500">
                                                        {project.startDate || "Start"} - {project.endDate || "End"}
                                                    </p>
                                                )}
                                            </div>
                                            {project.link && (
                                                <p className="text-xs text-blue-600">{project.link}</p>
                                            )}
                                            {project.description && (
                                                <div
                                                    className="text-xs text-gray-700 leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </section>
                    )}


                    {/* Links */}
                    {content.links && Object.keys(content.links).length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-orange-500 border-b border-orange-200 pb-1">
                                Links
                            </h2>
                            <div className="space-y-1">
                                {Object.entries(content.links).map(([label, url]: any, i) => (
                                    <div key={i} className="text-xs text-blue-600">
                                        <strong>{label}:</strong> {url}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
