import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Stats() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    graduates: 0,
    countries: 0,
  });

  useEffect(() => {
    const animateNumbers = () => {
      const targets = {
        students: 2500,
        teachers: 120,
        graduates: 5000,
        countries: 15,
      };

      const duration = 2000;
      const startTime = Date.now();

      const updateCounts = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        
        setCounts({
          students: Math.floor(eased * targets.students),
          teachers: Math.floor(eased * targets.teachers),
          graduates: Math.floor(eased * targets.graduates),
          countries: Math.floor(eased * targets.countries),
        });

        if (progress < 1) {
          requestAnimationFrame(updateCounts);
        }
      };

      updateCounts();
    };

    // Trigger animation when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/5 transform -skew-x-12" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-white/5 transform skew-x-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">{counts.students.toLocaleString()}+</div>
            <div className="text-lg opacity-90">Students</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">{counts.teachers}+</div>
            <div className="text-lg opacity-90">Teachers</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">{counts.graduates.toLocaleString()}+</div>
            <div className="text-lg opacity-90">Graduates</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">{counts.countries}+</div>
            <div className="text-lg opacity-90">Nationalities</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;