import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({
  title,
  containerClass,
  align = "center",
  fontClass = "",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform:
            "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.11,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Alignment
  const getAlignmentClass = () => {
    if (align === "left") {
      return "flex justify-start items-start text-left";
    }

    return "flex justify-center items-center text-center";
  };

  return (
    <div
      ref={containerRef}
      className={clsx("animated-title", containerClass)}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className={clsx(
            "max-w-full flex-wrap gap-2 md:gap-3 w-full",
            align === "left" ? "px-0" : "px-10",
            getAlignmentClass(),
            fontClass
          )}
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;