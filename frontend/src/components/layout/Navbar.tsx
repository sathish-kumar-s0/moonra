import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled 
        ? 'bg-[#07080A]/95 backdrop-blur-md border-b border-[#1A1C24] shadow-2xl' 
        : 'bg-[#07080A] border-b border-[#14161C]'
    }`}>
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Subtitle */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {/* Red Clapperboard Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D0232B] rounded flex items-center justify-center shrink-0 shadow-lg shadow-red-900/30">
              <svg className="w-5 h-5 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v3h16V6H4zm0 5v7h16v-7H4zm2-3l2-2h3L9 8H6zm6 0l2-2h3l-2 2h-3zm6 0l1.5-1.5.5.5-1 1h-1z"/>
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-display leading-none">
                MACTS
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.08em] text-[#A5A7AD] uppercase leading-tight mt-1">
                MOONINRED ACADEMY OF<br />CINEMA TECHNICAL STUDIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-1 text-[13px] xl:text-sm font-medium tracking-wide transition-colors ${
                    active ? 'text-white' : 'text-[#A0A3AA] hover:text-white'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-[#D0232B]" />
                  )}
                </Link>
              );
            })}

            {/* MoonInRed External Link */}
            <a
              href="https://www.mooninred.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] xl:text-sm font-medium tracking-wide text-[#A0A3AA] hover:text-white transition-colors"
            >
              <span>MoonInRed</span>
              <span className="text-xs">↗</span>
            </a>

            {/* Apply Now Button */}
            <Link
              to="/courses"
              className="px-5 py-2 rounded border border-[#B38F4E] text-[#D4A359] text-xs font-semibold tracking-wide hover:bg-[#B38F4E] hover:text-black transition-all duration-200"
            >
              Apply Now
            </Link>
          </nav>

          {/* Mobile hamburger menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#A5A7AD] hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0C10] border-b border-[#22252E] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded text-sm ${
                isActive(link.path) ? 'text-white font-bold bg-[#171920]' : 'text-[#A0A3AA]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://www.mooninred.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm text-[#A0A3AA] flex items-center justify-between"
          >
            <span>MoonInRed</span>
            <span>↗</span>
          </a>
          <div className="pt-2">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-xs font-bold rounded bg-[#D0232B] text-white"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
