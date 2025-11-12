import React, { useEffect, useRef } from 'react';

const logos = [
  {
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/2-3-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'Essel Realty',
  },
  {
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/2-4-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'Municipal Corporation',
  },
  {
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/3-3-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'BVG',
  },
  {
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/3-3-150x150-2.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'नगर परिषद',
  },
  {
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/5-3-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'नगर परिषद',
  },{
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/1-2-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'नगर परिषद',
  },{
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/1-3-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'नगर परिषद',
  },{
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/2-2-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'नगर परिषद',
  },{
    src: 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/2-3-150x150-1.webp.bv_resized_mobile.webp.bv.webp',
    alt: 'नगर परिषद',
  },
];

const SLIDE_INTERVAL = 2500;

const ClienteleSlider = () => {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      if (sliderRef.current) {
        index = (index + 1) % logos.length;
        sliderRef.current.scrollTo({
          left: index * 220, // width of one logo + margin
          behavior: 'smooth',
        });
      }
    }, SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="w-full flex items-center justify-center bg-white py-8 relative overflow-hidden" style={{ minHeight: '220px' }}>
      {/* Blue angled background */}
      <div className="hidden md:block absolute left-0 top-0 h-full w-1/4 -z-10">
        <svg width="100%" height="100%" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <polygon points="0,0 220,0 60,220 0,220" fill="#F6C948" />
        </svg>
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8">Our Clientele</h2>
        <div
          ref={sliderRef}
          className="flex gap-12 overflow-x-auto scrollbar-none w-full px-4 md:px-0"
          style={{ scrollBehavior: 'smooth', width: '900px', maxWidth: '100%', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center justify-center bg-white rounded shadow-none"
              style={{ width: '200px', height: '120px' }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain h-20 mb-2"
                style={{ maxWidth: '180px', maxHeight: '80px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClienteleSlider; 