import React, { useEffect, useState } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { JOBS } from "../data";
import { getCities, getJobTitles } from "../api";
import RightImage from "../../assets/hero.png";

interface CityOption {
  id: number;
  name: string;
  state: string;
  is_metro: boolean;
  status: string;
}

interface HeroSectionProps {
  onSearch: (keyword: string, city: string) => void;
  setCurrentPage: (page: string) => void;
}

export default function HeroSection({
  onSearch,
  setCurrentPage,
}: HeroSectionProps) {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [cityLoadError, setCityLoadError] = useState<string | null>(null);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [isLoadingJobTitles, setIsLoadingJobTitles] = useState(false);
  const [jobTitlesError, setJobTitlesError] = useState<string | null>(null);

  // Suggestions derived from live API titles or fallback titles
  const availableJobTitles =
    jobTitles.length > 0
      ? jobTitles
      : Array.from(new Set(JOBS.map((j) => j.title)));

  const titleSuggestions = availableJobTitles
    .filter((title) => title.toLowerCase().includes(keyword.toLowerCase()))
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

  useEffect(() => {
    async function loadCities() {
      setIsLoadingCities(true);
      setCityLoadError(null);
      try {
        const response = await getCities();
        if (response && response.data && Array.isArray(response.data)) {
          setCities(response.data);
        } else {
          setCityLoadError("Unable to load cities.");
        }
      } catch (error) {
        setCityLoadError("Unable to load cities.");
        console.error("HeroSection getCities error:", error);
      } finally {
        setIsLoadingCities(false);
      }
    }

    loadCities();

    async function loadJobTitles() {
      setIsLoadingJobTitles(true);
      setJobTitlesError(null);
      try {
        const response = await getJobTitles();
        if (response && response.data && Array.isArray(response.data)) {
          setJobTitles(response.data);
        } else {
          setJobTitlesError("Unable to load job titles.");
        }
      } catch (error) {
        setJobTitlesError("Unable to load job titles.");
        console.error("HeroSection getJobTitles error:", error);
      } finally {
        setIsLoadingJobTitles(false);
      }
    }

    loadJobTitles();
  }, []);

  const trendSuggestions = [
    { label: "Developer", value: "Developer" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Finance", value: "Finance" },
    { label: "UI/UX Designer", value: "Designer" },
    { label: "Manager", value: "Manager" },
  ];

  return (
    <section
      className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-gray-100"
      id="portal-hero-section"
    >
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
              Discover verified opportunities inside premium tech-clusters,
              healthcare networks, corporate giants, and fast-growing Indian
              unicorns like Zomato and Swiggy.
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
                  {showSuggestions &&
                    keyword &&
                    titleSuggestions.length > 0 && (
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
                      onClick={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
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
                    {isLoadingCities && (
                      <option disabled>Loading cities...</option>
                    )}
                    {cityLoadError && (
                      <option disabled>Error loading cities</option>
                    )}
                    {cities.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
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
                  {tag.label}
                  {idx < trendSuggestions.length - 1 ? "," : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: gorgeous CSS illustration matching image */}
          <div className="lg:col-span-5 relative flex justify-center py-4">
            <div className="w-full max-w-[420px] relative">
              <img
                src={RightImage}
                alt="StaffingPro Job Placement"
                className="w-full h-auto "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
