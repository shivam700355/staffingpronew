import React from 'react';
import { MapPin, IndianRupee, Heart, Calendar, Briefcase, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
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
  // Format salary to readable lakhs or standard comma values
  const formatSalarRange = (min: number, max: number) => {
    const minLakh = (min / 100000).toFixed(1);
    const maxLakh = (max / 100000).toFixed(1);
    return `₹${minLakh}L - ₹${maxLakh}L / year`;
  };

  // Job type badge styling helper
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

  // Extract initials for mock logo
  const companyInitials = company ? company.name.substring(0, 2).toUpperCase() : 'CO';

  return (
    <div
      onClick={onSelect}
      className={`relative bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 p-4 hover:-translate-y-0.5 hover:shadow-md ${
        job.isFeatured
          ? 'border-l-4 border-l-sp-green border-gray-200 shadow-xs'
          : 'border-gray-200'
      }`}
      id={`job-card-${job.id}`}
    >
      {/* Top section: company branding and Save heart icon */}
      <div className="flex justify-between items-start gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Mock corporate vector logo with initials */}
          <div
            className={`h-9 w-9 rounded-lg bg-gradient-to-br ${
              company?.logoColor || 'from-gray-500 to-slate-700'
            } text-white font-black flex items-center justify-center text-xs shadow-inner shrink-0`}
          >
            {companyInitials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-gray-500 truncate hover:text-sp-green transition-colors block max-w-[124px]">
                {company ? company.name : 'Verified Employer'}
              </span>
              <CheckCircle className="h-3 w-3 text-blue-500 fill-blue-500/10 shrink-0" title="Verified partner" />
            </div>
            
            <span className="text-[10px] text-sp-muted font-semibold block truncate max-w-[124px]">{company?.industry || 'Recruitment Partner'}</span>
          </div>
        </div>

        {/* Favorite heart toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`p-1.5 rounded-full border transition-all duration-200 shrink-0 ${
            isSaved
              ? 'bg-rose-50 border-rose-200 text-rose-500 scale-105 shadow-sm'
              : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50/%30'
          }`}
          aria-label={isSaved ? 'Remove from saved jobs' : 'Save job post'}
          id={`save-btn-${job.id}`}
        >
          <Heart className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Center: job title and status badges */}
      <div className="space-y-1 mb-2.5">
        <div className="flex flex-wrap items-center gap-1">
          {job.isUrgent && (
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 leading-none uppercase tracking-wide">
              Urgent
            </span>
          )}
          {job.isFeatured && (
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-sp-green-light text-sp-green leading-none uppercase tracking-wide">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-xs.5 sm:text-sm font-black text-indigo-950 hover:text-sp-green transition-colors leading-tight line-clamp-1">
          {job.title}
        </h3>
      </div>

      {/* Meta indicators row: details chips with smaller text */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <div className="flex items-center gap-1 py-0.5 px-2 bg-gray-50 text-gray-600 rounded text-[10.5px] font-bold">
          <MapPin className="h-3 w-3 text-sp-green shrink-0" />
          <span className="truncate max-w-[70px]">{job.city}</span>
        </div>
        <div className="flex items-center gap-1 py-0.5 px-2 bg-gray-50 text-gray-600 rounded text-[10.5px] font-bold">
          <IndianRupee className="h-3 w-3 text-sp-green shrink-0" />
          <span>{formatSalarRange(job.minSalary, job.maxSalary)}</span>
        </div>
        <div className={`py-0.5 px-2 rounded text-[10.5px] font-extrabold ${getJobTypeStyle(job.jobType)}`}>
          {job.jobType}
        </div>
      </div>

      {/* Skills tags list (first 2 for extreme high-density screens, or 3 max) */}
      <div className="flex flex-wrap gap-1 mb-3">
        {job.skills.slice(0, 2).map((skill, sIdx) => (
          <span
            key={sIdx}
            className="text-[9.5px] font-bold tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-gray-100"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 2 && (
          <span className="text-[9px] font-bold text-slate-400 self-center pl-0.5">
            +{job.skills.length - 2}
          </span>
        )}
      </div>

      {/* Bottom information and interactive apply hooks */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <div className="flex items-center gap-1 text-[10.5px] text-sp-muted font-bold">
          <Calendar className="h-3 w-3 text-slate-400" />
          <span>{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply();
          }}
          className="flex items-center gap-1 px-2 py-1 rounded bg-sp-green-light hover:bg-sp-green text-sp-green hover:text-white text-[10px] font-extrabold transition-all duration-200"
          id={`apply-action-btn-${job.id}`}
        >
          <span>Apply</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
