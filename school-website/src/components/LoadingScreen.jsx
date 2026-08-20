import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CoreEmblem, AcademicHalo } from "./AcademicEmblem";

const LoadingScreen = ({ onComplete }) => {
  const loadingRef = useRef(null);
  const coreRef = useRef(null);
  const haloRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Initial Setup
    gsap.set(coreRef.current, { scale: 0, opacity: 0, y: 20 });
    gsap.set(haloRef.current, { scale: 0.5, opacity: 0, rotation: -45 });
    gsap.set(ringRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(textRef.current, { y: 15, opacity: 0 });

    const mainTl = gsap.timeline();

    // 1. Entrance Sequence
    mainTl
      .to(coreRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.5)",
      })
      .to(
        haloRef.current,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        ringRef.current,
        {
          scale: 1.1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.7"
      )
      .to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // 2. Subtle Breathing Motion
    gsap.to(coreRef.current, {
      y: -5,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(haloRef.current, {
      rotation: 180,
      duration: 12,
      repeat: -1,
      ease: "none",
    });

    // Simulated Progress Load
    gsap.to(progressRef.current, {
      width: "100%",
      duration: 4.0,
      ease: "power1.inOut",
    });

    // 3. Smooth Outro Reveal
    mainTl
      .to(
        [coreRef.current, haloRef.current, ringRef.current, textRef.current],
        {
          scale: 0.9,
          opacity: 0,
          delay: 1.5,
          duration: 0.3,
          ease: "power2.in",
        }
      )
      .to(loadingRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.01,
        ease: "power4.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

    return () => {
      mainTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#06120e] text-emerald-300 overflow-hidden select-none pointer-events-none"
    >
      {/* Central Academic Crest Assembly */}
      <div className="relative flex items-center justify-center w-60 h-60 md:w-72 md:h-72">
        {/* Orbit Ring */}
        <div
          ref={ringRef}
          className="absolute inset-2 rounded-full border border-emerald-500/20 border-t-emerald-400/80 pointer-events-none"
        />

        {/* SVG Components */}
        <AcademicHalo ref={haloRef} />
        <CoreEmblem ref={coreRef} />
      </div>

      {/* Educational Status & Progress - Added more spacing with mt-8 */}
      <div ref={textRef} className="flex flex-col items-center gap-3.5 mt-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold tracking-[0.25em] text-emerald-200/90 uppercase font-sans">
            Zamboanga del Sur Provincial Government College Aurora 
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-52 h-1 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-800/30">
          <div
            ref={progressRef}
            className="w-0 h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_10px_#10B981]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;