import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaUsers, FaUtensils, FaFutbol, FaBook, FaMusic, FaPaintBrush } from 'react-icons/fa';

const StudentLifePage = () => {
  const sectionRef = useRef(null);

  const activities = [
    {
      icon: FaUsers,
      title: 'Student Organizations',
      description: 'Join various student clubs and organizations to develop leadership skills.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaFutbol,
      title: 'Sports & Recreation',
      description: 'Participate in inter-collegiate sports and intramural activities.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FaMusic,
      title: 'Arts & Culture',
      description: 'Showcase your talents in music, dance, and theater performances.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaBook,
      title: 'Academic Excellence',
      description: 'Access library resources, study groups, and academic support services.',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: FaUtensils,
      title: 'Campus Dining',
      description: 'Enjoy affordable and delicious meals at the campus cafeteria.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: FaPaintBrush,
      title: 'Creative Workshops',
      description: 'Participate in workshops and seminars to enhance your skills.',
      color: 'from-indigo-500 to-purple-500',
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
    <section ref={sectionRef} className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Student <span className="text-emerald-400">Life</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Discover a vibrant and inclusive campus life at ZDSPGC Aurora Campus.
            Beyond the classroom, we offer a rich experience that fosters growth,
            friendship, and unforgettable memories.
          </p>
        </div>

        {/* Campus Life Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl border border-white/10 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-white/40 text-xs">Campus Life</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activities Grid */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Campus <span className="text-emerald-400">Activities</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all hover:scale-105 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${activity.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{activity.title}</h3>
                <p className="text-white/50 text-sm">{activity.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join the <span className="text-emerald-400">ZDSPGC Family?</span>
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto mb-6">
            Start your journey with us and experience the best of student life
            at ZDSPGC Aurora Campus.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/admissions"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              Apply Now
            </a>
            <a
              href="/contact"
              className="border-2 border-white/30 hover:border-white text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLifePage;