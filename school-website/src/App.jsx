import { useEffect, useState } from "react";
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

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

import { supabase } from "./lib/supabase";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState("home");

  const [loadingMessage, setLoadingMessage] = useState("");

  // ============================================================
  // ADMIN
  // ============================================================

  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Controls the ADMIN LOGIN MODAL
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  /*
  ============================================================
  CHECK SUPABASE AUTH SESSION
  ============================================================
  */

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setAdminUser(session.user);
      }

      setCheckingAuth(false);
    };

    checkSession();

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAdminUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /*
  ============================================================
  PUBLIC PAGE LOADING
  ============================================================
  */

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
    navigateTo("contact", "Loading Contact");
  };

  const navigateToHome = () => {
    navigateTo("home", "Loading Home");
  };

  const navigateToAbout = () => {
    navigateTo("about", "Loading About");
  };

  const navigateToCourses = () => {
    navigateTo("courses", "Loading Courses");
  };

  const navigateToEvents = () => {
    navigateTo("events", "Loading Events");
  };

  /*
  ============================================================
  ADMIN LOGIN
  ============================================================
  */

  // Called after successful Supabase login
  const handleAdminLogin = (user) => {
    setAdminUser(user);

    // Close the modal after successful login
    setShowAdminLogin(false);
  };

  // Open login modal
  const openAdminLogin = () => {
    setShowAdminLogin(true);
  };

  // Close login modal
  const closeAdminLogin = () => {
    setShowAdminLogin(false);
  };

  /*
  ============================================================
  ADMIN LOGOUT
  ============================================================
  */

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();

    setAdminUser(null);
    setCurrentPage("home");

    window.scrollTo(0, 0);
  };

  /*
  ============================================================
  ADMIN ROUTE
  ============================================================
  */

  const isAdminPage =
    window.location.pathname === "/admin";

  /*
  ============================================================
  WAIT FOR AUTH CHECK
  ============================================================
  */

  if (checkingAuth) {
    return (
      <main className="min-h-screen w-screen bg-black flex items-center justify-center text-emerald-400">
        <div className="text-xs font-mono uppercase tracking-[0.3em] animate-pulse">
          Initializing Administration System...
        </div>
      </main>
    );
  }

  /*
  ============================================================
  ADMIN PAGE
  ============================================================
  */

  if (isAdminPage) {
    return adminUser ? (
      <AdminDashboard
        user={adminUser}
        onLogout={handleAdminLogout}
      />
    ) : (
      <AdminLogin
        onLogin={handleAdminLogin}
        onClose={() => {
          window.history.back();
        }}
      />
    );
  }

  /*
  ============================================================
  PUBLIC WEBSITE
  ============================================================
  */

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-white">

      {/* ======================================================
          INITIAL LOADING
      ====================================================== */}

      {loading && (
        <LoadingScreen
          message="Welcome to ZDSPGC"
          onComplete={handleLoadingComplete}
        />
      )}

      {/* ======================================================
          PAGE LOADING
      ====================================================== */}

      {pageLoading && (
        <LoadingScreen
          message={loadingMessage}
          onComplete={handlePageLoadingComplete}
        />
      )}

      {/* ======================================================
          PUBLIC WEBSITE
      ====================================================== */}

      {!loading && !pageLoading && (
        <>
          <NavBar
            onContactClick={navigateToContact}
            onHomeClick={navigateToHome}
            onAboutClick={navigateToAbout}
            onCoursesClick={navigateToCourses}
            onEventsClick={navigateToEvents}

            // ⭐ ADMIN LOGIN MODAL
            onAdminLoginClick={openAdminLogin}

            currentPage={currentPage}
          />

          {/* ==================================================
              HOME
          ================================================== */}

          {currentPage === "home" && (
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

          {/* ==================================================
              ABOUT
          ================================================== */}

          {currentPage === "about" && (
            <>
              <About />
              <Footer />
            </>
          )}

          {/* ==================================================
              COURSES
          ================================================== */}

          {currentPage === "courses" && (
            <>
              <Courses />
              <Footer />
            </>
          )}

          {/* ==================================================
              EVENTS
          ================================================== */}

          {currentPage === "events" && (
            <>
              <Events />
              <Footer />
            </>
          )}

          {/* ==================================================
              CONTACT
          ================================================== */}

          {currentPage === "contact" && (
            <>
              <Contact />
              <Footer />
            </>
          )}

          {/* ==================================================
              ADMIN LOGIN MODAL
          ================================================== */}

          {showAdminLogin && (
            <AdminLogin
              onLogin={handleAdminLogin}
              onClose={closeAdminLogin}
            />
          )}
        </>
      )}

    </main>
  );
}

export default App;