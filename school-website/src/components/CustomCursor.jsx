import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Initial animation
    gsap.set(cursor, { x: -100, y: -100, opacity: 0 });
    gsap.set(cursorDot, { x: -100, y: -100, opacity: 0 });

    // Mouse move handler
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power3.out',
        opacity: 1,
      });
      
      gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.1,
        ease: 'power1.out',
        opacity: 1,
      });
    };

    // Hover effects for interactive elements
    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: '#8b5cf6',
        duration: 0.3,
      });
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: '#ffffff',
        duration: 0.3,
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    
    document.querySelectorAll('a, button, .cursor-hover').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button, .cursor-hover').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[999] w-12 h-12 border-2 border-white/30 rounded-full hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'border-color 0.3s ease',
        }}
      />
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[999] w-2 h-2 bg-white rounded-full hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}

export default CustomCursor;