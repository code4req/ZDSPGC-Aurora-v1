import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { 
  FaArrowRight, 
  FaGraduationCap,
  FaBook,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaRocket,
  FaGlobe,
  FaBuilding,
  FaTrophy,
  FaSchool,
  FaEye,
  FaBullseye,
  FaLocationArrow
} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ADD THIS IMPORT
import AnimatedTitle from '../components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

// Custom Zentry 3D Tilt Bento Card Component
const BentoCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * -10;
    const tiltY = (relativeX - 0.5) * 10;

    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={`about-bento-card relative rounded-3xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-md overflow-hidden group cursor-pointer hover:border-emerald-500/40 ${className}`}
    >
      {children}
    </div>
  );
};

const About = () => {
  // Refs
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const campusRef = useRef(null);
  const communityRef = useRef(null);
  const ctaRef = useRef(null);

  // Data
  const stats = [
    { icon: <FaUsers />, value: "1000+", label: "Active Students" },
    { icon: <FaBook />, value: "6", label: "Academic Programs" },
    { icon: <FaTrophy />, value: "98%", label: "Graduation Rate" },
    { icon: <FaBuilding />, value: "2018", label: "Year Founded" }
  ];

  const purposeData = [
    {
      id: 1,
      title: "EDUCATION",
      description: "Providing students with meaningful learning experiences that prepare them for lifelong success.",
      icon: <FaGraduationCap />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 2,
      title: "INNOVATION",
      description: "Encouraging creativity, technology, and new ideas to shape the future of education.",
      icon: <FaLightbulb />,
      color: "from-green-500 to-emerald-700"
    },
    {
      id: 3,
      title: "COMMUNITY",
      description: "Developing graduates who contribute positively to their communities and society.",
      icon: <FaUsers />,
      color: "from-teal-500 to-emerald-600"
    }
  ];

  const values = [
    { icon: <FaLightbulb />, title: "Excellence", desc: "Striving for the highest standards in everything we do." },
    { icon: <FaHeart />, title: "Integrity", desc: "Acting with honesty, transparency, and ethical responsibility." },
    { icon: <FaRocket />, title: "Innovation", desc: "Embracing new ideas and technologies to enhance learning." },
    { icon: <FaGlobe />, title: "Service", desc: "Contributing positively to our community and society." }
  ];

  const communityBlocks = [
    { icon: <FaBook />, title: "LEARN", description: "Acquire knowledge and skills through innovative teaching methods." },
    { icon: <FaLightbulb />, title: "CREATE", description: "Develop new ideas and solutions to real-world challenges." },
    { icon: <FaRocket />, title: "LEAD", description: "Build confidence and capabilities to lead in your field." }
  ];

  // Video data array with source fallbacks and posters
  const campusVideos = [
    { 
      label: "Main Campus", 
      mp4: "/videos/main-campus.mp4", 
      webm: "/videos/main-campus.webm",
      poster: "/img/zdspgcv.jpg"
    },
    { 
      label: "Student Life", 
      mp4: "/videos/student.mp4", 
      webm: "/videos/student-life.webm",
      poster: "/img/students.jpg"
    },
    { 
      label: "Classrooms", 
      mp4: "/videos/classroom.mp4", 
      webm: "/videos/classroom.webm",
      poster: "/img/zdspgcv.jpg"
    },
    { 
      label: "Campus Events", 
      mp4: "/videos/campevents.mp4", 
      webm: "/videos/events.webm",
      poster: "/img/events.jpg"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".hero-element", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });

      // ZENTRY FLOATING HEXAGONAL CLIP TRANSITION
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-clip",
          start: "center center",
          end: "+=1000 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Expand floating polygon to full viewport rectangular mask
      clipAnimation.to(".zentry-mask-clip-about", {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        rotation: 0,
        skewY: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power2.inOut",
      });

      // Counter video scale and rotation effect during scroll
      const videoElement = document.querySelector(".zentry-mask-clip-about video");
      if (videoElement) {
        gsap.fromTo(videoElement, 
          {
            scale: 2.2,
            rotation: -8,
          },
          {
            scale: 1,
            rotation: 0,
            scrollTrigger: {
              trigger: "#about-clip",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              ease: "power2.inOut",
            },
          }
        );
      }

      // Scroll Trigger Animations for sections
      const animateGrid = (selector, triggerSelector) => {
        gsap.fromTo(selector,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: triggerSelector,
              start: "top 80%",
            }
          }
        );
      };

      animateGrid(".stat-card", ".stats-grid");
      animateGrid(".vision-card", ".vision-grid");
      animateGrid(".purpose-card", ".purpose-grid");
      animateGrid(".value-card", ".values-grid");
      animateGrid(".feature-card", ".features-grid");
      animateGrid(".community-block", ".community-grid");

      // CTA animation
      gsap.fromTo('.cta-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutRef} className="relative w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-zinc-950 to-black text-white overflow-hidden selection:bg-emerald-400 selection:text-black">
      
      {/* ===== HERO SECTION ===== */}
      <div ref={heroRef} className="relative pt-32 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="hero-element inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-5 py-2 backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
            ZDSPGC Aurora Campus • Legacy & Vision
          </span>
        </div>

        <AnimatedTitle 
          title="About&nbsp;&nbsp;<b>ZDSPGC</b>"
          containerClass="hero-element !text-white !text-7xl sm:!text-9xl md:!text-[12rem] lg:!text-[14rem] font-black uppercase tracking-tight leading-none mb-6"
          fontClass="font-zentry"
        />

        <p className="hero-element text-emerald-100/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-general mb-10">
          Zamboanga del Sur Provincial Government College Aurora Campus - Transforming lives through accessible, innovative, and impactful education since 2018.
        </p>
      </div>

      {/* ===== ZENTRY SKEWED FLOATING CLIP SECTION WITH VIDEO ===== */}
      <div className="h-dvh w-full relative mt-12 overflow-hidden flex items-center justify-center" id="about-clip">
        <div 
          className="zentry-mask-clip-about relative overflow-hidden shadow-[0_0_90px_rgba(16,185,129,0.3)] border border-emerald-500/40 bg-emerald-950/80"
          style={{
            width: '65vw',
            height: '60vh',
            borderRadius: '40px',
            transform: 'rotate(6deg) skewY(3deg)',
            clipPath: 'polygon(10% 0%, 100% 8%, 90% 100%, 0% 92%)',
            willChange: 'transform, clip-path, width, height',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 w-full h-full object-cover scale-125"
            style={{ willChange: 'transform' }}
          >
            <source src="/videos/campus-experience.webm" type="video/webm" />
            <source src="/videos/bsbio.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-emerald-950/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-white text-center w-full px-6">
            <AnimatedTitle 
              title="Driven By <b>P</b>urpose"
              containerClass="!text-white !text-3xl md:!text-6xl font-black uppercase tracking-wide drop-shadow-2xl mb-2"
              fontClass="font-zentry"
            />
            <p className="text-xs md:text-sm font-mono tracking-widest text-emerald-200/90 uppercase drop-shadow-lg">
              Building a brighter academic horizon for Aurora
            </p>
          </div>
        </div>
      </div>

      {/* ===== STATS SECTION ===== */}
      <div className="py-20 px-6 max-w-7xl mx-auto border-t border-emerald-500/10">
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <BentoCard key={index} className="p-8 text-center flex flex-col items-center justify-center">
              <div className="text-emerald-400 text-3xl mb-3">{stat.icon}</div>
              <p className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight">{stat.value}</p>
              <p className="text-xs font-mono uppercase tracking-widest text-emerald-300/70 mt-2">{stat.label}</p>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* ===== INTRODUCTION ===== */}
      <div ref={introRef} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">Our Identity</p>
            <AnimatedTitle 
              title="EDUCATION <br /> SHAPES THE <br /> <b>F</b>UTURE."
              containerClass="!text-white !text-4xl sm:!text-6xl font-black uppercase leading-none"
              fontClass="font-zentry"
            />
          </div>
          <div className="md:col-span-6 space-y-6 text-emerald-100/70 text-base md:text-lg leading-relaxed font-general">
            <p>
              ZDSPGC Aurora Campus is committed to providing accessible, relevant, and quality education that prepares students for professional success and meaningful contribution to society.
            </p>
            <p className="text-sm font-mono text-emerald-400/80 border-l-2 border-emerald-400 pl-4 py-1">
              Since 2018, we have served as a catalyst for growth, community transformation, and technological empowerment across Zamboanga del Sur.
            </p>
          </div>
        </div>
      </div>

      {/* ===== VISION & MISSION ===== */}
      <div ref={visionRef} className="py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Pillars of Guidance</p>
          <AnimatedTitle 
            title="<b>V</b>ision & <b>M</b>ission"
            containerClass="!text-emerald-50 !text-4xl sm:!text-6xl font-black uppercase tracking-tight"
            fontClass="font-zentry"
          />
        </div>
        
        <div className="vision-grid grid md:grid-cols-2 gap-8">
          <BentoCard className="p-10 flex flex-col justify-between">
            <div className="flex items-start gap-5 mb-6">
              <div className="p-4 bg-emerald-400/10 border border-emerald-400/30 rounded-2xl text-emerald-400 text-3xl">
                <FaEye />
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Aspiration</span>
                <h3 className="text-3xl font-black uppercase text-white tracking-wide">Our Vision</h3>
              </div>
            </div>
            {/* VISION IMAGE */}
            <div className="rounded-2xl overflow-hidden border border-emerald-500/20 flex-1">
              <img 
                src="/img/vision.jpg" 
                alt="ZDSPGC Vision" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </BentoCard>

          <BentoCard className="p-10 flex flex-col justify-between">
            <div className="flex items-start gap-5 mb-6">
              <div className="p-4 bg-emerald-400/10 border border-emerald-400/30 rounded-2xl text-emerald-400 text-3xl">
                <FaBullseye />
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Commitment</span>
                <h3 className="text-3xl font-black uppercase text-white tracking-wide">Our Mission</h3>
              </div>
            </div>
            {/* MISSION IMAGE */}
            <div className="rounded-2xl overflow-hidden border border-emerald-500/20 flex-1">
              <img 
                src="/img/mission.jpg" 
                alt="ZDSPGC Mission" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </BentoCard>
        </div>
      </div>

      {/* ===== OUR PURPOSE ===== */}
      <div ref={valuesRef} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Core Drivers</p>
          <AnimatedTitle 
            title="Our <b>P</b>urpose"
            containerClass="!text-emerald-50 !text-4xl sm:!text-6xl font-black uppercase tracking-tight"
            fontClass="font-zentry"
          />
        </div>
        
        <div className="purpose-grid grid md:grid-cols-3 gap-8">
          {purposeData.map((item) => (
            <BentoCard key={item.id} className="p-8 flex flex-col justify-between min-h-[320px]">
              <div className={`absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />
              <div>
                <div className="text-emerald-400 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-3 tracking-wide">{item.title}</h3>
                <p className="text-emerald-100/70 text-sm leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-500/10 flex items-center justify-between text-xs font-mono uppercase text-emerald-300">
                <span>Explore Dimension</span>
                <FaLocationArrow className="group-hover:translate-x-1 transition-transform" />
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* ===== CORE VALUES ===== */}
      <div className="py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Guiding Standards</p>
          <AnimatedTitle 
            title="<b>C</b>ore <b>V</b>alues"
            containerClass="!text-emerald-50 !text-4xl sm:!text-6xl font-black uppercase tracking-tight"
            fontClass="font-zentry"
          />
        </div>
        
        <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <BentoCard key={index} className="p-7">
              <div className="text-emerald-400 text-3xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-wide">{value.title}</h3>
              <p className="text-emerald-100/70 text-xs leading-relaxed">{value.desc}</p>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* ===== CAMPUS FEATURES (VIDEO CARDS WITH MP4 SOURCES) ===== */}
      <div ref={campusRef} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Campus Experience</p>
          <AnimatedTitle 
            title="<b>L</b>ife At <b>Z</b>DSPGC"
            containerClass="!text-emerald-50 !text-4xl sm:!text-6xl font-black uppercase tracking-tight"
            fontClass="font-zentry"
          />
        </div>
        
        <div className="features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campusVideos.map((item, index) => (
            <div
              key={index}
              className="feature-card group relative aspect-[3/4] overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-950/40 backdrop-blur-md cursor-pointer"
            >
              <video 
                autoPlay
                loop
                muted
                playsInline
                poster={item.poster}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-90"
              >
                {item.webm && <source src={item.webm} type="video/webm" />}
                <source src={item.mp4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Facility</span>
                  <p className="text-white font-black uppercase text-lg tracking-wide">{item.label}</p>
                </div>
                <FaSchool className="text-emerald-400 text-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== COMMUNITY BLOCKS ===== */}
      <div ref={communityRef} className="py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="text-center mb-16">
          <AnimatedTitle 
            title="MORE THAN A <b>C</b>LASSROOM."
            containerClass="!text-white !text-4xl sm:!text-6xl font-black uppercase leading-none mb-4"
            fontClass="font-zentry"
          />
          <p className="text-emerald-100/70 text-base md:text-lg max-w-2xl mx-auto font-general">
            A vibrant community where students learn, collaborate, build essential skills, and prepare for real-world impact.
          </p>
        </div>

        <div className="community-grid grid md:grid-cols-3 gap-8">
          {communityBlocks.map((block, index) => (
            <BentoCard key={index} className="p-8">
              <div className="text-emerald-400 text-4xl mb-6">{block.icon}</div>
              <h3 className="text-2xl font-black uppercase text-white mb-3 tracking-wide">{block.title}</h3>
              <p className="text-emerald-100/70 text-sm leading-relaxed">{block.description}</p>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div ref={ctaRef} className="cta-section relative py-32 px-6 border-t border-emerald-500/20 bg-black text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />

        <div className="cta-content relative z-10 max-w-3xl mx-auto space-y-8">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">Join Our Legacy</p>
          <AnimatedTitle 
            title="SHAPE YOUR <b>F</b>UTURE."
            containerClass="!text-white !text-5xl sm:!text-7xl font-black uppercase leading-none"
            fontClass="font-zentry"
          />
          <p className="text-emerald-100/70 text-base md:text-lg">
            Discover what your journey at ZDSPGC Aurora Campus can become.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 transition-colors shadow-[0_0_25px_rgba(52,211,153,0.25)]">
                <span>Explore Programs</span>
                <FaArrowRight />
              </button>
            </Link>
            <Link to="/contact">
              <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-200 text-xs font-bold uppercase tracking-wider hover:bg-emerald-900 transition-colors">
                <span>Contact Campus</span>
                <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;