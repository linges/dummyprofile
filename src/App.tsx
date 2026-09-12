/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { dummyProfile, dummySkillCategories, dummyProjects } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* Top Fixed Header */}
      <Navbar
        profile={dummyProfile}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* User Profile / Hero Section */}
        <HeroSection
          profile={dummyProfile}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* About & Engineering Journey Section */}
        <AboutSection profile={dummyProfile} />

        {/* Skills & Technical Competencies */}
        <SkillsSection categories={dummySkillCategories} />

        {/* Projects Showcase & Modal Previews */}
        <ProjectsSection projects={dummyProjects} />

        {/* Contact Section with Interactive Form & Dummy Details */}
        <ContactSection profile={dummyProfile} />
      </main>

      {/* Footer */}
      <Footer profile={dummyProfile} />

      {/* Resume Modal Dialog */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        profile={dummyProfile}
      />
    </div>
  );
}
