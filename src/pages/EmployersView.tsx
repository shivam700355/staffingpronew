import React from 'react';
import { Target, ShieldCheck, Zap, ArrowRight, CheckCircle2, UserCheck, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

interface EmployersViewProps {
  setCurrentPage: (page: string) => void;
}

export default function EmployersView({ setCurrentPage }: EmployersViewProps) {
  const benefits = [
    {
      icon: Target,
      title: 'Precision Sourcing',
      desc: 'Our advanced OCR system parses uploaded candidate profiles in real-time, matching vacancy skills perfectly.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Telemetry',
      desc: 'No ghosting. Only active candidates verified by national carrier databases can submit applications.'
    },
    {
      icon: Zap,
      title: 'Instant Integration',
      desc: 'Publish a vacancy in 4 quick steps and receive compiled matching candidate resumes under 10 minutes.'
    }
  ];

  const plans = [
    {
      title: 'Starter Package',
      price: '999',
      desc: 'Best for single-role localized hiring.',
      features: ['5 Active Listings', '100 OCR Resume Views', 'Standard Telemetry', 'Email Support']
    },
    {
      title: 'Growth Package',
      price: '2,999',
      popular: true,
      desc: 'Best for fast-expanding teams.',
      features: ['20 Active Listings', '5 Featured (Multi-Grid)', '500 OCR Resume Views', 'Priority Support']
    },
    {
      title: 'Enterprise Tier',
      price: '7,999',
      desc: 'Best for major corporations.',
      features: ['Unlimited Listings', '15 Featured (Top Placement)', 'Unlimited OCR Views', 'Dedicated Account Executive']
    }
  ];

  return (
    <div className="bg-sp-bg" id="employers-view-portal">
      <SEO
        title="Partner with Us | StaffingPro Employers"
        description="Empower your corporate staffing. Hire elite candidates with our custom sourcing tools, premium talent sorter, and developer desks."
        keywords="recruit candidates, hire technical staff, staffing partner, placement agency, staffingpro"
      />
      
      {/* Executive Hero Banner */}
      <section className="bg-white border-b border-gray-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-sp-navy leading-tight tracking-tight mb-4">
            Connect with certified professionals <span className="text-sp-green">instantly.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium mb-8 leading-relaxed">
            Eliminate traditional hiring delays. StaffingPro connects enterprise hiring executives with lateral talent profiles matching specific medical, software, and finance skills automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('postjob')}
              className="w-full sm:w-auto px-8 py-3.5 bg-sp-green hover:bg-opacity-95 text-white font-bold rounded-xl transition-all shadow-md shadow-sp-green/20"
            >
              Post a Position Form
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-sp-navy text-sp-navy hover:bg-gray-50 font-bold rounded-xl transition-all"
            >
              Request Enterprise Demo
            </button>
          </div>
        </div>
      </section>

      {/* Why Post with Us 3-column benefits block */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy mb-3">Why Source with StaffingPro</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold leading-normal">
            We bypass recruitment agencies, providing transparent pipelines for direct partner integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <div key={index} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="h-12 w-12 rounded-xl bg-sp-green-light text-sp-green flex items-center justify-center mb-5 group-hover:scale-105 transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-sp-navy mb-2">{b.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-semibold">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How to Post a Job logic timeline */}
      <section className="bg-white py-16 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy mb-3">Simplify your sourcing in 3 steps</h2>
            <p className="text-xs sm:text-sm text-gray-400 font-semibold">
              Fill active positions using our automated wizard layouts under ten minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {[
              { id: '1', title: 'Compile basic specifications', desc: 'Identify role categories, locations, target salary brackets, and work mode.' },
              { id: '2', title: 'Input specific required skills', desc: 'Select matching keywords for our automated parser to track matching candidate tags.' },
              { id: '3', title: 'Preview & post live', desc: 'Verify your layout mockup instantly, publish, and receive applicant telemetry data.' }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 p-4">
                <div className="h-10 w-10 rounded-full bg-sp-green/10 text-sp-green text-sm font-black flex items-center justify-center mx-auto mb-4 border border-sp-green/30">
                  {step.id}
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-sp-navy mb-2">{step.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-semibold">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing options preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy mb-3">Hiring Plans Tailored for Sourcing Needs</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold">
            Choose a solution matching your active recruiter seats. No hidden agency cuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all p-6.5 flex flex-col justify-between relative ${
                p.popular
                  ? 'border-2 border-sp-green shadow-lg scale-105 z-10'
                  : 'border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {p.popular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-sp-green text-white text-[10px] uppercase font-black tracking-widest rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-black text-sp-navy mb-1">{p.title}</h3>
                <p className="text-xs text-gray-400 mb-4">{p.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl.5 font-sans font-black text-sp-navy">₹{p.price}</span>
                  <span className="text-xs text-gray-400 font-bold">/ month</span>
                </div>

                <div className="h-px bg-gray-100 my-4" />

                <ul className="space-y-3.5">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex gap-2.5 text-xs text-gray-600 font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-sp-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setCurrentPage('pricing')}
                className={`w-full py-2.5 rounded-lg text-xs font-black transition-all ${
                  p.popular
                    ? 'bg-sp-green text-white shadow-sm shadow-sp-green/20'
                    : 'bg-slate-50 border border-slate-200 text-sp-navy hover:bg-slate-100'
                }`}
              >
                Configure Sourcing Plans
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section bottom */}
      <section className="bg-sp-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3.5xl font-sans font-extrabold leading-tight tracking-tight mb-4">
            Ready to find your next certified hires?
          </h2>
          <p className="text-sm text-gray-300 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
            Configure your corporate recruiter portal, upload active specifications, and connect with direct matches under ten minutes.
          </p>
          <button
            onClick={() => setCurrentPage('postjob')}
            className="px-8 py-3.5 bg-sp-green hover:bg-opacity-95 text-white font-bold rounded-xl transition-all shadow-md shadow-sp-green/20 inline-flex items-center gap-2"
          >
            <span>Initiate Position Wizard</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
