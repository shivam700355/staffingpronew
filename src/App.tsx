import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
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

  const navigateToPage = (p: string) => { if (p === 'home') navigate('/'); else navigate(`/${p}`); };

  const handleLoginSuccess = (u:any) => { setCurrentUser(u); localStorage.setItem('st_current_user', JSON.stringify(u)); navigate('/'); };
  const handleRegisterSuccess = handleLoginSuccess;
  const handleLogout = () => { setCurrentUser(null); localStorage.removeItem('st_current_user'); navigate('/'); };

  const handlePublishJob = (job: Job) => { setActiveJobsList(prev => [job, ...prev]); };
  const handleApplySuccess = (jobId:string, info:any) => { setUserApplications(prev => [...prev, { id: jobId, ...info }]); };
  const handleToggleSaveJob = (id:string) => {
    setSavedJobIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout currentPage="home" setCurrentPage={navigateToPage} currentUser={currentUser} onLogout={handleLogout} />}>
        <Route index element={<HomeView onSearch={(k,c)=>navigate(`/jobs?q=${encodeURIComponent(k)}`)} setCurrentPage={navigateToPage} activeJobsList={activeJobsList} onSelectCategory={(c)=>navigate(`/jobs?category=${encodeURIComponent(c)}`)} onSelectRole={(r)=>navigate(`/jobs?q=${encodeURIComponent(r)}`)} />} />
        <Route path="about" element={<div />} />
        <Route path="jobs" element={<FindJobView initialSearch="" initialCategory="" savedJobIds={savedJobIds} onToggleSaveJob={handleToggleSaveJob} onSelectJob={(job:any)=>navigate(`/jobs/${job.id}`)} onApplyJob={(job:any)=>navigate(`/jobs/${job.id}`)} />} />
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
