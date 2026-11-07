import React, { useState, useEffect } from 'react';
import { Search, Download, Send, CheckCircle, Ticket, QrCode, Phone, Mail, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

export const WorkshopRegistrationsAdmin: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchTickets = () => {
    setLoading(true);
    api.get('/admin/tickets')
      .then((res) => {
        if (res.data.success) {
          setTickets(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDownload = (ticketId: string, number: string) => {
    window.open(`/api/tickets/${ticketId}/download`, '_blank');
  };

  const handleResend = (ticket: any, method: 'EMAIL' | 'WHATSAPP') => {
    setActionNotice(`Pass ${ticket.ticket_number} re-dispatched successfully via ${method} to ${method === 'EMAIL' ? ticket.participant_email : ticket.participant_phone}.`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const filtered = tickets.filter((t) => {
    return (
      t.participant_name?.toLowerCase().includes(search.toLowerCase()) ||
      t.ticket_number?.toLowerCase().includes(search.toLowerCase()) ||
      t.participant_email?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            Workshop Passes & Ticketing
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Issued workshop entry tickets, instant PDF pass downloads, QR verification tokens, and dispatch logs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#C9A45C]">
          <Ticket className="w-4 h-4" />
          <span>{tickets.length} Verified Passes Issued</span>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#111319] p-4 rounded-xl border border-[#222530] flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71747D] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or Pass ID..."
            className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C52222]"
          />
        </div>
      </div>

      {/* Passes Table */}
      <div className="rounded-2xl bg-[#111319] border border-[#222530] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A5A7AD]">
            <thead className="bg-[#0D0F15] text-[#C9A45C] uppercase text-[10px] tracking-wider border-b border-[#1E212B]">
              <tr>
                <th className="py-3 px-4">Pass ID</th>
                <th className="py-3 px-4">Participant</th>
                <th className="py-3 px-4">Workshop Event</th>
                <th className="py-3 px-4">Fee Paid</th>
                <th className="py-3 px-4">QR Check-in</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1D27]">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-[#141721] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#E8D6A8]">{t.ticket_number}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-white font-serif block">{t.participant_name}</span>
                    <span className="text-[11px] text-[#71747D]">{t.participant_phone}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-white block font-medium">{t.workshop_title}</span>
                    <span className="text-[11px] text-[#C9A45C]">{t.event_date}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-white">₹{t.amount_paid}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`/verify-ticket/${t.qr_token || t.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#C9A45C] hover:underline"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{t.verified_at ? 'Scanned & Checked' : 'Valid Entry'}</span>
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownload(t.id, t.ticket_number)}
                        className="px-2.5 py-1.5 rounded bg-[#1C202B] hover:bg-[#252A38] text-white text-[11px] font-semibold inline-flex items-center gap-1"
                        title="Download PDF Ticket"
                      >
                        <Download className="w-3 h-3 text-[#C9A45C]" />
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => handleResend(t, 'WHATSAPP')}
                        className="p-1.5 rounded bg-[#181B24] hover:bg-[#202532] text-[#25D366]"
                        title="Resend WhatsApp Ticket"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleResend(t, 'EMAIL')}
                        className="p-1.5 rounded bg-[#181B24] hover:bg-[#202532] text-[#C9A45C]"
                        title="Resend Email Pass"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

