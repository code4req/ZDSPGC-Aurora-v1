// App.jsx
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

// Public website components
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

// Admin components
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

// Supabase
import { supabase } from "./lib/supabase";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // =========================================================
  // PUBLIC WEBSITE STATE
  // =========================================================

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState("home");

  const [loadingMessage, setLoadingMessage] = useState("");

  // =========================================================
  // ADMIN STATE
  // =========================================================

  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Admin login modal from Navbar
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // =========================================================
  // CHECK ADMIN AUTHENTICATION
  // =========================================================

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        // Get current Supabase session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);

          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }

          return;
        }

        // No logged-in user
        if (!session?.user) {
          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }

          return;
        }

        // =====================================================
        // CHECK IF USER IS AN ADMIN
        // =====================================================

        const { data: admin, error: adminError } = await supabase
          .from("admin_users")
          .select("id, email, role")
          .eq("id", session.user.id)
          .single();

        // User is not registered as admin
        if (
          adminError ||
          !admin ||
          admin.role !== "admin"
        ) {
          console.warn("User is not an administrator.");

          await supabase.auth.signOut();

          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }

          return;
        }

        // =====================================================
        // ADMIN VERIFIED
        // =====================================================

        if (mounted) {
          setAdminUser({
            ...session.user,
            role: admin.role,
            adminEmail: admin.email,
          });

          setCheckingAuth(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        if (mounted) {
          setAdminUser(null);
          setCheckingAuth(false);
        }
      }
    };

    checkSession();

    // =========================================================
    // LISTEN FOR LOGIN / LOGOUT CHANGES
    // =========================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);

      // User logged out
      if (!session?.user) {
        if (mounted) {
          setAdminUser(null);
        }

        return;
      }

      // =======================================================
      // VERIFY ADMIN AGAIN AFTER LOGIN
      // =======================================================

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("id, email, role")
        .eq("id", session.user.id)
        .single();

      if (
        adminError ||
        !admin ||
        admin.role !== "admin"
      ) {
        console.warn("Authenticated user is not an admin.");

        await supabase.auth.signOut();

        if (mounted) {
          setAdminUser(null);
        }

        return;
      }

      if (mounted) {
        setAdminUser({
          ...session.user,
          role: admin.role,
          adminEmail: admin.email,
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // =========================================================
  // PUBLIC WEBSITE LOADING
  // =========================================================

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handlePageLoadingComplete = () => {
    setPageLoading(false);
    window.scrollTo(0, 0);
  };

  // =========================================================
  // PAGE NAVIGATION
  // =========================================================

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

  // =========================================================
  // ADMIN LOGIN SUCCESS
  // =========================================================

  const handleAdminLogin = async (user) => {
    /*
      AdminLogin should already verify the user against
      the admin_users table.

      We still verify here as an additional protection.
    */

    try {
      const { data: admin, error } = await supabase
        .from("admin_users")
        .select("id, email, role")
        .eq("id", user.id)
        .single();

      if (
        error ||
        !admin ||
        admin.role !== "admin"
      ) {
        console.error("Admin verification failed.");

        await supabase.auth.signOut();

        setAdminUser(null);
        setShowAdminLogin(false);

        return;
      }

      // Save verified admin
      setAdminUser({
        ...user,
        role: admin.role,
        adminEmail: admin.email,
      });

      // Close login modal
      setShowAdminLogin(false);

      console.log("Admin successfully authenticated.");
    } catch (error) {
      console.error("Admin login verification error:", error);

      await supabase.auth.signOut();

      setAdminUser(null);
      setShowAdminLogin(false);
    }
  };

  // =========================================================
  // ADMIN LOGIN MODAL
  // =========================================================

  const openAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const closeAdminLogin = () => {
    setShowAdminLogin(false);
  };

  // =========================================================
  // ADMIN LOGOUT
  // =========================================================

  const handleAdminLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
      }

      setAdminUser(null);
      setShowAdminLogin(false);

      // Return to home
      setCurrentPage("home");

      window.scrollTo(0, 0);

      // If currently on /admin, return to main website
      if (window.location.pathname === "/admin") {
        window.history.replaceState({}, "", "/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // =========================================================
  // DETECT ADMIN PAGE
  // =========================================================

  const isAdminPage =
    window.location.pathname === "/admin";

  // =========================================================
  // AUTH CHECK LOADING SCREEN
  // =========================================================

  if (checkingAuth) {
    return (
      <main className="min-h-screen w-screen bg-black flex items-center justify-center text-emerald-400">
        <div className="text-xs font-mono uppercase tracking-[0.3em] animate-pulse">
          Initializing Administration System...
        </div>
      </main>
    );
  }

  // =========================================================
  // ADMIN PAGE
  // =========================================================

  if (isAdminPage) {
    // ---------------------------------------------------------
    // VERIFIED ADMIN
    // ---------------------------------------------------------

    if (adminUser) {
      return (
        <AdminDashboard
          user={adminUser}
          onLogout={handleAdminLogout}
        />
      );
    }

    // ---------------------------------------------------------
    // NOT LOGGED IN
    // ---------------------------------------------------------

    return (
      <AdminLogin
        onLogin={handleAdminLogin}
        onClose={() => {
          // Return to previous page if possible
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.history.replaceState({}, "", "/");
            window.location.reload();
          }
        }}
      />
    );
  }

  // =========================================================
  // PUBLIC WEBSITE
  // =========================================================

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-white">

      {/* =====================================================
          INITIAL WEBSITE LOADING
      ===================================================== */}

      {loading && (
        <LoadingScreen
          message="Welcome to ZDSPGC"
          onComplete={handleLoadingComplete}
        />
      )}

      {/* =====================================================
          PAGE TRANSITION LOADING
      ===================================================== */}

      {pageLoading && (
        <LoadingScreen
          message={loadingMessage}
          onComplete={handlePageLoadingComplete}
        />
      )}

      {/* =====================================================
          MAIN WEBSITE CONTENT
      ===================================================== */}

      {!loading && !pageLoading && (
        <>
          {/* =================================================
              NAVBAR
          ================================================= */}

          <NavBar
            onContactClick={navigateToContact}
            onHomeClick={navigateToHome}
            onAboutClick={navigateToAbout}
            onCoursesClick={navigateToCourses}
            onEventsClick={navigateToEvents}

            onAdminLoginClick={openAdminLogin}

            currentPage={currentPage}
          />

          {/* =================================================
              HOME
          ================================================= */}

          {currentPage === "home" && (
            <>
              <Hero />

              <div className="bg-white">
                <Welcome />

                <Features
                  onExploreAll={navigateToCourses}
                />

                <Story
                  onNavigate={navigateToAbout}
                />
              </div>

              <Footer />
            </>
          )}

          {/* =================================================
              ABOUT
          ================================================= */}

          {currentPage === "about" && (
            <>
              <About />
              <Footer />
            </>
          )}

          {/* =================================================
              COURSES
          ================================================= */}

          {currentPage === "courses" && (
            <>
              <Courses />
              <Footer />
            </>
          )}

          {/* =================================================
              EVENTS
          ================================================= */}

          {currentPage === "events" && (
            <>
              <Events />
              <Footer />
            </>
          )}

          {/* =================================================
              CONTACT
          ================================================= */}

          {currentPage === "contact" && (
            <>
              <Contact />
              <Footer />
            </>
          )}

          {/* =================================================
              ADMIN LOGIN MODAL
          ================================================= */}

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