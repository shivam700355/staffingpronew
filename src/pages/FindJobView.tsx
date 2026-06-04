import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  ChevronDown,
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Job, Company, JobFilters } from '../types';
import { JOBS, COMPANIES, CATEGORIES, CITIES } from '../data';
import JobCard from '../components/JobCard';
import SEO from '../components/SEO';
import { FormCheckbox, RangeSlider } from '../components/FormElements';

interface FindJobViewProps {
  initialSearch?: string;
  initialCategory?: string;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
}

export default function FindJobView({
  initialSearch = '',
  initialCategory = '',
  savedJobIds,
  onToggleSaveJob,
  onSelectJob,
  onApplyJob
}: FindJobViewProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to check array equality to prevent unnecessary route state updates
  const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
  };

  // State initialisation from query string
  const [search, setSearch] = useState(() => searchParams.get('q') || initialSearch || '');
  const [selectedCities, setSelectedCities] = useState<string[]>(() => {
    const p = searchParams.get('cities');
    return p ? p.split(',').filter(Boolean) : [];
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const p = searchParams.get('categories');
    if (p) return p.split(',').filter(Boolean);
    return initialCategory ? [initialCategory] : [];
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const p = searchParams.get('types');
    return p ? p.split(',').filter(Boolean) : [];
  });
  const [selectedModes, setSelectedModes] = useState<string[]>(() => {
    const p = searchParams.get('modes');
    return p ? p.split(',').filter(Boolean) : [];
  });
  const [maxExperience, setMaxExperience] = useState<number>(() => {
    const p = searchParams.get('experience');
    return p ? Number(p) : 10;
  });
  const [minSalary, setMinSalary] = useState<number>(() => {
    const p = searchParams.get('salary');
    return p ? Number(p) : 0;
  });
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'latest');
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const p = searchParams.get('page');
    return p ? Number(p) : 1;
  });
  const itemsPerPage = 6;

  // Effect (1): Push state changes to the URL query parameter values in real-time
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    const currentCities = searchParams.get('cities') ? searchParams.get('cities')!.split(',').filter(Boolean) : [];
    const currentCategories = searchParams.get('categories') ? searchParams.get('categories')!.split(',').filter(Boolean) : [];
    const currentTypes = searchParams.get('types') ? searchParams.get('types')!.split(',').filter(Boolean) : [];
    const currentModes = searchParams.get('modes') ? searchParams.get('modes')!.split(',').filter(Boolean) : [];
    const currentExp = searchParams.get('experience') ? Number(searchParams.get('experience')) : 10;
    const currentSal = searchParams.get('salary') ? Number(searchParams.get('salary')) : 0;
    const currentSort = searchParams.get('sort') || 'latest';
    const currentPageVal = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const searchChanged = search !== currentQ;
    const citiesChanged = !arraysEqual(selectedCities, currentCities);
    const categoriesChanged = !arraysEqual(selectedCategories, currentCategories);
    const typesChanged = !arraysEqual(selectedTypes, currentTypes);
    const modesChanged = !arraysEqual(selectedModes, currentModes);
    const expChanged = maxExperience !== currentExp;
    const salChanged = minSalary !== currentSal;
    const sortChanged = sortBy !== currentSort;
    const pageChanged = currentPage !== currentPageVal;

    if (
      searchChanged ||
      citiesChanged ||
      categoriesChanged ||
      typesChanged ||
      modesChanged ||
      expChanged ||
      salChanged ||
      sortChanged ||
      pageChanged
    ) {
      const params: Record<string, string> = {};
      if (search.trim()) params.q = search;
      if (selectedCities.length > 0) params.cities = selectedCities.join(',');
      if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
      if (selectedTypes.length > 0) params.types = selectedTypes.join(',');
      if (selectedModes.length > 0) params.modes = selectedModes.join(',');
      if (maxExperience < 10) params.experience = maxExperience.toString();
      if (minSalary > 0) params.salary = minSalary.toString();
      if (sortBy !== 'latest') params.sort = sortBy;
      if (currentPage > 1) params.page = currentPage.toString();

      setSearchParams(params, { replace: true });
    }
  }, [search, selectedCities, selectedCategories, selectedTypes, selectedModes, maxExperience, minSalary, sortBy, currentPage]);

  // Effect (2): Handle external changes to the URL (e.g. from back button or header interactions)
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    const currentCities = searchParams.get('cities') ? searchParams.get('cities')!.split(',').filter(Boolean) : [];
    const currentCategories = searchParams.get('categories') ? searchParams.get('categories')!.split(',').filter(Boolean) : [];
    const currentTypes = searchParams.get('types') ? searchParams.get('types')!.split(',').filter(Boolean) : [];
    const currentModes = searchParams.get('modes') ? searchParams.get('modes')!.split(',').filter(Boolean) : [];
    const currentExp = searchParams.get('experience') ? Number(searchParams.get('experience')) : 10;
    const currentSal = searchParams.get('salary') ? Number(searchParams.get('salary')) : 0;
    const currentSort = searchParams.get('sort') || 'latest';
    const currentPageVal = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    if (search !== currentQ) setSearch(currentQ);
    if (!arraysEqual(selectedCities, currentCities)) setSelectedCities(currentCities);
    if (!arraysEqual(selectedCategories, currentCategories)) setSelectedCategories(currentCategories);
    if (!arraysEqual(selectedTypes, currentTypes)) setSelectedTypes(currentTypes);
    if (!arraysEqual(selectedModes, currentModes)) setSelectedModes(currentModes);
    if (maxExperience !== currentExp) setMaxExperience(currentExp);
    if (minSalary !== currentSal) setMinSalary(currentSal);
    if (sortBy !== currentSort) setSortBy(currentSort);
    if (currentPage !== currentPageVal) setCurrentPage(currentPageVal);
  }, [searchParams]);

  // Sync internal search state if initial props change
  useEffect(() => {
    setSelectedCategories(initialCategory ? [initialCategory] : []);
  }, [initialCategory]);

  useEffect(() => {
    setSearch(initialSearch || '');
  }, [initialSearch]);

  // Handle filter checkbox modifications
  const handleToggleCity = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
    setCurrentPage(1);
  };

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleToggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleToggleMode = (mode: string) => {
    setSelectedModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCities([]);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedModes([]);
    setMaxExperience(10);
    setMinSalary(0);
    setCurrentPage(1);
  };

  // Perform dynamic filtering using useMemo
  const filteredJobs = useMemo(() => {
    let result = [...JOBS];

    // Search bar matching (Title, description, skills or company name)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(job => {
        const company = COMPANIES.find(c => c.id === job.companyId);
        return (
          job.title.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.skills.some(skill => skill.toLowerCase().includes(q)) ||
          (company && company.name.toLowerCase().includes(q))
        );
      });
    }

    // City checklist
    if (selectedCities.length > 0) {
      result = result.filter(job => selectedCities.includes(job.city));
    }

    // Category checklist
    if (selectedCategories.length > 0) {
      result = result.filter(job => selectedCategories.includes(job.category));
    }

    // Job Type checkboxes
    if (selectedTypes.length > 0) {
      result = result.filter(job => selectedTypes.includes(job.jobType));
    }

    // Work Mode toggle pills
    if (selectedModes.length > 0) {
      result = result.filter(job => selectedModes.includes(job.workMode));
    }

    // Experience year value
    if (maxExperience < 10) {
      result = result.filter(job => job.minExperience <= maxExperience);
    }

    // Minimum package value (Convert Rupees L to units)
    if (minSalary > 0) {
      const targetVal = minSalary * 100000;
      result = result.filter(job => job.maxSalary >= targetVal);
    }

    // Sorter logic
    switch (sortBy) {
      case 'salary_high':
        result.sort((a, b) => b.maxSalary - a.maxSalary);
        break;
      case 'salary_low':
        result.sort((a, b) => a.maxSalary - b.maxSalary);
        break;
      case 'experience_low':
        result.sort((a, b) => a.minExperience - b.minExperience);
        break;
      case 'latest':
      default:
        result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }

    return result;
  }, [search, selectedCities, selectedCategories, selectedTypes, selectedModes, maxExperience, minSalary, sortBy]);

  // Paginated listings
  const paginatedJobs = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="find-jobs-view-panel">
      
      <SEO
        title="Find Your Ideal Job | Search Vacancies"
        description="Browse thousands of live vacancies matching your specific interests, programming skills, and locations in Bengaluru, Mumbai, and globally."
        keywords="search jobs, career match, employment website, live vacancies, staffingpro"
      />
      
      {/* Top Search Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-1">
            <Search className="h-5 w-5 text-gray-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by job title, custom skills or company name..."
              className="w-full py-3 bg-transparent text-sm text-sp-navy placeholder-gray-400 focus:outline-none font-semibold"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Selected Chips row indicators */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-50">
          <span className="text-xs text-gray-400 font-bold">Active Filters:</span>
          {selectedCities.map(c => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-sp-green-light text-sp-green rounded-full text-xs font-bold"
            >
              <span>Location: {c}</span>
              <button onClick={() => handleToggleCity(c)} className="hover:scale-110">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {selectedCategories.map(cat => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-sp-green-light text-sp-green rounded-full text-xs font-bold"
            >
              <span>Sector: {cat}</span>
              <button onClick={() => handleToggleCategory(cat)} className="hover:scale-110">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {selectedTypes.map(t => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold"
            >
              <span>Type: {t}</span>
              <button onClick={() => handleToggleType(t)} className="hover:scale-110">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {selectedModes.map(m => (
            <span
              key={m}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold"
            >
              <span>Mode: {m}</span>
              <button onClick={() => handleToggleMode(m)} className="hover:scale-110">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {maxExperience < 10 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
              <span>Experience: ≤ {maxExperience} years</span>
              <button onClick={() => setMaxExperience(10)} className="hover:scale-110">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          {minSalary > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
              <span>Salary: ≥ ₹{minSalary}L</span>
              <button onClick={() => setMinSalary(0)} className="hover:scale-110">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          {(selectedCities.length > 0 ||
            selectedCategories.length > 0 ||
            selectedTypes.length > 0 ||
            selectedModes.length > 0 ||
            maxExperience < 10 ||
            minSalary > 0) ? (
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-500 font-extrabold hover:underline ml-2"
            >
              Clear All Filters
            </button>
          ) : (
            <span className="text-xs text-gray-400 italic">None selected</span>
          )}
        </div>
      </div>

      {/* Primary Workspace Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6" id="search-filters-sidebar">
          <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm divide-y divide-gray-150">
            
            <div className="flex items-center justify-between pb-4">
              <h3 className="text-sm font-extrabold text-sp-navy uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-sp-green" />
                <span>Filters Sidebar</span>
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-xs text-sp-muted hover:text-sp-green font-bold active:scale-95 transition-all"
              >
                Reset
              </button>
            </div>

            {/* Part A: Location Checklist */}
            <div className="py-4.5">
              <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-3">
                Job Location
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {CITIES.map(c => (
                  <FormCheckbox
                    key={c}
                    label={c}
                    checked={selectedCities.includes(c)}
                    onChange={() => handleToggleCity(c)}
                  />
                ))}
              </div>
            </div>

            {/* Part B: Category Checklist */}
            <div className="py-4.5">
              <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-3">
                Job Category
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {CATEGORIES.map(cat => (
                  <FormCheckbox
                    key={cat.id}
                    label={cat.name}
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleToggleCategory(cat.name)}
                  />
                ))}
              </div>
            </div>

            {/* Part C: Job Type Checkboxes */}
            <div className="py-4.5">
              <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-3">
                Employment Type
              </h4>
              <div className="space-y-1">
                {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map(t => (
                  <FormCheckbox
                    key={t}
                    label={t}
                    checked={selectedTypes.includes(t)}
                    onChange={() => handleToggleType(t)}
                  />
                ))}
              </div>
            </div>

            {/* Part D: Work Mode Pill selection */}
            <div className="py-4.5">
              <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-3 block">
                Work Mode
              </h4>
              <div className="grid grid-cols-3 gap-1.5">
                {['Onsite', 'Remote', 'Hybrid'].map(m => {
                  const isAct = selectedModes.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={() => handleToggleMode(m)}
                      className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all ${
                        isAct
                          ? 'bg-sp-green text-white border-sp-green shadow-sm'
                          : 'bg-white border-gray-250 text-gray-500 hover:border-slate-350'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Part E: Experience ranges */}
            <div className="py-4.5">
              <RangeSlider
                label="Experience Level"
                min={0}
                max={10}
                value={maxExperience}
                onChange={setMaxExperience}
                displayValue={maxExperience === 10 ? 'Any years' : `≤ ${maxExperience} Yrs`}
                minLabel="0 Yrs (Fresher)"
                maxLabel="10+ Yrs"
              />
            </div>

            {/* Part F: Salaries sliders */}
            <div className="py-4.5">
              <RangeSlider
                label="Min Annual Salary"
                min={0}
                max={30}
                step={2}
                value={minSalary}
                onChange={setMinSalary}
                displayValue={minSalary === 0 ? 'Any Salary' : `≥ ₹${minSalary} Lakhs`}
                minLabel="₹0L"
                maxLabel="₹30Lakhs+"
              />
            </div>

          </div>
        </aside>

        {/* Right Listings block */}
        <main className="lg:col-span-3 space-y-6" id="job-search-results-list">
          
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Found <span className="text-sp-navy font-black">{filteredJobs.length}</span> active job posts
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold shrink-0">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-gray-50 border border-gray-200 text-xs font-bold text-sp-navy rounded-lg py-2 pl-3.5 pr-8 focus:outline-none cursor-pointer"
                  id="results-sort-by-select"
                >
                  <option value="latest">Latest Posted</option>
                  <option value="salary_high">Salary (High to Low)</option>
                  <option value="salary_low">Salary (Low to High)</option>
                  <option value="experience_low">Experience (Low to High)</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Listings cards grid */}
        <div className="flex flex-col gap-5">
  {paginatedJobs.map(job => {
    const company = COMPANIES.find(c => c.id === job.companyId);
    const isSaved = savedJobIds.includes(job.id);

    return (
      <JobCard
        key={job.id}
        job={job}
        company={company}
        isSaved={isSaved}
        onToggleSave={() => onToggleSaveJob(job.id)}
        onSelect={() => onSelectJob(job)}
        onApply={() => onApplyJob(job)}
      />
    );
  })}
</div>

          {/* Empty fallback state */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl p-6">
              <div className="h-14 w-14 rounded-full bg-gray-50 text-gray-300 flex items-center justify-center mx-auto mb-4 border">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-extrabold text-sp-navy mb-1.5">No Matching Opportunities Sourced</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mb-5 leading-normal font-medium">
                Try expanding your experience slider thresholds, switching job categories, or unselecting niche location checkboxes.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-sp-green hover:bg-opacity-90 text-white rounded-lg text-xs font-bold transition-all shadow-sm shadow-sp-green/20"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-sp-navy hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-xs font-extrabold flex items-center justify-center border transition-all ${
                    currentPage === page
                      ? 'bg-sp-green border-sp-green text-white shadow-sm'
                      : 'bg-white border-gray-200 text-sp-navy hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-sp-navy hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
