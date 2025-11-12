import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: '1. Design & Engineering:',
    description: 'Our team of expert architects and engineers collaborates to create detailed designs tailored to your project\'s specific requirements.',
    svg: (
      <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="48" height="32" rx="6" stroke="#222" strokeWidth="3" fill="#fff" /><rect x="12" y="44" width="40" height="6" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="12" y="14" width="40" height="6" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><circle cx="20" cy="32" r="4" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="28" y="24" width="20" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><path d="M40 16l8 8" stroke="#222" strokeWidth="2" /></svg>
    ),
  },
  {
    title: '2. Mold Preparation:',
    description: 'Molds are created according to the design specifications. These molds are crafted from high-quality materials to ensure precise dimensions and smooth finishes.',
    svg: (
      <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="32" width="36" height="16" rx="4" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="44" y="36" width="12" height="12" rx="3" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="12" y="28" width="24" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><circle cx="20" cy="52" r="4" fill="#fff" stroke="#222" strokeWidth="2" /><circle cx="48" cy="52" r="4" fill="#fff" stroke="#222" strokeWidth="2" /><path d="M20 36v-4c0-2 2-4 4-4h8c2 0 4 2 4 4v4" stroke="#222" strokeWidth="2" /></svg>
    ),
  },
  {
    title: '3. Concrete Casting:',
    description: 'The concrete is mixed to the required grade and poured into the prepared molds. Reinforcement bars are placed within the mold before pouring to ensure structural strength.',
    svg: (
      <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="44" width="48" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="16" y="36" width="32" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="24" y="28" width="16" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><path d="M32 20l8 8M32 20l-8 8" stroke="#222" strokeWidth="2" /><rect x="40" y="20" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /></svg>
    ),
  },
  {
    title: '4. Curing:',
    description: 'Once the concrete is cast, it undergoes a controlled curing process to develop its full strength. This process typically takes 7 to 14 days, depending on the concrete grade and environmental conditions.',
    svg: (
      <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="44" width="48" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="16" y="36" width="32" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="24" y="28" width="16" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="32" y="20" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="40" y="12" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /></svg>
    ),
  },
  {
    title: '5. Quality Control:',
    description: 'Each panel is subjected to rigorous quality checks to ensure it meets the required specifications. This includes testing for strength, durability, and dimensional accuracy.',
    svg: (
      <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="24" r="12" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="20" y="36" width="24" height="16" rx="4" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="40" y="40" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="16" y="40" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="28" y="44" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /></svg>
    ),
  },
];

