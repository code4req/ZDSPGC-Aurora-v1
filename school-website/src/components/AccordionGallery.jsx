// AccordionGallery.jsx
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { TiLocationArrow } from 'react-icons/ti';

import './Gallery/AccordionGallery.css';

const DEFAULT_ITEMS = [
  { 
    video: '/videos/bsis.mp4',
    image: '/img/Bsis.jpg', // fallback image
    label: 'BSIS', 
    link: '#',
    description: 'Technology, business, and systems innovation.'
  },
  { 
    video: '/videos/bsbio.mp4',
    image: '/img/Bsbio.jpg', // fallback image
    label: 'BSBIO', 
    link: '#',
    description: 'Exploring life, science, and discovery.'
  },
  { 
    video: '/videos/bped.mp4',
    image: '/img/Bped.jpg', // fallback image
    label: 'BPED', 
    link: '#',
    description: 'Shaping healthy, active, skilled individuals.'
  },
  { 
    video: '/videos/bscrim.mp4',
    image: '/img/Bscrim.jpg', // fallback image
    label: 'BSCRIM', 
    link: '#',
    description: 'Justice, safety, and community service.'
  },
  { 
    video: '/videos/btvted.mp4',
    image: '/img/Btvted.jpg', // fallback image
    label: 'BTVTED', 
    link: '#',
    description: 'Technical-Vocational Teacher Education.'
  },
  { 
    video: '/videos/bsa.mp4',
    image: '/img/Bsa.jpg', // fallback image
    label: 'BSA', 
    link: '#',
    description: 'Agricultural Sciences for sustainable future.'
  }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#34d399',
  overlayColor = '#000000',
  textColor = '#ffffff',
  height = 480,
  gap = 12,
  radius = 20,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.7,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 6,
  stagger = 0.08,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  onExplore
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const videoRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const descRefs = useRef([]);
  const buttonRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Handle video playback based on active state
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [active]);

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];
        const desc = descRefs.current[i];
        const button = buttonRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { 
          flexGrow: isActive ? grow : 1, 
          ...rotProp, 
          duration: dur, 
          ease 
        }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 0.8) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.5,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels) {
          if (isActive) {
            const elements = [bar, text, desc, button].filter(el => el);
            tl.to(
              elements, 
              { 
                opacity: 1, 
                x: 0, 
                duration: dur, 
                ease, 
                stagger: prefersReduced ? 0 : stagger 
              }, 
              0
            );
          } else {
            const elements = [bar, text, desc, button].filter(el => el);
            tl.to(
              elements, 
              { 
                opacity: 0, 
                x: -20, 
                duration: dur * 0.5, 
                ease 
              }, 
              0
            );
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
      videoRefs.current.forEach(video => {
        if (video) video.pause();
      });
    },
    []
  );

  const handleEnter = i => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  const handleExplore = (item, e) => {
    e.stopPropagation();
    if (onExplore) onExplore(item);
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      }}
      role="list"
      aria-label="Video accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = item.link ? 'a' : 'div';
        return (
          <Tag
            key={i}
            ref={el => (panelRefs.current[i] = el)}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ 
              borderRadius: `${radius}px`,
              background: 'linear-gradient(135deg, rgba(16, 16, 24, 0.95), rgba(8, 8, 16, 0.98))'
            }}
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={el => (mediaRefs.current[i] = el)}>
                {/* Video element */}
                <video
                  ref={el => (videoRefs.current[i] = el)}
                  src={item.video}
                  loop
                  muted
                  playsInline
                  poster={item.image}
                  className="ag-panel__video"
                  draggable="false"
                />
                {/* Fallback image if video fails */}
                <img 
                  src={item.image} 
                  alt={item.alt || item.label || ''} 
                  draggable="false"
                  className="ag-panel__fallback-image"
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
              
              {/* Decorative glass border overlay */}
              <span className="ag-panel__glass-border" aria-hidden="true" />
            </span>
            
            {showLabels && (
              <span className="ag-panel__content" aria-hidden="true">
                <div className="ag-panel__label-wrapper">
                  <span className="ag-panel__bar" ref={el => (barRefs.current[i] = el)} />
                  <div className="ag-panel__text-group">
                    <span className="ag-panel__text" ref={el => (textRefs.current[i] = el)}>
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="ag-panel__description" ref={el => (descRefs.current[i] = el)}>
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  ref={el => (buttonRefs.current[i] = el)}
                  className="ag-panel__explore-btn"
                  onClick={(e) => handleExplore(item, e)}
                  aria-label={`Explore ${item.label}`}
                >
                  <span>Explore</span>
                  <TiLocationArrow className="ag-panel__btn-icon" />
                </button>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;