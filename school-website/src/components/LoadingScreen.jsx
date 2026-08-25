import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CoreEmblem, AcademicHalo } from "./AcademicEmblem";

const LoadingScreen = ({
  onComplete,
  onNavigate,
  message = "Welcome to ZDSPGC",
}) => {
  // =========================================================
  // REFS
  // =========================================================

  const loadingRef = useRef(null);

  const transitionGlowRef = useRef(null);

  const coreRef = useRef(null);
  const haloRef = useRef(null);
  const ringRef = useRef(null);

  const textRef = useRef(null);
  const progressRef = useRef(null);

  // =========================================================
  // CALLBACK REFS
  // =========================================================

  /*
   * Keep callbacks in refs so GSAP does not restart
   * the entire animation every time App.jsx re-renders.
   */

  const onCompleteRef = useRef(onComplete);
  const onNavigateRef = useRef(onNavigate);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  // =========================================================
  // DETECT PAGE TRANSITION
  // =========================================================

  const isPageTransition =
    message && message !== "Welcome to ZDSPGC";

  // =========================================================
  // ANIMATION
  // =========================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =====================================================
      // INITIAL STATES
      // =====================================================

      gsap.set(loadingRef.current, {
        opacity: 1,
        scale: 1,
        clipPath: "circle(100% at 50% 50%)",
        display: "flex",
      });

      gsap.set(transitionGlowRef.current, {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
      });

      // =====================================================
      // CREST
      // =====================================================

      gsap.set(coreRef.current, {
        scale: 0,
        opacity: 0,
        y: 20,
        transformOrigin: "center center",
      });

      // =====================================================
      // HALO
      // =====================================================

      gsap.set(haloRef.current, {
        scale: 0.5,
        opacity: 0,
        rotation: -45,
        transformOrigin: "50% 50%",
      });

      // =====================================================
      // RING
      // =====================================================

      gsap.set(ringRef.current, {
        scale: 0.8,
        opacity: 0,
        transformOrigin: "center center",
      });

      // =====================================================
      // TEXT
      // =====================================================

      gsap.set(textRef.current, {
        y: 15,
        opacity: 0,
      });

      // =====================================================
      // PROGRESS
      // =====================================================

      gsap.set(progressRef.current, {
        width: "0%",
      });

      // =====================================================
      // MAIN TIMELINE
      // =====================================================

      const tl = gsap.timeline();

      // =====================================================
      // 1. CREST ENTRANCE
      // =====================================================

      tl.to(coreRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // =====================================================
      // 2. HALO ENTRANCE
      // =====================================================

      tl.to(
        haloRef.current,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // =====================================================
      // 3. RING ENTRANCE
      // =====================================================

      tl.to(
        ringRef.current,
        {
          scale: 1.1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.7"
      );

      // =====================================================
      // 4. TEXT
      // =====================================================

      tl.to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // =====================================================
      // CONTINUOUS ANIMATIONS
      // =====================================================

      const breathingTween = gsap.to(coreRef.current, {
        y: -5,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const haloTween = gsap.to(haloRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none",
      });

      const ringTween = gsap.to(ringRef.current, {
        scale: 1.15,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // =====================================================
      // 5. PROGRESS
      // =====================================================

      tl.to(progressRef.current, {
        width: "100%",
        duration: isPageTransition ? 1.5 : 2,
        ease: "power1.inOut",
      });

      // =====================================================
      // 6. HOLD
      // =====================================================

      tl.to({}, {
        duration: 0.35,
      });

      // =====================================================
      // STOP CONTINUOUS ANIMATIONS
      // =====================================================

      tl.call(() => {
        breathingTween.kill();
        haloTween.kill();
        ringTween.kill();
      });

      // =====================================================
      // PAGE TRANSITION MODE
      // =====================================================

      if (isPageTransition) {
        // ===================================================
        // IMPORTANT:
        //
        // NAVIGATE WHILE LOADING SCREEN IS STILL FULLY VISIBLE
        // ===================================================

        tl.call(() => {
          if (onNavigateRef.current) {
            onNavigateRef.current();
          }
        });

        // ===================================================
        // WAIT FOR NEW PAGE TO RENDER
        // ===================================================

        tl.to({}, {
          duration: 0.25,
        });

        // ===================================================
        // FADE TEXT
        // ===================================================

        tl.to(textRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.25,
          ease: "power2.in",
        });

        // ===================================================
        // FADE CREST
        // ===================================================

        tl.to(
          [
            coreRef.current,
            haloRef.current,
            ringRef.current,
          ],
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "<"
        );

        // ===================================================
        // FADE LOADING SCREEN
        // ===================================================

        tl.to(loadingRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        });

        // ===================================================
        // REMOVE LOADING SCREEN
        // ===================================================

        tl.set(loadingRef.current, {
          display: "none",
        });

        // ===================================================
        // COMPLETE
        // ===================================================

        tl.call(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        });

        return;
      }

      // =====================================================
      // INITIAL LOADING MODE
      // =====================================================

      // =====================================================
      // 7. HIDE TEXT
      // =====================================================

      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: "power2.in",
      });

      // =====================================================
      // 8. RING PREPARE
      // =====================================================

      tl.to(
        ringRef.current,
        {
          opacity: 0,
          scale: 1.3,
          duration: 0.35,
          ease: "power2.in",
        },
        "<"
      );

      // =====================================================
      // 9. CREST ZOOM
      // =====================================================

      tl.to(coreRef.current, {
        scale: 1.45,
        duration: 0.5,
        ease: "power3.in",
      });

      // =====================================================
      // 10. HALO ZOOM
      // =====================================================

      tl.to(
        haloRef.current,
        {
          scale: 1.45,
          rotation: "+=120",
          duration: 0.5,
          ease: "power3.in",
        },
        "<"
      );

      // =====================================================
      // 11. CENTER GLOW
      // =====================================================

      tl.to(
        transitionGlowRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        "<"
      );

      // =====================================================
      // 12. CLIP PATH
      // =====================================================

      tl.to(
        loadingRef.current,
        {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1.35,
          ease: "power4.inOut",
        },
        "-=0.15"
      );

      // =====================================================
      // 13. CREST EXPANSION
      // =====================================================

      tl.to(
        coreRef.current,
        {
          scale: 8,
          opacity: 0,
          duration: 1.35,
          ease: "power4.in",
        },
        "<"
      );

      // =====================================================
      // 14. HALO EXPANSION
      // =====================================================

      tl.to(
        haloRef.current,
        {
          scale: 8,
          opacity: 0,
          rotation: "+=240",
          duration: 1.35,
          ease: "power4.in",
        },
        "<"
      );

      // =====================================================
      // 15. GLOW EXPANSION
      // =====================================================

      tl.to(
        transitionGlowRef.current,
        {
          scale: 8,
          opacity: 0,
          duration: 1.2,
          ease: "power4.in",
        },
        "<"
      );

      // =====================================================
      // 16. REMOVE
      // =====================================================

      tl.set(loadingRef.current, {
        display: "none",
      });

      // =====================================================
      // 17. COMPLETE
      // =====================================================

      tl.call(() => {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      });
    }, loadingRef);

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      ctx.revert();

      gsap.killTweensOf([
        loadingRef.current,
        transitionGlowRef.current,
        coreRef.current,
        haloRef.current,
        ringRef.current,
        textRef.current,
        progressRef.current,
      ]);
    };
  }, [isPageTransition]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      ref={loadingRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        flex-col
        items-center
        justify-center
        bg-gradient-to-br
        from-[#06120e]
        via-[#0a1a14]
        to-[#06120e]
        text-emerald-300
        overflow-hidden
        select-none
      "
      style={{
        clipPath: "circle(100% at 50% 50%)",
        transformOrigin: "50% 50%",
      }}
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* =====================================================
          CENTER GLOW
      ===================================================== */}

      <div
        ref={transitionGlowRef}
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-40
          h-40
          rounded-full
          bg-emerald-400/20
          blur-3xl
          pointer-events-none
        "
      />

      {/* =====================================================
          CENTER CREST
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          flex
          items-center
          justify-center
          w-60
          h-60
          md:w-72
          md:h-72
        "
      >

        {/* RING */}

        <div
          ref={ringRef}
          className="
            absolute
            inset-2
            rounded-full
            border
            border-emerald-500/20
            border-t-emerald-400/80
            pointer-events-none
          "
        />

        {/* HALO */}

        <AcademicHalo ref={haloRef} />

        {/* CREST */}

        <CoreEmblem ref={coreRef} />

      </div>

      {/* =====================================================
          BOTTOM STATUS
      ===================================================== */}

      <div
        ref={textRef}
        className="
          absolute
          left-1/2
          bottom-[7%]
          -translate-x-1/2
          flex
          flex-col
          items-center
          gap-3.5
          text-center
          whitespace-nowrap
        "
      >

        <div className="flex items-center justify-center gap-2">

          <span
            className="
              w-1.5
              h-1.5
              rounded-full
              bg-emerald-400
              animate-ping
            "
          />

          <span
            className="
              text-[9px]
              sm:text-[10px]
              font-semibold
              tracking-[0.25em]
              text-emerald-200/90
              uppercase
              font-sans
            "
          >
            Zamboanga del Sur Provincial Government College
          </span>

        </div>

        {/* PROGRESS */}

        <div
          className="
            w-52
            h-1
            bg-emerald-950/80
            rounded-full
            overflow-hidden
            border
            border-emerald-800/30
          "
        >
          <div
            ref={progressRef}
            className="
              w-0
              h-full
              bg-gradient-to-r
              from-emerald-500
              via-teal-400
              to-emerald-300
              shadow-[0_0_15px_#10B981]
            "
          />
        </div>

        {/* STATUS */}

        <div
          className="
            text-[10px]
            font-mono
            text-emerald-400/40
            tracking-widest
          "
        >
          {isPageTransition
            ? message.toUpperCase()
            : "INITIALIZING SYSTEM..."}
        </div>

      </div>

      {/* =====================================================
          CORNER MARKS
      ===================================================== */}

      <div className="
        absolute
        top-6
        left-6
        w-8
        h-8
        border-l
        border-t
        border-emerald-400/10
      " />

      <div className="
        absolute
        top-6
        right-6
        w-8
        h-8
        border-r
        border-t
        border-emerald-400/10
      " />

      <div className="
        absolute
        bottom-6
        left-6
        w-8
        h-8
        border-l
        border-b
        border-emerald-400/10
      " />

      <div className="
        absolute
        bottom-6
        right-6
        w-8
        h-8
        border-r
        border-b
        border-emerald-400/10
      " />

    </div>
  );
};

export default LoadingScreen;