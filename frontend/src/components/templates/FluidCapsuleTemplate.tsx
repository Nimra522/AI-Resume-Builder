import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, User, Linkedin } from 'lucide-react';

interface FluidCapsuleProps {
  data: ResumeData;
}

const AccentCircle: React.FC<{ letter: string }> = ({ letter }) => (
  <span className="relative inline-flex items-center mr-2">
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full bg-[#7a97a9] opacity-90" />
    <span className="relative z-10 pl-0.5">{letter}</span>
  </span>
);

const HollowCircle: React.FC = () => (
  <div className="w-[7px] h-[7px] rounded-full border-[1.5px] border-[#7a97a9] bg-white" />
);

const DotGridCorner: React.FC<{ position: 'tr' | 'bl' }> = ({ position }) => (
  <svg
    className={`absolute ${position === 'tr' ? 'top-0 right-0' : 'bottom-0 left-0'} pointer-events-none opacity-[0.06]`}
    width="120" height="120" viewBox="0 0 120 120"
  >
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={col * 16 + 8} cy={row * 16 + 8} r="1.5"
          fill="#7a97a9"
        />
      ))
    )}
  </svg>
);

const FluidCapsuleComponent: React.FC<FluidCapsuleProps> = ({ data }) => {
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

  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.linkedin;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasProjects = projects.length > 0;

  const mid = Math.ceil(skills.length / 2);
  const leftSkills = skills.slice(0, mid);
  const rightSkills = skills.slice(mid);


  return (
    <div className="w-full min-h-[1000px] bg-[#F8F7F5] text-gray-800 shadow-xl relative overflow-hidden">
      <DotGridCorner position="tr" />
      <DotGridCorner position="bl" />

      {/* Vertical accent lines with hollow circles */}
      <div className="absolute top-[120px] bottom-0 left-[18px] w-px bg-[#7a97a9]/30 pointer-events-none z-10" />
      <div className="absolute top-[120px] left-[18px] z-10"><HollowCircle /></div>
      <div className="absolute right-[18px] top-[50%] z-10"><HollowCircle /></div>
      <div className="absolute right-[18px] bottom-[60px] z-10"><HollowCircle /></div>

      <div className="relative z-20 p-8 max-w-[750px] mx-auto space-y-5">
        {/* Header Capsule */}
        <div className="bg-white rounded-r-[40px] rounded-l-[40px] shadow-sm overflow-hidden">
          <div className="flex items-center p-5 gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold uppercase text-gray-900 leading-tight">{personalInfo.fullName || 'Your Full Name'}</h1>
              <p className="text-[11px] text-gray-500 mt-0.5">{personalInfo.jobTitle || 'Your Job Title'}</p>
              {hasContact && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-gray-600">
                  {personalInfo.location && <div className="flex items-center gap-1"><MapPin size={10} className="text-[#7a97a9]" /><span>{personalInfo.location}</span></div>}
                  {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={10} className="text-[#7a97a9]" /><span>{personalInfo.phone}</span></div>}
                  {personalInfo.email && <div className="flex items-center gap-1"><Mail size={10} className="text-[#7a97a9]" /><span className="break-all">{personalInfo.email}</span></div>}
                  {personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin size={10} className="text-[#7a97a9]" /><span className="break-all">{personalInfo.linkedin}</span></div>}
                </div>
              )}
            </div>
            <div className="w-[85px] h-[85px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border-white shadow flex-shrink-0 cursor-pointer" onClick={() => fileRef.current?.click()}>
              {photoSrc ? (
                <img src={photoSrc} alt="" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-gray-400 cursor-pointer" onClick={() => fileRef.current?.click()} />
              )}
            </div>
            <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Professional Summary */}
        {hasSummary && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-2"><AccentCircle letter="P" />rofessional Summary</h3>
            <p className="text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap">{personalInfo.summary}</p>
          </div>
        )}

        {/* Education Capsule */}
        {hasEducation && (
          <div className="bg-white rounded-l-[40px] rounded-r-[40px] p-5 shadow-sm">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-3">
              <span className="border-b-2 border-[#7a97a9] pb-0.5">Education</span>
            </h3>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-gray-900">{edu.school}</p>
                    <span className="text-[12px] text-gray-400 flex-shrink-0 ml-2">{edu.graduationDate}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-2"><AccentCircle letter="E" />xperience</h3>
            <div className="space-y-2.5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{exp.role}</p>
                      <p className="text-[10px] text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-[12px] text-gray-400 flex-shrink-0 ml-2">{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] text-gray-600">
                        <span className="text-gray-500 mt-[3px] text-[11px]">&#x25CF;</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Capsule */}
        {hasSkills && (
          <div className="bg-white rounded-l-[40px] rounded-r-[40px] p-5 shadow-sm">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-3">
              <span className="border-b-2 border-[#7a97a9] pb-0.5">Skills</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              <div className="space-y-0.5">
                {leftSkills.map((s, i) => (
                  <p key={i} className="flex items-start gap-2 text-[10px] text-gray-700">
                    <span className="text-gray-500 mt-[3px] text-[11px]">&#x25CF;</span>
                    {s}
                  </p>
                ))}
              </div>
              <div className="space-y-0.5">
                {rightSkills.map((s, i) => (
                  <p key={i} className="flex items-start gap-2 text-[10px] text-gray-700">
                    <span className="text-gray-500 mt-[3px] text-[11px]">&#x25CF;</span>
                    {s}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-2"><AccentCircle letter="C" />ertifications</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              <div className="space-y-1">
                {certifications.map((c) => (
                  <p key={c.id} className="text-[10px] text-gray-700">
                    {c.name}<span className="text-gray-400"> — </span>{c.issuer}
                  </p>
                ))}
              </div>
              <div className="space-y-1">
              </div>
            </div>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-2"><AccentCircle letter="P" />rojects</h3>
            <div className="space-y-1">
              {projects.map((proj) => (
                <p key={proj.id} className="text-[10px] text-gray-700">
                  {proj.name}{proj.description ? <span className="text-gray-400"> — {proj.description}</span> : ''}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(FluidCapsuleComponent);
