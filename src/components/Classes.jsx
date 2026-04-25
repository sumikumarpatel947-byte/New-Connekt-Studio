import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock3,
  Info,
  PlusCircle,
  Star,
  UserRound,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "919039570885";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://learnserver-backend.onrender.com/api/classes");
        const data = await response.json();

        if (data.success) {
          setClasses(data.data);
        } else {
          setError(data.message || "Failed to fetch classes");
        }
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (!selectedClass) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedClass(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedClass]);

  const enrollInClass = (classItem) => {
    // Generate professional, personalized message based on class type
    const getPersonalizedMessage = (classItem) => {
      const classTitle = classItem.title.toLowerCase();
      
      let greeting = "Namaste!";
      let opening = "I'm excited to begin my wellness journey";
      let closing = "Could you please guide me through the enrollment process and share the next steps?";
      
      if (classTitle.includes('yoga') || classTitle.includes('meditation')) {
        opening = "I'm interested in deepening my yoga and meditation practice";
        closing = "I would love to know more about the class schedule and how I can prepare for my first session.";
      } else if (classTitle.includes('fitness') || classTitle.includes('training')) {
        opening = "I'm looking to improve my fitness and strength";
        closing = "Please share details about the program and any prerequisites I should be aware of.";
      } else if (classTitle.includes('diet') || classTitle.includes('nutrition')) {
        opening = "I'm seeking guidance on personalized nutrition and diet planning";
        closing = "I'd appreciate information about the consultation process and how to get started.";
      } else if (classTitle.includes('prenatal') || classTitle.includes('postpartum') || classTitle.includes('preconception')) {
        opening = "I'm looking for specialized care during this important phase of my life";
        closing = "Could you please share more details about the program and how it can support my journey?";
      }
      
      return `${greeting}\n\n${opening} with your "${classItem.title}" program.\n\nHere are my preferences:\n• Level: ${classItem.level}\n• Investment: ${classItem.price}\n• Duration: ${classItem.duration}\n\n${closing}\n\nLooking forward to hearing from you.\n\nThank you,\n[Your Name]`;
    };

    const message = getPersonalizedMessage(classItem);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    // Set reminder flag for review popup
    localStorage.setItem("showReviewReminder", "true");
    // Trigger event to show popup
    window.dispatchEvent(new Event('enrollment-triggered'));
  };

  const showClassDetails = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <section id="classes" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Daily classes</span>
          <h2 className="section-heading mt-6 text-balance">A refined class lineup for every stage of practice.</h2>
          <p className="section-copy mt-5">
            Each class is thoughtfully designed to guide you through mindful movement, breath work, and meditation practices that nurture your body and soul.
          </p>
        </div>

        {loading && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="surface-card-soft animate-pulse p-4">
                <div className="h-64 rounded-[1.1rem] bg-slate-200" />
                <div className="mt-5 h-7 rounded-full bg-slate-200" />
                <div className="mt-3 h-4 rounded-full bg-slate-200" />
                <div className="mt-2 h-4 w-2/3 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="surface-card mt-14 px-6 py-12 text-center">
            <p className="text-3xl font-semibold text-gray-900">Unable to load classes</p>
            <p className="mt-3 text-base text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {classes.map((item) => (
              <article
                key={item._id}
                className="surface-card-soft group transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(15,23,42,0.08)]"
              >
                <img src={item.image} alt={item.title} loading="lazy" className="h-64 w-full rounded-t-[1.5rem] object-cover md:h-72 lg:h-64" />

                <div className="px-6 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                        {item.level}
                      </span>
                      <h3 className="mt-4 text-3xl font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <div className="rounded-full bg-amber-50 px-3 py-2 text-right text-xs font-semibold text-amber-700">
                      <div className="inline-flex items-center gap-1">
                        <Star size={14} className="fill-amber-500 text-amber-500" />
                        {item.rating}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-gray-600">{item.description}</p>

                  <div className="mt-5 grid grid-cols-3 gap-3 text-sm text-gray-600">
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-slate-50 px-3 py-3 text-center">
                      <UserRound size={16} className="text-teal-700" />
                      <span className="text-xs font-medium text-gray-700">{item.instructor}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-slate-50 px-3 py-3 text-center">
                      <Clock3 size={16} className="text-teal-700" />
                      <span className="text-xs font-medium text-gray-700">{item.time}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg bg-slate-50 px-3 py-3 text-center">
                      <Calendar size={16} className="text-teal-700" />
                      <span className="text-xs font-medium text-gray-700">{item.schedule}</span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold uppercase tracking-[0.16em] text-gray-500">Plan</span>
                      <span className="font-semibold text-teal-700">{item.price}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{item.duration}</p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button onClick={() => enrollInClass(item)} className="primary-btn flex-1 px-4 py-3 text-sm">
                      <PlusCircle size={16} />
                      Enroll
                    </button>
                    <button
                      onClick={() => showClassDetails(item)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-teal-200 hover:text-teal-700"
                    >
                      <Info size={16} />
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-4"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="surface-card-soft relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedClass(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition hover:bg-white hover:text-gray-900"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={selectedClass.image}
                    alt={selectedClass.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-6 py-6 sm:px-8 sm:py-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                      {selectedClass.level}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      <Star size={14} className="fill-amber-500 text-amber-500" />
                      {selectedClass.rating}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl sm:text-4xl font-semibold text-gray-900">{selectedClass.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{selectedClass.description}</p>

                  <div className="mt-6 grid gap-3 rounded-[1.25rem] bg-slate-50 px-4 py-4 text-sm text-gray-600">
                    <p className="inline-flex items-center gap-2">
                      <UserRound size={16} className="text-teal-700" />
                      <span><span className="font-semibold text-gray-900">Instructor:</span> {selectedClass.instructor}</span>
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Clock3 size={16} className="text-teal-700" />
                      <span><span className="font-semibold text-gray-900">Time:</span> {selectedClass.time}</span>
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Calendar size={16} className="text-teal-700" />
                      <span><span className="font-semibold text-gray-900">Schedule:</span> {selectedClass.schedule}</span>
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Info size={16} className="text-teal-700" />
                      <span><span className="font-semibold text-gray-900">Price:</span> {selectedClass.price} · {selectedClass.duration}</span>
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">What&apos;s included</p>
                    <div className="mt-3 grid gap-2">
                      {selectedClass.features?.map((feature, index) => (
                        <p key={`${feature}-${index}`} className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-teal-700" />
                          {feature}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => enrollInClass(selectedClass)}
                      className="primary-btn flex-1 px-5 py-3 text-sm"
                    >
                      <PlusCircle size={16} />
                      Enroll on WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedClass(null)}
                      className="flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
