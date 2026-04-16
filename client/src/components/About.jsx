import { Heart, Leaf, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="surface-card-soft p-4 sm:p-5">
            <img
              src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80"
              alt="Yoga meditation"
              className="h-[420px] w-full rounded-[1.25rem] object-cover"
            />
          </div>

          <div>
            <span className="section-kicker">About us</span>
            <h2 className="section-heading mt-6 text-balance">
              A spiritual and fitness practice shaped with elegance.
            </h2>
            <p className="section-copy mt-6 max-w-2xl">
              Connekt Studio believes meaningful transformation begins with consistent intention.
              Our classes are designed to help members feel stronger physically, calmer mentally, and
              more grounded in everyday life.
            </p>

            <div className="mt-10 grid gap-4">
              <div className="surface-card px-5 py-5 sm:px-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-gray-900">Body, mind, and spirit</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                      We combine yoga, mindful movement, and breath practices into one holistic discipline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="surface-card px-5 py-5 sm:px-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-gray-900">Authentic and supportive</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                      Each class is designed to feel steady, welcoming, and rooted in long-term progress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="surface-card px-5 py-5 sm:px-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-gray-900">Modern clarity</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                      Traditional wisdom is delivered through a clean online experience that fits daily life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
