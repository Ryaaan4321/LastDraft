import { formatDate } from "@/lib/types"
export default function SimpleTwoColumnTemplate({ content }: { content: any }) {

    return (
        <div className="bg-white w-full max-w-4xl mx-auto p-8 font-sans text-sm leading-relaxed">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-black uppercase tracking-wide mb-2">
                    {content.personalInfo?.fullName || "YOUR NAME"}
                </h1>
                <div className="w-full h-px bg-black mb-4"></div>
            </div>

            <div className="flex gap-8">
                {/* Left Column */}
                <div className="w-1/3 space-y-6">
                    {/* Contacts */}
                    <div>
                        <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-3 border-b border-black pb-1">
                            CONTACTS
                        </h2>
                        <div className="space-y-2 text-xs">
                            {content.personalInfo?.location && (
                                <div className="flex items-start gap-2">
                                    <span>📍</span>
                                    <span>{content.personalInfo.location}</span>
                                </div>
                            )}
                            {content.personalInfo?.email && (
                                <div className="flex items-start gap-2">
                                    <span>✉</span>
                                    <span>{content.personalInfo.email}</span>
                                </div>
                            )}
                            {content.personalInfo?.phone && (
                                <div className="flex items-start gap-2">
                                    <span>📞</span>
                                    <span>{content.personalInfo.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Education */}
                    {content.education && content.education.length > 0 && (
                        <div>
                            <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-3 border-b border-black pb-1">
                                EDUCATION
                            </h2>
                            <div className="space-y-3">
                                {content.education.map((edu: any, i: number) => (
                                    <div key={i} className="text-xs space-y-1">
                                        <h3 className="font-bold text-black uppercase leading-tight">{edu.degree}</h3>
                                        <p className="text-gray-700">{edu.institution}</p>
                                        <p className="text-gray-700">
                                            {edu.startYear} - {edu.endYear}
                                        </p>
                                        {edu.gpa && <p className="text-gray-700">CGPA - {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {/* Skills */}
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

                    {/* Links */}
                    {content.links && Object.keys(content.links).length > 0 && (
                        <div>
                            <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-3 border-b border-black pb-1">
                                LINKS
                            </h2>
                            <div className="space-y-1">
                                {Object.entries(content.links).map(([label, url]: any, i) => (
                                    <div key={i} className="text-xs text-gray-700">
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="w-2/3 space-y-6">
                    {/* Work Experience */}
                    {content.experience && content.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-4 border-b border-black pb-1">
                                WORK EXPERIENCE
                            </h2>
                            <div className="space-y-5">
                                {content.experience.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-sm text-black uppercase">{exp.title}</h3>
                                                <p className="text-xs text-gray-700 font-medium">{exp.company}</p>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}

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
                    {Array.isArray(content.projects) && content.projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-800 border-b border-gray-200 pb-1">
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
                                                <p className="text-xs text-gray-600">{project.link}</p>
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

                    {/* Extra-Curricular Activities */}
                    {content.extracurricular && (
                        <section>
                            <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-4 border-b border-black pb-1">
                                EXTRA-CURRICULAR ACTIVITIES
                            </h2>
                            <div className="text-xs text-gray-700 leading-relaxed">
                                {content.extracurricular.split("\n").map((activity: string, i: number) => {
                                    if (!activity.trim()) return null
                                    return (
                                        <div key={i} className="mb-2">
                                            {activity.includes("•") ? (
                                                <div>
                                                    <div className="font-bold text-black mb-1">{activity.split("•")[0].trim()}</div>
                                                    <div>• {activity.split("•")[1]?.trim()}</div>
                                                </div>
                                            ) : (
                                                <div className="font-bold text-black">{activity}</div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
