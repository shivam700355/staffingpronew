// Profile Completeness Helpers for Seeker & Recruiter

export interface SeekerProfile {
  resumeName: string;
  bioText: string;
  skillsList: string[];
  phone: string;
  fullName: string;
  email: string;
}

export interface EmployerProfile {
  companyName: string;
  deptName: string;
  industry: string;
  hqAddress: string;
  corpSize: string;
  website: string;
  email: string;
}

const DEFAULT_SEEKER_PROFILE: SeekerProfile = {
  resumeName: 'Siddharth_Malhotra_Resume.pdf',
  bioText: 'Experienced software specialist focusing on high-performance web applications, React scaling, and microservices architecture.',
  skillsList: ['React.js', 'TypeScript', 'Node.js', 'System Design'],
  phone: '+91 98765 43210',
  fullName: '',
  email: ''
};

const DEFAULT_EMPLOYER_PROFILE: EmployerProfile = {
  companyName: 'Infosys Technologies Ltd',
  deptName: 'Infosys Talent Acquisition Team',
  industry: 'Information Technology',
  hqAddress: 'Electronic City, Bengaluru',
  corpSize: '10000+ Employees',
  website: 'https://www.infosys.com',
  email: ''
};

export function getSeekerProfile(userEmail: string = 'guest'): SeekerProfile {
  const key = `profile_seeker_${userEmail}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SEEKER_PROFILE, ...parsed, email: userEmail };
    } catch {
      // Fallback
    }
  }
  
  // Try loading default with current user email populated
  const defaultProfile = { ...DEFAULT_SEEKER_PROFILE, email: userEmail };
  const userObj = localStorage.getItem('st_current_user');
  if (userObj) {
    try {
      const parsedUser = JSON.parse(userObj);
      if (parsedUser.email === userEmail) {
        defaultProfile.fullName = parsedUser.name || '';
      }
    } catch {}
  }
  return defaultProfile;
}

export function saveSeekerProfile(userEmail: string, profile: SeekerProfile): void {
  const key = `profile_seeker_${userEmail}`;
  localStorage.setItem(key, JSON.stringify(profile));
}

export function calculateSeekerCompleteness(profile: SeekerProfile): number {
  let score = 0;
  
  // 1. Full name & Email verification from signup/login: 20%
  if (profile.fullName.trim() && profile.email.trim()) {
    score += 20;
  }
  
  // 2. Uploaded Resume CV file check: 30%
  if (profile.resumeName && profile.resumeName.trim().length > 0 && profile.resumeName !== 'No Document Uploaded') {
    score += 30;
  }
  
  // 3. Bio summary details statement: 25% (requires at least 15 chars to be valid)
  if (profile.bioText && profile.bioText.trim().length >= 15) {
    score += 25;
  }
  
  // 4. Skills checklist requirement: 25% (requires at least 3 skills)
  if (profile.skillsList && profile.skillsList.length >= 3) {
    score += 25;
  } else if (profile.skillsList && profile.skillsList.length > 0) {
    score += 15; // partial score
  }
  
  return score;
}

export function getEmployerProfile(userEmail: string = 'guest'): EmployerProfile {
  const key = `profile_employer_${userEmail}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_EMPLOYER_PROFILE, ...parsed, email: userEmail };
    } catch {
      // Fallback
    }
  }
  
  const defaultProfile = { ...DEFAULT_EMPLOYER_PROFILE, email: userEmail };
  const userObj = localStorage.getItem('st_current_user');
  if (userObj) {
    try {
      const parsedUser = JSON.parse(userObj);
      if (parsedUser.email === userEmail) {
        defaultProfile.companyName = parsedUser.name || DEFAULT_EMPLOYER_PROFILE.companyName;
      }
    } catch {}
  }
  return defaultProfile;
}

export function saveEmployerProfile(userEmail: string, profile: EmployerProfile): void {
  const key = `profile_employer_${userEmail}`;
  localStorage.setItem(key, JSON.stringify(profile));
}

export function calculateEmployerCompleteness(profile: EmployerProfile): number {
  let score = 0;
  
  // 1. Company Name & Contact Email verification: 20%
  if (profile.companyName.trim() && profile.email.trim()) {
    score += 20;
  }
  
  // 2. Department name specified: 20%
  if (profile.deptName && profile.deptName.trim().length >= 4) {
    score += 20;
  }
  
  // 3. Industry classification set: 20%
  if (profile.industry && profile.industry.trim().length >= 3) {
    score += 20;
  }
  
  // 4. Headquarters/Location specified: 20%
  if (profile.hqAddress && profile.hqAddress.trim().length >= 4) {
    score += 20;
  }
  
  // 5. Corporate Size & Website specified: 20%
  if (profile.corpSize && profile.website && profile.website.trim().length >= 8) {
    score += 20;
  }
  
  return score;
}
