import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Plus, 
  User, 
  Mail, 
  Tag, 
  MapPin, 
  Eye, 
  Star, 
  ChevronRight, 
  ArrowUpRight, 
  Send,
  Sliders,
  Sparkles,
  Bookmark,
  FileText,
  Calendar,
  Check
} from 'lucide-react';
import { JOBS, COMPANIES, TESTIMONIALS } from '../data';
import { Job, Company } from '../types';
import { getSeekerProfile, saveSeekerProfile, calculateSeekerCompleteness, getEmployerProfile, saveEmployerProfile, calculateEmployerCompleteness } from '../profileHelper';
import SEO from '../components/SEO';

interface DashboardViewProps {
  currentUser: { email: string; name: string; role: 'seeker' | 'employer' } | null;
  activeJobsList: Job[];
  userApplications: any[];
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onPostJobRedirect: () => void;
  onDeleteJob?: (jobId: string) => void;
  onUpdateApplicationStage?: (applicationId: string, nextStage: string) => void;
}

export default function DashboardView({
  currentUser,
  activeJobsList,
  userApplications,
  savedJobIds,
  onToggleSaveJob,
  onSelectJob,
  onPostJobRedirect,
  onDeleteJob,
  onUpdateApplicationStage
}: DashboardViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'items' | 'profile'>('overview');
  const [selectedApplicantDetails, setSelectedApplicantDetails] = useState<any | null>(null);

  // Interview scheduler states
  const [scheduledInterviews, setScheduledInterviews] = useState<any[]>([
    {
      id: 'sch_1',
      candidateName: 'Aarav Mehta',
      candidateEmail: 'aarav.mehta@gmail.com',
      jobTitle: 'Software Developer (Full-Stack)',
      date: '2026-06-05',
      time: '14:30',
      type: 'Technical Live Coding',
      notes: 'Focus on System Design & React performance optimisations.'
    }
  ]);
  const [interviewDate, setInterviewDate] = useState<string>('');
  const [interviewTime, setInterviewTime] = useState<string>('');
  const [interviewType, setInterviewType] = useState<string>('Technical Live Coding');
  const [interviewNotes, setInterviewNotes] = useState<string>('');
  const [activeSimulatedEmail, setActiveSimulatedEmail] = useState<any | null>(null);

  // Seeker dynamic profile states loaded from localStorage with robust fallbacks
  const seekerProfileObj = getSeekerProfile(currentUser?.email || 'guest');
  const [resumeName, setResumeName] = useState(seekerProfileObj.resumeName || '');
  const [bioText, setBioText] = useState(seekerProfileObj.bioText || '');
  const [skillsList, setSkillsList] = useState(seekerProfileObj.skillsList || []);
  const [newSkillStr, setNewSkillStr] = useState('');

  // Employer dynamic profile states loaded from localStorage with robust fallbacks
  const employerProfileObj = getEmployerProfile(currentUser?.email || 'guest');
  const [deptName, setDeptName] = useState(employerProfileObj.deptName || '');
  const [industryName, setIndustryName] = useState(employerProfileObj.industry || '');
  const [hqAddress, setHqAddress] = useState(employerProfileObj.hqAddress || '');
  const [companyWebsite, setCompanyWebsite] = useState(employerProfileObj.website || '');
  const [corpSize, setCorpSize] = useState(employerProfileObj.corpSize || '');

  // Synchronize profile states if current user switches in real-time
  React.useEffect(() => {
    const seekerProf = getSeekerProfile(currentUser?.email || 'guest');
    setResumeName(seekerProf.resumeName || '');
    setBioText(seekerProf.bioText || '');
    setSkillsList(seekerProf.skillsList || []);

    const empProf = getEmployerProfile(currentUser?.email || 'guest');
    setDeptName(empProf.deptName || '');
    setIndustryName(empProf.industry || '');
    setHqAddress(empProf.hqAddress || '');
    setCompanyWebsite(empProf.website || '');
    setCorpSize(empProf.corpSize || '');
  }, [currentUser?.email]);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <SEO
          title="Recruiting & Candidacy Dashboard | StaffingPro"
          description="Configure interview schedules, review live OCR resume extractions, or track real-time applications status."
          keywords="dashboard, manage recruitment, interview schedule, candidate profile, staffingpro"
        />
        <div className="h-14 w-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
          <Clock className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-sp-navy mb-2">Workspace Locked</h2>
        <p className="text-xs text-sp-muted font-medium mb-6">You must be logged in to access the StaffingPro live metrics console.</p>
        <a href="#/signin" className="px-5 py-2.5 bg-sp-navy text-white text-xs font-bold rounded-lg uppercase tracking-wider">
          Sign In Now
        </a>
      </div>
    );
  }

  const isRecruiter = currentUser.role === 'employer';

  // --- RECRUITER METRICS DERIVATION ---
  // Get all jobs published by this recruiter (using email match or suffix rule for demo accounts)
  const myPostedJobs = activeJobsList.filter(job => 
    job.publisherEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
    // Fallback: If recruiter is demo, also show pre-loaded jobs from comp_infosys as they match Infosys recruiter
    (currentUser.email.includes('infosys') && job.companyId === 'comp_infosys')
  );

  // Derive total applications submitted for recruiter's posted jobs
  const myJobIds = myPostedJobs.map(j => j.id);
  
  // Create mock applicants if list is empty, to provide beautiful interactive data
  const defaultRecruiterApps = [
    {
      id: 'app_rec_1',
      jobId: myJobIds[0] || 'job_1',
      fullName: 'Aarav Mehta',
      email: 'aarav.mehta@gmail.com',
      phone: '+91 91234 56789',
      coverLetter: 'I am highly passionate about your organization and bring 4 years of robust technical skills in React, TypeScript, and Agile leadership tools.',
      resumeName: 'Aarav_Mehta_ReactEngineer.pdf',
      appliedDate: '28/05/2026',
      stage: 'Interview Scheduled'
    },
    {
      id: 'app_rec_2',
      jobId: myJobIds[0] || 'job_2',
      fullName: 'Ishita Sharma',
      email: 'ishita.s@analytics.org',
      phone: '+91 88776 55443',
      coverLetter: 'Given my technical credentials and strong background in enterprise architecture, I would love the chance to demonstrate how I stream data pipeline efficiency.',
      resumeName: 'Ishita_Sharma_FullStack.pdf',
      appliedDate: '29/05/2026',
      stage: 'Resume Reviewed'
    },
    {
      id: 'app_rec_3',
      jobId: myJobIds[1] || 'job_3',
      fullName: 'Vikram Aditya',
      email: 'vikram.aditya@outlook.com',
      phone: '+91 76543 21098',
      coverLetter: 'I possess substantial enterprise product scaling experience is aligned closely with the detailed specifications in your live vacancy.',
      resumeName: 'Vikram_CS_Specialist.pdf',
      appliedDate: '30/05/2026',
      stage: 'Screening'
    }
  ];

  // Combine real submissions with our robust pre-populated demo ones for the recruiter's jobs
  const realAppsFiltered = userApplications.filter(app => myJobIds.includes(app.jobId));
  const displayedApps = [...realAppsFiltered, ...defaultRecruiterApps].filter(app => {
    // Make sure we only show apps corresponding to recruiter's jobs
    return myJobIds.includes(app.jobId) || app.id.startsWith('app_rec_');
  });

  // --- CANDIDATE METRICS ---
  const mySavedJobs = activeJobsList.filter(job => savedJobIds.includes(job.id));
  
  // Candidate applied records
  const defaultCandidateApplied = [
    {
      id: 'app_c_1',
      jobId: 'job_1', // Software Developer
      jobTitle: 'Software Developer (Full-Stack)',
      companyName: 'Infosys',
      salary: '₹12L - ₹18L / yr',
      location: 'Bengaluru',
      date: '28/05/2026',
      status: 'Interview Scheduled'
    },
    {
      id: 'app_c_2',
      jobId: 'job_4', // Finance Manager
      jobTitle: 'Senior Product Designer',
      companyName: 'Zomato',
      salary: '₹14L - ₹20L / yr',
      location: 'Gurgaon',
      date: '29/05/2026',
      status: 'In Sift Review'
    }
  ];

  // Add real application submissions from applicant's session
  const realCandidateApplied = userApplications.map(app => {
    const matchingJob = activeJobsList.find(j => j.id === app.jobId);
    const matchingCompany = COMPANIES.find(c => c.id === matchingJob?.companyId);
    const companyName = matchingCompany?.name || 'Corporate Partner';
    return {
      id: app.id,
      jobId: app.jobId,
      jobTitle: matchingJob?.title || 'Specialized Role',
      companyName,
      salary: matchingJob ? `₹${(matchingJob.minSalary/100000).toFixed(0)}L - ₹${(matchingJob.maxSalary/100000).toFixed(0)}L` : 'Competitive',
      location: matchingJob?.city || 'India',
      date: app.date || new Date().toLocaleDateString('en-IN'),
      status: app.stage || 'Applied Successfully'
    };
  });

  const allCandidateApplications = [...realCandidateApplied, ...defaultCandidateApplied];

  // Handle stage change
  const handleStageSelect = (appId: string, nextStage: string) => {
    if (onUpdateApplicationStage) {
      onUpdateApplicationStage(appId, nextStage);
    }
    // Update local preloaded apps dynamically for display
    const targetIdx = defaultRecruiterApps.findIndex(a => a.id === appId);
    if (targetIdx > -1) {
      defaultRecruiterApps[targetIdx].stage = nextStage;
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillStr.trim() && !skillsList.includes(newSkillStr.trim())) {
      setSkillsList([...skillsList, newSkillStr.trim()]);
    }
    setNewSkillStr('');
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplicantDetails) return;
    if (!interviewDate || !interviewTime) {
      alert('Please specify a valid Date and Time for the interview.');
      return;
    }

    const jobTitle = activeJobsList.find(j => j.id === selectedApplicantDetails.jobId)?.title || "Specialized Role";

    const newInterview = {
      id: `sch_${Date.now()}`,
      candidateName: selectedApplicantDetails.fullName,
      candidateEmail: selectedApplicantDetails.email,
      jobTitle: jobTitle,
      date: interviewDate,
      time: interviewTime,
      type: interviewType,
      notes: interviewNotes
    };

    setScheduledInterviews(prev => [newInterview, ...prev]);

    // Construct Simulated Confirmation Email
    const emailData = {
      from: 'Team StaffingPro <sifting-assistant@staffingpro.com>',
      to: selectedApplicantDetails.email,
      cc: currentUser.email,
      subject: `🔔 Interview Scheduled: ${jobTitle} Sourcing Round`,
      body: `Dear ${selectedApplicantDetails.fullName},

We are pleased to confirm that an interview has been scheduled for you regarding the "${jobTitle}" position.

📅 Interview Schedule Details:
• Role Requisition: ${jobTitle}
• Date: ${interviewDate}
• Time: ${interviewTime}
• Evaluation Format: ${interviewType}

${interviewNotes ? `📝 Additional Focus Guidelines:\n"${interviewNotes}"\n` : ''}
🔗 Access coordinates and Google Meet join-link have been bound automatically to your profile calendar list.

If you have any questions or require rescheduling, please reply to this thread.

Kind regards,
Corporate Talent Partner Sifting Team
Powered by StaffingPro Ltd.`,
      sentAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setActiveSimulatedEmail(emailData);

    // Automatically advance application stage to Interview Scheduled
    handleStageSelect(selectedApplicantDetails.id, 'Interview Scheduled');
    setSelectedApplicantDetails(prev => ({
      ...prev,
      stage: 'Interview Scheduled'
    }));

    // Reset Form fields
    setInterviewDate('');
    setInterviewTime('');
    setInterviewNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="role-dashboard-workspace">
      <SEO
        title="Recruiting & Candidacy Dashboard | StaffingPro"
        description="Configure interview schedules, review live OCR resume extractions, or track real-time applications status."
        keywords="dashboard, manage recruitment, interview schedule, candidate profile, staffingpro"
      />
      
      {/* 1. Header Hero Welcome Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6.5 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4.5">
          <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-sp-green shrink-0 bg-slate-200">
            <img 
              src={
                currentUser.role === 'employer'
                  ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
                  : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
              }
              alt={currentUser.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-sp-navy tracking-tight">{currentUser.name}</h1>
              <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                isRecruiter ? 'bg-indigo-50 text-sp-navy border border-indigo-100' : 'bg-[#EAF5D7] text-sp-green border border-sp-green/20'
              }`}>
                {isRecruiter ? 'Verified Recruiter' : 'Active Applicant'}
              </span>
            </div>
            <p className="text-xs text-sp-muted font-semibold max-w-xl">
              {isRecruiter 
                ? `Authorized Talent Partner at Team StaffingPro. Sifting from thousands of expert resumes.` 
                : `Ready to connect. Review active applied credentials and track lateral placement logs.`
              }
            </p>
            <span className="text-[11px] font-mono text-gray-400 block mt-1.5 font-bold">Email: {currentUser.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isRecruiter ? (
            <button
              onClick={onPostJobRedirect}
              className="px-5 py-3 bg-[#6ABF45] hover:bg-opacity-95 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm shadow-sp-green/25 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Publish Vacancy</span>
            </button>
          ) : (
            <a
              href="#/jobs"
              className="px-5 py-3 bg-sp-navy hover:bg-opacity-95 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4 text-[#6ABF45]" />
              <span>Search More Jobs</span>
            </a>
          )}
        </div>
      </div>

      {/* 2. Top Metric Slices Row */}
      {isRecruiter ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="recruiter-metrics-grid">
          <div className="bg-white p-5 rounded-2xl border border-sp-border shadow-sm flex items-center gap-4">
            <div className="bg-[#EAF5D7] p-3.5 rounded-xl text-sp-green shrink-0">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-sp-navy block leading-none mb-1">{myPostedJobs.length}</span>
              <span className="text-[10px] text-sp-muted uppercase tracking-wider font-extrabold font-mono">My Live Vacancies</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sp-border shadow-sm flex items-center gap-4">
            <div className="bg-indigo-50 p-3.5 rounded-xl text-sp-navy shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-sp-navy block leading-none mb-1">{displayedApps.length}</span>
              <span className="text-[10px] text-sp-muted uppercase tracking-wider font-extrabold font-mono font-mono">My Job Applications</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sp-border shadow-sm flex items-center gap-4">
            <div className="bg-sp-green-light/45 p-3.5 rounded-xl text-sp-green shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-sp-navy block leading-none mb-1">
                {displayedApps.filter(a => a.stage === 'Interview Scheduled' || a.stage === 'Advance').length}
              </span>
              <span className="text-[10px] text-sp-muted uppercase tracking-wider font-extrabold font-mono">Candidates Advanced</span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-sp-border shadow-sm leading-normal flex-grow">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-sp-muted uppercase tracking-wider font-extrabold font-mono">Corporate Vetting Strength</span>
              <span className={`text-xs font-black ${
                calculateEmployerCompleteness({
                  companyName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  deptName,
                  industry: industryName,
                  hqAddress,
                  website: companyWebsite,
                  corpSize
                }) >= 80 ? 'text-sp-green' : 'text-red-500 animate-pulse'
              }`}>
                {calculateEmployerCompleteness({
                  companyName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  deptName,
                  industry: industryName,
                  hqAddress,
                  website: companyWebsite,
                  corpSize
                })}% {calculateEmployerCompleteness({
                  companyName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  deptName,
                  industry: industryName,
                  hqAddress,
                  website: companyWebsite,
                  corpSize
                }) >= 80 ? 'Elite' : 'Under Strength'}
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  calculateEmployerCompleteness({
                    companyName: currentUser?.name || '',
                    email: currentUser?.email || '',
                    deptName,
                    industry: industryName,
                    hqAddress,
                    website: companyWebsite,
                    corpSize
                  }) >= 80 ? 'bg-gradient-to-r from-sp-green to-indigo-600' : 'bg-red-500'
                }`}
                style={{ width: `${calculateEmployerCompleteness({
                  companyName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  deptName,
                  industry: industryName,
                  hqAddress,
                  website: companyWebsite,
                  corpSize
                })}%` }} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="seeker-metrics-grid">
          <div className="bg-white p-5 rounded-2xl border border-sp-border shadow-sm flex items-center gap-4">
            <div className="bg-indigo-50 p-3.5 rounded-xl text-sp-navy shrink-0">
              <Send className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-sp-navy block leading-none mb-1">{allCandidateApplications.length}</span>
              <span className="text-[10px] text-sp-muted uppercase tracking-wider font-extrabold font-mono">Vetting Submissions</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sp-border shadow-sm flex items-center gap-4">
            <div className="bg-[#EAF5D7] p-3.5 rounded-xl text-sp-green shrink-0">
              <Bookmark className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-sp-navy block leading-none mb-1">{mySavedJobs.length}</span>
              <span className="text-[10px] text-sp-muted uppercase tracking-wider font-extrabold font-mono">Saved Position Bookmarks</span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-sp-border shadow-sm leading-normal col-span-1 sm:col-span-2">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-sp-muted uppercase tracking-wider font-extrabold font-mono font-mono">Profile Vetting strength</span>
              <span className={`text-xs font-black ${
                calculateSeekerCompleteness({
                  fullName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  phone: '+91 98765 43210',
                  resumeName,
                  bioText,
                  skillsList
                }) >= 60 ? 'text-sp-green' : 'text-red-500 animate-pulse'
              }`}>
                {calculateSeekerCompleteness({
                  fullName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  phone: '+91 98765 43210',
                  resumeName,
                  bioText,
                  skillsList
                })}% {calculateSeekerCompleteness({
                  fullName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  phone: '+91 98765 43210',
                  resumeName,
                  bioText,
                  skillsList
                }) >= 60 ? 'Active Seeker Elite' : 'Under Strength'}
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  calculateSeekerCompleteness({
                    fullName: currentUser?.name || '',
                    email: currentUser?.email || '',
                    phone: '+91 98765 43210',
                    resumeName,
                    bioText,
                    skillsList
                  }) >= 60 ? 'bg-gradient-to-r from-sp-green to-indigo-600' : 'bg-red-500'
                }`}
                style={{ width: `${calculateSeekerCompleteness({
                  fullName: currentUser?.name || '',
                  email: currentUser?.email || '',
                  phone: '+91 98765 43210',
                  resumeName,
                  bioText,
                  skillsList
                })}%` }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Navigation Controls Segment */}
      <div className="flex border-b border-[#E2E8F0] mb-8 gap-5" id="dashboard-tab-navigation">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`pb-4.5 text-xs sm:text-sm font-semibold uppercase tracking-wider border-b-2 transition-all ${
            activeSubTab === 'overview'
              ? 'border-[#6ABF45] text-sp-navy font-bold'
              : 'border-transparent text-gray-500 hover:text-sp-navy'
          }`}
        >
          {isRecruiter ? 'Talent Applicants Desk' : 'Applications & Activity'}
        </button>
        <button
          onClick={() => setActiveSubTab('items')}
          className={`pb-4.5 text-xs sm:text-sm font-semibold uppercase tracking-wider border-b-2 transition-all ${
            activeSubTab === 'items'
              ? 'border-[#6ABF45] text-sp-navy font-bold'
              : 'border-transparent text-gray-500 hover:text-sp-navy'
          }`}
        >
          {isRecruiter ? 'Active Job Requisitions' : 'Saved Positions'}
        </button>
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`pb-4.5 text-xs sm:text-sm font-semibold uppercase tracking-wider border-b-2 transition-all ${
            activeSubTab === 'profile'
              ? 'border-[#6ABF45] text-sp-navy font-bold'
              : 'border-transparent text-gray-500 hover:text-sp-navy'
          }`}
        >
          {isRecruiter ? 'Recruiter Settings' : 'Edit Professional Bio'}
        </button>
      </div>

      {/* 4. Active Panel Selector */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {isRecruiter ? (
            /* --- RECRUITER DESK: APPLICANTS MANAGER --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="recruiter-applicant-layout">
              
              {/* Left Column: Applicants List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-black uppercase text-sp-navy tracking-wider">Candidate Applied Proposals</h3>
                  <span className="text-xs text-gray-400 font-bold">{displayedApps.length} Profiles found</span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {displayedApps.map((app) => {
                    const originalJobName = activeJobsList.find(j => j.id === app.jobId)?.title || "Specialized Role";
                    return (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApplicantDetails(app)}
                        className={`p-4 bg-white border rounded-xl cursor-pointer hover:shadow-md transition-all ${
                          selectedApplicantDetails?.id === app.id 
                            ? 'border-2 border-sp-green shadow-inner' 
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-sm font-black text-sp-navy leading-none mb-1">{app.fullName}</h4>
                            <span className="text-[11px] font-semibold text-gray-400">Position: <strong className="text-indigo-600">{originalJobName}</strong></span>
                          </div>
                          
                          <span className={`text-[9px] font-bold px-2.5 py-1 rounded font-mono ${
                            app.stage === 'Interview Scheduled' || app.stage === 'Advance'
                              ? 'bg-[#EAF5D7] text-sp-green border border-sp-green/20'
                              : app.stage === 'Decline'
                                ? 'bg-red-50 text-red-600 border border-red-100'
                                : 'bg-slate-100 text-slate-600'
                          }`}>
                            {app.stage || 'Screening'}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 italic mb-3">
                          "{app.coverLetter}"
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[10px] text-gray-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-sp-green" /> {app.email}
                          </span>
                          <span>Applied: {app.appliedDate}</span>
                        </div>
                      </div>
                    );
                  })}

                  {displayedApps.length === 0 && (
                    <div className="bg-white border rounded-xl py-12 text-center text-xs text-gray-400 italic">
                      No matching candidate applications have been received yet for your postings.
                    </div>
                  )}
                </div>

                {/* Scheduled Interviews Subsection */}
                <div className="bg-white border border-slate-250 rounded-2xl p-5 shadow-xs space-y-4 mt-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4.5 w-4.5 text-indigo-600" />
                      <h3 className="text-xs font-black text-sp-navy uppercase tracking-wider">Scheduled Live Sift Rounds</h3>
                    </div>
                    <span className="text-[10px] text-[#6ABF45] bg-[#EAF5D7] font-black px-2.5 py-1 rounded font-mono">
                      {scheduledInterviews.length} Confirmed
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {scheduledInterviews.map((sch) => (
                      <div key={sch.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sp-navy">{sch.candidateName}</span>
                            <span className="text-[10px] text-gray-400">({sch.candidateEmail})</span>
                          </div>
                          <p className="text-slate-500 font-semibold">{sch.jobTitle} • <strong className="text-indigo-600 font-bold">{sch.type}</strong></p>
                          <p className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                            <Clock className="h-3 w-3 text-sp-green" /> {sch.date} at {sch.time}
                          </p>
                          {sch.notes && (
                            <p className="text-[10px] italic text-slate-400 bg-white p-2 rounded border border-slate-100 mt-1 leading-relaxed">
                              "Note: {sch.notes}"
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setScheduledInterviews(prev => prev.filter(s => s.id !== sch.id));
                          }}
                          className="text-[10px] text-red-500 font-bold hover:underline shrink-0"
                        >
                          Cancel
                        </button>
                      </div>
                    ))}

                    {scheduledInterviews.length === 0 && (
                      <p className="text-xs text-gray-400 italic text-center py-4">No active interviews scheduled yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Vetting Inspector */}
              <div className="lg:col-span-12 xl:col-span-5">
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sticky top-24 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs font-bold text-sp-navy uppercase tracking-wider">Candidate Inspector</span>
                    <span className="text-[10px] text-[#6ABF45] bg-[#EAF5D7] font-black px-2.5 py-1 rounded">Live Vetting</span>
                  </div>

                  {selectedApplicantDetails ? (
                    <div className="space-y-4">
                      {/* Top Header info */}
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-indigo-50 text-sp-navy text-sm font-black flex items-center justify-center">
                          {selectedApplicantDetails.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sp-navy leading-none mb-1">{selectedApplicantDetails.fullName}</h3>
                          <span className="text-[11px] font-bold text-gray-400 block">{selectedApplicantDetails.email}</span>
                        </div>
                      </div>

                      {/* Cover letter section */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          <span>Applicant Statement Excerpt</span>
                          <span className="text-indigo-600">CV Vetted</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic">
                          "{selectedApplicantDetails.coverLetter}"
                        </p>
                      </div>

                      {/* File attachment mock */}
                      <div className="p-3 bg-slate-50/50 border border-dashed border-gray-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-sp-navy" />
                          <div className="leading-tight">
                            <span className="text-[11px] font-extrabold text-sp-navy block max-w-[200px] truncate">{selectedApplicantDetails.resumeName || 'Applicant_Resume_Sourced.pdf'}</span>
                            <span className="text-[9px] text-gray-400 font-bold block">1.4 MB • PDF Sorter Ready</span>
                          </div>
                        </div>
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); alert("File downloaded in simulation wrapper."); }}
                          className="text-[10px] text-[#6ABF45] font-black uppercase hover:underline"
                        >
                          Download
                        </a>
                      </div>

                      {/* Status advancement controller */}
                      <div className="space-y-2.5 pt-3 border-t border-gray-100">
                        <label className="text-xs font-black text-sp-navy uppercase tracking-wider block">Modify Application Stage</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { code: 'Resume Reviewed', label: 'Review' },
                            { code: 'Interview Scheduled', label: 'Interview' },
                            { code: 'Decline', label: 'Decline' }
                          ].map(opt => (
                            <button
                              key={opt.code}
                              onClick={() => {
                                handleStageSelect(selectedApplicantDetails.id, opt.code);
                                setSelectedApplicantDetails({
                                  ...selectedApplicantDetails,
                                  stage: opt.code
                                });
                              }}
                              className={`py-2 px-1 text-[10px] font-black rounded-lg transition-all ${
                                selectedApplicantDetails.stage === opt.code
                                  ? 'bg-sp-navy text-white shadow-sm'
                                  : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Interview Scheduler Input panel */}
                      <form onSubmit={handleScheduleInterview} className="space-y-3 pt-4 border-t border-gray-100 bg-slate-50/70 p-4.5 rounded-2xl border border-slate-200/60">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-indigo-600 shrink-0" />
                          <h4 className="text-[11px] font-black text-sp-navy uppercase tracking-wider">Schedule Interview Roundtable</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase block">Interview Date</label>
                            <input 
                              type="date" 
                              required
                              value={interviewDate}
                              onChange={(e) => setInterviewDate(e.target.value)}
                              className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#6ABF45] font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-500 uppercase block">Interview Time</label>
                            <input 
                              type="time" 
                              required
                              value={interviewTime}
                              onChange={(e) => setInterviewTime(e.target.value)}
                              className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#6ABF45] font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-500 uppercase block">Evaluation Module format</label>
                          <select 
                            value={interviewType}
                            onChange={(e) => setInterviewType(e.target.value)}
                            className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#6ABF45]"
                          >
                            <option value="Technical Live Coding">Technical Live Coding</option>
                            <option value="System Architecture Review">System Architecture Review</option>
                            <option value="Culture Sift Round">Culture Sift Round</option>
                            <option value="Executive Sourcing Sync">Executive Sourcing Sync</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-500 uppercase block">Internal / Prep Notes (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Focus on cloud optimization & system design"
                            value={interviewNotes}
                            onChange={(e) => setInterviewNotes(e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#6ABF45]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xs flex items-center justify-center gap-2 mt-2"
                        >
                          <Send className="h-3.5 w-3.5 text-[#6ABF45]" />
                          <span>Schedule & Send simulated Email</span>
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-xs text-gray-400 italic">
                      Select a candidate application on the left to review their career statements, CV downloads, and manage sourcing pipeline stages.
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* --- SEEKER DESK: APPLICATIONS HISTORY --- */
            <div className="space-y-5" id="candidate-applications-panel">
              {/* Candidate Schedule Board */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-sp-green" />
                    <h3 className="text-sm font-extrabold text-sp-navy uppercase tracking-wider">My Scheduled Placement Rounds</h3>
                  </div>
                  <span className="text-xs text-indigo-600 bg-indigo-50 font-black px-2.5 py-1 rounded font-mono">
                    {scheduledInterviews.length} Round(s) Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheduledInterviews.map((sch) => (
                    <div key={sch.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2.5 relative overflow-hidden group hover:border-[#6ABF45] hover:shadow-xs transition-all text-xs">
                      <div className="absolute top-0 right-0 bg-[#EAF5D7] text-sp-green text-[9px] font-black px-3 py-1 rounded-bl-xl font-mono uppercase tracking-wider">
                        Live Room Sourced
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Evaluation Format</span>
                        <h4 className="text-sm font-extrabold text-sp-navy">{sch.type}</h4>
                        <p className="text-xs font-semibold text-slate-500">{sch.jobTitle}</p>
                      </div>

                      <div className="flex items-center gap-2.5 pt-2.5 border-t border-dashed border-slate-200 text-xs font-bold text-sp-navy">
                        <span className="flex items-center gap-1 text-[11px] text-[#6ABF45]">
                          <Calendar className="h-3.5 w-3.5" /> {sch.date}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1 text-[11px] text-indigo-600">
                          <Clock className="h-3.5 w-3.5" /> {sch.time}
                        </span>
                      </div>

                      {sch.notes && (
                        <p className="text-[11px] text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-100 mt-2">
                          "Preparation note: {sch.notes}"
                        </p>
                      )}
                    </div>
                  ))}

                  {scheduledInterviews.length === 0 && (
                    <div className="col-span-2 py-6 text-center text-xs text-slate-400 italic">
                      No interviews scheduled yet. Recruiters will email or update the portal directly when advancing your candidacy.
                    </div>
                  )}
                </div>
              </div>

              {/* Original Active tracking starts here */}
              <div className="flex items-center justify-between mt-6">
                <h3 className="text-sm font-black uppercase text-sp-navy tracking-wider">My Active Application Tracking</h3>
                <span className="text-xs text-[#6ABF45] font-bold">Simulated Multi-Step recruitment Live Status</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allCandidateApplications.map((app) => (
                  <div
                    key={app.id} 
                    className="bg-white border border-slate-200 hover:border-[#6ABF45] p-5 rounded-2xl shadow-sm space-y-4 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded uppercase">
                          {app.companyName}
                        </span>
                        <h4 className="text-sm font-extrabold text-sp-navy leading-snug line-clamp-1">
                          {app.jobTitle}
                        </h4>
                      </div>

                      <span className={`text-[9px] font-semibold tracking-wider font-mono px-2.5 py-1 rounded-md uppercase ${
                        app.status === 'Interview Scheduled' 
                          ? 'bg-[#EAF5D7] text-sp-green border border-sp-green/20' 
                          : app.status === 'Decline' 
                            ? 'bg-red-50 text-red-600 border border-red-100'
                            : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-[11px] font-bold text-gray-500 border-t border-slate-50 pt-3">
                      <span>Package: <strong className="text-sp-navy">{app.salary}</strong></span>
                      <span>Location: {app.location}</span>
                    </div>

                    {/* Vetting checklist meter depending on status */}
                    <div className="space-y-2 pt-3 border-t border-gray-100 text-[10px] text-gray-400 font-bold">
                      <div className="flex justify-between text-[9px] text-[#6ABF45]">
                        <span>Applied Track</span>
                        <span>{app.status === 'Interview Scheduled' ? 'Stage 3 of 4' : 'Stage 1 of 4'}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 h-1.5">
                        <div className="bg-sp-green h-full rounded" />
                        <div className={`h-full rounded ${app.status !== 'Applied Successfully' && app.status !== 'Decline' ? 'bg-sp-green' : 'bg-slate-200'}`} />
                        <div className={`h-full rounded ${app.status === 'Interview Scheduled' ? 'bg-sp-green' : 'bg-slate-200'}`} />
                        <div className="bg-slate-200 h-full rounded" />
                      </div>
                    </div>
                  </div>
                ))}

                {allCandidateApplications.length === 0 && (
                  <div className="bg-white border rounded-xl py-12 text-center text-xs text-gray-400 italic md:col-span-2">
                    You have not submitted direct applications yet. Sift our job catalog to apply.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Panel 2: Items display */}
      {activeSubTab === 'items' && (
        <div className="space-y-6">
          {isRecruiter ? (
            /* --- RECRUITER DESK: MY POSTS --- */
            <div className="space-y-4" id="recruiter-posts-panel">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase text-sp-navy tracking-wider">Recruitment Postings Overview</h3>
                <span className="text-xs text-gray-400 font-bold">{myPostedJobs.length} active requisitions</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPostedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-150 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-56"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-black uppercase">
                          {job.category}
                        </span>
                        
                        {onDeleteJob && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if(confirm(`Are you sure you want to remove the posting "${job.title}"? This action cannot be undone.`)){
                                onDeleteJob(job.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete vacancy"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-sp-navy mb-1 line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-xs text-sp-muted font-semibold mb-3">
                        CTC Range: ₹{(job.minSalary/100000).toFixed(1)}L - ₹{(job.maxSalary/100000).toFixed(1)}L
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-gray-400 font-bold mt-auto pb-1">
                      <span>Openings: {job.openings} remaining</span>
                      <button
                        onClick={() => onSelectJob(job)}
                        className="text-sp-green hover:underline flex items-center gap-0.5 text-xs font-black uppercase"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {myPostedJobs.length === 0 && (
                  <div className="bg-white border rounded-xl py-12 text-center text-xs text-gray-400 italic md:col-span-3">
                    You have not published any requisitions yet. Use "Publish Vacancy" button at the header.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* --- SEEKER DESK: SAVED POSITION BOOKMARKS --- */
            <div className="space-y-4" id="seeker-bookmarks-panel">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase text-sp-navy tracking-wider">Bookmarked Vacancies</h3>
                <span className="text-xs text-gray-400 font-bold">{mySavedJobs.length} Bookmarks active</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySavedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-150 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-[210px] cursor-pointer"
                    onClick={() => onSelectJob(job)}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-sp-green bg-[#EAF5D7] px-2 py-0.5 rounded font-black uppercase">
                          {job.category}
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaveJob(job.id);
                          }}
                          className="p-1.5 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Remove bookmark"
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </button>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-sp-navy mb-1 line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold mb-2 block truncate">
                        Sourced City: {job.city} • Hybrid
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-gray-400 font-bold mt-auto">
                      <span>Exp req: {job.minExperience} - {job.maxExperience} yrs</span>
                      <span className="text-sp-green font-black uppercase">Apply Now</span>
                    </div>
                  </div>
                ))}

                {mySavedJobs.length === 0 && (
                  <div className="bg-white border rounded-xl py-12 text-center text-xs text-gray-400 italic md:col-span-3">
                    You have not starred any active job listings yet. Sift through active postings to save them here!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Panel 3: Profile customization */}
      {activeSubTab === 'profile' && (
        <div className="bg-white border border-sp-border rounded-2xl p-6.5 max-w-2xl mx-auto shadow-sm" id="profile-editor-panel">
          {isRecruiter ? (
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-sp-navy border-b border-gray-100 pb-2">
                Simulated Corporate Partner specifications
              </h3>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-700 font-bold mb-4">
                Corporate postings will dynamically bind beneath your active branding. Customize required parameters below to achieve or maintain the 80% mark.
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">Recruiter Department Name *</label>
                  <input
                    type="text"
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                    placeholder="e.g. Infosys Talent Acquisition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">Company Industry Group *</label>
                  <input
                    type="text"
                    value={industryName}
                    onChange={(e) => setIndustryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                    placeholder="e.g. Information Technology"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">Company Headquarters / Location *</label>
                  <input
                    type="text"
                    value={hqAddress}
                    onChange={(e) => setHqAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                    placeholder="e.g. Electronic City, Bengaluru"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">Verified Brand Website URL *</label>
                    <input
                      type="url"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                      placeholder="e.g. https://www.infosys.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">Corporate Size *</label>
                    <select
                      value={corpSize}
                      onChange={(e) => setCorpSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                    >
                      <option value="">-- Choose Corporate Size --</option>
                      <option value="1-50 Employees">1-50 Employees</option>
                      <option value="51-500 Employees">51-500 Employees</option>
                      <option value="501-5000 Employees">501-5000 Employees</option>
                      <option value="10000+ Employees">10000+ Employees</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold block">Current score calculated dynamically in the header dashboard card.</span>
                  <button
                    type="button"
                    onClick={() => {
                      saveEmployerProfile(currentUser?.email || 'guest', {
                        companyName: currentUser?.name || 'Partner',
                        deptName,
                        industry: industryName,
                        hqAddress,
                        corpSize,
                        website: companyWebsite,
                        email: currentUser?.email || ''
                      });
                      alert("Employer Corporate specs updated successfully! You can verify your dynamic score changes in the metric card above.");
                    }}
                    className="px-5 py-2.5 bg-[#6ABF45] hover:bg-opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                  >
                    Save Corporate Specifications
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-sp-navy border-b border-gray-100 pb-2">
                Resume Vetting Bio & Skills Sorter
              </h3>

              <div className="space-y-4">
                {/* Simulated file path helper */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">Resume Document File Title *</label>
                  <input
                    type="text"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl"
                    placeholder="e.g. Siddharth_Malhotra_Resume.pdf"
                  />
                </div>

                {/* Candidate bio statement */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">Bio summary statement *</label>
                  <textarea
                    rows={4}
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl leading-relaxed resize-none"
                    placeholder="Provide professional bio summary of at least 15 characters..."
                  />
                </div>

                {/* Key Qualifications checklist tags */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-sp-navy block">My skillset qualifiers *</label>
                  
                  <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3">
                    {skillsList.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-[#EAF5D7] text-sp-green text-xs font-extrabold px-2.5 py-1 rounded-md border border-sp-green/10">
                        {tag}
                        <button onClick={() => setSkillsList(skillsList.filter(s => s !== tag))} className="text-red-500 font-bold text-[10px] hover:scale-110 ml-0.5">×</button>
                      </span>
                    ))}
                    {skillsList.length === 0 && (
                      <span className="text-xs text-gray-400 italic">No qualifiers set. Add skills below to secure 25%.</span>
                    )}
                  </div>

                  <form onSubmit={handleAddSkill} className="flex gap-2">
                    <input
                      type="text"
                      value={newSkillStr}
                      onChange={(e) => setNewSkillStr(e.target.value)}
                      placeholder="e.g. AWS Cloud, Figma Pro"
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-semibold text-sp-navy rounded-xl focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sp-navy hover:bg-[#6ABF45] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                    >
                      + Add
                    </button>
                  </form>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold block">Current score calculated dynamically in the header dashboard card.</span>
                  <button
                    type="button"
                    onClick={() => {
                      saveSeekerProfile(currentUser?.email || 'guest', {
                        resumeName,
                        bioText,
                        skillsList,
                        phone: seekerProfileObj.phone,
                        fullName: currentUser?.name || '',
                        email: currentUser?.email || ''
                      });
                      alert("Candidate Professional Profile updated successfully! You can verify your dynamic score changes in the metrics cards above.");
                    }}
                    className="px-5 py-2.5 bg-sp-green hover:bg-opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                  >
                    Confirm & Save Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Modal: Active Email Confirmation Preview */}
      {activeSimulatedEmail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade">
          <div className="bg-white border text-left border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            {/* Email Header bar */}
            <div className="bg-sp-navy text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#6ABF45]">Simulated Email Sporter</span>
              </div>
              <span className="text-[10px] font-mono text-gray-450 font-bold">Sent via SMTP Simulation Node</span>
            </div>

            {/* Email envelope format details */}
            <div className="p-5 border-b border-gray-150 space-y-2 bg-slate-50 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">From:</span>
                <span className="text-sp-navy font-semibold">{activeSimulatedEmail.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">To:</span>
                <span className="text-indigo-600 font-bold">{activeSimulatedEmail.to}</span>
              </div>
              {activeSimulatedEmail.cc && (
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">CC:</span>
                  <span className="text-slate-500 font-semibold">{activeSimulatedEmail.cc}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200/60 pt-2 font-bold text-sp-navy">
                <span>Subject:</span>
                <span>{activeSimulatedEmail.subject}</span>
              </div>
            </div>

            {/* Email Body text content */}
            <div className="p-5 flex-1 bg-white max-h-[300px] overflow-y-auto font-mono text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
              {activeSimulatedEmail.body}
            </div>

            {/* Action buttons footer */}
            <div className="bg-slate-50 px-5 py-3.5 border-t border-gray-150 flex items-center justify-between">
              <span className="text-[10px] text-[#6ABF45] font-black flex items-center gap-1">
                <Check className="h-3 w-3" /> SUCCESS: Email Transmitted
              </span>
              <button
                type="button"
                onClick={() => setActiveSimulatedEmail(null)}
                className="px-4 py-2 bg-sp-navy hover:bg-[#6ABF45] text-white text-[11px] font-black uppercase tracking-wider rounded-lg transition-all"
              >
                Acknowledge & Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
