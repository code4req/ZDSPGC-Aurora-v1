import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FaCode, FaFlask, FaBalanceScale, FaRunning } from 'react-icons/fa';

const ProgramCards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const programs = [
    {
      id: 'bsis',
      name: 'BSIS',
      fullName: 'Bachelor of Science in Information Systems',
      icon: FaCode,
      color: 'from-blue-500 to-cyan-500',
      description: 'Design and manage information systems for modern organizations.',
    },
    {
      id: 'bsbio',
      name: 'BSBIO',
      fullName: 'Bachelor of Science in Biology',
      icon: FaFlask,
      color: 'from-green-500 to-emerald-500',
      description: 'Explore life sciences and prepare for careers in research and healthcare.',
    },
    {
      id: 'bscrim',
      name: 'BSCRIM',
      fullName: 'Bachelor of Science in Criminology',
      icon: FaBalanceScale,
      color: 'from-purple-500 to-pink-500',
      description: 'Study crime, justice, and law enforcement for a safer society.',
    },
    {
      id: 'bped',
      name: 'BPED',
      fullName: 'Bachelor of Physical Education',
      icon: FaRunning,
      color: 'from-orange-500 to-red-500',
      description: 'Promote health, fitness, and sports education in communities.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top bottom',
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Explore Our Programs
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Choose from four dynamic programs designed to shape your future
            and prepare you for success.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link
                key={program.id}
                to={`/programs/${program.id}`}
                className="group relative bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 border border-white/10 hover:border-emerald-400/30"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-2xl text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{program.name}</h3>
                <p className="text-white/60 text-sm mb-3">{program.fullName}</p>
                <p className="text-white/40 text-sm">{program.description}</p>

                <div className="mt-4 inline-flex items-center text-emerald-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  Learn More →
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/programs"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-500/30"
          >
            Find Your Program
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramCards;