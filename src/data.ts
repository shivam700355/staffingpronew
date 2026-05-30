import { Job, Company, Candidate, Category } from './types';

export const COMPANIES: Company[] = [
  {
    id: 'comp_tcs',
    name: 'TCS (Tata Consultancy Services)',
    logoColor: 'from-blue-600 to-indigo-700',
    industry: 'Information Technology',
    size: '500,000+ Employees',
    rating: 4.1,
    website: 'https://www.tcs.com',
    founded: '1968',
    location: 'Mumbai, Maharashtra',
    description: 'A purpose-led organization that is building a meaningful future through innovation, technology, and collective knowledge.'
  },
  {
    id: 'comp_infosys',
    name: 'Infosys',
    logoColor: 'from-sky-500 to-blue-600',
    industry: 'Information Technology',
    size: '300,000+ Employees',
    rating: 4.2,
    website: 'https://www.infosys.com',
    founded: '1981',
    location: 'Bengaluru, Karnataka',
    description: 'A global leader in next-generation digital services and consulting, enabling clients in 50+ countries to navigate their digital transformation.'
  },
  {
    id: 'comp_wipro',
    name: 'Wipro',
    logoColor: 'from-purple-500 to-indigo-600',
    industry: 'Information Technology',
    size: '250,000+ Employees',
    rating: 3.9,
    website: 'https://www.wipro.com',
    founded: '1945',
    location: 'Bengaluru, Karnataka',
    description: 'A leading global information technology, consulting, and business process services company.'
  },
  {
    id: 'comp_zomato',
    name: 'Zomato',
    logoColor: 'from-red-500 to-rose-600',
    industry: 'Food Delivery & Tech',
    size: '5,000+ Employees',
    rating: 4.4,
    website: 'https://www.zomato.com',
    founded: '2008',
    location: 'Gurgaon, Haryana',
    description: 'Connecting customers, restaurant partners, and delivery partners while serving high-quality food delivery and dining options.'
  },
  {
    id: 'comp_swiggy',
    name: 'Swiggy',
    logoColor: 'from-orange-500 to-amber-600',
    industry: 'On-demand Delivery & Tech',
    size: '8,000+ Employees',
    rating: 4.3,
    website: 'https://www.swiggy.com',
    founded: '2014',
    location: 'Bengaluru, Karnataka',
    description: 'An Indian on-demand convenience platform, operating with tech-first logistics to power food, instamart grocery, and parcel delivery services.'
  }
];

export const CATEGORIES: Category[] = [
  { id: 'cat_it', name: 'Software & IT', iconName: 'laptop', jobsCount: 145 },
  { id: 'cat_finance', name: 'Finance & Accounting', iconName: 'dollar', jobsCount: 68 },
  { id: 'cat_healthcare', name: 'Healthcare / Medical', iconName: 'heart', jobsCount: 94 },
  { id: 'cat_sales', name: 'Sales & Marketing', iconName: 'trending-up', jobsCount: 110 },
  { id: 'cat_hr', name: 'Human Resources', iconName: 'users', jobsCount: 42 },
  { id: 'cat_support', name: 'Customer Support', iconName: 'headphone', jobsCount: 55 },
  { id: 'cat_eng', name: 'Engineering & Operations', iconName: 'gear', jobsCount: 79 },
  { id: 'cat_education', name: 'Education & Training', iconName: 'book', jobsCount: 36 },
  { id: 'cat_logistics', name: 'Logistics & Supply Chain', iconName: 'truck', jobsCount: 48 },
  { id: 'cat_design', name: 'UI/UX Design & Creative', iconName: 'pen', jobsCount: 63 }
];

export const CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Noida',
  'Gurgaon',
  'Kolkata',
  'Ahmedabad'
];

