import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { 
  FaGraduationCap, 
  FaUsers, 
  FaAward, 
  FaBook, 
  FaArrowRight,
  FaChalkboardTeacher,
  FaLaptop,
  FaMicroscope,
  FaPalette,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);
  const programsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(null);
  const [activeProgram, setActiveProgram] = useState(null);

  useGSAP(() => {
    // Clip animation for image reveal - square centered
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      x: 0,
      y: 0,
    });

    // Stats animation
    gsap.from(".stat-item", {
      scrollTrigger: {
        trigger: "#stats",
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
      opacity: 0,
      y: 50,
      scale: 0.8,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

    // Card animations
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
        },
        opacity: 0,
        y: 80,
        rotationX: 10,
        duration: 1,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });

    // Program card animations
    programsRef.current.forEach((program, index) => {
      gsap.from(program, {
        scrollTrigger: {
          trigger: program,
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
        },
        opacity: 0,
        y: 60,
        duration: 1,
        delay: index * 0.08,
        ease: "power3.out",
      });
    });

    // Image zoom out effect - starts zoomed in, zooms out to fit screen
    const image = document.querySelector(".about-image img");
    if (image) {
      gsap.fromTo(image, 
        {
          scale: 1.8,
          y: '-10%',
          opacity: 0.8,
        },
        {
          scale: 1,
          y: '0%',
          opacity: 1,
          scrollTrigger: {
            trigger: "#clip",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            ease: "power2.inOut",
          },
        }
      );
    }
  }, []);

  // Hover animation for stats
  const handleStatHover = (index) => {
    setIsHovered(index);
    gsap.to(cardsRef.current[index], {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleStatLeave = (index) => {
    setIsHovered(null);
    gsap.to(cardsRef.current[index], {
      scale: 1,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const stats = [
    {
      icon: FaGraduationCap,
      number: "98%",
      label: "Graduation Rate",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "of students graduate on time"
    },
    {
      icon: FaUsers,
      number: "1200+",
      label: "Students",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      description: "active learners enrolled"
    },
    {
      icon: FaAward,
      number: "50+",
      label: "Awards Won",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      description: "regional & national recognition"
    },
    {
      icon: FaBook,
      number: "30+",
      label: "Programs Offered",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      description: "diverse academic programs"
    }
  ];

  const programs = [
    { 
      icon: FaChalkboardTeacher, 
      name: "BTVTED", 
      fullName: "Bachelor of Technical-Vocational Teacher Education",
      description: "Technical & Vocational Education",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50",
    },
    { 
      icon: FaLaptop, 
      name: "BSIS", 
      fullName: "Bachelor of Science in Information Systems",
      description: "Information Technology & Systems",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-50",
    },
    { 
      icon: FaMicroscope, 
      name: "BSBIO", 
      fullName: "Bachelor of Science in Biology",
      description: "Pre-Med & Life Sciences",
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-50",
    },
    { 
      icon: FaPalette, 
      name: "BPED", 
      fullName: "Bachelor of Physical Education",
      description: "Physical Education & Sports",
      color: "from-orange-500 to-yellow-400",
      bgColor: "bg-orange-50",
    },
    { 
      icon: FaGlobe, 
      name: "BSA", 
      fullName: "Bachelor of Science in Agriculture",
      description: "Agricultural Sciences",
      color: "from-emerald-500 to-teal-400",
      bgColor: "bg-emerald-50",
    },
    { 
      icon: FaShieldAlt, 
      name: "BSCRIM", 
      fullName: "Bachelor of Science in Criminology",
      description: "Criminology & Public Safety",
      color: "from-red-500 to-rose-400",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div id="about" ref={sectionRef} className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4">
        {/* Floating badge */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <p className="relative text-sm uppercase md:text-[10px] text-blue-600 font-semibold tracking-wider bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
            Welcome to ZDSPGC Aurora
          </p>
        </div>

        <AnimatedTitle
          title="Empower<b>i</b>ng Minds, <br /> Build<b>i</b>ng Futures"
          containerClass="mt-5 !text-blue-900 text-center"
        />

        {/* Description */}
        <div className="text-center max-w-3xl mt-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Zamboanga del Sur Provincial Government College is committed to providing 
            quality education and developing future leaders who will contribute to 
            the progress of our nation.
          </p>
        </div>
      </div>

      {/* Image Section with Square Centered */}
      <div className="h-dvh w-full relative mt-20 overflow-hidden" id="clip">
        <div className="mask-clip-path about-image relative w-full h-full overflow-hidden" style={{
          width: '75vw',
          height: '80vh',
          margin: '0 auto',
          borderRadius: '24px',
        }}>
          <img
            src="/img/zdspgcv.jpg"
            alt="Zamboanga del Sur Provincial Government College"
            className="absolute left-0 top-0 w-full h-full object-cover"
            style={{ 
              transform: 'scale(1.8) translateY(-10%)',
              transformOrigin: 'center center',
              willChange: 'transform'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Text centered at bottom like screenshot */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-white text-center w-full px-4">
            <h3 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
              Building <span className="text-blue-400">Tomorrow</span>
            </h3>
            <p className="text-sm md:text-base opacity-90 drop-shadow-lg">Together, we create excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;