import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface NavyHorizonProps {
  data: ResumeData;
}

const ProgressBar: React.FC<{ level: number }> = ({ level }) => (
  <div className="flex-1 h-[5px] bg-gray-200 rounded-full overflow-hidden max-w-[120px]">
    <div
      className="h-full bg-[#1a365d] rounded-full transition-all"
      style={{ width: `${Math.min(100, Math.max(0, level))}%` }}
    />
  </div>
);

const parseSkillLevel = (skill: string): { name: string; level: number } => {
  const colonIdx = skill.lastIndexOf(':');
  if (colonIdx > 0) {
    const num = parseInt(skill.slice(colonIdx + 1), 10);
    if (num >= 1 && num <= 100) return { name: skill.slice(0, colonIdx).trim(), level: num };
  }
  return { name: skill, level: 70 };
};

const NavyHorizonComponent: React.FC<NavyHorizonProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(personalInfo.photoUrl || '');
  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setPhotoSrc(ev.target?.result as string); };
      reader.readAsDataURL(file);
    }
  }, []);
  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.website || personalInfo.linkedin;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasProjects = projects.length > 0;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-gray-800 shadow-xl flex flex-col">
      {/* Top section: photo + navy header */}
      <div className="flex">
        {/* Left grey area behind photo */}
        <div className="w-[30%] bg-gray-50 h-[140px]" />

        {/* Navy header */}
        <div className="flex-1 bg-[#1a365d] h-[140px] relative">
          {/* Profile photo overlapping both */}
          <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-10">
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md flex items-center justify-center cursor-pointer" onClick={() => fileRef.current?.click()}>
              {photoSrc ? (
                <img src={photoSrc} alt="" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-gray-400" />
              )}
            </div>
          </div>
          <div className="pl-16 pt-7">
            <h1 className="text-2xl font-bold text-white leading-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-[12px] text-white/70 uppercase tracking-[0.25em] mt-1.5">{personalInfo.jobTitle || 'Your Job Title'}</p>
          </div>
        </div>
      </div>

      {/* Two column layout */}
      <div className="flex flex-1">
        {/* Left sidebar */}
        <div className="w-[30%] bg-gray-50 p-5 space-y-4 flex flex-col">
          {/* Contact */}
          {hasContact && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1a365d] mb-2">Contact</h3>
              <div className="space-y-1.5 text-[12px] text-gray-700">
                {personalInfo.phone && <div className="flex items-center gap-2"><span className="w-3 flex-shrink-0 flex justify-center"><Phone size={10} className="text-[#1a365d]" /></span><span>{personalInfo.phone}</span></div>}
                {personalInfo.email && <div className="flex items-center gap-2"><span className="w-3 flex-shrink-0 flex justify-center"><Mail size={10} className="text-[#1a365d]" /></span><span className="break-all">{personalInfo.email}</span></div>}
                {personalInfo.website && <div className="flex items-center gap-2"><span className="w-3 flex-shrink-0 flex justify-center"><Globe size={10} className="text-[#1a365d]" /></span><span className="break-all">{personalInfo.website}</span></div>}
                {personalInfo.linkedin && <div className="flex items-center gap-2"><span className="w-3 flex-shrink-0 flex justify-center"><Linkedin size={10} className="text-[#1a365d]" /></span><span className="break-all">{personalInfo.linkedin}</span></div>}
                {personalInfo.location && <div className="flex items-center gap-2"><span className="w-3 flex-shrink-0 flex justify-center"><MapPin size={10} className="text-[#1a365d]" /></span><span>{personalInfo.location}</span></div>}
              </div>
            </div>
          )}

          {/* Certifications */}
          {hasCertifications && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1a365d] mb-2">Certifications</h3>
              <div className="space-y-1 text-[12px] text-gray-700">
                {certifications.map((c) => (
                  <div key={c.id} className="flex justify-between">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-gray-500">{c.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {hasProjects && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1a365d] mb-2">Projects</h3>
              <div className="space-y-1 text-[12px] text-gray-700">
                {projects.map((proj) => (
                  <div key={proj.id} className="flex justify-between">
                    <span className="font-medium">{proj.name}</span>
                    <span className="text-gray-500">{proj.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right content */}
        <div className="flex-1 p-5 space-y-4">
          {/* My Profile */}
          {hasSummary && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1a365d] mb-1.5 border-b border-gray-200 pb-1">My Profile</h3>
              <p className="text-[12px] leading-relaxed text-gray-600 whitespace-pre-wrap mt-2">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {hasExperience && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1a365d] mb-2.5 border-b border-gray-200 pb-1">Experience</h3>
              <div className="space-y-2.5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[13px] font-bold uppercase text-[#1a365d]">
                      <span className="mr-1.5">&#x2022;</span>{exp.role}
                    </p>
                    <p className="text-[12px] italic text-gray-500 mt-0.5 ml-3.5">
                      {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="text-[12px] text-gray-600 mt-1 leading-relaxed ml-3.5 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {hasEducation && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1a365d] mb-2 border-b border-gray-200 pb-1">Education</h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] font-bold uppercase text-gray-900">{edu.school}</p>
                      <span className="text-[13px] text-gray-500 flex-shrink-0 ml-2">{edu.graduationDate}</span>
                    </div>
                    <p className="text-[12px] text-gray-600 mt-0.5">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools/Skills */}
          {hasSkills && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1a365d] mb-2 border-b border-gray-200 pb-1">Tools/Skills</h3>
              <div className="space-y-1.5 mt-2">
                {skills.map((skill, i) => {
                  const { name, level } = parseSkillLevel(skill);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[12px] text-gray-700 w-24 flex-shrink-0">{name}</span>
                      <ProgressBar level={level} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavyHorizonComponent);
