import { formatDate } from "@/lib/types"
export default function MinimalistLayoutTemplate({ content }: { content: any }) {
    // Function to calculate skill level (you can customize this logic)
    const getSkillLevel = (skill: string) => {
        // This is a simple example - you might want to store skill levels in your content data
        const skillLevels: { [key: string]: number } = {
            JAVASCRIPT: 85,
            TYPESCRIPT: 80,
            REACT: 90,
            "NODE.JS": 75,
            "EXPRESS.JS": 70,
            MONGODB: 65,
            SQL: 70,
            "MATERIAL UI": 80,
            "TAILWIND CSS": 85,
        }
        return skillLevels[skill.toUpperCase()] || 70
    }
    // console.log("minimalist got called");
    return (
        <div className="bg-white w-full max-w-4xl mx-auto min-h-[800px] p-8 relative">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-light text-gray-900 tracking-wide mb-2">
                        {content.personalInfo?.fullName || "YOUR NAME"}
                    </h1>
                    <p className="text-sm text-gray-600 uppercase tracking-wider">
                        {content.personalInfo?.jobTitle || "Your Job Title"}
                    </p>
                </div>

                {/* Logo/Icon placeholder */}
                <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
            </div>

            {/* Vertical line separator */}
            <div className="absolute left-72 top-0 bottom-0 w-px bg-gray-300"></div>

            <div className="flex">
                {/* Left Sidebar */}
                <div className="w-64 pr-8 space-y-8">
                    {/* Contacts */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">CONTACTS</h2>
                        <div className="space-y-3 text-xs text-gray-600">
                            {content.personalInfo?.phone && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">📞</span>
                                    <span>{content.personalInfo.phone}</span>
                                </div>
                            )}
                            {content.personalInfo?.email && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">✉</span>
                                    <span>{content.personalInfo.email}</span>
                                </div>
                            )}
                            {content.personalInfo?.location && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">📍</span>
                                    <span>{content.personalInfo.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
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
                    {content.extras && (content.extras.hobbies || content.extras.achievements || content.extras.certifications) && (
                        <section>
                            <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-4 border-b border-black pb-1">
                                Extras
                            </h2>

                            {/* Achievements */}
                            {content.extras.achievements && (
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold text-white-800 uppercase mb-1">Achievements</h3>
                                    <div
                                        className="text-xs text-white-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: content.extras.achievements }}
                                    />
                                </div>
                            )}

                            {/* Certifications */}
                            {content.extras.certifications && (
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold text-white-800 uppercase mb-1">Certifications</h3>
                                    <div
                                        className="text-xs text-white-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: content.extras.certifications }}
                                    />
                                </div>
                            )}

                            {/* Hobbies */}
                            {content.extras.hobbies && (
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold text-white-800 uppercase mb-1">Hobbies</h3>
                                    <div
                                        className="text-xs text-white-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: content.extras.hobbies }}
                                    />
                                </div>
                            )}
                        </section>
                    )}

                    {/* Links */}
                    {content.links && Object.keys(content.links).length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">LINKS</h2>
                            <div className="space-y-2 text-xs">
                                {Object.entries(content.links).map(([label, url]: any, i) => (
                                    <div key={i} className="text-blue-600 underline">
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Content */}
                <div className="flex-1 pl-8 space-y-8">
                    {/* Work Experience */}
                    {content.experience && content.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-300 pb-2">
                                WORK EXPERIENCE
                            </h2>
                            <div className="space-y-6">
                                {content.experience.map((exp: any, i: number) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-sm text-gray-900">
                                                    {exp.title}, {exp.company}
                                                </h3>
                                                <p className="text-xs text-gray-600 mt-1">
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

                    {/* Education */}
                    {content.education && content.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-300 pb-2">
                                EDUCATION
                            </h2>
                            <div className="space-y-4">
                                {content.education.map((edu: any, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                                        <p className="text-xs text-gray-600">
                                            {edu.institution}, {edu.startYear} - {edu.endYear}
                                        </p>
                                        {edu.gpa && <p className="text-xs text-gray-600">CGPA - {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {Array.isArray(content.projects) && content.projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-black border-b border-black pb-1">
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

                    {/* Extra-Curricular Activities */}
                    {content.extracurricular && (
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-300 pb-2">
                                EXTRA-CURRICULAR ACTIVITIES
                            </h2>
                            <div className="text-xs text-gray-700 leading-relaxed">
                                {content.extracurricular.split("\n").map((activity: string, i: number) => (
                                    <div key={i} className="mb-2">
                                        {activity.includes("•") ? (
                                            <div>
                                                <div className="font-semibold mb-1">{activity.split("•")[0].trim()}</div>
                                                <div className="pl-4">• {activity.split("•")[1]?.trim()}</div>
                                            </div>
                                        ) : (
                                            <div>{activity}</div>
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
                </div>
            </div>
        </div>
    )
}
