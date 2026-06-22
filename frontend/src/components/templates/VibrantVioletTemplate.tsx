import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

interface VibrantVioletTemplateProps {
  data: ResumeData;
}

const VibrantVioletTemplateComponent: React.FC<VibrantVioletTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-900 shadow-xl flex flex-col md:flex-row">
      {/* Left Gradient Sidebar */}
      <div className="w-full md:w-1/3 bg-gradient-to-b from-violet-700 via-purple-700 to-fuchsia-700 text-white p-8">
        {personalInfo.photoUrl ? (
          <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
            <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
            <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}

        <h1 className="text-4xl font-black mb-2 text-center">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xl text-violet-100 mb-6 text-center">{personalInfo.jobTitle || 'Your Job Title'}</p>
        
        <div className="space-y-3 text-sm opacity-95 mb-8">
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={16} /> {personalInfo.location}</div>}
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={16} /><span className="break-all">{personalInfo.email}</span></div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={16} /> {personalInfo.phone}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2"><Globe size={16} /><span className="break-all">{personalInfo.linkedin}</span></div>}
        </div>
        
        {skills.length > 0 && <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-violet-100 mb-3 border-b border-violet-400 pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-violet-100 text-violet-900 rounded-full text-xs font-medium">{skill}</span>)}
          </div>
        </div>}

        {education.length > 0 && <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-violet-100 mb-3 border-b border-violet-400 pb-1">Education</h3>
          {education.map(edu => <div key={edu.id} className="mb-3">
            <div className="font-semibold">{edu.school}</div>
            <div className="text-sm text-violet-200">{edu.degree}</div>
            {edu.graduationDate && <div className="text-xs opacity-80">{edu.graduationDate}</div>}
            {edu.description && <div className="text-xs opacity-80 mt-1">{edu.description}</div>}
          </div>)}
        </div>}

        {certifications.length > 0 && <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-violet-100 mb-3 border-b border-violet-400 pb-1">Certifications</h3>
          {certifications.map(cert => <div key={cert.id} className="mb-2">
            <div className="font-medium text-sm">{cert.name}</div>
            <div className="text-xs text-violet-200">{cert.issuer}, {cert.date}</div>
          </div>)}
        </div>}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-10 space-y-8">
        {personalInfo.summary && <section>
          <h3 className="text-xl font-bold text-violet-700 mb-3">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>}

        {experience.length > 0 && <section>
          <h3 className="text-xl font-bold text-violet-700 mb-4">Experience</h3>
          {experience.map(exp => <div key={exp.id} className="mb-6 pl-6 border-l-2 border-violet-500">
            <div className="flex justify-between items-baseline">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{exp.role}</h4>
                <p className="text-violet-600 font-semibold">{exp.company}</p>
              </div>
              <span className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            {exp.description && <p className="mt-2 text-gray-700 whitespace-pre-wrap">{exp.description}</p>}
          </div>)}
        </section>}

        {projects.length > 0 && <section>
          <h3 className="text-xl font-bold text-violet-700 mb-4">Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(proj => <div key={proj.id} className="bg-violet-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-900">{proj.name}</h4>
              {proj.link && <a href={proj.link} className="text-sm text-violet-600 underline block mt-1 break-all" target="_blank" rel="noopener noreferrer">{proj.link}</a>}
              {proj.description && <p className="text-sm text-gray-700 mt-2">{proj.description}</p>}
            </div>)}
          </div>
        </section>}
      </div>
    </div>
  );
};

export default React.memo(VibrantVioletTemplateComponent);
