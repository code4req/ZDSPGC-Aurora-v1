// HeroAnimatedTitle.jsx
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const HeroAnimatedTitle = ({ 
  title, 
  containerClass, 
  fontClass = "font-robert-regular",
  showDecorativeLine = true 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation - words slide in from left with 3D effect
      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      });

      titleTimeline
        .fromTo(
          ".hero-word",
          {
            opacity: 0,
            x: -120,
            rotationY: 60,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            stagger: {
              amount: 0.8,
              from: "start",
            },
          },
          0
        );

      // Decorative line animation
      if (showDecorativeLine) {
        gsap.fromTo(".hero-line",
          { width: 0, opacity: 0 },
          {
            width: "120px",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3
          }
        );
      }

      // Parallax effect on scroll
      gsap.to(".hero-parallax", {
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Continuous subtle floating animation for the title
      gsap.to(".hero-word", {
        y: -3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 1,
          from: "random",
        },
        delay: 2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [showDecorativeLine]);

  return (
    <div 
      ref={containerRef} 
      className={clsx("hero-animated-title w-full", containerClass)}
    >
      {/* Decorative Line - Left Aligned */}
      {showDecorativeLine && (
        <div className="hero-parallax mb-6 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full hero-line"></div>
      )}
      
      {/* Main Title - Left Aligned */}
      <div className="mb-6">
        {title.split("<br />").map((line, index) => (
          <div
            key={index}
            className={clsx(
              "flex flex-wrap gap-1 md:gap-2 justify-start items-start w-full",
              fontClass
            )}
          >
            {line.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="hero-word inline-block"
                style={{ 
                  transformStyle: "preserve-3d",
                  display: "inline-block",
                }}
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroAnimatedTitle;