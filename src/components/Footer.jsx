import { Heart, Image, MapPin, ShoppingBag } from "lucide-react";
import { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-[#0f172a] py-16 px-4 text-slate-300 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section - centered */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <img src="/Images/logo.png" alt="Connekt Studio logo" loading="lazy" className="h-16 w-auto object-contain mb-4" />
          <p className="text-sm text-slate-400 mt-2">Yoga and Wellness</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            A premium online yoga and fitness experience designed to help members practice with calm, strength, and continuity.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="https://www.instagram.com/connekt_studio/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 text-sm font-medium transition hover:border-white/30 hover:text-white hover:bg-white/5"
            >
              <Image size={18} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575226529469&mibextid=rS40aB7S9Ucbxw6v"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 text-sm font-medium transition hover:border-white/30 hover:text-white hover:bg-white/5"
            >
              <Heart size={18} />
            </a>
            <a
              href="https://jsdl.in/DT-99SERLP6TFV"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 text-sm font-medium transition hover:border-white/30 hover:text-white hover:bg-white/5"
            >
              <ShoppingBag size={18} />
            </a>
          </div>
        </div>

        {/* Content section */}
        <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-white mb-4">Explore</p>
            <div className="space-y-3 text-sm">
              <a href="#about" className="block transition hover:text-white">About</a>
              <a href="#classes" className="block transition hover:text-white">Classes</a>
              <a href="#testimonials" className="block transition hover:text-white">Testimonials</a>
              <a href="#faq" className="block transition hover:text-white">FAQ</a>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold text-white mb-4">Practice</p>
            <div className="space-y-3 text-sm">
              <p>Yoga for beginners</p>
              <p>Meditation</p>
              <p>Fitness training</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-semibold text-white mb-4 text-center">Contact</p>
            <div className="space-y-4 text-sm leading-7 text-center">
              <p className="flex items-center justify-center gap-3">
                <MapPin size={18} className="shrink-0 text-teal-400" />
                <span>Near pustak bazaar, Indradhanush jewellers, above mehta stores, Neemuch, ( M.P )</span>
              </p>
              <p>connektbmsstudio@gmail.com</p>
              <p>+91 9039570885</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>2026 Connekt Studio. All rights reserved.</p>
          <a href="/login" className="transition hover:text-white">Member login</a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
