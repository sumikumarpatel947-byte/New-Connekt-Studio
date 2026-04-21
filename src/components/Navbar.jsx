import { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navItems = ["home", "about", "classes", "testimonials", "faq", "contact"];

const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled ? "nav-shell" : "bg-transparent"
        }`}
      >
        <div className="flex items-center flex-1"></div>

        <nav className="flex items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-base font-semibold capitalize text-gray-700 transition hover:text-teal-700 hover:scale-105"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center flex-1 justify-end">
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((current) => !current)}
                className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-medium text-gray-900">{user?.name || "User"}</span>
                  <span className="block text-xs text-gray-500">{user?.role || "member"}</span>
                </span>
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
                  <div className="border-b border-slate-100 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Signed in as</p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  <div className="space-y-2 py-4 text-sm text-gray-600">
                    <p><span className="font-semibold text-gray-900">Phone:</span> {user?.mobile || "-"}</p>
                    <p><span className="font-semibold text-gray-900">Address:</span> {user?.address || "-"}</p>
                    <p><span className="font-semibold text-gray-900">Role:</span> {user?.role || "member"}</p>
                  </div>

                  <div className="space-y-3">
                    {user?.role === "admin" && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="block rounded-full bg-gray-900 px-5 py-3 text-center text-sm font-semibold !text-white"
                      >
                        Open dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="rounded-full border border-teal-600 px-5 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50">
              <span className="inline-flex items-center gap-2">
                <User size={16} />
                Login
              </span>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-700 shadow-sm lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-slate-200 bg-white p-4 shadow-lg lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium capitalize text-gray-700 transition hover:bg-teal-50 hover:text-teal-700"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                {user?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-full bg-gray-900 px-5 py-3 text-center text-sm font-semibold !text-white"
                  >
                    Open dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-full border border-teal-600 px-5 py-3 text-center text-sm font-semibold text-teal-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

export default Navbar;
