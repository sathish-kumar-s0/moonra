export type Role = 'SUPER_ADMIN' | 'ADMIN';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'MANUAL_REVIEW';

export type RegistrationStatus = 'SUBMITTED' | 'VERIFIED' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  mode: string;
  fee: number; // in INR (stored as integer)
  curriculum: string[];
  thumbnail_url: string;
  banner_url?: string;
  is_published: boolean;
  featured: boolean;
  learning_outcomes?: string[];
  eligibility?: string;
  admission_open?: boolean;
  created_at: string;
}

export interface CourseRegistration {
  id: string;
  registration_number: string;
  course_id: string;
  course_title: string;
  full_name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  current_status: 'College Student' | 'Working Professional' | 'Aspiring Filmmaker' | 'Independent Filmmaker' | 'Other';
  filmmaking_interest: 'Yes' | 'No' | 'Exploring';
  project_experience: 'Yes' | 'No';
  interested_areas: string[];
  registration_fee: number;
  payment_method: 'RAZORPAY' | 'UPI_MANUAL' | 'BANK_TRANSFER';
  transaction_id?: string;
  payment_screenshot_url?: string;
  payment_status: PaymentStatus;
  registration_status: RegistrationStatus;
  created_at: string;
  notes?: string;
}

export interface Workshop {
  id: string;
  title: string;
  slug: string;
  mentor_name: string;
  mentor_id?: string;
  mentor_bio?: string;
  description: string;
  month: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue_or_online_details: string;
  fee: number;
  seat_capacity: number;
  booked_seats: number;
  registration_deadline: string;
  banner_url: string;
  is_published: boolean;
  created_at: string;
}

export interface WorkshopRegistration {
  id: string;
  registration_number: string;
  workshop_id: string;
  workshop_title: string;
  participant_name: string;
  age: number;
  area: string;
  whatsapp: string;
  email: string;
  industry_relationship: 'Student' | 'Aspiring Filmmaker' | 'Working Professional' | 'Cinema Technician' | 'Independent Filmmaker' | 'Other';
  payment_status: PaymentStatus;
  registration_status: RegistrationStatus;
  amount_paid: number;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  ticket_generated: boolean;
  ticket_id?: string;
  created_at: string;
}

export interface WorkshopTicket {
  id: string;
  ticket_number: string;
  workshop_registration_id: string;
  workshop_id: string;
  workshop_title: string;
  participant_name: string;
  participant_email: string;
  participant_phone: string;
  mentor_name: string;
  event_date: string;
  start_time: string;
  venue: string;
  amount_paid: number;
  qr_token: string;
  verification_url: string;
  pdf_url?: string;
  delivery_status: 'PENDING' | 'SENT' | 'FAILED';
  delivery_method?: 'EMAIL' | 'WHATSAPP' | 'BOTH';
  verified_at?: string;
  created_at: string;
}

export interface Mentor {
  id: string;
  name: string;
  designation: string;
  biography: string;
  experience: string;
  image_url: string;
  specialization?: string;
  featured_on_home: boolean;
  is_published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  student_name: string;
  course_name: string;
  testimonial: string;
  image_url?: string;
  video_url?: string;
  rating?: number;
  is_published: boolean;
  display_order?: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Masterclasses' | 'Film Production' | 'Student Activities' | 'Behind the Scenes';
  image_url: string;
  caption?: string;
  featured_on_home: boolean;
  created_at: string;
}

export interface PreviousClass {
  id: string;
  title: string;
  mentor_name: string;
  date: string;
  description: string;
  thumbnail_url: string;
  video_preview_url?: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED';
  created_at: string;
}

export interface WebsiteSettings {
  brand_name: string;
  full_name: string;
  tagline: string;
  domain: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  instagram_handle: string;
  instagram_url: string;
  youtube_url: string;
  linkedin_url: string;
  parent_company: string;
  parent_website: string;
  address: string;
  logo_url: string;
}

