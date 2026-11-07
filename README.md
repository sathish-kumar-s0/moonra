# MACTS – MoonInRed Academy of Cinema Technical Studies
> **Learn Cinema. Understand the Craft. Create the Future.**
> Official Platform: [https://mactsfilminstitute.com](https://mactsfilminstitute.com)  
> Parent Brand: [https://www.mooninred.com](https://www.mooninred.com)

---

## 🎬 Architecture & Tech Stack

### Frontend
- **Framework:** React 18+ with Vite & TypeScript
- **Styling:** Tailwind CSS (Custom Dark Cinematic Palette with Crimson `#C52222` & Gold `#C9A45C` Accents)
- **Icons & Motion:** Lucide React, Framer Motion
- **Routing & State:** React Router DOM v7, TanStack Query
- **Form Validation:** React Hook Form with Zod schemas
- **Payment & Effects:** Razorpay Checkout SDK, Canvas Confetti

### Backend
- **Runtime & Server:** Node.js, Express.js with TypeScript
- **Security:** Helmet, CORS, JWT session authentication, Role-based access control, bcrypt password hashing
- **Ticketing & QR:** PDFKit vector ticket layout generation with dynamic QRCode matrix
- **Database:** PostgreSQL with Prisma ORM (`prisma/schema.prisma`), backed by persistent JSON store for zero-friction local development and instant deployment
- **File Uploads:** Multer for payment UTR receipts and screenshots

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Run from the root directory:
```bash
# Install root, backend and frontend dependencies
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 2. Start Both Frontend and Backend Concurrently
```bash
npm run dev
```
- **Public Website:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`
- **Health Check:** `http://localhost:5000/api/health`

### 3. Admin Console Access
- **URL:** `http://localhost:5173/admin/login`
- **Default Email:** `admin@mactsfilminstitute.com`
- **Default Password:** `MactsAdmin@2026`

---

## 📂 Project Structure

```
moonra/
├── backend/
│   ├── src/
│   │   ├── app.ts                  # Express application setup & middleware
│   │   ├── server.ts               # Server bootstrap & listener
│   │   ├── routes/api.ts           # REST endpoints for courses, workshops, payments, tickets, admin
│   │   ├── services/
│   │   │   ├── store.ts            # Persistent database engine & queries
│   │   │   └── ticket.ts           # PDFKit pass generation with QR code
│   │   └── middleware/auth.ts      # JWT admin authorization guard
│   ├── prisma/schema.prisma        # Production PostgreSQL relational schema
│   ├── data/macts_db.json          # Seed and runtime database
│   └── uploads/                    # Payment receipts and media uploads
├── frontend/
│   ├── src/
│   │   ├── components/layout/      # Navbar, Footer (matching official reference design)
│   │   ├── components/common/      # Floating WhatsApp button
│   │   ├── pages/                  # Home, Courses, CourseDetails, CourseRegistration,
│   │   │                           # Workshops, WorkshopRegistration, PaymentSuccess,
│   │   │                           # VerifyTicket, AboutUs, ContactUs, LegalPages
│   │   ├── pages/admin/            # Admin console (Dashboard, Courses, Registrations,
│   │   │                           # Workshops, Passes, Mentors, Gallery, Testimonials, Settings)
│   │   ├── services/api.ts         # Axios client with JWT interceptor
│   │   └── context/AuthContext.tsx # Admin auth state
│   ├── tailwind.config.js          # Cinematic theme tokens
│   └── vite.config.ts              # Vite config with backend proxy
└── shared/
    └── types.ts                    # Shared TypeScript interfaces
```

---

## 💳 Payment & Automated Ticketing Flow

1. **Course Registration:**
   - 5-Section comprehensive application form
   - Supports online payment and manual UPI/NEFT transfer with UTR number and payment screenshot upload
   - Admin verifies transactions in the Admin Dashboard

2. **Workshop Registration:**
   - Real-time seat availability tracking
   - Razorpay order creation and signature verification
   - Server-side ticket generation upon successful payment
   - Generates official PDF Admission Pass with embedded verification QR code
   - Public verification endpoint at `/verify-ticket/:token`

---

## 📞 Official Contacts
- **Phone:** +91 88700 32122
- **WhatsApp:** +91 88700 32122
- **Email:** mactsofficial@gmail.com
- **Instagram:** [@Macts_Official](https://instagram.com/Macts_Official)

