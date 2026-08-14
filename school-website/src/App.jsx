import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaGraduationCap } from "react-icons/fa";

// Import all components
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-white">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-green-800 via-green-700 to-emerald-800">
          <div className="text-center">
            {/* Loading Logo/Icon */}
            <div className="relative mb-8">
              <div className="text-7xl md:text-8xl font-bold text-white/10 animate-pulse">
                ZDSPGC
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/5 rounded-full animate-ping" />
                <div className="absolute w-16 h-16 bg-white/10 rounded-full animate-pulse" />
                <FaGraduationCap className="absolute text-5xl text-white/80" />
              </div>
            </div>

            {/* Main Title with Sekuya Font */}
            <h1 className="font-sekuya text-4xl md:text-6xl font-bold text-white mb-2 tracking-wider">
              ZDSPGC
            </h1>
            <h2 className="font-sekuya text-2xl md:text-4xl text-emerald-300 mb-6 tracking-wider">
              - AURORA
            </h2>

            {/* Decorative Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full mb-6" />

            {/* Loading Bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-green-300 rounded-full transition-all duration-300 animate-pulse"
                style={{ width: '100%' }}
              />
            </div>

            {/* Loading Text */}
            <p className="mt-3 text-emerald-300/80 text-sm font-medium font-general-sans">
              Loading... Please wait
            </p>

            {/* Loading Dots */}
            <div className="mt-6 flex space-x-2 justify-center">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" />
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce delay-150" />
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce delay-300" />
            </div>

            {/* Subtitle */}
            <p className="mt-6 text-white/40 text-xs uppercase tracking-[0.3em] font-general-sans">
              Zamboanga del Sur Provincial Government College
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          <NavBar />
          <Hero />
          <About />
          <Features />
          <Story />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;