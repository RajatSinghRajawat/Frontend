import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Placeholder logo and social icons (replace with your actual images/icons as needed)
const logo = '/src/assets/logo.png'; // Replace with your logo path

// Social media icons array
const socialIcons = [
  { name: 'Facebook', icon: <FaFacebook size={20} />, url: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: <FaTwitter size={20} />, url: '#', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: <FaInstagram size={20} />, url: '#', color: 'hover:text-pink-600' },
  { name: 'LinkedIn', icon: <FaLinkedin size={20} />, url: '#', color: 'hover:text-blue-700' },
  { name: 'YouTube', icon: <FaYoutube size={20} />, url: '#', color: 'hover:text-red-600' }
];

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 w-full border-t border-gray-200 shadow-lg">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Logo & Social */}
          <div className="flex flex-col items-center lg:items-start">
            <img src={logo} alt="Shree Shyam Precast Logo" className="w-48 h-auto mb-4 filter drop-shadow-sm" />
            <div className="flex space-x-4 mt-2">
              {socialIcons.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.url}
                  aria-label={item.name} 
                  className={`p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 ${item.color} text-gray-600`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-blue-900 text-lg font-bold mb-6 tracking-wide border-b-2 border-blue-200 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3 text-center lg:text-left">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Blogs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Terms of Use</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-blue-900 text-lg font-bold mb-6 tracking-wide border-b-2 border-blue-200 pb-2">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-blue-100 rounded-full">
                  <FaPhone className="text-blue-600" size={14} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Phone Number</p>
                  <p className="text-gray-800 font-semibold">7820879777</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <FaWhatsapp className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">WhatsApp</p>
                  <p className="text-gray-800 font-semibold">7820879777</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <FaEnvelope className="text-red-600" size={16} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Email</p>
                  <p className="text-gray-800 font-semibold text-sm">rohitsunrise87@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Address */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-blue-900 text-lg font-bold mb-6 tracking-wide border-b-2 border-blue-200 pb-2">
              Office Address
            </h3>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-orange-100 rounded-full mt-1">
                <FaMapMarkerAlt className="text-orange-600" size={16} />
              </div>
              <div className="text-gray-600 text-sm leading-relaxed font-medium">
                KHASRA NO. 1364, VPO- KITHOOR, SUB TEHSIL-BAHADURPUR, Alwar, Rajasthan, 301028
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm font-medium">
              © 2024 Shree Shyam Precast. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0">
              Unlock Your Construction Dreams
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;