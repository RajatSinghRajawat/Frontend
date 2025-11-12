import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Paver = ({ onInquiry }) => {
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
      
      const response = await fetch(`https://api.readymadewall.in/api/products/category/pavers?page=${page}&limit=${productsLimit}`);
      
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
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-20 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-20 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
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
    <section className="w-full min-h-screen flex flex-col items-center bg-gray-100 pt-20 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">

      <div className="w-full max-w-6xl mx-auto mb-8 p-3">
        <img
          src="https://indiawalls.in/wp-content/uploads/2024/09/5-1.webp"
          alt="Paver Blocks Banner"
          className="w-full h-64 md:h-80 lg:h-64 rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="mt-5 relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Paver Blocks
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl">
            Paver blocks are durable, interlocking concrete units perfect for driveways, walkways, and patios. Easy to install, low-maintenance, and available in various shapes and colors for stunning outdoor designs.
          </p>
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 text-base md:text-lg w-full sm:w-auto"
            onClick={() => onInquiry('Paver Blocks')}
          >
            Send Enquiry
          </button>
        </div>
      </div>

      {/* Products Header with Controls */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-12 md:mt-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Our Paver Products
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
                      onClick={(e) => { e.stopPropagation(); onInquiry(product.name || 'Paver Product'); }}
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
                No paver products available at the moment.
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
    </section>
  );
};

export default Paver;