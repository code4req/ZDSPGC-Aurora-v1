import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavBar = ({ 
  onHomeClick, 
  onCoursesClick, 
  onEventsClick, 
  onAboutClick, 
  onContactClick,
  onAdmissionsClick,
  currentPage 
}) => {
  const location = useLocation();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const navLinkRefs = useRef([]);

  const { y: currentScrollY } = useWindowScroll();

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (!audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play().catch(() => {});
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Handle scroll events for both visibility and transparency
  useEffect(() => {
    if (!navContainerRef.current) return;

    // Update scrolled state for transparency
    setIsScrolled(currentScrollY > 50);

    // Handle visibility (hide on scroll down, show on scroll up)
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
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  // Hover animation for nav links
  useEffect(() => {
    navLinkRefs.current.forEach((link, index) => {
      if (!link) return;

      const isHovered = hoveredNavItem === index;
      const isActive = location.pathname === navItems[index].path;

      if (isHovered && !isActive) {
        gsap.to(link, {
          scale: 1.1,
          color: "#34d399",
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else if (!isHovered && !isActive) {
        gsap.to(link, {
          scale: 1,
          color: "rgba(255, 255, 255, 0.7)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, [hoveredNavItem, location.pathname]);

  const handleNavClick = (item) => {
    if (item.path === location.pathname) return;

    // Call the appropriate navigation function from App
    switch(item.path) {
      case "/":
        onHomeClick?.();
        break;
      case "/courses":
        onCoursesClick?.();
        break;
      case "/events":
        onEventsClick?.();
        break;
      case "/about":
        onAboutClick?.();
        break;
      case "/contact":
        onContactClick?.();
        break;
      default:
        break;
    }
    setIsMobileMenuOpen(false);
  };

  const handleApplyNow = () => {
    onAdmissionsClick?.();
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-4 sm:inset-x-6 top-4 z-50 h-16 border-none transition-all duration-700"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav 
          className={`
            flex size-full items-center justify-between px-4 py-2 rounded-2xl 
            transition-all duration-500 border shadow-xl
            ${isScrolled 
              ? "bg-black/80 backdrop-blur-lg border-white/10" 
              : "bg-transparent backdrop-blur-none border-white/5"
            }
          `}
        >
          {/* ==================================================
              LEFT SECTION
          ================================================== */}

          <div className="flex items-center gap-4 md:gap-7">

            {/* SCHOOL BRAND */}

            <button 
              onClick={() => {
                if (location.pathname !== "/") {
                  onHomeClick?.();
                }
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              {/* SCHOOL LOGO */}
              <div className="relative flex items-center justify-center">
                <img
                  src="/img/logoschool.png"
                  alt="ZDSPGC Logo"
                  className="h-10 md:h-12 w-auto object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* SCHOOL NAME */}
              <div className="hidden sm:block">
                <h1 className={`text-base md:text-lg font-bold drop-shadow-lg tracking-wide transition-colors duration-500 ${isScrolled ? 'text-white' : 'text-white'}`}>
                  ZDSPGC
                </h1>
                <p className={`text-[10px] md:text-xs -mt-0.5 tracking-wide transition-colors duration-500 ${isScrolled ? 'text-white/70' : 'text-white/80'}`}>
                  Aurora Campus
                </p>
              </div>
            </button>

            {/* APPLY NOW - Desktop */}
            <div className="hidden md:block">
              <Button
                id="admissions-button"
                title="Apply Now"
                rightIcon={<TiLocationArrow />}
                onClick={handleApplyNow}
                containerClass={`
                  text-white flex items-center justify-center gap-2 px-5 py-2 rounded-full text-sm font-semibold 
                  transition-all duration-300 shadow-lg hover:scale-105 border-2 border-transparent hover:border-emerald-400
                  ${isScrolled 
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 hover:shadow-emerald-500/50" 
                    : "bg-emerald-500/80 backdrop-blur-sm hover:bg-emerald-500 shadow-emerald-500/30"
                  }
                `}
              />
            </div>

          </div>

          {/* ==================================================
              RIGHT SECTION
          ================================================== */}

          <div className="flex h-full items-center">

            {/* ==================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <div className="hidden md:flex items-center gap-6 lg:gap-8 tracking-wider">
              {navItems.map((item, index) => {
                const isActive = isActivePath(item.path);
                return (
                  <button
                    key={index}
                    ref={(el) => (navLinkRefs.current[index] = el)}
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => setHoveredNavItem(index)}
                    onMouseLeave={() => setHoveredNavItem(null)}
                    className={`text-xs lg:text-sm px-1 transition-colors duration-300 ${
                      isActive
                        ? "text-white font-bold underline underline-offset-8 decoration-emerald-400"
                        : `text-white/70 hover:text-white ${!isScrolled ? 'text-white/90' : ''}`
                    }`}
                    style={{
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "inline-block",
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* ==================================================
                AUDIO INDICATOR
            ================================================== */}

            <button
              type="button"
              onClick={toggleAudioIndicator}
              className="ml-6 lg:ml-10 hidden md:flex items-center space-x-0.5"
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
                  className={clsx(
                    "indicator-line bg-white",
                    {
                      active: isIndicatorActive,
                    }
                  )}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>

            {/* ==================================================
                MOBILE MENU BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`md:hidden ml-4 text-2xl transition-colors duration-500 ${isScrolled ? 'text-white' : 'text-white'}`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>

        </nav>

        {/* ======================================================
            MOBILE MENU
        ====================================================== */}

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg rounded-2xl p-4 border border-white/10 shadow-2xl">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => {
                const isActive = isActivePath(item.path);
                return (
                  <button
                    key={index}
                    onClick={() => handleNavClick(item)}
                    className={`px-5 py-3.5 rounded-lg text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 text-left ${
                      isActive
                        ? "bg-emerald-500/20 text-white font-bold border border-emerald-500/40"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}

              {/* MOBILE APPLY NOW */}
              <Button
                id="admissions-button-mobile"
                title="Apply Now"
                rightIcon={<TiLocationArrow />}
                onClick={handleApplyNow}
                containerClass="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 mt-2 tracking-wide border-2 border-transparent hover:border-emerald-400"
              />
            </div>
          </div>
        )}

      </header>
    </div>
  );
};

export default NavBar;