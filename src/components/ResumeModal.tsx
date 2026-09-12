import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, MapPin, Mail, Phone, Briefcase, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        id="resume-modal-dialog"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Curriculum Vitae Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              id="btn-close-resume-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div className="p-8 sm:p-12 space-y-8 print:p-0">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-base font-semibold text-neutral-700 mt-1">
                {profile.role}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {profile.phone}
                </span>
              </div>
            </div>

            <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 w-fit">
              Status: Available for hire
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {profile.bio} {profile.headline}
            </p>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Work Experience</span>
            </div>
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-sm font-bold text-neutral-900">
                      {exp.role} <span className="font-normal text-neutral-600">at {exp.company}</span>
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </div>
            <div className="space-y-3">
              {profile.education.map((edu, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">{edu.degree}</span>
                    <span className="text-neutral-500"> — {edu.institution}</span>
                  </div>
                  <span className="text-neutral-500">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="pt-4 border-t border-neutral-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Primary Technologies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                'React',
                'TypeScript',
                'JavaScript (ESNext)',
                'Tailwind CSS',
                'Node.js',
                'Express',
                'Next.js',
                'Vite',
                'REST & GraphQL',
                'PostgreSQL',
                'Docker',
                'Git & GitHub',
                'Vitest & Jest',
                'CI/CD Pipelines',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
