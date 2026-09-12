import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Calendar, Building, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        id="project-modal-dialog"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 focus:outline-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"></div>

          {/* Close Button */}
          <button
            id="btn-close-project-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlaid Title on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-900/60 backdrop-blur-md text-neutral-200 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.year}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-900/60 backdrop-blur-md text-neutral-200 flex items-center gap-1">
                <Building className="w-3 h-3" />
                {project.clientOrContext}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Detailed Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Project Overview
            </h3>
            <p className="text-base text-neutral-700 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Key Technical Highlights & Outcomes
              </h3>
              <div className="space-y-2.5">
                {project.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-sm text-neutral-800"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
              Technologies & Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 text-sm font-semibold rounded-xl border border-neutral-300 shadow-2xs transition-colors"
              >
                <Github className="w-4 h-4 text-neutral-700" />
                <span>Source Code</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
