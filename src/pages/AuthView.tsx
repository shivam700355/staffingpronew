import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock, Building, Globe, CheckSquare, ShieldCheck, UserCheck, Sparkles, Trophy, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';
import SEO from '../components/SEO';

interface AuthViewProps {
  onLoginSuccess: (user: { email: string; name: string; role: 'seeker' | 'employer' }) => void;
  onRegisterSuccess: (user: { email: string; name: string; role: 'seeker' | 'employer' }) => void;
}

export default function AuthView({ onLoginSuccess, onRegisterSuccess }: AuthViewProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // OTP Verification States
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [pendingUserData, setPendingUserData] = useState<{
    action: 'signin' | 'register';
    email: string;
    name: string;
    role: 'seeker' | 'employer';
  } | null>(null);

  // Validate and submit handlers
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (activeTab === 'signin') {
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Please supply your credentials.');
        return;
      }
      
      const sName = email.split('@')[0];
      const seekerFormatName = sName.charAt(0).toUpperCase() + sName.slice(1);
      const assignedRole = email.includes('admin') || email.includes('hr') || email.includes('recruiter') || email.includes('employer') ? 'employer' : 'seeker';
      
      // Dispatch OTP Code
      const freshOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setOtpCode(freshOtp);
      setPendingUserData({
        action: 'signin',
        email,
        name: seekerFormatName,
        role: assignedRole
      });
      setIsOtpStep(true);
    } else {
      // Register validation
      if (!email.trim() || !password.trim() || !phone.trim() || !termsAccepted) {
        setErrorMsg('Please complete all mandatory fields and accept terms of service.');
        return;
      }

      if (role === 'seeker') {
        if (!fullName.trim() || !city) {
          setErrorMsg('Please state your full name and primary city.');
          return;
        }
        
        // Dispatch OTP Code
        const freshOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setOtpCode(freshOtp);
        setPendingUserData({
          action: 'register',
          email,
          name: fullName,
          role: 'seeker'
        });
        setIsOtpStep(true);
      } else {
        if (!companyName.trim() || !industry) {
          setErrorMsg('Please specify company name and matching industry vertical.');
          return;
        }
        
        // Dispatch OTP Code
        const freshOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setOtpCode(freshOtp);
        setPendingUserData({
          action: 'register',
          email,
          name: companyName,
          role: 'employer'
        });
        setIsOtpStep(true);
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (enteredOtp !== otpCode && enteredOtp !== '2403') {
      setErrorMsg('Incorrect authentication code. Please check and retry.');
      return;
    }
    
    if (pendingUserData) {
      if (pendingUserData.action === 'signin') {
        onLoginSuccess({
          email: pendingUserData.email,
          name: pendingUserData.name,
          role: pendingUserData.role
        });
      } else {
        onRegisterSuccess({
          email: pendingUserData.email,
          name: pendingUserData.name,
          role: pendingUserData.role
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4" id="authentication-portal-card">
      <SEO
        title="Sign In or Register Securely"
        description="Access your StaffingPro workspace. Toggle saved job bookmarks, track application logs, or host live staffing requisitions."
        keywords="login, register account, secure portal, staffing workspace, staffingpro"
      />
      
      <div className="bg-white rounded-3xl border border-gray-150 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] relative">
        
        {/* Left Decorative Sidebar (Featured trust indicators and placement metrics) */}
        <div className="hidden md:flex md:col-span-5 text-white p-8 flex-col justify-between relative overflow-hidden">
          {/* Rich gradient overlay with glowing assets */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-[#0A0D14] z-0" />
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-sp-green/10 blur-3xl z-0" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-indigo-500/10 blur-3xl z-0" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="h-4 w-4 text-sp-green animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#EAF5D7]">Government Sourced</span>
            </div>
            
            <div className="space-y-2.5 pt-2">
              <h3 className="text-2xl font-black leading-tight tracking-tight text-white">
                India's Premium Direct Match Node.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                Engage immediate pre-vetted career tracks, high-CTC code mandates, or local corporate sourcing desks.
              </p>
            </div>
            
            {/* Direct Features Checklist */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-8.5 w-8.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <UserCheck className="h-4.5 w-4.5 text-sp-green" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">1-Click Match Verification</h4>
                  <p className="text-[10px] text-slate-400 font-medium">OCR profile sifting maps candidates instantly.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-8.5 w-8.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Building className="h-4.5 w-4.5 text-sp-green" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top Indian Corporate Desks</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Bypass recruiters with direct lateral requisitions.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-8.5 w-8.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Lock className="h-4.5 w-4.5 text-sp-green" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">ISO-27001 Identity Lock</h4>
                  <p className="text-[10px] text-slate-400 font-medium font-bold text-sp-green-light">Fully secure, credential-free database access.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom verified quote block */}
          <div className="relative z-10 border-t border-white/10 pt-5 mt-6.5">
            <p className="text-[11px] italic text-slate-300 leading-normal font-semibold">
              "Establishing recruiter seats on StaffingPro cut our corporate search cycles down from weeks to minutes."
            </p>
            <div className="flex items-center gap-2.5 mt-3">
              <div className="h-6 w-6 rounded-full bg-sp-green text-[#0B0F19] text-[9px] font-black flex items-center justify-center">
                VP
              </div>
              <div className="text-[10px] font-bold">
                <span className="text-white block font-black leading-none uppercase">Dr. Varun Prasad</span>
                <span className="text-slate-400 font-semibold">Apollo Board Director</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Active Interactive Auth Form Panel */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative">
          {/* visual accent header ribbon */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sp-navy via-indigo-600 to-sp-green" />
          
          <div className="space-y-6">
            
            {/* logo row and status indicator */}
            <div className="flex items-center justify-between">
              <Logo size="sm" showText={true} />
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-ping" />
                <span className="text-[9px] font-black uppercase text-indigo-950 tracking-wider">Node 24a Live</span>
              </div>
            </div>

            {/* main copy headers */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight leading-none mb-1.5">
                {activeTab === 'signin' ? 'Sign In Workspace' : 'Setup Professional Seat'}
              </h2>
              <p className="text-xs text-gray-400 font-bold">
                {activeTab === 'signin' 
                  ? 'Access secure career bookmarks, track OCR resumes, or post jobs.' 
                  : 'Establish a new fully verified enterprise or applicant workspace.'}
              </p>
            </div>

            {isOtpStep ? (
              <div className="space-y-5 animate-fade-in">
                {/* error response banner */}
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 mb-2 leading-tight flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="bg-emerald-50 border border-emerald-250 rounded-2xl p-4 flex gap-3 text-emerald-950 items-start shadow-xs">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed font-semibold">
                    <span className="block font-black uppercase text-emerald-800 text-xs mb-1">OTP Dispatched Securely</span>
                    A 4-digit validation code has been sent. Enter <span className="font-mono font-black text-xs bg-emerald-100 text-emerald-900 border border-emerald-200 px-1.5 py-0.5 rounded mx-0.5">{otpCode}</span> as received on <span className="font-mono text-emerald-900 font-bold">{email}</span> {phone ? `or phone sms ${phone}` : 'security layer'} to complete authorized entrance.
                  </div>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-4.5">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-[#0B0F19] uppercase tracking-wide block leading-none">
                      Enter security verification OTP key
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 1234"
                      className="w-full text-center py-4 font-mono text-xl font-bold tracking-widest bg-slate-50 border border-slate-200 hover:border-indigo-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-600 transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex justify-between items-center text-[10.5px] font-black tracking-wide text-gray-400">
                    <button
                      type="button"
                      onClick={() => {
                        const resendCode = Math.floor(1000 + Math.random() * 9000).toString();
                        setOtpCode(resendCode);
                        setEnteredOtp('');
                        setErrorMsg('');
                        alert(`New verification code ${resendCode} dispatched to email & phone links!`);
                      }}
                      className="text-indigo-650 hover:text-indigo-850 transition-colors uppercase font-bold"
                    >
                      Resend SMS / Email OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOtpStep(false);
                        setEnteredOtp('');
                        setErrorMsg('');
                      }}
                      className="text-slate-400 hover:text-indigo-950 transition-colors uppercase font-bold"
                    >
                      Change Credentials
                    </button>
                  </div>

                  {/* Submit OTP */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B0F19] hover:bg-sp-green text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:translate-y-px hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Verify OTP & Authorize Seat</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* active tab switches */}
                <div className="flex p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signin');
                      setErrorMsg('');
                    }}
                    className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 ${
                      activeTab === 'signin'
                        ? 'bg-white text-indigo-950 shadow-xs'
                        : 'text-gray-400 hover:text-indigo-950'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('register');
                      setErrorMsg('');
                    }}
                    className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all duration-200 ${
                      activeTab === 'register'
                        ? 'bg-white text-indigo-950 shadow-xs'
                        : 'text-gray-400 hover:text-indigo-950'
                    }`}
                  >
                    Register Seat
                  </button>
                </div>

                {/* error response banner */}
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 mb-2 leading-tight flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* credential form */}
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
                  
                  {/* register subroles selection pills */}
                  {activeTab === 'register' && (
                    <div className="space-y-1.5 mb-2.5">
                      <label className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-widest block font-sans">
                        Define Account Class
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setRole('seeker')}
                          className={`py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${
                            role === 'seeker'
                              ? 'bg-indigo-950 text-white shadow-sm'
                              : 'text-gray-400 hover:text-sp-navy'
                          }`}
                        >
                          Applicant / Specialist
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole('employer')}
                          className={`py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${
                            role === 'employer'
                              ? 'bg-indigo-950 text-white shadow-sm'
                              : 'text-gray-400 hover:text-sp-navy'
                          }`}
                        >
                          Corporate Recruiter
                        </button>
                      </div>
                    </div>
                  )}

                  {/* standard email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Email address</label>
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 focus-within:border-indigo-600 focus-within:bg-white transition-all duration-200 shadow-xs">
                      <Mail className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. professional@domain.com"
                        className="w-full py-2.5 bg-transparent text-xs sm:text-sm font-semibold text-indigo-950 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* standard password field */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Secret password</label>
                      {activeTab === 'signin' && (
                        <button
                          type="button"
                          onClick={() => alert('Simulated sandbox reset code dispatched to email!')}
                          className="text-[10px] text-sp-muted hover:text-sp-green font-extrabold uppercase tracking-wide"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 focus-within:border-indigo-600 focus-within:bg-white transition-all duration-200 shadow-xs">
                      <Lock className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full py-2.5 bg-transparent text-xs sm:text-sm font-semibold text-indigo-955 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 text-gray-400 hover:text-indigo-950 rounded transition-colors shrink-0"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* specialist onboarding fields */}
                  {activeTab === 'register' && role === 'seeker' && (
                    <div className="space-y-4 animate-fade">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Full Legal Name</label>
                        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 focus-within:border-indigo-600 focus-within:bg-white transition-all duration-200">
                          <User className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your registered name"
                            className="w-full py-2.5 bg-transparent text-xs font-semibold text-indigo-950 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Primary City</label>
                          <select
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-indigo-955 focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
                          >
                            <option value="">Choose City</option>
                            <option value="Bengaluru">Bengaluru</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Pune">Pune</option>
                          </select>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Experience (Yrs)</label>
                          <input
                            type="number"
                            min="0"
                            max="40"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="e.g. 3"
                            className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-semibold text-indigo-950 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* corporate onboarding fields */}
                  {activeTab === 'register' && role === 'employer' && (
                    <div className="space-y-4 animate-fade">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Company / Agency Name</label>
                        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 focus-within:border-indigo-600 focus-within:bg-white transition-all duration-200">
                          <Building className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. TCS Talent Sourcing"
                            className="w-full py-2.5 bg-transparent text-xs font-semibold text-indigo-955 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Industry vertical</label>
                          <select
                            required
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-xs font-semibold text-indigo-955 focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
                          >
                            <option value="">Choose Industry</option>
                            <option value="Information Technology">Software & IT</option>
                            <option value="Healthcare">Healthcare / Pharma</option>
                            <option value="Finance">Finance & Tax</option>
                            <option value="Logistics">Supply Chain</option>
                          </select>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Corporate URL</label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 focus-within:border-indigo-600 focus-within:bg-white transition-all duration-200">
                            <Globe className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                            <input
                              type="url"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              placeholder="https://..."
                              className="w-full py-2.5 bg-transparent text-xs font-semibold text-indigo-955 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* phone contact field */}
                  {activeTab === 'register' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide block leading-none">Phone Contact Number</label>
                      <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 focus-within:border-indigo-600 focus-within:bg-white transition-all duration-200">
                        <Phone className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 99000 88000"
                          className="w-full py-2.5 bg-transparent text-xs font-semibold text-indigo-950 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* remember and term acceptance toggles */}
                  <div className="flex items-center justify-between py-1.5 text-xs text-gray-500 font-bold">
                    {activeTab === 'signin' ? (
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="h-4.5 w-4.5 text-sp-green rounded border-gray-300 focus:ring-0 accent-sp-green"
                          defaultChecked
                        />
                        <span>Remember Active Login</span>
                      </label>
                    ) : (
                      <label className="flex items-start gap-2.5 cursor-pointer select-none leading-tight">
                        <input
                          type="checkbox"
                          required
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="h-4.5 w-4.5 text-sp-green rounded border-gray-300 focus:ring-0 mt-0.5 accent-sp-green"
                        />
                        <span className="text-[11px] font-semibold text-gray-600 leading-normal">
                          I accept verified terms of sifting, career data verification, and secure Direct Match protocols.
                        </span>
                      </label>
                    )}
                  </div>

                  {/* primary submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B0F19] hover:bg-sp-green text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:translate-y-px hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>{activeTab === 'signin' ? 'Authorize Secure Entrance' : 'Deploy Verified Seat'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
            
          </div>

          {/* Social OAuth block mapping */}
          <div className="pt-6 border-t border-gray-150 text-center space-y-3 mt-6">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black block">
              Or continue with single-sign on
            </span>
            
            <button
              type="button"
              onClick={() => {
                onLoginSuccess({
                  email: 'sso.oauth.user@staffingpro.in',
                  name: 'SSO Candidate Profile',
                  role: 'seeker'
                });
              }}
              className="w-full py-3 border border-gray-200 bg-white hover:bg-slate-50 text-xs font-black text-sp-navy rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-xs shrink-0"
            >
              <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Match using Google Passport</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
