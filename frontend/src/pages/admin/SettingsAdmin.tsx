import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Globe, Phone, Mail, Instagram, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

export const SettingsAdmin: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/settings').then((res) => {
      if (res.data.success) {
        setSettings(res.data.data);
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    try {
      await api.put('/admin/settings', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      alert('Error updating settings');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
          Academy Brand & Global Settings
        </h1>
        <p className="text-xs text-[#8E929E] mt-0.5">
          Configure official contact numbers, social integrations, and parent brand links.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Website settings updated successfully across all public pages.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-2xl bg-[#111319] border border-[#222530] p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-white font-serif tracking-wide border-b border-[#1E212B] pb-3">
          Brand Identity & Contact Channels
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Brand Name</label>
            <input
              type="text"
              value={settings.name || 'MACTS'}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Full Institute Title</label>
            <input
              type="text"
              value={settings.full_name || 'MoonInRed Academy of Cinema Technical Studies'}
              onChange={(e) => setSettings({ ...settings, full_name: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Official Contact Phone</label>
            <input
              type="text"
              value={settings.phone || '+91 88700 32122'}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Official WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp || '+91 88700 32122'}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Admissions Email Address</label>
            <input
              type="email"
              value={settings.email || 'mactsofficial@gmail.com'}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Instagram Profile</label>
            <input
              type="text"
              value={settings.instagram || 'Macts_Official'}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Parent Brand Website URL</label>
            <input
              type="url"
              value={settings.parent_website || 'https://www.mooninred.com'}
              onChange={(e) => setSettings({ ...settings, parent_website: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[#C9A45C] font-semibold block mb-1">Official Tagline</label>
            <input
              type="text"
              value={settings.tagline || 'Learn Cinema. Understand the Craft. Create the Future.'}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg px-3.5 py-2 text-white"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#1E212B] flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold uppercase tracking-wider"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

