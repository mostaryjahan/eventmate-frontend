"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "What is EventMate?",
      answer: "EventMate is a platform that connects people who want to participate in local events, sports, or hobbies but don't have companions. Whether it's concerts, hiking trips, or meetups, you can find like-minded people to join you."
    },
    {
      question: "How does EventMate work?",
      answer: "Simply create an account, browse events in your area or create your own, and connect with others who share your interests. Our platform facilitates secure messaging and helps you find the perfect event companions."
    },
    {
      question: "How do I stay safe on EventMate?",
      answer: "We prioritize safety with verified profiles, secure messaging, and event reviews. Always meet in public places, tell someone where you're going, and trust your instincts. Our community guidelines help maintain a respectful environment."
    },
    {
      question: "Can I create my own events?",
      answer: "Absolutely! You can create events for any activity you're interested in. Set details like location, time, group size, and activity level to attract the right participants."
    },
    {
      question: "What if I need to cancel an event?",
      answer: "You can cancel events you've created, and we'll notify all participants. For events you've joined, please notify the event host as soon as possible if you can't attend."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-primary font-medium text-gray-900 mb-3">Frequently Asked Questions</h2>
        <p className="text-gray-600 font-secondary">Find answers to common questions about EventMate</p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium font-secondary text-gray-900 text-lg">
                {item.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary font-secondary shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 font-secondary shrink-0" />
              )}
            </button>
            
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'pb-4' : 'max-h-0'
              }`}
            >
              <p className="text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <a
          href="mailto:eventmate@info.com"
          className="inline-flex items-center font-secondary text-primary font-medium hover:text-[#8a1a55] transition-colors"
        >
          Contact our support team
          <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
        </a>
      </div>
    </div>
  );
};

export default FAQ;