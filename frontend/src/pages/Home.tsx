import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  Calendar, 
  Clapperboard, 
  Camera, 
  Users, 
  Star, 
  Film, 
  Settings as GearIcon,
  Video,
  ImageIcon
} from 'lucide-react';

export const Home: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="bg-[#07080A] text-white selection:bg-[#D0232B] min-h-screen w-full overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* 1. CINEMATIC FULL-WIDTH HERO SECTION                           */}
      {/* ============================================================== */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] xl:min-h-[92vh] flex flex-col justify-between pt-12 pb-10 overflow-hidden border-b border-[#14161E]">
        
        {/* Full-bleed Hero Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
          <img
            src="/assets/hero_exact.jpg"
            alt="Cinema film set with director and illuminated camera monitor"
            className="w-full h-full object-cover object-[78%_center] lg:object-[82%_center] filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Responsive gradients: Dark fade on left for headline readability and bottom for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080A] via-[#07080A]/90 to-transparent w-full md:w-4/5 lg:w-3/5" />

          {/* Ambient Studio Breathing Glow */}
          <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-[#C9A45C]/15 rounded-full blur-[150px] pointer-events-none animate-studio-pulse" />

          {/* Atmospheric Floating Dust / Ember Particles */}
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#E5D4A8]/40 blur-[0.5px] pointer-events-none animate-float-1" />
          <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-[#C9A45C]/35 blur-[1px] pointer-events-none animate-float-2" />
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-[#E5D4A8]/30 blur-[0.5px] pointer-events-none animate-float-3" />
        </div>

        {/* Live Camera Viewfinder HUD (Top Right) */}
        <div className="absolute top-8 right-4 sm:right-6 md:right-10 lg:right-14 z-20 hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#A5A8B2]">
          <span className="w-2 h-2 rounded-full bg-[#D0232B] animate-ping" />
          <span className="text-[#D0232B] font-bold">REC ● 00:24:16:08</span>
          <span className="text-[#4E525E]">|</span>
          <span className="text-white">4K DCI • 24 FPS</span>
        </div>

        {/* Hero Left Content */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 my-auto py-8">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-5"
          >
            
            {/* Red Accent Pill: — MACTS — */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#D0232B]"></span>
              <span className="text-[#D0232B] text-xs uppercase tracking-[0.2em] font-bold">
                MACTS
              </span>
              <span className="w-5 h-[2px] bg-[#D0232B]"></span>
            </div>

            {/* Main Headline (Responsive Sizing) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[66px] font-black tracking-tight uppercase leading-[1.08] font-display text-white">
              LEARN CINEMA.<br />
              UNDERSTAND THE CRAFT.<br />
              <span className="text-[#C9A45C] text-glow-gold">CREATE THE FUTURE.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-[#A5A8B2] leading-relaxed max-w-xl">
              A professional learning platform by MoonInRed for aspiring filmmakers and cinema technicians.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#A61A20] hover:bg-[#D0232B] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-red-950/40 hover:shadow-red-700/50 hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white" />
                <span>Explore Courses</span>
              </Link>

              <Link
                to="/workshops"
                className="inline-flex items-center justify-center px-6 py-3 rounded bg-black/50 hover:bg-[#14161E] border border-[#30333E] hover:border-[#C9A45C]/50 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all hover:scale-[1.02]"
              >
                Join a Workshop
              </Link>
            </div>

          </motion.div>
        </div>

        {/* Highlights Row (Under Hero) */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#181A22]">
            
            {/* 1. Live Masterclasses */}
            <div className="flex items-center gap-3">
              <Clapperboard className="w-6 h-6 text-[#C9A45C] shrink-0 stroke-[1.5]" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">Live Masterclasses</h4>
                <p className="text-[10px] sm:text-[11px] text-[#868A94]">Learn from industry professionals</p>
              </div>
            </div>

            {/* 2. Technical Education */}
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-[#C9A45C] shrink-0 stroke-[1.5]" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">Technical Education</h4>
                <p className="text-[10px] sm:text-[11px] text-[#868A94]">Hands-on cinema learning</p>
              </div>
            </div>

            {/* 3. Industry Workshops */}
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-[#C9A45C] shrink-0 stroke-[1.5]" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">Industry Workshops</h4>
                <p className="text-[10px] sm:text-[11px] text-[#868A94]">Practical & business insights</p>
              </div>
            </div>

            {/* 4. Industry Interaction */}
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-[#C9A45C] shrink-0 stroke-[1.5]" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white tracking-wide">Industry Interaction</h4>
                <p className="text-[10px] sm:text-[11px] text-[#868A94]">Connect, learn & collaborate</p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 2. EXPLORE OUR COURSES (Full-Width Responsive Grid)            */}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 bg-[#07080A] w-full">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-4 h-[2px] bg-[#D0232B]"></span>
                <span className="text-[#D0232B] text-[11px] uppercase tracking-widest font-bold">
                  EXPLORE OUR
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display uppercase text-white">
                COURSES
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="w-5 h-[2px] bg-[#D0232B] hidden sm:block"></span>
                <p className="text-xs sm:text-[13px] text-[#8E929E] max-w-md leading-relaxed">
                  Industry-oriented diploma programmes designed for aspiring filmmakers and cinema professionals via live interactive Zoom masterclasses.
                </p>
              </div>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#0D0F14] hover:bg-[#151820] border border-[#262934] px-4 py-2 rounded transition-colors shrink-0"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Diploma in\nFilm Making',
                slug: 'diploma-in-film-making',
                duration: '3 Months',
                image: '/assets/course_film_making.jpg',
                icon: Clapperboard
              },
              {
                title: 'Diploma in\nMovie Editing',
                slug: 'diploma-in-movie-editing',
                duration: '3 Months',
                image: '/assets/course_movie_editing.jpg',
                icon: Film
              },
              {
                title: 'Diploma in\nCinematography',
                slug: 'diploma-in-cinematography',
                duration: '3 Months',
                image: '/assets/course_cinematography.jpg',
                icon: Camera
              },
              {
                title: 'Diploma in\nFilm Production',
                slug: 'diploma-in-film-production',
                duration: '3 Months',
                image: '/assets/course_film_production.jpg',
                icon: GearIcon
              }
            ].map((course, idx) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="rounded-xl overflow-hidden bg-gradient-to-b from-[#13151A] via-[#1A0B0D] to-[#2B0E11] border border-[#3A1417] hover:border-[#C9A45C]/90 hover:shadow-[0_0_35px_rgba(201,164,92,0.22)] transition-all duration-300 flex flex-col justify-between group shadow-xl relative"
                >
                  {/* Anamorphic Specular Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20" />

                  {/* Image */}
                  <div className="relative h-52 sm:h-56 lg:h-48 xl:h-56 w-full overflow-hidden bg-black">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150B0D] via-transparent to-transparent" />
                    
                    {/* Live Zoom Class Viewfinder Badge */}
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-blue-500/40 text-[9px] font-bold text-blue-200 flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                      <span className="font-mono">Zoom Masterclass</span>
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                    <div>
                      {/* Icon */}
                      <Icon className="w-5 h-5 text-[#C9A45C] mb-2.5 stroke-[1.5] group-hover:scale-110 group-hover:text-[#F3D18B] transition-transform" />

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-wide font-display whitespace-pre-line leading-tight group-hover:text-[#FFF5DC] transition-colors">
                        {course.title}
                      </h3>
                    </div>

                    {/* Bottom Row: Duration & Circle Arrow Button */}
                    <div className="mt-5 pt-3 border-t border-[#3B1418] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#A5A8B2]">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                        <span>{course.duration}</span>
                      </div>

                      <Link
                        to={`/courses/${course.slug}`}
                        className="w-7 h-7 rounded-full border border-[#8B2228] text-[#D0232B] group-hover:border-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-black flex items-center justify-center transition-all duration-300"
                        aria-label={`View ${course.title}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. UPCOMING WORKSHOP BANNER (Responsive Full-Width)            */}
      {/* ============================================================== */}
      <section className="py-6 bg-[#07080A] w-full">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden border border-[#4D1519] hover:border-[#D0232B]/80 bg-gradient-to-r from-[#18080B] via-[#100608] to-[#0A070B] p-6 sm:p-10 shadow-2xl transition-all duration-500 group"
          >
            {/* Ambient Breathing Gold Flare */}
            <div className="absolute -top-24 right-1/4 w-[450px] h-[450px] bg-[#C9A45C]/10 rounded-full blur-[120px] pointer-events-none animate-studio-pulse" />
            
            {/* Film strip border graphic on right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/4 opacity-20 pointer-events-none hidden md:block">
              <div className="w-full h-full bg-[radial-gradient(#D0232B_1.5px,transparent_1.5px)] [background-size:14px_14px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Image with Hover Zoom */}
              <div className="lg:col-span-5 rounded-xl overflow-hidden border border-[#3A1417] group-hover:border-[#C9A45C]/50 aspect-video sm:aspect-[16/10] bg-black shadow-xl transition-all duration-500">
                <img
                  src="/assets/workshop_editor.jpg"
                  alt="Editor Kalaivanan editing feature film in workstation"
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-106 transition-transform duration-700"
                />
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 space-y-3.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#E52E36] uppercase block">
                  UPCOMING WORKSHOP
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-display uppercase group-hover:text-[#FFF8E7] transition-colors">
                  FILM EDITING WORKSHOP<br />
                  <span className="text-xl sm:text-2xl font-semibold text-[#D4A359]">By Editor Kalaivanan</span>
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#E52E36]" />
                    <span>December 2026</span>
                  </div>
                  <span>•</span>
                  <span className="text-blue-400 font-mono text-[11px] sm:text-xs bg-blue-950/60 border border-blue-800 px-2.5 py-0.5 rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    Live via Zoom + Interactive Screen Share
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#A5A8B2] leading-relaxed max-w-xl">
                  A focused, hands-on workshop on the art and craft of film editing with renowned editor Kalaivanan conducted live on Zoom.
                </p>

                <div className="pt-2">
                  <Link
                    to="/workshops/film-editing-workshop-kalaivanan/register"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#B81D24] hover:bg-[#D0232B] hover:shadow-[0_0_25px_rgba(208,35,43,0.5)] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all hover:scale-[1.02]"
                  >
                    <span>Register for Workshop</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. OUR MENTORS (Responsive Full-Width Grid)                    */}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 bg-[#07080A] w-full">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header Column */}
            <div className="lg:col-span-3 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D0232B] block">
                OUR
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display uppercase text-white leading-tight">
                MENTORS
              </h2>
              <p className="text-xs sm:text-sm text-[#8E929E] leading-relaxed pr-2">
                Learn directly from experienced directors, producers, writers, editors and cinema technicians from the film industry.
              </p>
            </div>

            {/* Right 4 Mentor Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  id: '1',
                  image: '/assets/extracted/mentor_kalaivanan.jpg',
                  alt: 'Editor Kalaivanan',
                  role: 'Chief Film Editor'
                },
                {
                  id: '2',
                  image: '/assets/extracted/mentor_balaji.jpg',
                  alt: 'Cinematographer Balaji',
                  role: 'Director of Photography'
                },
                {
                  id: '3',
                  image: '/assets/extracted/mentor_arvind.jpg',
                  alt: 'Screenwriter Arvind',
                  role: 'Narrative Director'
                },
                {
                  id: '4',
                  image: '/assets/extracted/mentor_vigneshwar.jpg',
                  alt: 'Producer Vigneshwar',
                  role: 'Executive Producer'
                }
              ].map((mentor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="rounded-xl overflow-hidden bg-[#101217] border border-[#22252E] hover:border-[#C9A45C]/80 hover:shadow-[0_0_25px_rgba(201,164,92,0.2)] aspect-[4/3] sm:aspect-square group relative shadow-lg transition-all duration-300"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.alt}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-108 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 transform translate-y-1 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[11px] font-bold text-white tracking-wide truncate">{mentor.alt}</p>
                    <span className="text-[8.5px] font-mono text-[#C9A45C] uppercase tracking-wider block">{mentor.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PREVIOUS CLASSES / STUDENT TESTIMONIALS / GALLERY ROW       */}
      {/* ============================================================== */}
      <section className="py-8 bg-[#07080A] w-full">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. PREVIOUS CLASSES */}
            <div className="rounded-xl bg-[#0E1015] border border-[#1E212B] p-6 flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-4 h-4 text-[#C9A45C]" />
                <h3 className="text-xs font-bold tracking-wider uppercase text-white font-display">
                  PREVIOUS CLASSES
                </h3>
                <span className="w-8 h-[1px] bg-[#C9A45C]/60 ml-1"></span>
              </div>

              {/* Exact auditorium photo with play overlay */}
              <div
                onClick={() => setVideoModalOpen(true)}
                className="relative rounded-lg overflow-hidden h-48 sm:h-52 bg-black cursor-pointer group"
              >
                <img
                  src="/assets/extracted/previous_classes.jpg"
                  alt="MACTS Class Session"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing radar sonar wave */}
                    <span className="absolute -inset-2 rounded-full border border-white/40 animate-ping pointer-events-none" />
                    <div className="w-12 h-12 rounded-full border border-white/60 bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-115 group-hover:bg-[#D0232B] group-hover:border-[#D0232B] transition-all duration-300 shadow-2xl">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. STUDENT TESTIMONIALS */}
            <div className="rounded-xl bg-[#0E1015] border border-[#1E212B] p-6 flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#C9A45C] font-black text-sm">“</span>
                <h3 className="text-xs font-bold tracking-wider uppercase text-white font-display">
                  STUDENT TESTIMONIALS
                </h3>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="space-y-3 flex-1">
                  <p className="text-xs sm:text-sm text-[#D0D3DB] italic leading-relaxed">
                    “The sessions were practical, insightful and truly inspiring. MACTS gave me clarity and confidence in my film journey.”
                  </p>
                  <p className="text-xs font-semibold text-[#D4A359]">
                    – MACTS Student
                  </p>
                </div>

                {/* Exact Student Silhouette on right */}
                <div className="w-20 sm:w-24 h-24 sm:h-28 rounded overflow-hidden shrink-0 bg-black/50 border border-[#22252E]">
                  <img
                    src="/assets/extracted/testimonial_student.jpg"
                    alt="Student silhouette"
                    className="w-full h-full object-cover filter contrast-125"
                  />
                </div>
              </div>
            </div>

            {/* 3. GALLERY */}
            <div className="rounded-xl bg-[#0E1015] border border-[#1E212B] p-6 flex flex-col justify-between shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-4 h-4 text-[#C9A45C]" />
                <h3 className="text-xs font-bold tracking-wider uppercase text-white font-display">
                  GALLERY
                </h3>
              </div>

              {/* Exact 6-thumbnail grid */}
              <div className="h-48 sm:h-52 rounded-lg overflow-hidden border border-[#22252E] bg-black">
                <img
                  src="/assets/extracted/gallery_grid.jpg"
                  alt="MACTS Cinema Gallery"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. ABOUT MACTS STRIP (Full-Width Responsive)                   */}
      {/* ============================================================== */}
      <section className="py-10 bg-[#090B0F] border-t border-[#151720] w-full">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Film Reel Graphic & Brand Header */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 shrink-0 rounded-full overflow-hidden flex items-center justify-center p-1 bg-black/40 border border-[#30333E] shadow-xl">
                <img
                  src="/assets/extracted/film_reel.jpg"
                  alt="35mm Cinema Film Reel"
                  className="w-full h-full object-contain filter contrast-125 animate-spin-slow"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs tracking-[0.15em] font-bold text-[#D0232B] uppercase block">
                  ABOUT MACTS
                </span>
                <h3 className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white font-display uppercase">
                  MOONINRED ACADEMY OF<br className="hidden sm:block" /> CINEMA TECHNICAL STUDIES
                </h3>
              </div>
            </div>

            {/* Description and Know More Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:max-w-2xl">
              <p className="text-xs sm:text-sm text-[#8E929E] leading-relaxed">
                An educational initiative by MoonInRed, created to bring the knowledge and experience of the film industry closer to aspiring filmmakers and cinema professionals via live interactive Zoom masterclasses.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded border border-[#8E7340] text-[#D4A359] hover:bg-[#8E7340] hover:text-black text-xs font-semibold tracking-wide transition-all shrink-0"
              >
                <span>Know More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0E1015] border border-[#2B2F3D] rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E212B] pb-3">
              <h4 className="text-sm font-bold text-white uppercase font-display">
                Zoom Masterclass Session Highlights
              </h4>
              <button onClick={() => setVideoModalOpen(false)} className="text-[#8E929E] hover:text-white">✕</button>
            </div>
            <div className="aspect-video bg-black rounded flex items-center justify-center text-center p-6">
              <div className="space-y-2">
                <Film className="w-10 h-10 text-[#D0232B] mx-auto" />
                <h5 className="text-base font-bold text-white font-display">Live Zoom Class Session Archive</h5>
                <p className="text-xs text-[#8E929E] max-w-sm mx-auto">
                  Enrolled students receive Zoom credentials and complete access to HD recording archives.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
