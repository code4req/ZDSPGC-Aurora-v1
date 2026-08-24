import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { supabase } from "../lib/supabase";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBasketballBall,
  FaFlask,
  FaBook,
  FaMicrophone,
  FaHandshake,
  FaTrophy,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaLocationArrow
} from "react-icons/fa";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Custom Zentry 3D Tilt Card Component
const BentoCard = ({ event, onSelect }) => {
  const cardRef = useRef(null);

  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * -12;
    const tiltY = (relativeX - 0.5) * 12;

    setTransform(
      `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  const Icon = event.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.15s ease-out"
      }}
      className="event-card-zentry relative rounded-3xl border border-emerald-500/20 bg-emerald-950/30 p-7 backdrop-blur-md overflow-hidden flex flex-col justify-between group cursor-pointer min-h-[380px] hover:border-emerald-500/40"
    >
      <div
        className={`absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br ${event.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`}
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/60 px-4 py-1.5 backdrop-blur-md">
            <Icon className="text-emerald-400 text-sm" />

            <span className="text-xs font-general font-medium uppercase tracking-wider text-emerald-200">
              {event.category}
            </span>
          </div>

          <span className="text-xs font-mono text-emerald-500/80 uppercase tracking-widest">
            {event.attendees} ENROLLED
          </span>
        </div>

        <h3 className="font-zentry text-3xl font-black uppercase text-emerald-50 group-hover:text-emerald-300 transition-colors duration-300 mb-3 tracking-wide">
          {event.title}
        </h3>

        <p className="text-sm text-emerald-200/70 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-emerald-500/10 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-xs text-emerald-300/70 font-mono">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-emerald-400" />

            <span className="truncate">
              {event.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-emerald-400" />

            <span className="truncate">
              {event.location}
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelect(event)}
          className="w-full flex items-center justify-between rounded-full bg-emerald-950/80 group-hover:bg-emerald-400 group-hover:text-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-200 transition-all duration-300 border border-emerald-500/20 group-hover:border-emerald-400"
        >
          <span>Explore Event</span>

          <FaLocationArrow className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setSelectedEvent] = useState(null);

  // SUPABASE
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const eventsRef = useRef(null);
  const ctaRef = useRef(null);

  const categories = [
    {
      id: "all",
      label: "All Events",
      icon: FaCalendarAlt
    },
    {
      id: "academic",
      label: "Academic",
      icon: FaBook
    },
    {
      id: "sports",
      label: "Sports",
      icon: FaBasketballBall
    },
    {
      id: "cultural",
      label: "Cultural",
      icon: FaTrophy
    },
    {
      id: "workshop",
      label: "Workshops",
      icon: FaMicrophone
    },
    {
      id: "community",
      label: "Community",
      icon: FaHandshake
    }
  ];

  /*
  ============================================================
  SUPABASE EVENTS - FETCH NEWEST FIRST
  ============================================================
  */

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", {
          ascending: false  // NEWEST FIRST
        });

      if (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
        return;
      }

      console.log("Events from Supabase (newest first):", data);

      setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  /*
  ============================================================
  FORMAT SUPABASE DATA
  This keeps the same structure your original cards use.
  ============================================================
  */

  const formatEvent = (event) => {
    let icon = FaCalendarAlt;
    let color = "from-emerald-500 to-teal-600";

    switch (event.category?.toLowerCase()) {
      case "academic":
        icon = FaBook;
        color = "from-emerald-600 to-green-800";
        break;

      case "sports":
        icon = FaBasketballBall;
        color = "from-teal-500 to-emerald-600";
        break;

      case "cultural":
        icon = FaTrophy;
        color = "from-emerald-500 to-teal-600";
        break;

      case "workshop":
        icon = FaFlask;
        color = "from-green-500 to-emerald-700";
        break;

      case "community":
        icon = FaHandshake;
        color = "from-emerald-400 to-green-600";
        break;

      default:
        icon = FaCalendarAlt;
        color = "from-emerald-500 to-teal-600";
    }

    let formattedDate = event.event_date;

    if (event.event_date) {
      const date = new Date(event.event_date);

      if (!Number.isNaN(date.getTime())) {
        formattedDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        });
      }
    }

    return {
      ...event,
      date: formattedDate || "Date TBA",
      time: event.time || "Time TBA",
      location: event.location || "Location TBA",
      category: event.category || "event",
      attendees: event.attendees || "0",
      icon,
      color
    };
  };

  const formattedEvents = events.map(formatEvent);

  /*
  ============================================================
  FEATURED EVENT - ONLY THE NEWEST EVENT
  ============================================================
  */

  // Get the single newest event (first item since we ordered by created_at DESC)
  const featuredEvent = formattedEvents.length > 0 ? [formattedEvents[0]] : [];

  /*
  ============================================================
  SAME FILTER LOGIC
  ============================================================
  */

  const filteredEvents =
    activeCategory === "all"
      ? formattedEvents
      : formattedEvents.filter(
          (event) =>
            event.category.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  /*
  ============================================================
  RESET SLIDE WHEN FEATURED EVENT CHANGES
  ============================================================
  */

  useEffect(() => {
    setCurrentSlide(0);
  }, [featuredEvent.length]);

  /*
  ============================================================
  GSAP ANIMATIONS
  ============================================================
  */

  useGSAP(() => {
    // Hero Entrance
    gsap.from(".hero-element", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out"
    });

    // ZENTRY FLOATING SKEWED SQUARE CLIP TRANSITION
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=1000 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true
      }
    });

    // Expand size + clear rotation & tilt to make it a straight full-screen block
    clipAnimation.to(".zentry-mask-clip", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      rotation: 0,
      skewX: 0,
      clipPath:
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power2.inOut"
    });

    // Un-zoom the inner image simultaneously
    const image = document.querySelector(
      ".zentry-mask-clip img"
    );

    if (image) {
      gsap.fromTo(
        image,
        {
          scale: 2,
          rotation: 5
        },
        {
          scale: 1,
          rotation: 0,
          scrollTrigger: {
            trigger: "#clip",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            ease: "power2.inOut"
          }
        }
      );
    }

    // Bento Cards Reveal
    gsap.fromTo(
      ".event-card-zentry",
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: eventsRef.current,
          start: "top 75%"
        }
      }
    );
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-zinc-950 to-black text-white overflow-hidden selection:bg-emerald-400 selection:text-black">

      {/* HERO HEADER */}

      <div
        ref={heroRef}
        className="relative pt-32 px-6 overflow-hidden flex flex-col items-center text-center"
      >
        <div className="hero-element inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-5 py-2 backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
            ZDSPGC Events Hub • 2026
          </span>
        </div>

        <AnimatedTitle
          title="Our&nbsp;&nbsp;<b>EVENT</b>s"
          containerClass="hero-element !text-white !text-7xl sm:!text-9xl md:!text-[12rem] lg:!text-[14rem] font-black uppercase tracking-tight leading-none mb-6"
          fontClass="font-zentry"
        />

        <p className="hero-element text-emerald-100/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-general">
          Step into the arena of innovation, sports, and cultural milestones at ZDSPGC Aurora Campus.
        </p>
      </div>

      {/* ZENTRY TILTED FLOATING SQUARE SECTION */}

      <div
        className="h-dvh w-full relative mt-12 overflow-hidden flex items-center justify-center"
        id="clip"
      >
        <div
          className="zentry-mask-clip relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.25)] border border-emerald-500/40 bg-emerald-950/80"
          style={{
            width: "60vw",
            height: "60vh",
            borderRadius: "32px",
            transform: "rotate(-5deg) skewX(-2deg)",
            clipPath:
              "polygon(5% 0%, 100% 4%, 95% 100%, 0% 96%)",
            willChange:
              "transform, clip-path, width, height"
          }}
        >
          <img
            src="/img/zdspgcv.jpg"
            alt="ZDSPGC Events Visual"
            className="absolute left-0 top-0 w-full h-full object-cover scale-125"
            style={{
              willChange: "transform"
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-emerald-950/30 to-transparent pointer-events-none" />

          {/* Centered Overlay Caption */}

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-white text-center w-full px-4">
            <h3 className="text-3xl md:text-6xl font-black uppercase tracking-wide drop-shadow-2xl mb-2">
              Experience{" "}
              <span className="text-emerald-400">
                Excellence
              </span>
            </h3>

            <p className="text-xs md:text-sm font-mono tracking-widest text-emerald-200/90 uppercase drop-shadow-lg">
              Moments that define our campus culture
            </p>
          </div>
        </div>
      </div>

      {/* FEATURED REALM - SHOWING NEWEST EVENT */}

      <div
        ref={featuredRef}
        className="relative py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              Latest Event
            </p>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-emerald-50">
              Featured Realm
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + featuredEvent.length) %
                    featuredEvent.length
                )
              }
              disabled={featuredEvent.length === 0 || featuredEvent.length <= 1}
              className="h-12 w-12 rounded-full border border-emerald-500/30 bg-emerald-950/80 flex items-center justify-center text-emerald-200 hover:bg-emerald-400 hover:text-black transition-all disabled:opacity-30"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev + 1) %
                    featuredEvent.length
                )
              }
              disabled={featuredEvent.length === 0 || featuredEvent.length <= 1}
              className="h-12 w-12 rounded-full border border-emerald-500/30 bg-emerald-950/80 flex items-center justify-center text-emerald-200 hover:bg-emerald-400 hover:text-black transition-all disabled:opacity-30"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-950/40 p-8 md:p-14 backdrop-blur-md">

          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 animate-spin" />
                <p className="text-emerald-300/60 font-mono text-sm uppercase tracking-widest">
                  Loading latest event...
                </p>
              </div>
            </div>
          ) : featuredEvent.length === 0 ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <FaCalendarAlt className="text-6xl text-emerald-500/20 mx-auto mb-4" />
                <p className="text-emerald-300/60 font-mono text-sm uppercase tracking-widest">
                  No events yet. Check back soon!
                </p>
              </div>
            </div>
          ) : (
            featuredEvent.map((event, index) => {
              if (index !== currentSlide) return null;

              const Icon = event.icon;

              return (
                <div
                  key={event.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 border border-emerald-400/30 px-4 py-1 text-xs font-mono uppercase text-emerald-300">
                      <Icon />

                      {event.category}
                    </div>

                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
                      {event.title}
                    </h3>

                    <p className="text-emerald-100/70 text-base md:text-lg leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-6 pt-4 text-xs font-mono text-emerald-300">
                      <span className="flex items-center gap-2">
                        <FaCalendarAlt className="text-emerald-400" />

                        {event.date}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaClock className="text-emerald-400" />

                        {event.time}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-emerald-400" />

                        {event.location}
                      </span>
                    </div>

                    {/* NEW: Show when event was created */}
                    {event.created_at && (
                      <div className="text-xs text-emerald-500/50 font-mono">
                        Added {new Date(event.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full aspect-square max-w-sm rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950 to-zinc-950 p-8 flex flex-col items-center justify-center text-center group shadow-2xl">

                      <div
                        className={`p-6 rounded-full bg-gradient-to-br ${event.color} text-white mb-6 shadow-2xl group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="text-5xl" />
                      </div>

                      <span className="text-2xl font-black uppercase tracking-wider text-emerald-100">
                        {event.attendees}
                      </span>

                      <span className="text-xs font-mono text-emerald-500 uppercase mt-1">
                        Expected Attendees
                      </span>

                      {/* NEW: Badge to show it's the latest */}
                      <div className="absolute -top-3 -right-3 bg-emerald-400 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-lg">
                        Latest
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CATEGORY FILTER */}

      <div className="py-8 px-6 border-y border-emerald-500/20 bg-emerald-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-emerald-400 text-black border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                    : "bg-emerald-950/60 text-emerald-300 border-emerald-500/20 hover:border-emerald-400/50 hover:text-white"
                }`}
              >
                <Icon className="text-sm" />

                {cat.label}
              </button>
            );
          })}

        </div>
      </div>

      {/* BENTO EVENTS GRID */}

      <div
        ref={eventsRef}
        className="py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredEvents.map((event) => (
            <BentoCard
              key={event.id}
              event={event}
              onSelect={setSelectedEvent}
            />
          ))}

        </div>
      </div>

      {/* CTA SECTION */}

      <div
        ref={ctaRef}
        className="relative py-32 px-6 border-t border-emerald-500/20 bg-black text-center overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">

          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Enter The Campus Nexus
          </p>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-emerald-50">
            Ready To Participate?
          </h2>

          <p className="text-emerald-100/70 text-base md:text-lg">
            Stay tuned for upcoming campus competitions, academic summits, and cultural showcases.
          </p>

          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-300 transition-colors shadow-[0_0_25px_rgba(52,211,153,0.25)]">
              <span>View Full Calendar</span>

              <FaArrowRight />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Events;