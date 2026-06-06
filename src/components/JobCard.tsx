import React from 'react';
import {
  MapPin,
  IndianRupee,
  Heart,
  Calendar,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Job, Company } from '../types';

interface JobCardProps {
  key?: string | number;
  job: Job;
  company?: Company;
  isSaved: boolean;
  onToggleSave: () => void;
  onSelect: () => void;
  onApply: () => void;
}

export default function JobCard({
  job,
  company,
  isSaved,
  onToggleSave,
  onSelect,
  onApply
}: JobCardProps) {
  const companyInitials = company
    ? company.name.substring(0, 2).toUpperCase()
    : 'CO';

  const formatSalaryRange = (min: number, max: number) => {
    const minLakh = (min / 100000).toFixed(1);
    const maxLakh = (max / 100000).toFixed(1);
    return `₹${minLakh}L - ₹${maxLakh}L / year`;
  };

  const getJobTypeStyle = (type: Job['jobType']) => {
    switch (type) {
      case 'Full-time':
        return 'bg-sp-navy text-white';
      case 'Part-time':
        return 'bg-amber-100 text-amber-800';
      case 'Contract':
        return 'bg-purple-100 text-purple-800';
      case 'Internship':
        return 'bg-teal-100 text-teal-800';
      case 'Freelance':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onSelect}
      id={`job-card-${job.id}`}
      className={`relative bg-white border rounded-xl cursor-pointer transition-all duration-300 p-4 hover:-translate-y-0.5 hover:shadow-md ${
        job.isFeatured
          ? ' border-gray-200'
          : 'border-gray-200'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Logo */}
          <div
            className={`h-11 w-11 rounded-lg bg-gradient-to-br ${
              company?.logoColor || 'from-gray-500 to-slate-700'
            } text-white font-black flex items-center justify-center text-xs shadow-inner shrink-0`}
          >
            {companyInitials}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Company */}
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[11px] font-bold text-gray-500 truncate">
                {company?.name || 'Verified Employer'}
              </span>

              <CheckCircle className="h-3 w-3 text-blue-500 fill-blue-500/10 shrink-0" />
            </div>

            {company?.industry && (
              <p className="text-[10px] text-sp-muted font-semibold mb-1 truncate">
                {company.industry}
              </p>
            )}

            {/* Title + Badges */}
            <div className="flex flex-wrap items-center gap-1 mb-2">
              <h3 className="text-sm font-black text-indigo-950 leading-tight">
                {job.title}
              </h3>

              {job.isUrgent && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 uppercase">
                  Urgent
                </span>
              )}

              {job.isFeatured && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-sp-green-light text-sp-green uppercase">
                  Featured
                </span>
              )}

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${getJobTypeStyle(
                  job.jobType
                )}`}
              >
                {job.jobType}
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <div className="flex items-center gap-1 py-0.5 px-2 bg-gray-50 text-gray-600 rounded text-[10.5px] font-bold">
                <MapPin className="h-3 w-3 text-sp-green shrink-0" />
                <span>{job.city}</span>
              </div>

              <div className="flex items-center gap-1 py-0.5 px-2 bg-gray-50 text-gray-600 rounded text-[10.5px] font-bold">
                <IndianRupee className="h-3 w-3 text-sp-green shrink-0" />
                <span>
                  {formatSalaryRange(job.minSalary, job.maxSalary)}
                </span>
              </div>

              <div className="flex items-center gap-1 py-0.5 px-2 bg-gray-50 text-gray-600 rounded text-[10.5px] font-bold">
                <Calendar className="h-3 w-3 text-slate-400 shrink-0" />
                <span>
                  {job.postedDaysAgo === 0
                    ? 'Today'
                    : `${job.postedDaysAgo}d ago`}
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {job.skills?.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="text-[9.5px] font-bold tracking-wide bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-gray-100"
                >
                  {skill}
                </span>
              ))}

              {job.skills?.length > 3 && (
                <span className="text-[9px] font-bold text-slate-400 self-center">
                  +{job.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`p-2 rounded-full border transition-all duration-200 ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-500 scale-105 shadow-sm'
                : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50'
            }`}
          >
            <Heart
              className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply();
            }}
            id={`apply-action-btn-${job.id}`}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-sp-green-light hover:bg-sp-green text-sp-green hover:text-white text-[11px] font-extrabold transition-all duration-200"
          >
            <span>Apply Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}