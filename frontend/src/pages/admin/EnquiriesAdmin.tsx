import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Clock, Phone, MessageSquare } from 'lucide-react';
import { api } from '../../services/api';

export const EnquiriesAdmin: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = () => {
    setLoading(true);
    api.get('/admin/contact')
      .then((res) => {
        if (res.data.success) setEnquiries(res.data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatus = async (id: string, status: string) => {
    await api.put(`/admin/contact/${id}/status`, { status });
    fetchEnquiries();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
          Student Inquiries & Messages
        </h1>
        <p className="text-xs text-[#8E929E] mt-0.5">
          Incoming enquiries submitted through the public contact forms.
        </p>
      </div>

      <div className="space-y-4">
        {enquiries.map((enq) => (
          <div key={enq.id} className="p-5 rounded-2xl bg-[#111319] border border-[#222530] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E212B] pb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-sm font-serif">{enq.name}</span>
                <span className="text-[#C9A45C] font-mono">{enq.phone}</span>
                <span className="text-[#8E929E]">{enq.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  enq.status === 'REPLIED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {enq.status}
                </span>
                <span className="text-[11px] text-[#71747D]">
                  {new Date(enq.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#E8D6A8] mb-1">Subject: {enq.subject}</h4>
              <p className="text-xs text-[#A5A7AD] leading-relaxed bg-[#0D0F15] p-3 rounded-lg border border-[#1A1D26]">
                {enq.message}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject)}`}
                className="px-3 py-1.5 rounded bg-[#1C202B] hover:bg-[#252A38] text-white text-xs font-medium"
              >
                Reply via Email
              </a>
              <a
                href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20regarding%20your%20inquiry%20to%20MACTS...`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-medium"
              >
                WhatsApp Student
              </a>
              {enq.status !== 'REPLIED' && (
                <button
                  onClick={() => handleStatus(enq.id, 'REPLIED')}
                  className="px-3 py-1.5 rounded bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-medium"
                >
                  Mark Replied
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

