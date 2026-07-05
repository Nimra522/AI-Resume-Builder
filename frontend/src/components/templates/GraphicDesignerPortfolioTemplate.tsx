import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface GraphicDesignerPortfolioProps {
  data: ResumeData;
}

const WavyTop: React.FC = () => (
  <svg className="absolute top-0 right-0 w-[300px] h-[140px] pointer-events-none z-0" viewBox="0 0 300 140" fill="none">
    <path d="M300 0H100C100 0 40 20 20 60C0 100 0 140 0 140H300V0Z" fill="#2C2420" opacity="0.15" />
    <path d="M300 0H140C140 0 80 15 55 50C30 85 20 140 20 140H300V0Z" fill="#D96C2B" opacity="0.2" />
    <path d="M300 0H180C180 0 120 10 95 40C70 70 60 100 55 140H300V0Z" fill="#1A1513" opacity="0.1" />
  </svg>
);

const WavyBottom: React.FC = () => (
  <svg className="absolute bottom-0 right-0 w-[320px] h-[140px] pointer-events-none z-0" viewBox="0 0 320 140" fill="none"
    style={{ transform: 'scaleY(-1) translateY(0)' }}>
    <path d="M320 140H100C100 140 40 120 20 80C0 40 0 0 0 0H320V140Z" fill="#2C2420" opacity="0.12" />
    <path d="M320 140H140C140 140 80 125 55 90C30 55 20 0 20 0H320V140Z" fill="#D96C2B" opacity="0.18" />
  </svg>
);

const SectionHeadingLeft: React.FC<{ text: string }> = ({ text }) => (
  <div className="mb-3.5">
    <h3 className="text-[13px] font-bold text-[#2C2420] uppercase tracking-[0.15em]">{text}</h3>
    <div className="w-full h-px bg-[#2C2420] mt-1.5" />
  </div>
);

const SectionHeadingRight: React.FC<{ text: string }> = ({ text }) => (
  <div className="mb-3.5">
    <h3 className="text-[13px] font-bold text-[#D96C2B] uppercase tracking-[0.15em]">{text}</h3>
    <div className="w-full h-px bg-[#D96C2B] mt-1.5" />
  </div>
);

const GraphicDesignerPortfolioComponent: React.FC<GraphicDesignerPortfolioProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  const hasSummary = personalInfo.summary;
  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasProjects = projects.length > 0;
  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.website || personalInfo.linkedin;

  return (
    <div className="w-full h-full min-h-[1056px] bg-white text-gray-800 shadow-xl relative overflow-hidden flex">

      {/* Left Column — Beige */}
      <div className="w-[60%] bg-[#F5F0EB] relative z-10 flex flex-col">
        {/* Decorative wavy shapes (absolutely positioned) */}
        <div className="absolute top-0 right-0 w-[200px] h-[120px] pointer-events-none z-0">
          <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
            <path d="M200 0H60C60 0 20 15 10 45C0 75 0 120 0 120H200V0Z" fill="#D96C2B" opacity="0.08" />
          </svg>
        </div>

        <div className="relative z-10 px-8 pt-8">
          <h1 className="text-[32px] font-black text-[#2C2420] uppercase leading-[1.1] tracking-tight">
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className="text-[14px] font-bold text-[#D96C2B] uppercase tracking-[0.15em] mt-1.5">
            {personalInfo.jobTitle || 'Your Job Title'}
          </p>
        </div>

        <div className="relative z-10 flex-1 px-8 pt-6 pb-4 space-y-5">
          {hasSummary && (
            <div>
              <SectionHeadingLeft text="About Me" />
              <p className="text-[12px] leading-relaxed text-gray-700 whitespace-pre-wrap">{personalInfo.summary}</p>
            </div>
          )}

          {hasExperience && (
            <div>
              <SectionHeadingLeft text="Experience" />
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[13px] font-bold text-[#2C2420]">{exp.role}</p>
                    <p className="text-[11px] font-semibold text-gray-600">
                      {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                            <span className="text-[#D96C2B] mt-0.5">&#x2022;</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reference Section */}
          {experience.length > 0 && (
            <div>
              <SectionHeadingLeft text="Reference" />
              <div className="space-y-2">
                {experience.slice(0, 2).map((ref, i) => (
                  <div key={ref.id}>
                    <p className="text-[12px] font-bold text-[#2C2420]">{ref.role}</p>
                    <p className="text-[11px] text-gray-600">{ref.company}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-600">
                      <span className="flex items-center gap-1"><Phone size={10} className="text-[#D96C2B]" /> +1 234 567 890</span>
                      <span className="flex items-center gap-1"><Mail size={10} className="text-[#D96C2B]" /> email@example.com</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column — Dark Brown */}
      <div className="w-[40%] bg-[#2C2420] relative z-10 flex flex-col">
        <WavyTop />

        {/* Profile Photo */}
        <div className="relative z-10 flex justify-center pt-8 pb-2">
          <div className="w-[110px] h-[110px] rounded-full bg-gray-600 overflow-hidden border-[3px] border-[#D96C2B] flex items-center justify-center">
            {data.personalInfo.photoUrl ? (
              <img src={data.personalInfo.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-white/50" />
            )}
          </div>
        </div>

        <div className="relative z-10 flex-1 px-5 pt-4 pb-4 space-y-4">
          {hasEducation && (
            <div>
              <SectionHeadingRight text="Education" />
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[12px] font-bold text-white">{edu.degree}</p>
                    <p className="text-[11px] text-white/70">
                      {edu.graduationDate}{edu.school ? ' | ' : ''}{edu.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasSkills && (
            <div>
              <SectionHeadingRight text="Skills" />
              <ul className="space-y-0.5">
                {skills.map((skill, i) => {
                  const name = skill.includes(':') ? skill.split(':').map(s => s.trim())[0] : skill;
                  return (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-white">
                      <span className="text-[#D96C2B] mt-0.5">&#x2022;</span>
                      <span>{name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {hasCertifications && (
            <div>
              <SectionHeadingRight text="Certifications" />
              <ul className="space-y-0.5">
                {certifications.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-2 text-[11px] text-white">
                    <span className="text-[#D96C2B] mt-0.5">&#x2022;</span>
                    <span>{cert.name}{cert.issuer ? ` (${cert.issuer})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasProjects && (
            <div>
              <SectionHeadingRight text="Projects" />
              <ul className="space-y-0.5">
                {projects.map((proj) => (
                  <li key={proj.id} className="flex items-start gap-2 text-[11px] text-white">
                    <span className="text-[#D96C2B] mt-0.5">&#x2022;</span>
                    <span>{proj.name}{proj.description ? ` (${proj.description})` : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasContact && (
            <div>
              <SectionHeadingRight text="Contact" />
              <div className="space-y-1.5 text-[11px] text-white">
                {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={11} className="text-[#D96C2B]" /><span>{personalInfo.phone}</span></div>}
                {personalInfo.email && <div className="flex items-center gap-2"><Mail size={11} className="text-[#D96C2B]" /><span className="break-all">{personalInfo.email}</span></div>}
                {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={11} className="text-[#D96C2B]" /><span>{personalInfo.location}</span></div>}
                {personalInfo.website && <div className="flex items-center gap-2"><Globe size={11} className="text-[#D96C2B]" /><span className="break-all">{personalInfo.website}</span></div>}
                {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={11} className="text-[#D96C2B]" /><span className="break-all">{personalInfo.linkedin}</span></div>}
              </div>
            </div>
          )}
        </div>

        <WavyBottom />
      </div>
    </div>
  );
};

export default React.memo(GraphicDesignerPortfolioComponent);
