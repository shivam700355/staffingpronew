import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X, User, LogOut } from 'lucide-react';
import logoImage from '../../assets/StaffingLogo.png';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  currentUser: { email: string; name: string; role: 'seeker' | 'employer' } | null;
  onLogout: () => void;
}

export default function Header({ currentPage, setCurrentPage, currentUser, onLogout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [locationName, setLocationName] = useState<string>('Bengaluru, IN');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Fast robust IP geolocation detection
    fetch('https://ipapi.co/json/')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => {
        if (data && data.city && data.country_code) {
          setLocationName(`${data.city}, ${data.country_code}`);
        }
      })
      .catch(() => {
        // Silent fallback - remain Bengaluru, IN
      });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRefreshLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if ('geolocation' in navigator) {
      setLocationName('Detecting...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`)
            .then((res) => res.json())
            .then((data) => {
              const city = data.address?.city || data.address?.town || data.address?.suburb || data.address?.state_district || 'My Location';
              const countryCode = (data.address?.country_code || 'IN').toUpperCase();
              setLocationName(`${city}, ${countryCode}`);
            })
            .catch(() => {
              setLocationName(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`);
            });
        },
        () => {
          setLocationName('Bengaluru, IN');
        }
      );
    }
  };

  const navLinks = [
    { id: 'jobs', label: 'Find Job' },
    { id: '', label: 'Employers' },
    { id: '', label: 'Candidates' },
    { id: '', label: 'Pricing Plans' }
  ];
  //   const navLinks = [
  //   { id: 'jobs', label: 'Find Job' },
  //   { id: 'employers', label: 'Employers' },
  //   { id: 'candidates', label: 'Candidates' },
  //   { id: 'pricing', label: 'Pricing Plans' }
  // ];

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3 border-b border-gray-100'
          : 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo and Text */}
        <div
  onClick={() => setCurrentPage('home')}
  className="cursor-pointer flex items-center"
>
  <img
    src={logoImage}
    alt="Logo"
    className="h-12 w-auto object-contain"
  />
</div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" id="desktop-navbar-items">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`relative font-sans text-sm font-medium transition-colors py-1.5 duration-200 ${
                  currentPage === link.id
                    ? 'text-sp-green font-semibold'
                    : 'text-sp-navy hover:text-sp-green'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sp-green rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-5" id="desktop-header-controls">
            {/* Current Dynamic Location Detector */}
            <button
              onClick={handleRefreshLocation}
              title="Click to detect high-precision geolocation"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 rounded-full border border-gray-150 transition-all font-mono text-[11px] font-bold text-sp-navy"
            >
              <MapPin className="h-3.5 w-3.5 text-[#6ABF45]" />
              <span>{locationName}</span>
            </button>

            {/* Auth Buttons / Member Info */}
            {currentUser ? (
              <div className="flex items-center gap-4 animate-fade">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={`px-4.5 py-2 border rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    currentPage === 'dashboard'
                      ? 'bg-sp-green text-white border-sp-green shadow-xs'
                      : 'border-gray-250 bg-white text-sp-navy hover:text-sp-green hover:border-[#6ABF45]'
                  }`}
                >
                  Dashboard
                </button>
                <div 
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center gap-2 py-1 px-2.5 bg-gray-50 rounded-full border border-gray-150 cursor-pointer hover:bg-slate-100 group transition-all"
                  title="Open Personal Placement Dashboard"
                >
                  <div className="relative h-7 w-7 rounded-full overflow-hidden border border-sp-green shrink-0 bg-slate-200">
                    <img 
                      src={
                        currentUser.role === 'employer'
                          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
                          : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
                      }
                      alt={currentUser.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-200"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
                  </div>
                  <span className="text-xs font-bold text-sp-navy max-w-[120px] truncate group-hover:text-sp-green transition-colors pr-1">
                    {currentUser.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                // onClick={() => setCurrentPage('signin')}
                className="px-4.5 py-2 text-sm font-semibold text-sp-navy hover:text-sp-green transition-colors duration-200"
                id="header-sign-in-button"
              >
                Sign In
              </button>
            )}

            <button
              // onClick={() => setCurrentPage('postjob')}
              className="px-5 py-2.5 bg-sp-green hover:bg-opacity-90 text-white rounded-lg text-sm font-bold shadow-sm shadow-sp-green/20 transition-all duration-200 hover:-translate-y-0.5"
              id="header-post-job-button"
            >
              Post A Job
            </button>
          </div>

          {/* Mobile Menu Action Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              // onClick={() => setCurrentPage('postjob')}
              className="px-3.5 py-1.5 bg-sp-green text-white rounded-md text-xs font-bold transition-all"
            >
              Post Job
            </button>
            {/* <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-sp-navy hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button> */}
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Layout */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-inner" id="mobile-navigation-drawer">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === link.id
                    ? 'bg-sp-green-light text-sp-green'
                    : 'text-sp-navy hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="h-px bg-gray-100 my-4" />

            {/* Mobile Support and Auth Details */}
            <div className="px-4 space-y-4">
              <div
                onClick={handleRefreshLocation}
                className="flex items-center gap-3 text-sm text-sp-navy font-bold cursor-pointer hover:text-[#6ABF45]"
              >
                <MapPin className="h-4 w-4 text-[#6ABF45]" />
                <span className="font-mono text-xs">{locationName}</span>
              </div>

              {currentUser ? (
                <div className="space-y-3">
                  <div className="text-xs text-gray-500 font-medium">Logged in as:</div>
                  <div 
                    onClick={() => {
                      setCurrentPage('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 bg-sp-bg p-2.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-sp-green shrink-0 bg-slate-200">
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
                      <span className="text-[10px] font-mono font-bold text-sp-green block uppercase tracking-wider">
                        {currentUser.role === 'employer' ? 'Recruiter' : 'Candidate'}
                      </span>
                      <span className="text-sm font-bold text-sp-navy block leading-tight">{currentUser.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage('dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1 py-2.5 text-center text-xs font-black uppercase tracking-widest text-white bg-sp-navy rounded-xl shadow-xs"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-3 py-2.5 text-xs font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-1"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  // onClick={() => {
                  //   setCurrentPage('signin');
                  //   setIsMobileMenuOpen(false);
                  // }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-sp-navy border border-sp-navy/20 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
