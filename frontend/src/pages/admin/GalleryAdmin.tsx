import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { api } from '../../services/api';

export const GalleryAdmin: React.FC = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workshops');
  const [imageUrl, setImageUrl] = useState('');

  const fetchGallery = () => {
    api.get('/gallery').then((res) => {
      if (res.data.success) setGallery(res.data.data);
    });
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/gallery', {
        title,
        category,
        image_url: imageUrl,
        featured_on_home: true
      });
      setModalOpen(false);
      setTitle('');
      setImageUrl('');
      fetchGallery();
    } catch (err) {
      alert('Error adding image');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this gallery item?')) {
      await api.delete(`/admin/gallery/${id}`);
      fetchGallery();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            Media & Gallery Management
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Organize photography and behind-the-scenes cinema frames shown across the website.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden bg-black border border-[#222530] aspect-[4/3]">
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
              <span className="text-[10px] text-[#C9A45C] font-bold uppercase">{item.category}</span>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white font-semibold font-serif truncate">{item.title}</span>
                <button onClick={() => handleDelete(item.id)} className="p-1 rounded bg-red-900/80 text-white">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111319] border border-[#2B2F3D] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E212B] pb-3">
              <h3 className="text-base font-bold text-white font-serif uppercase">Add Gallery Image</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8E929E]">✕</button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-[#C9A45C] block mb-1">Image Title / Caption *</label>
                <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Multi-Cam Studio Setup" className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Category *</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white">
                  <option value="Workshops">Workshops</option>
                  <option value="Masterclasses">Masterclasses</option>
                  <option value="Film Production">Film Production</option>
                  <option value="Student Activities">Student Activities</option>
                  <option value="Behind the Scenes">Behind the Scenes</option>
                </select>
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Image URL *</label>
                <input type="url" required value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1.5 rounded bg-[#181B24] text-white">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-[#A31D1D] text-white font-semibold">Add Image</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

