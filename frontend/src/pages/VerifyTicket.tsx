import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Clapperboard, Calendar, Clock, MapPin, User, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const VerifyTicket: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (token) {
      api.get(`/tickets/verify/${token}`)
        .then((res) => {
          if (res.data.success && res.data.valid) {
            setIsValid(true);
            setTicket(res.data.data);
          } else {
            setIsValid(false);
          }
        })
        .catch(() => {
          setIsValid(false);
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  if (loading) {
    return (
      <div className="bg-[#08090C] text-white min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C52222] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#08090C] text-white py-20 min-h-screen px-4">
      <div className="max-w-xl mx-auto">
        
        {isValid ? (
          <div className="rounded-2xl bg-[#111319] border border-emerald-500/40 p-8 space-y-6 shadow-2xl text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-400 uppercase">
                AUTHENTIC & VERIFIED ADMISSION PASS
              </span>
              <h1 className="text-2xl font-bold font-serif text-white uppercase mt-1">
                Valid MACTS Workshop Entry
              </h1>
            </div>

            <div className="p-6 rounded-xl bg-[#0D0F15] border border-[#232734] text-left space-y-3.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#1E212B]">
                <span className="text-[#8E929E]">Pass Number</span>
                <span className="font-mono font-bold text-[#E8D6A8]">{ticket?.ticket_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E929E]">Participant</span>
                <span className="font-bold text-white font-serif text-sm">{ticket?.participant_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E929E]">Workshop Event</span>
                <span className="font-semibold text-white">{ticket?.workshop_title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E929E]">Mentor</span>
                <span className="text-[#C9A45C]">{ticket?.mentor_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E929E]">Date & Time</span>
                <span className="text-white">{ticket?.event_date} • {ticket?.start_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E929E]">Venue</span>
                <span className="text-white">{ticket?.venue}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#1E212B]">
                <span className="text-[#8E929E]">Verification Timestamp</span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  {ticket?.verified_at ? new Date(ticket.verified_at).toLocaleString() : 'Live Check-in'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#71747D]">
              Verified by MoonInRed Academy of Cinema Technical Studies Admissions System.
            </div>

          </div>
        ) : (
          <div className="rounded-2xl bg-[#111319] border border-red-500/40 p-8 space-y-6 shadow-2xl text-center">
            
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
              <XCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold font-serif text-white uppercase">
                Invalid or Unverified Pass
              </h1>
              <p className="text-xs text-[#A5A7AD]">
                This QR verification token is not recognised by the MACTS ticketing registry. Please verify the code or contact admissions.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/"
                className="px-6 py-2.5 rounded-md bg-[#1C202B] hover:bg-[#252A38] text-xs font-semibold text-white transition-colors"
              >
                Return to MACTS Homepage
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

