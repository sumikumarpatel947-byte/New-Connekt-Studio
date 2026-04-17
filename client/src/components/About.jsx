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
              Built On Real Transformation And Shared Purpose.
            </h2>
            <p className="section-copy mt-6 max-w-2xl">
              Two sisters, one shared purpose.

Harshita’s journey began in Rishikesh, where yoga helped her heal from grief and rediscover inner peace. What started as a personal struggle slowly turned into a path of self-discovery and balance.

Inspired by her transformation, her younger sister Hina chose to leave the corporate world and follow a more meaningful path. What began as a fitness goal soon grew into a deeper commitment to overall well-being.

Today, together, they combine yoga, fitness, and nutrition to help others build strength, find balance, and feel better—because they have lived this journey themselves.

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
