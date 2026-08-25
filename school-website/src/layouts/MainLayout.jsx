import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ 
  children,
  onHomeClick,
  onCoursesClick,
  onEventsClick,
  onAboutClick,
  onContactClick,
  onAdmissionsClick,
  currentPage
}) => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar 
        onHomeClick={onHomeClick}
        onCoursesClick={onCoursesClick}
        onEventsClick={onEventsClick}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        onAdmissionsClick={onAdmissionsClick}
        currentPage={currentPage}
      />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;