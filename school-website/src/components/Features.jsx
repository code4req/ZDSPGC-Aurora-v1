import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { FaGraduationCap, FaRocket, FaAtom, FaDna, FaRunning, FaGavel, FaSeedling } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// Unique 3D tilt effect with glass morphism
export const GlassTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const [glowStyle, setGlowStyle] = useState({});
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;
    
    const tiltX = (y - 0.5) * 12;
    const tiltY = (x - 0.5) * -12;
    
    const glowX = x * 100;
    const glowY = y * 100;

    setTransformStyle(
      `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
    );
    
    setGlowStyle({
      background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
    setGlowStyle({});
  };

  return (
    <div
      ref={itemRef}
      className={`relative transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={glowStyle}
      />
      {children}
    </div>
  );
};

// Main card component with uniform height
export const ProgramCard = ({ 
  src, 
  title, 
  description, 
  icon: Icon, 
  color = "emerald",
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const iconRef = useRef(null);

  // Entrance animation with smooth scroll trigger
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        end: "top 40%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(cardRef.current, 
      { 
        y: 80, 
        opacity: 0,
        scale: 0.9,
        rotationZ: -2,
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        duration: 1,
      }
    );

    // Icon float animation
    gsap.to(iconRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2,
    });

    return () => {
      tl.kill();
    };
  }, [index]);

  const colorMap = {
    emerald: { bg: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-400/30", glow: "shadow-emerald-500/20" },
    blue: { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-400/30", glow: "shadow-blue-500/20" },
    purple: { bg: "from-purple-500/20 to-pink-500/20", border: "border-purple-400/30", glow: "shadow-purple-500/20" },
    orange: { bg: "from-orange-500/20 to-amber-500/20", border: "border-orange-400/30", glow: "shadow-orange-500/20" },
    red: { bg: "from-red-500/20 to-rose-500/20", border: "border-red-400/30", glow: "shadow-red-500/20" },
  };

  const colors = colorMap[color] || colorMap.emerald;

  return (
    <div
      ref={cardRef}
      className={`relative group overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br ${colors.bg} border ${colors.border} shadow-2xl ${colors.glow} h-[400px] w-full transition-all duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background video with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
        <div className="flex items-start justify-between">
          {/* Icon with floating animation */}
          <div 
            ref={iconRef}
            className={`p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20`}
          >
            {Icon && <Icon className="text-3xl text-white" />}
          </div>
          
          {/* Program badge */}
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium uppercase tracking-wider">
            Program
          </span>
        </div>

        <div>
          {/* Title with animated letters */}
          <h2 
            ref={titleRef}
            className="font-black uppercase leading-none mb-3 text-4xl md:text-5xl"
          >
            {title.split('').map((letter, i) => (
              <span
                key={i}
                className="inline-block hover:text-emerald-400 transition-colors duration-300"
                style={{ 
                  display: 'inline-block',
                  textShadow: '0 0 30px rgba(0,0,0,0.5)'
                }}
              >
                {letter}
              </span>
            ))}
          </h2>
          
          <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action button with unique hover effect */}
        <button className="relative group/btn w-fit overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 hover:scale-105">
          <span className="relative z-10 flex items-center gap-2">
            <TiLocationArrow className="group-hover/btn:translate-x-1 transition-transform" />
            Explore Program
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-emerald-500/30 to-emerald-400/20" />
        </button>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/10 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white/10 rounded-bl-3xl pointer-events-none" />
    </div>
  );
};

// Feature card for stats/info
const FeatureCard = ({ icon: Icon, label, value, description, color = "emerald" }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const colorClasses = {
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/20",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-400/20",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-400/20",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-400/20",
  };

  return (
    <div
      ref={cardRef}
      className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm border shadow-xl`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
          <Icon className="text-2xl text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-white/80 font-medium">{label}</p>
          <p className="text-white/60 text-xs mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Main Features component
const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header animation with smooth scroll
    gsap.fromTo(headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Particle floating animation for background
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: -30 - (i * 10),
        x: 20 + (i * 5),
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    // Smooth scroll cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const programs = [
    {
      title: "BSIS",
      description: "Technology, business, and systems innovation.",
      icon: FaRocket,
      color: "blue",
      src: "/videos/bsis.mp4",
    },
    {
      title: "BSBIO",
      description: "Exploring life, science, and discovery.",
      icon: FaDna,
      color: "emerald",
      src: "/videos/bsbio.mp4",
    },
    {
      title: "BPED",
      description: "Shaping healthy, active, skilled individuals.",
      icon: FaRunning,
      color: "orange",
      src: "/videos/bped.mp4",
    },
    {
      title: "BSCRIM",
      description: "Justice, safety, and community service.",
      icon: FaGavel,
      color: "red",
      src: "/videos/bscrim.mp4",
    },
    {
      title: "BTVTED",
      description: "Technical-Vocational Teacher Education.",
      icon: FaGraduationCap,
      color: "purple",
      src: "/videos/btvted.mp4",
    },
    {
      title: "BSA",
      description: "Agricultural Sciences for sustainable future.",
      icon: FaSeedling,
      color: "emerald",
      src: "/videos/bsa.mp4",
    },
  ];

  const stats = [
    { icon: FaGraduationCap, value: "98%", label: "Graduation Rate", description: "students succeed", color: "emerald" },
    { icon: FaRocket, value: "30+", label: "Programs", description: "diverse offerings", color: "blue" },
    { icon: FaAtom, value: "1,200+", label: "Students", description: "active learners", color: "purple" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden bg-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-emerald-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Unique Header with circular design */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/60">Innovation Hub</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-4">
            Academic
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Excellence
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-white/60 text-sm md:text-base">
            Discover transformative programs designed to unlock your potential 
            and shape the future of your career.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stats.map((stat, i) => (
            <FeatureCard key={i} {...stat} />
          ))}
        </div>

        {/* Program Grid - Uniform height with smooth scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {programs.map((program, index) => (
            <GlassTilt key={index} className="h-full">
              <ProgramCard 
                {...program}
                index={index}
              />
            </GlassTilt>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm uppercase tracking-wider shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105">
            <span>Explore All Programs</span>
            <TiLocationArrow className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;  