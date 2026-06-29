import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin } from 'lucide-react';

interface IsabelProps {
  data: ResumeData;
}

const SectionTitle: React.FC<{ text: string }> = ({ text }) => (
  <h3 className="text-[12px] font-semibold text-black mb-3 uppercase tracking-[0.06em]">{text}</h3>
);

const ContactLine: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center flex-shrink-0">
      {icon}
    </span>
    <span className="text-[9.5px] text-gray-800 break-all">{text}</span>
  </div>
);

const HorizontalLine: React.FC = () => <div className="w-full h-px bg-black my-0" />;

const VerticalLine: React.FC = () => <div className="w-px bg-black h-full" />;

const IsabelComponent: React.FC<IsabelProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const titleLines = personalInfo.jobTitle
    ? personalInfo.jobTitle.split(' ').reduce((acc: string[][], word, i) => {
        if (i % 2 === 0) acc.push([]);
        acc[acc.length - 1].push(word);
        return acc;
      }, [])
    : ['BUSINESS', 'ANALYST'];

  return (
    <div className="w-full min-h-[1122px] bg-white text-black font-['Inter',sans-serif] shadow-xl mx-auto" style={{ maxWidth: '793px' }}>
      {/* Header */}
      <div className="px-9 pt-9 pb-4">
        <div className="flex justify-between items-start">
          <div className="max-w-[65%]">
            <h1 className="text-[30px] font-bold text-black leading-[1.15] tracking-[0.04em]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">{line.join(' ')}</span>
              ))}
            </h1>
          </div>
          <div className="text-right flex-shrink-0 ml-4 pt-1">
            <p className="text-[13px] text-gray-800 font-normal">{personalInfo.fullName || 'Full Name'}</p>
          </div>
        </div>
      </div>

      <HorizontalLine />

      {/* Summary */}
      <div className="px-9 py-4 flex gap-6">
        <div className="w-[90px] flex-shrink-0">
          <span className="text-[12px] font-semibold text-black uppercase tracking-[0.06em]">Summary</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-gray-700 leading-relaxed whitespace-pre-wrap">{personalInfo.summary || 'Professional summary will appear here...'}</p>
        </div>
      </div>

      <HorizontalLine />

      {/* Main Two-Column Body */}
      <div className="flex min-h-[500px]">
        {/* Left Column */}
        <div className="w-[30%] px-9 py-5 flex-shrink-0">
          {/* Contact */}
          <div className="mb-6">
            <SectionTitle text="Contact" />
            {personalInfo.phone && <ContactLine icon={<Phone size={9} className="text-black" />} text={personalInfo.phone} />}
            {personalInfo.email && <ContactLine icon={<Mail size={9} className="text-black" />} text={personalInfo.email} />}
            {personalInfo.location && <ContactLine icon={<MapPin size={9} className="text-black" />} text={personalInfo.location} />}
          </div>

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <SectionTitle text="Education" />
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[10px] font-bold text-black leading-tight">{edu.degree || 'Degree'}</p>
                    <p className="text-[12px] text-gray-700">{edu.school || 'University'}</p>
                    {edu.graduationDate && <p className="text-[8.5px] text-gray-500 mt-0.5">{edu.graduationDate}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <SectionTitle text="Skills" />
              <ul className="list-disc list-outside pl-4 text-[9.5px] text-gray-700 leading-relaxed space-y-0.5">
                {skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <SectionTitle text="Certifications" />
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <p key={cert.id} className="text-[9.5px] text-gray-700">{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</p>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <SectionTitle text="Projects" />
              <div className="space-y-1.5">
                {projects.map((proj) => (
                  <p key={proj.id} className="text-[9.5px] text-gray-700">{proj.name}{proj.description ? ` — ${proj.description}` : ''}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <VerticalLine />

        {/* Right Column */}
        <div className="flex-1 px-9 py-5 min-w-0">
          {/* Professional Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <SectionTitle text="Professional Experience" />
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="text-[10.5px] font-bold text-black">{exp.role}{exp.company ? ` – ${exp.company}` : ''}</p>
                    <p className="text-[12px] text-gray-600 mt-0.5">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-outside pl-4 text-[9.5px] text-gray-700 leading-relaxed mt-1.5 space-y-0.5">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IsabelComponent);
