import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const zdspgcRef = useRef(null);

  const schoolVideos = [
    '/videos/bsis.mp4',
    '/videos/bsbio.mp4',
    '/videos/bscrim.mp4',
    '/videos/bped.mp4',
  ];

  const getVideoSrc = (index) => {
    return schoolVideos[index - 1] || schoolVideos[0];
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // Handle Mini-Video Click Transitions
  useEffect(() => {
    if (hasClicked) {
      const nextVideo = document.getElementById('next-video');
      const currentVideo = document.getElementById('current-video');

      if (nextVideo) {
        gsap.set(nextVideo, { visibility: 'visible' });
        gsap.to(nextVideo, {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
        });
      }

      if (currentVideo) {
        gsap.from(currentVideo, {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      }
    }
  }, [currentIndex, hasClicked]);

  // Entrance Typography Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = titleRef.current?.querySelectorAll('.hero-word');
      const bottomWords = zdspgcRef.current?.querySelectorAll('.hero-word');

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

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.6,
          }
        );
      }

      if (bottomWords) {
        gsap.fromTo(
          bottomWords,
          { y: 80, opacity: 0, rotateX: -30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.4,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-transparent">
      {/* Video Frame - Full Screen */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-slate-900"
      >
        <div>
          {/* Mini Video Preview */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 size-64 cursor-pointer overflow-hidden rounded-lg shadow-2xl">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <div className="relative size-64">
                <video
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  className="size-64 origin-center scale-150 object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                  id="current-video"
                />
              </div>
            </div>
          </div>

          {/* Next Video */}
          <div
            ref={nextVdRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible z-20 size-64 object-cover object-center"
            id="next-video"
          >
            <video
              src={getVideoSrc(currentIndex)}
              className="w-full h-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Background Video */}
          <div className="absolute left-0 top-0 size-full">
            <video
              src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
              className="w-full h-full object-cover object-center scale-110"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
          {[...Array(totalVideos)].map((_, index) => {
            const videoNames = ['BSIS', 'BSBIO', 'BSCRIM', 'BPED'];
            return (
              <div
                key={index}
                className={`group relative transition-all duration-300 ${
                  index + 1 === currentIndex
                    ? 'bg-emerald-400 w-8 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
                    : 'bg-white/40 hover:bg-white/60'
                } h-2 rounded-full cursor-pointer`}
                onClick={() => {
                  setCurrentIndex(index + 1);
                  setHasClicked(true);
                }}
              >
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono uppercase tracking-widest">
                  {videoNames[index]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 z-40 flex flex-col justify-between p-4 sm:p-6 md:p-8 pointer-events-none">
          
          {/* TOP LEFT: SHAPE + Subtitle */}
          <div className="flex flex-col items-start max-w-xl pointer-events-auto mt-12 sm:mt-13">
            <h1
              ref={titleRef}
              style={{ fontFamily: "'FK Screamer Black', sans-serif" }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black uppercase leading-[0.75] text-white tracking-[-0.01em] drop-shadow-2xl"
            >
              <span className="block">
                <span className="hero-word inline-block opacity-0">S</span>
                <b className="hero-word inline-block font-black text-emerald-400 opacity-0">H</b>
                <span className="hero-word inline-block opacity-0">APE</span>
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-3 sm:mt-4 text-white/80 text-xs sm:text-sm md:text-base font-mono max-w-xs sm:max-w-sm leading-relaxed tracking-wide drop-shadow-md pl-1 opacity-0"
            >
              Join a community of innovators, leaders, and changemakers at ZDSPGC Aurora Campus.
            </p>
          </div>

        </div>
      </div>
      
      {/* FUTURE Background Shadow Text - Behind everything */}
      <h1 
        style={{ fontFamily: "'FK Screamer Black', sans-serif" }}
        className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black uppercase leading-[0.90] text-black absolute bottom-5 right-5 z-0 tracking-[-0.01em] select-none"
      >
        <span className="block">
          <span>FUT</span>
          <b className="font-black text-emerald-400">U</b>
          <span>RE</span>
        </span>
      </h1>

      {/* FUTURE Animated Text - On top with animation */}
      <div className="absolute inset-0 z-40 flex flex-col justify-between p-4 sm:p-6 md:p-8 pointer-events-none">
        <div className="flex justify-end pointer-events-auto mb-0 pb-0">
          <h1
            ref={zdspgcRef}
            style={{ fontFamily: "'FK Screamer Black', sans-serif" }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black uppercase leading-[0.90] text-white absolute bottom-5 right-5 z-40 tracking-[-0.01em] drop-shadow-2xl select-none"
          >
            <span className="block">
              <span className="hero-word inline-block opacity-0">FUT</span>
              <b className="hero-word inline-block font-black text-emerald-400 opacity-0">U</b>
              <span className="hero-word inline-block opacity-0">RE</span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;