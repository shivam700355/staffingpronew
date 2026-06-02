import React from 'react';
import { Trophy } from 'lucide-react';

interface PopularVacanciesProps {
  onSelectRole: (role: string) => void;
}

export default function PopularVacancies({
  onSelectRole,
}: PopularVacanciesProps) {
  const vacancies = [
    { title: 'Anesthesiologists', count: '45,904' },
    { title: 'Surgeons', count: '50,363' },
    { title: 'Obstetricians-Gynecologists', count: '4,339' },
    { title: 'Orthodontists', count: '20,079' },
    { title: 'Maxillofacial Surgeons', count: '74,875' },
    { title: 'Software Developer', count: '43,359', highlight: true },
    { title: 'Psychiatrists', count: '18,599' },
    { title: 'Data Scientist', count: '28,200', highlight: true },
    { title: 'Financial Manager', count: '61,391' },
    { title: 'Management Analysis', count: '93,046' },
    { title: 'IT Manager', count: '50,963' },
    { title: 'Operations Research Analysis', count: '16,627' },
  ];

  return (
    <section className="py-16 bg-white" id="popular-vacancies-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sp-navy tracking-tight mb-2">
              Most Popular Vacancies
            </h2>
            <p className="text-base text-gray-500 max-w-xl font-medium">
              Explore the highest-volume active openings across
              administrative, medical, and technology sectors of India.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-sp-green font-bold hover:underline cursor-pointer bg-sp-green-light py-2 px-4 rounded-lg">
            <span>Specialty Listings</span>
            <Trophy className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vacancies.map((v, index) => (
            <div
              key={index}
              onClick={() => onSelectRole(v.title)}
              className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 group hover:-translate-y-1 ${
                v.highlight
                  ? 'bg-white border-gray-200 hover:bg-sp-green-light/20 hover:border-sp-green hover:shadow-md'
                  : 'bg-white border-gray-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <h3
                className={`text-sm sm:text-base font-bold mb-1 transition-colors duration-300 ${
                  v.highlight
                    ? 'text-sp-navy group-hover:text-sp-green'
                    : 'text-sp-navy group-hover:text-sp-green'
                }`}
              >
                {v.title}
              </h3>

              <p className="text-xs text-slate-400 font-semibold transition-colors duration-300 group-hover:text-slate-600">
                {v.count} Open Positions
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}