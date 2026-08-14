import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Programs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        rotationY: 30,
        rotationX: 10,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out',
      });

      // 3D tilt effect on hover
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      });
    });
  }, []);

  const programs = [
    {
      title: 'STEM',
      description: 'Advanced science, technology, engineering, and mathematics',
      icon: '🔬',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Arts',
      description: 'Creative expression through visual and performing arts',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Sports',
      description: 'Physical excellence and teamwork through athletics',
      icon: '⚽',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Languages',
      description: 'Global communication through diverse language programs',
      icon: '🌍',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-white relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our diverse range of programs designed to unlock every student's potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group cursor-pointer perspective-1000"
            >
              <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${program.color} p-[2px]`}>
                <div className="relative bg-white rounded-2xl p-8 h-full transition-all duration-500 group-hover:shadow-2xl">
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                  <div className="mt-4 inline-flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Learn More →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;