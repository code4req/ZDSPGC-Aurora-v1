// Features.jsx
import { TiLocationArrow } from "react-icons/ti";
import { FaGraduationCap, FaRocket, FaAtom, FaDna, FaRunning, FaGavel, FaSeedling } from 'react-icons/fa';
import AccordionGallery from './AccordionGallery';

// Feature card for stats/info
const FeatureCard = ({ icon: Icon, label, value, description, color = "emerald" }) => {
  const colorClasses = {
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/20",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-400/20",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-400/20",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-400/20",
  };

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm border shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
          <Icon className="text-2xl text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-white/80 font-medium">{label}</p>
          <p className="text-white/60 text-xs mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Main Features component
const Features = ({ onExploreAll }) => {
  const handleExploreAll = () => {
    if (onExploreAll) onExploreAll();
  };

  const handleExploreProgram = (item) => {
    console.log('Exploring program:', item);
    if (onExploreAll) onExploreAll(item);
  };

  const programs = [
    {
      title: "BSIS",
      description: "Technology, business, and systems innovation.",
      video: "/videos/bsis.mp4",
      fallbackImage: "/img/Bsis.jpg",
      color: "#3b82f6",
      icon: FaRocket,
    },
    {
      title: "BSBIO",
      description: "Exploring life, science, and discovery.",
      video: "/videos/bsbio.mp4",
      fallbackImage: "/img/Bsbio.jpg",
      color: "#34d399",
      icon: FaDna,
    },
    {
      title: "BPED",
      description: "Shaping healthy, active, skilled individuals.",
      video: "/videos/bped.mp4",
      fallbackImage: "/img/Bped.jpg",
      color: "#fb923c",
      icon: FaRunning,
    },
    {
      title: "BSCRIM",
      description: "Justice, safety, and community service.",
      video: "/videos/bscrim.mp4",
      fallbackImage: "/img/Bscrim.jpg",
      color: "#f87171",
      icon: FaGavel,
    },
    {
      title: "BTVTED",
      description: "Technical-Vocational Teacher Education.",
      video: "/videos/btvted.mp4",
      fallbackImage: "/img/Btvted.jpg",
      color: "#a78bfa",
      icon: FaGraduationCap,
    },
    {
      title: "BSA",
      description: "Agricultural Sciences for sustainable future.",
      video: "/videos/bsa.mp4",
      fallbackImage: "/img/Bsa.jpg",
      color: "#34d399",
      icon: FaSeedling,
    },
  ];

  const stats = [
    { icon: FaGraduationCap, value: "98%", label: "Graduation Rate", description: "students succeed", color: "emerald" },
    { icon: FaRocket, value: "6", label: "Programs", description: "diverse offerings", color: "blue" },
    { icon: FaAtom, value: "1,200+", label: "Students", description: "active learners", color: "purple" },
  ];

  // Convert programs to gallery items with video support
  const galleryItems = programs.map(p => ({
    video: p.video,
    image: p.fallbackImage,
    label: p.title,
    description: p.description,
    link: '#',
    color: p.color,
    icon: p.icon,
    originalData: p
  }));

  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 bg-black">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/60">Innovation Hub</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-4">
            Academic
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Excellence
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-white/60 text-sm md:text-base">
            Discover transformative programs designed to unlock your potential 
            and shape the future of your career.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stats.map((stat, i) => (
            <FeatureCard key={i} {...stat} />
          ))}
        </div>

        {/* Gallery Section */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Our <span className="text-emerald-400">Programs</span>
            </h3>
            <p className="text-white/50 text-sm mt-1 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Hover or click to explore each program
            </p>
          </div>
          <button 
            onClick={handleExploreAll}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm hover:scale-105"
          >
            <span>View All Programs</span>
            <TiLocationArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Accordion Gallery with Videos */}
        <div className="mb-16 relative">
          {/* Gradient glow behind gallery */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 blur-2xl rounded-3xl" />
          <div className="relative">
            <AccordionGallery
              items={galleryItems}
              defaultIndex={2}
              expandRatio={0.5}
              trigger="hover"
              accentColor="#34d399"
              overlayColor="#000000"
              textColor="#ffffff"
              height={480}
              gap={12}
              radius={20}
              duration={0.7}
              parallax={0.4}
              tilt={5}
              grayscale={true}
              onExplore={handleExploreProgram}
            />
          </div>
        </div>

        {/* Programs Overview Grid - Shows all programs with icons */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {programs.map((program, index) => (
            <div
              key={index}
              onClick={() => handleExploreProgram(galleryItems[index])}
              className="group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-400/30 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:scale-105 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-emerald-500/20 transition-colors duration-300">
                  <program.icon className="text-2xl text-white/70 group-hover:text-emerald-400 transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
                  {program.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button 
            onClick={handleExploreAll}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm uppercase tracking-wider shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>Explore All Programs</span>
            <TiLocationArrow className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </section>
  );
};

export default Features;