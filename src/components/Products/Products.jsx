import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = ({ onInquiry }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imageIndexes, setImageIndexes] = useState({});
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.readymadewall.in/api/products/?page=${currentPage}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products || []);
      setTotalProducts(data.totalProducts || 0);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, limit]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleImageSlide = (productId, imagesArray, direction) => {
    setImageIndexes(prev => {
      const currentIndex = prev[productId] || 0;
      const newIndex = direction === 1 
        ? (currentIndex + 1) % imagesArray.length
        : currentIndex === 0 
          ? imagesArray.length - 1 
          : currentIndex - 1;
      return { ...prev, [productId]: newIndex };
    });
  };

  const getProductImages = (product) => {
    if (!product.images) return [];
    return Array.isArray(product.images) ? product.images : [product.images];
  };

  const getProductId = (product) => {
    return product._id || product.id || Math.random().toString();
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
        >
          Previous
        </button>
      );
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
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
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
            i === currentPage
              ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border border-blue-600'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
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
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
        >
          Next
        </button>
      );
    }

    return pages;
  };

  return (
    <section className="mt-[3rem] w-full min-h-[80vh] bg-gray-50 py-12 px-2 md:px-0 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Precast Walls Card */}
          <div className="bg-gray-100 rounded-lg shadow p-6 flex flex-col items-center text-center">
            {/* Precast SVG */}
            <svg width="260" height="120" viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              <rect x="10" y="20" width="240" height="70" rx="8" fill="#F8FAFC" stroke="#222" strokeWidth="4"/>
              {/* Vertical posts */}
              {[0, 1, 2, 3].map(i => (
                <rect key={i} x={30 + i*60} y="20" width="10" height="70" rx="3" fill="#222" />
              ))}
              {/* Base blocks */}
              {[0, 1, 2, 3].map(i => (
                <rect key={i} x={28 + i*60} y="85" width="14" height="20" rx="3" fill="#B0B7C3" />
              ))}
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Precast Walls</h2>
            <p className="text-gray-800 mb-6">Precast walls are durable concrete panels manufactured off-site and assembled quickly, reducing construction time and ensuring consistent quality. They offer design flexibility and improve site safety by minimizing on-site labor.</p>
            <button 
              onClick={() => onInquiry('Precast Walls')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-md shadow transition-all duration-200"
            >
              Send Enquiry
            </button>
          </div>
          {/* Paver Blocks Card */}
          <div className="bg-gray-100 rounded-lg shadow p-6 flex flex-col items-center text-center">
            {/* Paver SVG */}
            <svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              {/* Zigzag paver pattern */}
              {[0,1,2,3].map(row => (
                <g key={row}>
                  {[0,1,2,3,4].map(col => (
                    <path key={col} d="M10 10 h20 l10 10 -10 10 h-20 l-10 -10z" transform={`translate(${col*30 + (row%2)*15},${row*20})`} stroke="#222" strokeWidth="3" fill="none" />
                  ))}
                </g>
              ))}
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Paver Blocks</h2>
            <p className="text-gray-800 mb-6">Paver blocks are sturdy, interlocking concrete units ideal for driveways, walkways, and patios. They provide easy installation, require minimal maintenance, and come in various shapes and colors, allowing for customized, visually appealing designs in outdoor spaces.</p>
            <button 
              onClick={() => onInquiry('Paver Blocks')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-md shadow transition-all duration-200"
            >
              Send Enquiry
            </button>
          </div>
          {/* Fencing Pole Card */}
          <div className="bg-gray-100 rounded-lg shadow p-6 flex flex-col items-center text-center">
            {/* Fence SVG */}
            <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              {/* Fence mesh */}
              <g stroke="#222" strokeWidth="1.5">
                {[0,1,2,3,4].map(i => (
                  <line key={i} x1={30+i*30} y1="20" x2={10+i*30} y2="90" />
                ))}
                {[0,1,2,3,4].map(i => (
                  <line key={i+5} x1={10+i*30} y1="20" x2={30+i*30} y2="90" />
                ))}
                {/* Top wire */}
                <polyline points="10,20 190,20" stroke="#222" strokeWidth="2" />
                {/* Posts */}
                {[0,1,2,3,4].map(i => (
                  <rect key={i+10} x={10+i*45} y="20" width="4" height="70" fill="#222" />
                ))}
                {/* Barbed wire */}
                {[0,1,2,3,4].map(i => (
                  <line key={i+20} x1={12+i*45} y1="20" x2={22+i*45} y2="10" stroke="#222" strokeWidth="1" />
                ))}
              </g>
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Fencing Pole</h2>
            <p className="text-gray-800 mb-6">Fencing poles are sturdy vertical supports used to hold fencing materials in place, providing security and boundary definition for properties. Typically made from metal, wood, or concrete, they are durable, easy to install, and can accommodate various fencing styles.</p>
            <button 
              onClick={() => onInquiry('Fencing Pole')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-md shadow transition-all duration-200"
            >
              Send Enquiry
            </button>
          </div>
        </div>
        {/* Chainlink/Concertina Wire Card */}
        <div className="bg-gray-100 rounded-lg shadow p-6 flex flex-col items-center text-center mt-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Chainlink/Concertina Wire</h2>
          <p className="text-gray-800 mb-8 text-base md:text-lg">Chainlink and concertina wire are popular fencing materials used for security purposes. Chainlink is a woven metal mesh that provides a strong, flexible barrier, commonly used for residential, industrial, and sports facility fencing. Concertina wire, often used in high-security areas, consists of coiled razor or barbed wire that creates a formidable obstacle, deterring unauthorized access. Both materials are durable, cost-effective, and easy to install.</p>
          <button 
            onClick={() => onInquiry('Chainlink/Concertina Wire')}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-md shadow transition-all duration-200"
          >
            Send Enquiry
          </button>
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={getProducts}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Product Cards Section */}
        {!loading && !error && (
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
                  onClick={getProducts}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300"
                >
                  Refresh
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
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

export default Products;