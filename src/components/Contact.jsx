import emailjs from "emailjs-com";
import { useState, useEffect } from "react";
import { Check, Mail, MapPin, MessageCircle, Phone, UserRound, X } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.id]: event.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_c98c59e",     
      "template_3udy977",    
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
      "EyQuVdAZF-b30Rl8b"      
    )
    .then(() => {
      setShowSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setShowSuccess(false), 3000);
    })
    .catch((error) => {
      console.error(error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    });
};

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Contact</span>
          <h2 className="section-heading mt-6 text-balance">Reach out and begin with a calm, guided first step.</h2>
          <p className="section-copy mt-5">
            Modern form design, clearer spacing, and the same existing message handling underneath.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="surface-card px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <UserRound size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Owner</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700 sm:text-base">Hina Pamnani</p>
                </div>
              </div>
            </div>

            <div className="surface-card px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Address</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700 sm:text-base">
                    Near pustak bazaar, Indradhanush jewellers, above mehta stores, Neemuch, ( M.P )
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Phone</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700 sm:text-base">+91 9039570885</p>
                </div>
              </div>
            </div>

            <div className="surface-card px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Email</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700 sm:text-base">connektbmsstudio@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="surface-card-soft px-6 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Quick connect</p>
              <div className="mt-4 grid gap-3">
                <a
                  href="https://wa.me/919039570885?text=Hi!%20I'm%20interested%20in%20joining%20Connekt%20Studio%20yoga%20classes"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-teal-50 px-4 py-4 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
                >
                  Message on WhatsApp
                  <MessageCircle size={18} />
                </a>
                <a
                  href="https://maps.google.com/?q=Near+pustak+bazaar,+Indradhanush+jewellers,+above+mehta+stores,+Neemuch,+MP"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-4 text-sm font-semibold text-gray-700 transition hover:bg-slate-200"
                >
                  Open location in Maps
                  <MapPin size={18} />
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="surface-card-soft px-6 py-8 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Send a message</p>
              <h3 className="mt-4 text-4xl font-semibold text-gray-900">Tell us what kind of practice you need.</h3>
              <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
                We usually reply within 24 hours and help you find the right class, level, and schedule.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">Your name</label>
                <input id="name" type="text" value={form.name} onChange={handleChange} required className="field-input" placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">Phone number</label>
                <input id="phone" type="tel" value={form.phone} onChange={handleChange} required className="field-input" placeholder="Enter your phone number" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email address</label>
                <input id="email" type="email" value={form.email} onChange={handleChange} required className="field-input" placeholder="Enter your email" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">Your message</label>
                <textarea
                  id="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="field-input resize-none"
                  placeholder="Share your goal, your level, or any questions you have."
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">Simple, direct, and human support.</p>
              <button type="submit" className="primary-btn">
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 rounded-full bg-teal-600 px-6 py-3 shadow-2xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Check size={18} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Message sent successfully!</span>
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 rounded-full bg-red-600 px-6 py-3 shadow-2xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <X size={18} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Failed to send message</span>
          </div>
        </div>
      )}
    </section>
  );
}
