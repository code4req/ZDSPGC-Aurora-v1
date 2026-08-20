import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to ZDSPGC Aurora
        </p>

        <AnimatedTitle
          title="Empower<b>i</b>ng Minds, <br /> Build<b>i</b>ng Futures"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>Zamboanga del Sur Provincial Government College</p>
          <p className="text-gray-500">
            Committed to providing quality education and developing future leaders 
            who will contribute to the progress of our nation.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="/img/zdspgcv.jpg"
            alt="Zamboanga del Sur Provincial Government College"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;