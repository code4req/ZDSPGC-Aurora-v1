import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["Home", "Courses", "Events", "About", "Contact"];

const NavBar = ({ 
  onContactClick, 
  onHomeClick,
  onAboutClick,
  onCoursesClick,
  onEventsClick,
  currentPage 
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const handleNavClick = (e, item) => {
    if (item === "About" && currentPage !== 'about') {
      e.preventDefault();
      onAboutClick();
      setIsMobileMenuOpen(false);
    } else if (item === "Contact" && currentPage !== 'contact') {
      e.preventDefault();
      onContactClick();
      setIsMobileMenuOpen(false);
    } else if (item === "Home" && currentPage !== 'home') {
      e.preventDefault();
      onHomeClick();
      setIsMobileMenuOpen(false);
    } else if (item === "Courses" && currentPage !== 'courses') {
      e.preventDefault();
      onCoursesClick();
      setIsMobileMenuOpen(false);
    } else if (item === "Events" && currentPage !== 'events') {
      e.preventDefault();
      onEventsClick();
      setIsMobileMenuOpen(false);
    }
  };

  // ============================================================
  // IMPROVED STYLING FUNCTIONS WITH BETTER SPACING
  // ============================================================
  
  const getLinkColor = () => 
    'text-white font-FK Screamer Black font-medium opacity-80 hover:opacity-100 transition-opacity tracking-[0.15em]';
  
  const getActiveLinkColor = () => 
    'text-white font-FK Screamer Black font-bold opacity-100 underline underline-offset-8 decoration-emerald-400 tracking-[0.15em]';
  
  const getIconColor = () => 
    'text-white drop-shadow-lg';
  
  const getTitleColor = () => 
    'text-white drop-shadow-lg font-zentry tracking-wide';
  
  const getSubtitleColor = () => 
    'text-white/80 tracking-wide';
  
  const getMenuButtonColor = () => 
    'text-white font-zentry';

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 bg-transparent rounded-2xl">
          
          {/* ===== LEFT SECTION ===== */}
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-3">
              {/* Custom Logo */}
              <div className="relative flex items-center justify-center">
                <img 
                  src="/img/logoschool.png" 
                  alt="ZDSPGC Logo" 
                  className="h-12 w-auto object-contain drop-shadow-lg"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-lg font-bold leading-tight ${getTitleColor()}`}>
                  ZDSPGC
                </h1>
                <p className={`text-xs -mt-0.5 ${getSubtitleColor()}`}>
                  Aurora Campus
                </p>
              </div>
            </div>

            <Button
              id="admissions-button"
              title="Apply Now"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-green-600 hover:bg-green-700 text-white md:flex hidden items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105 border-2 border-green-500"
            />
          </div>

          {/* ===== RIGHT SECTION ===== */}
          <div className="flex h-full items-center">
            
            {/* DESKTOP NAVIGATION - IMPROVED SPACING */}
            <div className="hidden md:flex items-center gap-12 tracking-wider">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm px-2 ${
                    currentPage === item.toLowerCase() 
                      ? getActiveLinkColor()
                      : getLinkColor()
                  }`}
                  style={{
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* AUDIO INDICATOR */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 hidden md:flex items-center space-x-0.5"
              aria-label="Toggle school bell sound"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line bg-white", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ml-4 text-2xl ${getMenuButtonColor()}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {/* ===== MOBILE MENU ===== */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-emerald-950/90 backdrop-blur-lg rounded-2xl p-4 border border-emerald-500/20 shadow-2xl">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-5 py-3.5 rounded-lg text-sm font-medium tracking-[0.08em] uppercase ${
                    currentPage === item.toLowerCase() 
                      ? 'bg-emerald-500/20 text-white font-bold border border-emerald-500/40'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </a>
              ))}
              
              <Button
                id="admissions-button-mobile"
                title="Apply Now"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 mt-2 tracking-wide"
              />
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;