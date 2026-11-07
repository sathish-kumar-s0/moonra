import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.resolve(__dirname, '../../data/macts_db.json');
const SEED_PATH = path.resolve(__dirname, '../data/seed.json');

export interface DBData {
  admin: {
    username: string;
    password_hash: string;
    name: string;
    role: string;
  };
  courses: any[];
  course_registrations: any[];
  workshops: any[];
  workshop_registrations: any[];
  payments: any[];
  tickets: any[];
  mentors: any[];
  testimonials: any[];
  gallery: any[];
  previous_classes: any[];
  enquiries: any[];
  settings: any;
  audit_logs?: any[];
}

class Store {
  private data: DBData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DBData {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(raw);
      } else if (fs.existsSync(SEED_PATH)) {
        const raw = fs.readFileSync(SEED_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        this.saveToFile(parsed);
        return parsed;
      }
    } catch (err) {
      console.error('Error loading database file:', err);
    }

    return this.getDefaultData();
  }

  private getDefaultData(): DBData {
    return {
      admin: {
        username: 'admin@mactsfilminstitute.com',
        password_hash: bcrypt.hashSync('MactsAdmin@2026', 10),
        name: 'MACTS Executive Director',
        role: 'SUPER_ADMIN'
      },
      courses: [],
      course_registrations: [],
      workshops: [],
      workshop_registrations: [],
      payments: [],
      tickets: [],
      mentors: [],
      testimonials: [],
      gallery: [],
      previous_classes: [],
      enquiries: [],
      settings: {
        name: 'MACTS – MoonInRed Academy of Cinema Technical Studies',
        full_name: 'MoonInRed Academy of Cinema Technical Studies',
        tagline: 'Learn Cinema. Understand the Craft. Create the Future.',
        domain: 'https://mactsfilminstitute.com',
        phone: '+91 88700 32122',
        whatsapp: '+91 88700 32122',
        email: 'mactsofficial@gmail.com',
        instagram: 'Macts_Official',
        parent_website: 'https://www.mooninred.com'
      },
      audit_logs: []
    };
  }

  private save(): void {
    try {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to DB:', err);
    }
  }

  private saveToFile(data: DBData): void {
    try {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to DB:', err);
    }
  }

  // --- Admin ---
  getAdmin() {
    return this.data.admin;
  }

  // --- Courses ---
  getCourses(onlyPublished = false) {
    if (onlyPublished) {
      return this.data.courses.filter(c => c.is_published !== false);
    }
    return this.data.courses;
  }

  getCourseBySlug(slug: string) {
    return this.data.courses.find(c => c.slug === slug || c.id === slug);
  }

  createCourse(course: any) {
    this.data.courses.unshift(course);
    this.save();
    return course;
  }

  updateCourse(id: string, updates: any) {
    const idx = this.data.courses.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.data.courses[idx] = { ...this.data.courses[idx], ...updates, updated_at: new Date().toISOString() };
      this.save();
      return this.data.courses[idx];
    }
    return null;
  }

  deleteCourse(id: string) {
    const idx = this.data.courses.findIndex(c => c.id === id);
    if (idx !== -1) {
      const removed = this.data.courses.splice(idx, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  // --- Course Registrations ---
  getCourseRegistrations() {
    return this.data.course_registrations;
  }

  getCourseRegistrationById(id: string) {
    return this.data.course_registrations.find(r => r.id === id || r.registration_number === id);
  }

  createCourseRegistration(reg: any) {
    this.data.course_registrations.unshift(reg);
    this.save();
    return reg;
  }

  updateCourseRegistrationStatus(id: string, payment_status?: string, registration_status?: string, notes?: string) {
    const item = this.data.course_registrations.find(r => r.id === id || r.registration_number === id);
    if (item) {
      if (payment_status) item.payment_status = payment_status;
      if (registration_status) item.registration_status = registration_status;
      if (notes !== undefined) item.notes = notes;
      item.updated_at = new Date().toISOString();
      this.save();
      return item;
    }
    return null;
  }

  // --- Workshops ---
  getWorkshops(onlyPublished = false) {
    if (onlyPublished) {
      return this.data.workshops.filter(w => w.is_published !== false);
    }
    return this.data.workshops;
  }

  getWorkshopBySlug(slug: string) {
    return this.data.workshops.find(w => w.slug === slug || w.id === slug);
  }

  createWorkshop(workshop: any) {
    this.data.workshops.unshift(workshop);
    this.save();
    return workshop;
  }

  updateWorkshop(id: string, updates: any) {
    const idx = this.data.workshops.findIndex(w => w.id === id);
    if (idx !== -1) {
      this.data.workshops[idx] = { ...this.data.workshops[idx], ...updates, updated_at: new Date().toISOString() };
      this.save();
      return this.data.workshops[idx];
    }
    return null;
  }

  deleteWorkshop(id: string) {
    const idx = this.data.workshops.findIndex(w => w.id === id);
    if (idx !== -1) {
      const removed = this.data.workshops.splice(idx, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  // --- Workshop Registrations ---
  getWorkshopRegistrations() {
    return this.data.workshop_registrations;
  }

  getWorkshopRegistrationById(id: string) {
    return this.data.workshop_registrations.find(r => r.id === id || r.registration_number === id);
  }

  createWorkshopRegistration(reg: any) {
    this.data.workshop_registrations.unshift(reg);
    this.save();
    return reg;
  }

  updateWorkshopRegistration(id: string, updates: any) {
    const item = this.data.workshop_registrations.find(r => r.id === id || r.registration_number === id);
    if (item) {
      Object.assign(item, updates, { updated_at: new Date().toISOString() });
      this.save();
      return item;
    }
    return null;
  }

  // --- Tickets ---
  getTickets() {
    return this.data.tickets;
  }

  getTicketById(id: string) {
    return this.data.tickets.find(t => t.id === id || t.ticket_number === id);
  }

  getTicketByToken(token: string) {
    return this.data.tickets.find(t => t.qr_token === token || t.id === token || t.ticket_number === token);
  }

  getTicketByRegistrationId(regId: string) {
    return this.data.tickets.find(t => t.workshop_registration_id === regId);
  }

  createTicket(ticket: any) {
    this.data.tickets.unshift(ticket);
    this.save();
    return ticket;
  }

  verifyTicket(idOrToken: string) {
    const ticket = this.getTicketByToken(idOrToken);
    if (ticket) {
      ticket.verified_at = new Date().toISOString();
      this.save();
      return ticket;
    }
    return null;
  }

  // --- Payments ---
  getPayments() {
    return this.data.payments;
  }

  createPayment(payment: any) {
    this.data.payments.unshift(payment);
    this.save();
    return payment;
  }

  updatePaymentStatus(orderId: string, status: string, paymentId?: string, verified = false) {
    const item = this.data.payments.find(p => p.provider_order_id === orderId || p.id === orderId);
    if (item) {
      item.status = status;
      if (paymentId) item.provider_payment_id = paymentId;
      item.payment_signature_verified = verified;
      this.save();
      return item;
    }
    return null;
  }

  // --- Mentors ---
  getMentors(onlyPublished = false) {
    if (onlyPublished) {
      return this.data.mentors.filter(m => m.is_published !== false);
    }
    return this.data.mentors;
  }

  createMentor(mentor: any) {
    this.data.mentors.unshift(mentor);
    this.save();
    return mentor;
  }

  updateMentor(id: string, updates: any) {
    const idx = this.data.mentors.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.data.mentors[idx] = { ...this.data.mentors[idx], ...updates };
      this.save();
      return this.data.mentors[idx];
    }
    return null;
  }

  deleteMentor(id: string) {
    const idx = this.data.mentors.findIndex(m => m.id === id);
    if (idx !== -1) {
      const removed = this.data.mentors.splice(idx, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  // --- Testimonials ---
  getTestimonials(onlyPublished = false) {
    if (onlyPublished) {
      return this.data.testimonials.filter(t => t.is_published !== false);
    }
    return this.data.testimonials;
  }

  createTestimonial(testimonial: any) {
    this.data.testimonials.unshift(testimonial);
    this.save();
    return testimonial;
  }

  updateTestimonial(id: string, updates: any) {
    const idx = this.data.testimonials.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.data.testimonials[idx] = { ...this.data.testimonials[idx], ...updates };
      this.save();
      return this.data.testimonials[idx];
    }
    return null;
  }

  deleteTestimonial(id: string) {
    const idx = this.data.testimonials.findIndex(t => t.id === id);
    if (idx !== -1) {
      const removed = this.data.testimonials.splice(idx, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  // --- Gallery ---
  getGallery() {
    return this.data.gallery;
  }

  createGalleryItem(item: any) {
    this.data.gallery.unshift(item);
    this.save();
    return item;
  }

  deleteGalleryItem(id: string) {
    const idx = this.data.gallery.findIndex(g => g.id === id);
    if (idx !== -1) {
      const removed = this.data.gallery.splice(idx, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  // --- Previous Classes ---
  getPreviousClasses() {
    return this.data.previous_classes;
  }

  createPreviousClass(item: any) {
    this.data.previous_classes.unshift(item);
    this.save();
    return item;
  }

  deletePreviousClass(id: string) {
    const idx = this.data.previous_classes.findIndex(p => p.id === id);
    if (idx !== -1) {
      const removed = this.data.previous_classes.splice(idx, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  // --- Contact Enquiries ---
  getEnquiries() {
    return this.data.enquiries;
  }

  createEnquiry(enquiry: any) {
    this.data.enquiries.unshift(enquiry);
    this.save();
    return enquiry;
  }

  updateEnquiryStatus(id: string, status: string) {
    const item = this.data.enquiries.find(e => e.id === id);
    if (item) {
      item.status = status;
      this.save();
      return item;
    }
    return null;
  }

  // --- Settings ---
  getSettings() {
    return this.data.settings;
  }

  updateSettings(updates: any) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
    return this.data.settings;
  }

  // --- Dashboard Stats ---
  getDashboardStats() {
    const totalCourses = this.data.courses.length;
    const totalWorkshops = this.data.workshops.length;
    const totalCourseRegs = this.data.course_registrations.length;
    const totalWorkshopRegs = this.data.workshop_registrations.length;
    const totalEnquiries = this.data.enquiries.length;
    const totalTickets = this.data.tickets.length;

    const confirmedCourseRegs = this.data.course_registrations.filter(r => r.payment_status === 'SUCCESS' || r.registration_status === 'CONFIRMED');
    const confirmedWorkshopRegs = this.data.workshop_registrations.filter(r => r.payment_status === 'SUCCESS' || r.registration_status === 'CONFIRMED');
    const pendingCourseRegs = this.data.course_registrations.filter(r => r.payment_status === 'PENDING' || r.payment_status === 'MANUAL_REVIEW');

    const courseRevenue = confirmedCourseRegs.reduce((acc, r) => acc + (Number(r.registration_fee) || 0), 0);
    const workshopRevenue = confirmedWorkshopRegs.reduce((acc, r) => acc + (Number(r.amount_paid) || 0), 0);
    const totalRevenue = courseRevenue + workshopRevenue;

    return {
      totalCourses,
      totalWorkshops,
      totalCourseRegs,
      totalWorkshopRegs,
      totalStudents: totalCourseRegs + totalWorkshopRegs,
      totalRevenue,
      totalTickets,
      pendingManualReviews: pendingCourseRegs.length,
      totalEnquiries,
      recentCourseRegs: this.data.course_registrations.slice(0, 5),
      recentWorkshopRegs: this.data.workshop_registrations.slice(0, 5),
      recentEnquiries: this.data.enquiries.slice(0, 5)
    };
  }
}

export const store = new Store();

