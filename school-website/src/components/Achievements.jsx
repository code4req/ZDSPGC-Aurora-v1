import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaTrophy, FaMedal, FaAward, FaGraduationCap } from 'react-icons/fa';

const Achievements = () => {
  const sectionRef = useRef(null);

  const achievements = [
    {
      icon: FaTrophy,
      title: 'Regional Champions',
      description: 'BSIS Team won 1st place in Regional Programming Competition 2026',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FaMedal,
      title: 'Outstanding Research',
      description: 'Biology Department awarded Best Research Paper in National Conference',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaAward,
      title: 'Excellence in Sports',
      description: 'BPED Students won Gold Medal in Inter-Collegiate Sports Festival',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FaGraduationCap,
      title: 'Top Performers',
      description: '95% passing rate in Board Examinations across all programs',
      color: 'from-purple-500 to-pink-500',
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-emerald-950/20 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Our <span className="text-emerald-400">Achievements</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Celebrating excellence and success at ZDSPGC Aurora Campus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all hover:scale-105 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;