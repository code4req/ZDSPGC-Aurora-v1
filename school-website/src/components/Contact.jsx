import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaClock, 
  FaGlobe, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaCheckCircle,
  FaLocationArrow
} from "react-icons/fa";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Custom 3D Tilt Bento Card Component
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

// RELIABLE MAP COMPONENT - Using OpenStreetMap (No API Key Required)
const MapComponent = ({ latitude, longitude }) => {
  const [isLoading, setIsLoading] = useState(true);

  // OpenStreetMap embed URL with marker
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.008},${latitude-0.008},${longitude+0.008},${latitude+0.008}&layer=mapnik&marker=${latitude},${longitude}`;

  // Google Maps directions link
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden relative group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/50 z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-400 border-t-transparent"></div>
            <p className="text-emerald-100/50 text-xs mt-3">Loading map...</p>
          </div>
        </div>
      )}

      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="ZDSPGC Aurora Campus Map"
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      {/* Map Overlay with Controls */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 pointer-events-auto flex flex-col gap-1">
          <a 
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
            title="Get Directions"
          >
            <FaLocationArrow className="w-4 h-4" />
          </a>
          <a 
            href={`https://www.google.com/maps/place/${latitude},${longitude}`}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            title="Open in Google Maps"
          >
            <FaGlobe className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs font-mono tracking-wider">
                📍 ZDSPGC Aurora Campus
              </span>
            </div>
            <a 
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  // ZDSPGC AURORA CAMPUS COORDINATES
  const CAMPUS_COORDINATES = {
    latitude: 7.94630,
    longitude: 123.58771,
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
          trigger: "#contact-clip",
          start: "center center",
          end: "+=1000 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to(".zentry-mask-clip-contact", {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        rotation: 0,
        skewY: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power2.inOut",
      });

      const video = document.querySelector(".zentry-mask-clip-contact video");
      if (video) {
        gsap.fromTo(video, 
          { scale: 2.2, rotation: -8 },
          {
            scale: 1,
            rotation: 0,
            scrollTrigger: {
              trigger: "#contact-clip",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              ease: "power2.inOut",
            },
          }
        );
      }

      // Contact Form Section Animation
      gsap.fromTo(formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        }
      );

      // Contact Info Cards Animation
      gsap.fromTo(".info-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          }
        }
      );

      // Map Animation
      gsap.fromTo(mapRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-zinc-950 to-black text-white overflow-hidden selection:bg-emerald-400 selection:text-black">
      
      {/* HERO SECTION */}
      <div className="relative pt-32 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="hero-element inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-5 py-2 backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
            ZDSPGC Support • Get In Touch
          </span>
        </div>

        <AnimatedTitle 
          title="Contact&nbsp;&nbsp;<b>U</b>s"
          containerClass="hero-element !text-white !text-7xl sm:!text-9xl md:!text-[12rem] lg:!text-[14rem] font-black uppercase tracking-tight leading-none mb-6"
          fontClass="font-zentry"
        />

        <p className="hero-element text-emerald-100/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-general mb-10">
          Have questions about admissions, academic programs, or campus life? We're here to help you navigate your journey.
        </p>
      </div>

      {/* TILTED SQUARE FLOATING CLIP SECTION */}
      <div className="h-dvh w-full relative mt-12 overflow-hidden flex items-center justify-center" id="contact-clip">
        <div 
          className="zentry-mask-clip-contact relative overflow-hidden shadow-[0_0_90px_rgba(16,185,129,0.3)] border border-emerald-500/40 bg-emerald-950/80 cursor-pointer"
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
            src="/videos/bsa.mp4"
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
              title="Connect <b>W</b>ith <b>U</b>s"
              containerClass="!text-white !text-3xl md:!text-6xl font-black uppercase tracking-wide drop-shadow-2xl mb-2"
              fontClass="font-zentry"
            />
            <p className="text-xs md:text-sm font-mono tracking-widest text-emerald-200/90 uppercase drop-shadow-lg">
              We Are Here To Assist Your Educational Quest
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTION: FORM, INFO & MAP GRID */}
      <div className="relative py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* CONTACT FORM */}
          <div ref={formRef} className="lg:col-span-7">
            <BentoCard className="p-8 md:p-12">
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">
                  Send A Message
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                  Let's Start A Conversation
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <FaCheckCircle className="text-5xl text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold uppercase tracking-wide text-white">Message Sent!</h4>
                  <p className="text-emerald-100/70 text-sm">
                    Thank you for reaching out. Our administrative team will reply to your email shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-emerald-300">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/40 text-white placeholder-emerald-100/30 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-emerald-300">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/40 text-white placeholder-emerald-100/30 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-emerald-300">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Inquiry about BSIS Admission"
                      className="w-full px-4 py-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/40 text-white placeholder-emerald-100/30 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-emerald-300">Message</label>
                    <textarea 
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/40 text-white placeholder-emerald-100/30 text-sm focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 transition-all duration-300 shadow-[0_0_25px_rgba(52,211,153,0.25)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane />
                      </>
                    )}
                  </button>
                </form>
              )}
            </BentoCard>
          </div>

          {/* CONTACT INFORMATION DETAILS */}
          <div ref={infoRef} className="lg:col-span-5 space-y-6">
            
            <BentoCard className="info-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xl shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-lg font-bold uppercase text-white mb-1 tracking-wide">Campus Address</h4>
                  <p className="text-emerald-100/70 text-xs leading-relaxed">
                    Zamboanga del Sur Provincial Government College (ZDSPGC)<br />
                    Aurora, Zamboanga del Sur, Philippines
                  </p>
                  <p className="text-emerald-100/50 text-xs mt-1 font-mono">
                    7.94630° N, 123.58771° E
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="info-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-400/10 border border-blue-400/30 text-blue-400 text-xl shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-lg font-bold uppercase text-white mb-1 tracking-wide">Email Us</h4>
                  <p className="text-emerald-100/70 text-xs leading-relaxed">
                    Admissions: admissions@zdspgc.edu.ph<br />
                    General Inquiry: info@zdspgc.edu.ph
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="info-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-400/10 border border-purple-400/30 text-purple-400 text-xl shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-lg font-bold uppercase text-white mb-1 tracking-wide">Phone Lines</h4>
                  <p className="text-emerald-100/70 text-xs leading-relaxed">
                    Registrar Office: +63 (062) 123-4567<br />
                    Administration: +63 (062) 765-4321
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="info-card p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xl shrink-0">
                  <FaClock />
                </div>
                <div>
                  <h4 className="text-lg font-bold uppercase text-white mb-1 tracking-wide">Office Hours</h4>
                  <p className="text-emerald-100/70 text-xs leading-relaxed">
                    Monday – Friday: 8:00 AM – 5:00 PM<br />
                    Saturday & Sunday: Closed
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* SOCIAL MEDIA CONNECTIONS */}
            <BentoCard className="info-card p-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                Follow & Connect
              </h4>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/zdspgc" className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-400 hover:text-black transition-all duration-300">
                  <FaFacebookF />
                </a>
                <a href="#twitter" className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-400 hover:text-black transition-all duration-300">
                  <FaTwitter />
                </a>
                <a href="#instagram" className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-400 hover:text-black transition-all duration-300">
                  <FaInstagram />
                </a>
                <a href="#linkedin" className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-400 hover:text-black transition-all duration-300">
                  <FaLinkedinIn />
                </a>
              </div>
            </BentoCard>

          </div>
        </div>

        {/* MAP SECTION */}
        <div ref={mapRef} className="mt-12">
          <BentoCard className="p-6 md:p-8">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">
                Find Us On The Map
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                Our Campus Location
              </h3>
              <p className="text-emerald-100/60 text-sm mt-1">
                ZDSPGC Aurora Campus • Aurora, Zamboanga del Sur
              </p>
              <p className="text-emerald-100/40 text-xs mt-1 font-mono">
                📍 7.94630° N, 123.58771° E
              </p>
            </div>
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-emerald-500/20">
              <MapComponent 
                latitude={CAMPUS_COORDINATES.latitude}
                longitude={CAMPUS_COORDINATES.longitude}
              />
            </div>
            <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-emerald-100/50 text-xs">
                <FaGlobe className="text-emerald-400" />
                <span>Interactive map powered by OpenStreetMap</span>
              </div>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${CAMPUS_COORDINATES.latitude},${CAMPUS_COORDINATES.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Get Directions →
              </a>
            </div>
          </BentoCard>
        </div>
      </div>

      {/* LOCATION & DIRECTIONS CTA */}
      <div className="relative py-24 px-6 border-t border-emerald-500/20 bg-black text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">Visit Us</p>
          <AnimatedTitle 
            title="Plan <b>Y</b>our <b>V</b>isit"
            containerClass="!text-white !text-5xl sm:!text-7xl font-black uppercase leading-none"
            fontClass="font-zentry"
          />
          <p className="text-emerald-100/70 text-base md:text-lg max-w-2xl mx-auto">
            Experience our vibrant campus firsthand. Visit our administrative office in Aurora, Zamboanga del Sur.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${CAMPUS_COORDINATES.latitude},${CAMPUS_COORDINATES.longitude}`}
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 transition-colors shadow-[0_0_25px_rgba(52,211,153,0.25)]"
            >
              <span>Get Directions</span>
              <FaLocationArrow />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;