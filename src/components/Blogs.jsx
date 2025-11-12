import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://api.readymadewall.in/api/blogs", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBlogPosts(data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <section className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] flex items-center justify-center bg-black">
        {/* Background Image */}
        <img
          src="https://indiawalls.in/wp-content/uploads/al_opt_content/IMAGE/indiawalls.in/wp-content/uploads/2024/10/1.webp.bv_resized_desktop.webp.bv.webp"
          alt="Precast Wall"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Centered Text */}
        <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center">Blogs</h1>
      </section>

      {/* Blog Cards Grid */}
      <div  className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {blogPosts.map((post) => {
          const currentIdx = currentImageIndexes[post._id] || 0;
          const images = post.image || [];
          const showPrev = images.length > 1 && currentIdx > 0;
          const showNext = images.length > 1 && currentIdx < images.length - 1;
          const handlePrev = (e) => {
            e.stopPropagation();
            setCurrentImageIndexes((prev) => ({
              ...prev,
              [post._id]: Math.max(0, (prev[post._id] || 0) - 1)
            }));
          };
          const handleNext = (e) => {
            e.stopPropagation();
            setCurrentImageIndexes((prev) => ({
              ...prev,
              [post._id]: Math.min(images.length - 1, (prev[post._id] || 0) + 1)
            }));
          };
          return (
            <div
              key={post._id || post.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden cursor-pointer"
              onClick={() => navigate(`/singleblogsdetails/${post._id}`)}
            >
              
              <div className="w-full h-36 sm:h-40 md:h-44 flex items-center justify-center bg-gray-100 relative">
                {showPrev && (
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                    onClick={handlePrev}
                  >
                    <FaChevronLeft size={18} />
                  </button>
                )}
                {images.length > 0 && (
                  <img
                    src={`https://api.readymadewall.in/${images[currentIdx]}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {showNext && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                    onClick={handleNext}
                  >
                    <FaChevronRight size={18} />
                  </button>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className=" text-lg font-extrabold text-gray-800 mb-2 leading-tight">{post.title}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://secure.gravatar.com/avatar/ee482e4b56d57493c4740d6c636ce92ffdf78333d1a47417cfc704b1c7c2014b?s=100&d=mm&r=g" alt="" className='w-10 h-10 rounded-full' />
                  <span className="text-gray-600 font-medium">{post.author}</span>
                </div>
                <p className="text-gray-700 text-base flex-1">{post.metaTitle.substring(0, 100) + '...'}</p>
                <div className="flex justify-end mt-4">
                  <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Blogs