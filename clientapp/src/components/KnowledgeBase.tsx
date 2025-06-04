import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Award, BookOpen } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface SuccessStory {
  title: string;
  compensation: string;
  description: string;
}

const faqs: FAQ[] = [
  {
    question: "What compensation am I entitled to for a delayed flight?",
    answer: "Under EU Regulation 261/2004, you may be entitled to compensation of up to €600 for flight delays of more than 3 hours. The exact amount depends on the flight distance and the length of the delay."
  },
  {
    question: "How long do I have to file a claim?",
    answer: "The time limit varies by country, but generally you have up to 6 years from the date of the flight to file a claim. However, we recommend filing as soon as possible while the details are fresh."
  },
  {
    question: "What documentation do I need to support my claim?",
    answer: "You should provide your booking confirmation, boarding pass, and any communication from the airline about the disruption. Photos or receipts for expenses during delays can also be helpful."
  },
  {
    question: "What if the airline claims 'extraordinary circumstances'?",
    answer: "Airlines often cite 'extraordinary circumstances' to avoid paying compensation. However, many situations (like technical problems or staff shortages) don't qualify as extraordinary. We can help assess your case."
  }
];

const successStories: SuccessStory[] = [
  {
    title: "4-Hour Delay Compensation",
    compensation: "€600",
    description: "Family of four received compensation after their flight to Greece was delayed by 4 hours due to technical issues."
  },
  {
    title: "Lost Baggage Resolution",
    compensation: "€1,200",
    description: "Business traveler's luggage was lost for 5 days. We helped secure compensation for essential items and inconvenience."
  },
  {
    title: "Overbooking Success",
    compensation: "€400",
    description: "Passenger denied boarding due to overbooking received compensation and a replacement flight within 24 hours."
  }
];

function KnowledgeBase() {
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Legal Tips Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Legal Tips</h2>
              </div>
              <ul className="space-y-4">
                <li className="text-gray-700">
                  <strong className="block text-gray-900">Know Your Rights</strong>
                  Airlines must provide care and compensation for significant delays and cancellations.
                </li>
                <li className="text-gray-700">
                  <strong className="block text-gray-900">Keep Documents</strong>
                  Save all tickets, receipts, and airline communications.
                </li>
                <li className="text-gray-700">
                  <strong className="block text-gray-900">Act Quickly</strong>
                  File claims as soon as possible after the incident.
                </li>
                <li className="text-gray-700">
                  <strong className="block text-gray-900">Document Everything</strong>
                  Take photos and notes of any issues with flights or baggage.
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left flex justify-between items-center py-2"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openFAQs.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openFAQs.includes(index) && (
                      <p className="mt-2 text-gray-600 pl-4">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-semibold">Success Stories</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {story.title}
                    </h3>
                    <div className="text-blue-600 font-bold mb-2">
                      {story.compensation} Compensation
                    </div>
                    <p className="text-gray-600">{story.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBase;