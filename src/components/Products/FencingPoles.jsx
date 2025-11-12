import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FencingPoles = ({ onInquiry }) => {
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
      
      const response = await fetch(`https://api.readymadewall.in/api/products/category/fencingpoles?page=${page}&limit=${productsLimit}`);
      
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
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full  text-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fencing Poles
              </h1>
              <p className="text-xl md:text-2xl  leading-relaxed">
                Essential for creating secure and reliable barriers around properties, farms, and other areas that require protection.
              </p>
              <div className="bg-blue-400 bg-opacity-20 backdrop-blur-sm rounded-lg p-6 border border-blue-400 border-opacity-30">
                <p className="text-gray-200 text-lg leading-relaxed">
                  Fencing poles provide a sturdy foundation for fences, making them effective in keeping animals within designated areas and preventing trespassers from entering. By establishing clear boundaries, fencing poles enhance security, deter unauthorized access, and protect against potential threats from wildlife or intruders.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onInquiry('Fencing Poles')}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Quote
                </button>
                <button 
                  className="border-2 border-black  hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className=" rounded-2xl p-8 shadow-2xl">
               <img src="https://indiawalls.in/wp-content/uploads/2024/09/6.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Fencing Poles?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade fencing solutions designed for durability, security, and long-term performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Durable Construction</h3>
              <p className="text-gray-600">Made from high-quality materials that withstand harsh weather conditions and provide long-lasting protection.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enhanced Security</h3>
              <p className="text-gray-600">Provides robust protection against unauthorized access and helps secure your property effectively.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Installation</h3>
              <p className="text-gray-600">Designed for quick and straightforward installation, saving time and reducing labor costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="w-full bg-gray-50 py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Installation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our professional installation process ensures your fencing poles are installed correctly and efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-gray-900">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Site Preparation</h3>
              <p className="text-gray-600 text-sm">Clear the area and mark the fence line for proper positioning</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-gray-900">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Material Delivery</h3>
              <p className="text-gray-600 text-sm">All materials delivered to your site with care and precision</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-gray-900">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Positioning</h3>
              <p className="text-gray-600 text-sm">Strategic placement of poles for optimal security and stability</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-gray-900">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Jointing & Sealing</h3>
              <p className="text-gray-600 text-sm">Professional joining and sealing for maximum durability</p>
            </div>

            {/* Step 5 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-gray-900">5</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Final Inspection</h3>
              <p className="text-gray-600 text-sm">Quality check to ensure everything meets our standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Products Header with Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Fencing Pole Products
              </h2>
              {totalProducts > 0 && (
                <p className="text-gray-600 text-lg">
                  Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalProducts)} of {totalProducts} products
                </p>
              )}
            </div>
            
            {/* Limit Selector */}
            <div className="flex items-center space-x-2 mt-6 md:mt-0">
              <label htmlFor="limit-select" className="text-sm font-medium text-gray-700">
                Show:
              </label>
              <select
                id="limit-select"
                value={limit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={18}>18 per page</option>
                <option value={24}>24 per page</option>
              </select>
            </div>
          </div>

          {/* Product Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {products && products.length > 0 ? (
              products.map((product) => {
                const imagesArray = getProductImages(product);
                const productId = getProductId(product);
                const currentIndex = imageIndexes[productId] || 0;
                
                return (
                  <div
                    onClick={() => navigate(`/singleproducts/${productId}`)}
                    key={productId}
                    className=" cursor-pointer bg-white rounded-xl shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
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
                          className="w-full h-full object-cover rounded-t-xl"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-t-xl flex items-center justify-center">
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
                    <div className='p-6 flex flex-col flex-grow'>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {product.name || 'Unnamed Product'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">
                        {product.description || 'No description available.'}
                      </p>
                      {product.price && (
                        <p className="text-black font-bold text-xl mb-4">₹{product.price}</p>
                      )}
                      <button
                        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-all duration-300 mt-auto w-full transform hover:scale-105"
                        onClick={(e) => { e.stopPropagation(); onInquiry(product.name || 'Fencing Pole Product'); }}
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="max-w-md mx-auto">
                  <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
                  <p className="text-gray-600 mb-6">
                    No fencing pole products available at the moment. Please check back later.
                  </p>
                  <button
                    onClick={() => getProducts()}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-all duration-300"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-16">
              <div className="flex flex-wrap justify-center items-center">
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FencingPoles;