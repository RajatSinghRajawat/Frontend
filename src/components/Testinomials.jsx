import React from 'react';
import ClienteleSlider from './ClienteleSlider';

const testimonials = [
  {
    text: `Choosing Shree Shyam Precast was the best decision for our construction site security. Their precast walls are robust and low-maintenance. The installation team was efficient and courteous. We are extremely satisfied with their service.`,
    author: 'Prakash Singh, Alwar',
  },
  {
    text: `Shree Shyam Precast provided us with a custom solution for our boundary wall needs. Their attention to detail and customerfocused approach made the entire process seamless. The end result is both secure and visually appealing. Excellent service!`,
    author: 'Rajesh Kumar, Palwal',
  },
  {
    text: `We had a fantastic experience with Shree Shyam Precast. Their products are reliable and built to last. The team's professionalism and commitment to quality were evident throughout our project. We are very pleased with the results.`,
    author: 'Vikram Chauhan, Bhiwadi',
  },
];

const Testinomials = () => {
  return (
    <>
    <section className=" mt-9 w-full bg-white flex flex-col md:flex-row min-h-[80vh]">
      {/* Left Side: Blue Shape, Heading, Icon */}
      <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 py-12 px-4 sm:px-8 bg-white overflow-hidden">
        {/* Blue angled background */}
        <div className="hidden md:block absolute left-0 top-0 h-full w-full -z-10">
          <svg width="100%" height="100%" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <polygon points="0,0 350,0 100,800 0,800" fill="#F6C948" />
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 mt-4 md:mt-0">Testimonials</h2>
        {/* Icon: People with stars */}
        <div className="flex justify-center mb-4">
          <img src="https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/Indiawalls-Website-Updates-2-9-969x1024.webp.bv_resized_mobile.webp.bv.webp" alt="" style={{width: '100%', height: '70%'}} />
        </div>
      </div>
      {/* Right Side: Testimonials */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-12">
        {/* Up Arrow */}
        <div className="flex justify-start md:justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8L24 16H20V24H12V16H8L16 8Z" fill="#F6C948" />
          </svg>
        </div>
        <div className="space-y-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="">
              <p className="text-gray-700 text-lg leading-relaxed mb-2">{t.text}</p>
              <p className="text-gray-600 text-base">- {t.author}</p>
            </div>
          ))}
        </div>
        {/* Down Arrow */}
        <div className="flex justify-start md:justify-center mt-8">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 24L8 16H12V8H20V16H24L16 24Z" fill="#F6C948" />
          </svg>
        </div>

      </div>
    </section>
    <ClienteleSlider />

    </>
  );
};

export default Testinomials;