import { formatDate } from "@/lib/types"
export default function BlueSidebarLayoutTemplate({ content }: { content: any }) {
  return (
    <div className="bg-white w-full max-w-5xl mx-auto shadow-lg overflow-hidden">
      <div className="flex min-h-[900px]">
        {/* Left Sidebar - Blue */}
        <div className="w-[280px] bg-blue-700 text-white p-6 space-y-8">
          {/* Education Section */}
          {content.education && content.education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-white border-b border-blue-500 pb-2">
                Education
              </h2>
              <div className="space-y-3">
                {content.education.map((edu: any, i: number) => (
                  <div key={i} className="space-y-1">
                    <h3 className="font-bold text-sm uppercase leading-tight text-white">{edu.degree}</h3>
                    <p className="text-xs text-blue-100">{edu.institution}</p>
                    <p className="text-xs text-blue-100">
                      {edu.startYear} - {edu.endYear}
                    </p>
                    {edu.gpa && <p className="text-xs text-blue-100">• CGPA - {edu.gpa}</p>}
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
          {/* Extras Section */}
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
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-white border-b border-blue-500 pb-2">
                Links
              </h2>
              <div className="space-y-2">
                {Object.entries(content.links).map(([label, url]: any, i) => (
                  <div key={i} className="text-xs text-blue-100">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content - White */}
        <div className="flex-1 bg-white p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start pb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-2">
                {content.personalInfo?.fullName || "Your Name"}
              </h1>
              {content.personalInfo?.jobTitle && (
                <h2 className="text-lg text-blue-600 uppercase tracking-wider font-semibold">
                  {content.personalInfo.jobTitle}
                </h2>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              {content.personalInfo?.location && (
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                    📍
                  </span>
                  <span>{content.personalInfo.location}</span>
                </div>
              )}
              {content.personalInfo?.phone && (
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                    📞
                  </span>
                  <span>{content.personalInfo.phone}</span>
                </div>
              )}
              {content.personalInfo?.email && (
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                    ✉
                  </span>
                  <span>{content.personalInfo.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Work Experience */}
          {content.experience && content.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-6 text-orange-500 border-b-2 border-orange-500 pb-2">
                Work Experience
              </h2>
              <div className="space-y-6">
                {content.experience.map((exp: any, i: number) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-gray-900 uppercase">{exp.company}</h3>
                        <p className="text-sm text-blue-600 font-semibold">{exp.title}</p>
                      </div>
                      <div className="text-sm text-gray-500 text-right">
                        <p>
                          {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    <div
                      className="text-sm text-gray-700 leading-relaxed pl-4"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Extra-Curricular Activities */}
          {content.extracurricular && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-6 text-orange-500 border-b-2 border-orange-500 pb-2">
                Extra-Curricular Activities
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed">
                {content.extracurricular.split("\n").map((activity: string, i: number) => {
                  if (!activity.trim()) return null
                  return (
                    <div key={i} className="mb-3">
                      {activity.includes("•") ? (
                        <div>
                          <div className="font-bold text-gray-900 mb-2">{activity.split("•")[0].trim()}</div>
                          <div className="pl-4">• {activity.split("•")[1]?.trim()}</div>
                        </div>
                      ) : (
                        <div className="font-bold text-gray-900">{activity}</div>
                      )}
                    </div>
                  )
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
        </div>
      </div>
    </div>
  )
}