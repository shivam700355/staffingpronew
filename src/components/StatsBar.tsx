import React, { useEffect, useState } from 'react';
import { Briefcase, Building2, Users2, PlusCircle } from 'lucide-react';
import { jobGetCount } from '../api';
import { SmallLoader } from './FormElements';

export default function StatsBar() {
  const [counts, setCounts] = useState({
    liveJobs: 0,
    companies: 0,
    candidates: 0,
    newJobsToday: 0,
  });
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoadingCounts(true);
      try {
        const response = await jobGetCount();
        const dataArray = response?.data || [];

        const countsByTitle = Array.isArray(dataArray)
          ? dataArray.reduce<Record<string, number>>((acc, item) => {
              if (!item || typeof item.title !== 'string') return acc;
              const title = item.title.trim().toLowerCase();
              acc[title] = Number(item.count) || 0;
              return acc;
            }, {})
          : {};

        setCounts({
          liveJobs: countsByTitle['active jobs'] || 0,
          companies: countsByTitle['total companies'] || 0,
          candidates: countsByTitle['total candidates'] || 0,
          newJobsToday: countsByTitle['new jobs'] || 0,
        });
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      } finally {
        setIsLoadingCounts(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      id: 'stat_1',
      num: isLoadingCounts ? '...' : counts.liveJobs.toLocaleString(),
      label: 'Live Jobs',
      bgColor: 'bg-sp-navy/10',
      iconColor: 'text-sp-navy',
      icon: Briefcase,
    },
    {
      id: 'stat_2',
      num: isLoadingCounts ? '...' : counts.companies.toLocaleString(),
      label: 'Companies',
      bgColor: 'bg-sp-navy/10',
      iconColor: 'text-sp-navy',
      icon: Building2,
    },
    {
      id: 'stat_3',
      num: isLoadingCounts ? '...' : counts.candidates.toLocaleString(),
      label: 'Candidates',
      bgColor: 'bg-sp-navy/10',
      icon: Users2,
      iconColor: 'text-sp-navy',
    },
    {
      id: 'stat_4',
      num: isLoadingCounts ? '...' : counts.newJobsToday.toLocaleString(),
      label: 'New Jobs Today',
      bgColor: 'bg-sp-navy/10',
      iconColor: 'text-sp-navy',
      icon: PlusCircle,
    },
  ];

  return (
    <section className="py-10 bg-sp-bg" id="interactive-metrics-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoadingCounts && (
          <div className="mb-6 text-center">
            <SmallLoader label="Loading dashboard metrics..." />
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const IconComponent = stat.icon;

            return (
              <div
                key={stat.id}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group"
              >
                <div
                  className={`h-12 w-12 rounded-lg ${stat.bgColor} ${stat.iconColor} flex items-center justify-center shrink-0`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-sp-navy leading-none mb-1">
                    {stat.num}
                  </h3>

                  <p className="text-xs text-sp-muted font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}