import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Search, Plus, X, Sparkles, AlertCircle, Lock, ShieldAlert, Building2 } from 'lucide-react';
import { Job, Company } from '../types';
import { CATEGORIES, CITIES } from '../data';
import { getEmployerProfile, calculateEmployerCompleteness } from '../profileHelper';
import SEO from '../components/SEO';
import { FormField, StepTimeline } from '../components/FormElements';

interface PostJobViewProps {
  onPublishJob: (newJob: Job) => void;
  currentUser: { email: string; name: string; role: 'seeker' | 'employer' } | null;
  setCurrentPage: (page: string) => void;
}

export default function PostJobView({ onPublishJob, currentUser, setCurrentPage }: PostJobViewProps) {
  const [step, setStep] = useState(1);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);

  // Profile data fetch for checking corporate parameters completeness dynamically
  const profile = currentUser && currentUser.role === 'employer' ? getEmployerProfile(currentUser.email) : null;
  const completeness = profile ? calculateEmployerCompleteness(profile) : 0;

  // Step 1: Basic Specifications fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Software & IT');
  const [city, setCity] = useState('Bengaluru');
  const [jobType, setJobType] = useState<Job['jobType']>('Full-time');
  const [workMode, setWorkMode] = useState<Job['workMode']>('Hybrid');
  const [openings, setOpenings] = useState(1);

  // Step 2: Details fields
  const [description, setDescription] = useState('');
  const [responsibilitiesRaw, setResponsibilitiesRaw] = useState('');
  const [requirementsRaw, setRequirementsRaw] = useState('');
  const [minSalary, setMinSalary] = useState(600000);
  const [maxSalary, setMaxSalary] = useState(1200000);
  const [minExperience, setMinExperience] = useState(2);
  const [maxExperience, setMaxExperience] = useState(5);
  const [education, setEducation] = useState("Bachelor's Degree in comparable field");

  // Step 3: Skills fields
  const presetSkillsList = [
    'React.js', 'Node.js', 'Python', 'Java', 'TypeScript',
    'AWS', 'Figma', 'System Design', 'Critical Care', 'General Surgery',
    'Laparoscopy', 'SAP ERP', 'Excel Modeling', 'Kubernetes', 'Docker',
    'PostgreSQL', 'UI Design', 'Wireframing', 'User Research', 'Git'
  ];
  const [searchSkill, setSearchSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React.js', 'TypeScript']);

  // Filter preset list
  const filteredPresets = presetSkillsList.filter(
    s => s.toLowerCase().includes(searchSkill.toLowerCase()) && !selectedSkills.includes(s)
  );

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleCustomSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchSkill.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(searchSkill.trim())) {
        setSelectedSkills([...selectedSkills, searchSkill.trim()]);
      }
      setSearchSkill('');
    }
  };

  // Validators
  const handleNextStep = () => {
    if (step === 1) {
      if (!title.trim()) {
        alert('Please specify a Job Title before advancing.');
        return;
      }
    }
    if (step === 2) {
      if (!description.trim() || !responsibilitiesRaw.trim() || !requirementsRaw.trim()) {
        alert('Please complete description details and responsibilities lists.');
        return;
      }
    }
    if (step === 3) {
      if (selectedSkills.length === 0) {
        alert('Please select at least one core skill.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  // Compile and publish
  const handlePublishSubmit = () => {
    const listResponsibilities = responsibilitiesRaw
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.trim());

    const listRequirements = requirementsRaw
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.trim());

    const compileNewJobObj: Job = {
      id: `job_user_${Math.floor(Math.random() * 9000 + 1000)}`,
      title,
      companyId: 'comp_infosys', // Mock corporate partner binding
      category,
      city,
      jobType,
      workMode,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
      minExperience: Number(minExperience),
      maxExperience: Number(maxExperience),
      openings: Number(openings),
      description,
      responsibilities: listResponsibilities.length > 0 ? listResponsibilities : ['Coordinate tasks inside target departments.'],
      requirements: listRequirements.length > 0 ? listRequirements : ['Minimum relevant experience matching criteria.'],
      skills: selectedSkills,
      education,
      postedDaysAgo: 0,
      isFeatured: true,
      publisherEmail: currentUser?.email || 'employer@staffingpro.com'
    };

    onPublishJob(compileNewJobObj);
    setShowPublishSuccess(true);
  };

  // GATES CHECK: If recruiter is not logged in or profile is under 80% complete, render high-contrast warning overlays
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6" id="employer-gate-not-logged-in">
        <SEO
          title="Post a Job Requisition | Talent Acquisition"
          description="List custom career openings today. Source top-flight applicants instantly from our millions of pre-screened candidate libraries."
          keywords="publish job opening, recruit engineer, career sifter, staffingpro"
        />
        <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100 shadow-inner">
          <Lock className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-sp-navy tracking-tight uppercase">Corporate Identity Required</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed max-w-sm mx-auto">
            You must be signed into an active <strong>Employer / Recruiter Partnership</strong> account to publish new professional vacancies inside StaffingPro.
          </p>
        </div>
        <div className="bg-slate-50 border p-4.5 rounded-2xl text-xs space-y-2.5 text-left text-gray-600">
          <div className="font-extrabold text-sp-navy flex items-center gap-1.5 border-b border-gray-150 pb-1.5 uppercase tracking-wider">
            <Building2 className="h-4 w-4 text-sp-green" /> Why this is enforced:
          </div>
          <p className="text-[11px] leading-relaxed">
            All requisitions on our panel are vetted via secure telemetry nodes to verify corporate authenticity and salary ranges.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href="#/signin"
            className="flex-1 py-3 bg-sp-navy hover:bg-slate-850 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl text-center shadow-md transition-all"
          >
            Sign In as Employer
          </a>
          <a
            href="#/jobs"
            className="flex-1 py-3 border border-gray-200 hover:bg-slate-50 text-gray-500 font-extrabold text-xs uppercase tracking-wider rounded-xl text-center transition-all"
          >
            Explore Jobs Board
          </a>
        </div>
      </div>
    );
  }

  if (currentUser.role !== 'employer') {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6" id="employer-gate-invalid-role">
        <SEO
          title="Post a Job Requisition | Talent Acquisition"
          description="List custom career openings today. Source top-flight applicants instantly from our millions of pre-screened candidate libraries."
          keywords="publish job opening, recruit engineer, career sifter, staffingpro"
        />
        <div className="h-16 w-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-100 shadow-inner">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-sp-navy tracking-tight uppercase">Publisher Lockout</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed max-w-sm mx-auto">
            Your active identity is registered as a <strong>Job Seeker</strong>. Only enterprise employer partners are authorized to register new requirements.
          </p>
        </div>
        <div className="p-4 bg-amber-50/70 border border-amber-150 text-xs text-amber-800 font-bold leading-relaxed rounded-xl text-left">
          Please sign out of your seeker profile and sign in or register with an Employer/Recruiter role to use the vacancy creation wizard.
        </div>
        <div className="pt-2">
          <button
            onClick={() => {
              localStorage.removeItem('st_current_user');
              window.location.reload();
            }}
            className="px-6 py-3 bg-red-650 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
          >
            Sign Out Now
          </button>
        </div>
      </div>
    );
  }

  if (completeness < 80) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-6 text-center" id="employer-gate-low-completeness">
        <SEO
          title="Post a Job Requisition | Talent Acquisition"
          description="List custom career openings today. Source top-flight applicants instantly from our millions of pre-screened candidate libraries."
          keywords="publish job opening, recruit engineer, career sifter, staffingpro"
        />
        <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100 shadow-inner">
          <ShieldAlert className="h-7 w-7 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-red-600 tracking-tight uppercase">Corporate Profile Strength Insufficient</h2>
          <p className="text-xs sm:text-sm text-gray-550 font-semibold leading-relaxed max-w-lg mx-auto">
            StaffingPro mandates that Recruiters must maintain at least <strong>80% corporate profile completeness</strong> before posting active vacancies. This sustains marketplace quality.
          </p>
        </div>

        {/* Meter progress bar */}
        <div className="max-w-md mx-auto space-y-2 bg-white rounded-2xl border p-5 shadow-sm">
          <div className="flex justify-between items-center text-xs font-mono font-bold text-sp-navy">
            <span>Corporate Completeness:</span>
            <span className="text-red-500">{completeness}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${completeness}%` }} />
          </div>
          <div className="text-[10px] text-gray-400 font-bold text-left pt-1 leading-normal">
            Your profile score is currently <strong>{completeness}%</strong>. Sourcing guidelines require you to obtain at least <strong>80%</strong>. You need <strong>{80 - completeness}% more</strong>.
          </div>
        </div>

        {/* Checklist itemization details */}
        <div className="max-w-md mx-auto bg-slate-50 border p-5 rounded-2xl text-xs text-left text-gray-600 space-y-2">
          <div className="font-extrabold text-sp-navy border-b border-gray-150 pb-1.5 uppercase tracking-wider">Required Corporate Parameters:</div>
          <div className="flex justify-between">
            <span>• Company Name & Contact Email (20%):</span>
            <span className={profile?.companyName && profile?.email ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
              {profile?.companyName && profile?.email ? "Completed" : "Missing"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>• Corporate Department Name (20%):</span>
            <span className={profile?.deptName && profile.deptName.length >= 4 ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
              {profile?.deptName && profile.deptName.length >= 4 ? "Completed" : "Missing"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>• Industry Designation Group (20%):</span>
            <span className={profile?.industry && profile.industry.length >= 3 ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
              {profile?.industry && profile.industry.length >= 3 ? "Completed" : "Missing"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>• Headquarters Location/City (20%):</span>
            <span className={profile?.hqAddress && profile.hqAddress.length >= 4 ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
              {profile?.hqAddress && profile.hqAddress.length >= 4 ? "Completed" : "Missing"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>• Corporate Web URL & Size Limit (20%):</span>
            <span className={profile?.website && profile.website.length >= 8 && profile?.corpSize ? "text-sp-green font-bold" : "text-gray-400 font-bold"}>
              {profile?.website && profile.website.length >= 8 && profile?.corpSize ? "Completed" : "Missing"}
            </span>
          </div>
        </div>

        <div className="pt-3 max-w-sm mx-auto flex flex-col gap-2">
          <a
            href="#/dashboard"
            className="py-3 bg-sp-navy hover:bg-slate-850 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl text-center shadow-md transition-all animate-bounce"
          >
            Navigate to Dashboard to Edit Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4" id="post-job-wizard-workspace">
      <SEO
        title="Post a Job Requisition | Talent Acquisition"
        description="List custom career openings today. Source top-flight applicants instantly from our millions of pre-screened candidate libraries."
        keywords="publish job opening, recruit engineer, career sifter, staffingpro"
      />
      
      {/* Upper header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-sp-navy tracking-tight mb-2">
          Post an Active Requirement Sourced
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Leverage our multi-step layout to describe required specific parameters smoothly.
        </p>
      </div>

      {/* Progress timeline bar */}
      {!showPublishSuccess && (
        <StepTimeline
          steps={[
            { id: 1, label: 'Specifications' },
            { id: 2, label: 'Details' },
            { id: 3, label: 'Skillsets' },
            { id: 4, label: 'Live Mockup' }
          ]}
          currentStep={step}
        />
      )}

      {/* Steps panel rendering */}
      {showPublishSuccess ? (
        <div className="bg-white border border-gray-150 rounded-2xl p-8 text-center space-y-5 shadow-xl animate-scale" id="publish-success-card">
          <div className="h-16 w-16 rounded-full bg-sp-green-light border border-sp-green/45 text-sp-green flex items-center justify-center mx-auto shadow-inner animate-pulse">
            <Check className="h-9 w-9 text-sp-green" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-sp-navy">Job Published Successfully!</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold max-w-md mx-auto leading-relaxed">
              Excellent! Your vacancy titled <strong className="text-sp-green">"{title}"</strong> was successfully registered inside StaffingPro. Sourcing algorithms are actively routing matches right now!
            </p>
          </div>

          <div className="bg-slate-50 p-4 border border-slate-150 rounded-xl max-w-md mx-auto text-xs space-y-1 text-gray-600">
            <div className="flex justify-between">
              <span>Vacancy Reference:</span>
              <span className="font-bold text-sp-navy">STPRO-USR-{Math.floor(Math.random()*100000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Hiring City:</span>
              <span className="font-bold text-sp-navy">{city}</span>
            </div>
            <div className="flex justify-between">
              <span>Annual Salary Offered:</span>
              <span className="font-bold text-sp-navy">₹{(minSalary/100000).toFixed(1)}L - ₹{(maxSalary/100000).toFixed(1)}L</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 max-w-sm mx-auto">
            <button
              onClick={() => setCurrentPage('jobs')}
              className="flex-1 py-3 bg-sp-navy hover:bg-opacity-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Go to Jobs Board
            </button>
            <button
              onClick={() => {
                // reset state to post another job
                setStep(1);
                setTitle('');
                setDescription('');
                setResponsibilitiesRaw('');
                setRequirementsRaw('');
                setSelectedSkills(['React.js', 'TypeScript']);
                setShowPublishSuccess(false);
              }}
              className="flex-1 py-3 border border-sp-green text-sp-green hover:bg-sp-green-light font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Post Another Vacancy
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-7 shadow-sm">
          
          {/* Step 1 Content Specification */}
          {step === 1 && (
            <div className="space-y-5 animate-fade">
              <h3 className="text-base font-extrabold text-sp-navy border-b border-gray-100 pb-2 mb-4">
                Step 1: Core Sourcing Specifications
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Job Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Software Architect or Lead Surgeon consultant"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-sp-navy rounded-xl focus:outline-none focus:border-sp-green focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Job Category Selection</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Indian Target City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl cursor-pointer"
                  >
                    {CITIES.map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Employment Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                  >
                    <option value="Hybrid">Hybrid (Onsite + Remote mix)</option>
                    <option value="Remote">Remote (100% Home Based)</option>
                    <option value="Onsite">Onsite (Fixed Office placement)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Number of Available Openings</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={openings}
                  onChange={(e) => setOpenings(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 2 Content Details */}
          {step === 2 && (
            <div className="space-y-5 animate-fade">
              <h3 className="text-base font-extrabold text-sp-navy border-b border-gray-100 pb-2 mb-4">
                Step 2: Role Details & Salaries
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Job Overview Description *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="State a concise role objective, general daily operational overview..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider">Responsibilities (one line item per row) *</label>
                  <span className="text-[10px] text-gray-400">Press ENTER for lists</span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={responsibilitiesRaw}
                  onChange={(e) => setResponsibilitiesRaw(e.target.value)}
                  placeholder="e.g. Design responsive UI layouts using React.js&#10;Write unit benchmarks&#10;Lead core server audits"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Profile Requirements (one line per row) *</label>
                <textarea
                  required
                  rows={4}
                  value={requirementsRaw}
                  onChange={(e) => setRequirementsRaw(e.target.value)}
                  placeholder="e.g. Bachelor's in CS field or comparable clinical practice&#10;2+ years of production experience in React&#10;Clean coding principles"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Min Annual Salary (₹ INR)</label>
                  <input
                    type="number"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={minSalary}
                    onChange={(e) => setMinSalary(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Max Annual Salary (₹ INR)</label>
                  <input
                    type="number"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Min Experience Required (Yrs)</label>
                  <input
                    type="number"
                    value={minExperience}
                    onChange={(e) => setMinExperience(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-sp-navy uppercase tracking-wider block">Education Prerequisites</label>
                  <input
                    type="text"
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. Master of Clinical Medicine or B.Tech CS"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 Content Skills */}
          {step === 3 && (
            <div className="space-y-5 animate-fade">
              <h3 className="text-base font-extrabold text-sp-navy border-b border-gray-100 pb-2 mb-4">
                Step 3: Define Target skillsets & qualifications
              </h3>

              <div className="space-y-3.5 bg-slate-50 p-4.5 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">Selected skill Tags</span>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2.2 py-0.5 rounded-full font-black">
                    {selectedSkills.length} selected
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map(sk => (
                    <span
                      key={sk}
                      className="inline-flex items-center gap-1.5 py-1 px-3 bg-sp-green text-white rounded-lg text-xs font-bold"
                    >
                      <span>{sk}</span>
                      <button onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== sk))}>
                        <X className="h-3.5 w-3.5 hover:scale-110" />
                      </button>
                    </span>
                  ))}
                  {selectedSkills.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No skill tags chosen yet. Selection is mandatory.</span>
                  )}
                </div>
              </div>

              {/* Skill search */}
              <div className="space-y-2">
                <div className="relative flex items-center bg-white border border-gray-250 rounded-xl px-3 mt-4">
                  <Search className="h-4.5 w-4.5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={searchSkill}
                    onChange={(e) => setSearchSkill(e.target.value)}
                    onKeyDown={handleCustomSkillAdd}
                    placeholder="Search preset skills list or type + press Enter..."
                    className="w-full py-2.5 text-xs sm:text-xs.5 font-semibold text-sp-navy focus:outline-none"
                  />
                </div>

                {searchSkill.trim() && (
                  <span className="text-[10px] text-gray-400 block font-semibold leading-none pl-1">
                    Press ENTER key to add "<strong>{searchSkill}</strong>" as a custom tag.
                  </span>
                )}
              </div>

              {/* Presets grid */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-3">
                  Quick suggest Tags
                </span>
                
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                  {filteredPresets.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleToggleSkill(preset)}
                      className="px-3 py-1.5 border border-gray-200 bg-white hover:border-sp-green hover:text-sp-green rounded-lg text-xs font-semibold text-gray-500 transition-colors"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Step 4 Content Preview */}
          {step === 4 && (
            <div className="space-y-5 animate-fade">
              <h3 className="text-base font-extrabold text-sp-navy border-b border-gray-100 pb-2 mb-4">
                Step 4: Live Mockup preview Sourced
              </h3>
              
              <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl flex items-start gap-2.5 text-xs text-indigo-700 font-semibold mb-4">
                <Sparkles className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5 animate-pulse" />
                <p>
                  Verify compiled details carefully. Choosing 'Confirm Sourcing' publishes the entry, matching active profiles immediately.
                </p>
              </div>

              {/* Direct card representation mockup block */}
              <div className="border border-dashed border-sp-green p-4 rounded-2xl bg-sp-green-light/5">
                <div className="bg-white border rounded-xl p-5 border-l-4 border-l-sp-green border-gray-200 shadow-sm leading-normal">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center text-xs">
                        INF
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-gray-500">Infosys Partner Network</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">{category}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-sp-navy mb-3">{title || 'Untitled Sourced Vacancy'}</h4>

                  <div className="flex flex-wrap gap-2 mb-4 text-[11px] font-bold text-gray-600">
                    <span className="bg-gray-50 py-0.5 px-2 rounded-md">{city}</span>
                    <span className="bg-gray-50 py-0.5 px-2 rounded-md">₹{(minSalary/100000).toFixed(1)}L - ₹{(maxSalary/100000).toFixed(1)}L / yr</span>
                    <span className="bg-sp-navy text-white py-0.5 px-2 rounded-md">{jobType}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkills.map((sk, skIdx) => (
                      <span key={skIdx} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer action bar */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-5 mt-8">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(prev => prev - 1)}
              className="px-4.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-250 text-xs font-black text-sp-navy rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 bg-sp-navy hover:bg-sp-green text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublishSubmit}
                className="px-6 py-2.5 bg-sp-green hover:bg-opacity-95 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-sp-green/20"
              >
                Confirm & Sourcing Succeeded
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
