import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "I was unsure about online yoga at first, but the structure, warmth, and clarity of the classes made it easy to stay consistent.",
    info: "Flexibility and stress relief - 6 months",
  },
  {
    name: "Rahul Verma",
    image: "https://images.unsplash.com/photo-1564490215983-296e5f56b623?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The sessions are guided in a way that feels disciplined without being overwhelming. I have stayed far more regular here.",
    info: "Strength and balance - 4 months",
  },
  {
    name: "Anita Patel",
    image: "https://images.unsplash.com/photo-1616002851413-ebcc9611139d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Every class feels considered. The instructors make progress feel realistic and personal, not rushed or generic.",
    info: "Guided progression - 5 months",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Testimonials</span>
          <h2 className="section-heading mt-6 text-balance">A softer, steadier experience members want to stay with.</h2>
          <p className="section-copy mt-5">
            Clean testimonial cards, generous spacing, and a calm editorial feel inspired by the reference aesthetic.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="surface-card px-6 py-8">
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <h3 className="text-3xl font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.info}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={index < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                  />
                ))}
              </div>

              <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">{testimonial.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
