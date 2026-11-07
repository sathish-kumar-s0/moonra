import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#08090C] text-white py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#C52222] uppercase">
            LEGAL DOCUMENTATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-white mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#8E929E] mt-1">Last Updated: November 2026</p>
        </div>

        <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-[#A5A7AD] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">1. Introduction</h2>
            <p>
              MoonInRed Academy of Cinema Technical Studies ("MACTS", "we", "us", or "our"), an initiative of MoonInRed, respects the privacy of our students, prospective applicants, and site visitors. This Privacy Policy outlines the types of personal data we collect, how it is processed, protected, and shared in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily submit when you register for a diploma course, book a workshop pass, or send an enquiry. This includes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name, Age, Gender, and Location.</li>
              <li>Contact details including Mobile Number, WhatsApp Number, and Email Address.</li>
              <li>Educational status, artistic background, and creative portfolio preferences.</li>
              <li>Payment verification references (Transaction IDs, UTR Numbers, or Gateway Order IDs).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">3. Payment & Security</h2>
            <p>
              MACTS does not store raw credit card numbers or sensitive banking credentials on our servers. All digital payments are processed through PCI-DSS compliant payment gateways (such as Razorpay). Manual UPI transfers are verified exclusively through bank reference IDs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">4. Ticket Dispatch via WhatsApp and Email</h2>
            <p>
              By purchasing a workshop pass or enrolling in a course, you authorise MACTS to dispatch event passes, class schedules, and receipt credentials via the provided WhatsApp number and Email address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">5. Contact Information</h2>
            <p>
              For queries regarding personal data, email <a href="mailto:mactsofficial@gmail.com" className="text-[#C9A45C] underline">mactsofficial@gmail.com</a> or phone +91 88700 32122.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const Terms: React.FC = () => {
  return (
    <div className="bg-[#08090C] text-white py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#C52222] uppercase">
            ACADEMIC TERMS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-white mt-1">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#8E929E] mt-1">Effective: Academic Year 2026–2027</p>
        </div>

        <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-[#A5A7AD] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">1. Admission & Course Enrollment</h2>
            <p>
              Admission to MACTS Diploma Programmes is subject to committee review and availability of batch seats. Submitting an application form does not automatically guarantee batch confirmation until the required registration fee is received and verified.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">2. Workshop Admission Passes</h2>
            <p>
              Workshop passes generated with a unique QR code are valid for the named participant. Passes must be presented digitally or in print at event registration desks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">3. Intellectual Property</h2>
            <p>
              All masterclass recordings, curriculum documents, lecture notes, and workshop handouts produced by MACTS and MoonInRed remain the exclusive intellectual property of the institution. Unauthorized recording, commercial distribution, or resale is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const RefundPolicy: React.FC = () => {
  return (
    <div className="bg-[#08090C] text-white py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#C52222] uppercase">
            FINANCIAL POLICY
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-white mt-1">
            Refund & Cancellation Policy
          </h1>
        </div>

        <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-[#A5A7AD] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">1. Workshop Registrations</h2>
            <p>
              Workshop pass fees are non-refundable once issued, as seat quotas and studio logistics are allocated immediately upon payment confirmation. However, if an emergency prevents attendance, participants may request transfer of their pass to a subsequent monthly workshop by writing to admissions at least 48 hours prior to the event.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-serif">2. Event Rescheduling by MACTS</h2>
            <p>
              In the unlikely event that a masterclass or workshop is rescheduled due to unforeseen industry mentor production commitments or technical emergencies, the ticket remains 100% valid for the rescheduled date. If a participant cannot attend the new date, a full refund will be processed within 5–7 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

