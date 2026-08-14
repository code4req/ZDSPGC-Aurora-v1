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
  FaStar,
  FaChalkboardTeacher,
  FaLaptop,
  FaMicroscope,
  FaPalette,
  FaGlobe
} from "react-icons/fa";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(null);

  // Main clip animation
  useGSAP(() => {
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

    // Parallax effect on image
    gsap.to(".about-image img", {
      scrollTrigger: {
        trigger: "#clip",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      scale: 1.2,
      ease: "none",
    });
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
      iconColor: "text-blue-600"
    },
    {
      icon: FaUsers,
      number: "1200+",
      label: "Students",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: FaAward,
      number: "50+",
      label: "Awards Won",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: FaBook,
      number: "30+",
      label: "Programs Offered",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  const programs = [
    { icon: FaChalkboardTeacher, name: "BTVTED", description: "Science, Technology, Engineering, Mathematics" },
    { icon: FaLaptop, name: "BSIS", description: "Information & Communications Technology" },
    { icon: FaMicroscope, name: "BSBIO", description: "Pre-Med & Healthcare Programs" },
    { icon: FaPalette, name: "BPED", description: "Visual & Performing Arts" },
    { icon: FaGlobe, name: "BSA", description: "Multilingual & Cultural Studies" },
    { icon: FaGlobe, name: "BSCRIM", description: "Multilingual & Cultural Studies" },
  ];

  return (
    <div id="about" ref={sectionRef} className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4">
        {/* Floating badge */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <p className="relative text-sm uppercase md:text-[10px] text-blue-600 font-semibold tracking-wider bg-white px-6 py-2 rounded-full shadow-lg">
            About Our School
          </p>
        </div>

        <AnimatedTitle
          title="Empower<b>i</b>ng Minds, <br /> Build<b>i</b>ng Futures"
          containerClass="mt-5 !text-blue-900 text-center"
        />


        {/* Stats Section */}
        <div id="stats" ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-5xl">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`stat-item relative group cursor-pointer transition-all duration-300`}
                onMouseEnter={() => handleStatHover(index)}
                onMouseLeave={() => handleStatLeave(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}></div>
                <div className={`relative bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:border-transparent transition-all duration-300 overflow-hidden`}>
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon container with pulse effect */}
                  <div className={`relative w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`text-3xl ${stat.iconColor} relative z-10`} />
                    <div className={`absolute inset-0 ${stat.bgColor} rounded-full animate-ping opacity-20 group-hover:opacity-40`}></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  
                  {/* Decorative dot */}
                  <div className={`absolute bottom-3 right-3 w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Programs Section */}
        <div className="w-full max-w-5xl mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Our <span className="text-blue-600">Programs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                      <Icon className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{program.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{program.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Section with Parallax */}
      <div className="h-dvh w-full relative" id="clip">
        <div className="mask-clip-path about-image relative overflow-hidden">
          <img
            src="/img/ling.webp"
            alt="Zamboanga del Sur Provincial Government College"
            className="absolute left-0 top-0 size-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Floating text over image */}
          <div className="absolute bottom-10 left-10 z-10 text-white">
            <h3 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              Building <span className="text-blue-400">Tomorrow</span>
            </h3>
            <p className="text-sm opacity-90 drop-shadow-lg">Together, we create excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;