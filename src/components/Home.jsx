import React, { useState, useEffect } from 'react'
import Headers from './headers/Headers'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ClienteleSlider from './ClienteleSlider';

// const bgImage = 'https://static.vecteezy.com/system/resources/thumbnails/013/989/919/small/illustration-of-red-brick-background-vector.jpg'; 
const bgImage = 'https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2025/01/123-1536x1523-1.webp.bv_resized_desktop.webp.bv.webp';

const Home = ({ onInquiry }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("shreshyamprecast")
    // Fetch featured products (limit to 3)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api.readymadewall.in/api/products/?page=1&limit=3');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products');
            }
        };

        // Fetch featured blogs (limit to 3)
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://api.readymadewall.in/api/blogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                // Take only first 3 blogs
                setBlogs((data.blogs || []).slice(0, 3));
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to load blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        fetchBlogs();
    }, []);

    return (
        <>
            <section
                className="relative w-full min-h-[100vh] flex items-center justify-center"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Black overlay */}
                <div className="absolute inset-0 w-full h-full" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
                {/* Content */}
                <div className="relative z-10  px-4 py-10 flex flex-col items-start animate-fade-in-up  rounded-lg shadow-lg ">
                    <h1 className="text-white text-2xl md:text-5xl font-bold leading-snug mb-3">
                        Secure Your Property with High-Quality   <br className="hidden md:block" />  Precast Boundary Walls.
                    </h1>
                    <p className="text-base md:text-lg text-white mb-6" style={{ maxWidth: '70%' }}>
                        Welcome to Shree Shyam Precast – your trusted partner for custom RCC precast concrete walls built to ensure
                        long-lasting security and fast installation for all types of properties.
                    </p>
                    <button
                        onClick={() => onInquiry('General Inquiry')}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-200 text-base"
                    >
                        Get a Free Quote
                    </button>

                </div>
                {/* Animation keyframes */}
                <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            </section>
            <div className="relative w-full  mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-12 md:py-24 gap-8 md:gap-16 animate-fade-in-up mt-10 text-black rounded-xl">
                {/* Left: Image with blue corners */}
                <div className="relative w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
                    <div className="relative w-full max-w-md aspect-video bg-white/10 rounded-xl shadow-lg p-3">

                        <img src="https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2025/01/123-1536x1523-1.webp.bv_resized_desktop.webp.bv.webp" alt="Precast Wall" className="w-full h- object-cover rounded-xl relative z-10" />
                    </div>
                </div>
                {/* Right: Text Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left">
                    <h1 className=" text-3xl md:text-5xl font-bold leading-tight mb-3">
                        <br />2000+ Customers
                    </h1>
                    <h2 className="text-black text-lg md:text-xl font-semibold mb-3">
                        Expertly Crafted Precast Walls for Unmatched Security

                    </h2>
                    <p className=" text-base md:text-lg mb-6 max-w-xl">
                        With over 7 years of experience, Shree Shyam Precast is a leading precast wall manufacturer in Alwar and NCR,
                        delivering durable, ready-to-install RCC walls for residential, commercial, and industrial spaces. <br />
                        We specialize in high-strength, maintenance-free precast wall systems that ensure robust protection and long-term
                        value. Our commitment to quality, speed, and customer satisfaction has made us the preferred choice of over 2000
                        clients.
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-bold px-8 py-3 rounded-md shadow transition-all duration-200 text-lg">
                    Get a Free Quote
                    </button>
                </div>
            </div>
            {/* Featured Products Section */}
            <section className="w-full  md:py-20 bg-white flex flex-col items-center animate-fade-in-up">
                <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">Our Featured Products</h2>
                {loading ? (
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-2xl shadow-lg h-auto hover:scale-105 transition-transform w-full max-w-xs border border-gray-200 p-0 animate-pulse">
                                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded mb-2 mx-4"></div>
                                <div className="h-3 bg-gray-300 rounded mb-2 mx-4"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-red-500 mb-8">{error}</div>
                ) : (
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-2xl shadow-lg h-auto hover:scale-105 transition-transform w-full max-w-xs border border-gray-200 p-0">
                                <img
                                    src={product.image || "https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2025/01/123-1536x1523-1.webp.bv_resized_desktop.webp.bv.webp"}
                                    alt={product.name}
                                    className="w-[100%] h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold mb-2 text-center px-4">{product.name}</h3>
                                <p className="text-gray-600 text-center mb-2 px-4">{product.description}</p>
                            </div>
                        ))}
                    </div>
                )}
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-200 text-lg" onClick={() => navigate('/products')}>
                    View All Products
                </button>
            </section>
            <section className="w-full px-4 py-12 md:py-20 bg-gray-50 flex flex-col items-center animate-fade-in-up">
                <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">From Our Blog</h2>
                {loading ? (
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform animate-pulse">
                                <div className="w-full h-32 bg-gray-300 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                                <div className="h-3 bg-gray-300 rounded mt-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-red-500 mb-8">{error}</div>
                ) : (
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform">
                                <img
                                    src={Array.isArray(blog.image) && blog.image.length > 0 ? `https://api.readymadewall.in/${blog.image[0]}` : "https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2025/01/123-1536x1523-1.webp.bv_resized_desktop.webp.bv.webp"}
                                    alt={blog.title}
                                    className="w-full h-32 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <img src="https://secure.gravatar.com/avatar/ee482e4b56d57493c4740d6c636ce92ffdf78333d1a47417cfc704b1c7c2014b?s=100&d=mm&r=g" alt="" className='w-10 h-10 rounded-full' />
                                    <span className="text-gray-600 font-medium">{blog.author}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{blog.description}</p>
                                <p className="text-gray-700 text-base flex-1">{blog.metaTitle.substring(0, 100) + '...'}</p>
                                <div className="flex justify-end mt-4">
                                    <span className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <a className="text-black font-semibold hover:underline mt-auto" onClick={() => navigate(`/blogs/${blog._id}`)} style={{ cursor: 'pointer' }}>Read More</a>
                            </div>
                        ))}
                    </div>
                )}
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-200 text-lg" onClick={() => navigate('/blogs')}>
                    View All Blogs
                </button>
            </section>



            <section className="py-10 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Why Choose Us</h2>
                    <div className="bg-gray-100 rounded-md py-8 sm:py-12 md:py-16 px-2 sm:px-4 md:px-0 flex flex-col items-center">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-0 md:gap-x-0 justify-items-center">
                            <div className="flex flex-col items-center">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">10+</span>
                                <span className="text-base sm:text-lg font-bold text-black mt-2">Products</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">350+</span>
                                <span className="text-base sm:text-lg font-bold text-black mt-2">Laborers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">45+</span>
                                <span className="text-base sm:text-lg font-bold text-black mt-2">Supervisors</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">2,000+</span>
                                <span className="text-base sm:text-lg font-bold text-black mt-2">Satisfied Customers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">270+</span>
                                <span className="text-base sm:text-lg font-bold text-black mt-2">Employees</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">7+</span>
                                <span className="text-base sm:text-lg font-bold text-black mt-2">Years of Experience</span>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mt-10 md:mt-16">
                        Reliability and Strength in Every Wall We Build
                    </h3>
                </div>
            </section>


            <ClienteleSlider />
        </>
    )
}

export default Home