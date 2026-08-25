// App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Admissions from "./pages/Admissions";
import StudentLifePage from "./pages/StudentLifePage";
import Enrollment from "./pages/Enrollment"; // Add this import

// Components
import LoadingScreen from "./components/LoadingScreen";

// Admin components
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

// Supabase
import { supabase } from "./lib/supabase";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

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

        if (sessionError) {
          console.error("Session error:", sessionError);
          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }
          return;
        }

        if (!session?.user) {
          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }
          return;
        }

        const { data: admin, error: adminError } = await supabase
          .from("admin_users")
          .select("id, email, role")
          .eq("id", session.user.id)
          .single();

        if (adminError || !admin || admin.role !== "admin") {
          console.warn("User is not an administrator.");
          await supabase.auth.signOut();
          if (mounted) {
            setAdminUser(null);
            setCheckingAuth(false);
          }
          return;
        }

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);

      if (!session?.user) {
        if (mounted) setAdminUser(null);
        return;
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("id, email, role")
        .eq("id", session.user.id)
        .single();

      if (adminError || !admin || admin.role !== "admin") {
        console.warn("Authenticated user is not an admin.");
        await supabase.auth.signOut();
        if (mounted) setAdminUser(null);
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
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // =========================================================
  // PAGE NAVIGATION
  // =========================================================

  const navigateTo = (path, message) => {
    if (path === location.pathname) return;
    
    setPageLoading(true);
    setLoadingMessage(message);

    setTimeout(() => {
      navigate(path);
      handlePageLoadingComplete();
    }, 3500);
  };

  // Navigation functions
  const navigateToContact = () => navigateTo("/contact", "Loading Contact");
  const navigateToHome = () => navigateTo("/", "Loading Home");
  const navigateToAbout = () => navigateTo("/about", "Loading About");
  const navigateToCourses = () => navigateTo("/courses", "Loading Courses");
  const navigateToEvents = () => navigateTo("/events", "Loading Events");
  const navigateToAdmissions = () => navigateTo("/admissions", "Loading Admissions");
  const navigateToStudentLife = () => navigateTo("/student-life", "Loading Student Life");
  const navigateToEnrollment = () => navigateTo("/enrollment", "Loading Enrollment"); // Add this

  // =========================================================
  // ADMIN LOGIN SUCCESS
  // =========================================================

  const handleAdminLogin = async (user) => {
    try {
      const { data: admin, error } = await supabase
        .from("admin_users")
        .select("id, email, role")
        .eq("id", user.id)
        .single();

      if (error || !admin || admin.role !== "admin") {
        console.error("Admin verification failed.");
        await supabase.auth.signOut();
        setAdminUser(null);
        setShowAdminLogin(false);
        return;
      }

      setAdminUser({
        ...user,
        role: admin.role,
        adminEmail: admin.email,
      });

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

  const openAdminLogin = () => setShowAdminLogin(true);
  const closeAdminLogin = () => setShowAdminLogin(false);

  // =========================================================
  // ADMIN LOGOUT
  // =========================================================

  const handleAdminLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error("Logout error:", error);

      setAdminUser(null);
      setShowAdminLogin(false);
      navigate("/");
      window.scrollTo(0, 0);

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

  const isAdminPage = location.pathname === "/admin";

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
    if (adminUser) {
      return (
        <AdminDashboard
          user={adminUser}
          onLogout={handleAdminLogout}
        />
      );
    }

    return (
      <AdminLogin
        onLogin={handleAdminLogin}
        onClose={() => {
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
  // GET CURRENT PAGE FOR NAVBAR
  // =========================================================

  const getCurrentPage = () => {
    const path = location.pathname.replace("/", "");
    return path || "home";
  };

  // =========================================================
  // PUBLIC WEBSITE
  // =========================================================

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
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
        <MainLayout
          onHomeClick={navigateToHome}
          onCoursesClick={navigateToCourses}
          onEventsClick={navigateToEvents}
          onAboutClick={navigateToAbout}
          onContactClick={navigateToContact}
          onAdmissionsClick={navigateToAdmissions}
          onStudentLifeClick={navigateToStudentLife}
          onEnrollmentClick={navigateToEnrollment} // Add this
          currentPage={getCurrentPage()}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/student-life" element={<StudentLifePage />} />
            <Route path="/enrollment" element={<Enrollment />} /> {/* Add this route */}
          </Routes>
        </MainLayout>
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