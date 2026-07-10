import React, { useState, useCallback, useRef } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Globe, Linkedin, User } from 'lucide-react';

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  breakAll?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, breakAll }) => (
  <div className="flex items-center gap-3 flex-1 min-w-0">
    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8DED2] flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-[#555555] uppercase tracking-[0.12em] font-medium">{label}</p>
      <p className={`text-[12px] text-[#222222] mt-0.5 ${breakAll ? 'break-all' : 'truncate'}`}>{value}</p>
    </div>
  </div>
);

const MaisonEliteComponent: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;
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

  return (
    <div className="w-[210mm] min-h-[297mm] bg-[#FAF8F5] text-[#222222] font-['Inter',sans-serif] shadow-xl mx-auto overflow-hidden">
      <div className="mx-8 pt-6">
        <div className="h-px bg-[#E9E1D8]" />
      </div>

      <div className="px-8 pt-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="max-w-[70%]">
            <h1 className="text-[52px] font-extrabold text-[#222222] leading-[1.02] tracking-[-0.02em] font-['Playfair_Display',Georgia,serif]">
              {(personalInfo.fullName || 'Full Name').split(' ').map((part, i) => (
                <React.Fragment key={i}>{i > 0 ? <><br />{part}</> : part}</React.Fragment>
              ))}
            </h1>
            <div className="w-14 h-[3px] bg-[#B89C7A] my-4" />
            <p className="text-[18px] text-[#555555] font-['Inter',sans-serif] font-normal">{personalInfo.jobTitle || 'Professional Title'}</p>
          </div>
          <div className="w-[100px] h-[100px] overflow-hidden rounded-lg border-2 border-[#E8DED2] bg-white flex items-center justify-center flex-shrink-0 shadow-sm cursor-pointer" onClick={() => fileRef.current?.click()}>
            <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
            {photoSrc ? (
              <img src={photoSrc} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={36} className="text-[#B89C7A]" />
            )}
          </div>
        </div>
      </div>

      {(personalInfo.phone || personalInfo.email || personalInfo.website || personalInfo.location || personalInfo.linkedin) && (
        <div className="mx-8 py-4 border-y border-[#E9E1D8] bg-white">
          <div className="flex gap-4">
            {personalInfo.phone && (
              <ContactItem icon={<Phone size={13} className="text-[#B89C7A]" />} label="Phone" value={personalInfo.phone} />
            )}
            {personalInfo.email && (
              <ContactItem icon={<Mail size={13} className="text-[#B89C7A]" />} label="Email" value={personalInfo.email} breakAll />
            )}
            {personalInfo.website && (
              <ContactItem icon={<Globe size={13} className="text-[#B89C7A]" />} label="Website" value={personalInfo.website} breakAll />
            )}
            {personalInfo.linkedin && (
              <ContactItem icon={<Linkedin size={13} className="text-[#B89C7A]" />} label="LinkedIn" value={personalInfo.linkedin} breakAll />
            )}
            {personalInfo.location && (
              <ContactItem icon={<MapPin size={13} className="text-[#B89C7A]" />} label="Location" value={personalInfo.location} />
            )}
          </div>
        </div>
      )}

      <div className="flex px-8 pt-6 pb-7 gap-8">

        <div className="w-[40%] flex-shrink-0 space-y-6">

          {personalInfo.summary && (
            <section>
              <h2 className="text-[18px] font-semibold text-[#222222] font-['Playfair_Display',Georgia,serif] leading-tight mb-1">About</h2>
              <div className="w-10 h-[2px] bg-[#B89C7A] mb-3" />
              <p className="text-[13px] text-[#555555] leading-[1.8] whitespace-pre-wrap">{personalInfo.summary}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-[18px] font-semibold text-[#222222] font-['Playfair_Display',Georgia,serif] leading-tight mb-1">Skills</h2>
              <div className="w-10 h-[2px] bg-[#B89C7A] mb-3" />
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="inline-block px-4 py-2 rounded-lg border border-[#E8DED2] bg-white text-[#555555] text-[12px] leading-relaxed">{s}</span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-[18px] font-semibold text-[#222222] font-['Playfair_Display',Georgia,serif] leading-tight mb-1">Certifications</h2>
              <div className="w-10 h-[2px] bg-[#B89C7A] mb-3" />
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c.id} className="bg-white border border-[#E8DED2] rounded-lg p-[14px] shadow-sm">
                    <p className="text-[13px] font-medium text-[#222222]">{c.name}</p>
                    <p className="text-[12px] text-[#555555] mt-0.5">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-px bg-[#E9E1D8] flex-shrink-0" />

        <div className="flex-1 space-y-6">

          {experience.length > 0 && (
            <section>
              <h2 className="text-[18px] font-semibold text-[#222222] font-['Playfair_Display',Georgia,serif] leading-tight mb-1">Experience</h2>
              <div className="w-10 h-[2px] bg-[#B89C7A] mb-3" />
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-5 border-l-2 border-[#E8DED2]">
                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#B89C7A] border-2 border-white" />
                    <div className="flex justify-between items-baseline">
                      <p className="text-[15px] font-semibold text-[#222222]">{exp.role}</p>
                      <p className="text-[12px] text-[#555555] whitespace-nowrap ml-2">{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[13px] text-[#B89C7A] font-medium mt-0.5">{exp.company}</p>
                    {exp.description && <p className="text-[13px] text-[#555555] mt-1.5 leading-[1.7]">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-[18px] font-semibold text-[#222222] font-['Playfair_Display',Georgia,serif] leading-tight mb-1">Education</h2>
              <div className="w-10 h-[2px] bg-[#B89C7A] mb-3" />
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white border border-[#E8DED2] rounded-lg p-[18px] shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[15px] font-semibold text-[#222222]">{edu.degree}</p>
                        <p className="text-[13px] text-[#555555] mt-0.5">{edu.school}</p>
                      </div>
                      <p className="text-[12px] text-[#555555] whitespace-nowrap ml-2 flex-shrink-0">{edu.graduationDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-[18px] font-semibold text-[#222222] font-['Playfair_Display',Georgia,serif] leading-tight mb-1">Achievements</h2>
              <div className="w-10 h-[2px] bg-[#B89C7A] mb-3" />
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-start gap-3 bg-white border border-[#E8DED2] rounded-lg p-[14px] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#B89C7A] mt-1.5 flex-shrink-0" />
                    <p className="text-[13px] text-[#555555] leading-relaxed">{p.name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="mx-8 pb-6">
        <div className="h-px bg-[#E9E1D8]" />
      </div>
    </div>
  );
};

export default React.memo(MaisonEliteComponent);
