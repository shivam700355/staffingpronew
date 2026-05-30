import React from 'react';
import { UserPlus, UploadCloud, Search, CheckSquare } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 'step_1',
      title: 'Create account',
      desc: 'Create an account to gain unlimited access to our elite lateral career matches and secure recruitment features.',
      icon: UserPlus,
      highlight: false,
      bgColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'step_2',
      title: 'Upload CV/Resume',
      desc: 'Our intelligent OCR parser instantly processes your experience credentials and lists demand skill tags.',
      icon: UploadCloud,
      highlight: true, // Styled prominently with shadow card as seen in mockup
      bgColor: 'bg-sp-green text-white',
    },
    {
      id: 'step_3',
      title: 'Find suitable job',
      desc: 'Filter by city, wage requirements, and hybrid status to isolate active listings directly from partner firms.',
      icon: Search,
      highlight: false,
      bgColor: 'bg-emerald-50 text-sp-green',
    },
    {
      id: 'step_4',
      title: 'Apply job',
      desc: 'Submit your parsed profile alongside custom cover letters directly to verified HR departments with a single click.',
      icon: CheckSquare,
      highlight: false,
      bgColor: 'bg-amber-100 text-amber-800',
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="timeline-how-it-works">
      
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-0 w-24 h-24 bg-blue-100/10 rounded-full blur-xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-12 w-64 h-64 bg-sp-green-light/10 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title center-aligned */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-navy tracking-tight mb-4 animate-fade">
            How StaffingPro Works
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Take four simple, highly secure steps to connect with progressive organizations across India.
          </p>
        </div>

        {/* Steps container */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Curved Connector SVG (Visible only on desktop wide resolutions) */}
          <div className="hidden lg:block absolute top-[50px] left-[12%] right-[12%] h-[60px] -z-10 overflow-visible pointer-events-none">
            <svg className="w-full h-full" fill="none" viewBox="0 0 800 60" xmlns="http://www.w3.org/2000/svg">
              {/* Stepped wavy dashed arrow connectors */}
              <path
                d="M 10,20 Q 130,-15 250,20 T 490,20 T 730,20"
                stroke="#6ABF45"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                className="opacity-45"
              />
              <path d="M 245,15 L 255,20 L 245,25 Z" fill="#6ABF45" className="opacity-60" />
              <path d="M 485,15 L 495,20 L 485,25 Z" fill="#6ABF45" className="opacity-60" />
              <path d="M 725,15 L 735,20 L 725,25 Z" fill="#6ABF45" className="opacity-60" />
            </svg>
          </div>

          {/* Render individual steps */}
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div
                key={step.id}
                className={`transition-all duration-300 p-6 rounded-2xl flex flex-col items-center text-center relative ${
                  step.highlight
                    ? 'bg-white shadow-xl shadow-slate-100 border border-slate-100 scale-105 z-20'
                    : 'bg-transparent border border-transparent'
                }`}
                id={`how-it-works-${step.id}`}
              >
                {/* Step badge absolute */}
                <div className="absolute top-3 left-4 text-xs font-bold font-mono text-slate-300">
                  0{index + 1}
                </div>

                {/* Circular indicator container */}
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center p-4 mb-5 transition-transform duration-300 ${
                    step.bgColor
                  } hover:scale-110 ${
                    step.highlight ? 'shadow-md shadow-sp-green/20' : ''
                  }`}
                >
                  <IconComponent className="h-7 w-7" />
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-sp-navy mb-2.5">
                  {step.title}
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
