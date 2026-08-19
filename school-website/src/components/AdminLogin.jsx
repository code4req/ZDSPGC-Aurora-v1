import { useEffect, useState } from "react";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";

const AdminLogin = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close with ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      onLogin(data.user);
    }

    setLoading(false);
  };

  // Close when clicking the dark background
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center px-5 bg-black/70 backdrop-blur-md"
    >

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ======================================================
          LOGIN MODAL
      ====================================================== */}

      <div className="relative z-10 w-full max-w-md">

        {/* Modal Card */}

        <div className="relative rounded-3xl border border-emerald-400/20 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden">

          {/* Top accent */}

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-400" />

          {/* Close button */}

          <button
            onClick={onClose}
            type="button"
            aria-label="Close admin login"
            className="absolute top-5 right-5 z-20 h-9 w-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <FaTimes />
          </button>

          <div className="p-7 sm:p-9">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="text-center mb-8">

              <div className="mx-auto mb-5 h-14 w-14 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                <FaLock className="text-emerald-400 text-lg" />
              </div>

              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 mb-2">
                ZDSPGC Administration
              </p>

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Admin Portal
              </h1>

              <p className="text-xs text-white/40 mt-2">
                Authorized personnel only.
              </p>

            </div>

            {/* ==================================================
                LOGIN FORM
            ================================================== */}

            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <div className="mb-4">

                <label className="block text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-2">
                  Email
                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/60 text-sm" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-emerald-400/60 focus:bg-emerald-500/[0.03] transition-all"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div className="mb-5">

                <label className="block text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-2">
                  Password
                </label>

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/60 text-sm" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-12 text-sm text-white outline-none placeholder:text-white/20 focus:border-emerald-400/60 focus:bg-emerald-500/[0.03] transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-emerald-400 transition-colors"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                  <p className="text-xs text-red-400">
                    {error}
                  </p>

                </div>
              )}

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-emerald-400 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-black hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading ? (
                  <span className="animate-pulse">
                    Signing In...
                  </span>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight />
                  </>
                )}

              </button>

            </form>

            {/* FOOTER */}

            <p className="text-center text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 mt-6">
              ZDSPGC • Administration System
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;