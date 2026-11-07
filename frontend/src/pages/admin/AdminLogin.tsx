import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clapperboard, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('admin@mactsfilminstitute.com');
  const [password, setPassword] = useState('MactsAdmin@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/admin/auth/login', { username, password });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        navigate('/admin');
      } else {
        setError(res.data.message || 'Invalid credentials');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Verify server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-[#111319] border border-[#2B2F3D] rounded-2xl p-8 shadow-2xl">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#C52222] flex items-center justify-center mx-auto text-white shadow-lg shadow-red-900/40">
            <Clapperboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-white">
              MACTS Management
            </h1>
            <p className="text-xs text-[#8E929E] mt-0.5">
              Academy Administrative Console & Operations
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#71747D] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@mactsfilminstitute.com"
                className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C9A45C] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71747D] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0D0F15] border border-[#2A2E3D] rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C52222]"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#151822] border border-[#232735] text-[11px] text-[#A5A7AD] space-y-1">
            <span className="font-semibold text-white block">Default Admin Credentials:</span>
            <p>Email: <code className="text-[#C9A45C]">admin@mactsfilminstitute.com</code></p>
            <p>Password: <code className="text-[#C9A45C]">MactsAdmin@2026</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-[#A31D1D] hover:bg-[#C52222] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shadow-red-950/60 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs text-[#71747D] hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};

