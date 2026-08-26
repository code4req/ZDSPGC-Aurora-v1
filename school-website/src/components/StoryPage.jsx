import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const STORY_SECTIONS = [
  {
    id: "01",
    label: "FOUNDATION & ESTABLISHMENT",
    title: "Rooted in Accessible Education",
    content: "Established by the Provincial Government of Zamboanga del Sur to provide quality, affordable, and accessible higher education to deserving students across the province."
  },
  {
    id: "02",
    label: "ACADEMIC EXCELLENCE & SKILLS",
    title: "Empowering Local Communities",
    content: "Offering tertiary programs and technical-vocational training designed to equip youth with competitive skills tailored to local and global industry demands."
  },
  {
    id: "03",
    label: "PROVINCIAL DEVELOPMENT & IMPACT",
    title: "Driving Inclusive Growth",
    content: "Fostering community extension programs, research, and leadership initiatives that directly contribute to socio-economic progress in Zamboanga del Sur."
  },
  {
    id: "04",
    label: "FUTURE VISION & EXPANSION",
    title: "Building Tomorrow's Leaders",
    content: "Continuously upgrading campus infrastructure, technology integration, and educational standards to cultivate the next generation of public servants and innovators."
  }
];

const StoryPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const targetsRef = useRef([]);
  const currentRef = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Exponential smoothing animation loop
  const runFrame = useCallback((now) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const k = 1 - Math.exp(-dt / 0.12);

    let moving = false;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = targetsRef.current[i] || 0;
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.001;
      const value = settled ? target : next;

      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    });

    if (moving) {
      rafRef.current = requestAnimationFrame(runFrame);
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  // Scroll proximity calculations
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;
    const radius = 100;
    let minDistance = Infinity;
    let closestIdx = 0;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = i;
      }

      const rawProximity = Math.max(0, 1 - distance / radius);
      const smoothFactor = rawProximity * rawProximity * (3 - 2 * rawProximity);
      targetsRef.current[i] = smoothFactor;
    });

    setActiveIndex(closestIdx);
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Helper to scroll to specific section on click
  const scrollToSection = (index) => {
    const el = itemRefs.current[index];
    const container = containerRef.current;
    if (!el || !container) return;

    const elTop = el.offsetTop;
    const elHeight = el.clientHeight;
    const containerHeight = container.clientHeight;

    container.scrollTo({
      top: elTop - containerHeight / 2 + elHeight / 2,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed inset-0 h-screen w-screen bg-black text-blue-50 font-sans px-8 pt-28 pb-10 md:px-14 md:pt-36 flex flex-col justify-between overflow-hidden z-40">
      {/* Top Header & Title Block */}
      <div className="flex-1 flex flex-col justify-start">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter uppercase text-blue-50 font-extrabold max-w-4xl">
          Our Story
        </h1>
        
        <div className="mt-6">
          <button
            onClick={() => navigate("/about")}
            className="group relative px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 overflow-hidden border border-green-400/30 text-[11px] uppercase tracking-widest"
          >
            Enter About
          </button>
        </div>
      </div>

      {/* Bottom Isolated Scrollable Container */}
      <div className="w-full shrink-0 pt-4 border-t border-white/10">
        <div
          ref={containerRef}
          className="max-w-xl max-h-[220px] overflow-y-auto space-y-6 pr-4 py-[100px] scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {STORY_SECTIONS.map((section, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={section.id}
                ref={(el) => (itemRefs.current[idx] = el)}
                onClick={() => scrollToSection(idx)}
                className="relative flex items-start gap-5 pl-4 transition-all duration-300 py-1 cursor-pointer select-none"
                style={{
                  transform: "translateX(calc(var(--effect, 0) * 16px))"
                }}
              >
                {/* Active Indicator Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-all duration-300 ${
                    isActive ? "bg-purple-400" : "bg-transparent"
                  }`}
                />

                {/* Section ID */}
                <span className="font-general text-[11px] text-purple-400/70 pt-0.5 w-5">
                  {section.id}
                </span>

                {/* Content */}
                <div className="flex-1">
                  {isActive ? (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold tracking-tight text-blue-50 leading-snug">
                        {section.title}
                      </h3>
                      <p className="text-[12px] font-circular-web text-violet-50/75 leading-relaxed max-w-md tracking-tight">
                        {section.content}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10px] font-general uppercase tracking-[0.18em] text-violet-50/40 pt-0.5 font-medium">
                      {section.label}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;