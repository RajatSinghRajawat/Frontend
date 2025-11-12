import React, { useState } from 'react';

const faqs = [
  {
    question: 'What are Shree Shyam Precast Ready-made Reinforced Concrete walls?',
answer: 'Shree Shyam Precast Ready-made Reinforced Concrete walls are pre-cast concrete panels designed for quick and durable wall construction.'
  },
  {
    question: 'How are Shree Shyam Precast Ready-made Reinforced Concrete walls installed?',
    answer: 'They are installed by placing the pre-cast panels on-site and securing them with minimal construction time.'
  },
  {
    question: 'Are Shree Shyam Precast Ready-made Reinforced Concrete walls strong enough for security purposes?',
    answer: 'Yes, they are reinforced and provide excellent security and durability.'
  },
  {
    question: 'Can Shree Shyam Precast Ready-made Reinforced Concrete walls be designed to match my property\'s aesthetic?',
    answer: 'Absolutely! They can be customized in terms of finish and color to match your property.'
  },
  {
    question: 'Are Shree Shyam Precast Ready-made Reinforced Concrete walls eco-friendly?',
    answer: 'Yes, they are made from sustainable materials and have a lower environmental impact than traditional brick walls.'
  },
  {
    question: 'What is the maintenance required for Shree Shyam Precast Ready-made Reinforced Concrete walls?',
    answer: 'Minimal maintenance is required. Occasional cleaning and inspection are recommended to ensure longevity.'
  },
  {
    question: 'Can Shree Shyam Precast Ready-made Reinforced Concrete walls be used for commercial properties?',
    answer: 'Yes, they are suitable for both residential and commercial properties.'
  },
  {
    question: 'How long does it take to install Shree Shyam Precast Ready-made Reinforced Concrete walls?',
    answer: 'Installation is quick and can often be completed within a few days, depending on the project size.'
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className=" mt-12 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-8 mt-8">FAQ</h1>
      <div className="w-full max-w-6xl bg-white p-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-200">
            <button
              className="w-full text-left py-4 px-6 focus:outline-none flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 transition-colors text-lg font-medium text-white"
              onClick={() => handleToggle(idx)}
            >
              <span>{idx + 1}. {faq.question}</span>
              <span className="text-sm ml-2">{openIndex === idx ? '▲' : '▼'}</span>
            </button>
            {openIndex === idx && (
              <div className="bg-white px-6 py-4 text-gray-800 text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;