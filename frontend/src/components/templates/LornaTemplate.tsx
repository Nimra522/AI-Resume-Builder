import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, Globe, MapPin, User } from 'lucide-react';

interface LornaProps {
  data: ResumeData;
}

const SectionTitle: React.FC<{ text: string }> = ({ text }) => (
  <div className="mb-3">
    <h3 className="text-[11px] font-bold text-black uppercase tracking-[0.08em]">{text}</h3>
    <div className="w-full h-px bg-gray-300 mt-1" />
  </div>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc list-outside pl-4 text-[10px] text-gray-700 leading-relaxed space-y-0.5">
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
);

const LornaComponent: React.FC<LornaProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="w-full min-h-[1122px] bg-[#ECECEC] text-black font-['Inter',sans-serif] shadow-xl mx-auto" style={{ maxWidth: '793px' }}>
      <div className="bg-white mx-4 my-4 overflow-hidden">
        {/* Header */}
        <div className="pt-9 pb-0 text-center relative">
          <h1 className="text-[34px] font-bold text-black uppercase tracking-[0.02em] leading-tight">
            {personalInfo.fullName || 'LORNA ALVARADO'}
          </h1>
          <p className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em] mt-1">
            {personalInfo.jobTitle || 'INTERIOR DESIGNER'}
          </p>
        </div>

        {/* Contact Bar + Photo */}
        <div className="relative flex justify-center mt-8 mb-7">
          <div className="w-[calc(100%-3rem)] bg-[#ECECEC] h-[60px] rounded relative">
            <div className="flex items-center justify-between h-full px-4">
              <div className="text-[12px] text-gray-700 space-y-1">
                {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={10} className="text-gray-500" /><span className="break-all">{personalInfo.email}</span></div>}
                {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={10} className="text-gray-500" /><span>{personalInfo.phone}</span></div>}
              </div>
              <div className="text-[12px] text-gray-700 space-y-1 text-right">
                {personalInfo.website && <div className="flex items-center gap-1.5 justify-end"><span className="break-all">{personalInfo.website}</span><Globe size={10} className="text-gray-500" /></div>}
                {personalInfo.location && <div className="flex items-center gap-1.5 justify-end"><span>{personalInfo.location}</span><MapPin size={10} className="text-gray-500" /></div>}
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-[15px]">
            <div className="w-[90px] h-[90px] rounded-full border-2 border-gray-300 p-1 bg-white">
              <div className="w-full h-full rounded-full border-2 border-gray-400 overflow-hidden bg-gray-100 flex items-center justify-center">
                {personalInfo.photoUrl ? (
                  <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={28} className="text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Body */}
        <div className="flex gap-6 px-6 pb-6">
          {/* Left Column - 38% */}
          <div className="w-[38%] flex-shrink-0">
            {/* About Me */}
            {personalInfo.summary && (
              <div className="mb-5">
                <SectionTitle text="ABOUT ME" />
                <p className="text-[10px] text-gray-700 leading-relaxed whitespace-pre-wrap">{personalInfo.summary}</p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-5">
                <SectionTitle text="SKILLS" />
                <BulletList items={skills} />
              </div>
            )}

            {/* Languages */}
            {certifications.length > 0 && (
              <div className="mb-5">
                <SectionTitle text="LANGUAGES" />
                <BulletList items={certifications.map(c => `${c.name}${c.issuer ? ` — ${c.issuer}` : ''}`)} />
              </div>
            )}

            {/* Achievements */}
            {projects.length > 0 && (
              <div className="mb-5">
                <SectionTitle text="ACHIEVEMENTS" />
                <BulletList items={projects.map(p => p.description || p.name)} />
              </div>
            )}
          </div>

          {/* Right Column - 62% */}
          <div className="flex-1 min-w-0">
            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-5">
                <SectionTitle text="EXPERIENCE" />
                <div className="space-y-3.5">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <p className="text-[11px] font-bold text-black">{exp.role || 'Job Title'}</p>
                      <p className="text-[10px] text-gray-600">{exp.company || ''}{exp.company && exp.startDate ? ', ' : ''}{exp.startDate || ''}</p>
                      <p className="text-[12px] italic text-gray-500">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </p>
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

            {/* Education */}
            {education.length > 0 && (
              <div className="mb-5">
                <SectionTitle text="EDUCATION" />
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-[11px] font-bold text-black">{edu.degree || 'Degree'}</p>
                      <p className="text-[10px] text-gray-600">{edu.school || 'Institute'}{edu.school && edu.graduationDate ? ', ' : ''}{edu.graduationDate || ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LornaComponent);
