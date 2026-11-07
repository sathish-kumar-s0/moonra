import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard, Film, Sparkles, Target, Compass, Award, Users, Camera, ArrowRight, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export const AboutUs: React.FC = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    api.get('/gallery')
      .then((res) => {
        if (res.data.success) {
          setGallery(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ['ALL', 'Workshops', 'Masterclasses', 'Film Production', 'Behind the Scenes'];

  const filteredGallery = activeCategory === 'ALL'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#08090C] text-white min-h-screen pb-20 selection:bg-[#C52222]">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-b from-[#131620] via-[#0D0F15] to-[#08090C] border-b border-[#1C202B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#C52222]"></span>
              <span className="text-[#C52222] text-xs uppercase tracking-widest font-bold">
                ABOUT MACTS
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif uppercase text-white leading-tight">
              Learn Cinema. Understand the Craft. Create the Future.
            </h1>

            <p className="text-sm sm:text-base text-[#A5A7AD] leading-relaxed pt-2">
              MACTS (MoonInRed Academy of Cinema Technical Studies) is an educational initiative by MoonInRed, created with a vision to bring the knowledge and experience of the film industry closer to aspiring filmmakers and cinema professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy & Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-sm text-[#A5A7AD] leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white uppercase">
              Where Cinema Knowledge Meets Industry Experience
            </h2>
            <p>
              Cinema is an art that brings together creativity, technology, storytelling and teamwork. Behind every remarkable film is a dedicated team of directors, writers, producers, cinematographers, editors, technicians and countless creative professionals.
            </p>
            <p>
              At MACTS, we believe that understanding cinema requires more than theoretical knowledge. It requires exposure to real industry experiences, practical insights and learning directly from the people who work behind the screen.
            </p>
            <p>
              Through live masterclasses, interactive workshops and expert-led learning sessions, MACTS aims to create a platform where knowledge meets opportunity and passion develops into professional understanding.
            </p>

            <div className="pt-2">
              <a
                href="https://www.mooninred.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#C9A45C] text-[#E8D6A8] hover:bg-[#C9A45C] hover:text-black text-xs font-semibold tracking-wide transition-all"
              >
                <span>Visit MoonInRed Parent Brand</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#2B2F3D] shadow-2xl aspect-[4/3] bg-black">
            <img
              src="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=800&q=80"
              alt="Cinema production camera set"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-serif text-[#E8D6A8] italic">
                "Every filmmaker has a story to tell, and every cinema technician has a craft worth mastering."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="bg-[#0B0D12] py-16 border-t border-b border-[#1A1D27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <div className="p-8 rounded-2xl bg-[#111319] border border-[#222530] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#220D0D] border border-[#521313] flex items-center justify-center text-[#C52222]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif uppercase tracking-wide text-white">
                Our Vision
              </h3>
              <p className="text-xs sm:text-sm text-[#A5A7AD] leading-relaxed">
                To become a respected learning destination for cinema education, nurturing the next generation of filmmakers and empowering cinema technicians with the knowledge, skills and industry exposure needed to grow in their chosen fields.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 rounded-2xl bg-[#111319] border border-[#222530] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1F190D] border border-[#483918] flex items-center justify-center text-[#C9A45C]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif uppercase tracking-wide text-white">
                Our Mission
              </h3>
              <ul className="space-y-2 text-xs text-[#A5A7AD] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#C52222] font-bold">•</span> Provide industry-oriented filmmaking education.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C52222] font-bold">•</span> Encourage creativity, storytelling and technical excellence.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C52222] font-bold">•</span> Bridge the gap between theoretical learning and practical filmmaking.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C52222] font-bold">•</span> Recognize and support the contributions of cinema technicians.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* What We Offer (4 Pillars) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-white">
            What We Offer
          </h2>
          <p className="text-xs sm:text-sm text-[#8E929E]">
            A complete ecosystem dedicated to cinema mastery and professional technician empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-xl bg-[#111319] border border-[#222530] space-y-3">
            <Clapperboard className="w-6 h-6 text-[#C52222]" />
            <h4 className="text-base font-bold text-white font-serif">Live Masterclasses</h4>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Learn directly from established directors, producers, writers and technicians through interactive online sessions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111319] border border-[#222530] space-y-3">
            <Camera className="w-6 h-6 text-[#C9A45C]" />
            <h4 className="text-base font-bold text-white font-serif">Technical Education</h4>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Explore the technical crafts of filmmaking, including cinematography, editing, sound design, direction and production.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111319] border border-[#222530] space-y-3">
            <Users className="w-6 h-6 text-[#C52222]" />
            <h4 className="text-base font-bold text-white font-serif">Industry Workshops</h4>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Gain practical insights into storytelling, pitching, production planning, distribution and the business of cinema.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111319] border border-[#222530] space-y-3">
            <Sparkles className="w-6 h-6 text-[#C9A45C]" />
            <h4 className="text-base font-bold text-white font-serif">Industry Interaction</h4>
            <p className="text-xs text-[#8E929E] leading-relaxed">
              Create opportunities for learners to engage with cinema professionals and understand real-world filmmaking experiences.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Gallery Section */}
      <section className="py-16 bg-[#0B0D12] border-t border-[#1A1D27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C52222] uppercase">
                CAMPUS & ON-SET MOMENTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-white mt-1">
                MACTS Cinema Gallery
              </h2>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#C52222] text-white'
                      : 'bg-[#181B24] text-[#A5A7AD] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden bg-black border border-[#222530] aspect-[4/3]"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-[#C9A45C] tracking-wider">
                    {item.category}
                  </span>
                  <h5 className="text-sm font-bold text-white font-serif">{item.title}</h5>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

