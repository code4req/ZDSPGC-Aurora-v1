import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import {
  FaLock,
  FaEnvelope,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      navigate("/admin/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo / Header */}

        <div className="text-center mb-10">

          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl border border-emerald-500/30 bg-emerald-950/60 flex items-center justify-center">
            <FaLock className="text-emerald-400 text-xl" />
          </div>

          <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 mb-3">
            ZDSPGC Administration
          </p>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Admin Portal
          </h1>

          <p className="text-sm text-emerald-100/50 mt-3">
            Sign in to manage the school website.
          </p>

        </div>

        {/* Login Card */}

        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-xl p-8 shadow-2xl"
        >

          {/* Email */}

          <div className="mb-5">

            <label className="block text-xs font-mono uppercase tracking-widest text-emerald-300 mb-2">
              Email
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/70" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full rounded-xl border border-emerald-500/20 bg-black/40 py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-emerald-100/30 focus:border-emerald-400 transition-colors"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mb-6">

            <label className="block text-xs font-mono uppercase tracking-widest text-emerald-300 mb-2">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/70" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-emerald-500/20 bg-black/40 py-4 pl-11 pr-12 text-sm text-white outline-none placeholder:text-emerald-100/30 focus:border-emerald-400 transition-colors"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500/70 hover:text-emerald-300"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Error */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-xs text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-emerald-400 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <FaArrowRight />
              </>
            )}
          </button>

        </form>

        {/* Footer */}

        <p className="text-center text-[10px] font-mono uppercase tracking-widest text-emerald-500/40 mt-8">
          Authorized personnel only
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;