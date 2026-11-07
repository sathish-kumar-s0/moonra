import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, ArrowRight, Clapperboard, Award, BookOpen, Users, ChevronDown, ChevronUp, Video } from 'lucide-react';
import { api } from '../services/api';

export const CourseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const imageMap: Record<string, string> = {
    'diploma-in-film-making': '/assets/course_film_making.jpg',
    'film-making': '/assets/course_film_making.jpg',
    'diploma-in-movie-editing': '/assets/course_movie_editing.jpg',
    'movie-editing': '/assets/course_movie_editing.jpg',
    'diploma-in-cinematography': '/assets/course_cinematography.jpg',
    'cinematography': '/assets/course_cinematography.jpg',
    'diploma-in-film-production': '/assets/course_film_production.jpg',
    'film-production': '/assets/course_film_production.jpg'
  };

  useEffect(() => {
    if (slug) {
      api.get(`/courses/${slug}`)
        .then((res) => {
          if (res.data.success) {
            const data = res.data.data;
            setCourse({
              ...data,
              mode: 'Live Interactive Zoom Masterclasses',
              thumbnail_url: imageMap[slug] || data.thumbnail_url
            });
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#07080A] text-white min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D0232B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-[#07080A] text-white min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold font-display uppercase">Course Not Found</h2>
        <Link to="/courses" className="text-[#C9A45C] underline text-xs">
          Return to Courses Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#07080A] text-white min-h-screen pb-20">
      
      {/* Banner & Hero Header */}
      <section className="relative py-16 bg-[#0B0D12] border-b border-[#181A22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D0232B] uppercase tracking-widest">
              <span>MACTS DIPLOMA PROGRAMME</span>
              <span>•</span>
              <span className="text-blue-400 flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> Live Zoom Masterclasses
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display uppercase text-white leading-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-xs text-[#C9A45C] pt-2">
              <span className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-4 h-4 text-[#D0232B]" /> Duration: {course.duration || '3 Months'}
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-blue-300">
                <Video className="w-4 h-4 text-blue-400" /> Format: Live Interactive Zoom Classes
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <Award className="w-4 h-4" /> Certificate of Cinema Completion
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8E929E] leading-relaxed pt-2 max-w-3xl">
              {course.description}
            </p>

            <div className="pt-4">
              <Link
                to={`/courses/${course.slug || course.id}/register`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded bg-[#B81D24] hover:bg-[#D0232B] text-white text-xs font-bold tracking-wide uppercase transition-colors"
              >
                <span>Apply for Zoom Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Breakdown Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Syllabus & Learning Outcomes */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Zoom Class Methodology Box */}
            <div className="p-5 rounded-xl bg-[#0E131E] border border-blue-900/40 space-y-3">
              <div className="flex items-center gap-2 text-blue-400">
                <Video className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                  Live Zoom Masterclass Methodology
                </h3>
              </div>
              <p className="text-xs text-[#A5A8B2] leading-relaxed">
                All classes are conducted live via secure HD Zoom interactive rooms. Students get direct two-way audio-video interaction with working industry directors, editors, and cinematographers. Sessions include live screen sharing of multi-cam editing timelines, live camera sensor setup demos, script pitch reviews, and instant Q&A. Every live session is recorded in HD and made available in the student portal for revision.
              </p>
            </div>

            {/* Curriculum Accordion */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <BookOpen className="w-5 h-5 text-[#C9A45C]" />
                <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
                  Curriculum Modules (Zoom Syllabus)
                </h2>
              </div>

              <div className="space-y-3">
                {course.curriculum && course.curriculum.map((moduleItem: string, idx: number) => {
                  const isOpen = expandedModule === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#0E1015] border border-[#22252E] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedModule(isOpen ? null : idx)}
                        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[#14161E] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#D0232B] font-mono">
                            MODULE 0{idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-white">
                            {moduleItem}
                          </span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#8E929E]" /> : <ChevronDown className="w-4 h-4 text-[#8E929E]" />}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs text-[#8E929E] leading-relaxed border-t border-[#1C1E26] bg-[#0A0C10]">
                          Detailed live Zoom walkthrough, practical industry workflows, real-time screen share analysis, and practical assignments covering {moduleItem.toLowerCase()}. Students receive individual critique from mentors.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <Award className="w-5 h-5 text-[#C9A45C]" />
                <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
                  What You Will Gain
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Live interactive weekly masterclasses conducted by active industry directors and technicians.',
                  'Direct Zoom screen sharing and timeline analysis of actual feature film scenes.',
                  'Full access to HD session recording replays in student dashboard.',
                  'Official MACTS & MoonInRed Diploma Certificate upon project completion.'
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#0E1015] border border-[#22252E] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-[#8E929E] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Admission Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-xl bg-[#0E1015] border border-[#262934] p-6 space-y-5 sticky top-28">
              
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#C9A45C] font-bold block">
                  Official Admission
                </span>
                <h3 className="text-lg font-black text-white font-display uppercase">
                  {course.title}
                </h3>
                <span className="inline-block px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300 font-mono text-[10px] font-semibold">
                  Live Online via Zoom
                </span>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-[#1C1E26] text-xs">
                <div className="flex justify-between py-1 border-b border-[#14161E]">
                  <span className="text-[#8E929E]">Course Duration</span>
                  <span className="font-semibold text-white">{course.duration || '3 Months'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#14161E]">
                  <span className="text-[#8E929E]">Delivery Mode</span>
                  <span className="font-semibold text-blue-400">Live Zoom Classes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#14161E]">
                  <span className="text-[#8E929E]">Meeting Link</span>
                  <span className="font-semibold text-white">Delivered via Email & WhatsApp</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8E929E]">Tuition Fee</span>
                  <span className="font-bold text-[#E8D6A8] font-mono text-sm">
                    ₹{course.fee ? course.fee.toLocaleString() : '24,999'}
                  </span>
                </div>
              </div>

              <Link
                to={`/courses/${course.slug || course.id}/register`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded bg-[#B81D24] hover:bg-[#D0232B] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Register for Zoom Batch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center pt-1">
                <a
                  href="https://wa.me/918870032122?text=Hello%20MACTS%20Team%2C%20I%20have%20questions%20regarding%20the%20Zoom%20Diploma%20Programme."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#8E929E] hover:text-[#C9A45C] transition-colors"
                >
                  Need Zoom schedule details? Chat on WhatsApp →
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
