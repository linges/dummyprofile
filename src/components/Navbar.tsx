import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          id="nav-brand"
          href="#hero"
          className="group flex items-center gap-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-md"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center text-sm tracking-wider shadow-sm group-hover:bg-neutral-800 transition-colors">
            {profile.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-neutral-900 text-base leading-tight tracking-tight">
              {profile.name}
            </span>
            <span className="text-xs text-neutral-500 font-medium hidden sm:inline-block">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1 bg-neutral-100/80 p-1.5 rounded-full border border-neutral-200/60">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {profile.availableForHire && (
            <div
              id="hire-badge"
              className="hidden lg:flex items-center gap-2 px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for work
            </div>
          )}

          <button
            id="btn-nav-resume"
            onClick={onOpenResume}
            className="px-3.5 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Resume
          </button>

          <a
            id="btn-nav-contact"
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-xs transition-all active:scale-98"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="sm:hidden border-b border-neutral-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 shadow-lg"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 space-y-2">
            <button
              id="btn-mobile-resume"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full text-left px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              View Resume
            </button>
            <a
              id="btn-mobile-contact"
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
