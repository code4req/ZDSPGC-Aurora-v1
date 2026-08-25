// components/RevealTitle.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const RevealTitle = ({ onComplete }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const squareRef = useRef(null);

  useEffect(() => {
    // Ensure the square starts centered and then animates to top-left
    gsap.set(squareRef.current, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: 'clamp(300px, 50vw, 600px)',
      height: 'clamp(300px, 50vw, 600px)',
      x: '-50%',
      y: '-50%',
      borderRadius: '20px',
      backgroundColor: '#0a0a0a',
      border: '2px solid rgba(16,185,129,0.4)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: '0 0 90px rgba(16,185,129,0.15)',
    });

    // Animate the square to its final position (top-left of hero)
    gsap.to(squareRef.current, {
      top: '5%',
      left: '5%',
      x: '0%',
      y: '0%',
      width: 'clamp(120px, 20vw, 250px)',
      height: 'clamp(120px, 20vw, 250px)',
      borderRadius: '12px',
      duration: 1.2,
      ease: "power3.inOut",
      delay: 0.3,
      onComplete: onComplete,
    });

    // Animate the title text reveal using clip-path
    gsap.fromTo(titleRef.current,
      { clipPath: 'inset(0 0 0 100%)' },
      { clipPath: 'inset(0 0 0 0%)', duration: 0.8, ease: "power2.out", delay: 0.6 }
    );

    return () => {
      gsap.killTweensOf(squareRef.current);
      gsap.killTweensOf(titleRef.current);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef}>
      <div ref={squareRef}>
        <h2
          ref={titleRef}
          className="text-3xl md:text-6xl font-black uppercase leading-tight text-white text-center font-zentry p-4"
        >
          SHAPE <br /> YOUR <br /> <span className="text-emerald-400">FUTURE</span>
        </h2>
      </div>
    </div>
  );
};

export default RevealTitle;