import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Quote, Star } from 'lucide-react';
import { api } from '../../services/api';

export const TestimonialsAdmin: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('Diploma in Film Making');
  const [testimonial, setTestimonial] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchTestimonials = () => {
    api.get('/testimonials').then((res) => {
      if (res.data.success) setTestimonials(res.data.data);
    });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/testimonials', {
        student_name: studentName,
        course_name: courseName,
        testimonial,
        image_url: imageUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
        is_published: true
      });
      setModalOpen(false);
      setStudentName('');
      setTestimonial('');
      fetchTestimonials();
    } catch (err) {
      alert('Error saving testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete testimonial?')) {
      await api.delete(`/admin/testimonials/${id}`);
      fetchTestimonials();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            Student Testimonials
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Manage feedback and quotes from diploma students and workshop participants.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl bg-[#111319] border border-[#222530] p-6 space-y-4 flex flex-col justify-between">
            <p className="text-xs italic text-[#D1D4DC] leading-relaxed font-serif">
              "{t.testimonial}"
            </p>
            <div className="pt-4 border-t border-[#1C202B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={t.image_url} alt={t.student_name} className="w-9 h-9 rounded-full object-cover border border-[#2B2F3D]" />
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">{t.student_name}</h4>
                  <p className="text-[10px] text-[#C9A45C]">{t.course_name}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded text-red-400 hover:bg-[#1A1D27]">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111319] border border-[#2B2F3D] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E212B] pb-3">
              <h3 className="text-base font-bold text-white font-serif uppercase">Add Student Testimonial</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8E929E]">✕</button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="text-[#C9A45C] block mb-1">Student Name *</label>
                <input required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Aditya Ramanathan" className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Course / Programme Attended *</label>
                <input required value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="Diploma in Film Making" className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Student Photo URL</label>
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-[#C9A45C] block mb-1">Testimonial Quote *</label>
                <textarea rows={4} required value={testimonial} onChange={(e) => setTestimonial(e.target.value)} placeholder="Write student's review..." className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded p-2 text-white" />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1.5 rounded bg-[#181B24] text-white">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-[#A31D1D] text-white font-semibold">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

