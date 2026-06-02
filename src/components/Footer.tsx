import React from 'react';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import logoImage from "../../assets/StaffingLogo.png"

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sp-navy text-white pt-16 pb-8" id="global-application-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column block layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12 mb-8">
          
          {/* Column 1: About agency and summary info */}
          <div className="space-y-4">
           <div
  onClick={() => setCurrentPage('home')}
  className="cursor-pointer flex items-center"
>
  <img
    src={logoImage}
    alt="Logo"
    className="h-12 w-auto object-contain"
  />
</div>
            <p className="text-gray-300 text-sm leading-relaxed mt-4">
              Connecting talented professionals with leading employers through a simple and efficient hiring platform.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white/5 hover:bg-sp-green hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white/5 hover:bg-sp-green hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white/5 hover:bg-sp-green hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-white/5 hover:bg-sp-green hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Job Seekers quick links */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-sp-green pl-3 mb-6">
              For Job Seekers
            </h3>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: 'Browse Jobs', page: 'jobs' },
                { label: 'Featured Categories', page: 'home' },
                { label: 'Candidate Dashboard', page: 'candidates' },
                { label: 'Success Testimonials', page: 'candidates' }
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(item.page)}
                    className="text-gray-300 hover:text-sp-green transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Employers quick links */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-sp-green pl-3 mb-6">
              For Employers
            </h3>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: 'Post a New Job', page: 'postjob' },
                { label: 'Employer Portal', page: 'employers' },
                { label: 'Pricing Plans', page: 'pricing' },
                { label: 'Candidate Database', page: 'candidates' }
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(item.page)}
                    className="text-gray-300 hover:text-sp-green transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact channels and office locations */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-sp-green pl-3 mb-6">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-sp-green shrink-0 mt-0.5" />
                <span>Office no- 520, 5th Floor, Parsvanath Plaza, Opposite Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-sp-green shrink-0" />
                <a href="tel:+918810829604" className="hover:text-sp-green transition-colors">
                 +91 88108 29604
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-sp-green shrink-0" />
                <a href="mailto:support@staffingpro.com" className="hover:text-sp-green transition-colors">
                  support@staffingpro.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & certification notices bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 pt-2">
          <div>
            &copy; {currentYear} StaffingPro recruitment. All rights reserved. Registered under the National Career Services framework.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sp-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sp-green transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-sp-green transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
