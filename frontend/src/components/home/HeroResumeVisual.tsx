import React from 'react';
import { Briefcase, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

const skills = ['Product Strategy', 'ATS Writing', 'Analytics', 'Leadership'];

const experience = [
  {
    role: 'Senior Product Manager',
    company: 'Northstar Labs',
    period: '2022 - Present',
    detail: 'Led cross-functional launches that improved onboarding conversion by 32%.',
  },
  {
    role: 'Growth Specialist',
    company: 'BrightWorks',
    period: '2019 - 2022',
    detail: 'Built reporting workflows and campaign briefs for enterprise hiring teams.',
  },
];

export const HeroResumeVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-primary via-indigo-400 to-cyan-400" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 border border-indigo-100 flex items-center justify-center shadow-inner">
              <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                AR
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-2xl font-bold text-text-main leading-tight">Ariana Reed</p>
              <p className="text-sm font-semibold text-primary mt-1">Senior Product Manager</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-[11px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Mail size={12} className="text-primary" />
                  ariana.reed@email.com
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone size={12} className="text-primary" />
                  +1 555 0148
                </span>
                <span className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin size={12} className="text-primary" />
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.78fr] gap-6 pt-6">
            <div className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-text-main">
                    Summary
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-text-muted">
                  Strategic product leader with 7+ years building user-centered workflows,
                  improving resume review journeys, and translating customer insights into
                  measurable growth.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={14} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-text-main">
                    Experience
                  </h3>
                </div>

                <div className="space-y-4">
                  {experience.map((item) => (
                    <div key={`${item.role}-${item.company}`} className="relative pl-5">
                      <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-white border-2 border-primary" />
                      <div className="absolute left-[4px] top-5 bottom-[-16px] w-px bg-indigo-100 last:hidden" />
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <p className="text-sm font-bold text-text-main">{item.role}</p>
                          <p className="text-[10px] font-semibold text-primary bg-indigo-50 rounded-full px-2 py-0.5 w-fit">
                            {item.period}
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-text-muted">{item.company}</p>
                        <p className="text-[11px] leading-relaxed text-gray-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-[0.18em] text-text-main mb-4">
                  Skills
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={skill}>
                      <div className="flex justify-between gap-3 text-[11px] font-semibold text-text-main mb-1.5">
                        <span>{skill}</span>
                        <span className="text-primary">{92 - index * 6}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                          style={{ width: `${92 - index * 6}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={14} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-text-main">
                    Education
                  </h3>
                </div>
                <p className="text-sm font-bold text-text-main">MBA, Product Leadership</p>
                <p className="text-xs text-text-muted mt-1">Stanford Graduate School</p>
                <p className="text-[11px] text-primary font-semibold mt-2">2017 - 2019</p>
              </section>

              <section className="rounded-2xl p-4 bg-primary text-white shadow-lg">
                <p className="text-[11px] font-semibold text-indigo-100 uppercase tracking-[0.16em]">
                  Resume Health
                </p>
                <div className="flex items-end justify-between mt-3">
                  <p className="text-3xl font-bold">96</p>
                  <p className="text-xs font-semibold text-indigo-100">ATS ready</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
