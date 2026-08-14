import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Gallery() {
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, title: 'Campus Life', emoji: '🏫', color: 'from-blue-400 to-blue-600', span: 'col-span-2 row-span-2' },
    { id: 2, title: 'Science Lab', emoji: '🔬', color: 'from-green-400 to-green-600', span: '' },
    { id: 3, title: 'Library', emoji: '📚', color: 'from-yellow-400 to-yellow-600', span: '' },
    { id: 4, title: 'Sports Day', emoji: '⚽', color: 'from-red-400 to-red-600', span: 'col-span-2' },
    { id: 5, title: 'Art Class', emoji: '🎨', color: 'from-pink-400 to-pink-600', span: '' },
    { id: 6, title: 'Music Room', emoji: '🎵', color: 'from-purple-400 to-purple-600', span: '' },
    { id: 7, title: 'Cafeteria', emoji: '🍽️', color: 'from-orange-400 to-orange-600', span: '' },
  ];

  useEffect(() => {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-slate-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            Campus Life
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A glimpse into our vibrant community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((image) => (
            <div
              key={image.id}
              className={`gallery-item cursor-pointer relative overflow-hidden rounded-2xl ${image.span}`}
              onClick={() => setSelectedImage(image)}
            >
              <div className={`w-full h-full bg-gradient-to-br ${image.color} flex flex-col items-center justify-center text-white transition-transform duration-500 hover:scale-110`}>
                <div className="text-6xl mb-2">{image.emoji}</div>
                <p className="text-sm font-semibold">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-8xl mb-4">{selectedImage.emoji}</div>
            <h3 className="text-2xl font-bold text-slate-900">{selectedImage.title}</h3>
            <button
              className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;