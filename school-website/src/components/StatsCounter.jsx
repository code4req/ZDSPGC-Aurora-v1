import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StatsCounter() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    graduates: 0,
    awards: 0,
  });

  useEffect(() => {
    const animateNumbers = () => {
      const targets = {
        students: 1200,
        teachers: 85,
        graduates: 3400,
        awards: 45,
      };

      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          students: Math.floor(progress * targets.students),
          teachers: Math.floor(progress * targets.teachers),
          graduates: Math.floor(progress * targets.graduates),
          awards: Math.floor(progress * targets.awards),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounts(targets);
        }
      }, interval);
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
      className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{counts.students}+</div>
            <div className="text-lg opacity-90">Students</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{counts.teachers}+</div>
            <div className="text-lg opacity-90">Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{counts.graduates}+</div>
            <div className="text-lg opacity-90">Graduates</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{counts.awards}+</div>
            <div className="text-lg opacity-90">Awards</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsCounter;