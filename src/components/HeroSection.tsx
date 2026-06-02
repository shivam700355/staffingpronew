import React, { useState } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { CITIES, JOBS } from '../data';

interface HeroSectionProps {
  onSearch: (keyword: string, city: string) => void;
  setCurrentPage: (page: string) => void;
}

export default function HeroSection({ onSearch, setCurrentPage }: HeroSectionProps) {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Suggestions derived from actual titles
  const titleSuggestions = Array.from(new Set(JOBS.map(j => j.title)))
    .filter(title => title.toLowerCase().includes(keyword.toLowerCase()))
    .slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, city);
  };

  const handleSuggestionClick = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    setShowSuggestions(false);
    onSearch(selectedKeyword, city);
  };

  const trendSuggestions = [
    { label: 'Developer', value: 'Developer' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Finance', value: 'Finance' },
    { label: 'UI/UX Designer', value: 'Designer' },
    { label: 'Manager', value: 'Manager' }
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-gray-100" id="portal-hero-section">
      
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-sp-green-light/35 rounded-full filter blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50/20 rounded-full filter blur-2xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: marketing copy and interactive search bar */}
          <div className="lg:col-span-7 space-y-6 lg:pr-6">
         
            
            <h1 className="text-4xl sm:text-6xl lg:text-6xl.5 font-sans font-extrabold text-sp-navy leading-[1.12] tracking-tight">
              Find a job that suits <br />
              your <span className="text-sp-green ">interest & skills.</span>
            </h1>
            {/*  <h1 className="text-4xl sm:text-5xl lg:text-5xl.5 font-sans font-extrabold text-sp-navy leading-[1.12] tracking-tight">
              Find a job that suits <br />
              your <span className="text-sp-green underline decoration-wavy decoration-2 underline-offset-8">interest & skills.</span>
            </h1> */}

            <p className="text-sp-muted text-sm sm:text-base leading-relaxed max-w-xl">
              Discover verified opportunities inside premium tech-clusters, healthcare networks, corporate giants, and fast-growing Indian unicorns like Zomato and Swiggy.
            </p>

            {/* Interactive Dual-Input Search Pill form */}
            <div className="relative mt-2 max-w-2xl">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl lg:rounded-full shadow-lg border border-gray-200 p-2 lg:p-1.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-2"
              >
                
                {/* Input 1: Keywords and autocomplete */}
                <div className="flex-1 relative flex items-center min-w-[200px] px-3">
                  <Search className="h-5 w-5 text-sp-green shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Job title, keyword, company..."
                    className="w-full py-2.5 text-sm font-medium text-sp-navy placeholder-gray-400 bg-transparent focus:outline-none"
                    id="hero-keyword-input"
                  />
                  
                  {/* Autocomplete suggestion drop-down */}
                  {showSuggestions && keyword && titleSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-2 z-30 max-h-56 overflow-y-auto py-1">
                      {titleSuggestions.map((title, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSuggestionClick(title)}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-sp-navy hover:bg-sp-green-light hover:text-sp-green transition-all"
                        >
                          {title}
                        </button>
                      ))}
                    </div>
                  )}
                  {showSuggestions && (
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                  )}
                </div>

                <div className="hidden lg:block h-7 w-px bg-slate-200" />

                {/* Input 2: Cities selector dropdown */}
                <div className="flex-1 flex items-center min-w-[160px] px-3">
                  <MapPin className="h-5 w-5 text-sp-green shrink-0 mr-2.5" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full py-2.5 text-sm font-medium text-sp-navy bg-transparent focus:outline-none cursor-pointer"
                    id="hero-city-select"
                  >
                    <option value="">Any Location (India)</option>
                    {CITIES.map((c, idx) => (
                      <option key={idx} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-sp-navy hover:bg-sp-green text-white font-bold rounded-lg lg:rounded-full text-sm shadow-md shadow-sp-navy/10 transition-all duration-200 shrink-0 hover:-translate-y-0.5 active:translate-y-0"
                  id="hero-search-submit-btn"
                >
                  Find Job
                </button>
              </form>
            </div>

            {/* Suggestions labels */}
            <div className="flex flex-wrap items-center gap-2 pt-2.5 text-xs">
              <span className="text-gray-400 font-medium">Suggestion:</span>
              {trendSuggestions.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setKeyword(tag.value);
                    onSearch(tag.value, city);
                  }}
                  className="text-gray-600 hover:text-sp-green hover:underline font-semibold"
                >
                  {tag.label}{idx < trendSuggestions.length - 1 ? ',' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: gorgeous CSS illustration matching image */}
          <div className="lg:col-span-5 relative flex justify-center py-4">
            
            {/* SVG Workspace Board Wrapper with subtle dynamic animations */}
            <div className="w-full max-w-[420px] aspect-square rounded-2xl bg-gradient-to-tr from-slate-50 to-sp-green-light/10 border border-slate-100 p-6 flex flex-col justify-between shadow-inner relative overflow-hidden group">
              
              {/* Back ambient circles */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-sp-green/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/10 rounded-full blur-xl" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-sp-border pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sp-green inline-block animate-pulse" />
                  <span className="text-xs font-bold text-sp-navy">Elite Placement Indicator</span>
                </div>
                <span className="text-[10px] text-sp-green font-bold bg-sp-green-light px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Live Matcher
                </span>
              </div>

              {/* Developer character desk visualization replaced with clean match-rate scorecard */}
              <div className="relative flex-1 flex flex-col items-center justify-center py-6">
                
                {/* Custom Stylized Progress Card */}
                <div className="w-full bg-white border border-sp-border rounded-xl p-4.5 shadow-sm space-y-3.5 transform group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sp-muted tracking-wider uppercase">Average Profile Match</span>
                    <span className="text-sm font-extrabold text-sp-green">98.4% Quality</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-sp-green h-full rounded-full transition-all duration-1000" style={{ width: '92%' }} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-bold text-sp-navy bg-sp-bg px-2.5 py-1 rounded-md">Full Stack</span>
                    <span className="text-[10px] font-bold text-sp-navy bg-sp-bg px-2.5 py-1 rounded-md">Medicine</span>
                    <span className="text-[10px] font-bold text-sp-navy bg-sp-bg px-2.5 py-1 rounded-md">Finance</span>
                    <span className="text-[10px] font-bold text-sp-navy bg-sp-bg px-2.5 py-1 rounded-md">UI/UX</span>
                  </div>
                </div>

                {/* Mini floats cards */}
                <div className="absolute -left-2 top-4 bg-white border border-sp-border rounded-lg p-2.5 shadow-md flex items-center gap-2 animate-bounce" style={{ animationDuration: '4.5s' }}>
                  <div className="w-6 h-6 rounded bg-sp-green-light flex items-center justify-center text-sp-green font-extrabold text-xs">₹</div>
                  <div className="leading-none">
                    <div className="text-[10px] font-extrabold text-sp-navy">₹35 Lakhs+</div>
                    <div className="text-[8px] text-sp-muted font-bold">Max Package</div>
                  </div>
                </div>

                <div className="absolute -right-2 bottom-6 bg-white border border-sp-border rounded-lg p-2.5 shadow-md flex items-center gap-2 transform hover:scale-105 transition-all">
                  <div className="w-6 h-6 rounded-full bg-sp-green-light flex items-center justify-center text-sp-green">
                    <Sparkles className="h-3 w-3 fill-current" />
                  </div>
                  <div className="leading-none">
                    <div className="text-[10px] font-extrabold text-sp-navy">Top Tier Matches</div>
                    <div className="text-[8px] text-sp-muted font-bold">Sourcing Engine</div>
                  </div>
                </div>

              </div>

              {/* Bottom statistics summaries */}
              <div className="border-t border-sp-border pt-4 flex items-center justify-between text-xs text-sp-muted font-semibold">
                <span>Verified Partners</span>
                <span className="text-sp-green font-bold">Zomato, Swiggy & more</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
