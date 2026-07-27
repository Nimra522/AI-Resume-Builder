import React from 'react';
import { ArrowRight, Briefcase, GraduationCap, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

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

const aiSuggestions = [
  'Generated a professional resume summary in seconds.',
  'Created job-specific experience descriptions and skill suggestions.',
];

export const HeroResumeVisual: React.FC = () => {
  const floatingCards = [
    {
      label: 'Templates',
      value: '100+',
      tone: 'bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-100/80',
      position: 'top-right',
    },
    {
      label: 'AI Suggestions',
      value: '8',
      tone: 'bg-sky-50 text-sky-700 border-sky-100 shadow-sky-100/80',
      position: 'bottom-left',
    },
    {
      label: 'PDF Export',
      value: 'Ready',
      tone: 'bg-indigo-50 text-indigo-700 border-indigo-100 shadow-indigo-100/80',
      position: 'bottom-right',
    },
  ];

  return (
    <div className="relative w-full max-w-[390px] lg:max-w-[410px] mx-auto overflow-visible">
      <div className="group relative bg-white rounded-none shadow-2xl border border-gray-100 overflow-visible scale-[0.84] origin-top lg:scale-[0.86]">
        {floatingCards.map((card) => {
          const positionClass =
            card.position === 'top-right'
              ? 'absolute -right-1 top-3 z-10 lg:-right-3 lg:top-4'
              : card.position === 'bottom-left'
                ? 'absolute -left-5 top-[85%] z-10 lg:-left-7 lg:top-[93%]'
                : 'absolute -right-1 bottom-5 z-10 lg:-right-2 lg:bottom-6';

          if (card.label === 'AI Suggestions') {
            return (
              <div key={card.label} className={`${positionClass} transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]`}>
                <div className="w-[212px] rounded-[18px] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-1.75 shadow-lg shadow-sky-100/70 backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl sm:w-[228px]">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm">
                      <Sparkles size={10} className="fill-current" />
                    </span>
                    <div>
                      <p className="text-[9px] font-semibold text-sky-900">AI-powered ideas:</p>
                      <p className="text-[8px] uppercase tracking-[0.18em] text-sky-700/80">AI Suggestions</p>
                    </div>
                  </div>

                  <div className="space-y-1.25">
                    {aiSuggestions.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 rounded-xl bg-white/90 p-1.75 transition duration-200 hover:bg-white hover:shadow-sm"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm">
                          <ArrowRight size={10} />
                        </span>
                        <p className="text-[9px] font-medium leading-snug text-sky-900">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={card.label} className={`${positionClass} transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03]`}>
              <div
                className={`rounded-2xl border px-3 py-2 shadow-lg backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl ${card.tone}`}
              >
                <p className="text-[9px] uppercase tracking-[0.18em] opacity-80">{card.label}</p>
                <p className="text-sm font-bold">{card.value}</p>
              </div>
            </div>
          );
        })}
        <div className="h-3 bg-gradient-to-r from-primary via-indigo-400 to-cyan-400" />

        <div className="p-3 sm:p-3.5 lg:p-4.5">
          <div className="flex items-start gap-3 pb-3.5 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 border border-indigo-100 flex items-center justify-center shadow-inner">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                AR
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold text-text-main leading-tight">Ariana Reed</p>
              <p className="text-xs font-semibold text-primary mt-1">Senior Product Manager</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1.5 text-[8px] text-text-muted">
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

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.78fr] gap-3.5 pt-3.5">
            <div className="space-y-2">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-text-main">
                    Summary
                  </h3>
                </div>
                <p className="text-[9px] leading-relaxed text-text-muted">
                  Strategic product leader with 7+ years building user-centered workflows,
                  improving resume review journeys, and translating customer insights into
                  measurable growth.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={14} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-text-main">
                    Experience
                  </h3>
                </div>

                <div className="space-y-3">
                  {experience.map((item) => (
                    <div key={`${item.role}-${item.company}`} className="relative pl-5">
                      <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-white border-2 border-primary" />
                      <div className="absolute left-[4px] top-5 bottom-[-16px] w-px bg-indigo-100 last:hidden" />
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <p className="text-xs font-bold text-text-main">{item.role}</p>
                          <p className="text-[10px] font-semibold text-primary bg-indigo-50 rounded-full px-2 py-0.5 w-fit">
                            {item.period}
                          </p>
                        </div>
                        <p className="text-[10px] font-semibold text-text-muted">{item.company}</p>
                        <p className="text-[9px] leading-relaxed text-gray-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-3">
              <section className="bg-gray-50 rounded-none p-2 border border-gray-100">
                <h3 className="text-[9px] font-black uppercase tracking-[0.18em] text-text-main mb-1.5">
                  Skills
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={skill}>
                      <div className="flex justify-between gap-3 text-[9px] font-semibold text-text-main mb-1">
                        <span>{skill}</span>
                        <span className="text-primary">{92 - index * 6}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                          style={{ width: `${92 - index * 6}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-none p-1.5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={14} className="text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-text-main">
                    Education
                  </h3>
                </div>
                <p className="text-[10px] font-bold text-text-main">MBA, Product Leadership</p>
                <p className="text-[9px] text-text-muted mt-0.5">Stanford Graduate School</p>
                <p className="text-[9px] text-primary font-semibold mt-1">2017 - 2019</p>
              </section>

              <section className="rounded-none p-1.5 bg-primary text-white shadow-lg">
                <p className="text-[10px] font-semibold text-indigo-100 uppercase tracking-[0.16em]">
                  Resume Health
                </p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-xl font-bold">96</p>
                  <p className="text-[9px] font-semibold text-indigo-100">ATS ready</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
