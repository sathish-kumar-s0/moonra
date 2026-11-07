import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Camera, X } from 'lucide-react';
import { api } from '../../services/api';

export const MentorsAdmin: React.FC = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<any>(null);

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [biography, setBiography] = useState('');
  const [experience, setExperience] = useState('15+ Years');
  const [imageUrl, setImageUrl] = useState('');

  const fetchMentors = () => {
    setLoading(true);
    api.get('/mentors')
      .then((res) => {
        if (res.data.success) setMentors(res.data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const openCreateModal = () => {
    setEditingMentor(null);
    setName('');
    setDesignation('');
    setBiography('');
    setExperience('15+ Years Industry Experience');
    setImageUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80');
    setModalOpen(true);
  };

  const openEditModal = (m: any) => {
    setEditingMentor(m);
    setName(m.name);
    setDesignation(m.designation);
    setBiography(m.biography);
    setExperience(m.experience || '15+ Years');
    setImageUrl(m.image_url);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      designation,
      biography,
      experience,
      image_url: imageUrl,
      featured_on_home: true,
      is_published: true
    };

    try {
      if (editingMentor) {
        await api.put(`/admin/mentors/${editingMentor.id}`, payload);
      } else {
        await api.post('/admin/mentors', payload);
      }
      setModalOpen(false);
      fetchMentors();
    } catch (err) {
      alert('Error saving mentor profile');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this mentor?')) {
      await api.delete(`/admin/mentors/${id}`);
      fetchMentors();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            Industry Mentors Management
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Manage directors, cinematographers, editors, and technical mentors showcased on the platform.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Add Mentor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {mentors.map((m) => (
          <div key={m.id} className="rounded-2xl bg-[#111319] border border-[#222530] overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-square">
              <img src={m.image_url} alt={m.name} className="w-full h-full object-cover filter grayscale contrast-125" />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-base font-bold text-white font-serif">{m.name}</h3>
              <p className="text-xs text-[#C9A45C] font-medium">{m.designation}</p>
              <p className="text-[11px] text-[#8E929E] line-clamp-2">{m.biography}</p>
              
              <div className="pt-3 border-t border-[#1C202B] flex items-center justify-between">
                <span className="text-[10px] text-[#71747D]">{m.experience}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(m)} className="p-1 rounded text-[#E8D6A8] hover:bg-[#1A1D27]">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="p-1 rounded text-red-400 hover:bg-[#1A1D27]">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#111319] border border-[#2B2F3D] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E212B] pb-3">
              <h3 className="text-base font-bold text-white font-serif uppercase">
                {editingMentor ? 'Edit Mentor Profile' : 'Add Industry Mentor'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8E929E]">✕</button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-[#C9A45C] block mb-1">Mentor Name *</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Designation & Department *</label>
                <input required value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Director of Photography" className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Experience</label>
                <input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="18+ Years Industry Experience" className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Photograph Image URL</label>
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Short Biography</label>
                <textarea rows={3} value={biography} onChange={(e) => setBiography(e.target.value)} className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded p-2 text-white" />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1.5 rounded bg-[#181B24] text-white">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-[#A31D1D] text-white font-semibold">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

