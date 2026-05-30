export interface Job {
  id: string;
  title: string;
  companyId: string;
  category: string;
  city: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
  workMode: 'Onsite' | 'Remote' | 'Hybrid';
  minSalary: number;
  maxSalary: number;
  minExperience: number; // in years
  maxExperience: number;
  openings: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  education: string;
  postedDaysAgo: number;
  isFeatured?: boolean;
  isUrgent?: boolean;
  publisherEmail?: string;
}

export interface Company {
  id: string;
  name: string;
  logoColor: string; // Tailwind color or hex
  industry: string;
  size: string;
  rating: number;
  website: string;
  founded: string;
  location: string;
  description: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  title: string;
  avatarColor: string;
  topSkills: string[];
  city: string;
  experienceYears: number;
  successStory?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  jobsCount: number;
}

export interface JobFilters {
  search: string;
  location: string;
  categories: string[];
  jobTypes: string[];
  workModes: string[];
  experienceMax: number;
  minSalary: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeName: string;
  appliedDate: string;
}
