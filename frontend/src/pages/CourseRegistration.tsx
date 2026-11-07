import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clapperboard, CheckCircle, Upload, AlertCircle, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { api } from '../services/api';

const registrationSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  age: z.coerce.number().min(15, 'Minimum age is 15').max(80, 'Maximum age is 80'),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']),
  mobile: z.string().regex(/^[0-9+ -]{10,15}$/, 'Enter a valid 10-15 digit mobile number'),
  whatsapp: z.string().regex(/^[0-9+ -]{10,15}$/, 'Enter a valid WhatsApp number'),
  email: z.string().email('Enter a valid email address'),
  city: z.string().min(2, 'City is required'),
  current_status: z.enum(['College Student', 'Working Professional', 'Aspiring Filmmaker', 'Independent Filmmaker', 'Other']),
  filmmaking_interest: z.enum(['Yes', 'No', 'Exploring']),
  project_experience: z.enum(['Yes', 'No']),
  interested_areas: z.array(z.string()).min(1, 'Select at least one area of interest'),
  payment_method: z.enum(['UPI_MANUAL', 'BANK_TRANSFER', 'RAZORPAY']),
  transaction_id: z.string().optional(),
  confirm_correct: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm that the information provided is correct.' })
  }),
  agree_updates: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to receive course-related updates.' })
  })
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const CourseRegistration: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      gender: 'Male',
      current_status: 'Aspiring Filmmaker',
      filmmaking_interest: 'Yes',
      project_experience: 'No',
      interested_areas: ['Direction'],
      payment_method: 'UPI_MANUAL'
    }
  });

  const selectedAreas = watch('interested_areas') || [];
  const selectedPaymentMethod = watch('payment_method');

  useEffect(() => {
    if (slug) {
      api.get(`/courses/${slug}`)
        .then((res) => {
          if (res.data.success) {
            setCourse(res.data.data);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const handleAreaToggle = (area: string) => {
    if (selectedAreas.includes(area)) {
      setValue('interested_areas', selectedAreas.filter((a) => a !== area));
    } else {
      setValue('interested_areas', [...selectedAreas, area]);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append('course_id', course?.id || slug || 'diploma-course');
      formData.append('course_title', course?.title || 'MACTS Diploma Programme');
      formData.append('registration_fee', String(course?.fee || 24999));
      
      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'interested_areas') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      if (screenshotFile) {
        formData.append('screenshot', screenshotFile);
      }

      const res = await api.post('/course-registrations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSubmitSuccess(res.data.registrationNumber);
      } else {
        setServerError(res.data.message || 'Registration submission failed.');
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Server error occurred during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-[#08090C] text-white min-h-screen py-20 px-4">
        <div className="max-w-xl mx-auto rounded-2xl bg-[#111319] border border-[#2B2F3D] p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-serif text-white uppercase">
              Registration Submitted Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A7AD]">
              Your student application for <span className="text-[#C9A45C] font-semibold">{course?.title}</span> has been received by the MACTS Admissions Office.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#181B24] border border-[#262A37] text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#8E929E]">Registration Number</span>
              <span className="font-mono font-bold text-[#E8D6A8]">{submitSuccess}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#8E929E]">Payment Status</span>
              <span className="font-semibold text-amber-400">Under Review / Verification</span>
            </div>
          </div>

          <p className="text-xs text-[#8E929E] leading-relaxed">
            Our admissions committee will verify your payment and contact you on your registered WhatsApp / Email address with the welcome kit and live schedule.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-md bg-[#1C202B] hover:bg-[#252A38] text-xs font-semibold text-white transition-colors"
            >
              Return Home
            </Link>
            <a
              href={`https://wa.me/918870032122?text=Hello%20MACTS%20Admissions%2C%20I%20have%20submitted%20my%20registration%20(Reg%20ID:%20${submitSuccess})`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-md bg-[#25D366] hover:bg-[#20BD5A] text-xs font-semibold text-white transition-colors"
            >
              Contact Admissions WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#08090C] text-white py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#C52222]"></span>
            <span className="text-[#C52222] text-xs uppercase tracking-widest font-bold">
              MACTS ADMISSIONS
            </span>
            <span className="w-4 h-[2px] bg-[#C52222]"></span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif uppercase">
            Official Student Registration
          </h1>
          <p className="text-xs sm:text-sm text-[#A5A7AD]">
            Enrolling for: <span className="text-[#C9A45C] font-semibold">{course?.title || 'Diploma Programme'}</span>
          </p>
        </div>

        {serverError && (
          <div className="mb-8 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {/* SECTION 1: PERSONAL DETAILS */}
          <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#1E212B] pb-4">
              <h2 className="text-lg font-bold text-white font-serif tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C52222] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                Section 1 – Personal Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  {...register('full_name')}
                  placeholder="e.g. Rahul Sundaram"
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                />
                {errors.full_name && <p className="text-[11px] text-red-400 mt-1">{errors.full_name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Age *</label>
                  <input
                    type="number"
                    {...register('age')}
                    placeholder="22"
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                  />
                  {errors.age && <p className="text-[11px] text-red-400 mt-1">{errors.age.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Gender *</label>
                  <select
                    {...register('gender')}
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Mobile Number *</label>
                <input
                  type="tel"
                  {...register('mobile')}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                />
                {errors.mobile && <p className="text-[11px] text-red-400 mt-1">{errors.mobile.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">WhatsApp Number *</label>
                <input
                  type="tel"
                  {...register('whatsapp')}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                />
                {errors.whatsapp && <p className="text-[11px] text-red-400 mt-1">{errors.whatsapp.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Email Address *</label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="rahul@example.com"
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">City / Location *</label>
                <input
                  type="text"
                  {...register('city')}
                  placeholder="e.g. Chennai / Bangalore"
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                />
                {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city.message}</p>}
              </div>
            </div>
          </div>

          {/* SECTION 2: EDUCATIONAL & PROFESSIONAL */}
          <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#1E212B] pb-4">
              <h2 className="text-lg font-bold text-white font-serif tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C52222] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                Section 2 – Educational & Professional Details
              </h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9A45C] mb-2">Current Status *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['College Student', 'Working Professional', 'Aspiring Filmmaker', 'Independent Filmmaker', 'Other'].map((status) => (
                  <label
                    key={status}
                    className={`flex items-center gap-2 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                      watch('current_status') === status 
                        ? 'border-[#C52222] bg-[#220D0D] text-white' 
                        : 'border-[#2A2E3D] bg-[#0D0F15] text-[#A5A7AD]'
                    }`}
                  >
                    <input
                      type="radio"
                      value={status}
                      {...register('current_status')}
                      className="sr-only"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: FILM INDUSTRY BACKGROUND */}
          <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#1E212B] pb-4">
              <h2 className="text-lg font-bold text-white font-serif tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C52222] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                Section 3 – Film Industry Background
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#C9A45C] mb-2">Are you interested in filmmaking? *</label>
                <div className="flex gap-4">
                  {['Yes', 'No', 'Exploring'].map((val) => (
                    <label key={val} className="flex items-center gap-2 text-xs text-white cursor-pointer">
                      <input
                        type="radio"
                        value={val}
                        {...register('filmmaking_interest')}
                        className="accent-[#C52222]"
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9A45C] mb-2">Have you worked on any short films or projects? *</label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map((val) => (
                    <label key={val} className="flex items-center gap-2 text-xs text-white cursor-pointer">
                      <input
                        type="radio"
                        value={val}
                        {...register('project_experience')}
                        className="accent-[#C52222]"
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9A45C] mb-2">Which area interests you most? (Select multiple) *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Direction',
                  'Screenwriting',
                  'Production',
                  'Cinematography',
                  'Editing',
                  'OTT Business',
                  'Film Marketing',
                  'Film Distribution'
                ].map((area) => {
                  const isChecked = selectedAreas.includes(area);
                  return (
                    <button
                      type="button"
                      key={area}
                      onClick={() => handleAreaToggle(area)}
                      className={`text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                        isChecked 
                          ? 'border-[#C52222] bg-[#220D0D] text-white font-semibold' 
                          : 'border-[#2A2E3D] bg-[#0D0F15] text-[#A5A7AD]'
                      }`}
                    >
                      <span>{area}</span>
                      {isChecked && <CheckCircle className="w-3.5 h-3.5 text-[#C52222]" />}
                    </button>
                  );
                })}
              </div>
              {errors.interested_areas && (
                <p className="text-[11px] text-red-400 mt-1">{errors.interested_areas.message}</p>
              )}
            </div>
          </div>

          {/* SECTION 4: REGISTRATION & PAYMENT */}
          <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#1E212B] pb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-serif tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C52222] text-white text-xs flex items-center justify-center font-sans font-bold">4</span>
                Section 4 – Registration & Payment
              </h2>
              <span className="text-xs text-[#C9A45C] font-semibold">
                Admission Fee: INR {course?.fee?.toLocaleString() || '24,999'}
              </span>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-medium text-[#C9A45C]">Select Payment Method *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'UPI_MANUAL', title: 'UPI / QR Code Transfer', desc: 'Scan QR & enter UTR number' },
                  { id: 'BANK_TRANSFER', title: 'Direct NEFT / IMPS', desc: 'Official MACTS Current Account' },
                  { id: 'RAZORPAY', title: 'Online Debit/Credit/Netbanking', desc: 'Instant Razorpay gateway' }
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-colors block ${
                      selectedPaymentMethod === m.id 
                        ? 'border-[#C52222] bg-[#220D0D]' 
                        : 'border-[#2A2E3D] bg-[#0D0F15]'
                    }`}
                  >
                    <input
                      type="radio"
                      value={m.id}
                      {...register('payment_method')}
                      className="sr-only"
                    />
                    <h5 className="text-xs font-bold text-white">{m.title}</h5>
                    <p className="text-[11px] text-[#8E929E] mt-1">{m.desc}</p>
                  </label>
                ))}
              </div>

              {/* UPI QR Display box */}
              {selectedPaymentMethod === 'UPI_MANUAL' && (
                <div className="p-4 rounded-xl bg-[#0D0F15] border border-[#282C3A] space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-32 h-32 bg-white p-2 rounded-lg flex items-center justify-center shrink-0">
                      <QrCode className="w-28 h-28 text-black" />
                    </div>
                    <div className="space-y-1.5 text-xs text-[#A5A7AD]">
                      <h4 className="font-bold text-white">MACTS Official UPI VPA</h4>
                      <p className="font-mono text-sm text-[#C9A45C]">mactsacademy@upi</p>
                      <p>Recipient: MOONINRED ACADEMY OF CINEMA TECHNICAL STUDIES</p>
                      <p className="text-[11px] text-[#71747D]">
                        Scan from GPay, PhonePe, Paytm, or BHIM. After paying, input the 12-digit UTR below.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">
                        Payment Transaction ID / UTR Number *
                      </label>
                      <input
                        type="text"
                        {...register('transaction_id')}
                        placeholder="e.g. 432198765432"
                        className="w-full bg-[#141720] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">
                        Upload Payment Screenshot (JPEG, PNG)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                        className="w-full text-xs text-[#8E929E] file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#1E222D] file:text-white hover:file:bg-[#252A38]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Box */}
              {selectedPaymentMethod === 'BANK_TRANSFER' && (
                <div className="p-4 rounded-xl bg-[#0D0F15] border border-[#282C3A] space-y-3 text-xs">
                  <h4 className="font-bold text-white font-serif">MACTS Current Account Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#A5A7AD]">
                    <p>Bank: HDFC Bank Limited</p>
                    <p>Account Name: MoonInRed Academy</p>
                    <p>Account No: 50200084729103</p>
                    <p>IFSC Code: HDFC0001824</p>
                    <p>Branch: T. Nagar, Chennai</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C9A45C] mt-2 mb-1.5">
                      Bank Reference / Transaction ID *
                    </label>
                    <input
                      type="text"
                      {...register('transaction_id')}
                      placeholder="e.g. CMS2026110799"
                      className="w-full bg-[#141720] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 5: CONFIRMATION */}
          <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-8 space-y-4">
            <div className="border-b border-[#1E212B] pb-4">
              <h2 className="text-lg font-bold text-white font-serif tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#C52222] text-white text-xs flex items-center justify-center font-sans font-bold">5</span>
                Section 5 – Confirmation & Consent
              </h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('confirm_correct')}
                  className="mt-0.5 w-4 h-4 rounded bg-[#0D0F15] border-[#2A2E3D] text-[#C52222] focus:ring-0"
                />
                <span className="text-xs text-[#A5A7AD]">
                  I confirm that the information provided is correct and true to the best of my knowledge.
                </span>
              </label>
              {errors.confirm_correct && (
                <p className="text-[11px] text-red-400 pl-7">{errors.confirm_correct.message}</p>
              )}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('agree_updates')}
                  className="mt-0.5 w-4 h-4 rounded bg-[#0D0F15] border-[#2A2E3D] text-[#C52222] focus:ring-0"
                />
                <span className="text-xs text-[#A5A7AD]">
                  I agree to receive course-related updates, schedule alerts and cinema masterclass notices from MoonInRed and MACTS.
                </span>
              </label>
              {errors.agree_updates && (
                <p className="text-[11px] text-red-400 pl-7">{errors.agree_updates.message}</p>
              )}
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-3.5 rounded-md bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg shadow-red-950/60 disabled:opacity-50"
              >
                {submitting ? 'Submitting Application...' : 'Submit Official Registration'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

