import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

// Import all components
import Welcome from "./components/Welcome";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import Events from "./components/Events";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handlePageLoadingComplete = () => {
    setPageLoading(false);
    window.scrollTo(0, 0);
  };

  const navigateTo = (page, message) => {
    setPageLoading(true);
    setLoadingMessage(message);
    
    setTimeout(() => {
      setCurrentPage(page);
      handlePageLoadingComplete();
    }, 3500);
  };

  const navigateToContact = () => {
    navigateTo('contact', "Loading Contact");
  };

  const navigateToHome = () => {
    navigateTo('home', "Loading Home");
  };

  const navigateToAbout = () => {
    navigateTo('about', "Loading About");
  };

  const navigateToCourses = () => {
    navigateTo('courses', "Loading Courses");
  };

  const navigateToEvents = () => {
    navigateTo('events', "Loading Events");
  };

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-white">
      {loading && (
        <LoadingScreen 
          message="Welcome to ZDSPGC"
          onComplete={handleLoadingComplete}
        />
      )}

      {pageLoading && (
        <LoadingScreen 
          message={loadingMessage}
          onComplete={handlePageLoadingComplete}
        />
      )}

      {!loading && !pageLoading && (
        <>
          <NavBar 
            onContactClick={navigateToContact}
            onHomeClick={navigateToHome}
            onAboutClick={navigateToAbout}
            onCoursesClick={navigateToCourses}
            onEventsClick={navigateToEvents}
            currentPage={currentPage}
          />
          
          {currentPage === 'home' && (
            <>
              <Hero />
              <div className="bg-white">
                <Welcome />
                <Features />
                <Story />
              </div>
              <Footer />
            </>
          )}
          
          {currentPage === 'about' && (
            <>
              <About />
              <Footer />
            </>
          )}
          
          {currentPage === 'courses' && (
            <>
              <Courses />
              <Footer />
            </>
          )}
          
          {currentPage === 'events' && (
            <>
              <Events />
              <Footer />
            </>
          )}
          
          {currentPage === 'contact' && (
            <>
              <Contact />
              <Footer />
            </>
          )}
        </>
      )}
    </main>
  );
}

export default App;