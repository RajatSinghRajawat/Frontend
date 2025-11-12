import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleProducts = ({ onInquiry }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getProductById = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.readymadewall.in/api/products/getProductById/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setProduct(result.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById();
    }
  }, [id]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleImageSlide = (direction) => {
    if (!product?.images || product.images.length === 0) return;
    
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % product.images.length
      : currentImageIndex === 0 
        ? product.images.length - 1 
        : currentImageIndex - 1;
    
    setCurrentImageIndex(newIndex);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
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
            onClick={getProductById}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Product not found</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-blue-600 transition-colors">Products</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="w-full py-8 md:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={`https://api.readymadewall.in/${product.images[currentImageIndex]}`}
                      alt={product.name}
                      className="w-full h-96 md:h-[500px] object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x500?text=Image+Not+Available';
                      }}
                    />
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handleImageSlide('prev')}
                          className="absolute top-1/2 left-4 bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:bg-blue-100 transition-colors duration-200 transform -translate-y-1/2"
                          aria-label="Previous image"
                        >
                          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleImageSlide('next')}
                          className="absolute top-1/2 right-4 bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:bg-blue-100 transition-colors duration-200 transform -translate-y-1/2"
                          aria-label="Next image"
                        >
                          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-96 md:h-[500px] bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 text-lg">No images available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === index 
                          ? 'border-blue-400 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <img
                        src={`https://api.readymadewall.in/${image}`}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150x80?text=Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Product Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    product.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                  <div className="space-y-4">
                    {product.specifications.dimensions && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Dimensions</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-gray-600">Length</p>
                            <p className="font-semibold text-gray-900">{product.specifications.dimensions.length} {product.specifications.dimensions.unit}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Width</p>
                            <p className="font-semibold text-gray-900">{product.specifications.dimensions.width} {product.specifications.dimensions.unit}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Height</p>
                            <p className="font-semibold text-gray-900">{product.specifications.dimensions.height} {product.specifications.dimensions.unit}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {product.specifications.strength && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Strength</h4>
                        <p className="text-gray-900">{product.specifications.strength}</p>
                      </div>
                    )}
                    
                    {product.specifications.color && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Color</h4>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: product.specifications.color.toLowerCase() }}
                          ></div>
                          <span className="text-gray-900">{product.specifications.color}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-3">
                
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900 capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit:</span>
                    <span className="font-medium text-gray-900 capitalize">{product.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium text-gray-900">{formatDate(product.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium text-gray-900">{formatDate(product.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/inquiry', { state: { productName: product.name } })}
                  disabled={!product.isAvailable}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                >
                  {product.isAvailable ? 'Get Quote' : 'Currently Unavailable'}
                </button>
                
                <button
                  onClick={() => window.history.back()}
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-all duration-300"
                >
                  Back to Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProducts;