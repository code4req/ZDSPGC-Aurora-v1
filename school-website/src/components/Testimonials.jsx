import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out',
        rotation: index % 2 === 0 ? -5 : 5,
      });
    });
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      text: 'The transformative education my child received here has been remarkable. The teachers truly care about each student\'s growth.',
      rating: '★★★★★',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Alumnus',
      text: 'This school laid the foundation for my success. The rigorous academics and supportive community prepared me for life.',
      rating: '★★★★★',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Current Student',
      text: 'I love the creative environment and the opportunities to explore my interests. Every day is a new adventure in learning.',
      rating: '★★★★★',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      {/* Curve background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="text-2xl text-purple-600 mb-4">{testimonial.rating}</div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;