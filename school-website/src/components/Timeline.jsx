import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Timeline() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const sections = itemsRef.current;

    // Pin the container
    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    });

    // Animate each timeline item
    sections.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          containerAnimation: gsap.timeline(),
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        scale: 0.8,
        ease: 'power3.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const milestones = [
    { year: '2000', title: 'School Founded', desc: 'Opened our doors to the first 50 students' },
    { year: '2010', title: 'New Campus', desc: 'Expanded to a state-of-the-art facility' },
    { year: '2015', title: 'International Program', desc: 'Launched our global exchange program' },
    { year: '2020', title: 'Digital Transformation', desc: 'Integrated technology across all classrooms' },
    { year: '2026', title: 'Future Ready', desc: 'Preparing students for tomorrow\'s challenges' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-slate-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-purple-500/30" />
      </div>

      <div
        ref={containerRef}
        className="relative container mx-auto px-4 py-32"
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our Journey
          </h2>
          <p className="text-xl text-gray-400">A legacy of excellence</p>
        </div>

        <div className="relative">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center mb-20 last:mb-0`}
            >
              <div className="flex-1">
                <div className={`p-8 bg-white/10 backdrop-blur-sm rounded-2xl ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}>
                  <div className="text-4xl font-bold text-purple-400 mb-2">{milestone.year}</div>
                  <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.desc}</p>
                </div>
              </div>
              
              <div className="relative z-10 w-8 h-8 bg-purple-500 rounded-full border-4 border-slate-900 mx-4 md:mx-0">
                <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75" />
              </div>
              
              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;