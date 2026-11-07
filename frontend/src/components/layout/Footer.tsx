import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050608] border-t border-[#15171E] text-[#8E929B] pt-14 pb-8 text-xs">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#15171E]">
          
          {/* Logo & Subtitle */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#D0232B] rounded flex items-center justify-center shrink-0 shadow-lg shadow-red-950/40">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v3h16V6H4zm0 5v7h16v-7H4zm2-3l2-2h3L9 8H6zm6 0l2-2h3l-2 2h-3zm6 0l1.5-1.5.5.5-1 1h-1z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white font-display leading-none">
                  MACTS
                </span>
                <span className="text-[7.5px] font-bold tracking-[0.08em] text-[#8E929B] uppercase leading-tight mt-1">
                  MOONINRED ACADEMY OF<br />CINEMA TECHNICAL STUDIES
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-[12px]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/workshops" className="hover:text-white transition-colors">Workshops</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li>
                <a href="https://www.mooninred.com" target="_blank" rel="noopener noreferrer" className="hover:text-white inline-flex items-center gap-1">
                  <span>MoonInRed</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider">Contact Us</h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <a href="tel:+918870032122" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>+91 88700 32122</span>
                </a>
              </li>
              <li>
                <a href="mailto:mactsofficial@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-white" />
                  <span>mactsofficial@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/Macts_Official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Instagram className="w-3.5 h-3.5 text-white" />
                  <span>Macts_Official</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider">Follow Us</h4>
            <div className="flex items-center space-x-3 text-white">
              <a href="https://instagram.com/Macts_Official" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded border border-[#2B2E38] flex items-center justify-center hover:bg-[#D0232B] hover:border-[#D0232B] transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded border border-[#2B2E38] flex items-center justify-center hover:bg-[#D0232B] hover:border-[#D0232B] transition-colors" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded border border-[#2B2E38] flex items-center justify-center hover:bg-[#D0232B] hover:border-[#D0232B] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#6E727D] gap-3">
          <p>© 2026 MACTS – MoonInRed Academy of Cinema Technical Studies. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-[#A0A3AA]">Privacy Policy</Link>
            <span className="text-[#2B2E38]">|</span>
            <Link to="/terms" className="hover:text-[#A0A3AA]">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
