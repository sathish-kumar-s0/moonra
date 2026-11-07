import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, X, Calendar, IndianRupee, Clapperboard } from 'lucide-react';
import { api } from '../../services/api';

export const CoursesAdmin: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('3 Months');
  const [mode, setMode] = useState('Live Classes & On-Set Experience');
  const [fee, setFee] = useState(24999);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [curriculumText, setCurriculumText] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const fetchCourses = () => {
    setLoading(true);
    api.get('/admin/courses')
      .then((res) => {
        if (res.data.success) {
          setCourses(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setDuration('3 Months');
    setMode('Live Classes & On-Set Experience');
    setFee(24999);
    setThumbnailUrl('https://images.unsplash.com/photo-1533563906091-8dc89c823ea7?auto=format&fit=crop&w=800&q=80');
    setCurriculumText('Module 1: Introduction to Cinema History\nModule 2: Narrative Arc Development\nModule 3: Visual Staging & Direction');
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (c: any) => {
    setEditingCourse(c);
    setTitle(c.title);
    setSlug(c.slug);
    setDescription(c.description);
    setDuration(c.duration || '3 Months');
    setMode(c.mode || 'Live Classes');
    setFee(c.fee || 24999);
    setThumbnailUrl(c.thumbnail_url || '');
    setCurriculumText(Array.isArray(c.curriculum) ? c.curriculum.join('\n') : '');
    setIsPublished(c.is_published !== false);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const curriculumArray = curriculumText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      duration,
      mode,
      fee: Number(fee),
      thumbnail_url: thumbnailUrl,
      curriculum: curriculumArray,
      is_published: isPublished
    };

    try {
      if (editingCourse) {
        await api.put(`/admin/courses/${editingCourse.id}`, payload);
      } else {
        await api.post('/admin/courses', payload);
      }
      setModalOpen(false);
      fetchCourses();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error saving course');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/admin/courses/${id}`);
        fetchCourses();
      } catch (err: any) {
        alert('Failed to delete course');
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
            Courses Management
          </h1>
          <p className="text-xs text-[#8E929E] mt-0.5">
            Manage diploma programmes, syllabus modules, admission fees, and course visibility.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold tracking-wide transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Courses Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl bg-[#111319] border border-[#222530] p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#2A2E3D]"
              />
              <div className="space-y-1">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  course.is_published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-300'
                }`}>
                  {course.is_published ? 'Published' : 'Draft'}
                </span>
                <h3 className="text-base font-bold text-white font-serif">{course.title}</h3>
                <p className="text-xs text-[#C9A45C] font-mono">
                  Fee: ₹{course.fee?.toLocaleString()} • {course.duration || '3 Months'}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#8E929E] line-clamp-2">
              {course.description}
            </p>

            <div className="pt-4 border-t border-[#1C202B] flex items-center justify-between">
              <span className="text-[11px] text-[#71747D]">
                {course.curriculum?.length || 0} Modules defined
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(course)}
                  className="p-2 rounded bg-[#181B24] hover:bg-[#202532] text-[#E8D6A8] text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#111319] border border-[#2B2F3D] rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#1E212B] pb-4">
              <h3 className="text-lg font-bold font-serif text-white uppercase">
                {editingCourse ? 'Edit Diploma Course' : 'Create New Diploma Programme'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8E929E] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#C9A45C] font-semibold mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Diploma in Film Making"
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="diploma-in-film-making"
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="3 Months"
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Tuition / Registration Fee (INR) *</label>
                  <input
                    type="number"
                    required
                    value={fee}
                    onChange={(e) => setFee(Number(e.target.value))}
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C9A45C] font-semibold mb-1">Banner Image URL</label>
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
                  />
                </div>
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

              <div>
                <label className="block text-[#C9A45C] font-semibold mb-1">
                  Curriculum Modules (One module per line)
                </label>
                <textarea
                  rows={4}
                  value={curriculumText}
                  onChange={(e) => setCurriculumText(e.target.value)}
                  placeholder="Module 1: Screenwriting\nModule 2: Directorial Staging..."
                  className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg p-3 text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded bg-[#0D0F15] border-[#2A2E3D] text-[#C52222]"
                />
                <label htmlFor="publishedCheck" className="text-white">Publish Course on Website</label>
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
                  Save Course
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

