import { Star, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Unnati Bajaj",
    image: "https://res.cloudinary.com/dlydkqrfx/image/upload/v1776585979/a7dtntlu3cwcb4nh8cwc.jpg",
    rating: 5,
    shortText: "I'm extremely grateful to Connekt Studio for being such an important part of my pregnancy journey. The yoga sessions and breathing techniques truly made a huge difference during my labor.",
    fullText: "I'm extremely grateful to Connekt Studio for being such an important part of my pregnancy journey 🤍\n\nAll the yoga sessions and especially the breathing techniques taught during the classes truly made a huge difference during my labor. I could actually feel how every single exercise helped me stay calm, focused, and strong through the pain.\n\nThanks to their guidance and support, I was able to have a normal delivery, and I genuinely believe their training played a big role in it.\n\nHighly recommend Connekt Studio to all moms-to-be—such a caring and knowledgeable team",
    info: "Pregnancy journey - 9 months",
  },
  {
    name: "Navatika Golwalker",
    image: "https://res.cloudinary.com/dlydkqrfx/image/upload/v1776588047/rcdij4gvg2sre9hqaa6a.jpg",
    rating: 5,
    shortText: "I've been associated with Connekt Studio for over two years. Their guidance has been invaluable throughout my weight loss journey, pre-conception phase, and entire pregnancy.",
    fullText: "I have been associated with Connekt Studio for over two years now, and their guidance has been invaluable throughout my weight loss journey, pre-conception phase, and entire pregnancy.\n\nThe prenatal yoga sessions truly made a difference,they helped me stay active, prepared my body for the changes ahead, and gave me the strength and confidence I needed. I was able to work until the very last day of my pregnancy and manage my daily household activities with ease. I experienced minimal discomfort, my BP remained stable, and overall, I felt healthy and energized.\n\nA special thanks to Harshita for the pre natal yoga sessions her guidance ensured my baby was in the correct position, and the breathwork techniques she taught were incredibly helpful during early and active labour. I was able to manage most of my labour naturally, without medication, and I truly believe that strength came from how well my body was trained throughout.\n\nI am equally grateful to Hina for the thoughtfully curated diet plans.They ensured that both my baby and I gained the right amount of weight while keeping my nutrition balanced, wholesome, and practical to follow.\n\nThank you, Connekt Studio, for your constant support, motivation, and care throughout this beautiful journey. From helping me build a healthier lifestyle to preparing me for one of the most important phases of my life, your guidance has truly made a lasting impact. I genuinely enjoyed my pregnancy journey, and I couldn't have asked for better mentors by my side.",
    info: "2+ years association",
  },
  {
    name: "Mehar Nainani",
    image: "https://res.cloudinary.com/dlydkqrfx/image/upload/v1776586176/hi9lic5xritf8i6a5gyc.jpg",
    rating: 4,
    shortText: "My pregnancy journey became one of the most beautiful and memorable phases of my life, all thanks to my amazing yoga trainers Harshita Di and Hina Di.",
    fullText: "My pregnancy journey became one of the most beautiful and memorable phases of my life, all thanks to my amazing yoga trainers cum dieticians Harshita Di and Hina Di. 🤍\n\nFrom day one, they stood by me through every high and low, always guiding me with so much patience, care, and positivity. Whether it was breathing techniques, safe stretches, exercises, or even understanding the little changes I was experiencing— they were always there to support and reassure me.\n\nTheir knowledge, dedication, and constant encouragement made me feel stronger, calmer, and more confident throughout this journey. I truly felt I was in the safest hands.\n\nI wholeheartedly recommend them to every expecting mother or anyone who is looking gorward to make changes in their lifestyle. If you're looking for the best guidance during pregnancy and lifestyle changes they are truly the best ones you will ever find. 🌸\n\nForever grateful to Connekt Studio (to Harshita di and Hina di) for making this journey so special. 💫",
    info: "Pregnancy journey",
  },
  {
    name: "Priyanka Navgire",
    image: "https://res.cloudinary.com/dlydkqrfx/image/upload/v1776607687/uevpdgu0t0om98dzrdtr.jpg",
    rating: 5,
    shortText: "I had an amazing experience taking personal classes with Harshita throughout my pregnancy. She was incredibly flexible with timings and every session was personalized.",
    fullText: "I had an amazing experience taking personal classes with Harshita throughout my pregnancy. She was incredibly flexible with timings, which was so helpful since we were in different time zones. We always made the schedule work, and her patience and understanding meant a lot.\n\nWhat truly set her apart was how personalized every session was. Each class was adapted to how my body felt that day. On days when I was extremely tired, we focused on gentle meditations that calmed my mind and soothed my baby in the womb. The stretches and exercises were relaxing yet effective — they prepared my body for labor without ever exhausting me.\n\nI genuinely looked forward to my yoga sessions every day. They helped release tension, eased my back pain, and became a peaceful space where I could slow down and reconnect with myself.\n\nOne of the most special parts of the journey was the mantra chanting at the end of each session. The vibrations helped me connect more deeply with my baby, and I often felt him become more active during the chanting.\n\nOn November 10, I delivered a healthy baby through a smooth vaginal birth — and I truly believe the breathing techniques, stretches, and mindfulness practices from our sessions played a huge role in helping me stay calm and prepared.\n\nMy journey with Harshita from Connekt Studio  was supportive, soothing, and transformative. I'm deeply grateful for her guidance and would highly recommend her to any expecting mother. 🌸🤰✨👶",
    info: "Personal classes - 9 months",
  },
];

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCustomerReviews();
  }, []);

  const fetchCustomerReviews = async () => {
    try {
      const response = await fetch('https://learnserver-backend.onrender.com/api/reviews/admin/all');
      const data = await response.json();
      if (data.success) {
        setCustomerReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('https://learnserver-backend.onrender.com/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm),
      });
      const data = await response.json();
      if (data.success) {
        alert('Review submitted successfully!');
        setReviewForm({ name: '', rating: 5, message: '' });
        setShowAddReview(false);
        fetchCustomerReviews();
      } else {
        alert(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };
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

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

              <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">{testimonial.shortText}</p>

              <button
                onClick={() => setSelectedTestimonial(testimonial)}
                className="mt-4 text-sm font-semibold text-teal-700 hover:text-teal-800 transition"
              >
                View full review →
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAllReviews(true)}
            className="inline-flex items-center gap-2 rounded-full border border-teal-600 px-6 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            View All Reviews
            <Plus size={16} />
          </button>
        </div>

        {showAddReview && (
          <div className="mt-12 surface-card-soft px-6 py-8 sm:px-8">
            <h3 className="text-2xl font-semibold text-gray-900">Add Your Review</h3>
            <form onSubmit={handleSubmitReview} className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  id="name"
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  required
                  className="field-input"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="rating" className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                <select
                  id="rating"
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                  className="field-input"
                >
                  {[5, 4, 3, 2, 1].map((star) => (
                    <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">Your Review</label>
                <textarea
                  id="message"
                  rows="4"
                  value={reviewForm.message}
                  onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                  required
                  className="field-input resize-none"
                  placeholder="Share your experience with Connekt Studio"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="primary-btn flex-1 px-6 py-3 text-sm"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {!showAddReview && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAddReview(true)}
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Plus size={16} />
              Add Your Review
            </button>
          </div>
        )}
      </div>

      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="surface-card-soft relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedTestimonial(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition hover:bg-white hover:text-gray-900"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
              <div className="flex items-center gap-4">
                <img src={selectedTestimonial.image} alt={selectedTestimonial.name} className="h-20 w-20 rounded-full object-cover" />
                <div>
                  <h3 className="text-3xl font-semibold text-gray-900">{selectedTestimonial.name}</h3>
                  <p className="text-sm text-gray-500">{selectedTestimonial.info}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={index < selectedTestimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                  />
                ))}
              </div>

              <div className="mt-6 text-sm leading-8 text-gray-600 sm:text-base whitespace-pre-line">
                {selectedTestimonial.fullText}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAllReviews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-4"
          onClick={() => setShowAllReviews(false)}
        >
          <div
            className="surface-card-soft relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowAllReviews(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition hover:bg-white hover:text-gray-900"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
              <h3 className="text-3xl font-semibold text-gray-900">All Customer Reviews</h3>
              <p className="mt-2 text-sm text-gray-500">Reviews submitted by our customers</p>

              <div className="mt-8 space-y-6">
                {customerReviews.length === 0 ? (
                  <div className="surface-card px-6 py-8 text-center">
                    <p className="text-gray-500">No customer reviews yet.</p>
                  </div>
                ) : (
                  customerReviews.map((review) => (
                    <div key={review._id} className="surface-card px-6 py-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className={index < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-gray-600 whitespace-pre-line">{review.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
