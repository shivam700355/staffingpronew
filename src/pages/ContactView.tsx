import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, HelpCircle, MessagesSquare, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { ToastNotification, SmallLoader } from '../components/FormElements';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('General Sourcing Support');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: 'success' | 'info' | 'warning' | 'danger' | 'error';
    message: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setToast({
        type: 'warning',
        message: 'Please complete all message fields.',
        description: 'We need your full name, email, and query details before submitting.'
      });
      return;
    }
    setIsSubmitting(true);

    const ticketId = `STPRO-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setToast({
        type: 'success',
        message: 'Support ticket successfully logged.',
        description: `Your reference number is ${ticketId}. A StaffingPro agent will reply soon.`
      });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="customer-support-panel">
      <SEO
        title="Customer Support & Help Desk"
        description="Get in touch with StaffingPro specialists. Located at Prestige Tech Park, Bengaluru, we are ready to assist with any queries."
        keywords="contact support, helpline, staffing center, staffingpro"
      />
      
      {/* Upper header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-sp-navy tracking-tight mb-3">
          StaffingPro Customer Support
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Have query concerns regarding parsed credentials, billing tiers, or verified recruitment systems? Our teams respond under 4 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left inquiry form block (7 columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-black text-sp-navy mb-1 flex items-center gap-2">
            <MessagesSquare className="h-5 w-5 text-sp-green" />
            <span>Transmit Support enquiry</span>
          </h2>
          <p className="text-xs text-gray-400 font-semibold mb-6">
            Complete details to open an active support tracker. Ref numbers are generated instantly.
          </p>

          {toast && (
            <div className="mb-4">
              <ToastNotification
                type={toast.type}
                message={toast.message}
                description={toast.description}
                onClose={() => setToast(null)}
              />
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-10 space-y-4" id="contact-success-notification">
              <div className="h-14 w-14 rounded-full bg-sp-green-light text-sp-green flex items-center justify-center mx-auto border border-sp-green/45">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-sp-navy">Support Docket Logged!</h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-sm mx-auto">
                  Thank you {name}! Your docket was logged under ticket <strong>#STPRO-{(Math.random()*100000).toFixed(0)}</strong>. Check your simulated mailbox for updates.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-6 py-2.5 bg-sp-navy text-white text-xs font-black rounded-lg hover:bg-sp-green transition-all"
              >
                Log another ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="space-y-4.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none focus:border-sp-green focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none focus:border-sp-green focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Target Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl cursor-pointer"
                >
                  <option value="General Sourcing Support">General Sourcing Support</option>
                  <option value="Billing & Subscriptions">Billing & Subscriptions</option>
                  <option value="Employer Account Verification">Employer Account Verification</option>
                  <option value="Candidate Data Privacy Office">Candidate Data Privacy Office</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Detailed Query Description</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="State your query questions clearly. Include transaction references if applicable..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-sp-green hover:bg-opacity-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm shadow-sp-green/20 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <SmallLoader label="Transmitting..." className="text-white" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Transmit Sourced Docket</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

        {/* Right coordinates and fast FAQs (5 columns) */}
        <div className="lg:col-span-1 border border-transparent hidden lg:block" /> {/** separator spacer */}

        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          
          {/* Coordinates information */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-sp-navy uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">
              Regional Headquarters
            </h3>

            <div className="space-y-4.5 text-xs text-gray-500 font-semibold leading-relaxed">
              <div className="flex gap-2.5">
                <MapPin className="h-5 w-5 text-sp-green shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-sp-navy block mb-0.5">Bengaluru Cluster Office</span>
                  <p>Level 14, Prestige Tech Park, Outer Ring Road, Bengaluru, KA 560103</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <Phone className="h-4.5 w-4.5 text-sp-green shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-sp-navy block mb-0.5">Telephone Support Desk</span>
                  <a href="tel:+12025550178" className="hover:text-sp-green hover:underline">
                    +1-202-555-0178
                  </a>
                </div>
              </div>

              <div className="flex gap-2.5">
                <Mail className="h-4.5 w-4.5 text-sp-green shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-sp-navy block mb-0.5">Carrier Inboxes</span>
                  <a href="mailto:support@staffingpro.com" className="hover:text-sp-green hover:underline">
                    support@staffingpro.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy pledge card */}
          <div className="bg-gradient-to-tr from-sp-navy to-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3.5">
            <div className="h-9 w-9 bg-white/10 rounded-lg flex items-center justify-center text-sp-green">
              <ShieldCheck className="h-5 w-5" />
            </div>
            
            <h4 className="text-sm font-extrabold tracking-wide">Bureau Privacy Pledge</h4>
            <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
              We fully comply with the national cybersecurity frameworks. Candidate records are strictly encrypted, isolating telemetry packets from cold-sells or unsolicited marketing agencies.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
