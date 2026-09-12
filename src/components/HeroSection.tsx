import React from 'react';
import {
  MapPin,
  ArrowDown,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeroSectionProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onOpenResume }) => {
  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'mail':
        return <Mail className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <section id="hero" className="pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Profile Text & Intro */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{profile.role}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] mb-6">
              Hi, I'm <span className="underline decoration-neutral-300 underline-offset-8 decoration-wavy">{profile.name}</span>.
            </h1>

            <p className="text-lg sm:text-xl text-neutral-700 font-normal leading-relaxed max-w-2xl mb-6">
              {profile.headline}
            </p>

            <p className="text-base text-neutral-600 leading-relaxed max-w-2xl mb-8">
              {profile.bio}
            </p>

            {/* Location & Quick Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-neutral-600 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-neutral-100/80 px-3 py-1 rounded-md text-neutral-700 font-medium">
                <MapPin className="w-4 h-4 text-neutral-500" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-md text-emerald-800 font-medium border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Available for Contract & Full-time
              </span>
            </div>

            {/* Primary Calls to Action */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10">
              <a
                id="hero-cta-projects"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-xs transition-all active:scale-98"
              >
                <span>View Featured Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                id="hero-cta-resume"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl shadow-2xs transition-all active:scale-98"
              >
                <FileText className="w-4 h-4 text-neutral-600" />
                <span>Resume / CV</span>
              </button>

              <a
                id="hero-cta-contact"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mr-2">
                Connect:
              </span>
              {profile.socialLinks.map((social) => (
                <a
                  key={social.label}
                  id={`hero-social-${social.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg shadow-2xs transition-all hover:-translate-y-0.5"
                  title={`${social.label} (${social.username})`}
                >
                  {renderSocialIcon(social.iconName)}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Photo / Visual Card */}
          <div className="relative flex-shrink-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-3 bg-white border border-neutral-200 shadow-md">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                loading="eager"
              />
              {/* Subtle Floating Role Badge */}
              <div className="absolute -bottom-4 -left-4 bg-neutral-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg border border-neutral-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active in Open Source & SaaS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metric / Stat Highlights */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              id={`stat-card-${idx}`}
              className="p-5 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs text-center sm:text-left transition-all hover:border-neutral-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-neutral-800 mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-500 leading-normal">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
