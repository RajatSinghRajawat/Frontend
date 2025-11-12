import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleBlogsDetails = () => {
  const [blogs, setBlogsData] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const { id } = useParams();

  const blogsData = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      const response = await fetch(`https://api.readymadewall.in/api/blogs/${id}`, requestOptions);
      const result = await response.json();
      setBlogsData(result.blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  useEffect(() => {
    blogsData();
  }, [id]);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const baseImageUrl = 'https://api.readymadewall.in/';

  if (!blogs) {
    return <div>Loading...</div>;
  }

  const images = Array.isArray(blogs.image) ? blogs.image : (blogs.image ? [blogs.image] : []);

  return (
    <div className="mt-22 single-blog-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 className="mt-22 single-blog-title" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#25324B' }}>
        {blogs.title}
      </h1>
      <div className="single-blog-meta" style={{ marginBottom: '1.5rem', color: '#444' }}>
        <div>
          By <span style={{ fontWeight: 500 }}>{blogs.author}</span>
        </div>
        <div>Published on {formatDate(blogs.createdAt)}</div>
      </div>
      {/* Responsive Image Gallery */}
      <div className="relative mb-8 flex flex-col items-center">
        {images.length > 0 && (
          <div className="relative w-full flex justify-center">
            <img
              src={`${baseImageUrl}${images[mainImageIndex]}`}
              alt={blogs.title}
              style={{ width: '100%', maxWidth: '900px', borderRadius: '8px', objectFit: 'cover', maxHeight: 450 }}
              onError={e => (e.target.src = 'https://via.placeholder.com/900x300.png?text=Image+Not+Found')}
            />
            {images.length > 1 && (
              <>
                <button
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#fff', borderRadius: '50%', border: 'none', width: 36, height: 36, boxShadow: '0 2px 8px #0001', fontSize: 22, cursor: 'pointer' }}
                  onClick={() => setMainImageIndex(i => (i - 1 + images.length) % images.length)}
                >&#8592;</button>
                <button
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#fff', borderRadius: '50%', border: 'none', width: 36, height: 36, boxShadow: '0 2px 8px #0001', fontSize: 22, cursor: 'pointer' }}
                  onClick={() => setMainImageIndex(i => (i + 1) % images.length)}
                >&#8594;</button>
              </>
            )}
          </div>
        )}
        {/* Thumbnails */}
        {images.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, gap: 8, flexWrap: 'wrap' }}>
            {images.map((img, idx) => (
              <img
                key={img}
                src={`${baseImageUrl}${img}`}
                alt={`thumb-${idx}`}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 6,
                  border: idx === mainImageIndex ? '2px solid #007bff' : '2px solid #eee',
                  cursor: 'pointer',
                  boxShadow: idx === mainImageIndex ? '0 2px 8px #007bff33' : 'none',
                }}
                onClick={() => setMainImageIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="single-blog-content" style={{ fontSize: '1.15rem', color: '#25324B', lineHeight: 1.7 }}>
        <div dangerouslySetInnerHTML={{ __html: blogs.metaTitle.replace(/\n/g, '<br />') }} />
      </div>
      <hr />
      <div className="single-blog-content" style={{ fontSize: '1.15rem', color: '#25324B', lineHeight: 1.7 }}>
        <div dangerouslySetInnerHTML={{ __html: blogs.metaDescription.replace(/\n/g, '<br />') }} />
      </div>
    </div>
  );
};

export default SingleBlogsDetails;