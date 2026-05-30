import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Star, Sparkles, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function PricingPlansView() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Billing calculation logic
  const calculatePrice = (baseMonthly: number) => {
    if (billingPeriod === 'yearly') {
      const discounted = Math.round(baseMonthly * 10); // 2 months free equivalent
      return discounted.toLocaleString('en-IN');
    }
    return baseMonthly.toLocaleString('en-IN');
  };

  const calculatePerMonthValue = (baseMonthly: number) => {
    if (billingPeriod === 'yearly') {
      return Math.round((baseMonthly * 10) / 12).toLocaleString('en-IN');
    }
    return baseMonthly.toLocaleString('en-IN');
  };

  const plans = [
    {
      id: 'sub_starter',
      title: 'Starter Bundle',
      desc: 'Ideal for single-role hiring campaigns.',
      basePrice: 999,
      features: [
        '5 Active Job Listings',
        '100 Verified CV Views / mo',
        'Basic Telemetry Sorter',
        'Standard Email Support',
        'Job published for 30 days'
      ],
      cta: 'Choose Starter Plan',
      badge: ''
    },
    {
      id: 'sub_growth',
      title: 'Growth Package',
      desc: 'Perfect for fast-growing startup teams.',
      basePrice: 2999,
      popular: true,
      features: [
        '20 Active Job Listings',
        '3 Featured Placement Spots',
        '500 Verified CV Views / mo',
        'Direct Candidate SMS Prompts',
        'Advanced Telemetry Filters',
        'Priority Technical Support'
      ],
      cta: 'Choose Growth Plan',
      badge: 'Most Popular'
    },
    {
      id: 'sub_enterprise',
      title: 'Enterprise Tier',
      desc: 'Tailored for major multinatinals.',
      basePrice: 7999,
      features: [
        'Unlimited Active Listings',
        '15 Featured Placement Spots',
        'Unlimited CV Archive Access',
        'Automated Monthly Match Audits',
        'Dedicated Recruiter Seat Managers',
        '24/7 Telephone SLA Support'
      ],
      cta: 'Activate Enterprise Tier',
      badge: 'Best Corporate Value'
    }
  ];

  const faqs = [
    {
      q: 'How does the OCR parser handle uploaded student or medical CV files?',
      a: 'Our parsed logic leverages specialized semantic dictionary parameters calibrated natively against medical consultant roles (such as MD Surgeons or Anesthesiologists) and software development fields. Once uploaded, key parameters are synchronized directly, extracting skills and experience values autonomously within seconds.'
    },
    {
      q: 'Can we toggle between Monthly and Yearly sub tiers later?',
      a: 'Absolutely. Recruiter accounts can alter subscription settings at any stage. Upgrading immediately triggers pro-rated adjustments, while downgrades activate at the culmination of the current billing cycle.'
    },
    {
      q: 'Are candidate applications strictly validated for spam mitigation?',
      a: 'Yes. Candidates submit credentials integrated with unique carrier email/phone confirmations. Unfit or incomplete checklists bypass direct executive portals, minimizing inbox clutter.'
    },
    {
      q: 'Do you charge recruiters direct cuts per onboarded candidate?',
      a: 'We never charge placement cuts. Recruiting teams pay only the predictable flat subscription rates displayed on this page.'
    },
    {
      q: 'What payment frameworks do you support?',
      a: 'We accept Razorpay, UPI, standard Credit/Debit cards, Net Banking, and corporate invoicing frameworks matching Indian regulatory standards.'
    }
  ];

  const handleToggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="pricing-plans-view-panel">
      <SEO
        title="Transparent Pricing Plans | Post Jobs"
        description="Select the ideal placement plan for your enterprise. Post live jobs, unlock candidate databases, and enjoy priority sifting."
        keywords="job pricing, employer plans, list jobs, hire candidates, staffingpro"
      />
      
      {/* Upper header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-sp-navy tracking-tight mb-4">
          Recruitment Billing Models Engineered for scale
        </h1>
        <p className="text-sm text-gray-500 font-medium max-w-xl mx-auto mb-8">
          Predictable flat-pricing. Zero agency commissions. Toggle billing cycles to access discounted yearly rates.
        </p>

        {/* Dynamic Billing Period Switch button */}
        <div className="flex items-center justify-center gap-3 bg-white p-1.5 rounded-full border border-gray-250 max-w-[280px] mx-auto shadow-xs">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-sp-navy text-white shadow-sm'
                : 'text-gray-500 hover:text-sp-navy'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1 ${
              billingPeriod === 'yearly'
                ? 'bg-sp-green text-white shadow-sm'
                : 'text-gray-500 hover:text-sp-navy'
            }`}
          >
            <span>Yearly</span>
            <span className="text-[9px] bg-yellow-400 text-sp-navy font-extrabold px-1.5 py-0.5 rounded-full uppercase scale-90">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans layout grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-2xl border transition-all duration-300 p-6.5 flex flex-col justify-between relative ${
              p.popular
                ? 'border-2 border-sp-green shadow-xl scale-102 lg:scale-105 z-10'
                : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            {p.badge && (
              <span className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-full shadow-md ${
                p.popular ? 'bg-sp-green text-white' : 'bg-sp-navy text-white'
              }`}>
                {p.badge}
              </span>
            )}

            <div>
              <div className="mb-4">
                <h3 className="text-lg font-black text-sp-navy mb-1.5">{p.title}</h3>
                <p className="text-xs text-gray-400 leading-normal font-semibold pr-4">{p.desc}</p>
              </div>

              {/* Dynamic Prices tags */}
              <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-100 mb-6">
                {billingPeriod === 'yearly' ? (
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-gray-400 font-extrabold uppercase">Bill Yearly:</span>
                      <span className="text-3xl font-sans font-black text-sp-navy">₹{calculatePrice(p.basePrice)}</span>
                    </div>
                    <div className="text-[11px] text-sp-green font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3 fill-current shrink-0" />
                      <span>Equivalent to ₹{calculatePerMonthValue(p.basePrice)} / Month (2 Months FREE)</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-sans font-black text-sp-navy">₹{p.basePrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-400 font-bold">/ Month</span>
                  </div>
                )}
                <p className="text-[10px] text-gray-400 font-semibold mt-1.5">Exc. GST taxes. Setup completed under under 1 min.</p>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <ul className="space-y-3.5 mb-8">
                {p.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex gap-2.5 text-xs text-gray-600 font-semibold leading-relaxed">
                    <Check className="h-4.5 w-4.5 text-sp-green shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => alert(`Successfully selected the ${p.title} (${billingPeriod} plan)! Recruiting seats initiated.`)}
              className={`w-full py-3.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 active:scale-98 ${
                p.popular
                  ? 'bg-sp-green hover:bg-opacity-95 text-white shadow-sm shadow-sp-green/20 hover:-translate-y-0.5'
                  : 'bg-sp-navy hover:bg-opacity-95 text-white hover:-translate-y-0.5'
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Accordion center alignment */}
      <div className="max-w-3xl mx-auto border-t border-gray-150 pt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3.5xl font-extrabold text-sp-navy tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold">
            Everything recruiter admins and active candidates need to understand about the platform.
          </p>
        </div>

        <div className="space-y-3.5" id="faq-accordion-group">
          {faqs.map((faq, idx) => {
            const isExp = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-150 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => handleToggleFaq(idx)}
                  className="w-full text-left px-5.5 py-4.5 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-sp-navy leading-normal pr-2">
                    {faq.q}
                  </span>
                  {isExp ? (
                    <ChevronUp className="h-4 w-4 text-sp-green shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isExp && (
                  <div className="px-5.5 pb-5 pt-1 border-t border-gray-50 bg-slate-50/20 text-xs sm:text-xs.5 leading-relaxed text-gray-500 font-medium animate-fade">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
