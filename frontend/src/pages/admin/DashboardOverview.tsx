import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Calendar, IndianRupee, Ticket, AlertCircle, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../services/api';

export const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard/stats')
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-[#C52222] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Enrolled Students',
      value: stats?.totalStudents || 0,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Course Applications',
      value: stats?.totalCourseRegs || 0,
      icon: BookOpen,
      color: 'text-[#C9A45C]',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Workshop Passes Issued',
      value: stats?.totalTickets || 0,
      icon: Ticket,
      color: 'text-[#C52222]',
      bg: 'bg-red-500/10 border-red-500/20'
    },
    {
      title: 'Total Verified Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: IndianRupee,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            MACTS Operations Dashboard
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Real-time admissions, workshop ticketing, and student enrollment metrics.
          </p>
        </div>

        {stats?.pendingManualReviews > 0 && (
          <Link
            to="/admin/course-registrations"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold"
          >
            <Clock className="w-4 h-4" />
            <span>{stats.pendingManualReviews} Pending Payment Verifications</span>
          </Link>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${card.bg} flex items-center justify-between shadow-lg`}
            >
              <div>
                <span className="text-[11px] font-semibold text-[#8E929E] uppercase tracking-wider block">
                  {card.title}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1 block">
                  {card.value}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color} bg-black/40`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tables Row: Recent Registrations & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Course Applications */}
        <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E212B] pb-3">
            <h3 className="text-sm font-bold font-serif uppercase tracking-wider text-white">
              Recent Diploma Applications
            </h3>
            <Link to="/admin/course-registrations" className="text-xs text-[#C9A45C] hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentCourseRegs && stats.recentCourseRegs.length > 0 ? (
              stats.recentCourseRegs.map((reg: any) => (
                <div
                  key={reg.id}
                  className="p-3.5 rounded-xl bg-[#0D0F15] border border-[#1E212B] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{reg.full_name}</span>
                    <span className="text-[11px] text-[#C9A45C]">{reg.course_title}</span>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                      reg.payment_status === 'SUCCESS' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {reg.payment_status}
                    </span>
                    <span className="block text-[10px] text-[#71747D] mt-0.5">
                      {new Date(reg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#71747D] text-center py-4">No recent applications.</p>
            )}
          </div>
        </div>

        {/* Recent Workshop Signups */}
        <div className="rounded-2xl bg-[#111319] border border-[#222530] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E212B] pb-3">
            <h3 className="text-sm font-bold font-serif uppercase tracking-wider text-white">
              Recent Workshop Passes
            </h3>
            <Link to="/admin/workshop-registrations" className="text-xs text-[#C9A45C] hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentWorkshopRegs && stats.recentWorkshopRegs.length > 0 ? (
              stats.recentWorkshopRegs.map((reg: any) => (
                <div
                  key={reg.id}
                  className="p-3.5 rounded-xl bg-[#0D0F15] border border-[#1E212B] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{reg.participant_name}</span>
                    <span className="text-[11px] text-[#8E929E]">{reg.workshop_title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#E8D6A8] block">
                      ₹{reg.amount_paid}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 mt-0.5">
                      PAID
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#71747D] text-center py-4">No recent workshop signups.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

