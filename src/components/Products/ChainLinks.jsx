import React, { useState, useEffect } from 'react';
import img1 from '../../assets/1-2.webp';
import img2 from '../../assets/2-2.webp';
import img3 from '../../assets/3-2.webp';
import InquiryModal from '../InquiryModal';
import { useNavigate } from 'react-router-dom';

const ChainLinks = ({ onInquiry }) => {
  const [products, setProducts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(12);
  const navigate = useNavigate();


  //api handling

  
  const getProducts = async (page = currentPage, productsLimit = limit) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.readymadewall.in/api/products/category/chainlinks?page=${page}&limit=${productsLimit}`);
      
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
        className="px-2 sm:px-3 py-2 mx-1 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="px-2 sm:px-3 py-2 mx-1 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 sm:px-3 py-2 mx-1 text-xs sm:text-sm text-gray-500">
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
          className={`px-2 sm:px-3 py-2 mx-1 text-xs sm:text-sm font-medium rounded-lg border ${
            currentPage === i
              ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-blue-600'
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
          <span key="ellipsis2" className="px-2 sm:px-3 py-2 mx-1 text-xs sm:text-sm text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-2 sm:px-3 py-2 mx-1 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
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
        className="px-2 sm:px-3 py-2 mx-1 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
    <section className="mt-12 w-full min-h-screen bg-gray-50 py-8 md:py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Chainlink/Concertina Wire
          </h1>
          
          {/* Responsive SVG Illustration */}
          <div className="w-full max-w-4xl mx-auto mb-8">
            <svg 
              className="w-full h-auto max-h-48 md:max-h-56" 
              viewBox="0 0 800 180" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="40" width="780" height="100" rx="16" fill="#F8FAFC" stroke="#B0B7C3" strokeWidth="3" />
              {/* Fence pattern */}
              {Array.from({ length: 6 }).map((_, row) => (
                Array.from({ length: 20 }).map((_, col) => (
                  <rect key={`fence-${row}-${col}`} x={20 + col * 38 + (row % 2) * 19} y={50 + row * 15} width="30" height="12" rx="2" fill="#F3F4F6" stroke="#B0B7C3" strokeWidth="1" />
                ))
              ))}
              {/* Concertina wire (barbed wire) on top */}
              <g>
                {Array.from({ length: 16 }).map((_, i) => (
                  <ellipse key={i} cx={60 + i * 48} cy={40} rx={35} ry={18} stroke="#222" strokeWidth="3" fill="none" />
                ))}
                {Array.from({ length: 16 }).map((_, i) => (
                  <path key={i} d={`M${25 + i * 48},40 Q${60 + i * 48},10 ${95 + i * 48},40`} stroke="#222" strokeWidth="2" fill="none" strokeDasharray="6 6" />
                ))}
              </g>
            </svg>
          </div>

          {/* Info Box */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-4 md:p-6 lg:p-8 mb-8 max-w-4xl mx-auto">
            <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
              Chainlink and concertina wire are key tools for boosting security around properties and restricted areas. Chainlink fencing, made from durable steel wires, effectively encloses large areas, deterring trespassers and containing animals. Concertina wire, with its sharp coiled blades, adds an extra layer of protection, making it difficult for intruders or wildlife to breach the perimeter. Together, they provide a strong, cost-effective security solution for any property.
            </p>
          </div>
        </div>

        {/* Images Gallery */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <img src={img1} alt="Chainlink 1" className="rounded-xl border-4 border-black/20 object-cover aspect-[4/3] w-full h-48 md:h-64 lg:h-72" />
            <img src={img2} alt="Chainlink 2" className="rounded-xl border-4 border-black/20 object-cover aspect-[4/3] w-full h-48 md:h-64 lg:h-72" />
            <img src={img3} alt="Chainlink 3" className="rounded-xl border-4 border-black/20 object-cover aspect-[4/3] w-full h-48 md:h-64 lg:h-72 sm:col-span-2 lg:col-span-1" />
          </div>
        </div>

        {/* Installation Process */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">
            Installation Process
          </h2>
          
          {/* Mobile: Vertical layout */}
          <div className="block lg:hidden">
            <div className="space-y-6 max-w-2xl mx-auto">
              {[
                { title: "Site Preparation", icon: "📋" },
                { title: "Material Delivery", icon: "🚚" },
                { title: "Positioning", icon: "📍" },
                { title: "Jointing & Sealing", icon: "🔧" },
                { title: "Final Inspection", icon: "✅" }
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl">{step.icon}</div>
                  <div className="flex-1">
                    <span className="font-bold text-gray-900">{step.title}</span>
                  </div>
                  {index < 4 && (
                    <div className="text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
              {[
                { title: "Site Preparation", svg: "📋" },
                { title: "Material Delivery", svg: "🚚" },
                { title: "Positioning", svg: "📍" },
                { title: "Jointing & Sealing", svg: "🔧" },
                { title: "Final Inspection", svg: "✅" }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-4xl mb-2">{step.svg}</div>
                  <span className="font-bold text-sm md:text-base text-gray-900 text-center">{step.title}</span>
                  {index < 4 && (
                    <div className="mt-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiry Button */}
        <div className="text-center mb-16">
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 md:py-4 px-8 md:px-16 rounded-md shadow-lg transition-all duration-200 text-lg md:text-xl w-full max-w-xs"
            onClick={() => onInquiry('Chainlink/Concertina Wire')}
          >
            SEND ENQUIRY
          </button>
        </div>

        {/* Products Section */}
        <div className="relative z-10">
          {/* Products Header with Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Our Chainlink Products
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={18}>18 per page</option>
                <option value={24}>24 per page</option>
              </select>
            </div>
          </div>

          {/* Product Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
                          className="absolute top-1/2 left-2 md:left-4 bg-white bg-opacity-90 rounded-full p-1 md:p-2 shadow-md hover:bg-blue-100 transition-colors duration-200 z-10 transform -translate-y-1/2"
                          onClick={(e) => { e.stopPropagation(); handleImageSlide(productId, imagesArray, -1); }}
                          aria-label="Previous image"
                          type="button"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          className="absolute top-1/2 right-2 md:right-4 bg-white bg-opacity-90 rounded-full p-1 md:p-2 shadow-md hover:bg-blue-100 transition-colors duration-200 z-10 transform -translate-y-1/2"
                          onClick={(e) => { e.stopPropagation(); handleImageSlide(productId, imagesArray, 1); }}
                          aria-label="Next image"
                          type="button"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className='p-4 md:p-5 flex flex-col flex-grow'>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name || 'Unnamed Product'}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base mb-3 flex-grow line-clamp-3">
                        {product.description || 'No description available.'}
                      </p>
                      {product.price && (
                        <p className="text-black font-medium text-base md:text-lg mb-3">₹{product.price}</p>
                      )}
                      <button
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-4 md:px-6 rounded-lg shadow-sm transition-all duration-300 mt-auto w-full text-sm md:text-base"
                        onClick={(e) => { e.stopPropagation(); onInquiry(product.name || 'Chainlink Product'); }}
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
                  No chainlink products available at the moment.
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
      </div>
    </section>
  );
};

export default ChainLinks; 