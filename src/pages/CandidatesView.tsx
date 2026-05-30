import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, UploadCloud, Star, BookOpen, UserCheck, Briefcase } from 'lucide-react';
import { CANDIDATES } from '../data';
import SEO from '../components/SEO';

export default function CandidatesView() {
  const [resumeParsed, setResumeParsed] = useState(false);
  const [parseName, setParseName] = useState('');

  const handleSimulatedParse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fName = e.target.files[0].name;
      setParseName(fName);
      setResumeParsed(true);
    }
  };

  const demandSkills = [
    'React.js Developer',
    'Clinical Anesthesiology',
    'General Surgery MS',
    'Python & Machine Learning',
    'Figma High-Fidelity UI/UX',
    'SAP Financial ERP Auditing',
    'Direct Field Logistics'
  ];

  return (
    <div className="bg-sp-bg" id="candidates-view-portal">
      <SEO
        title="Career Guides & Direct Candidacy Resources"
        description="Advance your resume and career track with our free expert portfolio analysis, interview prep checklists, and placement resources."
        keywords="placement assistance, resume builder, placement tips, interview roadmap, staffingpro"
      />
      
      {/* Hero sector */}
      <section className="bg-white border-b border-gray-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sp-green-light text-sp-green rounded-full border border-sp-green/20">
                <Sparkles className="h-4 w-4 text-sp-green fill-current" />
                <span className="text-xs font-bold tracking-wide">OCR Resume Extraction Live</span>
              </div>
              <h1 className="text-3xl sm:text-4.5xl font-sans font-extrabold text-sp-navy leading-tight tracking-tight">
                Enhance your lateral career trajectory.
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
                StaffingPro parses candidate parameters to matching job cards cleanly. Skip middle agencies, avoid spam calls, and connect with direct HR representatives at verified Indian tech clusters & healthcare facilities.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex gap-2.5 text-sm text-gray-600 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-sp-green shrink-0" />
                  <span>Real-time telemetry matching metrics.</span>
                </div>
                <div className="flex gap-2.5 text-sm text-gray-600 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-sp-green shrink-0" />
                  <span>Interactive cover-letter validations inside detail cards.</span>
                </div>
                <div className="flex gap-2.5 text-sm text-gray-600 font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-sp-green shrink-0" />
                  <span>Zero subscription fees for active job seekers.</span>
                </div>
              </div>
            </div>

            {/* Resume Upload CTA block right side */}
            <div className="bg-white border border-gray-150 p-6.5 rounded-2xl shadow-lg relative">
              <div className="absolute top-0 right-0 h-10 w-10 bg-sp-green-light rounded-bl-3xl flex items-center justify-center text-sp-green font-black">
                ★
              </div>
              
              <h3 className="text-base sm:text-lg font-black text-sp-navy mb-2 flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-sp-green" />
                <span>Simulate Automated OCR Parsing</span>
              </h3>
              <p className="text-xs text-gray-400 font-semibold mb-4 leading-normal">
                Our parser instantly processes your experience credentials and maps available demand skill tags into your cached browser profile.
              </p>

              {resumeParsed ? (
                <div className="bg-sp-green-light/20 border border-sp-green/35 rounded-xl p-5 text-center space-y-3 animate-fade">
                  <CheckCircle2 className="h-8 w-8 text-sp-green mx-auto" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-sp-navy">Document Successfully Parsed!</h4>
                    <span className="text-xs text-slate-500 font-semibold block truncate select-all">{parseName}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                    We matched your document against 10 active vacancies across <strong>Bengaluru, Gurgaon, and Mumbai</strong> categories! Browse jobs to see matches.
                  </p>
                  <button
                    onClick={() => {
                      setResumeParsed(false);
                      setParseName('');
                    }}
                    className="text-[11px] font-bold text-red-500 hover:underline"
                  >
                    Remove and re-upload document
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <label
                    htmlFor="cand-resume-file"
                    className="border-2 border-dashed border-gray-200 hover:border-sp-green hover:bg-slate-50/50 rounded-xl p-8 text-center cursor-pointer transition-all block"
                  >
                    <input
                      type="file"
                      id="cand-resume-file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleSimulatedParse}
                      className="hidden"
                    />
                    <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-2.5" />
                    <div className="text-xs font-bold text-sp-navy mb-1.5">Click to browse your CV / Resume</div>
                    <span className="text-[10px] text-gray-400 font-semibold block">Supports PDF and Word formats under 12MB.</span>
                  </label>

                  {/* Profile builder guidelines */}
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-lg space-y-2 text-xs">
                    <h4 className="font-extrabold text-sp-navy uppercase text-[10px] tracking-wide">Tips for 100% Match Scores:</h4>
                    <p className="text-gray-500 font-medium">1. Ensure your current Indian City is listed accurately.</p>
                    <p className="text-gray-500 font-medium">2. Include distinct developer framework chips or clinical credentials in headers.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Skills list section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy mb-2.5">Top Skills Currently Sourced</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold leading-normal">
            Employers are actively filtering databases and compiling pipelines for these certified skillsets.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {demandSkills.map((skName, sIdx) => (
            <span
              key={sIdx}
              className="text-xs font-bold bg-white text-sp-navy hover:text-sp-green border border-gray-150 rounded-full py-2.5 px-4.5 shadow-xs transition-colors hover:border-sp-green hover:-translate-y-0.5 cursor-default"
            >
              🔥 {skName}
            </span>
          ))}
        </div>
      </section>

      {/* Genuine Success Stories display cards */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy mb-3">Candidate Success Stories</h2>
            <p className="text-xs sm:text-sm text-gray-400 font-semibold">
              Read how specialized specialists streamlined their recruitment loops using our interactive dashboard matching indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CANDIDATES.slice(0, 3).map((cand) => (
              <div
                key={cand.id}
                className="bg-slate-50 border border-gray-150 p-6 rounded-2xl shadow-sm relative flex flex-col justify-between"
                id={`story-${cand.id}`}
              >
                <div>
                  {/* Rating indicators stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current shrink-0" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-medium italic leading-relaxed mb-6">
                    "{cand.successStory || 'Extremely intuitive job filters and seamless direct application steps.'}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`h-11 w-11 rounded-full ${cand.avatarColor} font-black flex items-center justify-center text-sm uppercase shrink-0 shadow-sm`}>
                    {cand.fullName.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-sp-navy leading-none mb-1">{cand.fullName}</h4>
                    <span className="text-[11px] text-gray-400 font-semibold block">{cand.title} • {cand.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
