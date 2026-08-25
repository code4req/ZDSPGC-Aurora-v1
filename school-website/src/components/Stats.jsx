import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaAward, FaBook, FaFlask } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';

const Stats = () => {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({
    programs: 0,
    faculty: 0,
    students: 0,
    alumni: 0,
    courses: 0,
    research: 0,
  });
  const [hoveredStat, setHoveredStat] = useState(null);

  const stats = [
    { 
      key: 'programs', 
      value: 6, 
      label: 'Programs Offered', 
      suffix: '+',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      description: 'CHED-accredited degree programs'
    },
    { 
      key: 'faculty', 
      value: 20, 
      label: 'Faculty Members', 
      suffix: '+',
      icon: FaChalkboardTeacher,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      description: 'Highly qualified educators'
    },
    { 
      key: 'students', 
      value: 2000, 
      label: 'Students', 
      suffix: '+',
      icon: FaUsers,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600',
      description: 'Active learners and future leaders'
    },
    { 
      key: 'alumni', 
      value: 5000, 
      label: 'Alumni', 
      suffix: '+',
      icon: FaAward,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      description: 'Successful graduates worldwide'
    },
    { 
      key: 'courses', 
      value: 120, 
      label: 'Courses', 
      suffix: '+',
      icon: FaBook,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-600',
      description: 'Diverse course offerings'
    },
    { 
      key: 'research', 
      value: 45, 
      label: 'Research Projects', 
      suffix: '+',
      icon: FaFlask,
      color: 'from-indigo-500 to-violet-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-600',
      description: 'Innovative research initiatives'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(statsRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top bottom',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const animateCount = (key, target, duration = 2500) => {
      const startTime = Date.now();
      const startValue = 0;

      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        setCounts(prev => ({ ...prev, [key]: current }));

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      update();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach(stat => {
              animateCount(stat.key, stat.value);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={statsRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            📊 At a Glance
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            ZDSPGC in <span className="text-emerald-600">Numbers</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Building the future, one student at a time
          </p>
        </div>

        {/* Stats Grid - 3 columns for better spacing with 6 items */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === stat.key;
            
            return (
              <div
                key={stat.key}
                className={`relative group text-center p-6 rounded-2xl bg-white border-2 transition-all duration-500 cursor-default
                  ${isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-sm hover:shadow-xl hover:-translate-y-1'}
                  ${isHovered ? stat.borderColor : 'border-gray-200'}
                `}
                onMouseEnter={() => setHoveredStat(stat.key)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} 
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                  ${isHovered ? 'scale-110 rotate-3 shadow-lg' : ''}
                `}>
                  <Icon className="text-2xl text-white" />
                </div>

                {/* Number with animation */}
                <div className={`mt-4 text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300
                  ${isHovered ? stat.textColor : 'text-gray-900'}
                `}>
                  {counts[stat.key]}{stat.suffix}
                  {isHovered && (
                    <span className="inline-block ml-1 text-2xl animate-pulse">
                      <FiTrendingUp className="inline text-emerald-500" />
                    </span>
                  )}
                </div>

                {/* Label */}
                <p className={`mt-2 text-sm font-medium transition-colors duration-300
                  ${isHovered ? stat.textColor : 'text-gray-600'}
                `}>
                  {stat.label}
                </p>

                {/* Description (shows on hover) */}
                <div className={`mt-3 overflow-hidden transition-all duration-500
                  ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <p className="text-xs text-gray-500 border-t border-gray-200 pt-3">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-gradient-to-r ${stat.color} 
                  transition-all duration-500 group-hover:w-3/4
                  ${isHovered ? 'w-3/4' : ''}
                `} />
              </div>
            );
          })}
        </div>

        {/* Progress Bar - Overall Stats */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Passing Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Board Exam Passers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: '98%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Employment Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.5</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Student Rating</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Updated in real-time • AY 2026-2027</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;