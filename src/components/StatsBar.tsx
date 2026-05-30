import React from 'react';
import { Briefcase, Building2, Users2, PlusCircle } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      id: 'stat_1',
      num: '1,75,324',
      label: 'Live Jobs',
      bgColor: 'bg-sp-green-light',
      iconColor: 'text-sp-green',
      icon: Briefcase
    },
    {
      id: 'stat_2',
      num: '97,354',
      label: 'Companies',
      bgColor: 'bg-sp-navy/10',
      iconColor: 'text-sp-navy',
      icon: Building2
    },
    {
      id: 'stat_3',
      num: '38,47,154',
      label: 'Candidates',
      bgColor: 'bg-sp-green-light',
      iconColor: 'text-sp-green',
      icon: Users2
    },
    {
      id: 'stat_4',
      num: '7,532',
      label: 'New Jobs Today',
      bgColor: 'bg-sp-navy/10',
      iconColor: 'text-sp-navy',
      icon: PlusCircle
    }
  ];

  return (
    <section className="py-10 bg-sp-bg" id="interactive-metrics-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group"
              >
                {/* Circle icon wrapper */}
                <div
                  className={`h-12 w-12 rounded-lg ${stat.bgColor} ${stat.iconColor} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className="h-6 w-6 font-semibold" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-sp-navy leading-none mb-1 group-hover:text-sp-green transition-colors">
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
