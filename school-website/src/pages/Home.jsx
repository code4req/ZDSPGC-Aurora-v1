import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

// Home Page Sections
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Features from "../components/Features";
import Story from "../components/Story";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ introReady = false }) => {
  // =========================================================
  // PAGE INITIALIZATION
  // =========================================================

  useEffect(() => {
    if (!introReady) return;

    // Make sure ScrollTrigger recalculates
    // after the Hero transition has completed.
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    window.scrollTo(0, 0);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [introReady]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <Hero introReady={introReady} />

      {/* =====================================================
          HOME SECTIONS
          ===================================================== */}

      <Welcome />

      <Features />

      <Story />
    </>
  );
};

export default Home;