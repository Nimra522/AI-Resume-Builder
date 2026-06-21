import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface DeepTealEmeraldTemplateProps {
  data: ResumeData;
}

const DeepTealEmeraldTemplateComponent: React.FC<DeepTealEmeraldTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-teal-800 to-emerald-800 text-white p-10">
        <h1 className="text-4xl font-black mb-2">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xl text-teal-100 mb-8">{personalInfo.jobTitle || 'Your Job Title'}</p>

        <div className="space-y-3 text-sm opacity-90 mb-10">
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={16} /> {personalInfo.location}</div>}
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={16} /><span className="break-all">{personalInfo.email}</span></div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={16} /> {personalInfo.phone}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2"><Globe size={16} /><span className="break-all">{personalInfo.linkedin}</span></div>}
        </div>

        {skills.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-100 mb-4 border-b border-teal-400 pb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-medium">{skill}</span>)}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-100 mb-4 border-b border-teal-400 pb-2">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <div className="font-semibold">{edu.school}</div>
                <div className="text-sm text-teal-200">{edu.degree}</div>
                <div className="text-xs opacity-80">{edu.graduationDate}</div>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-100 mb-4 border-b border-teal-400 pb-2">Certifications</h3>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-3 last:mb-0">
                <div className="font-medium text-sm">{cert.name}</div>
                <div className="text-xs text-teal-200">{cert.organization} • {cert.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-10 space-y-8">
        {personalInfo.summary && (
          <section className="bg-teal-50 rounded-xl p-6 border-l-4 border-emerald-600">
            <h3 className="text-xl font-bold text-emerald-800 mb-3">Professional Summary</h3>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
              Experience
            </h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-6 pl-6 border-l-2 border-emerald-400">
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                    <p className="text-emerald-700 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
              Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                  {proj.link && <a href={proj.link} className="text-xs text-emerald-700 underline">{proj.link}</a>}
                  <p className="text-sm text-gray-700 mt-2">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(DeepTealEmeraldTemplateComponent);
