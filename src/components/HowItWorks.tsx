import React from 'react';
import { UserPlus, UploadCloud, Search, CheckSquare } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 'step_1',
      title: 'Create account',
      desc: 'Create an account to gain unlimited access to our elite lateral career matches and secure recruitment features.',
      icon: UserPlus,
      bgColor: 'bg-blue-600 text-blue-50',
    },
    {
      id: 'step_2',
      title: 'Upload CV/Resume',
      desc: 'Our intelligent OCR parser instantly processes your experience credentials and lists demand skill tags.',
      icon: UploadCloud,
      bgColor: 'bg-sp-green text-white',
    },
    {
      id: 'step_3',
      title: 'Find suitable job',
      desc: 'Filter by city, wage requirements, and hybrid status to isolate active listings directly from partner firms.',
      icon: Search,
      bgColor: 'bg-emerald-500 text-sp-green-light',
    },
    {
      id: 'step_4',
      title: 'Apply job',
      desc: 'Submit your parsed profile alongside custom cover letters directly to verified HR departments with a single click.',
      icon: CheckSquare,
      bgColor: 'bg-amber-600 text-amber-100',
    },
  ];

  return (
    <section
      className="py-20 bg-slate-50 relative overflow-hidden"
      id="timeline-how-it-works"
    >
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-0 w-24 h-24 bg-blue-100/10 rounded-full blur-xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-12 w-64 h-64 bg-sp-green-light/10 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-navy tracking-tight mb-4">
            How StaffingPro Works
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Take four simple, highly secure steps to connect with progressive
            organizations across India.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <div
                key={step.id}
                id={`how-it-works-${step.id}`}
                className="
                  relative
                  p-6
                  rounded-2xl
                  flex
                  flex-col
                  items-center
                  text-center
                  bg-white
                  border
                  border-slate-100
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:shadow-slate-200
                  hover:-translate-y-2
                "
              >
                {/* Step Number */}
                <div className="absolute top-3 left-4 text-xs font-bold font-mono text-slate-300">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`
                    h-16
                    w-16
                    rounded-full
                    flex
                    items-center
                    justify-center
                    p-4
                    mb-5
                    transition-transform
                 
                    ${step.bgColor}
                  `}
                >
                  <IconComponent className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-sp-navy mb-2.5">
                  {step.title}
                </h3>

                {/* Description */}
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