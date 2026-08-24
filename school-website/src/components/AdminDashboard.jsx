import { useState } from "react";
import {
  FaCalendarAlt,
  FaSignOutAlt,
  FaPlus,
  FaHome,
  FaTimes,
  FaImage,
  FaMapMarkerAlt,
  FaClock,
  FaInfoCircle,
  FaUsers,
} from "react-icons/fa";

import { supabase } from "../lib/supabase";

const AdminDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  // Form state - updated to match your schema
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    image_url: "",
    category: "",
    attendees: "",
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      // Validate required fields
      if (!eventData.title || !eventData.event_date || !eventData.location) {
        throw new Error("Please fill in all required fields (Title, Date, Location)");
      }

      // Prepare data for insertion - only include fields that exist in your schema
      const insertData = {
        title: eventData.title,
        description: eventData.description || null,
        event_date: eventData.event_date,
        location: eventData.location,
        image_url: eventData.image_url || null,
        category: eventData.category || null,
        attendees: eventData.attendees ? parseInt(eventData.attendees) : null,
        created_at: new Date().toISOString(),
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from("events")
        .insert([insertData])
        .select();

      if (error) throw error;

      setFormStatus({
        type: "success",
        message: "✅ Event created successfully!",
      });

      // Reset form
      setEventData({
        title: "",
        description: "",
        event_date: "",
        location: "",
        image_url: "",
        category: "",
        attendees: "",
      });

    } catch (error) {
      setFormStatus({
        type: "error",
        message: `❌ ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setEventData({
      title: "",
      description: "",
      event_date: "",
      location: "",
      image_url: "",
      category: "",
      attendees: "",
    });
    setFormStatus({ type: "", message: "" });
  };

  return (
    <main className="min-h-screen w-screen bg-zinc-950 text-white">

      {/* TOP NAVBAR */}

      <header className="border-b border-emerald-500/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              ZDSPGC
            </p>

            <h1 className="text-xl font-black uppercase">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-red-500/20 px-5 py-2.5 text-xs uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </header>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome */}

        <div className="mb-10">

          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            Administration
          </p>

          <h2 className="text-4xl md:text-5xl font-black uppercase">
            Welcome, Admin
          </h2>

          <p className="text-sm text-emerald-100/50 mt-2">
            {user?.email}
          </p>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Events */}

          <button
            onClick={() => setActiveSection("events")}
            className="text-left rounded-3xl border border-emerald-500/20 bg-emerald-950/30 p-7 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-all"
          >

            <div className="h-14 w-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6">
              <FaCalendarAlt className="text-emerald-400 text-xl" />
            </div>

            <h3 className="text-2xl font-black uppercase">
              Events
            </h3>

            <p className="text-sm text-emerald-100/50 mt-2">
              Manage school events and announcements.
            </p>

          </button>

          {/* Add Event */}

          <button
            onClick={() => setActiveSection("add-event")}
            className="text-left rounded-3xl border border-emerald-500/20 bg-emerald-950/30 p-7 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-all"
          >

            <div className="h-14 w-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6">
              <FaPlus className="text-emerald-400 text-xl" />
            </div>

            <h3 className="text-2xl font-black uppercase">
              Add Event
            </h3>

            <p className="text-sm text-emerald-100/50 mt-2">
              Create a new school event.
            </p>

          </button>

          {/* Website */}

          <button
            onClick={onLogout}
            className="text-left rounded-3xl border border-emerald-500/20 bg-emerald-950/30 p-7 hover:border-emerald-400/50 hover:bg-emerald-950/50 transition-all"
          >

            <div className="h-14 w-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6">
              <FaHome className="text-emerald-400 text-xl" />
            </div>

            <h3 className="text-2xl font-black uppercase">
              Website
            </h3>

            <p className="text-sm text-emerald-100/50 mt-2">
              Return to the public website.
            </p>

          </button>

        </div>

        {/* ACTIVE SECTION */}

        <div className="mt-10">

          {activeSection === "dashboard" && (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-10">
              <p className="text-emerald-300 font-mono text-sm uppercase tracking-widest">
                Dashboard Ready
              </p>

              <h3 className="text-3xl font-black uppercase mt-3">
                Administration Center
              </h3>

              <p className="text-emerald-100/50 mt-3">
                Select an option above to manage your website.
              </p>
            </div>
          )}

          {activeSection === "events" && (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-10">

              <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Content Management
              </p>

              <h3 className="text-3xl font-black uppercase mt-2">
                Event Management
              </h3>

              <p className="text-emerald-100/50 mt-3">
                Event management will be connected to your Supabase
                events table next.
              </p>

            </div>
          )}

          {activeSection === "add-event" && (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-10">

              <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Content Management
              </p>

              <h3 className="text-3xl font-black uppercase mt-2">
                Add Event
              </h3>

              {/* EVENT FORM */}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                {/* Status Messages */}

                {formStatus.message && (
                  <div className={`p-4 rounded-xl border ${
                    formStatus.type === "success"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                {/* Title (Required) */}

                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-emerald-300 mb-2">
                    Event Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., School Foundation Day"
                    className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/20 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* Description (Optional) */}

                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-emerald-300 mb-2">
                    <FaInfoCircle className="inline mr-2" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the event..."
                    rows="4"
                    className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/20 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none transition-all resize-y"
                  />
                </div>

                {/* Event Date (Required) */}

                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-emerald-300 mb-2">
                    <FaCalendarAlt className="inline mr-2" />
                    Event Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    value={eventData.event_date}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/20 text-white focus:border-emerald-400 focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* Location (Required) */}

                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-emerald-300 mb-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., School Campus"
                    className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/20 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* Image URL (Optional) */}

                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-emerald-300 mb-2">
                    <FaImage className="inline mr-2" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={eventData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/20 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none transition-all"
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">
                    Optional. Upload an image for the event banner.
                  </p>
                </div>

                {/* Category (Optional) */}

                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-emerald-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={eventData.category}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/20 text-white focus:border-emerald-400 focus:outline-none transition-all"
                  >
                    <option value="">Select a category</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Religious">Religious</option>
                    <option value="Community">Community</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="text-xs text-zinc-500 mt-1.5">
                    Optional. Categorize your event for better organization.
                  </p>
                </div>

                {/* Attendees (Optional) */}

                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-emerald-300 mb-2">
                    <FaUsers className="inline mr-2" />
                    Expected Attendees
                  </label>
                  <input
                    type="number"
                    name="attendees"
                    value={eventData.attendees}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    min="0"
                    className="w-full px-5 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/20 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none transition-all"
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">
                    Optional. Estimated number of attendees.
                  </p>
                </div>

                {/* Form Actions */}

                <div className="flex flex-wrap gap-4 pt-4 border-t border-emerald-500/10">

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-emerald-500 text-black font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <FaPlus />
                        Create Event
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={clearForm}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
                  >
                    <FaTimes />
                    Clear Form
                  </button>

                </div>

              </form>

            </div>
          )}

        </div>

      </div>

    </main>
  );
};

export default AdminDashboard;