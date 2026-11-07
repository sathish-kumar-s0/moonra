import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard, Calendar, Clock, ArrowRight, CheckCircle2, Film, Camera, Sliders, Video } from 'lucide-react';
import { api } from '../services/api';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackCourses = [
    {
      id: 'film-making',
      slug: 'diploma-in-film-making',
      title: 'Diploma in Film Making',
      duration: '3 Months',
      mode: 'Live Interactive Zoom Classes',
      fee: 24999,
      thumbnail_url: '/assets/course_film_making.jpg',
      description: 'Understand filmmaking from concept development to the complete filmmaking process with practical director-led guidance live via Zoom.',
      curriculum: [
        'Introduction to Filmmaking & Cinema History',
        'Story Development & Narrative Arcs',
        'Screenwriting & Character Dynamics',
        'Directorial Vision & Actor Staging Live on Zoom'
      ]
    },
    {
      id: 'movie-editing',
      slug: 'diploma-in-movie-editing',
      title: 'Diploma in Movie Editing',
      duration: '3 Months',
      mode: 'Live Interactive Zoom Classes',
      fee: 21999,
      thumbnail_url: '/assets/course_movie_editing.jpg',
      description: 'Understand the art of editing, visual storytelling, pacing and professional post-production workflows with live screen sharing on Zoom.',
      curriculum: [
        'Editing Fundamentals & Industry Workstations',
        'Visual Storytelling & Narrative Rhythms',
        'Advanced Editing Techniques & Montage',
        'Multi-cam Timeline Breakdown via Zoom Screen Share'
      ]
    },
    {
      id: 'cinematography',
      slug: 'diploma-in-cinematography',
      title: 'Diploma in Cinematography',
      duration: '3 Months',
      mode: 'Live Interactive Zoom Classes',
      fee: 24999,
      thumbnail_url: '/assets/course_cinematography.jpg',
      description: 'Explore camera operations, cinema lenses, dramatic three-point lighting, framing composition and visual aesthetics live with ISC cinematographers on Zoom.',
      curriculum: [
        'Camera Fundamentals & Sensor Science',
        'Cine Lens Selection, Optics & Camera Settings',
        'Lighting Techniques (Key, Fill, Rim & Practical Lighting)',
        'Cinematic Composition & On-Set Camera Rig Analysis'
      ]
    },
    {
      id: 'film-production',
      slug: 'diploma-in-film-production',
      title: 'Diploma in Film Production',
      duration: '3 Months',
      mode: 'Live Interactive Zoom Classes',
      fee: 19999,
      thumbnail_url: '/assets/course_film_production.jpg',
      description: 'Learn the planning, scheduling, financing, coordination and executive management behind commercial and indie feature films.',
      curriculum: [
        'Film Production Fundamentals & Producer Roles',
        'Budgeting, Line Items & Cost Estimation',
        'Production Planning & Location Logistics',
        'OTT Pitching & Distribution Strategy'
      ]
    }
  ];

  useEffect(() => {
    api.get('/courses')
      .then((res) => {
        if (res.data.success && res.data.data.length > 0) {
          // Merge images and zoom mode
          const merged = res.data.data.map((c: any, idx: number) => ({
            ...c,
            mode: 'Live Interactive Zoom Classes',
            thumbnail_url: fallbackCourses[idx]?.thumbnail_url || c.thumbnail_url
          }));
          setCourses(merged);
        } else {
          setCourses(fallbackCourses);
        }
      })
      .catch(() => setCourses(fallbackCourses))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#07080A] text-white py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#D0232B]"></span>
            <span className="text-[#D0232B] text-xs uppercase tracking-widest font-bold">
              MACTS ACADEMIC PROGRAMMES
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display uppercase">
            Explore Our Courses
          </h1>
          <p className="text-xs sm:text-sm text-[#8E929E] leading-relaxed">
            Industry-oriented diploma programmes designed for aspiring filmmakers and cinema professionals. Delivered through <strong className="text-white">Live Interactive Zoom Masterclasses</strong> with direct mentor Q&A and recorded archives.
          </p>
        </div>

        {/* Zoom Delivery Banner */}
        <div className="mb-12 p-4 rounded-xl bg-[#0D1525] border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Live Zoom Masterclass Methodology</h4>
              <p className="text-[11px] text-blue-200/70">
                Interactive screen shares, live timeline breakdowns, script workshops, and real-time mentor feedback directly over Zoom.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-300 font-mono text-[11px] font-semibold border border-blue-500/30 shrink-0">
            100% Live via Zoom
          </span>
        </div>

        {/* Courses Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(courses.length > 0 ? courses : fallbackCourses).map((course) => (
            <div
              key={course.id}
              className="rounded-xl bg-[#0E1015] border border-[#22252E] hover:border-[#D0232B]/70 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div className="relative h-60 overflow-hidden bg-black">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D0232B] text-white">
                    Diploma Programme
                  </span>
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-900/80 text-blue-200 border border-blue-700/60">
                    Zoom Class
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#C9A45C] mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {course.duration || '3 Months'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-blue-400">
                      <Video className="w-3.5 h-3.5" /> Live Zoom Masterclasses
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight mb-3 uppercase">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#8E929E] leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Curriculum Highlights */}
                  {course.curriculum && course.curriculum.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <h4 className="text-[11px] font-bold text-[#E8D6A8] uppercase tracking-wider">
                        Core Zoom Syllabus Highlights
                      </h4>
                      <div className="grid grid-cols-1 gap-1.5">
                        {course.curriculum.slice(0, 3).map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#A5A8B2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D0232B] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[#1C1E26] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#71747D] tracking-wider block">Tuition Fee</span>
                    <span className="text-base font-bold text-white font-mono">
                      ₹{course.fee ? course.fee.toLocaleString() : '24,999'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/courses/${course.slug || course.id}`}
                      className="px-4 py-2 rounded border border-[#2E313D] text-xs font-semibold text-white hover:bg-[#151720] transition-colors"
                    >
                      View Syllabus
                    </Link>
                    <Link
                      to={`/courses/${course.slug || course.id}/register`}
                      className="px-5 py-2 rounded bg-[#B81D24] hover:bg-[#D0232B] text-white text-xs font-semibold tracking-wide transition-colors"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
