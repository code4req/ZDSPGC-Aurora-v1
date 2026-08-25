import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaBullhorn } from 'react-icons/fa';

const Announcement = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-6 bg-emerald-500/10 border-y border-emerald-500/20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-emerald-400">
          <FaBullhorn className="text-2xl animate-pulse" />
          <span className="font-semibold">📢 LATEST ANNOUNCEMENT</span>
        </div>

        <div className="flex-1 text-center text-white">
          <p className="text-sm md:text-base">
            Enrollment for A.Y. 2026-2027 is now open!{' '}
            <a href="/admissions" className="text-emerald-400 hover:underline font-semibold">
              Apply Now →
            </a>
          </p>
        </div>

        <div className="hidden md:block">
          <span className="text-xs text-white/50">Posted: August 24, 2026</span>
        </div>
      </div>
    </section>
  );
};

export default Announcement;