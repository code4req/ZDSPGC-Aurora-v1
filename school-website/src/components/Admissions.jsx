import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Admissions() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="admissions"
      className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
    >
      <div
        ref={contentRef}
        className="container mx-auto px-4 text-center text-white"
      >
        <h2 className="text-4xl font-bold mb-6">Join Our School Family</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Applications for the 2026-2027 academic year are now open. 
          Take the first step towards an exceptional education.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2">1</h3>
            <p>Submit Application</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2">2</h3>
            <p>Entrance Assessment</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-2">3</h3>
            <p>Interview & Enrollment</p>
          </div>
        </div>
        <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105">
          Apply Now
        </button>
      </div>
    </section>
  );
}

export default Admissions;