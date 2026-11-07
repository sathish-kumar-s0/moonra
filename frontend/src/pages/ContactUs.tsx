import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, Instagram, MapPin, Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { api } from '../services/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactUs: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await api.post('/contact', data);
      if (res.data.success) {
        setSubmitted(true);
        reset();
      } else {
        setErrorMessage(res.data.message || 'Error sending message.');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Server error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08090C] text-white py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#C52222]"></span>
            <span className="text-[#C52222] text-xs uppercase tracking-widest font-bold">
              GET IN TOUCH
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-serif uppercase">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[#A5A7AD] leading-relaxed">
            If you have any queries, kindly contact us. Our academic counseling team will assist you with course syllabi, fee structures, mentor schedules and offline studio visits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold font-serif text-white uppercase">
                Admissions & Studio Office
              </h3>

              <div className="space-y-4 text-xs">
                <a
                  href="tel:+918870032122"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#151822] hover:bg-[#1C202E] border border-[#232735] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8E929E] block text-[10px] uppercase font-semibold">Direct Call</span>
                    <span className="text-sm font-bold text-white">+91 88700 32122</span>
                  </div>
                </a>

                <a
                  href="mailto:mactsofficial@gmail.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#151822] hover:bg-[#1C202E] border border-[#232735] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8E929E] block text-[10px] uppercase font-semibold">Official Email</span>
                    <span className="text-sm font-bold text-white">mactsofficial@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://instagram.com/Macts_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#151822] hover:bg-[#1C202E] border border-[#232735] transition-colors"
                >
                  <Instagram className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8E929E] block text-[10px] uppercase font-semibold">Official Instagram</span>
                    <span className="text-sm font-bold text-white">@Macts_Official</span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#151822] border border-[#232735]">
                  <MapPin className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8E929E] block text-[10px] uppercase font-semibold">Academy Location</span>
                    <span className="text-xs font-medium text-white leading-relaxed block">
                      MoonInRed Academy of Cinema Technical Studies<br />
                      Chennai, Tamil Nadu – 600017, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Prompt */}
              <div className="pt-2">
                <a
                  href="https://wa.me/918870032122?text=Hello%20MACTS%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses%20and%20workshops."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold transition-all shadow-md shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat with Admissions on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-10 space-y-6">
              
              <h3 className="text-xl font-bold font-serif text-white uppercase border-b border-[#1E212B] pb-4">
                Send an Enquiry
              </h3>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>Your message has been received! Our academic coordinator will respond within 24 hours.</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="e.g. Karthik Sivakumar"
                      className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="karthik@example.com"
                      className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Subject *</label>
                    <input
                      type="text"
                      {...register('subject')}
                      placeholder="e.g. Query regarding Movie Editing Diploma"
                      className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
                    />
                    {errors.subject && <p className="text-[11px] text-red-400 mt-1">{errors.subject.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Message / Inquiry *</label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="Tell us about your background, the course or workshop you are interested in..."
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg p-4 text-xs text-white focus:outline-none focus:border-[#C52222]"
                  ></textarea>
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold tracking-wide uppercase transition-all duration-300 shadow-lg shadow-red-950/60 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending Enquiry...' : 'Submit Enquiry'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

