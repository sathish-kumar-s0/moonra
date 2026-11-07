import React, { useEffect, useState } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, QrCode, Mail, MessageCircle, ArrowRight, Clapperboard, Calendar } from 'lucide-react';
import { api } from '../services/api';

export const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const stateData = location.state || {};
  
  const ticketId = stateData.ticketId || searchParams.get('ticketId') || 'demo-ticket';
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C52222', '#C9A45C', '#FFFFFF', '#E8D6A8']
      });
    } catch {}

    if (ticketId && ticketId !== 'demo-ticket') {
      api.get(`/tickets/${ticketId}`)
        .then((res) => {
          if (res.data.success) {
            setTicket(res.data.data);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [ticketId]);

  const handleDownloadTicket = () => {
    if (ticket?.id || ticketId) {
      window.open(`/api/tickets/${ticket?.id || ticketId}/download`, '_blank');
    }
  };

  return (
    <div className="bg-[#08090C] text-white py-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Success Card Container */}
        <div className="rounded-2xl bg-[#111319] border border-[#2B2F3D] overflow-hidden shadow-2xl p-6 sm:p-10 space-y-8 text-center">
          
          {/* Checkmark Badge */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
              OFFICIAL PAYMENT CONFIRMED
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-white">
              Your Admission Pass is Issued!
            </h1>
            <p className="text-xs sm:text-sm text-[#A5A7AD] max-w-md mx-auto">
              Thank you for registering. Your payment has been verified on the server and your unique workshop pass has been generated.
            </p>
          </div>

          {/* Ticket Information Box */}
          <div className="p-6 rounded-xl bg-[#0D0F15] border border-[#232734] text-left space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1D27]">
              <div>
                <span className="text-[10px] text-[#71747D] uppercase tracking-wider block">Participant</span>
                <span className="text-sm font-bold text-white font-serif">
                  {ticket?.participant_name || stateData.participantName || 'Registered Student'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#71747D] uppercase tracking-wider block">Pass Number</span>
                <span className="text-xs font-mono font-bold text-[#E8D6A8]">
                  {ticket?.ticket_number || stateData.ticketNumber || 'MACTS-TKT-2026'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#A5A7AD]">
              <div className="flex justify-between">
                <span className="text-[#71747D]">Event Workshop</span>
                <span className="font-semibold text-white">
                  {ticket?.workshop_title || stateData.workshopTitle || 'Film Editing Workshop'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71747D]">Mentor</span>
                <span className="text-[#C9A45C]">{ticket?.mentor_name || 'Editor Kalaivanan'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71747D]">Date & Time</span>
                <span className="text-white">{ticket?.event_date || 'December 2026'} • 10:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71747D]">Venue / Stream</span>
                <span className="text-white">{ticket?.venue || 'MACTS Studio (Chennai & Online)'}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#71747D]">Payment Status</span>
                <span className="font-semibold text-emerald-400">VERIFIED & CONFIRMED</span>
              </div>
            </div>

          </div>

          {/* Automated Delivery Notices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-lg bg-[#141721] border border-[#202431] flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#C9A45C] shrink-0" />
              <div className="text-[11px]">
                <span className="font-semibold text-white block">Email Sent</span>
                <span className="text-[#71747D]">PDF ticket dispatched to email</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141721] border border-[#202431] flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
              <div className="text-[11px]">
                <span className="font-semibold text-white block">WhatsApp Notification</span>
                <span className="text-[#71747D]">Pass PDF forwarded to WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDownloadTicket}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-red-950/60"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Pass</span>
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#181B24] hover:bg-[#202431] border border-[#2E3240] text-xs sm:text-sm font-semibold text-white transition-colors"
            >
              <span>Return Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Verification link info */}
          <p className="text-[11px] text-[#71747D] pt-2">
            Your pass contains an embedded cryptographic QR code for seamless venue entry verification.
          </p>

        </div>

      </div>
    </div>
  );
};

