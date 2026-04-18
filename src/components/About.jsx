import { Heart, Leaf, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="surface-card-soft p-4 sm:p-5">
            <img
              src="/Images/aboutus.jpeg"
              alt="Yoga meditation"
              className="h-[350px] w-full rounded-[1.25rem] object-cover object-center sm:h-[380px] md:h-[420px] lg:h-[450px]"
              style={{ objectPosition: '60% 70%' }}
            />
          </div>

          <div>
            <span className="section-kicker">About us</span>
            <h2 className="section-heading mt-6 text-balance">
              Built On Real Transformation And Shared Purpose.
            </h2>
            <p className="section-copy mt-6 max-w-2xl">
            Two sisters, one shared purpose. 

Rishikesh became the turning point in Harshita’s life—what began as a journey to heal from grief and depression transformed into a path of deep self-discovery through yoga. She found not just balance, but a sense of inner bliss she chose to live by every day.

Witnessing this powerful shift, her younger sister 
Hina made a bold choice—to step away from the corporate world and follow a path that felt more aligned. What started as a personal fitness goal soon evolved into a deeper commitment to holistic health.

Today, together, they blend yoga, fitness, and nutrition to guide others toward strength, balance, and self-healing—because they’ve lived the transformation themselves.

            </p>

            <div className="mt-10 grid gap-4">
              <div className="surface-card px-5 py-5 sm:px-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-gray-900">From healing to purpose</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                     What started as a personal healing journey became a mission to help others transform.
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
                    <h3 className="text-3xl font-semibold text-gray-900">Guided by real experience</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                      Every step we teach comes from our own journey of growth, balance, and discipline.
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
                    <h3 className="text-3xl font-semibold text-gray-900">Stronger together</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
                      Two sisters combining yoga, fitness, and lifestyle practices to create real impact.
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
