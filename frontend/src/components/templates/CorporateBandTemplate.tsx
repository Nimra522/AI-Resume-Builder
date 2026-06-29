import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin } from 'lucide-react';

interface CorporateBandProps {
  data: ResumeData;
}

const CorporateBandComponent: React.FC<CorporateBandProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  const nameParts = personalInfo.fullName
    ? personalInfo.fullName.trim().split(/\s+/)
    : ['YOUR', 'NAME'];

  const row1 = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' ');
  const row2 = nameParts.slice(Math.ceil(nameParts.length / 2)).join(' ');

  return (
    <div className="w-full min-h-[1122px] bg-white text-black font-['Inter',sans-serif] shadow-xl mx-auto" style={{ maxWidth: '793px' }}>
      {/* Header Band - Light Gray */}
      <div className="bg-[#EEEEEE] px-10 pt-9 pb-7">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[26px] font-bold text-black leading-tight tracking-[0.06em]">
              {row1 && <span className="block">{row1}</span>}
              {row2 && <span className="block">{row2}</span>}
            </h1>
            <p className="text-[11px] text-gray-700 mt-1.5">{personalInfo.jobTitle || 'Job Title'}</p>
          </div>
          <div className="text-right text-[10px] text-gray-600 space-y-1.5 flex-shrink-0 ml-4">
            {personalInfo.location && <div className="flex items-center gap-1.5 justify-end"><MapPin size={11} className="text-gray-500 flex-shrink-0" /><span>{personalInfo.location}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-1.5 justify-end"><Phone size={11} className="text-gray-500 flex-shrink-0" /><span>{personalInfo.phone}</span></div>}
            {personalInfo.email && <div className="flex items-center gap-1.5 justify-end"><Mail size={11} className="text-gray-500 flex-shrink-0" /><span className="break-all">{personalInfo.email}</span></div>}
          </div>
        </div>
      </div>

      {/* Professional Summary - White Band */}
      {personalInfo.summary && (
        <div className="px-10 py-6 bg-white">
          <p className="text-[10.5px] text-gray-700 leading-relaxed text-center max-w-[90%] mx-auto whitespace-pre-wrap">{personalInfo.summary}</p>
        </div>
      )}

      {/* Skills - Light Gray Band */}
      {skills.length > 0 && (
        <div className="px-10 py-5 bg-[#EEEEEE]">
          <h2 className="text-[11px] font-bold text-black uppercase tracking-[0.12em] mb-3">Skills</h2>
          <div className="grid grid-cols-2 gap-x-8">
            <ul className="list-disc list-outside pl-4 text-[10px] text-gray-700 leading-relaxed space-y-0.5">
              {skills.filter((_, i) => i % 2 === 0).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <ul className="list-disc list-outside pl-4 text-[10px] text-gray-700 leading-relaxed space-y-0.5">
              {skills.filter((_, i) => i % 2 === 1).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* Education - White Band */}
      {education.length > 0 && (
        <div className="px-10 py-5 bg-white">
          <h2 className="text-[11px] font-bold text-black uppercase tracking-[0.12em] mb-3">Education</h2>
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[10.5px] font-bold text-black">{edu.degree || 'Degree'}</p>
                <p className="text-[10px] text-gray-700">{edu.school || 'Institution'}</p>
                {edu.graduationDate && <p className="text-[12px] text-gray-500 mt-0.5">{edu.graduationDate}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Experience - Light Gray Band */}
      {experience.length > 0 && (
        <div className="px-10 py-5 bg-[#EEEEEE]">
          <h2 className="text-[11px] font-bold text-black uppercase tracking-[0.12em] mb-3">Project Experience</h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <p className="text-[10.5px] font-bold text-black">{exp.role || 'Project Title'}</p>
                  <p className="text-[10px] text-gray-600 flex-shrink-0">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <ul className="list-disc list-outside pl-4 text-[10px] text-gray-700 leading-relaxed mt-1 space-y-0.5">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements - White Band */}
      {certifications.length > 0 && (
        <div className="px-10 py-5 bg-white">
          <h2 className="text-[11px] font-bold text-black uppercase tracking-[0.12em] mb-3">Achievements</h2>
          <ul className="list-disc list-outside pl-4 text-[10px] text-gray-700 leading-relaxed space-y-0.5">
            {certifications.map((cert) => (
              <li key={cert.id}>{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Information - Light Gray Band */}
      {projects.length > 0 && (
        <div className="px-10 py-5 bg-[#EEEEEE]">
          <h2 className="text-[11px] font-bold text-black uppercase tracking-[0.12em] mb-3">Additional Information</h2>
          <ul className="list-disc list-outside pl-4 text-[10px] text-gray-700 leading-relaxed space-y-0.5">
            {projects.map((proj) => (
              <li key={proj.id}>{proj.name}{proj.description ? `: ${proj.description}` : ''}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(CorporateBandComponent);
