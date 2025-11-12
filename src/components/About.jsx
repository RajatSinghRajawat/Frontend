import React from 'react'
import profile from '../assets/profile.png'
const About = () => {
  return (
    <>
      <section className="w-full min-h-[70vh] flex items-center justify-center bg-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 w-full h-full 
      bg-blue-400/90
       z-0">
          <img
            src="https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2025/01/123-1536x1523-1.webp.bv_resized_desktop.webp.bv.webp"
            alt="Background"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
        </div>
        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-16 md:py-24 gap-8 md:gap-16">
          {/* Left: Text */}
          <div className="w-full md:w-2/3 flex flex-col justify-center items-start text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">About Us</h2>
            <p className="text-lg text-black md:text-xl text-black mb-8 max-w-2xl">
              <span className='text-2xl font-bold text-black'>Leading Precast Wall Manufacturer in Alwar</span><br />
              Founded in 2015 by Rohit Kumar Yadav, Shree Shyam Precast has been dedicated to building strong and reliable
              security walls for homes, businesses, and industries. To meet the growing demand for durable and eco-friendly
              solutions, we expanded in 2019 to offer high-quality precast compound walls and barbed wire fencing. Our goal is to
              provide cost-effective, long-lasting boundary solutions that match today’s construction needs
            </p>
            <button className="bg-black text-white font-bold px-8 py-3 rounded-md shadow hover:bg-gray-800 transition-all duration-200 text-base md:text-lg">
              DOWNLOAD THE COMPANY PROFILE
            </button>
          </div>
          {/* Right: Profile Image */}
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="relative rounded-md shadow-lg p-2 md:p-4">
                <img
                  src={profile}
                  alt="Rohit Kumar Yadav"
                  className="h-80 md:h-[32rem] w-6xl object-contain rounded-md"
                />
                <div className="absolute bottom-0 left-0 right-0 text-center bg-gradient-to-r from-blue-800 via-blue-900 to-black rounded-b-md px-6 py-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Rohit Yadav</h3>
                  <p className="text-sm md:text-base text-gray-200 font-medium">Founder of Shree Shyam Precast</p>
                </div>
              </div>
              {/* Profile Tag */}

            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 py-8 px-2 md:px-0 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-blue-400/90 z-0">
          <img
            src="https://images.adsttc.com/media/images/57ff/dc3c/e58e/ce51/8e00/00f0/medium_jpg/PORTADA_16_encuentros_ladrillos.jpg?1476385839"
            alt="Background"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
        </div>
        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex-col md:flex-row items-center justify-center px-4 py-16 md:py-24 gap-8 md:gap-16">
          {/* Top: Images */}
          <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto mb-8 gap-0">
            <img src="https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/09/Indiawalls-Website-Updates-2-6-scaled.webp.bv_resized_desktop.webp.bv.webp" alt="Mission" className="w-full  h-56 md:h-64 object-cover object-center rounded-t-xl md:rounded-tl-xl md:rounded-tr-none" />
          </div>
          {/* Bottom: Mission & Vision Text */}
          <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto">
            {/* Mission */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 flex-1 rounded-bl-xl rounded-br-xl md:rounded-bl-xl md:rounded-br-none">
              <h3 className="text-2xl font-bold mb-2 text-white">MISION</h3>
              <hr className="border-t-2 border-white mb-4 w-16 md:w-full" />
              <p className="text-white text-base md:text-lg">
                At Shree Shyam Precast, our mission is to provide high-quality, innovative, and customizable precast walls and fencing solutions that ensure safety, efficiency, and convenience for our clients. We are committed to delivering superior products and excellent service, meeting the evolving security needs of construction sites and land protection.
              </p>
            </div>
            {/* Vision */}
            <div className="bg-black p-8 flex-1 rounded-br-xl rounded-bl-xl md:rounded-bl-none md:rounded-br-xl">
              <h3 className="text-2xl font-bold mb-2 text-white">VISION</h3>
              <hr className="border-t-2 border-white mb-4 w-16 md:w-full" />
              <p className="text-white text-base md:text-lg">
                Our vision at Shree Shyam Precast is to be the leading provider of precast walls and security fencing in India, recognized for our expertise, reliability, and commitment to customer satisfaction. We strive to expand our presence and capabilities, offering comprehensive solutions that contribute to the safety and success of construction projects and land development initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security You Can Trust Section */}
      <section className="w-full bg-white py-12 px-2 md:px-0 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-4xl font-bold mb-4 text-gray-900">Security You Can Trust, Quality You Can See</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            We specialize in crafting high-quality, easily deployable, and relocatable walls for land and construction site security. Shree Shyam Precast provides precast reinforced concrete walls perfect for robust, low-maintenance construction projects.
          </p>
        </div>

      </section>
    </>
  )
}

export default About