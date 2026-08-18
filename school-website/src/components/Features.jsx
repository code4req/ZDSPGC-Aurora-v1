import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { gsap } from 'gsap';

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, highlightIndex }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const titleRef = useRef(null);

  // Animate the title on mount
  useEffect(() => {
    const titleWords = titleRef.current?.querySelectorAll('.program-word');
    
    if (titleWords) {
      gsap.fromTo(
        titleWords,
        { y: 80, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }
  }, [title]);

  // Function to render title with animated letters
  const renderAnimatedTitle = (text) => {
    const letters = text.split('');
    return letters.map((letter, index) => {
      // Check if this letter should be highlighted
      const isHighlighted = highlightIndex && 
        index >= highlightIndex[0] && 
        index <= highlightIndex[1];
      
      if (isHighlighted) {
        return (
          <b 
            key={index} 
            className="program-word inline-block font-black text-emerald-400 opacity-0"
          >
            {letter}
          </b>
        );
      }
      return (
        <span key={index} className="program-word inline-block opacity-0">
          {letter}
        </span>
      );
    });
  };

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 
            ref={titleRef}
            className="bento-title special-font text-4xl md:text-6xl font-black uppercase"
          >
            {renderAnimatedTitle(title)}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-emerald-500 px-5 py-2 text-xs uppercase text-white font-medium shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all duration-300 hover:shadow-emerald-400/50 hover:scale-105"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #ffffff44, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">view program</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for cards without the hover effect
const ProgramCard = ({ src, title, description, highlightIndex }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const titleWords = titleRef.current?.querySelectorAll('.program-word');
    
    if (titleWords) {
      gsap.fromTo(
        titleWords,
        { y: 80, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }
  }, [title]);

  const renderAnimatedTitle = (text) => {
    const letters = text.split('');
    return letters.map((letter, index) => {
      const isHighlighted = highlightIndex && 
        index >= highlightIndex[0] && 
        index <= highlightIndex[1];
      
      if (isHighlighted) {
        return (
          <b 
            key={index} 
            className="program-word inline-block font-black text-emerald-400 opacity-0"
          >
            {letter}
          </b>
        );
      }
      return (
        <span key={index} className="program-word inline-block opacity-0">
          {letter}
        </span>
      );
    });
  };

  return (
    <div className="relative size-full overflow-hidden">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 
            ref={titleRef}
            className="bento-title special-font text-4xl md:text-6xl font-black uppercase"
          >
            {renderAnimatedTitle(title)}
          </h1>
          <p className="mt-3 max-w-64 text-xs md:text-base">
            {description}
          </p>
        </div>
        <div className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-emerald-500 px-5 py-2 text-xs uppercase text-white font-medium shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all duration-300 hover:shadow-emerald-400/50 hover:scale-105">
          <TiLocationArrow className="relative z-20" />
          <p className="relative z-20">view program</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Our Academic Programs
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Explore our diverse range of programs designed to unlock every student's potential.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="/videos/bsis.mp4"
          title="BSIS"
          description="Technology, business, and systems working together."
          isComingSoon
          highlightIndex={[2, 2]} // Highlight the 'I' in BSIS
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="/videos/bsbio.mp4"
            title="BSBIO"
            description="Exploring life, science, and the living world."
            isComingSoon
            highlightIndex={[3, 5]} // Highlight 'BIO'
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="/videos/bped.mp4"
            title="BPED"
            description="Shaping active, healthy, and skilled individuals through physical education."
            isComingSoon
            highlightIndex={[2, 2]} // Highlight the 'E' in BPED
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="/videos/bscrim.mp4"
            title="BSCRIM"
            description="Justice, safety, and service for a better community."
            isComingSoon
            highlightIndex={[2, 2]} // Highlight the 'C' in BSCRIM
          />
        </BentoTilt>

        {/* More Programs - BTVTED Video */}
        <BentoTilt className="bento-tilt_2">
          <ProgramCard
            src="/videos/btvted.mp4"
            title="BTVTED"
            description="Technical-Vocational Teacher Education for future educators."
            highlightIndex={[4, 5]} // Highlight 'ED'
          />
        </BentoTilt>

        {/* BSA Video */}
        <BentoTilt className="bento-tilt_2">
          <ProgramCard
            src="/videos/bsa.mp4"
            title="BSA"
            description="Agricultural Sciences for sustainable farming and development."
            highlightIndex={[2, 2]} // Highlight the 'A' in BSA
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;