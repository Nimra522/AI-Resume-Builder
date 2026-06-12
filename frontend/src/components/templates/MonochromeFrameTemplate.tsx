import React from 'react';
import { ResumeData } from '../../types';
import { User } from 'lucide-react';

interface MonochromeFrameProps {
  data: ResumeData;
}

const MonochromeFrameComponent: React.FC<MonochromeFrameProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;

  const hasContact = personalInfo.phone || personalInfo.email || personalInfo.location;
  const hasSkills = skills.length > 0;
  const hasSummary = personalInfo.summary;
  const hasEducation = education.length > 0;
  const hasExperience = experience.length > 0;
  const hasLanguages = certifications.length > 0;
  const hasMoreInfo = projects.length > 0;
  const photoSize = 100;

  return (
    <div className="w-full h-full min-h-[1000px] bg-white text-black shadow-xl">
      <div className="flex p-8 gap-6">
        {/* Left Column */}
        <div className="w-[62%] space-y-5">
          {/* Header */}
          <div>
            <h1 className="font-sans font-bold text-3xl text-black leading-tight">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <div className="w-14 h-[2px] bg-black mt-2 mb-3" />
            <p className="font-sans text-[11px] text-black tracking-[0.2em] uppercase">
              {personalInfo.jobTitle || 'Your Job Title'}
            </p>
          </div>

          {/* About Me */}
          {hasSummary && (
            <div>
              <h3 className="font-sans font-bold text-[11px] text-black uppercase tracking-[0.15em] mb-1.5">
                About me
              </h3>
              <p className="font-sans text-[10px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {hasExperience && (
            <div>
              <h3 className="font-sans font-bold text-[11px] text-black uppercase tracking-[0.15em] mb-2">
                Work experience
              </h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <p className="font-sans font-bold text-[11px] text-black">
                      {exp.role || 'Job Title'}
                    </p>
                    <p className="font-sans text-[9px] text-gray-600 mt-0.5">
                      {exp.company || 'Company Name'}
                      {exp.company && (exp.startDate || exp.endDate) ? ' | ' : ''}
                      {exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 font-sans text-[10px] text-gray-700">
                          <span className="text-black mt-0.5 text-[7px]">&#x25CF;</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Data */}
          {hasEducation && (
            <div>
              <h3 className="font-sans font-bold text-[11px] text-black uppercase tracking-[0.15em] mb-2">
                Academic data
              </h3>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-sans font-bold text-[11px] text-black">
                      {edu.school || 'School Name'}
                    </p>
                    <p className="font-sans text-[9px] text-gray-600 mt-0.5">
                      {edu.degree || ''}
                      {edu.degree && edu.graduationDate ? ' | ' : ''}
                      {edu.graduationDate || ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[38%] relative flex flex-col">
          {/* Profile Photo - top right, extends above frame */}
          <div className="self-end relative z-10" style={{ width: photoSize, height: photoSize }}>
            <div className="w-full h-full bg-gray-200 overflow-hidden flex items-center justify-center">
              <User size={36} className="text-gray-400" />
            </div>
          </div>

          {/* Thin Black Frame - overlaps bottom half of photo */}
          <div
            className="border border-black relative"
            style={{ marginTop: -(photoSize / 2), paddingTop: (photoSize / 2 + 12) }}
          >
            <div className="px-4 pb-3 space-y-4">
              {/* Skills - plain text list */}
              {hasSkills && (
                <div>
                  <h3 className="font-sans font-bold text-[10px] text-black uppercase tracking-[0.15em] mb-1">
                    Skills
                  </h3>
                  <div className="font-sans text-[9px] text-gray-700 leading-relaxed space-y-0.5">
                    {skills.map((s, i) => (
                      <div key={i}>{s}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* More information */}
              {hasMoreInfo && (
                <div>
                  <h3 className="font-sans font-bold text-[10px] text-black uppercase tracking-[0.15em] mb-1">
                    More information
                  </h3>
                  <ul className="space-y-0.5">
                    {projects.map((p) => (
                      <li key={p.id} className="flex items-start gap-2 font-sans text-[9px] text-gray-700">
                        <span className="text-black mt-[3px] text-[6px]">&#x25CF;</span>
                        <span>{p.name}{p.description ? `: ${p.description}` : ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {hasLanguages && (
                <div>
                  <h3 className="font-sans font-bold text-[10px] text-black uppercase tracking-[0.15em] mb-1">
                    Languages
                  </h3>
                  <div className="space-y-1.5">
                    {certifications.map((lang) => (
                      <div key={lang.id}>
                        <p className="font-sans font-bold text-[9px] text-black">
                          {lang.name}
                        </p>
                        <p className="font-sans text-[9px] text-gray-600">
                          {lang.issuer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information - right-aligned below frame */}
          {hasContact && (
            <div className="text-right mt-3 space-y-0.5">
              {personalInfo.phone && (
                <p className="font-sans text-[9px] text-gray-700">{personalInfo.phone}</p>
              )}
              {personalInfo.email && (
                <p className="font-sans text-[9px] text-gray-700 break-all">{personalInfo.email}</p>
              )}
              {personalInfo.location && (
                <p className="font-sans text-[9px] text-gray-700">{personalInfo.location}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MonochromeFrameComponent);
