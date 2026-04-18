export default function BottomCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-[1.6rem] border border-white/70 bg-[rgba(28,25,23,0.92)] px-4 py-4 text-white shadow-[0_24px_60px_rgba(28,25,23,0.28)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Next beginner batch</p>
          <p className="mt-1 font-['Outfit'] text-2xl font-semibold">Starting 4 May</p>
        </div>
        <a
          href="#contact"
          className="btn-primary whitespace-nowrap px-6 py-3 text-sm"
        >
          Register now
        </a>
      </div>
    </div>
  );
}
