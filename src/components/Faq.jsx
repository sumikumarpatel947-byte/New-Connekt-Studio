import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I get started with Connekt Studio?",
    answer: "Choose a class, create your account, complete your payment, and check your email for your joining details.",
  },
  {
    question: "What equipment do I need?",
    answer: "A yoga mat, comfortable clothes, a good internet connection, and a device with enough space to follow along comfortably.",
  },
  {
    question: "What types of classes do you offer?",
    answer: "We offer beginner yoga, meditation, fitness training, personalised diet plans and preconception , prenatal and postpartum care designed for different goals and experience levels.",
  },
  {
    question: "What are your pricing options?",
    answer: "Check our classes section for detailed pricing information on different plans and packages.",
  },
  {
    question: "What if I miss a live class?",
    answer: "You can watch the recording later, so missing a live session does not interrupt your practice.",
  },
  {
    question: "Is online yoga safe for beginners?",
    answer: "Yes. The beginner classes are guided carefully and include modifications to help new students practice safely.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">FAQ</span>
          <h2 className="section-heading mt-6 text-balance">Answers delivered with the same clarity as the design.</h2>
          <p className="section-copy mt-5">
            Find answers to common questions about our classes, membership plans, and how to get started with your wellness journey.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="surface-card px-5 py-5 sm:px-6">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <div>
                    <p className="text-3xl font-semibold text-gray-900">{faq.question}</p>
                  </div>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div className={`faq-answer ${isOpen ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"}`}>
                  <div>
                    <p className="text-sm leading-8 text-gray-600 sm:text-base">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
