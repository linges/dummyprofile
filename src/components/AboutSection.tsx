import React from 'react';
import { Briefcase, GraduationCap, Compass, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import { UserProfile } from '../types';

interface AboutSectionProps {
  profile: UserProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const principles = [
    {
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      title: 'Performance-First',
      description: 'Zero bloat, optimized rendering lifecycles, and sub-100ms interactions on desktop and mobile.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      title: 'Robust & Type-Safe',
      description: 'Eliminating edge runtime bugs through thorough TypeScript schemas, strict boundaries, and test coverage.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      title: 'Accessible & Human',
      description: 'Designing intuitive flows meeting WCAG standards so digital experiences welcome everyone.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 border-t border-neutral-200/70 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-neutral-600" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            A look into my journey, working philosophy, and past engineering milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Biography & Principles (Left) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              {profile.aboutParagraphs.map((para, index) => (
                <p key={index} className="text-base text-neutral-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Working Principles */}
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Core Engineering Philosophy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {principles.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2"
                  >
                    <div className="p-2 w-fit rounded-lg bg-white border border-neutral-200 shadow-2xs">
                      {principle.icon}
                    </div>
                    <div className="font-semibold text-neutral-900 text-sm">
                      {principle.title}
                    </div>
                    <div className="text-xs text-neutral-600 leading-normal">
                      {principle.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Credentials */}
            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-lg mb-4">
                <GraduationCap className="w-5 h-5 text-neutral-600" />
                <span>Education & Credentials</span>
              </div>
              <div className="space-y-3">
                {profile.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200/70 text-sm"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900">{edu.degree}</div>
                      <div className="text-xs text-neutral-500">{edu.institution}</div>
                    </div>
                    <span className="text-xs font-medium text-neutral-600 mt-1 sm:mt-0 bg-white px-2.5 py-1 rounded-md border border-neutral-200 w-fit">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Timeline (Right) */}
          <div className="lg:col-span-5">
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-lg mb-6">
                <Briefcase className="w-5 h-5 text-neutral-700" />
                <span>Career Experience</span>
              </div>

              <div className="relative border-l-2 border-neutral-200 ml-3 space-y-6">
                {profile.experience.map((job, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Node Dot */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-neutral-900 shadow-2xs"></div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-bold text-neutral-900 text-sm">
                          {job.role}
                        </span>
                        <span className="text-xs font-medium text-neutral-500 bg-white px-2 py-0.5 rounded-md border border-neutral-200">
                          {job.period}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-neutral-700">
                        {job.company}
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                        {job.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Resume Link Box */}
              <div className="mt-8 pt-6 border-t border-neutral-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-900">
                    Want the full track record?
                  </div>
                  <div className="text-xs text-neutral-500">
                    Detailed PDF with references available.
                  </div>
                </div>
                <a
                  href="#contact"
                  className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 underline underline-offset-4"
                >
                  Request CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
