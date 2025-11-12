import React from 'react';

const steps = [
  {
    title: "Consultation",
    icon: (
      // Chat bubble icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-3.582 7-8 7a8.96 8.96 0 01-4-.93L3 21l1.07-3.21A7.963 7.963 0 013 12c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
      </svg>
    ),
    description: "We start with a detailed consultation to understand your requirements and assess the site for a customized solution.",
  },
  {
    title: "Design & Planning",
    icon: (
      // Engineer icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" />
      </svg>
    ),
    description: "Our team designs and plans the boundary wall using advanced software to ensure precise alignment with your specifications.",
  },
  {
    title: "Production",
    icon: (
      // Factory icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="13" width="18" height="8" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13V7h2v6m6 0V7h2v6" />
      </svg>
    ),
    description: "We produce the compound wall in our state-of-the-art facilities, maintaining high standards of quality and durability.",
  },
  {
    title: "Installation",
    icon: (
      // Brick wall icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="15" width="18" height="4" rx="1" />
        <rect x="3" y="9" width="8" height="4" rx="1" />
        <rect x="13" y="9" width="8" height="4" rx="1" />
      </svg>
    ),
    description: "Our experts transport and install the wall on-site, following strict protocols to ensure secure and proper assembly.",
  },
  {
    title: "Final Inspection",
    icon: (
      // Inspection icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
    ),
    description: "We conduct a final inspection to verify that the wall meets all specifications, ensuring structural soundness and quality.",
  },
];

const HowItWorks = () => {
  return (
    <>
      {/* Project Steps Section */}
      <section className=" mt-22 py-10 md:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 md:mb-12">How We Complete a Full Project</h2>
          <div className="bg-[#e6cead] rounded-xl p-4 sm:p-6 md:p-12 flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center px-2 sm:px-4 mb-8 md:mb-0">
                {step.icon}
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-800 text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 md:mb-12">
            Benefits of Reinforced Concrete Shree Shyam Precast
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 max-w-5xl mx-auto">
            {/* Quick Installation */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="none" fill="none"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6v2M12 16v2M6 12h2M16 12h2M7.8 7.8l1.4 1.4M16.2 16.2l-1.4-1.4M7.8 16.2l1.4-1.4M16.2 7.8l-1.4 1.4" stroke="currentColor" strokeWidth="2.2"/>
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Quick Installation</span>
            </div>
            {/* Resistant to Natural Elements */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Resistant to Natural Elements</span>
            </div>
            {/* Low Maintenance */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="none" fill="none"/>
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4l16 16" stroke="currentColor" strokeWidth="2.2"/>
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Low Maintenance</span>
            </div>
            {/* Enhanced Security */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path d="M12 2l7 5v6c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V7l7-5z" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 15v2" />
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Enhanced Security</span>
            </div>
            {/* Cost-Effective Solution */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M16 3v4M8 3v4M3 11h18" />
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Cost-Effective Solution</span>
            </div>
            {/* Eco-Friendly and Sustainable */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  <path d="M12 6v6l4 2" />
                  <path d="M8 16l4-4" />
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Eco-Friendly and Sustainable</span>
            </div>
            {/* Increases Property Value */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2" />
                  <circle cx="12" cy="7" r="4" />
                  <path d="M16 21v-2a4 4 0 00-8 0v2" />
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Increases Property Value</span>
            </div>
            {/* Easy to Maintain */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">Easy to Maintain</span>
            </div>
            {/* High Durability */}
            <div className="flex flex-col items-center text-center">
              <span className="inline-block bg-blue-300 rounded-full p-4 mb-4">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-black" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <span className="mt-2 text-base sm:text-xl font-bold">High Durability</span>
            </div>
          </div>
        </div>
      </section>
      {/* Why Us Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">Why Us</h2>
          <div className="bg-gray-100 rounded-md py-8 sm:py-12 md:py-16 px-2 sm:px-4 md:px-0 flex flex-col items-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-0 md:gap-x-0 justify-items-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">10+</span>
                <span className="text-base sm:text-lg font-bold text-black mt-2">Products</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">350+</span>
                <span className="text-base sm:text-lg font-bold text-black mt-2">Laborers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">45+</span>
                <span className="text-base sm:text-lg font-bold text-black mt-2">Supervisors</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">2,000+</span>
                <span className="text-base sm:text-lg font-bold text-black mt-2">Satisfied Customers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">270+</span>
                <span className="text-base sm:text-lg font-bold text-black mt-2">Employees</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">7+</span>
                <span className="text-base sm:text-lg font-bold text-black mt-2">Years of Experience</span>
              </div>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mt-10 md:mt-16">
            Reliability and Strength in Every Wall We Build
          </h3>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;