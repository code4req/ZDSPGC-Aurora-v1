import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router-dom";
import { 
  FaLaptop, 
  FaMicroscope, 
  FaChalkboardTeacher, 
  FaRunning,
  FaLeaf,
  FaShieldAlt,
  FaArrowRight,
  FaArrowDown,
  FaGraduationCap,
  FaClock,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaLocationArrow,
  FaClipboardList
} from "react-icons/fa";
import AnimatedTitle from "../components/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Custom Zentry 3D Tilt Bento Card Component
const BentoCard = ({ children, className = "", onMouseEnter, onMouseLeave }) => {
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

  const handleMouseLeave = (e) => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={`relative rounded-3xl border border-emerald-500/20 bg-emerald-950/30 backdrop-blur-md overflow-hidden group hover:border-emerald-500/40 ${className}`}
    >
      {children}
    </div>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  
  const coursesRef = useRef(null);
  const detailsRef = useRef(null);
  const ctaRef = useRef(null);

  const courses = [
    {
      id: "bsis",
      icon: FaLaptop,
      name: "BSIS",
      fullName: "Bachelor of Science in Information Systems",
      category: "Technology & Computing",
      duration: "4 Years",
      students: "250+ Students",
      rating: "4.8/5",
      color: "from-blue-500 to-cyan-400",
      description: "Learn to design, develop, and manage information systems that drive modern businesses and organizations.",
      highlights: [
        "Software Development",
        "Database Management",
        "Network Administration",
        "Web & Mobile Development",
        "System Analysis & Design"
      ],
      careers: [
        "Systems Analyst",
        "Software Developer",
        "IT Consultant",
        "Database Administrator",
        "Network Engineer"
      ],
      video: "/videos/bsis.mp4"
    },
    {
      id: "bsbio",
      icon: FaMicroscope,
      name: "BSBIO",
      fullName: "Bachelor of Science in Biology",
      category: "Science & Research",
      duration: "4 Years",
      students: "180+ Students",
      rating: "4.7/5",
      color: "from-green-500 to-emerald-400",
      description: "Explore the fascinating world of living organisms, from molecular biology to ecosystem dynamics.",
      highlights: [
        "Molecular Biology",
        "Genetics",
        "Ecology & Conservation",
        "Microbiology",
        "Research Methods"
      ],
      careers: [
        "Research Scientist",
        "Laboratory Technician",
        "Environmental Consultant",
        "Biotechnologist",
        "Medical Researcher"
      ],
      video: "/videos/bsbio.mp4"
    },
    {
      id: "btvted",
      icon: FaChalkboardTeacher,
      name: "BTVTED",
      fullName: "Bachelor of Technical-Vocational Teacher Education",
      category: "Education & Training",
      duration: "4 Years",
      students: "200+ Students",
      rating: "4.9/5",
      color: "from-purple-500 to-pink-400",
      description: "Prepare to become a skilled technical-vocational educator equipped with both teaching and technical expertise.",
      highlights: [
        "Technical Skills Training",
        "Curriculum Development",
        "Educational Psychology",
        "Teaching Methodologies",
        "Assessment & Evaluation"
      ],
      careers: [
        "Technical Educator",
        "Trainer",
        "Curriculum Developer",
        "Educational Consultant",
        "Skills Assessor"
      ],
      video: "/videos/btvted.mp4"
    },
    {
      id: "bped",
      icon: FaRunning,
      name: "BPED",
      fullName: "Bachelor of Physical Education",
      category: "Sports & Fitness",
      duration: "4 Years",
      students: "150+ Students",
      rating: "4.6/5",
      color: "from-orange-500 to-yellow-400",
      description: "Develop expertise in physical education, sports science, and health promotion for schools and communities.",
      highlights: [
        "Sports Science",
        "Physical Fitness",
        "Health Education",
        "Coaching & Training",
        "Recreation Management"
      ],
      careers: [
        "Physical Education Teacher",
        "Sports Coach",
        "Fitness Trainer",
        "Recreation Director",
        "Health Educator"
      ],
      video: "/videos/bped.mp4"
    },
    {
      id: "bsa",
      icon: FaLeaf,
      name: "BSA",
      fullName: "Bachelor of Science in Agriculture",
      category: "Agriculture & Environment",
      duration: "4 Years",
      students: "120+ Students",
      rating: "4.7/5",
      color: "from-emerald-500 to-teal-400",
      description: "Learn modern agricultural practices, sustainable farming, and agribusiness management for food security.",
      highlights: [
        "Crop Science",
        "Animal Science",
        "Soil Management",
        "Agribusiness",
        "Sustainable Agriculture"
      ],
      careers: [
        "Agriculturist",
        "Farm Manager",
        "Agribusiness Consultant",
        "Research Scientist",
        "Extension Officer"
      ],
      video: "/videos/bsa.mp4"
    },
    {
      id: "bscrim",
      icon: FaShieldAlt,
      name: "BSCRIM",
      fullName: "Bachelor of Science in Criminology",
      category: "Law & Public Safety",
      duration: "4 Years",
      students: "300+ Students",
      rating: "4.8/5",
      color: "from-red-500 to-rose-400",
      description: "Study the science of crime, criminal behavior, law enforcement, and public safety management.",
      highlights: [
        "Criminal Justice System",
        "Forensic Science",
        "Law Enforcement",
        "Criminal Investigation",
        "Public Safety Management"
      ],
      careers: [
        "Police Officer",
        "Forensic Specialist",
        "Crime Investigator",
        "Security Consultant",
        "Public Safety Officer"
      ],
      video: "/videos/bscrim.mp4"
    }
  ];

  // Navigation handlers - FIXED HERE
  const handleApplyNow = () => {
    navigate("/admissions");
  };

  const handleEnrollmentSteps = () => {
    navigate("/enrollment");  // Changed from "/admissions" to "/enrollment"
  };

  const handleDownloadCurriculum = () => {
    window.open("/curriculum.pdf", "_blank");
  };

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

      // FLOATING TILTED CLIP TRANSITION
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#courses-clip",
          start: "center center",
          end: "+=1000 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to(".zentry-mask-clip-courses", {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        rotation: 0,
        skewY: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power2.inOut",
      });

      const video = document.querySelector(".zentry-mask-clip-courses video");
      if (video) {
        gsap.fromTo(video, 
          { scale: 2.2, rotation: -8 },
          {
            scale: 1,
            rotation: 0,
            scrollTrigger: {
              trigger: "#courses-clip",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              ease: "power2.inOut",
            },
          }
        );
      }

      // Course cards animation
      gsap.fromTo(".course-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: coursesRef.current,
            start: "top 80%",
          }
        }
      );

      // Details animation
      gsap.fromTo(detailsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggleCourse = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <section className="relative w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-zinc-950 to-black text-white overflow-hidden selection:bg-emerald-400 selection:text-black">
      
      {/* HERO SECTION */}
      <div className="relative pt-32 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="hero-element inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-5 py-2 backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
            ZDSPGC Academic Offerings • Future Pathways
          </span>
        </div>

        <AnimatedTitle 
          title="Our&nbsp;&nbsp;<b>COURSES</b>"
          containerClass="hero-element !text-white !text-7xl sm:!text-9xl md:!text-[12rem] lg:!text-[14rem] font-black uppercase tracking-tight leading-none mb-6"
          fontClass="font-zentry"
        />

        <p className="hero-element text-emerald-100/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-general mb-10">
          Discover six comprehensive programs designed to prepare you for a successful career.
        </p>

      </div>

      {/* TILTED SQUARE FLOATING CLIP SECTION */}
      <div className="h-dvh w-full relative mt-12 overflow-hidden flex items-center justify-center" id="courses-clip">
        <div 
          className="zentry-mask-clip-courses relative overflow-hidden shadow-[0_0_90px_rgba(16,185,129,0.3)] border border-emerald-500/40 bg-emerald-950/80 cursor-pointer"
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
            src="/videos/bsis.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute left-0 top-0 w-full h-full object-cover scale-125"
            style={{ willChange: 'transform' }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-emerald-950/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-white text-center w-full px-6">
            <AnimatedTitle 
              title="Academic <b>E</b>xcellence"
              containerClass="!text-white !text-3xl md:!text-6xl font-black uppercase tracking-wide drop-shadow-2xl mb-2"
              fontClass="font-zentry"
            />
            <p className="text-xs md:text-sm font-mono tracking-widest text-emerald-200/90 uppercase drop-shadow-lg">
              Empowering Minds, Shaping Tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* COURSES GRID */}
      <div ref={coursesRef} className="relative py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const Icon = course.icon;
            const isExpanded = expandedCourse === course.id;
            
            return (
              <BentoCard
                key={course.id}
                className="course-card cursor-pointer"
                onMouseEnter={() => setActiveCourse(course.id)}
                onMouseLeave={() => setActiveCourse(null)}
              >
                {/* Course Video Header */}
                <div className="relative h-52 overflow-hidden bg-emerald-950/60">
                  <video
                    src={course.video}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <div className={`absolute bottom-4 left-4 p-3 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg`}>
                    <Icon className="text-2xl" />
                  </div>
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-black/40 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                    {course.category}
                  </div>
                </div>

                {/* Course Body */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-2xl font-black uppercase text-white group-hover:text-emerald-400 transition-colors tracking-wide">
                        {course.name}
                      </h3>
                      <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                        <FaStar className="text-yellow-400" /> {course.rating}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-emerald-300/80 mb-3">{course.fullName}</p>

                    <div className="flex items-center gap-4 text-xs font-mono text-emerald-100/60 mb-4">
                      <span className="flex items-center gap-1">
                        <FaClock /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUsers /> {course.students}
                      </span>
                    </div>

                    <p className="text-emerald-100/70 text-sm leading-relaxed mb-4">{course.description}</p>
                  </div>

                  <button
                    onClick={() => toggleCourse(course.id)}
                    className="w-full py-3 px-4 rounded-xl border border-emerald-500/20 bg-emerald-900/30 text-emerald-300 text-xs font-mono uppercase tracking-wider hover:bg-emerald-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        Show Less <FaChevronUp />
                      </>
                    ) : (
                      <>
                        Learn More <FaChevronDown />
                      </>
                    )}
                  </button>

                  {/* Expanded Highlights & Careers */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-emerald-500/20 space-y-5 animate-fadeIn">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Program Highlights</h4>
                        <ul className="space-y-1.5">
                          {course.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-emerald-100/80">
                              <FaCheckCircle className="text-emerald-400 shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Career Opportunities</h4>
                        <ul className="space-y-1.5">
                          {course.careers.map((career, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-emerald-100/80">
                              <FaArrowRight className="text-emerald-400 shrink-0" />
                              {career}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </BentoCard>
            );
          })}
        </div>
      </div>

      {/* WHY CHOOSE US DETAILS SECTION */}
      <div ref={detailsRef} className="py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">The ZDSPGC Advantage</p>
          <AnimatedTitle 
            title="Why <b>C</b>hoose <b>U</b>s"
            containerClass="!text-emerald-50 !text-4xl sm:!text-6xl font-black uppercase tracking-tight"
            fontClass="font-zentry"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BentoCard className="p-8">
            <div className="p-4 bg-emerald-400/10 border border-emerald-400/30 rounded-2xl text-emerald-400 text-3xl w-fit mb-4">
              <FaGraduationCap />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-wide">Quality Education</h3>
            <p className="text-emerald-100/70 text-xs leading-relaxed">
              Accredited programs with experienced faculty members dedicated to your growth.
            </p>
          </BentoCard>

          <BentoCard className="p-8">
            <div className="p-4 bg-blue-400/10 border border-blue-400/30 rounded-2xl text-blue-400 text-3xl w-fit mb-4">
              <FaLaptop />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-wide">Modern Facilities</h3>
            <p className="text-emerald-100/70 text-xs leading-relaxed">
              State-of-the-art computer labs, agricultural plots, and specialized research spaces.
            </p>
          </BentoCard>

          <BentoCard className="p-8">
            <div className="p-4 bg-purple-400/10 border border-purple-400/30 rounded-2xl text-purple-400 text-3xl w-fit mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-wide">Supportive Community</h3>
            <p className="text-emerald-100/70 text-xs leading-relaxed">
              A vibrant and collaborative environment that fosters academic and personal growth.
            </p>
          </BentoCard>

          <BentoCard className="p-8">
            <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-amber-400 text-3xl w-fit mb-4">
              <FaStar />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-wide">Career Ready</h3>
            <p className="text-emerald-100/70 text-xs leading-relaxed">
              Industry-aligned curricula designed to turn students into competitive professionals.
            </p>
          </BentoCard>
        </div>
      </div>

      {/* FINAL CTA */}
      <div ref={ctaRef} className="cta-section relative py-32 px-6 border-t border-emerald-500/20 bg-black text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">Start Today</p>
          <AnimatedTitle 
            title="Ready to <b>S</b>tart <b>Y</b>our <b>J</b>ourney?"
            containerClass="!text-white !text-5xl sm:!text-7xl font-black uppercase leading-none"
            fontClass="font-zentry"
          />
          <p className="text-emerald-100/70 text-base md:text-lg max-w-2xl mx-auto">
            Choose from our six programs and take the first step toward your future career.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={handleEnrollmentSteps}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:scale-105 transform transition-all duration-300"
            >
              <FaClipboardList />
              <span>Enrollment Steps</span>
              <FaArrowRight />
            </button>
            <button 
              onClick={handleApplyNow}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.25)] hover:scale-105 transform transition-all duration-300"
            >
              <span>Apply Now</span>
              <FaArrowRight />
            </button>
            <button 
              onClick={handleDownloadCurriculum}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-200 text-xs font-bold uppercase tracking-wider hover:bg-emerald-900 hover:scale-105 transform transition-all duration-300"
            >
              <span>Download Curriculum</span>
              <FaLocationArrow />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Courses;