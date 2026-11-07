import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Clapperboard, Award, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

export const Workshops: React.FC = () => {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/workshops')
      .then((res) => {
        if (res.data.success) {
          setWorkshops(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#08090C] text-white py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#C52222]"></span>
            <span className="text-[#C52222] text-xs uppercase tracking-widest font-bold">
              INDUSTRY MASTERCLASSES
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-serif uppercase">
            Cinema Workshops & Masterclasses
          </h1>
          <p className="text-sm sm:text-base text-[#A5A7AD] leading-relaxed">
            Learn directly from experienced cinema professionals. Gain practical, real-world knowledge of pacing, lighting, multi-cam setups and script pitching through intensive weekend masterclasses.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="space-y-12">
          {workshops.map((ws) => {
            const seatsLeft = Math.max(0, (ws.seat_capacity || 50) - (ws.booked_seats || 0));
            return (
              <div
                key={ws.id}
                className="rounded-2xl bg-[#111319] border border-[#2B2F3D] hover:border-[#C52222]/70 overflow-hidden shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Banner / Media */}
                <div className="lg:col-span-5 relative min-h-[260px] bg-black overflow-hidden">
                  <img
                    src={ws.banner_url || '/assets/workshop_editor.jpg'}
                    alt={ws.title}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111319]" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C52222] text-white">
                      Monthly Featured Session
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-900/80 text-blue-200 border border-blue-700/60">
                      Live Zoom Class
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#C9A45C]">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-4 h-4 text-[#C52222]" /> {ws.month || 'December 2026'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#C52222]" /> {ws.start_time} - {ws.end_time || '5:00 PM'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#C52222]" /> {ws.venue_or_online_details || 'MACTS Studio (Chennai & Online)'}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif uppercase tracking-tight">
                      {ws.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#A5A7AD] leading-relaxed">
                      {ws.description}
                    </p>

                    <div className="pt-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1C202B] border border-[#2F3342] flex items-center justify-center text-[#C9A45C]">
                        <Clapperboard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#71747D] block">Mentor & Instructor</span>
                        <span className="text-xs font-bold text-white">{ws.mentor_name || 'Editor Kalaivanan'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Status & Actions */}
                  <div className="pt-6 border-t border-[#1C202B] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#71747D] tracking-wider block">Registration Fee</span>
                      <span className="text-xl font-black text-white font-serif">
                        INR {ws.fee?.toLocaleString() || '1,499'}
                      </span>
                      <span className="text-[11px] text-[#A5A7AD] block mt-0.5">
                        {seatsLeft > 0 ? `${seatsLeft} seats remaining` : 'Housefull'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/workshops/${ws.slug || ws.id}/register`}
                        className="px-6 py-3 rounded-md bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-red-950/60"
                      >
                        Register for Workshop
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