export const JOBS: Job[] = [
  {
    id: 'job_1',
    title: 'Software Developer (Full-Stack)',
    companyId: 'comp_infosys',
    category: 'Software & IT',
    city: 'Bengaluru',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    minSalary: 800000,
    maxSalary: 1500000,
    minExperience: 2,
    maxExperience: 5,
    openings: 5,
    description: 'We are seeking an experienced Full-Stack Software Developer to design, develop, and maintain our high-performance next-generation software solutions.',
    responsibilities: [
      'Develp and maintain modern, responsive web applications using React.js and Node.js.',
      'Collaborate with product designers and business analysts to translate specs into robust code.',
      'Optimize database queries and structure for robust performance in cloud containers.',
      'Perform peer code reviews and write thorough unit and integration tests.'
    ],
    requirements: [
      'B.Tech/M.Tech in Computer Science or a comparable technical field.',
      'Strong proficiency in JavaScript, TypeScript, React.js, and Node.js / Express.',
      'Familiarity with cloud-native frameworks (AWS or Azure) and database systems.',
      'Exceptional problem-solving skills and clean coding discipline.'
    ],
    skills: ['React.js', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Express'],
    education: "Bachelor's or Master's Degree in Computer Science",
    postedDaysAgo: 2,
    isFeatured: true,
    isUrgent: true
  },
  {
    id: 'job_2',
    title: 'Data Scientist (Machine Learning)',
    companyId: 'comp_tcs',
    category: 'Software & IT',
    city: 'Mumbai',
    jobType: 'Full-time',
    workMode: 'Onsite',
    minSalary: 1200000,
    maxSalary: 2400000,
    minExperience: 3,
    maxExperience: 7,
    openings: 2,
    description: 'We are building scalable AI products for global enterprise clients and require talented ML engineers with rigorous mathematical backgrounds.',
    responsibilities: [
      'Design, train, and deploy machine learning models on massive industrial datasets.',
      'Interface with subject matter experts to design actionable telemetry insights.',
      'Scale model inference routines using Docker and Kubernetes clusters.',
      'Maintain automated data cleaning pipelines and model validation tests.'
    ],
    requirements: [
      'Masters or Ph.D in Quantitative Field (Mathematics, Statistics, Computer Science).',
      'Extensive hands-on Python experience (Pandas, PyTorch, Scikit-Learn).',
      'Solid foundations in linear algebra, regression theory, and neural network routing.',
      'Familiarity with SQL databases and distributed tools like PySpark.'
    ],
    skills: ['Python', 'PyTorch', 'Sklearn', 'SQL', 'Kubernetes', 'Pandas'],
    education: 'M.Sc or Ph.D in Quantitative Science',
    postedDaysAgo: 1,
    isFeatured: true
  },
  {
    id: 'job_3',
    title: 'Anesthesiologist (Senior Consultant)',
    companyId: 'comp_wipro', // representing client portal
    category: 'Healthcare / Medical',
    city: 'Delhi',
    jobType: 'Full-time',
    workMode: 'Onsite',
    minSalary: 2000000,
    maxSalary: 3500000,
    minExperience: 6,
    maxExperience: 10,
    openings: 3,
    description: 'A leading multi-speciality hospital affiliated with our premier networks requires an experienced Anesthesiologist to head operational anesthesia theatres.',
    responsibilities: [
      'Administer anesthesia and monitor patient vital diagnostics during surgical routines.',
      'Perform detailed pre-operative assessments and custom post-operative pain-management plans.',
      'Oversee clinical resident technicians and nurses in emergency wards.',
      'Maintain rigid adherence to public safety certifications and hospital guidelines.'
    ],
    requirements: [
      'MD or DNB in Anesthesiology from an MCI recognized institution.',
      '6+ years of post-MD clinical experience in critical operation theatres.',
      'Sound experience in cardiac and pediatric specialty setups.',
      'Calm temperament under operational pressure with excellent teamwork skills.'
    ],
    skills: ['Critical Care', 'Operating Theatre Procedures', 'Diagnostics Monitoring', 'Emergency Response'],
    education: 'MD / DNB in Anesthesiology',
    postedDaysAgo: 5,
    isUrgent: true
  },
  {
    id: 'job_4',
    title: 'Software Engineer (Frontend)',
    companyId: 'comp_zomato',
    category: 'Software & IT',
    city: 'Gurgaon',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    minSalary: 1000000,
    maxSalary: 1800000,
    minExperience: 1,
    maxExperience: 4,
    openings: 4,
    description: 'We are updating our consumer ordering portals and seek creative frontend developers who love designing fast-loading mobile-first platforms.',
    responsibilities: [
      'Build snappy, pixel-perfect UI screens that respond smoothly across all mobile devices.',
      'Incorporate micro-animations and custom transitions using Tailwind CSS and Motion.',
      'Optimize bundle weights and track rendering efficiency.',
      'Work alongside food delivery product designers to refine UX flow structures.'
    ],
    requirements: [
      'HTML/CSS/JS expertise with 2+ years of React development industry practice.',
      'Strong command over Tailwind, CSS-variables, and flexbox/grid layout architectures.',
      'Familiarity with state-management systems like Redux or React Context.',
      'Obsessive attention to detailed typography alignments and responsive offsets.'
    ],
    skills: ['React.js', 'Tailwind CSS', 'Redux', 'JavaScript', 'HTML5 & CSS3', 'Git'],
    education: 'Bachelor of Computer Applications or B.Tech',
    postedDaysAgo: 3,
    isFeatured: true
  },
  {
    id: 'job_5',
    title: 'Financial Manager (Corporate Finance)',
    companyId: 'comp_tcs',
    category: 'Finance & Accounting',
    city: 'Hyderabad',
    jobType: 'Full-time',
    workMode: 'Onsite',
    minSalary: 1500000,
    maxSalary: 2600000,
    minExperience: 5,
    maxExperience: 9,
    openings: 1,
    description: 'Direct our primary corporate accounting teams, ensuring high-accuracy auditing and modeling for international operational segments.',
    responsibilities: [
      'Direct monthly finance auditing schedules and deliver consolidated books to executives.',
      'Build long-term budget modeling, forecast cash flows, and formulate risk control indexes.',
      'Deliver thorough compliance records aligned with current Indian tax acts and regulatory authorities.',
      'Assess corporate mergers and portfolio options for capital optimization.'
    ],
    requirements: [
      'Chartered Accountant (CA) or MBA in Finance from a top school.',
      '5+ years experience in multi-currency auditing, preferably within major accounting firms.',
      'Proficient management skills with an analytical mindset.',
      'Highly skilled in SAP Finance and advanced Microsoft Excel tools.'
    ],
    skills: ['Chartered Accountant (CA)', 'Financial Auditing', 'Risk Assessment', 'SAP ERP', 'Excel Modeling'],
    education: 'Chartered Accountant (CA) / MBA Finance',
    postedDaysAgo: 6
  },
  {
    id: 'job_6',
    title: 'Surgeon (General Surgery Consultant)',
    companyId: 'comp_wipro', // for partner healthcare networks
    category: 'Healthcare / Medical',
    city: 'Bengaluru',
    jobType: 'Full-time',
    workMode: 'Onsite',
    minSalary: 2500000,
    maxSalary: 4500000,
    minExperience: 5,
    maxExperience: 12,
    openings: 2,
    description: 'We are on-boarding seasoned Clinical Surgeons to handle routine, laparoscopic, and intensive critical operations within our modern trauma institute.',
    responsibilities: [
      'Execute minor and major standard surgeries, prioritizing laparoscopic methods.',
      'Conduct daily patient rounds post-operation to manage recovery progress.',
      'Provide specialized consultation inside clinical OPD chambers.',
      'Train and supervise junior surgical residents and medical interns.'
    ],
    requirements: [
      'MS (General Surgery) or DNB in General Surgery.',
      'Strong record of successful surgeries and post-operative follow-up management.',
      'Familiarity with state-of-the-art robotic-assisted surgery tooling is helpful.',
      'Compassionate demeanor with high ethical standards.'
    ],
    skills: ['General Surgery', 'Laparoscopy', 'Trauma Care consultancy', 'OPD consultation'],
    education: 'MS or DNB in General Surgery',
    postedDaysAgo: 4,
    isFeatured: true
  },
  {
    id: 'job_7',
    title: 'Operations Director',
    companyId: 'comp_swiggy',
    category: 'Logistics & Supply Chain',
    city: 'Pune',
    jobType: 'Full-time',
    workMode: 'Onsite',
    minSalary: 1800000,
    maxSalary: 3000000,
    minExperience: 7,
    maxExperience: 12,
    openings: 1,
    description: 'Manage full on-the-ground dark store networks and coordinate local delivery fleets to maintain outstanding delivery speeds while optimizing costs.',
    responsibilities: [
      'Optimize daily dark store order picking, inventory flow, and packing times.',
      'Analyze localized delivery logs, pinpoint routing blocks, and manage partner incentives.',
      'Formulate cost-reduction goals and lead micro-logistics experiments.',
      'Liaise with merchant directors and brand partner accounts.'
    ],
    requirements: [
      'MBA or Masters in Supply Chain Management from NITIE/IIMs or comparable schools.',
      '7+ years experience in e-commerce or fast-moving logistics operations.',
      'Analytical depth with advanced mastery of Python or SQL query tools for telemetry investigation.',
      'Pragmatic leadership skills to coordinate mass field operatives.'
    ],
    skills: ['Logistics', 'Supply Chain Optimization', 'Fleet Management', 'Inventory Auditing', 'SQL'],
    education: 'MBA / Master in Supply Chain Systems',
    postedDaysAgo: 8
  },
  {
    id: 'job_8',
    title: 'Senior Human Resources Specialist',
    companyId: 'comp_tcs',
    category: 'Human Resources',
    city: 'Noida',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    minSalary: 700000,
    maxSalary: 1200000,
    minExperience: 3,
    maxExperience: 6,
    openings: 2,
    description: 'We are seeking an HR Specialist who is passionate about talent development, modern workplace programs, and high-quality onboarding practices.',
    responsibilities: [
      'Enact talent branding agendas, host recruitment drives, and interview prospects.',
      'Moderate cultural engagements, lead feedback audits, and resolve employee concerns.',
      'Administer the annual appraisal cycle in tandem with leadership directives.',
      'Maintain organizational databases and assist in payroll audits.'
    ],
    requirements: [
      'MBA in Human Resources or related social sciences.',
      '3+ years experience as an HR Generalist or Talent Partner in software organizations.',
      'Exceptional spoken and written English presentation skills.',
      'Deep understanding of general Indian labor policies and compliance laws.'
    ],
    skills: ['Talent Sourcing', 'Employee Engagement', 'Labor Law compliance', 'Conflict Resolution', 'HRIS systems'],
    education: 'MBA in Human Resource Management',
    postedDaysAgo: 10
  },
  {
    id: 'job_9',
    title: 'Creative UI/UX Designer',
    companyId: 'comp_swiggy',
    category: 'UI/UX Design & Creative',
    city: 'Bengaluru',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    minSalary: 900000,
    maxSalary: 1600000,
    minExperience: 2,
    maxExperience: 5,
    openings: 1,
    description: 'Reimagine our interface experience layouts. We require a visually sharp designer who produces modern wireframes, interactive testing flows, and beautiful illustrations.',
    responsibilities: [
      'Map full user journeys and construct wireframes and interactive high-fidelity mockups in Figma.',
      'Conduct frequent usability research to discover user pain-points.',
      'Liaise with engineering to ensure layouts are correctly translated into Tailwind UI components.',
      'Build custom vector illustrations and interactive UI animation models.'
    ],
    requirements: [
      'An outstanding online portfolio containing multiple real-world product screens.',
      '2+ years working as a UI & UX designer in design studios or tech corporations.',
      'Expertise in Figma, Adobe Creative Suite, and high-fidelity prototyping tools.',
      'Sound appreciation of frontend engineering frameworks and design systems.'
    ],
    skills: ['Figma', 'UI Design', 'Wireframing', 'Prototyping', 'User Research', 'Adobe Illustrator'],
    education: 'Degree in Product Design, Fine Arts, or related experience',
    postedDaysAgo: 11
  },
  {
    id: 'job_10',
    title: 'Psychiatrist (Clinical Specialist)',
    companyId: 'comp_wipro', // health tech partners
    category: 'Healthcare / Medical',
    city: 'Pune',
    jobType: 'Part-time',
    workMode: 'Hybrid',
    minSalary: 1400000,
    maxSalary: 2200000,
    minExperience: 4,
    maxExperience: 8,
    openings: 2,
    description: 'A growing digital wellness hub and connected clinical network seeks a certified Psychiatrist to provide quality consultation and diagnostic programs.',
    responsibilities: [
      'Deliver psychological examinations, diagnostic reviews, and custom therapeutic plans.',
      'Conduct online and in-person patient assessments and prescribe medication therapies.',
      'Conduct workshops addressing occupational stress management and healthy habits.',
      'Oversee clinical logs securely complying with data-confidentiality guidelines.'
    ],
    requirements: [
      'MD in Psychiatry or Diploma in Psychological Medicine (DPM).',
      'Valid medical license and clinical registration to practice.',
      'Familiarity with telemedicine procedures and scheduling structures.',
      'High empathy, outstanding active-listening capacities.'
    ],
    skills: ['Clinical Psychiatry', 'Psychotherapy', 'Telehealth Systems', 'Medication Management'],
    education: 'MD / Diploma in Psychological Medicine',
    postedDaysAgo: 12
  }
];

export const CANDIDATES: Candidate[] = [
  {
    id: 'cand_1',
    fullName: 'Rahul Sharma',
    title: 'Senior Software Architect',
    avatarColor: 'bg-emerald-100 text-emerald-800',
    topSkills: ['React.js', 'Node.js', 'AWS', 'System Design'],
    city: 'Bengaluru',
    experienceYears: 8,
    successStory: 'StaffingPro connected me to a high-scale startup where I now lead a team of 15 frontend engineers developing smart logistics modules.'
  },
  {
    id: 'cand_2',
    fullName: 'Ananya Mehra',
    title: 'Lead UI/UX Designer',
    avatarColor: 'bg-violet-100 text-violet-800',
    topSkills: ['Figma', 'Prototyping', 'User Research', 'Tailwind'],
    city: 'Mumbai',
    experienceYears: 5,
    successStory: 'Through StaffingPro, I uploaded my design portfolio and was directly contacted by a premier foodtech developer within 48 hours for an onsite interview!'
  },
  {
    id: 'cand_3',
    fullName: 'Aditya Sen',
    title: 'Senior ML Engineer',
    avatarColor: 'bg-indigo-100 text-indigo-800',
    topSkills: ['Python', 'PyTorch', 'Sklearn', 'Kubernetes'],
    city: 'Gurgaon',
    experienceYears: 6,
    successStory: 'Secured a strategic AI role matching my academic background exactly. The recruitment filter was incredibly precise.'
  },
  {
    id: 'cand_4',
    fullName: 'Priya Patel',
    title: 'Pediatric Care Specialist',
    avatarColor: 'bg-pink-100 text-pink-800',
    topSkills: ['Healthcare', 'Clinical Medicine', 'Diagnostics'],
    city: 'Pune',
    experienceYears: 4,
    successStory: 'The dedicated healthcare filters on StaffingPro helped me bypass corporate agencies and apply directly to hospitals.'
  },
  {
    id: 'cand_5',
    fullName: 'Vikram Grover',
    title: 'Financial Controller',
    avatarColor: 'bg-sky-100 text-sky-800',
    topSkills: ['Excel Modeling', 'Corporate Taxation', 'Auditing'],
    city: 'Hyderabad',
    experienceYears: 7,
    successStory: 'Found an enterprise-level financial controller position that offered full remote flexibility and competitive compensation.'
  },
  {
    id: 'cand_6',
    fullName: 'Nisha Hegde',
    title: 'HR Business Partner',
    avatarColor: 'bg-amber-100 text-amber-800',
    topSkills: ['Talent Brand', 'Employee Relations', 'HRIS Systems'],
    city: 'Delhi',
    experienceYears: 5,
    successStory: 'Transitioned from a small agency into a multinational leader through an effortless resume matchmaking flow.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test_1',
    name: 'Sandeep Krishnan',
    role: 'Director of Talent Acquisition, Infosys',
    text: 'StaffingPro streamlined our lateral hiring lifecycle. Under 10 days, we successfully filled three niche critical software positions with certified talent.',
    rating: 5,
    avatar: 'SK'
  },
  {
    id: 'test_2',
    name: 'Deepika Roy',
    role: 'HR Business Partner, Swiggy',
    text: 'The UI/UX designer and software candidates sourced directly through this platform are highly qualified, active, and perfectly prepared for standard test tasks.',
    rating: 5,
    avatar: 'DR'
  },
  {
    id: 'test_3',
    name: 'Gaurav Mehta',
    role: 'Candidate (Senior Backend Engineer)',
    text: 'I love how clean the Job Details screen looks! Uploading my resume took 5 seconds, and the cover letter feedback process is exceptionally intuitive.',
    rating: 5,
    avatar: 'GM'
  }
];