const Precast = ({ onInquiry }) => {
  const [products, setProducts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(12);
  const navigate = useNavigate();

  const getProducts = async (page = currentPage, productsLimit = limit) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.readymadewall.in/api/products/category/precast?page=${page}&limit=${productsLimit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setProducts(result.products || []);
      setTotalPages(result.totalPages || 1);
      setTotalProducts(result.totalProducts || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      getProducts(newPage, limit);
    }
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    getProducts(1, newLimit); // Reset to first page when changing limit
  };

  const handleImageSlide = (productId, images, direction) => {
    if (!images || images.length === 0) return;
    
    setImageIndexes((prev) => {
      const currentIndex = prev[productId] || 0;
      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return { ...prev, [productId]: newIndex };
    });
  };

  const getProductImages = (product) => {
    if (!product.images) return [];
    return Array.isArray(product.images) ? product.images : [product.images];
  };

  const getProductId = (product) => {
    return product._id || product.id || Math.random().toString(36).substr(2, 9);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 mx-1 text-sm text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg border ${
            currentPage === i
              ? 'bg-blue-400 text-gray-900 border-blue-400'
              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 mx-1 text-sm text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    );

    return pages;
  };

  if (loading) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => getProducts()}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mt-9 w-full min-h-[100vh] flex flex-col items-center justify-center bg-gray-50 py-8 sm:py-12 px-2 md:px-0 relative overflow-hidden">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-gray-900 text-center ">Precast Walls</h1>
        {/* SVG Illustration */}
        <svg width="100%" height="220" viewBox="0 0 900 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 max-w-full h-auto">
          {/* Wall panels */}
          <rect x="40" y="40" width="820" height="100" rx="0" fill="#E5E7EB" stroke="#111" strokeWidth="6" />
          {/* Horizontal lines */}
          {[1, 2, 3, 4].map(i => (
            <line key={i} x1="40" x2="860" y1={40 + i * 20} y2={40 + i * 20} stroke="#111" strokeWidth="2" />
          ))}
          {/* Vertical posts */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x={60 + i * 160} y="40" width="18" height="140" fill="#111" />
          ))}
          {/* Foundation */}
          <rect x="40" y="140" width="820" height="50" fill="#B91C1C" stroke="#111" strokeWidth="2" />
          {/* Foundation cutouts */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x={60 + i * 160} y="140" width="40" height="40" rx="12" fill="#F3F4F6" stroke="#111" strokeWidth="2" />
          ))}
          {/* Top wave */}
          <path d="M40 40 Q60 30 80 40 Q100 50 120 40 Q140 30 160 40 Q180 50 200 40 Q220 30 240 40 Q260 50 280 40 Q300 30 320 40 Q340 50 360 40 Q380 30 400 40 Q420 50 440 40 Q460 30 480 40 Q500 50 520 40 Q540 30 560 40 Q580 50 600 40 Q620 30 640 40 Q660 50 680 40 Q700 30 720 40 Q740 50 760 40 Q780 30 800 40 Q820 50 840 40 Q860 30 860 40" stroke="#111" strokeWidth="4" fill="none" />
        </svg>
        {/* Info Box */}
        <div className="bg-gray-100 rounded-lg shadow p-4 sm:p-6 md:p-8 mb-6 w-full max-w-3xl text-center">
          <p className="text-base sm:text-lg md:text-xl text-gray-800">
            Precast walls are revolutionizing the construction industry by offering a fast, durable, and cost-effective alternative to traditional building methods. Manufactured in a controlled environment, our precast concrete panels are designed to meet the highest standards of quality, ensuring your project is completed on time and within budget.
          </p>
        </div>
        {/* How Precast Walls Are Made? */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 text-center w-full">How Precast Walls Are Made?</h2>
        <div className="w-full flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 mb-8 mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg border p-4 sm:p-6 transition-shadow hover:shadow-2xl w-full max-w-xs flex-shrink-0 flex flex-col items-center text-center gap-2 sm:gap-4">
              {step.svg}
              <span className="font-bold text-lg sm:text-2xl text-gray-900">{step.title}</span>
              <p className="text-sm sm:text-lg text-gray-700 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
        {/* Enquiry Button */}
        <div className="w-full flex justify-center mt-8 px-2 md:px-8">
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 sm:py-4 px-8 sm:px-16 rounded-md shadow transition-all duration-200 text-lg sm:text-xl w-full max-w-xs"
            onClick={() => onInquiry('Precast Walls')}
          >
            SEND ENQUIRY
          </button>
        </div>
      </section>
      {/* Installation Process */}
      <h2 className="text-lg sm:text-2xl font-bold mt-12 sm:mt-16 mb-6 sm:mb-8 text-gray-900 text-center w-full">Installation Process</h2>
      <div className="w-full flex justify-center px-2 md:px-8 mb-8">
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 w-full max-w-5xl justify-center items-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="48" height="48" rx="8" stroke="#222" strokeWidth="3" fill="#fff" /><rect x="18" y="18" width="28" height="6" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="18" y="28" width="28" height="6" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="18" y="38" width="18" height="6" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><circle cx="48" cy="44" r="4" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="44" y="48" width="8" height="4" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /></svg>
            <span className="font-bold text-sm sm:text-base md:text-lg mt-2 text-gray-900 text-center">Site Preparation</span>
          </div>
          {/* Arrow */}
          <div className="hidden sm:flex flex-col items-center justify-center flex-none">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20h20M24 14l6 6-6 6" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="32" width="36" height="16" rx="4" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="44" y="36" width="12" height="12" rx="3" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="12" y="28" width="24" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><circle cx="20" cy="52" r="4" fill="#fff" stroke="#222" strokeWidth="2" /><circle cx="48" cy="52" r="4" fill="#fff" stroke="#222" strokeWidth="2" /><path d="M20 36v-4c0-2 2-4 4-4h8c2 0 4 2 4 4v4" stroke="#222" strokeWidth="2" /></svg>
            <span className="font-bold text-sm sm:text-base md:text-lg mt-2 text-gray-900 text-center">Material Delivery</span>
          </div>
          {/* Arrow */}
          <div className="hidden sm:flex flex-col items-center justify-center flex-none">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20h20M24 14l6 6-6 6" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="36" width="40" height="10" rx="2" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="20" y="28" width="24" height="8" rx="2" fill="#222" stroke="#222" strokeWidth="2" /><rect x="24" y="20" width="16" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="28" y="12" width="8" height="8" rx="2" fill="#222" stroke="#222" strokeWidth="2" /></svg>
            <span className="font-bold text-sm sm:text-base md:text-lg mt-2 text-gray-900 text-center">Positioning</span>
          </div>
          {/* Arrow */}
          <div className="hidden sm:flex flex-col items-center justify-center flex-none">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20h20M24 14l6 6-6 6" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="40" width="44" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="18" y="32" width="28" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="26" y="24" width="12" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><path d="M32 16l4 8M32 16l-4 8" stroke="#222" strokeWidth="2" /><rect x="40" y="16" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /></svg>
            <span className="font-bold text-sm sm:text-base md:text-lg mt-2 text-gray-900 text-center">Jointing & Sealing</span>
          </div>
          {/* Arrow */}
          <div className="hidden sm:flex flex-col items-center justify-center flex-none">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20h20M24 14l6 6-6 6" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          {/* Step 5 */}
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="24" r="12" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="20" y="36" width="24" height="16" rx="4" fill="#fff" stroke="#222" strokeWidth="3" /><rect x="40" y="40" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="16" y="40" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /><rect x="28" y="44" width="8" height="8" rx="2" fill="#fff" stroke="#222" strokeWidth="2" /></svg>
            <span className="font-bold text-sm sm:text-base md:text-lg mt-2 text-gray-900 text-center">Final Inspection</span>
          </div>
        </div>
      </div>

      {/* Products Header with Controls */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-12 md:mt-16 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Our Precast Products
            </h2>
            {totalProducts > 0 && (
              <p className="text-gray-600 text-sm md:text-base">
                Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalProducts)} of {totalProducts} products
              </p>
            )}
          </div>
          
          {/* Limit Selector */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <label htmlFor="limit-select" className="text-sm font-medium text-gray-700">
              Show:
            </label>
            <select
              id="limit-select"
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value={6}>6 per page</option>
              <option value={12}>12 per page</option>
              <option value={18}>18 per page</option>
              <option value={24}>24 per page</option>
            </select>
          </div>
        </div>

        {/* Product Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products && products.length > 0 ? (
            products.map((product) => {
              const imagesArray = getProductImages(product);
              const productId = getProductId(product);
              const currentIndex = imageIndexes[productId] || 0;
              
              return (
                <div
                  onClick={() => navigate(`/singleproducts/${productId}`)}
                  key={productId}
                  className=" cursor-pointer bg-white rounded-xl shadow-md flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative w-full h-48 md:h-56 mb-4">
                    {imagesArray.length > 1 && (
                      <button
                        className="absolute top-1/2 left-4 bg-white bg-opacity-90 rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors duration-200 z-10 transform -translate-y-1/2"
                        onClick={(e) => { e.stopPropagation(); handleImageSlide(productId, imagesArray, -1); }}
                        aria-label="Previous image"
                        type="button"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}
                    {imagesArray.length > 0 ? (
                      <img
                        src={`https://api.readymadewall.in/${imagesArray[currentIndex]}`}
                        alt={product.name || 'Product image'}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No image available</span>
                      </div>
                    )}
                    {imagesArray.length > 1 && (
                      <button
                        className="absolute top-1/2 right-4 bg-white bg-opacity-90 rounded-full p-2 shadow-md hover:bg-blue-100 transition-colors duration-200 z-10 transform -translate-y-1/2"
                        onClick={(e) => { e.stopPropagation(); handleImageSlide(productId, imagesArray, 1); }}
                        aria-label="Next image"
                        type="button"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className='p-5 flex flex-col flex-grow'>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      {product.name || 'Unnamed Product'}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-3 flex-grow">
                      {product.description || 'No description available.'}
                    </p>
                    {product.price && (
                      <p className="text-black font-medium text-base md:text-lg mb-3">₹{product.price}</p>
                    )}
                    <button
                      className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300 mt-auto w-full"
                      onClick={(e) => { e.stopPropagation(); onInquiry(product.name || 'Precast Product'); }}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-base md:text-lg mb-4">
                No precast products available at the moment.
              </p>
              <button
                onClick={() => getProducts()}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300"
              >
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12">
            <div className="flex flex-wrap justify-center items-center">
              {renderPagination()}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Precast;