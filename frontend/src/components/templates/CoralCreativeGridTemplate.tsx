import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface CoralCreativeGridTemplateProps {
  data: ResumeData;
}

const CoralCreativeGridTemplateComponent: React.FC<CoralCreativeGridTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-orange-50 text-gray-900 shadow-xl">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-orange-500 text-white p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-xl mt-2 opacity-95">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
          <div className="text-right text-sm space-y-2">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-5 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-600 mb-4">About Me</h3>
              <div className="space-y-3 text-sm">
                {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.location}</div>}
                {personalInfo.linkedin && <div className="flex items-center gap-2"><Globe size={14} /> {personalInfo.linkedin}</div>}
              </div>
              {personalInfo.summary && <p className="mt-4 text-gray-700">{personalInfo.summary}</p>}
            </div>

            {/* Skills Card */}
            {skills.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-600 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">{skill}</span>)}
              </div>
            </div>}

            {/* Education Card */}
            {education.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-600 mb-4">Education</h3>
              {education.map(edu => <div key={edu.id} className="mb-4 last:mb-0">
                <div className="font-semibold">{edu.school}</div>
                <div className="text-sm text-gray-700">{edu.degree}</div>
                <div className="text-xs text-gray-500">{edu.graduationDate}</div>
              </div>)}
            </div>}
          </div>

          {/* Right Column */}
          <div className="col-span-7 space-y-6">
            {/* Experience Cards */}
            {experience.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-600 mb-4">Experience</h3>
              {experience.map(exp => <div key={exp.id} className="mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                    <p className="text-orange-600 font-semibold text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{exp.description}</p>
              </div>)}
            </div>}

            {/* Projects & Certifications */}
            <div className="grid grid-cols-2 gap-6">
              {projects.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-600 mb-4">Projects</h3>
                {projects.map(proj => <div key={proj.id} className="mb-3 last:mb-0">
                  <div className="font-semibold text-gray-900 text-sm">{proj.name}</div>
                  <p className="text-xs text-gray-600">{proj.description}</p>
                </div>)}
              </div>}
              {certifications.length > 0 && <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-600 mb-4">Certifications</h3>
                {certifications.map(cert => <div key={cert.id} className="mb-3 last:mb-0">
                  <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                  <p className="text-xs text-gray-600">{cert.organization} • {cert.date}</p>
                </div>)}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CoralCreativeGridTemplateComponent);
