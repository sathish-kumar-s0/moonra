import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, Users, IndianRupee, X } from 'lucide-react';
import { api } from '../../services/api';

export const WorkshopsAdmin: React.FC = () => {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWs, setEditingWs] = useState<any>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [mentorName, setMentorName] = useState('Editor Kalaivanan');
  const [month, setMonth] = useState('December 2026');
  const [eventDate, setEventDate] = useState('2026-12-19');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [venue, setVenue] = useState('MACTS Cinema Studio & Live Interactive Stream (Chennai / Online)');
  const [fee, setFee] = useState(1499);
  const [seatCapacity, setSeatCapacity] = useState(50);
  const [bannerUrl, setBannerUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const fetchWorkshops = () => {
    setLoading(true);
    api.get('/admin/workshops')
      .then((res) => {
        if (res.data.success) {
          setWorkshops(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const openCreateModal = () => {
    setEditingWs(null);
    setTitle('Film Editing Workshop By Editor Kalaivanan');
    setSlug('film-editing-workshop-kalaivanan');
    setMentorName('Editor Kalaivanan');
    setMonth('December 2026');
    setEventDate('2026-12-19');
    setStartTime('10:00 AM');
    setEndTime('05:00 PM');
    setVenue('MACTS Cinema Studio & Live Interactive Stream');
    setFee(1499);
    setSeatCapacity(50);
    setBannerUrl('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80');
    setDescription('A focused, hands-on workshop on the art and craft of film editing with renowned editor Kalaivanan.');
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (ws: any) => {
    setEditingWs(ws);
    setTitle(ws.title);
    setSlug(ws.slug);
    setMentorName(ws.mentor_name || 'Editor Kalaivanan');
    setMonth(ws.month || 'December 2026');
    setEventDate(ws.event_date || '2026-12-19');
    setStartTime(ws.start_time || '10:00 AM');
    setEndTime(ws.end_time || '05:00 PM');
    setVenue(ws.venue_or_online_details || ws.venue || '');
    setFee(ws.fee || 1499);
    setSeatCapacity(ws.seat_capacity || ws.seat_limit || 50);
    setBannerUrl(ws.banner_url || ws.banner || '');
    setDescription(ws.description || '');
    setIsPublished(ws.is_published !== false);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      mentor_name: mentorName,
      month,
      event_date: eventDate,
      start_time: startTime,
      end_time: endTime,
      venue_or_online_details: venue,
      fee: Number(fee),
      seat_capacity: Number(seatCapacity),
      banner_url: bannerUrl,
      description,
      is_published: isPublished
    };

    try {
      if (editingWs) {
        await api.put(`/admin/workshops/${editingWs.id}`, payload);
      } else {
        await api.post('/admin/workshops', payload);
      }
      setModalOpen(false);
      fetchWorkshops();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error saving workshop');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this workshop?')) {
      try {
        await api.delete(`/admin/workshops/${id}`);
        fetchWorkshops();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            Workshops & Monthly Masterclasses
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Configure dynamic monthly workshop titles, instructor credits, schedules, seat caps, and admission fees.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold tracking-wide transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Workshop</span>
        </button>
      </div>

      {/* Workshop Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshops.map((ws) => (
          <div
            key={ws.id}
            className="rounded-2xl bg-[#111319] border border-[#222530] p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-[#E8D6A8]">
                  {ws.month || 'December 2026'}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  Fee: ₹{ws.fee?.toLocaleString()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-serif">{ws.title}</h3>
              <p className="text-xs text-[#C9A45C]">Mentor: {ws.mentor_name}</p>
              <p className="text-xs text-[#8E929E] line-clamp-2">{ws.description}</p>
            </div>

            <div className="pt-4 border-t border-[#1C202B] flex items-center justify-between text-xs text-[#71747D]">
              <span>
                Seats: <strong className="text-white">{ws.booked_seats || 0}</strong> / {ws.seat_capacity || 50}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(ws)}
                  className="px-3 py-1.5 rounded bg-[#181B24] hover:bg-[#202532] text-[#E8D6A8] text-xs font-semibold flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(ws.id)}
                  className="p-1.5 rounded bg-red-950/40 text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#111319] border border-[#2B2F3D] rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#1E212B] pb-4">
              <h3 className="text-lg font-bold font-serif text-white uppercase">
                {editingWs ? 'Edit Monthly Workshop' : 'Create Cinema Workshop'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8E929E] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#C9A45C] font-semibold mb-1">
                  Workshop Title (e.g. Monthly Featured Workshop) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Mentor Name *</label>
                  <input
                    type="text"
                    required
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Display Month *</label>
                  <input
                    type="text"
                    required
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="December 2026"
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">End Time</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="05:00 PM"
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Registration Fee (INR) *</label>
                  <input
                    type="number"
                    required
                    value={fee}
                    onChange={(e) => setFee(Number(e.target.value))}
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Seat Limit / Capacity *</label>
                  <input
                    type="number"
                    required
                    value={seatCapacity}
                    onChange={(e) => setSeatCapacity(Number(e.target.value))}
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C9A45C] font-semibold mb-1">Venue or Online Stream Details *</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-[#C9A45C] font-semibold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg p-3 text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#1E212B]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#181B24] text-white hover:bg-[#202532]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#A31D1D] hover:bg-[#C52222] text-white font-semibold"
                >
                  Save Workshop
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

