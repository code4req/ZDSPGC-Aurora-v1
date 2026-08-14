import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CampusLife() {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    imagesRef.current.forEach((img, index) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
        },
        rotation: index % 2 === 0 ? -10 : 10,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out',
      });
    });
  }, []);

  const facilities = [
    { name: 'Library', emoji: '📚', color: 'bg-blue-100' },
    { name: 'Science Lab', emoji: '🧪', color: 'bg-green-100' },
    { name: 'Sports Complex', emoji: '🏟️', color: 'bg-orange-100' },
    { name: 'Art Studio', emoji: '🎭', color: 'bg-pink-100' },
    { name: 'Music Room', emoji: '🎵', color: 'bg-purple-100' },
    { name: 'Cafeteria', emoji: '🍽️', color: 'bg-yellow-100' },
  ];

  return (
    <section
      ref={sectionRef}
      id="campus"
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Campus Life</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our vibrant campus with state-of-the-art facilities and a supportive community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilities.map((facility, index) => (
            <div
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              className={`${facility.color} rounded-xl p-6 text-center hover:shadow-lg transition transform hover:-translate-y-2 duration-300`}
            >
              <div className="text-4xl mb-2">{facility.emoji}</div>
              <p className="font-semibold text-gray-700">{facility.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CampusLife;