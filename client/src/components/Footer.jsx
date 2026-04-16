import { Heart, Image, MapPin, ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] py-16 px-4 text-slate-300 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/Images/logo.png" alt="Connekt Studio logo" className="h-14 w-auto object-contain" />
              <div>
                <p className="text-3xl font-semibold text-white">Connekt Studio</p>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Yoga and wellness</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-8 text-slate-400 sm:text-base">
              A premium online yoga and fitness experience designed to help members practice with calm, strength, and continuity.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/connekt_studio/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium transition hover:border-white/30 hover:text-white"
              >
                <Image size={16} />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61575226529469&mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium transition hover:border-white/30 hover:text-white"
              >
                <Heart size={16} />
                Facebook
              </a>
              <a
                href="https://jsdl.in/DT-99SERLP6TFV"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium transition hover:border-white/30 hover:text-white"
              >
                <ShoppingBag size={16} />
                Justdial
              </a>
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold text-white">Explore</p>
            <div className="mt-4 space-y-3 text-sm">
              <a href="#about" className="block transition hover:text-white">About</a>
              <a href="#classes" className="block transition hover:text-white">Classes</a>
              <a href="#testimonials" className="block transition hover:text-white">Testimonials</a>
              <a href="#faq" className="block transition hover:text-white">FAQ</a>
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold text-white">Practice</p>
            <div className="mt-4 space-y-3 text-sm">
              <p>Yoga for beginners</p>
              <p>Power yoga</p>
              <p>Meditation</p>
              <p>Fitness training</p>
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold text-white">Visit or write</p>
            <div className="mt-4 space-y-4 text-sm leading-7">
              <p className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-teal-400" />
                <span>Ghanshyam niwas, Nai Basti, Gandhi Ganj, Katni, Madhya Pradesh 483501</span>
              </p>
              <p>connektbmsstudio@gmail.com</p>
              <p>+91 9039570885</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>2026 Connekt Studio. All rights reserved.</p>
          <a href="/login" className="transition hover:text-white">Member login</a>
        </div>
      </div>
    </footer>
  );
}
