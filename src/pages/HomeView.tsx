import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import PopularVacancies from '../components/PopularVacancies';
import HowItWorks from '../components/HowItWorks';
import CategoryGrid from '../components/CategoryGrid';
import { COMPANIES, TESTIMONIALS } from '../data';
import { Job } from '../types';
import { Quote, Star } from 'lucide-react';

type Props = {
  onSearch: (keyword: string, city: string) => void;
  setCurrentPage: (page: string) => void;
  activeJobsList: Job[];
  onSelectCategory: (catName: string) => void;
  onSelectRole: (roleName: string) => void;
};

export default function HomeView({ onSearch, setCurrentPage, activeJobsList, onSelectCategory, onSelectRole }: Props) {
  const navigate = useNavigate();

  return (
    <div className="animate-fade">
      <HeroSection onSearch={onSearch} setCurrentPage={setCurrentPage} />

      <StatsBar />

      <CategoryGrid onSelectCategory={onSelectCategory} />

      <PopularVacancies onSelectRole={onSelectRole} />

      <HowItWorks />

      <section className="py-16 bg-white" id="home-featured-companies-block">
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
                  className="bg-slate-50 border border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 "
                >
                  <div className={`h-11 w-11 mx-auto rounded-lg bg-gradient-to-br ${comp.logoColor} text-white flex items-center justify-center font-extrabold text-sm shadow mb-4.5 group-hover:scale-105 transition-transform`}>
                    {comp.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-sp-navy leading-none mb-1  transition-colors line-clamp-1">
                    {comp.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-bold block mb-3.5">{comp.industry}</span>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-black text-sp-navy border-t border-gray-100 pt-3">
                    <span className="text-gray-400">{jobCount}</span>
                    <span className="text-gray-400 text-[11px] font-bold">Positions</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
  );
}
