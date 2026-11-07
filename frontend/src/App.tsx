import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { AuthProvider, useAuth } from './context/AuthContext';
import MactsPreloader from './components/MactsPreloader';
import { api } from './services/api';

// Public Pages
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { CourseRegistration } from './pages/CourseRegistration';
import { Workshops } from './pages/Workshops';
import { WorkshopRegistration } from './pages/WorkshopRegistration';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { VerifyTicket } from './pages/VerifyTicket';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { PrivacyPolicy, Terms, RefundPolicy } from './pages/LegalPages';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { CoursesAdmin } from './pages/admin/CoursesAdmin';
import { CourseRegistrationsAdmin } from './pages/admin/CourseRegistrationsAdmin';
import { WorkshopsAdmin } from './pages/admin/WorkshopsAdmin';
import { WorkshopRegistrationsAdmin } from './pages/admin/WorkshopRegistrationsAdmin';
import { MentorsAdmin } from './pages/admin/MentorsAdmin';
import { GalleryAdmin } from './pages/admin/GalleryAdmin';
import { TestimonialsAdmin } from './pages/admin/TestimonialsAdmin';
import { EnquiriesAdmin } from './pages/admin/EnquiriesAdmin';
import { SettingsAdmin } from './pages/admin/SettingsAdmin';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C52222] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#08090C]">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const ExternalRedirect: React.FC<{ to: string }> = ({ to }) => {
  React.useEffect(() => {
    window.location.href = to;
  }, [to]);
  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-10 h-10 border-2 border-[#D0232B] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-[#A5A7AD]">Redirecting to <span className="text-[#C9A45C] font-semibold">{to}</span>...</p>
    </div>
  );
};

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    let active = true;
    async function initializeExperience() {
      try {
        // Wait for essential fonts to load
        if (document.fonts) {
          await document.fonts.ready;
        }

        // Initialize critical background data & enforce smooth cinematic pacing
        const minPacingTimer = new Promise((resolve) => setTimeout(resolve, 950));
        await Promise.allSettled([
          api.get('/courses'),
          api.get('/workshops'),
          api.get('/mentors'),
          minPacingTimer
        ]);
      } catch (error) {
        console.error("MACTS initialization error:", error);
      } finally {
        if (active) setIsReady(true);
      }
    }

    initializeExperience();
    return () => {
      active = false;
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
    <AuthProvider>
      {showPreloader && (
        <MactsPreloader isReady={isReady} onComplete={handlePreloaderComplete} />
      )}
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Navbar & Footer */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
          <Route path="/courses/:slug" element={<PublicLayout><CourseDetails /></PublicLayout>} />
          <Route path="/courses/:slug/register" element={<PublicLayout><CourseRegistration /></PublicLayout>} />
          <Route path="/workshops" element={<PublicLayout><Workshops /></PublicLayout>} />
          <Route path="/workshops/:slug/register" element={<PublicLayout><WorkshopRegistration /></PublicLayout>} />
          <Route path="/payment-success" element={<PublicLayout><PaymentSuccess /></PublicLayout>} />
          <Route path="/verify-ticket/:token" element={<PublicLayout><VerifyTicket /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactUs /></PublicLayout>} />
          <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
          <Route path="/refund-policy" element={<PublicLayout><RefundPolicy /></PublicLayout>} />

          {/* External Parent Brand Redirect */}
          <Route path="/mooninred" element={<ExternalRedirect to="https://www.mooninred.com" />} />

          {/* Helpful Route Aliases & Redirects */}
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
          <Route path="/terms-conditions" element={<Navigate to="/terms" replace />} />
          <Route path="/refund" element={<Navigate to="/refund-policy" replace />} />
          <Route path="/cancellation-policy" element={<Navigate to="/refund-policy" replace />} />
          <Route path="/workshop" element={<Navigate to="/workshops" replace />} />
          <Route path="/course" element={<Navigate to="/courses" replace />} />
          <Route path="/apply" element={<Navigate to="/courses" replace />} />
          <Route path="/register" element={<Navigate to="/courses" replace />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="courses" element={<CoursesAdmin />} />
            <Route path="course-registrations" element={<CourseRegistrationsAdmin />} />
            <Route path="workshops" element={<WorkshopsAdmin />} />
            <Route path="workshop-registrations" element={<WorkshopRegistrationsAdmin />} />
            <Route path="mentors" element={<MentorsAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="enquiries" element={<EnquiriesAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>

          {/* Cinematic 404 Scene Not Found Page */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

