import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Sparkles, Heart, Zap, Shield, Check, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  const { login } = useAuth();
  const navigate = useNavigate();

  // Floating particles animation
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    const particles = [];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-gradient-to-r from-teal-400/20 to-emerald-400/20';
      particle.style.width = `${Math.random() * 20 + 10}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particlesContainer.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const showPopup = (message, type = 'success') => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://learnserver-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.data.user, data.data.token);
        showPopup("Login Successful!");
        setTimeout(() => navigate(data.data.user.role === "admin" ? "/dashboard" : "/"), 1000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30 px-4 py-12">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-100/10 via-transparent to-emerald-100/10" />
      
      {/* Floating particles container */}
      <div className="particles-container absolute inset-0 overflow-hidden" />
      
      {/* Animated orbs */}
      <div className="absolute -left-20 -top-20 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-teal-300/20 to-emerald-300/20 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-80 w-80 animate-pulse rounded-full bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-3xl animation-delay-1000" />
      
      {/* Main card */}
      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-3xl lg:grid-cols-2">
        {/* Left side - Visual */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 p-10 text-white lg:block">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90">
              <Shield size={14} />
              Secure Login
            </span>
            
            <h1 className="mt-8 font-heading text-5xl font-bold leading-tight">
              Welcome Back to
              <span className="block bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Your Wellness Journey
              </span>
            </h1>
            
            <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
              Step back into your practice with personalized classes, progress tracking, and expert guidance—all in one place.
            </p>
            
            <div className="mt-10 space-y-6">
              {[
                { icon: Heart, text: "Personalized class recommendations" },
                { icon: Zap, text: "Fast access to all your courses" },
                { icon: Shield, text: "Bank-level security & privacy" },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500">
                    <item.icon size={22} />
                  </div>
                  <span className="font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-8 sm:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-10 text-center">
              <div className="relative inline-flex">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 opacity-20 blur-xl" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-2xl">
                  <Sparkles size={32} />
                </div>
              </div>
              
              <h2 className="mt-8 font-heading text-4xl font-bold text-gray-900">
                Sign In
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="animate-scale-in rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm font-semibold text-red-700 backdrop-blur-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/20 to-emerald-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Mail size={20} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="relative w-full rounded-xl border border-gray-200 bg-white/80 px-12 py-4 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/20 to-emerald-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Lock size={20} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="relative w-full rounded-xl border border-gray-200 bg-white/80 px-12 py-4 pr-12 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-teal-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-teal-600 hover:to-emerald-700 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowLeft className="rotate-180 transition-transform group-hover:translate-x-1" size={20} />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
              <button
                onClick={() => navigate("/")}
                className="group inline-flex items-center gap-3 font-semibold text-gray-600 transition-all duration-300 hover:text-gray-900"
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Back to Home
              </button>
              
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-teal-600 underline-offset-4 transition-all duration-300 hover:text-teal-800 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                By signing in, you agree to our{" "}
                <a href="#" className="font-medium text-gray-700 hover:text-teal-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-gray-700 hover:text-teal-600">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {popup.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className={`flex items-center gap-3 rounded-full px-6 py-3 shadow-2xl ${popup.type === 'success' ? 'bg-teal-600' : 'bg-red-600'}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              {popup.type === 'success' ? <Check size={18} className="text-white" /> : <X size={18} className="text-white" />}
            </div>
            <span className="text-sm font-semibold text-white">{popup.message}</span>
          </div>
        </div>
      )}

      {/* Add CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(20px) translateX(5px); }
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
