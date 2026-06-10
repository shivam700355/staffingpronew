import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';

import HomeView from './pages/HomeView';
import FindJobView from './pages/FindJobView';
import JobDetailView from './pages/JobDetailView';
import EmployersView from './pages/EmployersView';
import CandidatesView from './pages/CandidatesView';
import PricingPlansView from './pages/PricingPlansView';
import AuthView from './pages/AuthView';
import PostJobView from './pages/PostJobView';
import ContactView from './pages/ContactView';
import DashboardView from './pages/DashboardView';

import { JOBS } from './data';
import { Job } from './types';
import { fetchJobListings } from './api';

function parseExperienceRange(experience: string): [number, number] {
  const match = String(experience).match(/(\d+)(?:\D+(\d+))?/);
  const min = match ? Number(match[1]) : 0;
  const max = match && match[2] ? Number(match[2]) : min || 10;
  return [min, max < min ? min : max];
}

function normalizeApiJob(item: any): Job {
  const [minExperience, maxExperience] = parseExperienceRange(item.experience || '0-0');
  const postedAt = item.posted_at ? new Date(item.posted_at) : new Date();
  const daysAgo = Math.max(
    0,
    Math.floor((Date.now() - postedAt.getTime()) / (1000 * 60 * 60 * 24))
  );

  const jobType = String(item.job_type || '').toLowerCase();
  const workMode = String(item.work_mode || '').toLowerCase();

  return {
    id: String(item.id ?? item.slug ?? `${item.company_name}-${item.title}`),
    title: String(item.title || 'Job Opening'),
    companyId: String(item.company_name || 'unknown-company'),
    category: String(item.category || 'General'),
    city: String(item.city || 'Anywhere'),
    jobType:
      jobType.includes('full') ? 'Full-time' :
      jobType.includes('part') ? 'Part-time' :
      jobType.includes('contract') ? 'Contract' :
      jobType.includes('intern') ? 'Internship' :
      jobType.includes('free') ? 'Freelance' :
      'Full-time',
    workMode:
      workMode.includes('remote') ? 'Remote' :
      workMode.includes('hybrid') ? 'Hybrid' :
      workMode.includes('onsite') ? 'Onsite' :
      'Hybrid',
    minSalary: Number(parseFloat(item.salary_min || '0') || 0),
    maxSalary: Number(parseFloat(item.salary_max || '0') || 0),
    minExperience,
    maxExperience,
    openings: 1,
    description: String(item.description || item.slug || item.title || ''),
    responsibilities: [],
    requirements: [],
    skills: Array.isArray(item.skills) ? item.skills : [],
    education: String(item.education || ''),
    postedDaysAgo: daysAgo,
    isFeatured: Boolean(item.is_featured),
    isUrgent: Boolean(item.is_urgent),
    publisherEmail: String(item.publisher_email || ''),
  };
}

function JobDetailWrapper({ activeJobsList, onApplySuccess, currentUser }: { activeJobsList: Job[]; onApplySuccess: (id:string, info:any)=>void; currentUser:any }) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = activeJobsList.find(j => j.id === jobId);
  if (!job) return <Navigate to="/jobs" replace />;
  return <JobDetailView job={job} onBack={() => navigate('/jobs')} onApplySuccess={onApplySuccess} currentUser={currentUser} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const [activeJobsList, setActiveJobsList] = useState<Job[]>(JOBS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    const cached = localStorage.getItem('st_current_user');
    if (cached) setCurrentUser(JSON.parse(cached));
  }, []);

  useEffect(() => {
    async function loadJobsFromApi() {
      try {
        const response = await fetchJobListings();
        if (response && response.status === 200 && Array.isArray(response.data)) {
          const mappedJobs = response.data.map(normalizeApiJob);
          if (mappedJobs.length > 0) {
            setActiveJobsList(mappedJobs);
          }
        } else {
          console.warn('Job listing API returned invalid data:', response);
        }
      } catch (error) {
        console.error('Failed to fetch job listings:', error);
      }
    }

    loadJobsFromApi();
  }, []);

  const navigateToPage = (p: string) => { if (p === 'home') navigate('/'); else navigate(`/${p}`); };

  const handleLoginSuccess = (u:any) => { setCurrentUser(u); localStorage.setItem('st_current_user', JSON.stringify(u)); navigate('/'); };
  const handleRegisterSuccess = handleLoginSuccess;
  const handleLogout = () => { setCurrentUser(null); localStorage.removeItem('st_current_user'); navigate('/'); };

  const handlePublishJob = (job: Job) => { setActiveJobsList(prev => [job, ...prev]); };
  const handleApplySuccess = (jobId:string, info:any) => { setUserApplications(prev => [...prev, { id: jobId, ...info }]); };
  const handleToggleSaveJob = (id:string) => {
    setSavedJobIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const location = useLocation();
  const routeSegment = location.pathname.split('/')[1] || 'home';
  const currentPage = routeSegment === '' ? 'home' : routeSegment;

  return (
    <Routes>
      <Route path="/" element={<MainLayout currentPage={currentPage} setCurrentPage={navigateToPage} currentUser={currentUser} onLogout={handleLogout} />}>
        <Route index element={<HomeView onSearch={(k,c)=>navigate(`/jobs?q=${encodeURIComponent(k)}`)} setCurrentPage={navigateToPage} activeJobsList={activeJobsList} onSelectCategory={(c)=>navigate(`/jobs?category=${encodeURIComponent(c)}`)} onSelectRole={(r)=>navigate(`/jobs?q=${encodeURIComponent(r)}`)} />} />
        <Route path="about" element={<div />} />
        <Route path="jobs" element={<FindJobView initialSearch="" initialCategory="" activeJobsList={activeJobsList} savedJobIds={savedJobIds} onToggleSaveJob={handleToggleSaveJob} onSelectJob={(job:any)=>navigate(`/jobs/${job.id}`)} onApplyJob={(job:any)=>navigate(`/jobs/${job.id}`)} />} />
        <Route path="jobs/:jobId" element={<JobDetailWrapper activeJobsList={activeJobsList} onApplySuccess={handleApplySuccess} currentUser={currentUser} />} />
        <Route path="employers" element={<EmployersView setCurrentPage={navigateToPage} />} />
        <Route path="candidates" element={<CandidatesView />} />
        <Route path="pricing" element={<PricingPlansView />} />
        <Route path="signin" element={<AuthView onLoginSuccess={handleLoginSuccess} onRegisterSuccess={handleRegisterSuccess} />} />
        <Route path="postjob" element={<PostJobView onPublishJob={handlePublishJob} currentUser={currentUser} setCurrentPage={navigateToPage} />} />
        <Route path="contact" element={<ContactView />} />
        <Route path="dashboard" element={currentUser ? <DashboardView currentUser={currentUser} activeJobsList={activeJobsList} userApplications={userApplications} savedJobIds={savedJobIds} onToggleSaveJob={handleToggleSaveJob} onSelectJob={(job:any)=>navigate(`/jobs/${job.id}`)} onPostJobRedirect={()=>navigateToPage('postjob')} onDeleteJob={(id:string)=>setActiveJobsList(prev=>prev.filter(j=>j.id!==id))} onUpdateApplicationStage={(appId:string,stage:string)=>{}} /> : <Navigate to="/signin" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
