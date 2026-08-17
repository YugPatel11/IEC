// ========== Core Entity Types ==========

export interface Startup {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  description: string;
  problem: string;
  solution: string;
  founder_name: string;
  department: string;
  industry: string;
  stage: StartupStage;
  year: number;
  support_received: string;
  current_status: string;
  impact?: string;
  external_url?: string;
  founder_type: FounderType;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type StartupStage = 'Idea' | 'Prototype' | 'MVP' | 'Early Stage' | 'Growth' | 'Scaling';
export type FounderType = 'Student' | 'Faculty' | 'Alumni' | 'External';

export interface IprRecord {
  id: number;
  title: string;
  applicant_name: string;
  department: string;
  ipr_type: IprType;
  year: number;
  status: IprStatus;
  description?: string;
  is_published: boolean;
  created_at: string;
}

export type IprType = 'Patent' | 'Copyright' | 'Trademark' | 'Industrial Design';
export type IprStatus = 'Filed' | 'Published' | 'Granted' | 'Rejected' | 'Pending';

export interface Mentor {
  id: number;
  name: string;
  photo_url?: string;
  designation: string;
  organization: string;
  expertise: string[];
  bio: string;
  domain: MentorDomain;
  is_available: boolean;
  is_published: boolean;
  created_at: string;
}

export type MentorDomain = 'Entrepreneurship' | 'Technology' | 'Product' | 'Finance' | 'Marketing' | 'Legal' | 'IPR' | 'Industry' | 'Investment';

export interface Program {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  eligibility: string;
  registration_status: RegistrationStatus;
  registration_link?: string;
  image_url?: string;
  outcome?: string;
  status: ContentStatus;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: EventCategory;
  registration_status: RegistrationStatus;
  registration_link?: string;
  photo_urls?: string[];
  report_url?: string;
  status: ContentStatus;
  created_at: string;
}

export type EventCategory = 'Workshop' | 'Hackathon' | 'Competition' | 'Seminar' | 'Founder Talk' | 'Investor Session' | 'IPR Session' | 'Startup Event';
export type RegistrationStatus = 'Open' | 'Closed' | 'Coming Soon';
export type ContentStatus = 'Draft' | 'Published' | 'Archived';

export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  category: OpportunityCategory;
  deadline: string;
  eligibility: string;
  description: string;
  external_link?: string;
  status: 'Open' | 'Closed';
  created_at: string;
}

export type OpportunityCategory = 'Funding' | 'Government Schemes' | 'Hackathons' | 'Competitions' | 'Incubation' | 'Fellowships' | 'Internships' | 'Startup Challenges' | 'IPR' | 'Investor Opportunities';

export interface Partner {
  id: number;
  name: string;
  logo_url?: string;
  category: PartnerCategory;
  description: string;
  website?: string;
  is_published: boolean;
  created_at: string;
}

export type PartnerCategory = 'Government' | 'Industry' | 'Incubators' | 'Investors' | 'Academic Institutions' | 'Alumni' | 'Technology Partners' | 'Startup Ecosystem';

export interface SuccessStory {
  id: number;
  title: string;
  problem: string;
  idea: string;
  solution: string;
  founder_name: string;
  team?: string;
  ppsu_support: string;
  development_journey: string;
  current_stage: string;
  impact: string;
  photo_url?: string;
  startup_id?: number;
  status: ContentStatus;
  created_at: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: ResourceCategory;
  file_url?: string;
  external_url?: string;
  file_type?: string;
  status: ContentStatus;
  created_at: string;
}

export type ResourceCategory = 'Startup Guide' | 'IPR Guide' | 'Government Schemes' | 'Funding Resources' | 'Templates' | 'Policies' | 'Reports' | 'FAQs';

export interface ImpactMetrics {
  id: number;
  startups_supported: number;
  ipr_supported: number;
  students_reached: number;
  mentoring_sessions: number;
  programs_conducted: number;
  funding_supported: string;
  industry_partners: number;
  mentors: number;
  updated_at: string;
}

// ========== Form/Submission Types ==========

export interface IdeaSubmission {
  name: string;
  email: string;
  mobile: string;
  user_type: 'Student' | 'Faculty' | 'Alumni' | 'Entrepreneur';
  department: string;
  idea_title: string;
  problem: string;
  proposed_solution: string;
  current_stage: string;
  team_members?: string;
  document_url?: string;
}

export interface IdeaRecord extends IdeaSubmission {
  id: number;
  status: IdeaStatus;
  created_at: string;
  updated_at: string;
}

export type IdeaStatus = 'Submitted' | 'Under Review' | 'Mentor Assigned' | 'Prototype' | 'IPR / Startup' | 'Closed';

export interface IncubationApplication {
  founder_name: string;
  team_info: string;
  startup_name: string;
  problem: string;
  solution: string;
  target_users: string;
  business_model: string;
  current_stage: string;
  prototype_status: string;
  ipr_status: string;
  funding_status: string;
  pitch_deck_url?: string;
  email: string;
  phone: string;
}

export interface IncubationRecord extends IncubationApplication {
  id: number;
  status: IncubationStatus;
  created_at: string;
  updated_at: string;
}

export type IncubationStatus = 'Submitted' | 'Screening' | 'Evaluation' | 'Interview' | 'Selected' | 'Rejected' | 'Incubation' | 'Completed';

export interface IprRequest {
  applicant_name: string;
  department: string;
  ipr_type: IprType;
  title: string;
  description: string;
  existing_disclosure: string;
  document_url?: string;
  email: string;
  phone: string;
}

export interface IprRequestRecord extends IprRequest {
  id: number;
  status: IprRequestStatus;
  created_at: string;
  updated_at: string;
}

export type IprRequestStatus = 'Submitted' | 'Initial Review' | 'Expert Review' | 'Filing Support' | 'Completed' | 'Rejected';

export interface MentorRequest {
  name: string;
  email: string;
  area_of_help: string;
  startup_stage: string;
  problem: string;
  preferred_domain: MentorDomain;
  availability: string;
}

export interface MentorRequestRecord extends MentorRequest {
  id: number;
  status: MentorRequestStatus;
  assigned_mentor_id?: number;
  created_at: string;
  updated_at: string;
}

export type MentorRequestStatus = 'Submitted' | 'Review' | 'Mentor Matched' | 'Session Scheduled' | 'Completed';

export interface PartnershipRequest {
  name: string;
  organization: string;
  email: string;
  phone: string;
  org_type: 'Industry' | 'Investor' | 'Government' | 'Academic' | 'Incubator' | 'Startup Ecosystem' | 'Other';
  partnership_area: string;
  message: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  user_type: string;
  subject: string;
  message: string;
}

// ========== API Response Types ==========

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ========== Auth Types ==========

export interface AdminUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthState {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
}
