import React from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, User } from 'lucide-react';

const ProgressDot: React.FC<{ level: string }> = ({ level }) => {
  const pct = level === 'Native' ? 100 : level === 'Fluent' ? 85 : level === 'Advanced' ? 70 : level === 'Intermediate' ? 50 : level === 'Basic' ? 30 : 70;
  return (
    <div className="flex gap-[3px] mt-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`h-[3px] flex-1 transition-all ${i * 20 <= pct ? 'bg-[#C8B6A6]' : 'bg-[#EEE7E1]'}`} />
      ))}
    </div>
  );
};

const MaisonEliteComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
  return (
    <div className="w-full min-h-[1122px] bg-[#FBF7F2] text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto" style={{ maxWidth: '793px' }}>
      {/* Thin top frame */}
      <div className="mx-7 pt-5">
        <div className="h-px bg-[#C8B6A6]/40" />
      </div>

      {/* Header */}
      <div className="px-8 pt-6 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[38px] font-extrabold text-[#222222] leading-[1.08] tracking-[-0.02em] font-['Playfair_Display',Georgia,serif]">
              {(personalInfo.fullName || 'Full Name').split(' ').map((part, i) => (
                <React.Fragment key={i}>{i > 0 ? <><br />{part}</> : part}</React.Fragment>
              ))}
            </h1>
            <div className="w-12 h-[2px] bg-[#C8B6A6] my-4" />
            <p className="text-[12px] text-[#707070] uppercase tracking-[0.3em] font-medium">{personalInfo.jobTitle || 'Professional Title'}</p>
          </div>
          <div className="w-[80px] h-[80px] overflow-hidden border border-[#C8B6A6]/50 bg-[#EEE7E1] flex items-center justify-center flex-shrink-0 ml-5">
            {personalInfo.photoUrl ? <img src={personalInfo.photoUrl} alt="" className="w-full h-full object-cover" /> : <User size={28} className="text-[#C8B6A6]" />}
          </div>
        </div>
      </div>

      {/* Contact bar */}
      <div className="mx-8 py-3 border-y border-[#EEE7E1]">
        <div className="flex gap-4 text-[10px] text-[#707070] uppercase tracking-[0.15em] font-medium">
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={10} className="text-[#C8B6A6]" />{personalInfo.phone}</span>}
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={10} className="text-[#C8B6A6]" /><span className="break-all">{personalInfo.email}</span></span>}
          {personalInfo.website && <span className="flex items-center gap-1.5"><Globe size={10} className="text-[#C8B6A6]" /><span className="break-all">{personalInfo.website}</span></span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={10} className="text-[#C8B6A6]" />{personalInfo.location}</span>}
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex px-8 pt-5 pb-7 gap-5">

        {/* LEFT — 40% */}
        <div className="w-[40%] flex-shrink-0 space-y-5">

          {/* About */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-[12px] font-['Cormorant_Garamond',Georgia,serif] font-semibold text-[#C8B6A6] uppercase tracking-[0.2em] mb-2">About</h2>
              <div className="w-8 h-px bg-[#C8B6A6]/40 mb-2" />
              <p className="text-[11px] text-[#707070] leading-[1.8] whitespace-pre-wrap font-light">{personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[12px] font-['Cormorant_Garamond',Georgia,serif] font-semibold text-[#C8B6A6] uppercase tracking-[0.2em] mb-2">Skills</h2>
              <div className="w-8 h-px bg-[#C8B6A6]/40 mb-2" />
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className="inline-block px-4 py-2 rounded-full border border-[#C8B6A6]/30 text-[#707070] text-[10px] leading-relaxed bg-white">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[12px] font-['Cormorant_Garamond',Georgia,serif] font-semibold text-[#C8B6A6] uppercase tracking-[0.2em] mb-2">Certifications</h2>
              <div className="w-8 h-px bg-[#C8B6A6]/40 mb-2" />
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11px] text-[#222222] font-medium">{c.name}</span>
                      <span className="text-[12px] text-[#707070]">{c.issuer}</span>
                    </div>
                    <ProgressDot level={c.issuer} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px bg-[#EEE7E1] flex-shrink-0" />

        {/* RIGHT — 60% */}
        <div className="flex-1 space-y-5">

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[12px] font-['Cormorant_Garamond',Georgia,serif] font-semibold text-[#C8B6A6] uppercase tracking-[0.2em] mb-2">Experience</h2>
              <div className="w-8 h-px bg-[#C8B6A6]/40 mb-2" />
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-[2px] border-[#EEE7E1] pl-3">
                    <div className="flex justify-between items-baseline">
                      <p className="text-[12px] font-medium text-[#222222]">{exp.role}</p>
                      <p className="text-[12px] text-[#707070] whitespace-nowrap ml-2">{exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[10px] text-[#C8B6A6] font-medium mt-0.5">{exp.company}</p>
                    {exp.description && <p className="text-[10px] text-[#707070] mt-1 leading-[1.7]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[12px] font-['Cormorant_Garamond',Georgia,serif] font-semibold text-[#C8B6A6] uppercase tracking-[0.2em] mb-2">Education</h2>
              <div className="w-8 h-px bg-[#C8B6A6]/40 mb-2" />
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white border border-[#EEE7E1] p-3">
                    <p className="text-[11px] font-medium text-[#222222]">{edu.degree}</p>
                    <p className="text-[10px] text-[#707070] mt-0.5">{edu.school}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[12px] text-[#C8B6A6]">{edu.graduationDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-[12px] font-['Cormorant_Garamond',Georgia,serif] font-semibold text-[#C8B6A6] uppercase tracking-[0.2em] mb-2">Achievements</h2>
              <div className="w-8 h-px bg-[#C8B6A6]/40 mb-2" />
              <div className="space-y-1.5">
                {projects.map((p) => (
                  <div key={p.id} className="border border-[#EEE7E1] bg-white px-3 py-2 flex items-start gap-2">
                    <span className="w-1 h-1 bg-[#C8B6A6] mt-1.5 flex-shrink-0" />
                    <p className="text-[10px] text-[#707070] leading-relaxed">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thin bottom frame */}
      <div className="mx-7 pb-5">
        <div className="h-px bg-[#C8B6A6]/40" />
      </div>
    </div>
  );
};

export default React.memo(MaisonEliteComponent);
