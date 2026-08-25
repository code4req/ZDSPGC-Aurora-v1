import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ introReady = false }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalVideos = 4;

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const zdspgcRef = useRef(null);

  // Video refs
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  // Transition refs
  const transitionLayerRef = useRef(null);
  const miniVideoRef = useRef(null);

  const schoolVideos = [
    "/videos/bsis.mp4",
    "/videos/bsbio.mp4",
    "/videos/bscrim.mp4",
    "/videos/bped.mp4",
  ];

  // =========================================================
  // GET VIDEO SOURCE
  // =========================================================

  const getVideoSrc = (index) => {
    return schoolVideos[index - 1] || schoolVideos[0];
  };

  // =========================================================
  // NEXT INDEX
  // =========================================================

  const getNextIndex = () => {
    return (currentIndex % totalVideos) + 1;
  };

  // =========================================================
  // VIDEO TRANSITION
  // =========================================================

  const changeVideo = (targetIndex = getNextIndex()) => {
    if (isTransitioning) return;

    if (targetIndex === currentIndex) return;

    setHasClicked(true);
    setIsTransitioning(true);

    const currentVideo = currentVideoRef.current;
    const nextVideo = nextVideoRef.current;
    const transitionLayer = transitionLayerRef.current;
    const miniVideo = miniVideoRef.current;

    if (!currentVideo || !nextVideo || !transitionLayer) {
      setCurrentIndex(targetIndex);
      setIsTransitioning(false);
      return;
    }

    // -------------------------------------------------------
    // Prepare next video
    // -------------------------------------------------------

    nextVideo.src = getVideoSrc(targetIndex);
    nextVideo.load();

    nextVideo.currentTime = 0;

    nextVideo
      .play()
      .catch(() => {});

    // -------------------------------------------------------
    // Prepare transition layer
    // -------------------------------------------------------

    gsap.killTweensOf([
      nextVideo,
      transitionLayer,
      miniVideo,
    ]);

    gsap.set(transitionLayer, {
      visibility: "visible",
      opacity: 1,
      clipPath: "circle(0% at 50% 50%)",
      scale: 1,
    });

    gsap.set(nextVideo, {
      scale: 1.15,
    });

    // -------------------------------------------------------
    // MINI VIDEO EXPANSION
    // -------------------------------------------------------

    if (miniVideo) {
      gsap.fromTo(
        miniVideo,
        {
          scale: 0.85,
        },
        {
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
        }
      );
    }

    // -------------------------------------------------------
    // MAIN VIDEO REVEAL
    // -------------------------------------------------------

    const tl = gsap.timeline({
      onComplete: () => {
        // ---------------------------------------------------
        // Make next video the current video
        // ---------------------------------------------------

        currentVideo.src = getVideoSrc(targetIndex);
        currentVideo.load();

        currentVideo.currentTime = 0;

        currentVideo
          .play()
          .catch(() => {});

        // Hide transition layer
        gsap.set(transitionLayer, {
          visibility: "hidden",
          clipPath: "circle(0% at 50% 50%)",
        });

        gsap.set(nextVideo, {
          scale: 1,
        });

        setCurrentIndex(targetIndex);
        setIsTransitioning(false);

        // Refresh GSAP
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 50);
      },
    });

    // -------------------------------------------------------
    // Slight zoom on current video
    // -------------------------------------------------------

    tl.to(
      currentVideo,
      {
        scale: 1.04,
        duration: 0.75,
        ease: "power2.inOut",
      },
      0
    );

    // -------------------------------------------------------
    // New video zooms outward
    // -------------------------------------------------------

    tl.to(
      nextVideo,
      {
        scale: 1,
        duration: 1,
        ease: "power3.out",
      },
      0
    );

    // -------------------------------------------------------
    // Circular reveal
    // -------------------------------------------------------

    tl.to(
      transitionLayer,
      {
        clipPath: "circle(150% at 50% 50%)",
        duration: 1.05,
        ease: "power3.inOut",
      },
      0
    );

    // -------------------------------------------------------
    // Mini video finishes slightly later
    // -------------------------------------------------------

    if (miniVideo) {
      tl.to(
        miniVideo,
        {
          scale: 0.92,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0.45
      );
    }
  };

  // =========================================================
  // MINI VIDEO CLICK
  // =========================================================

  const handleMiniVdClick = () => {
    changeVideo(getNextIndex());
  };

  // =========================================================
  // HERO ENTRANCE ANIMATION
  // =========================================================

  useEffect(() => {
    if (!introReady) return;

    const ctx = gsap.context(() => {
      const titleWords =
        titleRef.current?.querySelectorAll(".hero-word");

      const bottomWords =
        zdspgcRef.current?.querySelectorAll(".hero-word");

      // -------------------------------------------------------
      // INITIAL STATE
      // -------------------------------------------------------

      if (titleWords) {
        gsap.set(titleWords, {
          y: 80,
          opacity: 0,
          rotateX: -30,
        });
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, {
          y: 20,
          opacity: 0,
        });
      }

      if (bottomWords) {
        gsap.set(bottomWords, {
          y: 80,
          opacity: 0,
          rotateX: -30,
        });
      }

      // -------------------------------------------------------
      // TITLE
      // -------------------------------------------------------

      if (titleWords) {
        gsap.to(titleWords, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      // -------------------------------------------------------
      // SUBTITLE
      // -------------------------------------------------------

      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
        });
      }

      // -------------------------------------------------------
      // FUTURE TEXT
      // -------------------------------------------------------

      if (bottomWords) {
        gsap.to(bottomWords, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        });
      }
    });

    return () => ctx.revert();
  }, [introReady]);

  // =========================================================
  // REFRESH SCROLLTRIGGER
  // =========================================================

  useEffect(() => {
    if (!introReady) return;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(refreshTimer);
  }, [introReady]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-transparent">

      {/* =====================================================
          VIDEO FRAME
      ===================================================== */}

      <div
        id="video-frame"
        className="
          relative
          z-10
          h-dvh
          w-screen
          overflow-hidden
          bg-slate-900
        "
      >

        {/* ===================================================
            CURRENT BACKGROUND VIDEO
        =================================================== */}

        <div className="absolute inset-0 z-10">

          <video
            ref={currentVideoRef}
            src={getVideoSrc(currentIndex)}
            className="
              w-full
              h-full
              object-cover
              object-center
              scale-110
            "
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-black/40" />

        </div>

        {/* ===================================================
            NEXT VIDEO TRANSITION LAYER
        =================================================== */}

        <div
          ref={transitionLayerRef}
          className="
            absolute
            inset-0
            z-30
            overflow-hidden
            pointer-events-none
            invisible
          "
          style={{
            clipPath: "circle(0% at 50% 50%)",
          }}
        >

          <video
            ref={nextVideoRef}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
              scale-110
            "
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-black/40" />

        </div>

        {/* ===================================================
            MINI VIDEO
        =================================================== */}

        <div
          ref={miniVideoRef}
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            z-50
            size-64
            cursor-pointer
            overflow-hidden
            rounded-lg
            shadow-2xl
          "
        >

          <div
            onClick={handleMiniVdClick}
            className="
              origin-center
              scale-50
              opacity-0
              transition-all
              duration-500
              ease-in
              hover:scale-100
              hover:opacity-100
            "
          >

            <div className="relative size-64">

              <video
                src={getVideoSrc(getNextIndex())}
                className="
                  size-64
                  origin-center
                  scale-150
                  object-cover
                  object-center
                "
                autoPlay
                muted
                loop
                playsInline
              />

            </div>

          </div>

        </div>

        {/* ===================================================
            PROGRESS DOTS
        =================================================== */}

        <div
          className="
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            z-50
            flex
            gap-2
          "
        >

          {[
            "BSIS",
            "BSBIO",
            "BSCRIM",
            "BPED",
          ].map((videoName, index) => {

            const videoIndex = index + 1;

            return (
              <div
                key={videoIndex}
                className={`
                  group
                  relative
                  transition-all
                  duration-300
                  ${
                    videoIndex === currentIndex
                      ? "bg-emerald-400 w-8 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                      : "bg-white/40 hover:bg-white/60 w-2"
                  }
                  h-2
                  rounded-full
                  cursor-pointer
                `}
                onClick={() => {
                  changeVideo(videoIndex);
                }}
              >

                <span
                  className="
                    absolute
                    -top-8
                    left-1/2
                    -translate-x-1/2
                    text-white
                    text-xs
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    whitespace-nowrap
                    font-mono
                    uppercase
                    tracking-widest
                  "
                >
                  {videoName}
                </span>

              </div>
            );
          })}

        </div>

        {/* ===================================================
            TEXT OVERLAY
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            z-40
            flex
            flex-col
            justify-between
            p-4
            sm:p-6
            md:p-8
            pointer-events-none
          "
        >

          {/* TOP LEFT */}

          <div
            className="
              flex
              flex-col
              items-start
              max-w-xl
              pointer-events-auto
              mt-12
              sm:mt-13
            "
          >

            <h1
              ref={titleRef}
              style={{
                fontFamily: "'FK Screamer Black', sans-serif",
              }}
              className="
                text-6xl
                sm:text-8xl
                md:text-9xl
                lg:text-[12rem]
                font-black
                uppercase
                leading-[0.75]
                text-white
                tracking-[-0.01em]
                drop-shadow-2xl
              "
            >

              <span className="block">

                <span className="hero-word inline-block opacity-0">
                  S
                </span>

                <b className="hero-word inline-block font-black text-emerald-400 opacity-0">
                  H
                </b>

                <span className="hero-word inline-block opacity-0">
                  APE
                </span>

              </span>

            </h1>

            <p
              ref={subtitleRef}
              className="
                mt-3
                sm:mt-4
                text-white/80
                text-xs
                sm:text-sm
                md:text-base
                font-mono
                max-w-xs
                sm:max-w-sm
                leading-relaxed
                tracking-wide
                drop-shadow-md
                pl-1
                opacity-0
              "
            >
              Join a community of innovators, leaders,
              and changemakers at ZDSPGC Aurora Campus.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          FUTURE BACKGROUND SHADOW TEXT
      ===================================================== */}

      <h1
        style={{
          fontFamily: "'FK Screamer Black', sans-serif",
        }}
        className="
          text-6xl
          sm:text-8xl
          md:text-9xl
          lg:text-[12rem]
          font-black
          uppercase
          leading-[0.90]
          text-black
          absolute
          bottom-5
          right-5
          z-0
          tracking-[-0.01em]
          select-none
        "
      >

        <span className="block">

          <span>FUT</span>

          <b className="font-black text-emerald-400">
            U
          </b>

          <span>RE</span>

        </span>

      </h1>

      {/* =====================================================
          FUTURE ANIMATED TEXT
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          z-40
          flex
          flex-col
          justify-between
          p-4
          sm:p-6
          md:p-8
          pointer-events-none
        "
      >

        <div
          className="
            flex
            justify-end
            pointer-events-auto
            mb-0
            pb-0
          "
        >

          <h1
            ref={zdspgcRef}
            style={{
              fontFamily: "'FK Screamer Black', sans-serif",
            }}
            className="
              text-6xl
              sm:text-8xl
              md:text-9xl
              lg:text-[12rem]
              font-black
              uppercase
              leading-[0.90]
              text-white
              absolute
              bottom-5
              right-5
              z-40
              tracking-[-0.01em]
              drop-shadow-2xl
              select-none
            "
          >

            <span className="block">

              <span className="hero-word inline-block opacity-0">
                FUT
              </span>

              <b className="hero-word inline-block font-black text-emerald-400 opacity-0">
                U
              </b>

              <span className="hero-word inline-block opacity-0">
                RE
              </span>

            </span>

          </h1>

        </div>

      </div>

    </div>
  );
};

export default Hero;