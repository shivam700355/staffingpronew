import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams, useLocation, Navigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import PopularVacancies from './components/PopularVacancies';
import HowItWorks from './components/HowItWorks';
import CategoryGrid from './components/CategoryGrid';
import FindJobView from './pages/FindJobView';
import JobDetailView from './pages/JobDetailView';
import EmployersView from './pages/EmployersView';
import CandidatesView from './pages/CandidatesView';
import PricingPlansView from './pages/PricingPlansView';
import AuthView from './pages/AuthView';
import PostJobView from './pages/PostJobView';
import ContactView from './pages/ContactView';
import SEO from './components/SEO';
import DashboardView from './pages/DashboardView';

import { JOBS, COMPANIES, TESTIMONIALS } from './data';
import { Job, Company } from './types';
import { Search, Sparkles, Star, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

// Reusable wrapper to locate specific Job listings for the Job detailed route
function JobDetailWrapper({ 
  activeJobsList, 
  onApplySuccess,
  currentUser
}: { 
  activeJobsList: Job[];
  onApplySuccess: (jobId: string, info: any) => void;
  currentUser: { email: string; name: string; role: 'seeker' | 'employer' } | null;
}) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = activeJobsList.find(j => j.id === jobId);

  if (!job) {
    return <Navigate to="/jobs" replace />;
  }

  return (
    <div className="animate-fade">
      <JobDetailView
        job={job}
        onBack={() => {
          navigate('/jobs');
        }}
        onApplySuccess={onApplySuccess}
        currentUser={currentUser}
      />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [activeJobsList, setActiveJobsList] = useState<Job[]>(JOBS);

  // Derive legacy currentPage property for backwards-compatible active header markers
  const getPageNameByPath = (pathname: string) => {
    if (pathname === '/' || pathname === '/home') return 'home';
    if (pathname.startsWith('/jobs')) return 'jobs';
    const page = pathname.split('/')[1];
    return page || 'home';
  };
  const currentPage = getPageNameByPath(location.pathname);

  const navigateToPage = (pageName: string) => {
    if (pageName === 'home') navigate('/');
    else navigate(`/${pageName}`);
  };

  // Cross-page navigation parameters read directly from active URL search parameters
  const searchQuery = searchParams.get('q') || '';
  const searchCategory = searchParams.get('category') || '';

  // Interactivity state
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: 'seeker' | 'employer' } | null>(null);
  const [userApplications, setUserApplications] = useState<any[]>([]);

  // Toast confirmation feedback state
  const [toastMessage, setToastMessage] = useState<string>('');

  // Load cached states on initial mount
  useEffect(() => {
    const cachedSaved = localStorage.getItem('st_saved_jobs_ids');
    if (cachedSaved) {
      try {
        setSavedJobIds(JSON.parse(cachedSaved));
      } catch (err) {
        console.error('Failed processing localstorage saved cache:', err);
      }
    }
    const cachedUser = localStorage.getItem('st_current_user');
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (err2) {
        console.error('Failed processing user auth state:', err2);
      }
    }
  }, []);

  // Sync saved jobs telemetry
  const handleToggleSaveJob = (jobId: string) => {
    let updated;
    if (savedJobIds.includes(jobId)) {
      updated = savedJobIds.filter(id => id !== jobId);
      showToast('Position removed from your saved list.');
    } else {
      updated = [...savedJobIds, jobId];
      showToast('Position saved to your profile bookmarks!');
    }
    setSavedJobIds(updated);
    localStorage.setItem('st_saved_jobs_ids', JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  // Auth logins
  const handleLoginSuccess = (user: { email: string; name: string; role: 'seeker' | 'employer' }) => {
    setCurrentUser(user);
    localStorage.setItem('st_current_user', JSON.stringify(user));
    showToast(`Welcome back, ${user.name}! You are now signed in.`);
    navigate('/');
  };

  const handleRegisterSuccess = (user: { email: string; name: string; role: 'seeker' | 'employer' }) => {
    setCurrentUser(user);
    localStorage.setItem('st_current_user', JSON.stringify(user));
    showToast(`Welcome, ${user.name}! Your account has been registered.`);
    navigate('/');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('st_current_user');
    showToast('You have signed out successfully.');
    navigate('/');
  };

  const handleDeleteJob = (jobId: string) => {
    setActiveJobsList(prev => prev.filter(j => j.id !== jobId));
    const idx = JOBS.findIndex(j => j.id === jobId);
    if (idx > -1) {
      JOBS.splice(idx, 1);
    }
    showToast('Vacancy requisition successfully removed.');
  };

  const handleUpdateApplicationStage = (appId: string, nextStage: string) => {
    setUserApplications(prev => {
      const exists = prev.some(a => a.id === appId);
      if (exists) {
        return prev.map(a => a.id === appId ? { ...a, stage: nextStage } : a);
      } else {
        return [...prev, { id: appId, stage: nextStage }];
      }
    });
    showToast(`Applicant vetting status set to "${nextStage}".`);
  };

  // Sourcing form wizard publishing connection
  const handlePublishJob = (newJob: Job) => {
    const updatedList = [newJob, ...activeJobsList];
    setActiveJobsList(updatedList);
    JOBS.unshift(newJob);
    showToast('Job published successfully! Your listing is now live.');
  };

  // Cover Letter success telemetry logging
  const handleApplySuccess = (jobId: string, info: any) => {
    const record = {
      id: `app_${Math.floor(Math.random() * 100000)}`,
      jobId,
      ...info,
      date: new Date().toLocaleDateString('en-IN')
    };
    setUserApplications([...userApplications, record]);
    showToast('Application sent successfully! Recruiter has been notified.');
  };

  // Sidebar selector routing handlers
  const handleSearchHero = (keyword: string, city: string) => {
    let url = '/jobs';
    const params = [];
    if (keyword) params.push(`q=${encodeURIComponent(keyword)}`);
    if (city) params.push(`city=${encodeURIComponent(city)}`);
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    navigate(url);
    window.scrollTo(0, 0);
  };

  const handleSelectCategoryHero = (catName: string) => {
    navigate(`/jobs?category=${encodeURIComponent(catName)}`);
    window.scrollTo(0, 0);
  };

  const handleSelectRoleHero = (roleName: string) => {
    navigate(`/jobs?q=${encodeURIComponent(roleName)}`);
    window.scrollTo(0, 0);
  };

  // Dynamic SEO metadata mapper customized per router path
  const getSEOMetadata = (pathname: string, jobDetail: Job | null) => {
    if (pathname === '/' || pathname === '/home') {
      return {
        title: "StaffingPro - Elite Sourcing & Recruitment",
        description: "StaffingPro connects expert candidates with progressive employers. Explore top tier jobs in software design, medicine, finance, and engineering.",
        keywords: "staffingpro, hire talent, software engineer, medical jobs, finance vacancies, elite sourcing, recruiters India"
      };
    }
    if (pathname.startsWith('/jobs')) {
      if (jobDetail) {
        const company = COMPANIES.find(c => c.id === jobDetail.companyId);
        const compName = company ? company.name : 'Top Firm';
        return {
          title: `${jobDetail.title} at ${compName}`,
          description: `Apply now for the ${jobDetail.title} position in ${jobDetail.city}. Offering competitive CTC and elite growth packages.`,
          keywords: `${jobDetail.title.toLowerCase()}, job vacancy, carrier path, staffingpro`
        };
      }
      return {
        title: "Find Your Ideal Job | Search Vacancies",
        description: "Browse thousands of live vacancies matching your specific interests, programming skills, and locations in Bengaluru, Mumbai, and globally.",
        keywords: "search jobs, career match, employment website, live vacancies"
      };
    }
    if (pathname === '/employers') {
      return {
        title: "Partner with Us | StaffingPro Employers",
        description: "Empower your corporate staffing. Hire elite candidates with our custom sourcing tools, premium talent sorter, and developer desks.",
        keywords: "recruit candidates, hire technical staff, staffing partner, placement agency"
      };
    }
    if (pathname === '/candidates') {
      return {
        title: "Career Guides & Direct Candidacy Resources",
        description: "Advance your resume and career track with our free expert portfolio analysis, interview prep checklists, and placement resources.",
        keywords: "placement assistance, resume builder, placement tips, interview roadmap"
      };
    }
    if (pathname === '/pricing') {
      return {
        title: "Transparent Pricing Plans | Post Jobs",
        description: "Select the ideal placement plan for your enterprise. Post live jobs, unlock candidate databases, and enjoy priority sifting.",
        keywords: "job pricing, employer plans, list jobs, hire candidates"
      };
    }
    if (pathname === '/signin') {
      return {
        title: "Sign In or Register Securely",
        description: "Access your StaffingPro workspace. Toggle saved job bookmarks, track application logs, or host live staffing requisitions.",
        keywords: "login, register account, secure portal, staffing workspace"
      };
    }
    if (pathname === '/postjob') {
      return {
        title: "Post a Job Requisition | Talent Acquisition",
        description: "List custom career openings today. Source top-flight applicants instantly from our millions of pre-screened candidate libraries.",
        keywords: "publish job opening, recruit engineer, career sifter"
      };
    }
    if (pathname === '/contact') {
      return {
        title: "Customer Support & Help Desk",
        description: "Get in touch with StaffingPro specialists. Located at Prestige Tech Park, Bengaluru, we are ready to assist with any queries.",
        keywords: "contact support, helpline, staffing center"
      };
    }
    if (pathname === '/dashboard') {
      return {
        title: "Recruiting & Candidacy Dashboard | StaffingPro",
        description: "Configure interview schedules, review live OCR resume extractions, or track real-time applications status.",
        keywords: "dashboard, manage recruitment, interview schedule, candidate profile"
      };
    }
    return {
      title: "StaffingPro - Career Gateway",
      description: "Elite matches and verified lateral hiring models."
    };
  };

  // Find dynamic job detail contexts if matching job pathname
  let currentJobDetail: Job | null = null;
  if (location.pathname.startsWith('/jobs/')) {
    const matchedId = location.pathname.split('/jobs/')[1];
    currentJobDetail = activeJobsList.find(j => j.id === matchedId) || null;
  }

  const seoData = getSEOMetadata(location.pathname, currentJobDetail);

  return (
    <div className="flex flex-col min-h-screen bg-sp-bg font-sans border-0 pl-0 pr-0" id="staffingpro-application-root">
      
      {/* Declarative Dynamic SEO Tag Injector */}
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />

      {/* Toast status bar popup */}
      {toastMessage && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-sp-navy text-white text-xs font-black shadow-2xl p-4.5 rounded-xl border border-sp-green/45 flex items-center gap-3 animate-slide max-w-sm"
          id="global-toast-notification"
        >
          <div className="h-5.5 w-5.5 bg-sp-green-light rounded-full text-sp-green flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header element */}
      <Header
        currentPage={currentPage}
        setCurrentPage={navigateToPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main viewport segments routed with React Router DOM V6 */}
      <main className="flex-grow">
        <Routes>
          {/* HOME ROUTE */}
          <Route path="/" element={
            <div className="animate-fade">
              <HeroSection onSearch={handleSearchHero} setCurrentPage={navigateToPage} />
              
              <StatsBar />

              <CategoryGrid onSelectCategory={handleSelectCategoryHero} />

              <PopularVacancies onSelectRole={handleSelectRoleHero} />

              <HowItWorks />

              {/* Sourcing Corporates Grid */}
              <section className="py-16 bg-white border-t border-b border-gray-150" id="home-featured-companies-block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy mb-2.5">Featured Sourcing Corporates</h2>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-normal">
                      Explore direct matches within progressive brands and organizations currently sourcing actively.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {COMPANIES.map((comp) => {
                      const jobCount = activeJobsList.filter(j => j.companyId === comp.id).length;
                      return (
                        <div
                          key={comp.id}
                          onClick={() => {
                            navigate(`/jobs?q=${encodeURIComponent(comp.name)}`);
                            window.scrollTo(0, 0);
                          }}
                          className="bg-slate-50 border border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md hover:border-sp-green group"
                        >
                          <div className={`h-11 w-11 mx-auto rounded-lg bg-gradient-to-br ${comp.logoColor} text-white flex items-center justify-center font-extrabold text-sm shadow mb-4.5 group-hover:scale-105 transition-transform`}>
                            {comp.name.substring(0, 2).toUpperCase()}
                          </div>
                          <h3 className="text-xs sm:text-sm font-extrabold text-sp-navy leading-none mb-1 group-hover:text-sp-green transition-colors line-clamp-1">
                            {comp.name}
                          </h3>
                          <span className="text-[10px] text-gray-400 font-bold block mb-3.5">{comp.industry}</span>
                          <div className="flex items-center justify-center gap-1.5 text-xs font-black text-sp-navy border-t border-gray-100 pt-3">
                            <span className="text-sp-green">{jobCount}</span>
                            <span className="text-gray-400 text-[11px] font-bold">Positions</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Feedback Board */}
              <section className="py-20 bg-slate-50" id="home-testimonials-carousel">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy mb-3">Recruiter & Seeker Feedback</h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-semibold leading-normal">
                      StaffingPro is trusted by thousands of enterprise talent partners and specialists.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((test) => (
                      <div
                        key={test.id}
                        className="bg-white border border-gray-100 rounded-2xl p-6.5 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
                      >
                        <Quote className="absolute top-5 right-5 h-8 w-8 text-sp-green/10 shrink-0 pointer-events-none" />
                        <div className="space-y-4">
                          <div className="flex items-center gap-0.5 text-yellow-400">
                            {Array.from({ length: test.rating }).map((_, rIdx) => (
                              <Star key={rIdx} className="h-4 w-4 fill-current shrink-0" />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic font-medium">
                            "{test.text}"
                          </p>
                        </div>
                        <div className="flex items-center gap-3.5 pt-5 border-t border-gray-50 mt-5.5">
                          <div className="h-10 w-10 rounded-full bg-sp-navy text-white font-extrabold flex items-center justify-center text-xs uppercase shadow-sm">
                            {test.avatar}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-black text-sp-navy mb-0.5">{test.name}</h4>
                            <span className="text-[10px] text-gray-400 font-bold block">{test.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          } />

          {/* Fallback Legacy Alias redirect */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* COMPREHENSIVE FIND JOBS VIEW */}
          <Route path="/jobs" element={
            <div className="animate-fade">
              <FindJobView
                initialSearch={searchQuery}
                initialCategory={searchCategory}
                savedJobIds={savedJobIds}
                onToggleSaveJob={handleToggleSaveJob}
                onSelectJob={(job) => {
                  navigate(`/jobs/${job.id}`);
                  window.scrollTo(0, 0);
                }}
                onApplyJob={(job) => {
                  navigate(`/jobs/${job.id}`);
                  window.scrollTo(0, 0);
                }}
              />
            </div>
          } />

          {/* DYNAMIC INDIVIDUAL JOB DEEP DETAILS */}
          <Route path="/jobs/:jobId" element={
            <JobDetailWrapper 
              activeJobsList={activeJobsList}
              onApplySuccess={handleApplySuccess}
              currentUser={currentUser}
            />
          } />

          {/* EMPLOYER SERVICES DESCRIPTION */}
          <Route path="/employers" element={
            <div className="animate-fade">
              <EmployersView setCurrentPage={navigateToPage} />
            </div>
          } />

          {/* PORTFOLIO EXTRACTION CHECKS */}
          <Route path="/candidates" element={
            <div className="animate-fade">
              <CandidatesView />
            </div>
          } />

          {/* PRICING CHECKS */}
          <Route path="/pricing" element={
            <div className="animate-fade">
              <PricingPlansView />
            </div>
          } />

          {/* SECURE IDENTITY GATE */}
          <Route path="/signin" element={
            <div className="animate-fade bg-slate-50 py-10 min-h-[70vh] flex items-center">
              <AuthView
                onLoginSuccess={handleLoginSuccess}
                onRegisterSuccess={handleRegisterSuccess}
              />
            </div>
          } />

          {/* SIFT REQUISITIONS FOR RECRUITERS */}
          <Route path="/postjob" element={
            <div className="animate-fade">
              <PostJobView
                onPublishJob={handlePublishJob}
                currentUser={currentUser}
                setCurrentPage={navigateToPage}
              />
            </div>
          } />

          {/* GEOLOCATED HELP CENTER */}
          <Route path="/contact" element={
            <div className="animate-fade">
              <ContactView />
            </div>
          } />

          {/* PRIVATE MEMBER SCREEN */}
          <Route path="/dashboard" element={
            currentUser ? (
              <div className="animate-fade">
                <DashboardView
                  currentUser={currentUser}
                  activeJobsList={activeJobsList}
                  userApplications={userApplications}
                  savedJobIds={savedJobIds}
                  onToggleSaveJob={handleToggleSaveJob}
                  onSelectJob={(job) => {
                    navigate(`/jobs/${job.id}`);
                    window.scrollTo(0, 0);
                  }}
                  onPostJobRedirect={() => navigateToPage('postjob')}
                  onDeleteJob={handleDeleteJob}
                  onUpdateApplicationStage={handleUpdateApplicationStage}
                />
              </div>
            ) : (
              <Navigate to="/signin" replace />
            )
          } />

          {/* NOT FOUND HANDLER */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Application Footer */}
      <Footer setCurrentPage={navigateToPage} />

    </div>
  );
}
