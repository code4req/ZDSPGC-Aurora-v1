import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function NewsEvents() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        x: index % 2 === 0 ? -40 : 40,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out',
      });
    });
  }, []);

  const events = [
    {
      title: 'Open House 2026',
      date: 'December 15, 2026',
      description: 'Join us for our annual open house event. Meet teachers and explore our campus.',
      type: 'event',
    },
    {
      title: 'Science Fair Winners',
      date: 'November 28, 2026',
      description: 'Our students won first place at the regional science fair competition.',
      type: 'news',
    },
    {
      title: 'Holiday Concert',
      date: 'December 20, 2026',
      description: 'Enjoy our annual holiday concert featuring student performances.',
      type: 'event',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="news"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">News & Events</h2>
          <p className="text-lg text-gray-600">Stay updated with our latest news and upcoming events</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {events.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`p-6 rounded-xl border-l-4 ${
                item.type === 'event' ? 'border-blue-500 bg-blue-50' : 'border-green-500 bg-green-50'
              } hover:shadow-lg transition`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.type === 'event' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
                <p className="text-sm font-semibold text-gray-500 mt-2 md:mt-0">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsEvents;