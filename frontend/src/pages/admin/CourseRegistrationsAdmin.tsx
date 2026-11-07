import React, { useState, useEffect } from 'react';
import { Search, Download, CheckCircle, XCircle, Eye, Clock, Phone, Mail, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';

export const CourseRegistrationsAdmin: React.FC = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReg, setSelectedReg] = useState<any>(null);

  const fetchRegistrations = () => {
    setLoading(true);
    api.get('/admin/course-registrations')
      .then((res) => {
        if (res.data.success) {
          setRegistrations(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleUpdateStatus = async (id: string, paymentStatus: string, regStatus: string) => {
    try {
      await api.put(`/admin/course-registrations/${id}/status`, {
        payment_status: paymentStatus,
        registration_status: regStatus
      });
      fetchRegistrations();
      if (selectedReg && selectedReg.id === id) {
        setSelectedReg((prev: any) => ({
          ...prev,
          payment_status: paymentStatus,
          registration_status: regStatus
        }));
      }
    } catch (err) {
      alert('Failed to update registration status');
    }
  };

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['Registration Number', 'Name', 'Course', 'Email', 'Mobile', 'WhatsApp', 'City', 'Status', 'Payment Status', 'Transaction ID', 'Date'];
    const rows = registrations.map((r) => [
      r.registration_number,
      `"${r.full_name}"`,
      `"${r.course_title}"`,
      r.email,
      r.mobile,
      r.whatsapp,
      r.city,
      r.registration_status,
      r.payment_status,
      r.transaction_id || '',
      new Date(r.created_at).toLocaleDateString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MACTS_Course_Registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch = 
      r.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      r.registration_number?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || r.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            Course Registrations & Admissions
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Review student applications, verify manual UPI payments, inspect screenshots, and export student records.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#181B24] hover:bg-[#202532] border border-[#2E3240] text-xs font-semibold text-white transition-colors"
        >
          <Download className="w-4 h-4 text-[#C9A45C]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#111319] p-4 rounded-xl border border-[#222530]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71747D] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, email or Reg ID..."
            className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C52222]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          {['ALL', 'MANUAL_REVIEW', 'SUCCESS', 'PENDING'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#A31D1D] text-white'
                  : 'bg-[#181B24] text-[#8E929E] hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#111319] border border-[#222530] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A5A7AD]">
            <thead className="bg-[#0D0F15] text-[#C9A45C] uppercase text-[10px] tracking-wider border-b border-[#1E212B]">
              <tr>
                <th className="py-3 px-4">Reg Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Course Enrolled</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D27]">
              {filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-[#141721] transition-colors">
                  <td className="py-3 px-4 font-mono text-[#E8D6A8]">{reg.registration_number}</td>
                  <td className="py-3 px-4 font-bold text-white font-serif">{reg.full_name}</td>
                  <td className="py-3 px-4">{reg.course_title}</td>
                  <td className="py-3 px-4">
                    <span className="block text-white">{reg.mobile}</span>
                    <span className="text-[11px] text-[#71747D]">{reg.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      reg.payment_status === 'SUCCESS'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : reg.payment_status === 'MANUAL_REVIEW'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}>
                      {reg.payment_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedReg(reg)}
                      className="px-3 py-1.5 rounded bg-[#1C202B] hover:bg-[#252A38] text-white text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#111319] border border-[#2B2F3D] rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#1E212B] pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C9A45C]">
                  REGISTRATION RECORD
                </span>
                <h3 className="text-lg font-bold font-serif text-white uppercase">
                  {selectedReg.full_name}
                </h3>
              </div>
              <button onClick={() => setSelectedReg(null)} className="text-[#8E929E] hover:text-white">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#0D0F15] border border-[#1E212B]">
                <span className="text-[#71747D] block">Reg Number</span>
                <span className="font-mono text-white font-bold">{selectedReg.registration_number}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0D0F15] border border-[#1E212B]">
                <span className="text-[#71747D] block">Course Title</span>
                <span className="text-[#C9A45C] font-semibold">{selectedReg.course_title}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0D0F15] border border-[#1E212B]">
                <span className="text-[#71747D] block">Mobile / WhatsApp</span>
                <span className="text-white">{selectedReg.mobile} / {selectedReg.whatsapp}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0D0F15] border border-[#1E212B]">
                <span className="text-[#71747D] block">Email / City</span>
                <span className="text-white">{selectedReg.email} ({selectedReg.city})</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0D0F15] border border-[#1E212B]">
                <span className="text-[#71747D] block">Current Status & Experience</span>
                <span className="text-white">{selectedReg.current_status} • Projects: {selectedReg.project_experience}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0D0F15] border border-[#1E212B]">
                <span className="text-[#71747D] block">Payment Method & UTR</span>
                <span className="text-white font-mono">{selectedReg.payment_method} ({selectedReg.transaction_id || 'N/A'})</span>
              </div>
            </div>

            {/* Uploaded Payment Screenshot if present */}
            {selectedReg.payment_screenshot_url && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#E8D6A8] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" /> Uploaded Payment Screenshot:
                </span>
                <div className="rounded-xl overflow-hidden border border-[#2B2F3D] max-h-60 bg-black">
                  <img
                    src={selectedReg.payment_screenshot_url}
                    alt="Payment Screenshot"
                    className="w-full object-contain max-h-60"
                  />
                </div>
              </div>
            )}

            {/* Status Change Controls */}
            <div className="pt-4 border-t border-[#1E212B] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#8E929E]">
                Payment Status: <strong className="text-white">{selectedReg.payment_status}</strong>
              </span>

              <div className="flex items-center gap-2">
                {selectedReg.payment_status !== 'SUCCESS' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedReg.id, 'SUCCESS', 'CONFIRMED')}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve & Verify Payment</span>
                  </button>
                )}

                {selectedReg.payment_status !== 'REJECTED' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedReg.id, 'REJECTED', 'REJECTED')}
                    className="px-4 py-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

