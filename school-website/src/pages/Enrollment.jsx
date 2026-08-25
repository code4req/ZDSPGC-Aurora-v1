import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Link, useNavigate } from 'react-router-dom';
import Stepper, { Step } from '../components/Stepper';
import AnimatedTitle from '../components/AnimatedTitle';
import { 
  FaClipboardList, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaCheckCircle,
  FaArrowRight,
  FaGraduationCap,
  FaClock,
  FaPhone,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaHandsHelping,
  FaArrowLeft
} from 'react-icons/fa';

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

const EnrollmentSteps = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [stepName, setStepName] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const stepsData = [
    {
      title: 'Browse Programs',
      icon: FaClipboardList,
      description: 'Explore our diverse academic programs and find your passion.',
      details: 'Take your time to browse through our 6 degree programs. Each program offers unique opportunities for growth and career development.',
      image: '📋',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-900/30',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      iconBg: 'bg-blue-900/50',
      stats: '6 Programs Available',
      tips: [
        'Visit the programs page to learn more',
        'Watch program introduction videos',
        'Talk to current students and faculty'
      ]
    },
    {
      title: 'Check Requirements',
      icon: FaFileAlt,
      description: 'Review admission requirements for your chosen program.',
      details: 'Prepare the following requirements: Form 138 / Report Card, Certificate of Good Moral Character, Birth Certificate (PSA), and 2x2 ID pictures.',
      image: '📄',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-900/30',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      iconBg: 'bg-purple-900/50',
      stats: '5 Requirements',
      tips: [
        'Prepare documents in advance',
        'Get certified true copies',
        'Keep extra photocopies'
      ]
    },
    {
      title: 'Submit Application',
      icon: FaCalendarAlt,
      description: 'Complete and submit your application form online.',
      details: 'Fill out the online application form with your personal and academic information. Double-check all entries before submitting.',
      image: '📝',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-900/30',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      iconBg: 'bg-emerald-900/50',
      stats: 'Online Submission',
      tips: [
        'Fill out all required fields',
        'Upload clear scanned documents',
        'Review before submitting'
      ]
    },
    {
      title: 'Take Entrance Exam',
      icon: FaUsers,
      description: 'Schedule and take the entrance examination.',
      details: 'The entrance exam covers general knowledge, aptitude, and program-specific subjects. Prepare well and arrive early on exam day.',
      image: '✏️',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-900/30',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      iconBg: 'bg-orange-900/50',
      stats: '2 Hours Duration',
      tips: [
        'Review previous exam materials',
        'Get enough sleep the night before',
        'Arrive 30 minutes early'
      ]
    },
    {
      title: 'Enroll Now',
      icon: FaCheckCircle,
      description: 'Complete enrollment and start your journey with us!',
      details: 'Pay the tuition fees, get your student ID, and attend the orientation. Welcome to the ZDSPGC family!',
      image: '🎓',
      color: 'from-emerald-600 to-green-600',
      bgColor: 'bg-emerald-900/30',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      iconBg: 'bg-emerald-900/50',
      stats: 'Welcome Aboard!',
      tips: [
        'Pay tuition fees on time',
        'Attend the orientation',
        'Get your student ID'
      ]
    },
  ];

  const handleBack = () => {
    navigate(-1);
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
    });

    return () => ctx.revert();
  }, []);

  const handleStepChange = (step) => {
    setActiveStep(step);
    setStepName(stepsData[step - 1]?.title || '');
    console.log('Current step:', step);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    console.log('All steps completed!');
  };

  return (
    <section className="relative w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-zinc-950 to-black text-white overflow-hidden selection:bg-emerald-400 selection:text-black">
      
      {/* HERO SECTION */}
      <div className="relative pt-32 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="hero-element inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-5 py-2 backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
            ZDSPGC Enrollment Guide • Your Path to Success
          </span>
        </div>

        <AnimatedTitle
          title="How to <b>E</b>nroll"
          containerClass="hero-element !text-white !text-7xl sm:!text-9xl md:!text-[12rem] lg:!text-[10rem] font-black uppercase tracking-tight leading-none mb-6"
          fontClass="font-zentry"
        />

        <p className="hero-element text-emerald-100/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-general mb-10">
          Start your journey at ZDSPGC Aurora Campus by following these simple steps
        </p>

        {/* Back Button */}
        <div className="hero-element flex flex-wrap gap-4 justify-center mb-8">
          
        </div>

        {/* Step Progress Indicator */}
        {stepName && !isCompleted && (
          <div className="hero-element mt-4 inline-flex items-center gap-3 bg-gray-900/80 px-6 py-3 rounded-full border border-gray-700 shadow-lg backdrop-blur-sm">
            <span className="text-sm text-gray-400">Current Step:</span>
            <span className="font-bold text-emerald-400">{stepName}</span>
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            <FaArrowRight className="text-gray-500 text-sm" />
            <span className="text-sm text-gray-500">
              Step {activeStep} of {stepsData.length}
            </span>
            <div className="ml-2 w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full transition-all duration-500"
                style={{ width: `${(activeStep / stepsData.length) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Completion Message */}
        {isCompleted && (
          <div className="hero-element mt-6 animate-bounce">
            <div className="inline-block bg-gradient-to-r from-emerald-900/50 to-green-900/50 border-2 border-emerald-500/50 text-emerald-300 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
              🎉 Enrollment Complete! Welcome to ZDSPGC!
            </div>
          </div>
        )}
      </div>

      {/* STEPPER SECTION */}
      <div ref={sectionRef} className="relative py-12 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="max-w-5xl mx-auto">
          <Stepper
            initialStep={1}
            onStepChange={handleStepChange}
            onFinalStepCompleted={handleComplete}
            backButtonText="← Previous"
            nextButtonText="Next Step →"
            stepCircleContainerClassName="bg-gray-900/50 shadow-2xl rounded-3xl border border-gray-800 backdrop-blur-sm"
            stepContainerClassName="bg-gray-900/50"
            contentClassName="bg-gray-900/50 min-h-[250px]"
            footerClassName="bg-gray-900/50"
          >
            {stepsData.map((step, index) => (
              <Step key={index}>
                <div className="flex flex-col md:flex-row items-start gap-6 py-4">
                  {/* Left: Icon/Image */}
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-5xl shadow-lg shadow-${step.textColor}/20 transform transition-transform duration-300 hover:scale-110 hover:rotate-3`}>
                      {step.image}
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                    </div>
                    <div className={`mt-2 text-center text-xs font-bold ${step.textColor} bg-gray-800 rounded-full px-3 py-1 shadow-sm border border-gray-700`}>
                      Step {index + 1}
                    </div>
                  </div>
                  
                  {/* Right: Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className={`${step.textColor} text-2xl`} />
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      <span className={`ml-auto text-xs ${step.bgColor} ${step.textColor} px-3 py-1 rounded-full font-semibold border ${step.borderColor}`}>
                        {step.stats}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 font-medium mb-3">{step.description}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.details}</p>
                    
                    {/* Tips Section */}
                    <div className={`mt-4 ${step.bgColor} border ${step.borderColor} rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:shadow-${step.textColor}/10`}>
                      <p className={`${step.textColor} font-semibold text-sm mb-2 flex items-center gap-2`}>
                        <FaStar className="text-xs" />
                        Pro Tips:
                      </p>
                      <ul className="space-y-1.5">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className={`${step.textColor} mt-1 text-xs`}>✦</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Quick Action Links */}
                    <div className="mt-4 flex flex-wrap gap-3">
                      {index === 0 && (
                        <Link to="/courses" className={`group inline-flex items-center gap-1 ${step.textColor} hover:${step.textColor} text-sm font-semibold transition-all duration-300 hover:translate-x-1`}>
                          Browse Programs 
                          <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                      {index === 1 && (
                        <Link to="/admissions" className={`group inline-flex items-center gap-1 ${step.textColor} hover:${step.textColor} text-sm font-semibold transition-all duration-300 hover:translate-x-1`}>
                          View Requirements 
                          <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                      {index === 4 && (
                        <Link to="/contact" className={`group inline-flex items-center gap-1 ${step.textColor} hover:${step.textColor} text-sm font-semibold transition-all duration-300 hover:translate-x-1`}>
                          Contact Admissions 
                          <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="py-12 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BentoCard className="p-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-900/50 text-emerald-400 mb-2">
              <FaClipboardList className="text-xl" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">5</div>
            <div className="text-sm text-gray-400">Simple Steps</div>
          </BentoCard>
          <BentoCard className="p-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/50 text-blue-400 mb-2">
              <FaGraduationCap className="text-xl" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">6</div>
            <div className="text-sm text-gray-400">Programs</div>
          </BentoCard>
          <BentoCard className="p-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 mb-2">
              <FaClock className="text-xl" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">15</div>
            <div className="text-sm text-gray-400">Days to Enroll</div>
          </BentoCard>
          <BentoCard className="p-5 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-900/50 text-orange-400 mb-2">
              <FaHandsHelping className="text-xl" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">100%</div>
            <div className="text-sm text-gray-400">Support</div>
          </BentoCard>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="py-12 px-6 max-w-7xl mx-auto border-t border-emerald-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BentoCard className="p-4 flex items-center gap-3">
            <FaShieldAlt className="text-blue-400 text-2xl" />
            <div>
              <p className="font-semibold text-gray-200 text-sm">Secure Application</p>
              <p className="text-gray-400 text-xs">Your data is safe with us</p>
            </div>
          </BentoCard>
          <BentoCard className="p-4 flex items-center gap-3">
            <FaHandsHelping className="text-emerald-400 text-2xl" />
            <div>
              <p className="font-semibold text-gray-200 text-sm">24/7 Support</p>
              <p className="text-gray-400 text-xs">We're here to help you</p>
            </div>
          </BentoCard>
          <BentoCard className="p-4 flex items-center gap-3">
            <FaRocket className="text-purple-400 text-2xl" />
            <div>
              <p className="font-semibold text-gray-200 text-sm">Fast Processing</p>
              <p className="text-gray-400 text-xs">Quick application review</p>
            </div>
          </BentoCard>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="cta-section relative py-32 px-6 border-t border-emerald-500/20 bg-black text-center overflow-hidden">
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
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              <FaGraduationCap className="group-hover:rotate-12 transition-transform" />
              Apply Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 border-2 border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-emerald-400 px-8 py-4 rounded-full font-semibold transition-all hover:bg-gray-800/50 hover:scale-105"
            >
              <FaPhone className="group-hover:rotate-12 transition-transform" />
              Contact Admissions
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            📞 Need help? Call us at +63 (123) 456-7890
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          </p>
        </div>
      </div>

    </section>
  );
};

export default EnrollmentSteps;