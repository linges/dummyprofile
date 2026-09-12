import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Copy,
  Check,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { UserProfile, ContactFormData } from '../types';

interface ContactSectionProps {
  profile: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    // Simulate reliable async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(
        `Thank you, ${formData.name}! Your message has been received. I will review it and reply to ${formData.email} promptly.`
      );
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 900);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-neutral-50/70 border-t border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/80 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-600" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Have a project in mind, an engineering opening, or just want to connect? Send a note or reach out via direct channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          {/* Direct Details (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card with Copy Feature */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Email Address
                    </div>
                    <div className="text-sm font-bold text-neutral-900 break-all">
                      {profile.email}
                    </div>
                  </div>
                </div>

                <button
                  id="btn-copy-email"
                  onClick={handleCopyEmail}
                  className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone & Location Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="p-2.5 w-fit rounded-xl bg-neutral-100 text-neutral-700">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Phone
                </div>
                <div className="text-sm font-semibold text-neutral-900">
                  {profile.phone}
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="p-2.5 w-fit rounded-xl bg-neutral-100 text-neutral-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Location
                </div>
                <div className="text-sm font-semibold text-neutral-900 leading-snug">
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-sm">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Response Time & Availability</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Currently open to full-time roles, contract engineering, and architectural consulting. I typically respond within 24 business hours.
              </p>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Professional Networks
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-100 hover:text-neutral-900 transition-colors shadow-2xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-100 hover:text-neutral-900 transition-colors shadow-2xs"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-100 hover:text-neutral-900 transition-colors shadow-2xs"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter / X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Fill out the form below and it will route directly to my inbox.
              </p>

              {submittedMessage ? (
                <div
                  id="contact-success-banner"
                  className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-base">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    {submittedMessage}
                  </p>
                  <button
                    onClick={() => setSubmittedMessage(null)}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-bold text-neutral-700 uppercase tracking-wider"
                      >
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Sarah Jenkins"
                        required
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-bold text-neutral-700 uppercase tracking-wider"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="sarah@company.com"
                        required
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="text-xs font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      Subject / Topic
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project collaboration or inquiry"
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, timeline, or scope..."
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400 resize-y"
                    ></textarea>
                  </div>

                  <button
                    id="btn-submit-contact"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 rounded-xl shadow-xs transition-all active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
