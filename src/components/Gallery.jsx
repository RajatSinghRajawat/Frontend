import React from 'react';

const images = [
  // Replace these URLs with your own images or local paths
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/5.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/8.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/9.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/3-1.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/6.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/7.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/10.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/12.webp.bv_resized_desktop.webp.bv.webp',
  'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/14.webp.bv_resized_desktop.webp.bv.webp'
];

const Gallery = () => {
  return (
    <>
      <div className=" mt-22 min-h-screen  flex flex-col items-center justify-center py-8 px-2">
        <h1 className=" text-3xl text-start font-bold">Products Gallery</h1>

        <div className="w-full  max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((src, idx) => (
            <div key={idx} className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <img
                src={src}
                alt={`Precast wall ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;