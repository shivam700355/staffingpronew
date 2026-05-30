import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  IndianRupee,
  Calendar,
  Briefcase,
  Users2,
  Trophy,
  ArrowLeft,
  Star,
  Globe,
  Upload,
  CheckCircle2,
  Link,
  ChevronRight,
  FileCheck,
  Lock,
  AlertTriangle,
  UserX,
  FileCode2
} from 'lucide-react';
import { Job, Company } from '../types';
import { JOBS, COMPANIES } from '../data';
import { getSeekerProfile, calculateSeekerCompleteness } from '../profileHelper';
import SEO from '../components/SEO';

interface JobDetailViewProps {
  job: Job;
  onBack: () => void;
  onApplySuccess: (jobId: string, data: { fullName: string; email: string; coverLetter: string; resumeName: string }) => void;
  currentUser: { email: string; name: string; role: 'seeker' | 'employer' } | null;
}

export default function JobDetailView({ job, onBack, onApplySuccess, currentUser }: JobDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'company'>('overview');
  
  // Apply Form state logic
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile data fetch for checking completeness gates dynamically
  const profile = currentUser && currentUser.role === 'seeker' ? getSeekerProfile(currentUser.email) : null;
  const completeness = profile ? calculateSeekerCompleteness(profile) : 0;

  // Sync profile details into form elements automatically
  useEffect(() => {
    if (profile) {
      if (!fullName) setFullName(profile.fullName || currentUser?.name || '');
      if (!email) setEmail(profile.email || currentUser?.email || '');
      if (!resumeName && profile.resumeName && profile.resumeName !== 'No Document Uploaded') {
        setResumeName(profile.resumeName);
      }
    }
  }, [profile, currentUser]);

  const company = COMPANIES.find(c => c.id === job.companyId) || COMPANIES[0];

  // Helper salary formatter
  const formatSalarRange = (min: number, max: number) => {
    const minLakh = (min / 100000).toFixed(1);
    const maxLakh = (max / 100000).toFixed(1);
    return `₹${minLakh}L - ₹${maxLakh}L / Year`;
  };

  // Find similar jobs based on category, excluding current
  const similarJobs = JOBS.filter(
    j => j.category === job.category && j.id !== job.id
  ).slice(0, 3);

  // File choice trigger
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !coverLetter.trim() || !resumeName) {
      setErrorMsg('Please complete all form fields and upload your resume/CV.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onApplySuccess(job.id, {
        fullName,
        email,
        coverLetter,
        resumeName
      });
    }, 1200);
  };

  const compName = company ? company.name : 'Top Firm';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="job-details-view-panel">
      <SEO 
        title={`${job.title} at ${compName}`}
        description={`Apply now for the ${job.title} position in ${job.city}. Offering competitive CTC and elite growth packages.`}
        keywords={`${job.title.toLowerCase()}, job vacancy, carrier path, staffingpro`}
      />
      
      {/* Breadcrumb Navigation bar */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-bold mb-6" id="detail-breadcrumb">
        <button onClick={onBack} className="hover:text-sp-green transition-colors">Home</button>
        <ChevronRight className="h-3 w-3" />
        <button onClick={onBack} className="hover:text-sp-green transition-colors">Find Job</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-sp-navy truncate font-black max-w-[200px]">{job.title}</span>
      </nav>

      {/* Return to Finder trigger */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2.5 px-4.5 py-2.5 bg-white border border-gray-150 rounded-xl text-xs font-bold text-sp-navy hover:text-sp-green hover:shadow-xs transition-all mb-8"
        id="detail-back-button"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Job Board</span>
      </button>

      {/* Main Grid: Description VS Apply card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left main sector (65% width) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card parameters */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6.5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl.5 font-sans font-extrabold text-sp-navy leading-tight tracking-tight mb-2.5">
                  {job.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-extrabold text-sp-green">{company.name}</span>
                  <span className="h-3 w-px bg-slate-200" />
                  <span className="text-xs text-gray-400 font-semibold">{company.industry}</span>
                </div>
              </div>

              <div className={`py-1.5 px-3.5 rounded-lg text-xs font-bold bg-sp-navy text-white shrink-0`}>
                {job.jobType}
              </div>
            </div>

            {/* Key Meta chips list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4.5 rounded-xl border border-gray-100">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Salary (Annual)</span>
                <span className="text-xs sm:text-sm font-bold text-sp-navy flex items-center gap-1">
                  <IndianRupee className="h-4 w-4 text-sp-green" />
                  <span>{formatSalarRange(job.minSalary, job.maxSalary)}</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Offered Mode</span>
                <span className="text-xs sm:text-sm font-bold text-sp-navy flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-sp-green" />
                  <span>{job.workMode}</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Experience Req.</span>
                <span className="text-xs sm:text-sm font-bold text-sp-navy flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-sp-green" />
                  <span>{job.minExperience} - {job.maxExperience} Yrs</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Office Location</span>
                <span className="text-xs sm:text-sm font-bold text-sp-navy flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-sp-green" />
                  <span>{job.city}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tabbed documentation console */}
          <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
            {/* Headers selector tab row */}
            <div className="flex border-b border-gray-150 bg-gray-50">
              {[
                { id: 'overview', label: 'Overview & Roles' },
                { id: 'requirements', label: 'Requirements' },
                { id: 'company', label: 'About Company' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-4.5 text-xs sm:text-sm font-extrabold text-center border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-white border-b-sp-green text-sp-green'
                      : 'border-b-transparent text-gray-400 hover:text-sp-navy'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content pane */}
            <div className="p-6.5">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-sp-navy mb-2">Job Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{job.description}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-sp-navy mb-3">Key Responsibilities</h3>
                    <ul className="space-y-3">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex gap-2.5 text-sm text-gray-600 font-medium">
                          <CheckCircle2 className="h-5 w-5 text-sp-green shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-sp-navy mb-2">Education Requirements</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-semibold bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {job.education}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-sp-navy mb-3">Profile Requirements</h3>
                    <ul className="space-y-3">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-2.5 text-sm text-gray-600 font-medium">
                          <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-sp-navy mb-2">About {company.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{company.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                    <div>
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase">Founded</span>
                      <p className="text-sm font-bold text-sp-navy">{company.founded}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase">Corporate Size</span>
                      <p className="text-sm font-bold text-sp-navy">{company.size}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase">Rating Index</span>
                      <div className="flex items-center gap-1 pt-0.5">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                        <span className="text-sm font-extrabold text-sp-navy">{company.rating} / 5.0</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-extrabold uppercase">Global Website</span>
                      <div className="pt-0.5">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-sp-green hover:underline font-bold flex items-center gap-1"
                        >
                          <Globe className="h-3.5 w-3.5" /> Visit site
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Skills tag list section */}
            <div className="bg-slate-50 px-6.5 py-5 border-t border-gray-150">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">
                Target Skillsets Sourced
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-bold bg-white text-slate-600 border border-slate-200 py-1.5 px-3 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Similar categories listings bottom */}
          {similarJobs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-sp-navy tracking-tight pl-2 border-l-4 border-sp-green">
                Similar Jobs Sourced
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarJobs.map(sim => {
                  const simComp = COMPANIES.find(c => c.id === sim.companyId);
                  return (
                    <div
                      key={sim.id}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        // trigger detail bypass
                        window.location.reload(); // forces refresh easily OR bypass
                      }}
                      className="bg-white border border-gray-150 p-4.5 rounded-xl hover:shadow-md cursor-pointer transition-all leading-normal"
                    >
                      <h4 className="text-xs font-extrabold text-slate-400 mb-1">{simComp?.name}</h4>
                      <h5 className="text-sm font-bold text-sp-navy mb-3 line-clamp-1 group-hover:text-sp-green">{sim.title}</h5>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold">
                        <span>{sim.city}</span>
                        <span className="text-sp-green">Max ₹{(sim.maxSalary/100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right column sidebar controls (35% width) - Sticky container */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Apply Now card Form console */}
          <div className="bg-white border-2 border-sp-green/45 rounded-2xl p-6 shadow-md relative overflow-hidden" id="sticky-apply-form-container">
            {/* Top graphic indicator */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-sp-green" />

            <h3 className="text-lg font-black text-sp-navy mb-2 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-sp-green" />
              <span>Apply for this Position</span>
            </h3>
            
            {/* Conditional gates rendering based on seeker role and completeness score */}
            {!currentUser ? (
              <div className="py-6 text-center space-y-4" id="status-gate-not-logged-in">
                <div className="h-12 w-12 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-extrabold text-sp-navy uppercase tracking-wider">Candidate Sign-In Required</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    StaffingPro verification requires an active <strong>Job Seeker</strong> account with at least <strong>60% profile completeness</strong> to register job applications.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="#/signin"
                    className="inline-block w-full py-3 bg-sp-navy hover:bg-slate-850 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl text-center shadow-md shadow-slate-300 transition-all"
                  >
                    Login as Seeker
                  </a>
                </div>
              </div>
            ) : currentUser.role !== 'seeker' ? (
              <div className="py-6 text-center space-y-4" id="status-gate-invalid-role">
                <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center mx-auto shadow-sm">
                  <UserX className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-extrabold text-sp-navy uppercase tracking-wider">Recruiter Account Active</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    You are currently signed into an <strong>Employer / Recruiter Profile</strong>. Job applications are restricted strictly to Candidate Seekers.
                  </p>
                </div>
                <div className="p-3 bg-amber-50/70 border border-amber-150 rounded-xl text-[10px] text-amber-700 font-bold leading-normal">
                  To apply, please sign out and register or log in using a designated Seeker account.
                </div>
              </div>
            ) : completeness < 60 ? (
              <div className="py-6 text-center space-y-4.5" id="status-gate-low-completeness">
                <div className="h-12 w-12 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto shadow-sm">
                  <AlertTriangle className="h-5 w-5 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-red-600 uppercase tracking-widest leading-none">Profile Needs Enhancement</h4>
                  <div className="flex items-center justify-between bg-slate-50 border px-3 py-2 rounded-xl text-xs font-mono font-bold text-sp-navy">
                    <span>Your Completeness:</span>
                    <span className="text-red-500">{completeness}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${completeness}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium pt-1">
                    StaffingPro enforces a strict <strong>60% profile strength</strong> threshold before submissions. You need <strong>{60 - completeness}% more</strong> to apply.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 text-[10px] font-bold text-gray-500 leading-normal text-left space-y-1">
                  <div className="font-extrabold text-sp-navy pb-0.5 border-b border-gray-150 uppercase tracking-widest">Completeness Checklists:</div>
                  <div className="flex justify-between">
                    <span>• Resume Uploaded (30%):</span>
                    <span className={profile.resumeName && profile.resumeName !== 'No Document Uploaded' ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
                      {profile.resumeName && profile.resumeName !== 'No Document Uploaded' ? "Completed" : "Missing"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Professional Bio (25%):</span>
                    <span className={profile.bioText && profile.bioText.length >= 15 ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
                      {profile.bioText && profile.bioText.length >= 15 ? "Completed" : "Missing"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>• At least 3 skills tags (25%):</span>
                    <span className={profile.skillsList && profile.skillsList.length >= 3 ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
                      {profile.skillsList && profile.skillsList.length >= 3 ? "Completed" : "Missing"}
                    </span>
                  </div>
                </div>

                <div className="pt-1.5">
                  <a
                    href="#/dashboard"
                    onClick={() => {
                      // We will handle redirect to profile tab easily
                    }}
                    className="inline-block w-full py-3 bg-sp-navy hover:bg-slate-850 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl text-center shadow-md transition-all"
                  >
                    Edit Profile & Bio (Add Resume/Skills)
                  </a>
                </div>
              </div>
            ) : (
              // All verification gates succeeded! Rendering premium application launcher
              <>
                <p className="text-xs text-gray-400 font-medium mb-4 leading-normal">
                  Direct telemetry sync ensures your submission landing straight on the hiring manager's desk.
                </p>

                {isSuccess ? (
                  <div className="text-center py-8 space-y-4" id="apply-success-notification">
                    <div className="h-14 w-14 rounded-full bg-sp-green-light text-sp-green flex items-center justify-center mx-auto border border-sp-green/30 animate-scale">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-md font-bold text-sp-navy">Application Submitted!</h4>
                      <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                        Welcome {fullName}! Your CV has been successfully parsed and archived details delivered to <strong>{company.name}</strong>.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[10px] font-mono select-all text-slate-500">
                      REF_CODE: STPRO-{(Math.random()*100000).toFixed(0)}-{job.id.toUpperCase()}
                    </div>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFullName('');
                        setEmail('');
                        setCoverLetter('');
                        setResumeName('');
                      }}
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-sp-navy text-xs font-bold rounded-lg transition-colors"
                    >
                      Apply Again / Update
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    
                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-semibold leading-normal">
                        {errorMsg}
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Full Name</label>
                        <span className="text-[10px] text-sp-green font-bold bg-[#EAF5D7] px-1.5 rounded">Synced</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-semibold text-sp-navy border border-slate-200 rounded-lg focus:outline-none focus:border-sp-green focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Email Address</label>
                        <span className="text-[10px] text-sp-green font-bold bg-[#EAF5D7] px-1.5 rounded">Synced</span>
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-semibold text-sp-navy border border-slate-200 rounded-lg focus:outline-none focus:border-sp-green focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Cover Letter</label>
                      <textarea
                        required
                        rows={4}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Briefly state your suitability (skills, experience, why you're applying)..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-semibold text-sp-navy border border-slate-200 rounded-lg focus:outline-none focus:border-sp-green focus:bg-white transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Simulated file upload button */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Resume / CV Document</label>
                        <span className="text-[10px] text-sp-green font-bold bg-[#EAF5D7] px-1.5 rounded">Bio Synced</span>
                      </div>
                      
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 hover:border-sp-green hover:bg-slate-50/50 rounded-xl p-4.5 text-center cursor-pointer transition-all"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                        
                        {resumeName ? (
                          <div className="flex items-center justify-center gap-2 text-sp-green font-bold text-xs">
                            <CheckCircle2 className="h-5 w-5 animate-pulse shrink-0" />
                            <span className="truncate max-w-[160px]">{resumeName}</span>
                          </div>
                        ) : (
                          <div className="space-y-1.5 text-gray-500">
                            <Upload className="h-5 w-5 text-gray-400 mx-auto" />
                            <div className="text-xs font-black">Click to Browse Document</div>
                            <div className="text-[10px] text-gray-400 font-semibold">Supports PDF, DOCX under 12MB.</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit trigger */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-sp-green hover:bg-opacity-95 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-sm shadow-sp-green/20"
                    >
                      {isSubmitting ? 'Synchronizing files...' : 'Send Application Sourced'}
                    </button>

                  </form>
                )}
              </>
            )}

          </div>

          {/* Quick Company statistics card */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6.5 shadow-sm">
            <h3 className="text-base font-bold text-sp-navy border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
              <span>Hiring Employer</span>
              <span className="text-xs font-extrabold text-sp-green">Verified</span>
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-sp-navy text-white flex items-center justify-center font-extrabold text-sm uppercase shrink-0">
                  {company.name.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-sp-navy">{company.name}</h4>
                  <span className="text-xs text-gray-400">{company.industry}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-semibold text-gray-500">
                <div className="flex justify-between">
                  <span>Corporate Size:</span>
                  <span className="text-sp-navy font-bold">{company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Founded:</span>
                  <span className="text-sp-navy font-bold">{company.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating Assessment:</span>
                  <span className="text-sp-navy font-bold">{company.rating} / 5.0</span>
                </div>
              </div>

              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2 border border-sp-green text-sp-green hover:bg-sp-green-light rounded-lg text-xs font-bold block transition-all"
              >
                Go to Company Directory
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
