import { formatDate } from "@/lib/types";
export default function CenteredLayoutTemplate({ content }: { content: any }) {
    return (
        <div className="bg-white w-full max-w-3xl mx-auto min-h-[800px] p-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-wide mb-2">
                    {content.personalInfo?.fullName || "YOUR NAME"}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{content.personalInfo?.jobTitle || "Your Job Title"}</p>

                {/* Contact Info */}
                <div className="flex justify-center items-center gap-6 text-sm text-gray-600 mb-4">
                    {content.personalInfo?.phone && <span>📞 {content.personalInfo.phone}</span>}
                    {content.personalInfo?.email && <span>📧 {content.personalInfo.email}</span>}
                    {content.personalInfo?.location && <span>📍 {content.personalInfo.location}</span>}
                </div>

                {/* Social Links */}
                {content.links && Object.keys(content.links).length > 0 && (
                    <div className="flex justify-center items-center gap-4 text-sm">
                        {Object.entries(content.links).map(([label, url]: any, i) => (
                            <div key={i} className="flex items-center gap-1 text-blue-600">
                                <span className="text-xs">🔗</span>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Work Experience */}
            {content.experience && content.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-center text-gray-900 uppercase tracking-wider mb-6">WORK EXPERIENCE</h2>
                    <div className="space-y-6">
                        {content.experience.map((exp: any, i: number) => (
                            <div key={i} className="space-y-2">
                                <div className="text-center">
                                    <h3 className="font-bold text-sm text-blue-600">
                                        {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                                    </h3>
                                </div>
                                <div
                                    className="text-sm text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: exp.description }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {content.education && content.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-center text-gray-900 uppercase tracking-wider mb-6">EDUCATION</h2>
                    <div className="text-center space-y-4">
                        {content.education.map((edu: any, i: number) => (
                            <div key={i} className="space-y-1">
                                <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">
                                    {edu.institution} | {edu.startYear} - {edu.endYear}
                                </p>
                                {edu.gpa && <p className="text-sm text-gray-600">CGPA - {edu.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
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

            {content.skills && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-center text-gray-900 uppercase tracking-wider mb-6">SKILLS</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {typeof content.skills === "string"
                            ? content.skills.split("\n").map((skill: string, i: number) => {
                                const skillName = skill.trim();
                                if (!skillName) return null;
                                return (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-black text-gray-700 text-xs font-medium rounded-full border"
                                    >
                                        {skillName}
                                    </span>
                                );
                            })
                            : Array.isArray(content.skills) &&
                            content.skills.map((skill: string, i: number) => {
                                const skillName = skill.trim();
                                if (!skillName) return null;
                                return (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full border"
                                    >
                                        {skillName}
                                    </span>
                                );
                            })}
                    </div>
                </section>
            )}
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

            {/* Extra-Curricular Activities */}
            {content.extracurricular && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-center text-gray-900 uppercase tracking-wider mb-6">
                        EXTRA-CURRICULAR ACTIVITIES
                    </h2>
                    <div className="text-sm text-gray-700 leading-relaxed">
                        {content.extracurricular.split("\n").map((activity: string, i: number) => {
                            if (!activity.trim()) return null
                            return (
                                <div key={i} className="mb-3">
                                    {activity.includes("•") ? (
                                        <div>
                                            <div className="font-bold text-blue-600 mb-1">{activity.split("•")[0].trim()}</div>
                                            <div className="pl-4">• {activity.split("•")[1]?.trim()}</div>
                                        </div>
                                    ) : (
                                        <div className="font-bold text-blue-600">{activity}</div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}
        </div>
    )
}
