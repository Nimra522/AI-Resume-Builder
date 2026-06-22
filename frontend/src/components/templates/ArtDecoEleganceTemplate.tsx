import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface ArtDecoEleganceTemplateProps {
  data: ResumeData;
}

const ArtDecoEleganceTemplateComponent: React.FC<ArtDecoEleganceTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full min-h-[1000px] bg-amber-50 text-gray-800 shadow-xl">
      {/* Decorative Header */}
      <div className="bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900 text-white px-10 py-10 relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600"></div>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-black tracking-widest text-center mb-2 uppercase">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-xl text-amber-200 text-center font-semibold tracking-wide">{personalInfo.jobTitle || 'Your Job Title'}</p>
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-amber-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Strip */}
      <div className="bg-amber-100 px-10 py-4 flex flex-wrap justify-center gap-6 text-amber-900 border-b-2 border-amber-300">
        {personalInfo.location && (
          <div className="flex items-center gap-2 font-medium">
            <MapPin size={18} />
            {personalInfo.location}
          </div>
        )}
        {personalInfo.email && (
          <div className="flex items-center gap-2 font-medium">
            <Mail size={18} />
            <span className="break-all">{personalInfo.email}</span>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-2 font-medium">
            <Phone size={18} />
            {personalInfo.phone}
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center gap-2 font-medium">
            <Globe size={18} />
            <span className="break-all">{personalInfo.linkedin}</span>
          </div>
        )}
        {personalInfo.website && (
          <div className="flex items-center gap-2 font-medium">
            <Globe size={18} />
            <span className="break-all">{personalInfo.website}</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-10 py-10">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-10 bg-white p-6 rounded-xl border-2 border-amber-300">
            <h2 className="text-xl font-black text-amber-900 mb-4 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500"></span>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-8">
            {experience.length > 0 && (
              <section className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <h2 className="text-xl font-black text-amber-900 mb-6 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-8 bg-amber-600"></span>
                  Experience
                </h2>
                <div className="space-y-7">
                  {experience.map((exp) => (
                    <div key={exp.id} className="pb-6 border-b border-amber-200 last:pb-0 last:border-0">
                      <div className="flex justify-between items-baseline mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exp.role || 'Job Title'}</h3>
                          <p className="text-amber-800 font-semibold">{exp.company || 'Company Name'}</p>
                        </div>
                        <span className="text-sm text-gray-600 font-medium bg-amber-100 px-3 py-1 rounded-lg">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      {exp.description && <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1 space-y-8">
            {skills.length > 0 && (
              <section className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <h2 className="text-xl font-black text-amber-900 mb-4 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-8 bg-amber-700"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-sm font-semibold border border-amber-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <h2 className="text-xl font-black text-amber-900 mb-4 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-8 bg-amber-800"></span>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="pb-3 border-b border-amber-200 last:border-0 last:pb-0">
                      <div className="font-bold text-gray-900">{edu.school || 'School Name'}</div>
                      <div className="text-amber-800">{edu.degree || 'Degree'}</div>
                      {edu.graduationDate && <div className="text-sm text-gray-600 mt-1">{edu.graduationDate}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section className="bg-white p-6 rounded-xl border-2 border-amber-300">
                <h2 className="text-xl font-black text-amber-900 mb-4 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-8 bg-amber-900"></span>
                  Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="pb-2 border-b border-amber-200 last:border-0 last:pb-0">
                      <div className="font-semibold text-gray-900">{cert.name || 'Certification'}</div>
                      <div className="text-sm text-gray-700">{cert.issuer || 'Issuer'}</div>
                      {cert.date && <div className="text-xs text-gray-500 mt-1">{cert.date}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="bg-white p-6 rounded-xl border-2 border-amber-300">
            <h2 className="text-xl font-black text-amber-900 mb-5 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-400"></span>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-amber-50 p-4 rounded-lg border border-amber-300">
                  <h3 className="font-bold text-gray-900">{proj.name || 'Project Name'}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-700 hover:underline mt-1 block break-all">
                      {proj.link}
                    </a>
                  )}
                  {proj.description && <p className="text-sm text-gray-700 mt-2">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(ArtDecoEleganceTemplateComponent);
