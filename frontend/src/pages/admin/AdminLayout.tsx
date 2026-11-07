import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  Ticket, 
  Camera, 
  Image as GalleryIcon, 
  Quote, 
  Mail, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Clapperboard, 
  Menu, 
  X,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Courses Management', path: '/admin/courses', icon: BookOpen },
    { name: 'Course Registrations', path: '/admin/course-registrations', icon: Users },
    { name: 'Workshops Management', path: '/admin/workshops', icon: Calendar },
    { name: 'Workshop Registrations & Passes', path: '/admin/workshop-registrations', icon: Ticket },
    { name: 'Mentors Management', path: '/admin/mentors', icon: Camera },
    { name: 'Gallery Management', path: '/admin/gallery', icon: GalleryIcon },
    { name: 'Testimonials Management', path: '/admin/testimonials', icon: Quote },
    { name: 'Student Enquiries', path: '/admin/enquiries', icon: Mail },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0D0F15] border-r border-[#1E222D] shrink-0 justify-between">
        <div className="p-6">
          
          {/* Brand */}
          <Link to="/" target="_blank" className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded bg-[#C52222] flex items-center justify-center text-white">
              <Clapperboard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-bold font-serif text-white tracking-wider block">MACTS</span>
              <span className="text-[9px] uppercase tracking-widest text-[#71747D] font-bold">Admin Workspace</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-[#A31D1D] text-white font-semibold shadow-md shadow-red-950/40'
                      : 'text-[#A5A7AD] hover:bg-[#151822] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-[#1C202B] space-y-3">
          <div className="flex items-center justify-between text-xs px-2">
            <div>
              <span className="font-semibold text-white block">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-[#C9A45C] uppercase">{user?.role || 'SUPER_ADMIN'}</span>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#71747D] hover:text-white hover:bg-[#1A1D27]"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#181B24] hover:bg-red-950/50 hover:text-red-400 border border-[#262A37] text-xs font-semibold text-[#A5A7AD] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-[#0B0D12] border-b border-[#1E222D] flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-[#A5A7AD] hover:text-white hover:bg-[#1A1D27]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm sm:text-base font-bold font-serif uppercase tracking-wide text-white">
              MACTS Management Console
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#A5A7AD] hover:text-[#C9A45C] transition-colors"
            >
              <span>Preview Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 lg:hidden flex">
            <div className="w-64 bg-[#0D0F15] h-full p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-white font-serif">MACTS Admin</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded text-xs ${
                          active ? 'bg-[#A31D1D] text-white' : 'text-[#A5A7AD] hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded bg-[#181B24] text-xs text-red-400"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Dynamic Admin Sub-pages */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

