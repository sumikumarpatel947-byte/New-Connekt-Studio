import { ArrowRight, PlayCircle } from "lucide-react";

const highlights = [
  "80k+ guided practice journeys",
  "Live yoga, meditation, and fitness classes",
  "Beginner-friendly rhythm from home",
];

export default function Home() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="fade-up py-28 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0.58)), url("/Images/herobg.png")',
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto max-w-4xl text-center text-white">
          <span className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
            Begin your journey inward
          </span>

          <h1 className="mt-8 text-balance text-[clamp(3.25rem,8vw,6.4rem)] font-semibold leading-[0.92]">
            Calm movement,
            <span className="block">strong body, clear mind.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-100/90 sm:text-xl">
            Join Connekt Studio for a refined online yoga and wellness experience shaped by discipline,
            spacious guidance, and a sense of inner balance.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={() => scrollToSection("classes")} className="primary-btn min-w-[220px]">
              Explore classes
              <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollToSection("contact")} className="secondary-btn min-w-[220px]">
              Start your journey
              <PlayCircle size={18} />
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-white/90">
            {highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
