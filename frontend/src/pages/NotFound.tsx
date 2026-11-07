import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Home, BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
  const [countdown, setCountdown] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/', { replace: true });
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#07080A] px-4 py-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D0232B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-8">
        
        {/* Film Clapperboard Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1C0D0F] to-[#0D0507] border border-[#D0232B]/40 shadow-2xl shadow-[#D0232B]/20 animate-pulse">
          <Film className="w-10 h-10 text-[#D0232B]" />
        </div>

        {/* 404 Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18090B] border border-[#521318] text-[#E52E36] text-xs font-mono font-bold tracking-widest uppercase">
            TAKE 404 • CUT
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            SCENE NOT FOUND
          </h1>
          <p className="text-sm sm:text-base text-[#9A9DA8] max-w-md mx-auto leading-relaxed">
            The reel or page you are looking for has been cut from the final edit, moved to another soundstage, or does not exist.
          </p>
        </div>

        {/* Redirect timer pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141A] border border-[#232734] text-xs text-[#A5A7AD]">
          <span>Redirecting to home stage in</span>
          <span className="font-mono font-bold text-[#C9A45C] bg-[#1C1F2A] px-2 py-0.5 rounded">
            {countdown}s
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D0232B] hover:bg-[#B51E25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#D0232B]/30"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#12141A] hover:bg-[#1A1D27] text-white border border-[#2B2F3D] font-bold text-xs uppercase tracking-wider transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#C9A45C]" />
            <span>Explore Courses</span>
          </Link>
          <Link
            to="/workshops"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#12141A] hover:bg-[#1A1D27] text-white border border-[#2B2F3D] font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Calendar className="w-4 h-4 text-[#D0232B]" />
            <span>Workshops</span>
          </Link>
        </div>

        {/* Support note */}
        <p className="text-[11px] text-[#636775]">
          Need help finding an admission form or course syllabus?{' '}
          <Link to="/contact" className="text-[#C9A45C] hover:underline inline-flex items-center gap-1">
            <span>Contact MACTS Desk</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </p>

      </div>
    </div>
  );
};

