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
  const titleRef = useRef(null);

  useEffect(() => {
    // Initial Setup - Everything starts hidden
    gsap.set(coreRef.current, { scale: 0, opacity: 0, y: 20 });
    gsap.set(haloRef.current, { scale: 0.5, opacity: 0, rotation: -45 });
    gsap.set(ringRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(textRef.current, { y: 15, opacity: 0 });
    gsap.set(titleRef.current, { y: 30, opacity: 0 });

    const mainTl = gsap.timeline();

    // 1. Entrance Sequence - Zentry Style
    mainTl
      // Title first
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
      // Core Emblem with back-out
      .to(coreRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.3")
      // Halo with rotation
      .to(haloRef.current, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6")
      // Ring with pulse
      .to(ringRef.current, {
        scale: 1.1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.7")
      // Text and progress
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.3");

    // 2. Continuous Animations (Breathing & Rotating)
    // Core breathing
    gsap.to(coreRef.current, {
      y: -5,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Halo slow rotation
    gsap.to(haloRef.current, {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    // Ring subtle pulse
    gsap.to(ringRef.current, {
      scale: 1.15,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 3. Progress Bar Animation
    gsap.to(progressRef.current, {
      width: "100%",
      duration: 4.0,
      ease: "power1.inOut",
    });

    // 4. Outro - Zentry Style Square Reveal
    mainTl
      // Scale up and fade out all elements
      .to(
        [coreRef.current, haloRef.current, ringRef.current, textRef.current, titleRef.current],
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        },
        "+=1.5"
      )
      // Shrink loading screen to a square in the corner
      .to(loadingRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.01,
        ease: "power4.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

    // Cleanup
    return () => {
      mainTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#06120e] via-[#0a1a14] to-[#06120e] text-emerald-300 overflow-hidden select-none"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16,185,129,0.1) 0%, transparent 50%)',
        }} />
      </div>

      {/* Zentry-Style Title */}
      <div
        ref={titleRef}
        className="absolute top-[15%] text-center opacity-0"
      >
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-[0.3em] text-white/80 font-zentry">
          ZDSPGC
        </h1>
        <p className="text-[10px] tracking-[0.5em] text-emerald-400/60 uppercase mt-1">
          Aurora Campus
        </p>
      </div>

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

      {/* Educational Status & Progress */}
      <div ref={textRef} className="flex flex-col items-center gap-3.5 mt-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-semibold tracking-[0.25em] text-emerald-200/90 uppercase font-sans">
            Zamboanga del Sur Provincial Government College
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-52 h-1 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-800/30">
          <div
            ref={progressRef}
            className="w-0 h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_15px_#10B981]"
          />
        </div>

        {/* Loading Percentage */}
        <div className="text-[10px] font-mono text-emerald-400/40 tracking-widest">
          INITIALIZING SYSTEM...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;