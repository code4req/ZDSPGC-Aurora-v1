import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Academics() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out',
      });
    });
  }, []);

  const programs = [
    {
      title: 'Science & Technology',
      description: 'STEM programs with hands-on learning in robotics, coding, and scientific research.',
      icon: '🔬',
    },
    {
      title: 'Arts & Humanities',
      description: 'Creative arts, literature, history, and performing arts programs.',
      icon: '🎨',
    },
    {
      title: 'Business & Economics',
      description: 'Entrepreneurship, finance, and business management education.',
      icon: '💼',
    },
    {
      title: 'Sports & Physical Education',
      description: 'Comprehensive sports programs, athletics, and health education.',
      icon: '⚽',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="academics"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Academics</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our diverse range of academic programs designed to inspire and challenge students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-2 duration-300"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h3>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Academics;