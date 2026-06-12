import React from 'react';
import { ResumeData } from '../../types';
interface ModernPremiumTemplateProps {
  data: ResumeData;
}
const ModernPremiumTemplateComponent: React.FC<ModernPremiumTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  const renderExperienceDescription = (desc: string) => {
    if (!desc || desc.length === 0) {
      return <p className="text-sm text-slate-500 italic">Experience description will appear here...</p>;
    }
    const sentences = desc.split('.').filter((s) => s.trim().length > 0);
    return (
      <ul className="mt-2 space-y-1.5">
        {sentences.map((sent, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-700 leading-relaxed">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
            <span>{sent.trim()}.</span>
          </li>
        ))}
      </ul>
    );
  };
  const initials = (personalInfo.fullName || 'Y N')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
  return (
    <div className="mx-auto max-w-[850px] bg-white font-sans text-slate-800 shadow-sm">
      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-4 bg-slate-900 px-7 py-10 text-slate-100">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-2xl font-bold text-slate-900">
              {initials || 'YN'}
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
          </div>
          <section className="mb-7">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Contact
            </h2>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-300 break-words">
              <li>{personalInfo.email || 'your.email@example.com'}</li>
              <li>{personalInfo.phone || 'Your Phone Number'}</li>
              <li>{personalInfo.location || 'Your Location'}</li>
              {personalInfo.website && <li className="break-all">{personalInfo.website}</li>}
              {personalInfo.linkedin && <li className="break-all">{personalInfo.linkedin}</li>}
            </ul>
          </section>
          <section className="mb-7">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Skills
            </h2>
            {skills.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <li
                    key={i}
                    className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] text-slate-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs italic text-slate-500">Skills will appear here...</p>
            )}
          </section>
          <section className="mb-7">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="text-xs">
                  <p className="font-semibold text-white">{edu.degree || 'Degree'}</p>
                  <p className="text-slate-300">{edu.school || 'School Name'}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {edu.graduationDate || 'Graduation Date'}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-semibold text-white">{cert.name || 'Certification Name'}</p>
                    <p className="text-slate-300">{cert.issuer || 'Issuer'}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{cert.date || 'Date'}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
        {/* Main */}
        <main className="col-span-8 px-9 py-10">
          <section className="mb-8">
            <h2 className="mb-4 border-b-2 border-slate-900 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <article key={i}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900">
                      {exp.role || 'Job Title'}
                    </h3>
                    <span className="text-xs font-medium text-slate-500">
                      {exp.startDate || 'Start Date'} – {exp.current ? 'Present' : exp.endDate || 'End Date'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-emerald-700">
                    {exp.company || 'Company Name'}
                  </p>
                  {renderExperienceDescription(exp.description)}
                </article>
              ))}
            </div>
          </section>
          {projects && projects.length > 0 && (
            <section>
              <h2 className="mb-4 border-b-2 border-slate-900 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                Projects
              </h2>
              <div className="space-y-5">
                {projects.map((proj, i) => (
                  <article key={i}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold text-slate-900">
                        {proj.name || 'Project Name'}
                      </h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          className="text-xs font-medium text-emerald-700 underline-offset-2 hover:underline break-all"
                        >
                          {proj.link}
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">
                      {proj.description || 'Project description will appear here...'}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
export default React.memo(ModernPremiumTemplateComponent);
