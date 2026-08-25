// App.jsx

import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

// =========================================================
// LAYOUT
// =========================================================

import MainLayout from "./layouts/MainLayout";

// =========================================================
// PAGES
// =========================================================

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Admissions from "./pages/Admissions";
import StudentLifePage from "./pages/StudentLifePage";
import Enrollment from "./pages/Enrollment";

// =========================================================
// COMPONENTS
// =========================================================

import LoadingScreen from "./components/LoadingScreen";

// =========================================================
// ADMIN
// =========================================================

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

// =========================================================
// SUPABASE
// =========================================================

import { supabase } from "./lib/supabase";

// =========================================================
// GSAP
// =========================================================

gsap.registerPlugin(ScrollTrigger);

// =========================================================
// APP
// =========================================================

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// =========================================================
// APP CONTENT
// =========================================================

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // =======================================================
  // INITIAL WEBSITE LOADING
  // =======================================================

  const [loading, setLoading] = useState(true);

  /*
   * Used only for the initial Home/Hero entrance.
   */
  const [introReady, setIntroReady] = useState(false);

  // =======================================================
  // PAGE TRANSITION
  // =======================================================

  const [pageLoading, setPageLoading] = useState(false);

  const [loadingMessage, setLoadingMessage] = useState("");

  /*
   * Stores the destination while the loading screen
   * is running.
   *
   * Example:
   *
   * Current:
   * /
   *
   * Click About:
   * pendingPath = "/about"
   *
   * LoadingScreen reaches 100%
   *
   * navigate("/about")
   *
   * New page renders behind LoadingScreen
   *
   * LoadingScreen fades away
   */

  const [pendingPath, setPendingPath] = useState(null);

  // =======================================================
  // ADMIN
  // =======================================================

  const [adminUser, setAdminUser] = useState(null);

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // =========================================================
  // CHECK ADMIN AUTHENTICATION
  // =========================================================

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        // ---------------------------------------------------
        // SESSION ERROR
        // ---------------------------------------------------

        if (sessionError) {
          console.error("Session error:", sessionError);

          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }

          return;
        }

        // ---------------------------------------------------
        // NO SESSION
        // ---------------------------------------------------

        if (!session?.user) {
          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }

          return;
        }

        // ---------------------------------------------------
        // CHECK ADMIN TABLE
        // ---------------------------------------------------

        const { data: admin, error: adminError } =
          await supabase
            .from("admin_users")
            .select("id, email, role")
            .eq("id", session.user.id)
            .single();

        // ---------------------------------------------------
        // USER IS NOT ADMIN
        // ---------------------------------------------------

        if (
          adminError ||
          !admin ||
          admin.role !== "admin"
        ) {
          console.warn(
            "User is not an administrator."
          );

          await supabase.auth.signOut();

          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }

          return;
        }

        // ---------------------------------------------------
        // ADMIN AUTHENTICATED
        // ---------------------------------------------------

        if (mounted) {
          setAdminUser({
            ...session.user,
            role: admin.role,
            adminEmail: admin.email,
          });

          setCheckingAuth(false);
        }
      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        );

        if (mounted) {
          setAdminUser(null);
          setCheckingAuth(false);
        }
      }
    };

    checkSession();

    // =======================================================
    // AUTH STATE LISTENER
    // =======================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);

        // ---------------------------------------------------
        // LOGGED OUT
        // ---------------------------------------------------

        if (!session?.user) {
          if (mounted) {
            setAdminUser(null);
          }

          return;
        }

        // ---------------------------------------------------
        // CHECK ADMIN
        // ---------------------------------------------------

        const { data: admin, error: adminError } =
          await supabase
            .from("admin_users")
            .select("id, email, role")
            .eq("id", session.user.id)
            .single();

        // ---------------------------------------------------
        // NOT ADMIN
        // ---------------------------------------------------

        if (
          adminError ||
          !admin ||
          admin.role !== "admin"
        ) {
          console.warn(
            "Authenticated user is not an admin."
          );

          await supabase.auth.signOut();

          if (mounted) {
            setAdminUser(null);
          }

          return;
        }

        // ---------------------------------------------------
        // ADMIN
        // ---------------------------------------------------

        if (mounted) {
          setAdminUser({
            ...session.user,
            role: admin.role,
            adminEmail: admin.email,
          });
        }
      }
    );

    // =======================================================
    // CLEANUP
    // =======================================================

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // =========================================================
  // INITIAL LOADING COMPLETE
  // =========================================================

  const handleLoadingComplete = () => {
    /*
     * Initial LoadingScreen has finished:
     *
     * progress
     *      ↓
     * crest zoom
     *      ↓
     * circular reveal
     *      ↓
     * Home
     */

    setLoading(false);

    setIntroReady(true);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // =========================================================
  // PAGE TRANSITION NAVIGATION
  // =========================================================

  const handlePageNavigate = () => {
    /*
     * IMPORTANT:
     *
     * The LoadingScreen is still completely visible.
     *
     * We change the route NOW while the loading screen
     * is covering the website.
     *
     * Therefore the user never sees the old page
     * during the transition.
     */

    if (!pendingPath) {
      return;
    }

    const destination = pendingPath;

    // Clear pending destination
    setPendingPath(null);

    // -------------------------------------------------------
    // NAVIGATE WHILE LOADING SCREEN IS STILL VISIBLE
    // -------------------------------------------------------

    navigate(destination);

    // -------------------------------------------------------
    // SCROLL TO TOP
    // -------------------------------------------------------

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // -------------------------------------------------------
    // REFRESH GSAP AFTER NEW PAGE RENDERS
    // -------------------------------------------------------

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // =========================================================
  // PAGE TRANSITION COMPLETE
  // =========================================================

  const handlePageLoadingComplete = () => {
    /*
     * At this point:
     *
     * LoadingScreen
     *      ↓
     * New route already rendered behind it
     *      ↓
     * LoadingScreen fades out
     *      ↓
     * New page becomes visible
     */

    setPageLoading(false);
  };

  // =========================================================
  // PAGE NAVIGATION
  // =========================================================

  const navigateTo = (path, message) => {
    // Already on requested page
    if (path === location.pathname) {
      return;
    }

    // Prevent double-click navigation
    if (pageLoading) {
      return;
    }

    // Save destination
    setPendingPath(path);

    // Set loading message
    setLoadingMessage(message);

    // Show transition overlay
    setPageLoading(true);
  };

  // =========================================================
  // NAVIGATION FUNCTIONS
  // =========================================================

  const navigateToContact = () => {
    navigateTo(
      "/contact",
      "Loading Contact"
    );
  };

  const navigateToHome = () => {
    navigateTo(
      "/",
      "Loading Home"
    );
  };

  const navigateToAbout = () => {
    navigateTo(
      "/about",
      "Loading About"
    );
  };

  const navigateToCourses = () => {
    navigateTo(
      "/courses",
      "Loading Courses"
    );
  };

  const navigateToEvents = () => {
    navigateTo(
      "/events",
      "Loading Events"
    );
  };

  const navigateToAdmissions = () => {
    navigateTo(
      "/admissions",
      "Loading Admissions"
    );
  };

  const navigateToStudentLife = () => {
    navigateTo(
      "/student-life",
      "Loading Student Life"
    );
  };

  const navigateToEnrollment = () => {
    navigateTo(
      "/enrollment",
      "Loading Enrollment"
    );
  };

  // =========================================================
  // ADMIN LOGIN SUCCESS
  // =========================================================

  const handleAdminLogin = async (user) => {
    try {
      const { data: admin, error } =
        await supabase
          .from("admin_users")
          .select("id, email, role")
          .eq("id", user.id)
          .single();

      // ---------------------------------------------------
      // ADMIN VERIFICATION FAILED
      // ---------------------------------------------------

      if (
        error ||
        !admin ||
        admin.role !== "admin"
      ) {
        console.error(
          "Admin verification failed."
        );

        await supabase.auth.signOut();

        setAdminUser(null);
        setShowAdminLogin(false);

        return;
      }

      // ---------------------------------------------------
      // ADMIN VERIFIED
      // ---------------------------------------------------

      setAdminUser({
        ...user,
        role: admin.role,
        adminEmail: admin.email,
      });

      setShowAdminLogin(false);

      console.log(
        "Admin successfully authenticated."
      );
    } catch (error) {
      console.error(
        "Admin login verification error:",
        error
      );

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
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "Logout error:",
          error
        );
      }

      setAdminUser(null);
      setShowAdminLogin(false);

      navigate("/");

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      if (
        window.location.pathname === "/admin"
      ) {
        window.history.replaceState(
          {},
          "",
          "/"
        );
      }
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  // =========================================================
  // DETECT ADMIN PAGE
  // =========================================================

  const isAdminPage =
    location.pathname === "/admin";

  // =========================================================
  // AUTH CHECK LOADING
  // =========================================================

  if (checkingAuth) {
    return (
      <main
        className="
          min-h-screen
          w-screen
          bg-black
          flex
          items-center
          justify-center
          text-emerald-400
        "
      >
        <div
          className="
            text-xs
            font-mono
            uppercase
            tracking-[0.3em]
            animate-pulse
          "
        >
          Initializing Administration System...
        </div>
      </main>
    );
  }

  // =========================================================
  // ADMIN PAGE
  // =========================================================

  if (isAdminPage) {
    // -------------------------------------------------------
    // AUTHENTICATED ADMIN
    // -------------------------------------------------------

    if (adminUser) {
      return (
        <AdminDashboard
          user={adminUser}
          onLogout={handleAdminLogout}
        />
      );
    }

    // -------------------------------------------------------
    // ADMIN LOGIN
    // -------------------------------------------------------

    return (
      <AdminLogin
        onLogin={handleAdminLogin}
        onClose={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.history.replaceState(
              {},
              "",
              "/"
            );

            window.location.reload();
          }
        }}
      />
    );
  }

  // =========================================================
  // CURRENT PAGE
  // =========================================================

  const getCurrentPage = () => {
    const path =
      location.pathname.replace("/", "");

    return path || "home";
  };

  // =========================================================
  // PUBLIC WEBSITE
  // =========================================================

  return (
    <main
      className="
        relative
        min-h-screen
        w-screen
        overflow-x-hidden
      "
    >

      {/* =====================================================
          MAIN WEBSITE

          IMPORTANT:
          
          The website NEVER gets unmounted when
          pageLoading becomes true.

          This prevents:
          
          • white flash
          • home flash
          • unnecessary remount
          • layout jump
      ===================================================== */}

      {!loading && (
        <MainLayout
          onHomeClick={navigateToHome}
          onCoursesClick={navigateToCourses}
          onEventsClick={navigateToEvents}
          onAboutClick={navigateToAbout}
          onContactClick={navigateToContact}
          onAdmissionsClick={navigateToAdmissions}
          onStudentLifeClick={navigateToStudentLife}
          onEnrollmentClick={navigateToEnrollment}
          currentPage={getCurrentPage()}
        >
          <Routes>

            {/* =================================================
                HOME
            ================================================= */}

            <Route
              path="/"
              element={
                <Home
                  introReady={introReady}
                />
              }
            />

            {/* =================================================
                ABOUT
            ================================================= */}

            <Route
              path="/about"
              element={<About />}
            />

            {/* =================================================
                COURSES
            ================================================= */}

            <Route
              path="/courses"
              element={<Courses />}
            />

            {/* =================================================
                EVENTS
            ================================================= */}

            <Route
              path="/events"
              element={<Events />}
            />

            {/* =================================================
                CONTACT
            ================================================= */}

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* =================================================
                ADMISSIONS
            ================================================= */}

            <Route
              path="/admissions"
              element={<Admissions />}
            />

            {/* =================================================
                STUDENT LIFE
            ================================================= */}

            <Route
              path="/student-life"
              element={<StudentLifePage />}
            />

            {/* =================================================
                ENROLLMENT
            ================================================= */}

            <Route
              path="/enrollment"
              element={<Enrollment />}
            />

          </Routes>
        </MainLayout>
      )}

      {/* =====================================================
          INITIAL LOADING SCREEN

          INITIAL LOAD:

          Loading
              ↓
          Progress
              ↓
          Crest
              ↓
          Halo
              ↓
          Zoom
              ↓
          Circular reveal
              ↓
          Home
      ===================================================== */}

      {loading && (
        <LoadingScreen
          message="Welcome to ZDSPGC"
          onComplete={handleLoadingComplete}
        />
      )}

      {/* =====================================================
          PAGE TRANSITION

          IMPORTANT ORDER:

          Current Page
              ↓
          Loading Screen
              ↓
          Progress 100%
              ↓
          onNavigate()
              ↓
          NEW ROUTE RENDERS BEHIND LOADING SCREEN
              ↓
          Loading Screen fades
              ↓
          NEW PAGE
      ===================================================== */}

      {pageLoading && (
        <LoadingScreen
          message={loadingMessage}
          onNavigate={handlePageNavigate}
          onComplete={handlePageLoadingComplete}
        />
      )}

      {/* =====================================================
          ADMIN LOGIN MODAL
      ===================================================== */}

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={closeAdminLogin}
        />
      )}

    </main>
  );
}

export default App;