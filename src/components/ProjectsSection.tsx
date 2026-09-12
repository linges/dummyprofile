import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Web Application',
    'Design System',
    'Developer Tool',
    'Mobile & SaaS',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-neutral-600" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              A curated selection of applications, design systems, and tools engineered for performance and scalability.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="text-sm font-medium text-neutral-500">
            Showing <span className="font-semibold text-neutral-900">{filteredProjects.length}</span> of{' '}
            <span className="font-semibold text-neutral-900">{projects.length}</span> projects
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group bg-neutral-50 rounded-2xl border border-neutral-200/90 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-neutral-300"
            >
              <div>
                {/* Image Container with Hover Zoom */}
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-200 cursor-pointer"
                  onClick={() => setActiveModalProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/25 transition-colors"></div>

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-neutral-800 shadow-xs">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-white shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/40">
                    <span className="px-4 py-2 rounded-xl bg-white text-neutral-900 font-semibold text-xs flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{project.clientOrContext}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-lg font-bold text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer leading-snug"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-600 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-neutral-200/70 text-neutral-600 text-[11px] font-medium">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="px-5 sm:px-6 py-4 bg-white border-t border-neutral-200 flex items-center justify-between">
                <button
                  id={`btn-inspect-${project.id}`}
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-neutral-800 hover:text-neutral-950 flex items-center gap-1 group/btn"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    id={`link-github-${project.id}`}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Source Code"
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    id={`link-demo-${project.id}`}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Live Preview"
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
