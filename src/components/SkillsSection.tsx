import React, { useState } from 'react';
import { Layers, Search, Check } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    skills: cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const totalSkillsCount = categories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-neutral-900 text-white';
      case 'Advanced':
        return 'bg-neutral-200 text-neutral-800';
      default:
        return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 bg-neutral-50/50 border-t border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/80 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-neutral-600" />
              <span>Technical Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Skills & Expertise
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Modern tooling and technologies I actively use to ship production applications.
            </p>
          </div>

          {/* Quick Skill Search */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="skill-search-input"
              type="text"
              placeholder={`Search ${totalSkillsCount} skills (e.g. React)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              id={`skill-category-${catIdx}`}
              className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-neutral-100 pb-4 mb-4">
                  <h3 className="font-bold text-lg text-neutral-900">
                    {category.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {category.description}
                  </p>
                </div>

                {category.skills.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic py-4">
                    No matching skills in this category.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50/70 hover:bg-neutral-100/70 transition-colors border border-neutral-100"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                          <span className="text-sm font-semibold text-neutral-800">
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-400 font-medium">
                            {skill.years}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getLevelBadgeClass(
                              skill.level
                            )}`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Category Note */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-xs text-neutral-500">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Production tested with automated CI/CD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
