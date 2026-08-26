import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaClipboardList,
  FaArrowRight,
  FaClock,
  FaGraduationCap,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';
import AnimatedTitle from '../components/AnimatedTitle';

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

const Admissions = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const detailsRef = useRef(null);
  const ctaRef = useRef(null);

  const requirements = [
    'Form 138 / Report Card',
    'Certificate of Good Moral Character',
    'Birth Certificate (PSA)',
    '2x2 ID Picture (2 copies)',
    'Transcript of Records (for transferees)',
  ];

  const steps = [
    {
      icon: FaClipboardList,
      title: 'Fill Out Application Form',
      description: 'Complete the online application form with your personal and academic information.',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: FaFileAlt,
      title: 'Submit Requirements',
      description: 'Submit all required documents to the Registrar\'s Office.',
      color: 'from-purple-500 to-pink-400',
    },
    {
      icon: FaCalendarAlt,
      title: 'Schedule Entrance Exam',
      description: 'Schedule and take the ZDSPGC entrance examination.',
      color: 'from-emerald-500 to-green-400',
    },
    {
      icon: FaUsers,
      title: 'Interview',
      description: 'Attend an interview with the admissions committee.',
      color: 'from-orange-500 to-yellow-400',
    },
    {
      icon: FaCheckCircle,
      title: 'Enrollment Confirmation',
      description: 'Complete your enrollment and secure your slot.',
      color: 'from-emerald-600 to-green-500',
    },
  ];

  const handleApplyNow = () => {
    navigate("/enrollment");
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

  return (
    <section className="relative w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-zinc-950 to-black text-white overflow-hidden selection:bg-emerald-400 selection:text-black">
      
      {/* ===== HERO SECTION - FULL VIEWPORT HEIGHT ===== */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center px-6 pt-20 md:pt-24 lg:pt-28">

        <AnimatedTitle 
          title="Admissions&nbsp;<b>2026</b>"
          containerClass="hero-element !text-white !text-7xl sm:!text-9xl md:!text-[12rem] lg:!text-[10rem] font-black uppercase tracking-tight leading-none mb-6"
          fontClass="font-zentry"
        />

        <p className="hero-element text-emerald-100/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-general mb-10">
          Start your journey at ZDSPGC Aurora Campus. Apply now and become
          part of our growing community of scholars and leaders.
        </p>

        {/* Quick Info Cards */}
        <div className="hero-element grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mb-10">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-emerald-400/50 transition-all hover:scale-105">
            <div className="text-3xl font-bold text-emerald-400 mb-2">June 20</div>
            <p className="text-white/60 text-sm">Enrollment Starts</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-emerald-400/50 transition-all hover:scale-105">
            <div className="text-3xl font-bold text-emerald-400 mb-2">July 15</div>
            <p className="text-white/60 text-sm">Application Deadline</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-emerald-400/50 transition-all hover:scale-105">
            <div className="text-3xl font-bold text-emerald-400 mb-2">Aug 1</div>
            <p className="text-white/60 text-sm">Classes Begin</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hero-element flex flex-wrap gap-4 justify-center">
          
        </div>

        {/* Scroll Indicator */}
  
      </div>

      {/* ===== REQUIREMENTS & PROCESS SECTION ===== */}
      <div ref={detailsRef} className="relative py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Your Path to ZDSPGC</p>
          <AnimatedTitle 
            title="How to <b>A</b>pply"
            containerClass="!text-emerald-50 !text-4xl sm:!text-6xl font-black uppercase tracking-tight"
            fontClass="font-zentry"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Requirements Column */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaShieldAlt className="text-emerald-400" />
              Admission <span className="text-emerald-400">Requirements</span>
            </h2>
            <BentoCard className="p-8">
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-emerald-100/80 group hover:text-white transition-colors">
                    <FaCheckCircle className="text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{req}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <p className="text-emerald-100/50 text-sm flex items-center gap-2">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="text-emerald-400">Note:</span> Additional
                  requirements may be requested by the admissions office.
                </p>
              </div>
            </BentoCard>
          </div>

          {/* Steps Column */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaClock className="text-emerald-400" />
              Application <span className="text-emerald-400">Process</span>
            </h2>
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-emerald-950/30 backdrop-blur-sm rounded-2xl p-4 border border-emerald-500/20 hover:border-emerald-400/50 transition-all hover:scale-[1.02] group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mt-1 group-hover:text-emerald-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-emerald-100/50 text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== WHY CHOOSE ZDSPGC SECTION ===== */}
      <div className="py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
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
              <FaFileAlt />
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
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-wide">Career Ready</h3>
            <p className="text-emerald-100/70 text-xs leading-relaxed">
              Industry-aligned curricula designed to turn students into competitive professionals.
            </p>
          </BentoCard>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <div ref={ctaRef} className="cta-section relative py-32 px-6 border-t border-emerald-500/20 bg-black text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">Start Today</p>
          <AnimatedTitle 
            title="Ready to <b>J</b>oin <b>U</b>s?"
            containerClass="!text-white !text-5xl sm:!text-7xl font-black uppercase leading-none"
            fontClass="font-zentry"
          />
          <p className="text-emerald-100/70 text-base md:text-lg max-w-2xl mx-auto">
            Take the first step toward your future career at ZDSPGC Aurora Campus.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={handleApplyNow}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:scale-105 transform transition-all duration-300"
            >
              <FaGraduationCap />
              <span>Apply Online Now</span>
              <FaArrowRight />
            </button>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-200 text-xs font-bold uppercase tracking-wider hover:bg-emerald-900 hover:scale-105 transform transition-all duration-300"
            >
              <span>Contact Admissions</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Admissions;