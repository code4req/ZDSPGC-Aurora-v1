import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { FaGraduationCap, FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // Total number of videos available
  const nextVdRef = useRef(null);
  const videoFrameRef = useRef(null);

  // School videos - Replace these with your actual MP4 files
  const schoolVideos = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
    '/videos/video4.mp4',
  ];

  const getVideoSrc = (index) => {
    return schoolVideos[index - 1] || schoolVideos[0];
  };

  // Handle video loading
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => {
      const newCount = prev + 1;
      console.log(`Video loaded: ${newCount}/${totalVideos}`);
      return newCount;
    });
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // GSAP animation for video transition
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

  // Scroll animation for video frame
  useEffect(() => {
    const videoFrame = document.getElementById('video-frame');
    if (videoFrame) {
      gsap.set(videoFrame, {
        clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
        borderRadius: '0% 0% 40% 10%',
      });
      
      gsap.from(videoFrame, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        borderRadius: '0% 0% 0% 0%',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: videoFrame,
          start: 'center center',
          end: 'bottom center',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-transparent font-general-sans">
      {/* Video Frame */}
      <div
        id="video-frame"
        ref={videoFrameRef}
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-slate-800"
      >
        <div>
          {/* Mini Video Preview - Click to change video */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 size-64 cursor-pointer overflow-hidden rounded-lg shadow-2xl">
            <div>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                {/* Current Video Preview */}
                <div className="relative size-64">
                  <video
                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                    className="size-64 origin-center scale-150 object-cover object-center"
                    autoPlay
                    muted
                    loop
                    playsInline
                    id="current-video"
                    onLoadedData={() => {
                      console.log('Current video loaded');
                      handleVideoLoad();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Next Video (hidden, will animate in) */}
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
              onLoadedData={() => {
                console.log('Next video loaded');
                handleVideoLoad();
              }}
            />
          </div>

          {/* Background Video (always playing) */}
          <div className="absolute left-0 top-0 size-full">
            <video
              src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
              className="w-full h-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => {
                console.log('Background video loaded');
                handleVideoLoad();
              }}
              style={{ transform: 'scale(1.1)' }}
            />
            
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
          {[...Array(totalVideos)].map((_, index) => {
            const videoNames = ['Tour', 'Class', 'Sports', 'Grad', 'Life'];
            return (
              <div
                key={index}
                className={`group relative transition-all duration-300 ${
                  index + 1 === currentIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                } h-2 rounded-full cursor-pointer`}
                onClick={() => {
                  setCurrentIndex(index + 1);
                  setHasClicked(true);
                }}
              >
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-general-sans">
                  {videoNames[index]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Hero Title - ZDSPGC */}
        <h1 className="absolute bottom-5 right-5 z-40 text-white text-4xl md:text-6xl font-bold font-zentry">
          <b className="text-white/80">Z</b>DSPGC
        </h1>

        {/* Content Overlay */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/60 text-xs uppercase tracking-widest font-general-sans">
              
              </span>
            </div>
            
            {/* Main Hero Title - Using General Sans */}
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl font-hero-title">
              Shape <b className="text-white/90">Y</b>our
              <br />
              <span className="text-white drop-shadow-2xl font-hero-text">
                Future <b className="text-white/90">T</b>oday
              </span>
            </h1>

            {/* Subtitle - Using General Sans */}
            <p className="mb-5 max-w-64 text-white/90 text-sm md:text-base mt-4 leading-relaxed drop-shadow-lg font-hero-subtitle">
              Join a community of innovators, <br /> leaders, and changemakers 
              at Greenfield High.
            </p>

            {/* CTA Button */}
            <button className="group relative px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-2xl border border-white/30 font-hero-text">
              <span className="relative z-10">Explore Our School</span>
              <FaArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Stats Mini Section */}
            <div className="flex gap-8 mt-8 text-white/80 font-general-sans">
              <div>
                <p className="text-2xl font-bold text-white font-hero-title">98%</p>
                <p className="text-xs opacity-75">Graduation Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-hero-title">1200+</p>
                <p className="text-xs opacity-75">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-hero-title">50+</p>
                <p className="text-xs opacity-75">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Shadow Text */}
      <h1 className="absolute bottom-5 right-5 text-black/10 text-4xl md:text-6xl font-bold pointer-events-none font-zentry">
        <b>Z</b>DSPGC
      </h1>
    </div>
  );
};

export default Hero;